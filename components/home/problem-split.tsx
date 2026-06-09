import { Reveal } from '@/components/reveal'

const PROBLEMS = [
  {
    num: '01',
    title: 'DMs come in at all hours',
    text: 'Clients browse Instagram at night and on weekends. Your business needs to be there when they are.',
  },
  {
    num: '02',
    title: 'Slow responses cost real money',
    text: 'Responding within 5 minutes converts at 10x the rate of responding within an hour. Most businesses respond in hours, if at all.',
  },
  {
    num: '03',
    title: 'You answer the same questions daily',
    text: 'Pricing, availability, location: the same five questions, hundreds of times a month. Your time is worth more.',
  },
]

export function ProblemSplit() {
  return (
    <section className="grid lg:grid-cols-2">
      <div
        className="min-h-[360px] bg-cover bg-center lg:min-h-full"
        style={{ backgroundImage: "url('/images/problem.png')" }}
        aria-hidden="true"
      />
      <div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:py-28">
        <Reveal>
          <p className="eyebrow">The Problem</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-balance text-4xl md:text-5xl">
            Every missed DM is a missed booking.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Your clients find you on Instagram. They message at 10pm on a
            Tuesday. If you don&apos;t respond fast, they book somewhere else.
          </p>
        </Reveal>
        <div className="mt-10 border-t border-border">
          {PROBLEMS.map((p, i) => (
            <Reveal
              key={p.num}
              delay={i * 80}
              className="grid grid-cols-[64px_1fr] gap-x-6 border-b border-border py-9"
            >
              <span className="font-serif text-6xl font-light leading-none text-warm">
                {p.num}
              </span>
              <div>
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
