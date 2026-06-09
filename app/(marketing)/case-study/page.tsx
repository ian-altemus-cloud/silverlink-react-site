import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Case Study — SilverLink AI',
  description:
    'How a multi-location nail salon stopped losing bookings to unanswered Instagram DMs with SilverLink AI.',
}

const STATS = [
  { val: '2.3s', label: 'Avg response time', tone: 'silver' },
  { val: '24/7', label: 'DMs handled automatically', tone: 'dark' },
  { val: '0', label: 'Missed inquiries since go-live', tone: 'dark' },
  { val: '27%', label: 'Booking conversion increase', tone: 'green' },
]

const ARCH = [
  'Secure, encrypted, and verified messaging',
  'Guaranteed and reliable message delivery',
  'Handles peak traffic surges effortlessly',
  'Remembers every customer conversation',
  'Conversations that feel truly human',
  'Monitor performance and visualize data',
]

const toneColor: Record<string, string> = {
  silver: 'var(--silver2)',
  dark: 'var(--ink)',
  green: '#4A8C6A',
}

export default function CaseStudyPage() {
  return (
    <>
      <PageHero
        image="/images/case.png"
        eyebrow="Case Study"
        title={
          <>
            From skeptic to believer{' '}
            <em className="font-light italic text-silver">in one hour.</em>
          </>
        }
        intro="A multi-location nail salon in Southern California was losing bookings every week to unanswered Instagram DMs. Here's what happened when SilverLink went live."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-ivory px-6 py-9 text-center">
                  <div
                    className="font-serif text-5xl font-normal leading-none"
                    style={{ color: toneColor[s.tone] }}
                  >
                    {s.val}
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-16">
            <Reveal>
              <h3 className="text-2xl">The problem</h3>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-4 leading-relaxed text-body">
                Running three salons, the intake process was leaking revenue.
                Instagram DMs — pricing, availability, bookings — were being
                managed inconsistently by staff. If a query wasn&apos;t answered
                in minutes, the client booked with a competitor.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <blockquote className="my-10 border-l-2 border-silver2 bg-cream px-7 py-5">
              <p className="font-serif text-xl italic leading-snug text-ink">
                &ldquo;I don&apos;t want a chatbot. What can it actually do for
                me?&rdquo;
              </p>
              <cite className="mt-2 block text-[11px] not-italic tracking-[0.06em] text-muted-foreground">
                Elena, Owner — Secretive Nail Bar
              </cite>
            </blockquote>
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <h3 className="text-2xl">The tech</h3>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-4 leading-relaxed text-body">
                SilverLink isn&apos;t a fragile, off-the-shelf chatbot. It&apos;s
                a custom-engineered system built to function like a dedicated,
                24/7 digital employee.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {ARCH.map((item, i) => (
                <Reveal
                  key={item}
                  delay={(i % 2) * 70}
                  className="flex items-start gap-3 border border-border bg-card px-4 py-3.5 text-sm text-body"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 bg-silver2" />
                  {item}
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <blockquote className="my-12 border-l-2 border-silver2 bg-cream px-7 py-5">
              <p className="font-serif text-xl italic leading-snug text-ink">
                &ldquo;Wow. This is much better than I imagined. It&apos;s really
                good.&rdquo;
              </p>
              <cite className="mt-2 block text-[11px] not-italic tracking-[0.06em] text-muted-foreground">
                Elena, Owner — Secretive Nail Bar
              </cite>
            </blockquote>
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <h3 className="text-2xl">What changed</h3>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-4 leading-relaxed text-body">
                The business now responds to every Instagram DM within seconds,
                at any hour. By automating the &lsquo;same 5 questions&rsquo;
                Elena reclaimed 12 hours of her week. Her calendar fills while
                she focuses on her craft.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want results like these?"
        subtitle="Book a demo and we'll show you exactly how SilverLink would work for your business."
      />
    </>
  )
}
