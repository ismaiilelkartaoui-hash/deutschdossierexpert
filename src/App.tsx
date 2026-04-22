import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  FileText, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  X,
  Crown,
  Award,
  Gem,
  MessageCircle,
  Mail,
  Phone,
  ArrowDown,
  Users,
  Clock,
  Shield,
  ChevronLeft
} from 'lucide-react'

interface LeadFormData {
  name: string
  education: string
  germanLevel: string
  selectedPlan: string
}

const pricingPlans = [
  {
    id: 'bronze',
    name: 'Bronze',
    nameDe: 'Bronze',
    nameFr: 'Bronze',
    price: 200,
    icon: Award,
    gradient: 'from-amber-600 via-amber-700 to-amber-800',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-700',
    features: [
      '1x Anschreiben professionnel',
      '1x Lebenslauf (DIN 5008)',
      'Correction linguistique complète',
      'Livraison en 48h',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    nameDe: 'Silber',
    nameFr: 'Argent',
    price: 300,
    icon: Gem,
    gradient: 'from-slate-300 via-slate-400 to-slate-500',
    iconBg: 'bg-gradient-to-br from-slate-300 to-slate-500',
    popular: true,
    features: [
      'Tout du Bronze inclus',
      '3x Anschreiben personnalisés',
      'Lebenslauf optimisé ATS',
      'Conseils pour entretien',
      'Support WhatsApp direct',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    nameDe: 'Gold',
    nameFr: 'Or',
    price: 450,
    icon: Crown,
    gradient: 'from-yellow-400 via-amber-400 to-yellow-500',
    iconBg: 'bg-gradient-to-br from-yellow-400 to-amber-500',
    features: [
      'Tout du Silver inclus',
      '5x Anschreiben personnalisés',
      'Liste de 1000 entreprises allemandes',
      'Emails RH directs',
      'Suivi personnalisé (1 mois)',
      'Garantie réponse ou remboursement',
    ],
  },
]

const stats = [
  { value: '10K+', label: 'Étudiants satisfaits' },
  { value: '98%', label: 'Taux de réussite' },
  { value: '24h', label: 'Délai moyen' },
]

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    education: '',
    germanLevel: '',
    selectedPlan: '',
  })
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openModal = (planId: string) => {
    setSelectedPlan(planId)
    setFormData(prev => ({ ...prev, selectedPlan: planId }))
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({ name: '', education: '', germanLevel: '', selectedPlan: '' })
    document.body.style.overflow = 'auto'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const plan = pricingPlans.find(p => p.id === formData.selectedPlan)
    const planName = plan?.name || formData.selectedPlan
    const message = encodeURIComponent(
      `Bonjour Ismail, je suis intéressé par le forfait ${planName}.\n\n` +
      `Mes informations:\n` +
      `Nom: ${formData.name}\n` +
      `Niveau d'études: ${formData.education}\n` +
      `Niveau d'allemand: ${formData.germanLevel}`
    )
    window.open(`https://wa.me/212649851604?text=${message}`, '_blank')
    closeModal()
  }

  return (
    <div className="min-h-screen">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] orb-1 animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] orb-2 animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] orb-1 animate-float-slow" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass py-3' : 'py-5'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Deutsch Dossier Expert" 
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-[var(--gold)]/50"
                />
                <div className="absolute inset-0 rounded-full neon-gold opacity-50" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold gold-text tracking-wide">
                  DEUTSCH DOSSIER
                </span>
                <span className="block text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
                  Expert
                </span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Processus
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>

            <Button 
              onClick={() => openModal('silver')}
              className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--navy)] font-bold btn-shimmer"
            >
              <span className="hidden sm:inline">Commencer</span>
              <Sparkles className="size-4 sm:ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="block text-foreground">Votre passeport</span>
            <span className="block gold-text neon-text mt-2">vers l&apos;Allemagne</span>
            <span className="block text-foreground mt-2">commence ici</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Préparez vos documents selon les normes allemandes
            <span className="text-[var(--gold)]"> DIN 5008 </span>
            en quelques minutes
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={() => openModal('gold')}
              size="lg"
              className="w-full sm:w-auto bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--navy)] font-bold text-lg px-8 py-6 neon-gold btn-shimmer"
            >
              Commencez maintenant
              <Sparkles className="size-5 ml-2" />
            </Button>
            <a href="#pricing">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-[var(--gold)]/30 text-foreground hover:bg-[var(--gold)]/10 text-lg px-8 py-6"
              >
                Découvrir les offres
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-4xl font-bold number-glow">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
          <ArrowDown className="size-6 text-muted-foreground" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-white/5 glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-[var(--gold)]" />
              <span>DIN 5008 Zertifiziert</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-[var(--gold)]" />
              <span>Livraison rapide</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-[var(--gold)]" />
              <span>Support continu</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-[var(--gold)]" />
              <span>Qualité garantie</span>
            </div>
          </div>
        </div>
      </section>

{/* Process Section */}
      <section id="process" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[var(--gold)] text-sm font-medium tracking-widest uppercase mb-4">
              Processus
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="gold-text">3 étapes</span>
              <span className="text-foreground"> simples</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-lg" dir="rtl">ساهل بزاف!</p>
            <div className="w-24 h-1 line-gold mx-auto mt-6" />
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: '01', title: 'Vos informations', desc: 'Partagez vos données personnelles, formation et expérience', icon: FileText },
              { num: '02', title: 'Choisissez votre offre', desc: 'Sélectionnez le forfait adapté à vos besoins et budget', icon: Gem },
              { num: '03', title: 'Recevez vos documents', desc: 'Vos documents professionnels livrés via WhatsApp', icon: Send },
            ].map((step, i) => (
              <div 
                key={step.num} 
                className="relative group"
              >
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-20 left-0 w-full h-px bg-gradient-to-l from-[var(--gold)]/30 to-transparent -translate-x-1/2 z-0" />
                )}
                
                <Card className="relative z-10 glass-card card-lift border-0 overflow-hidden">
                  <CardContent className="p-8 sm:p-10 text-center">
                    {/* Number */}
                    <div className="text-6xl sm:text-7xl font-bold number-glow opacity-20 absolute top-4 right-6">
                      {step.num}
                    </div>
                    
                    {/* Icon */}
                    <div className="relative inline-flex items-center justify-center size-16 sm:size-20 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-6 group-hover:neon-gold transition-all duration-300">
                      <step.icon className="size-8 sm:size-10 text-[var(--gold)]" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-32 relative">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] orb-1 opacity-50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[var(--gold)] text-sm font-medium tracking-widest uppercase mb-4">
              Tarifs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-foreground">Choisissez </span>
              <span className="gold-text">votre forfait</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Un seul paiement, sans abonnement mensuel
            </p>
            <p className="text-[var(--gold)]/80 mt-2 text-sm" dir="rtl">بلا أي تعقيد!</p>
            <div className="w-24 h-1 line-gold mx-auto mt-6" />
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden border-0 card-lift ${
                  plan.popular 
                    ? 'glass-premium popular-glow scale-[1.02] md:scale-105' 
                    : 'glass-card'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="badge-premium px-6 py-1.5 rounded-b-xl text-[var(--navy)] text-sm font-bold">
                      Le plus populaire
                    </div>
                  </div>
                )}

                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-l ${plan.gradient}`} />

                <CardContent className={`p-6 sm:p-8 ${plan.popular ? 'pt-10' : ''}`}>
                  {/* Icon & Name */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center size-16 sm:size-20 rounded-2xl ${plan.iconBg} mb-4 ${plan.popular ? 'neon-gold-strong' : ''}`}>
                      <plan.icon className="size-8 sm:size-10 text-[var(--navy)]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.nameDe} / {plan.nameFr}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl sm:text-6xl font-bold gold-text">{plan.price}</span>
                      <span className="text-xl text-muted-foreground">DH</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Paiement unique</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 text-[var(--gold)] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    onClick={() => openModal(plan.id)}
                    className={`w-full py-6 text-lg font-bold btn-shimmer ${
                      plan.popular 
                        ? 'bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--navy)] neon-gold' 
                        : 'bg-white/10 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    <MessageCircle className="size-5 mr-2" />
                    Choisir {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              <span className="gold-text">Contactez-nous</span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a 
              href="mailto:deutschdossierexpert@gmail.com" 
              className="flex items-center gap-3 glass-card px-6 py-4 rounded-2xl hover:neon-gold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <Mail className="size-5 text-[var(--gold)]" />
              <span className="text-sm sm:text-base">deutschdossierexpert@gmail.com</span>
            </a>
            <a 
              href="https://wa.me/212649851604" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 glass-card px-6 py-4 rounded-2xl hover:neon-gold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <Phone className="size-5 text-[var(--gold)]" />
              <span dir="ltr" className="text-sm sm:text-base">+212 649 851 604</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="DDE" className="h-10 w-10 rounded-full ring-2 ring-[var(--gold)]/30" />
              <div>
                <span className="font-bold gold-text">DEUTSCH DOSSIER EXPERT</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {new Date().getFullYear()} Deutsch Dossier Expert. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 modal-backdrop"
            onClick={closeModal}
          />
          
          <Card className="relative w-full max-w-md glass-premium border-[var(--gold)]/30 neon-gold-strong animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={closeModal}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <X className="size-5" />
            </button>
            
            <CardContent className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[var(--gold)]/20 mb-4 neon-gold">
                  <Sparkles className="size-8 text-[var(--gold)]" />
                </div>
                <h3 className="text-2xl font-bold">Vos informations</h3>
                <p className="text-muted-foreground mt-2">
                  Forfait: <span className="text-[var(--gold)] font-bold">{pricingPlans.find(p => p.id === selectedPlan)?.name}</span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label className="block text-sm">Nom complet</Label>
                  <Input
                    placeholder="Ex: Ahmed Benali"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-white/5 border-white/10 focus:border-[var(--gold)] h-12 input-glow"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="block text-sm">Niveau d&apos;études</Label>
                  <Input
                    placeholder="Ex: Baccalauréat, Licence..."
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                    required
                    className="bg-white/5 border-white/10 focus:border-[var(--gold)] h-12 input-glow"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="block text-sm">Niveau d&apos;allemand</Label>
                  <Select
                    value={formData.germanLevel}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, germanLevel: value }))}
                    required
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-[var(--gold)] h-12">
                      <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--navy-light)] border-white/10">
                      <SelectItem value="A1">A1 - Débutant</SelectItem>
                      <SelectItem value="A2">A2 - Élémentaire</SelectItem>
                      <SelectItem value="B1">B1 - Intermédiaire</SelectItem>
                      <SelectItem value="B2">B2 - Avancé</SelectItem>
                      <SelectItem value="C1">C1 - Autonome</SelectItem>
                      <SelectItem value="none">Pas encore commencé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--navy)] font-bold h-14 text-lg btn-shimmer neon-gold mt-4"
                  disabled={!formData.name || !formData.education || !formData.germanLevel}
                >
                  <MessageCircle className="size-5 mr-2" />
                  Contacter via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
