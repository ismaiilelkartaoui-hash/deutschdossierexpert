import { Plus, Trash2, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { WorkExperience } from '@/types/form'

interface WorkExperienceFormProps {
  data: WorkExperience[]
  onChange: (data: WorkExperience[]) => void
}

export function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentJob: false,
    }
    onChange([...data, newWork])
  }

  const removeWorkExperience = (id: string) => {
    onChange(data.filter((work) => work.id !== id))
  }

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    onChange(
      data.map((work) =>
        work.id === id ? { ...work, [field]: value } : work
      )
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          Add your work experience, internships, or part-time jobs. Start with the most recent.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
          <Briefcase className="size-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No work experience added yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Even short-term jobs, internships, or volunteer work can be valuable!
          </p>
          <Button variant="outline" onClick={addWorkExperience}>
            <Plus className="size-4" />
            Add Work Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((work, index) => (
            <Card key={work.id} className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Position {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeWorkExperience(work.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name *</Label>
                    <Input
                      value={work.company}
                      onChange={(e) => updateWorkExperience(work.id, 'company', e.target.value)}
                      placeholder="Company GmbH"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Position / Job Title *</Label>
                    <Input
                      value={work.position}
                      onChange={(e) => updateWorkExperience(work.id, 'position', e.target.value)}
                      placeholder="Praktikant, Aushilfe, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={work.startDate}
                      onChange={(e) => updateWorkExperience(work.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={work.endDate}
                      onChange={(e) => updateWorkExperience(work.id, 'endDate', e.target.value)}
                      disabled={work.isCurrentJob}
                      placeholder={work.isCurrentJob ? 'Present' : ''}
                    />
                  </div>

                  <div className="flex items-center gap-2 md:col-span-2">
                    <input
                      type="checkbox"
                      id={`current-${work.id}`}
                      checked={work.isCurrentJob}
                      onChange={(e) => updateWorkExperience(work.id, 'isCurrentJob', e.target.checked)}
                      className="size-4 rounded border-input accent-gold"
                    />
                    <Label htmlFor={`current-${work.id}`} className="font-normal cursor-pointer">
                      I currently work here
                    </Label>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Job Description *</Label>
                    <Textarea
                      value={work.description}
                      onChange={(e) => updateWorkExperience(work.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={addWorkExperience} className="w-full">
            <Plus className="size-4" />
            Add Another Position
          </Button>
        </div>
      )}
    </div>
  )
}
