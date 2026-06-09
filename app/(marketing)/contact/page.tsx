import type { Metadata } from 'next'
import { Clock, Target, Zap, Mail } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { CalendlyEmbed } from '@/components/contact/calendly-embed'

export const metadata: Metadata = {
  title: 'Contact — SilverLink AI',
  description:
    "Book a free 20-minute demo. We'll show you exactly how SilverLink works for your business.",
}

const POINTS = [
  { icon: Clock, text: '20-minute call, no obligation' },
  { icon: Target, text: 'Specific to your business' },
  { icon: Zap, text: 'Live within 72 hours of signup' },
  { icon: Mail, text: 'info@silverlinkai.com' },
]

export default function ContactPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Get Started</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 text-balance text-4xl md:text-5xl">
                Let&apos;s talk about{' '}
                <em className="font-light italic text-silver2">
                  your business.
                </em>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Book a free 20-minute demo. We&apos;ll show you exactly how
                SilverLink works and whether it&apos;s the right fit.
              </p>
            </Reveal>

            <div className="mt-9 flex flex-col gap-4">
              {POINTS.map((p, i) => {
                const Icon = p.icon
                return (
                  <Reveal
                    key={p.text}
                    delay={i * 70}
                    className="flex items-center gap-4 text-sm text-body"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-border">
                      <Icon
                        className="h-4 w-4 text-charcoal"
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </span>
                    {p.text}
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <blockquote className="mt-10 border-l-2 border-silver2 bg-cream px-7 py-5">
                <p className="font-serif text-lg italic leading-snug text-ink">
                  &ldquo;I&apos;ve already told three other salon owners about
                  this. It just works.&rdquo;
                </p>
                <cite className="mt-2 block text-[11px] not-italic tracking-[0.06em] text-muted-foreground">
                  Elena — Owner, Secretive Nail Bar, Newport Beach
                </cite>
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <CalendlyEmbed />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
