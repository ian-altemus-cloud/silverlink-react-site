import { Reveal } from '@/components/reveal'

const FEATURES = [
  {
    title: 'Seamless Client Recall',
    text: 'Our AI remembers every past interaction and preference. Your clients feel like VIPs because the conversation picks up exactly where it left off.',
  },
  {
    title: "Your Brand's Voice, Not Ours",
    text: 'From luxury med spa to high-energy lash studio, the AI adopts your specific brand voice, like your best receptionist handling every message with perfect etiquette, 24/7.',
  },
  {
    title: 'No-Leak Booking Funnel',
    text: 'Automatically flags high-intent messages and guides them to your booking link. Never lose a $300 service to a buried notification again.',
  },
  {
    title: 'Intelligent Lead Qualification',
    text: 'The AI handles the pre-conversation questions for you. You step in only when a client is qualified, engaged, and ready to book.',
  },
  {
    title: 'Revenue Visibility',
    text: 'See exactly how many bookings were captured while you were behind the chair or asleep. Clear data on every conversation, every conversion.',
  },
  {
    title: 'Studio-Grade Security',
    text: 'Your account and client data are protected with bank-level encryption. Professional, secure, and fully compliant, so you can focus on your craft.',
  },
]

export function Features() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">Features</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 max-w-xl text-balance text-4xl md:text-5xl">
            Everything your business needs. Nothing it doesn&apos;t.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 80}
              className="group bg-ivory p-10 transition-colors hover:bg-cream"
            >
              <span className="relative block h-px w-10 bg-silver2">
                <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rounded-full bg-silver2" />
              </span>
              <h3 className="mt-7 text-xl">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
