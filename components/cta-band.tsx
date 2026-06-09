import Link from 'next/link'
import { Reveal } from './reveal'

interface CtaBandProps {
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function CtaBand({
  title,
  subtitle,
  ctaLabel = 'Book a Free Demo',
  ctaHref = '/contact',
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13,12,10,0.92), rgba(13,12,10,0.82))',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <Reveal>
          <h2 className="text-balance text-4xl text-ivory md:text-5xl lg:text-6xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-[rgba(250,247,242,0.55)]">
            {subtitle}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <Link
            href={ctaHref}
            className="mt-10 inline-flex items-center bg-ivory px-12 py-4 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-px"
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
