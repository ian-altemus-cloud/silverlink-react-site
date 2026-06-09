import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Our Mission — SilverLink AI',
  description:
    'Local businesses deserve enterprise tools. Why we built SilverLink AI.',
}

const VALUES = [
  {
    title: 'The problem first, always',
    text: 'Technology is only valuable when it solves something real. We start with the business outcome and work backward to the architecture.',
  },
  {
    title: 'Security is not optional',
    text: "Your clients' conversations are private. Every system we build starts with zero stored credentials and least-privilege access.",
  },
  {
    title: 'Invisible is the goal',
    text: "The best technology disappears into the background. Your clients should feel like your business is attentive — not like they're talking to software.",
  },
  {
    title: 'Real results, not demos',
    text: "We measure success in bookings converted and time saved — not in dashboards that look impressive but don't move the business forward.",
  },
]

export default function MissionPage() {
  return (
    <>
      <PageHero
        image="/images/mission.png"
        eyebrow="Our Mission"
        title={
          <>
            Local businesses deserve{' '}
            <em className="font-light italic text-silver">enterprise tools.</em>
          </>
        }
        intro="The technology that helps large companies respond instantly has long been gated by cost and complexity. We built SilverLink to remove those barriers."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h3 className="text-2xl">Why we built this</h3>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-4 leading-relaxed text-body">
              SilverLink started with a real problem: a thriving, multi-location
              nail salon was losing clients every week simply because there
              weren&apos;t enough hours in the day to handle the flood of
              Instagram inquiries. We searched for a solution and found a market
              void.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 leading-relaxed text-body">
              We didn&apos;t build a prototype — we built a production-grade
              system deployed on enterprise-level AWS infrastructure. Powerful,
              reliable, and entirely plug-and-play.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={(i % 2) * 80}
                className="bg-ivory px-8 py-10"
              >
                <h3 className="text-lg">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 border border-border bg-cream p-10">
              <p className="eyebrow">Who We Are</p>
              <p className="mt-5 leading-relaxed text-body">
                Founded by cloud infrastructure engineer and business owner Ian
                Altemus, SilverLink was built by someone who understands both
                sides — the engineering required to build it right and the
                operational reality of running a service business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Ready to work together?"
        subtitle="Book a free demo and let's talk about your business."
      />
    </>
  )
}
