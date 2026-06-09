import { Reveal } from '@/components/reveal'
import { Sparkles, Gem, Dumbbell, UtensilsCrossed, Camera } from 'lucide-react'

const MARKETS = [
  {
    icon: Sparkles,
    title: 'Nail & Beauty',
    text: 'Pricing, availability, booking: handled around the clock.',
  },
  {
    icon: Gem,
    title: 'Med Spas',
    text: 'High-ticket consultations converted from DM inquiries.',
  },
  {
    icon: Dumbbell,
    title: 'Boutique Fitness',
    text: 'Classes, memberships, and private sessions handled instantly.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    text: 'Reservations and events booked without picking up the phone.',
  },
  {
    icon: Camera,
    title: 'Creatives',
    text: "Booking inquiries handled while you're on a shoot.",
  },
]

export function Markets() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-[rgba(184,188,196,0.45)]">Who It&apos;s For</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 max-w-xl text-balance text-4xl text-ivory md:text-5xl">
            Built for local businesses that run on DMs.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.06)] sm:grid-cols-2 lg:grid-cols-5">
          {MARKETS.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal
                key={m.title}
                delay={(i % 5) * 70}
                className="bg-[rgba(255,255,255,0.02)] px-6 py-10 text-center transition-colors hover:bg-[rgba(255,255,255,0.06)]"
              >
                <Icon
                  className="mx-auto h-6 w-6 text-silver"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-base font-medium text-ivory">
                  {m.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[rgba(250,247,242,0.4)]">
                  {m.text}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
