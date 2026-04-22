import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { LanguageSkills } from '@/types/form'

interface LanguageSkillsFormProps {
  data: LanguageSkills
  onChange: (data: LanguageSkills) => void
}

const languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Muttersprache'] as const

export function LanguageSkillsForm({ data, onChange }: LanguageSkillsFormProps) {
  const [newSkill, setNewSkill] = useState('')
  const [newOtherSkill, setNewOtherSkill] = useState('')

  const updateGermanLevel = (level: typeof languageLevels[number]) => {
    onChange({ ...data, germanLevel: level })
  }

  const addOtherLanguage = () => {
    onChange({
      ...data,
      otherLanguages: [
        ...data.otherLanguages,
        { language: '', level: 'B1' },
      ],
    })
  }

  const removeOtherLanguage = (index: number) => {
    onChange({
      ...data,
      otherLanguages: data.otherLanguages.filter((_, i) => i !== index),
    })
  }

  const updateOtherLanguage = (
    index: number,
    field: 'language' | 'level',
    value: string
  ) => {
    onChange({
      ...data,
      otherLanguages: data.otherLanguages.map((lang, i) =>
        i === index ? { ...lang, [field]: value } : lang
      ),
    })
  }

  const addComputerSkill = () => {
    if (newSkill.trim()) {
      onChange({
        ...data,
        computerSkills: [...data.computerSkills, newSkill.trim()],
      })
      setNewSkill('')
    }
  }

  const removeComputerSkill = (skill: string) => {
    onChange({
      ...data,
      computerSkills: data.computerSkills.filter((s) => s !== skill),
    })
  }

  const addOtherSkill = () => {
    if (newOtherSkill.trim()) {
      onChange({
        ...data,
        otherSkills: [...data.otherSkills, newOtherSkill.trim()],
      })
      setNewOtherSkill('')
    }
  }

  const removeOtherSkill = (skill: string) => {
    onChange({
      ...data,
      otherSkills: data.otherSkills.filter((s) => s !== skill),
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Language & Skills</h2>
        <p className="text-muted-foreground text-sm">
          Specify your language proficiency and other relevant skills.
        </p>
      </div>

      {/* German Language Level */}
      <div className="space-y-4">
        <h3 className="font-medium">German Language Level *</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {languageLevels.map((level) => (
            <button
              key={level}
              onClick={() => updateGermanLevel(level)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all
                ${data.germanLevel === level
                  ? 'bg-gold/10 border-gold text-gold'
                  : 'border-border hover:border-gold/50 hover:bg-muted/50'
                }`}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          A1-A2: Basic | B1-B2: Intermediate | C1-C2: Advanced | Muttersprache: Native
        </p>
      </div>

      {/* Other Languages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Other Languages</h3>
          <Button variant="outline" size="sm" onClick={addOtherLanguage}>
            <Plus className="size-4" />
            Add Language
          </Button>
        </div>
        
        {data.otherLanguages.length > 0 && (
          <div className="space-y-3">
            {data.otherLanguages.map((lang, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={lang.language}
                  onChange={(e) => updateOtherLanguage(index, 'language', e.target.value)}
                  placeholder="Language name"
                  className="flex-1"
                />
                <Select
                  value={lang.level}
                  onValueChange={(value) => updateOtherLanguage(index, 'level', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeOtherLanguage(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Computer Skills */}
      <div className="space-y-4">
        <h3 className="font-medium">Computer / Technical Skills</h3>
        <div className="flex items-center gap-3">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g., Microsoft Office, Python, AutoCAD"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addComputerSkill())}
          />
          <Button variant="outline" onClick={addComputerSkill}>
            <Plus className="size-4" />
            Add
          </Button>
        </div>
        {data.computerSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.computerSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 text-sm"
              >
                {skill}
                <button
                  onClick={() => removeComputerSkill(skill)}
                  className="hover:text-destructive"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Other Skills */}
      <div className="space-y-4">
        <h3 className="font-medium">Other Skills & Interests</h3>
        <div className="flex items-center gap-3">
          <Input
            value={newOtherSkill}
            onChange={(e) => setNewOtherSkill(e.target.value)}
            placeholder="e.g., Teamwork, Driving License B, First Aid Certificate"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addOtherSkill())}
          />
          <Button variant="outline" onClick={addOtherSkill}>
            <Plus className="size-4" />
            Add
          </Button>
        </div>
        {data.otherSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.otherSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm"
              >
                {skill}
                <button
                  onClick={() => removeOtherSkill(skill)}
                  className="hover:text-destructive"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
