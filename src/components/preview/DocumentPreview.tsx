import { useState } from 'react'
import { Sparkles, Download, FileText, Loader2, AlertCircle, RefreshCw, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { generateAnschreiben, generateLebenslauf } from '@/lib/gemini'
import { exportToPdf } from '@/lib/pdf-export'
import type { FormData } from '@/types/form'
import { toast } from 'sonner'

interface DocumentPreviewProps {
  formData: FormData
}

export function DocumentPreview({ formData }: DocumentPreviewProps) {
  const [apiKey, setApiKey] = useState('')
  const [anschreiben, setAnschreiben] = useState<string | null>(null)
  const [lebenslauf, setLebenslauf] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('anschreiben')

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your Gemini API key')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const [anschreibenResult, lebenslaufResult] = await Promise.all([
        generateAnschreiben(formData, apiKey),
        generateLebenslauf(formData, apiKey),
      ])

      setAnschreiben(anschreibenResult)
      setLebenslauf(lebenslaufResult)
      toast.success('Documents generated successfully!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate documents'
      setError(message)
      toast.error(message)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportPdf = async (type: 'anschreiben' | 'lebenslauf' | 'both') => {
    setIsExporting(true)
    try {
      if (type === 'both') {
        if (anschreiben) await exportToPdf(anschreiben, `${formData.personalData.lastName}_Anschreiben.pdf`)
        if (lebenslauf) await exportToPdf(lebenslauf, `${formData.personalData.lastName}_Lebenslauf.pdf`)
        toast.success('Both documents exported!')
      } else if (type === 'anschreiben' && anschreiben) {
        await exportToPdf(anschreiben, `${formData.personalData.lastName}_Anschreiben.pdf`)
        toast.success('Anschreiben exported!')
      } else if (type === 'lebenslauf' && lebenslauf) {
        await exportToPdf(lebenslauf, `${formData.personalData.lastName}_Lebenslauf.pdf`)
        toast.success('Lebenslauf exported!')
      }
    } catch (err) {
      toast.error('Failed to export PDF')
    } finally {
      setIsExporting(false)
    }
  }

  const isFormValid = () => {
    const { personalData, targetAusbildung } = formData
    return (
      personalData.firstName &&
      personalData.lastName &&
      personalData.email &&
      targetAusbildung.ausbildungTitle &&
      targetAusbildung.targetCompany
    )
  }

  if (!isFormValid()) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="size-16 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Missing Required Information</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Please go back and fill in at least your personal data and target Ausbildung information
          before generating documents.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Preview & Export</h2>
        <p className="text-muted-foreground text-sm">
          Generate your application documents using AI and export them as PDF.
        </p>
      </div>

      {/* API Key Input */}
      {!anschreiben && !lebenslauf && (
        <div className="glass-strong rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <KeyRound className="size-5 text-gold mt-0.5" />
            <div className="flex-1">
              <Label htmlFor="apiKey" className="text-base font-medium">Gemini API Key</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your Google Gemini API key to generate documents. 
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:underline ml-1"
                >
                  Get a free key here
                </a>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1"
            />
            <Button 
              variant="gold" 
              onClick={handleGenerate} 
              disabled={isGenerating || !apiKey.trim()}
              className="btn-premium min-w-[180px]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generate Documents
                </>
              )}
            </Button>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="size-4" />
              {error}
            </div>
          )}
        </div>
      )}

      {/* Document Preview */}
      {(anschreiben || lebenslauf) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <RefreshCw className={`size-4 ${isGenerating ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleExportPdf(activeTab as 'anschreiben' | 'lebenslauf')}
                disabled={isExporting}
              >
                <Download className="size-4" />
                Export Current
              </Button>
              <Button
                variant="gold"
                onClick={() => handleExportPdf('both')}
                disabled={isExporting}
                className="btn-premium"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="size-4" />
                    Export All PDFs
                  </>
                )}
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="anschreiben" className="flex items-center gap-2">
                <FileText className="size-4" />
                Anschreiben
              </TabsTrigger>
              <TabsTrigger value="lebenslauf" className="flex items-center gap-2">
                <FileText className="size-4" />
                Lebenslauf
              </TabsTrigger>
            </TabsList>

            <TabsContent value="anschreiben" className="mt-4">
              <div 
                id="anschreiben-preview"
                className="bg-white text-black rounded-lg p-8 min-h-[600px] shadow-lg font-serif text-sm leading-relaxed whitespace-pre-wrap"
              >
                {anschreiben}
              </div>
            </TabsContent>

            <TabsContent value="lebenslauf" className="mt-4">
              <div 
                id="lebenslauf-preview"
                className="bg-white text-black rounded-lg p-8 min-h-[600px] shadow-lg font-serif text-sm leading-relaxed whitespace-pre-wrap"
              >
                {lebenslauf}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Pricing Note */}
      <div className="glass rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="size-5 text-gold shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium">Free Preview Available</p>
          <p className="text-muted-foreground">
            You can preview your documents for free. PDF export is available with Pro plan (149 DH).
            Premium plan (299 DH) includes access to 1000+ German company contacts.
          </p>
        </div>
      </div>
    </div>
  )
}
