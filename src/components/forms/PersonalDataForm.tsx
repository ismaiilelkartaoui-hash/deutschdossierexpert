import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { PersonalData } from '@/types/form'

interface PersonalDataFormProps {
  data: PersonalData
  onChange: (data: PersonalData) => void
}

export function PersonalDataForm({ data, onChange }: PersonalDataFormProps) {
  const updateField = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="text-muted-foreground text-sm">
          Enter your personal details as they should appear on your application documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="Max"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="Mustermann"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="max.mustermann@email.de"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+49 123 456789"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="street">Street Address *</Label>
          <Input
            id="street"
            value={data.street}
            onChange={(e) => updateField('street', e.target.value)}
            placeholder="Musterstraße 123"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => updateField('postalCode', e.target.value)}
            placeholder="12345"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Berlin"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Date of Birth *</Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate}
            onChange={(e) => updateField('birthDate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthPlace">Place of Birth *</Label>
          <Input
            id="birthPlace"
            value={data.birthPlace}
            onChange={(e) => updateField('birthPlace', e.target.value)}
            placeholder="Berlin"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="nationality">Nationality *</Label>
          <Input
            id="nationality"
            value={data.nationality}
            onChange={(e) => updateField('nationality', e.target.value)}
            placeholder="Marokkanisch"
          />
        </div>
      </div>
    </div>
  )
}
