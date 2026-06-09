'use client'

import { useEffect, useRef } from 'react'

const CALENDLY_URL =
  'https://calendly.com/ian-silverlinkai/silverlink-ai-demo?hide_gdpr_banner=1'

export function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = 'calendly-widget-script'
    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)

      const script = document.createElement('script')
      script.id = id
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="calendly-inline-widget border border-border bg-card"
      data-url={CALENDLY_URL}
      style={{ minWidth: '280px', height: '700px' }}
    />
  )
}
