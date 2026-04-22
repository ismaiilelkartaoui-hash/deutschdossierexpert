import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  GraduationCap, 
  Briefcase, 
  Target, 
  Languages,
  FileText,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { PersonalDataForm } from '@/components/forms/PersonalDataForm'
import { EducationForm } from '@/components/forms/EducationForm'
import { WorkExperienceForm } from '@/components/forms/WorkExperienceForm'
import { TargetAusbildungForm } from '@/components/forms/TargetAusbildungForm'
import { LanguageSkillsForm } from '@/components/forms/LanguageSkillsForm'
import { DocumentPreview } from '@/components/preview/DocumentPreview'
import type { FormData, FormStep } from '@/types/form'

const steps: { id: FormStep; label: string; icon: typeof User }[] = [
  { id: 'personal', label: 'Personal Data', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'work', label: 'Work Experience', icon: Briefcase },
  { id: 'target', label: 'Target Ausbildung', icon: Target },
  { id: 'language', label: 'Language Skills', icon: Languages },
  { id: 'preview', label: 'Preview & Export', icon: FileText },
]

const initialFormData: FormData = {
  personalData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    postalCode: '',
    city: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
  },
  education: [],
  workExperience: [],
  targetAusbildung: {
    ausbildungTitle: '',
    targetCompany: '',
    companyAddress: '',
    companyCity: '',
    companyPostalCode: '',
    contactPerson: '',
    startDate: '',
    motivation: '',
  },
  languageSkills: {
    germanLevel: 'B1',
    otherLanguages: [],
    computerSkills: [],
    otherSkills: [],
  },
}

export default function Generator() {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal')
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    }
  }

  const goToPrevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  const updateFormData = <K extends keyof FormData>(key: K, data: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: data }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="DDE Logo" className="h-10 w-10 rounded-full" />
              <span className="font-serif text-xl font-semibold text-gold-gradient">
                Deutsch Dossier Expert
              </span>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="size-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-serif text-2xl font-bold">
                Create Your <span className="text-gold-gradient">Application Documents</span>
              </h1>
              <span className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = index < currentStepIndex
                const Icon = step.icon

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-gold/10 text-gold border border-gold/30' 
                        : isCompleted
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                  >
                    <Icon className="size-4" />
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="glass rounded-2xl p-6 md:p-8 min-h-[500px]">
            {currentStep === 'personal' && (
              <PersonalDataForm
                data={formData.personalData}
                onChange={(data) => updateFormData('personalData', data)}
              />
            )}
            {currentStep === 'education' && (
              <EducationForm
                data={formData.education}
                onChange={(data) => updateFormData('education', data)}
              />
            )}
            {currentStep === 'work' && (
              <WorkExperienceForm
                data={formData.workExperience}
                onChange={(data) => updateFormData('workExperience', data)}
              />
            )}
            {currentStep === 'target' && (
              <TargetAusbildungForm
                data={formData.targetAusbildung}
                onChange={(data) => updateFormData('targetAusbildung', data)}
              />
            )}
            {currentStep === 'language' && (
              <LanguageSkillsForm
                data={formData.languageSkills}
                onChange={(data) => updateFormData('languageSkills', data)}
              />
            )}
            {currentStep === 'preview' && (
              <DocumentPreview formData={formData} />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={goToPrevStep}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="size-4" />
              Previous
            </Button>

            {currentStep !== 'preview' ? (
              <Button variant="gold" onClick={goToNextStep} className="btn-premium">
                {currentStepIndex === steps.length - 2 ? (
                  <>
                    Generate Documents
                    <Sparkles className="size-4" />
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}
