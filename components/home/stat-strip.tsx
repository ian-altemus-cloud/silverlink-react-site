import { Reveal } from '@/components/reveal'

const STATS = [
  { val: '2.3s', label: 'Average response time' },
  { val: '24/7', label: 'Always on, no exceptions' },
  { val: '94%', label: 'DM response rate' },
  { val: '27%', label: 'Improvement in bookings' },
]

export function StatStrip() {
  return (
    <section className="border-b border-[rgba(255,255,255,0.08)] bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className="border-b border-r border-[rgba(255,255,255,0.08)] px-6 py-12 text-center last:border-r-0 lg:border-b-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
          >
            <div className="font-serif text-5xl font-normal leading-none text-silver">
              {stat.val}
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.1em] text-[rgba(250,247,242,0.3)]">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
