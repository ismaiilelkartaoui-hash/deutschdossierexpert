export interface PersonalData {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  postalCode: string
  city: string
  birthDate: string
  birthPlace: string
  nationality: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  grade?: string
  description?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  isCurrentJob: boolean
}

export interface TargetAusbildung {
  ausbildungTitle: string
  targetCompany: string
  companyAddress: string
  companyCity: string
  companyPostalCode: string
  contactPerson?: string
  startDate: string
  motivation: string
}

export interface LanguageSkills {
  germanLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Muttersprache'
  otherLanguages: {
    language: string
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Muttersprache'
  }[]
  computerSkills: string[]
  otherSkills: string[]
}

export interface FormData {
  personalData: PersonalData
  education: Education[]
  workExperience: WorkExperience[]
  targetAusbildung: TargetAusbildung
  languageSkills: LanguageSkills
}

export type FormStep = 'personal' | 'education' | 'work' | 'target' | 'language' | 'preview'
