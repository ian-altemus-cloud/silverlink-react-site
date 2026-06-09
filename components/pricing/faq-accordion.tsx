'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const FAQS = [
  {
    q: 'What does support look like after I sign up?',
    a: 'You get direct email and phone access to our support team from day one. No ticket queues, no chatbots, no waiting on hold. We respond same day.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most clients are live within 72 hours of signup. We handle the Instagram integration, configure your AI receptionist voice based on an onboarding call, and test the full flow before going live.',
  },
  {
    q: "Will my clients know they're talking to AI?",
    a: "SilverLink is configured to respond in your business's voice. Most clients have no idea. For complex situations that genuinely require a human, escalation triggers notify you.",
  },
  {
    q: 'What booking platforms do you work with?',
    a: 'SilverLink works with any booking platform: Vagaro, Booksy, Fresha, Square Appointments, and others. We integrate with your existing booking link and drive clients directly to it.',
  },
  {
    q: 'Is my client data secure?',
    a: 'SilverLink is built on AWS with enterprise-grade security throughout: HMAC signature validation on every webhook, zero stored credentials, AWS Secrets Manager for all sensitive data.',
  },
  {
    q: 'What if I want to cancel?',
    a: "No long-term contracts. Monthly billing, cancel any time. We're confident you'll see ROI in the first 30 days — but we don't lock you in to prove it.",
  },
  {
    q: 'Do I need to be technical to use SilverLink?',
    a: 'Not at all. You need an Instagram business account and a booking link. We handle everything else. Your only job is to show up to the onboarding call.',
  },
]

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      {FAQS.map((faq, i) => {
        const isOpen = open === i
        return (
          <Reveal key={faq.q} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-ink">{faq.q}</span>
              <Plus
                className="h-4 w-4 flex-shrink-0 text-silver2 transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                aria-hidden="true"
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
