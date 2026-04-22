import type { FormData } from '@/types/form'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

function formatDate(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
}

function formatMonthYear(dateString: string): string {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}

function buildPromptContext(formData: FormData): string {
  const { personalData, education, workExperience, targetAusbildung, languageSkills } = formData

  const educationText = education.map(edu => 
    `- ${edu.institution}: ${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''} (${formatMonthYear(edu.startDate)} - ${edu.endDate ? formatMonthYear(edu.endDate) : 'Present'})${edu.grade ? `, Note: ${edu.grade}` : ''}`
  ).join('\n')

  const workText = workExperience.map(work =>
    `- ${work.company}: ${work.position} (${formatMonthYear(work.startDate)} - ${work.isCurrentJob ? 'Present' : formatMonthYear(work.endDate)})\n  Tasks: ${work.description}`
  ).join('\n')

  const otherLanguagesText = languageSkills.otherLanguages.map(l => 
    `${l.language}: ${l.level}`
  ).join(', ')

  return `
APPLICANT INFORMATION:
- Full Name: ${personalData.firstName} ${personalData.lastName}
- Address: ${personalData.street}, ${personalData.postalCode} ${personalData.city}
- Phone: ${personalData.phone}
- Email: ${personalData.email}
- Date of Birth: ${formatDate(personalData.birthDate)}
- Place of Birth: ${personalData.birthPlace}
- Nationality: ${personalData.nationality}

EDUCATION:
${educationText || 'No formal education listed'}

WORK EXPERIENCE:
${workText || 'No work experience listed'}

TARGET AUSBILDUNG:
- Position: ${targetAusbildung.ausbildungTitle}
- Company: ${targetAusbildung.targetCompany}
- Company Address: ${targetAusbildung.companyAddress}, ${targetAusbildung.companyPostalCode} ${targetAusbildung.companyCity}
${targetAusbildung.contactPerson ? `- Contact Person: ${targetAusbildung.contactPerson}` : ''}
- Desired Start: ${formatMonthYear(targetAusbildung.startDate)}
- Personal Motivation: ${targetAusbildung.motivation}

SKILLS:
- German Level: ${languageSkills.germanLevel}
${otherLanguagesText ? `- Other Languages: ${otherLanguagesText}` : ''}
${languageSkills.computerSkills.length > 0 ? `- Computer Skills: ${languageSkills.computerSkills.join(', ')}` : ''}
${languageSkills.otherSkills.length > 0 ? `- Other Skills: ${languageSkills.otherSkills.join(', ')}` : ''}
`
}

export async function generateAnschreiben(formData: FormData, apiKey: string): Promise<string> {
  const context = buildPromptContext(formData)
  const today = new Date().toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })

  const prompt = `Du bist ein professioneller deutscher Bewerbungsschreiber. Erstelle ein Anschreiben (Cover Letter) nach DIN 5008 Standard.

WICHTIGE FORMATIERUNGSREGELN (DIN 5008):
1. Absender oben links (Name, Adresse, Telefon, E-Mail)
2. Empfänger links (Firma, ggf. Ansprechpartner, Adresse)
3. Datum rechtsbündig: ${today}
4. Ort vor Datum: ${formData.personalData.city}, ${today}
5. Betreffzeile fett, ohne "Betreff:"
6. Anrede: "Sehr geehrte Damen und Herren," oder "Sehr geehrter Herr/Frau [Name],"
7. Einleitung: Interesse und Motivation
8. Hauptteil: Qualifikationen und Erfahrungen
9. Schluss: Motivation und Gesprächswunsch
10. Grußformel: "Mit freundlichen Grüßen"
11. Name unter der Grußformel

APPLICANT DATA:
${context}

Schreibe das Anschreiben auf Deutsch. Es soll professionell, motiviert und überzeugend klingen. 
Verwende formelle Sprache (Sie-Form). Das Anschreiben soll etwa 300-400 Wörter lang sein.
Betone die Motivation für die Ausbildung und relevante Fähigkeiten/Erfahrungen.

Gib NUR das fertige Anschreiben aus, keine zusätzlichen Kommentare oder Erklärungen.`

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to generate Anschreiben')
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

export async function generateLebenslauf(formData: FormData, apiKey: string): Promise<string> {
  const context = buildPromptContext(formData)

  const prompt = `Du bist ein professioneller deutscher Bewerbungsberater. Erstelle einen tabellarischen Lebenslauf nach deutschem Standard.

WICHTIGE FORMATIERUNGSREGELN:
1. Überschrift: "Lebenslauf" zentriert
2. Persönliche Daten: Name, Adresse, Telefon, E-Mail, Geburtsdatum, Geburtsort, Staatsangehörigkeit
3. Berufserfahrung/Praktika (neueste zuerst)
4. Schulbildung/Ausbildung (neueste zuerst)
5. Kenntnisse und Fähigkeiten
6. Sprachkenntnisse mit Niveau
7. EDV-Kenntnisse
8. Sonstige Kenntnisse/Hobbys
9. Datum und Ort am Ende

FORMAT: Verwende diese Struktur:
[Zeitraum] | [Institution/Firma] | [Tätigkeit/Abschluss]

APPLICANT DATA:
${context}

Erstelle den Lebenslauf auf Deutsch. Er soll übersichtlich, professionell und vollständig sein.
Verwende einheitliche Datumsformate (MM/JJJJ - MM/JJJJ oder "seit MM/JJJJ").

Gib NUR den fertigen Lebenslauf aus, keine zusätzlichen Kommentare oder Erklärungen.
Formatiere ihn übersichtlich mit klaren Abschnitten.`

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 2048,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to generate Lebenslauf')
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}
