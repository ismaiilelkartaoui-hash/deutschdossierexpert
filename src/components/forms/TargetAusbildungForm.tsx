import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { TargetAusbildung } from '@/types/form'

interface TargetAusbildungFormProps {
  data: TargetAusbildung
  onChange: (data: TargetAusbildung) => void
}

export function TargetAusbildungForm({ data, onChange }: TargetAusbildungFormProps) {
  const updateField = (field: keyof TargetAusbildung, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Target Ausbildung</h2>
        <p className="text-muted-foreground text-sm">
          Provide details about the Ausbildung position and company you are applying to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="ausbildungTitle">Ausbildung Position *</Label>
          <Input
            id="ausbildungTitle"
            value={data.ausbildungTitle}
            onChange={(e) => updateField('ausbildungTitle', e.target.value)}
            placeholder="Fachinformatiker für Anwendungsentwicklung"
          />
          <p className="text-xs text-muted-foreground">
            Enter the exact German title of the Ausbildung
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="targetCompany">Company Name *</Label>
          <Input
            id="targetCompany"
            value={data.targetCompany}
            onChange={(e) => updateField('targetCompany', e.target.value)}
            placeholder="Muster GmbH"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyAddress">Company Street Address *</Label>
          <Input
            id="companyAddress"
            value={data.companyAddress}
            onChange={(e) => updateField('companyAddress', e.target.value)}
            placeholder="Industriestraße 42"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyPostalCode">Postal Code *</Label>
          <Input
            id="companyPostalCode"
            value={data.companyPostalCode}
            onChange={(e) => updateField('companyPostalCode', e.target.value)}
            placeholder="80331"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyCity">City *</Label>
          <Input
            id="companyCity"
            value={data.companyCity}
            onChange={(e) => updateField('companyCity', e.target.value)}
            placeholder="München"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person (optional)</Label>
          <Input
            id="contactPerson"
            value={data.contactPerson || ''}
            onChange={(e) => updateField('contactPerson', e.target.value)}
            placeholder="Herr / Frau Müller"
          />
          <p className="text-xs text-muted-foreground">
            If known, enter the name with appropriate title (Herr/Frau)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Desired Start Date *</Label>
          <Input
            id="startDate"
            type="month"
            value={data.startDate}
            onChange={(e) => updateField('startDate', e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="motivation">Why This Ausbildung? *</Label>
          <Textarea
            id="motivation"
            value={data.motivation}
            onChange={(e) => updateField('motivation', e.target.value)}
            placeholder="Describe your motivation for this Ausbildung and why you chose this company. What interests you about this field? What relevant skills or experiences do you have?"
            className="min-h-[150px]"
          />
          <p className="text-xs text-muted-foreground">
            This will help the AI generate a personalized Anschreiben for you
          </p>
        </div>
      </div>
    </div>
  )
}
