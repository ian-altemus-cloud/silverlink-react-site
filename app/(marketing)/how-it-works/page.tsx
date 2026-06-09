import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { QuoteSection } from '@/components/quote-section'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'How It Works — SilverLink AI',
  description:
    'From first message to confirmed booking. See how SilverLink handles every Instagram conversation automatically.',
}

const STEPS = [
  {
    n: '01',
    title: 'You connect your Instagram',
    text: 'One click. We handle the rest. Your AI receptionist is configured for your business during the onboarding call: your services, your voice, your booking link.',
  },
  {
    n: '02',
    title: 'A client messages you',
    text: 'Pricing, availability, anything — at any hour. SilverLink is always on.',
  },
  {
    n: '03',
    title: 'Your AI receptionist responds instantly',
    text: 'In your voice, with the right answer. Warm, professional, and conversion-focused. Your client feels like your business is attentive and responsive.',
  },
  {
    n: '04',
    title: 'The lead gets guided to a booking',
    text: 'When a client is ready, SilverLink naturally guides them to your booking link. No friction. No follow-up needed from you.',
  },
  {
    n: '05',
    title: 'You wake up to more bookings',
    text: 'While you slept, SilverLink answered every inquiry, guided leads to your booking link, and kept your calendar moving. No missed messages. No lost revenue.',
  },
  {
    n: '06',
    title: 'You see exactly how your business is growing',
    text: 'Every conversation logged, every conversion tracked. Know which inquiries became bookings, where leads dropped off, and how your response rate is trending.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        image="/images/hiw.png"
        eyebrow="How It Works"
        title={
          <>
            From first message to{' '}
            <em className="font-light italic text-silver">
              confirmed booking.
            </em>
          </>
        }
        intro="SilverLink connects to your Instagram and handles every client conversation from first message to booked appointment — automatically."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="border-t border-border">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.n}
                delay={(i % 2) * 80}
                className="grid grid-cols-[52px_1fr] gap-x-8 border-b border-border py-10"
              >
                <span className="pt-1.5 font-serif text-sm font-medium tracking-[0.12em] text-silver2">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-xl">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection quote="This is Soft Close Logic. The difference between an unanswered inquiry and a confirmed appointment on your calendar." />

      <CtaBand
        title="Ready to see it live?"
        subtitle="Book a free demo and we'll walk through the entire flow using your business as the example."
      />
    </>
  )
}
