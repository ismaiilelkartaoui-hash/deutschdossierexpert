import { useState } from 'react'
import { Plus, Trash2, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Education } from '@/types/form'

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
    }
    onChange([...data, newEducation])
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Education History</h2>
        <p className="text-muted-foreground text-sm">
          Add your educational background, starting with the most recent.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
          <GraduationCap className="size-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No education entries yet</p>
          <Button variant="outline" onClick={addEducation}>
            <Plus className="size-4" />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <Card key={education.id} className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Institution Name *</Label>
                    <Input
                      value={education.institution}
                      onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                      placeholder="Gymnasium / Hochschule / University"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Degree / Certificate *</Label>
                    <Input
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                      placeholder="Abitur, Bachelor, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={education.fieldOfStudy}
                      onChange={(e) => updateEducation(education.id, 'fieldOfStudy', e.target.value)}
                      placeholder="Computer Science, Business, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={education.endDate}
                      onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Grade / GPA</Label>
                    <Input
                      value={education.grade || ''}
                      onChange={(e) => updateEducation(education.id, 'grade', e.target.value)}
                      placeholder="1.5, 2.0, etc."
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Description (optional)</Label>
                    <Textarea
                      value={education.description || ''}
                      onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                      placeholder="Relevant courses, achievements, activities..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={addEducation} className="w-full">
            <Plus className="size-4" />
            Add Another Education
          </Button>
        </div>
      )}
    </div>
  )
}
