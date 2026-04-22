export async function exportToPdf(content: string, filename: string): Promise<void> {
  // Dynamically import html2pdf to avoid SSR issues
  const html2pdf = (await import('html2pdf.js')).default

  // Create a temporary container with proper styling
  const container = document.createElement('div')
  container.innerHTML = `
    <div style="
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000;
      background: #fff;
      padding: 40px 50px;
      max-width: 210mm;
      margin: 0 auto;
    ">
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }
      </style>
      ${content.split('\n').map(line => {
        // Handle bold text (headers)
        if (line.startsWith('**') && line.endsWith('**')) {
          return `<p style="font-weight: bold; margin: 15px 0 5px 0;">${line.slice(2, -2)}</p>`
        }
        // Handle section headers
        if (line.match(/^[A-ZÄÖÜ\s]+$/)) {
          return `<h2 style="font-weight: bold; font-size: 14pt; margin: 20px 0 10px 0; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${line}</h2>`
        }
        // Handle bullet points
        if (line.startsWith('- ') || line.startsWith('• ')) {
          return `<p style="margin: 5px 0 5px 20px;">• ${line.slice(2)}</p>`
        }
        // Handle table-like entries (with |)
        if (line.includes('|')) {
          const parts = line.split('|').map(p => p.trim())
          return `<p style="margin: 5px 0; display: flex;"><span style="min-width: 150px;">${parts[0]}</span><span>${parts.slice(1).join(' | ')}</span></p>`
        }
        // Regular paragraph
        if (line.trim()) {
          return `<p style="margin: 8px 0; text-align: justify;">${line}</p>`
        }
        // Empty line
        return '<br/>'
      }).join('')}
    </div>
  `

  document.body.appendChild(container)

  const options = {
    margin: [15, 15, 15, 15],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: 'avoid-all' }
  }

  try {
    await html2pdf().set(options).from(container).save()
  } finally {
    document.body.removeChild(container)
  }
}
