import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { MetaBadge } from './meta-badge'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1626383137804-ff908d2753a2?q=80&w=2670&auto=format&fit=crop')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(13,12,10,0.78) 0%, rgba(13,12,10,0.55) 52%, rgba(13,12,10,0.25) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background: 'linear-gradient(to top, var(--ink), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-40 md:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-[rgba(184,188,196,0.6)]">
              A Managed AI Receptionist
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-6xl text-ivory md:text-7xl lg:text-[88px]">
              Your Instagram.
              <br />
              <em className="font-light italic text-silver">Always answered.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-pretty leading-relaxed text-[rgba(250,247,242,0.6)]">
              SilverLink AI handles every client inquiry in your voice, around
              the clock. Every question answered. Every lead closed. Without you
              lifting a finger.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-ivory px-10 py-4 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-px"
              >
                Book a Free Demo
              </Link>
              <Link
                href="/how-it-works"
                className="border border-[rgba(250,247,242,0.3)] px-10 py-4 text-xs font-medium uppercase tracking-[0.12em] text-ivory transition-colors hover:border-[rgba(250,247,242,0.7)]"
              >
                See How It Works
              </Link>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <MetaBadge />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
