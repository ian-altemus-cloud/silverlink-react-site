import { Reveal } from '@/components/reveal'

interface QuoteSectionProps {
  quote: string
  author?: string
  detail?: string
}

export function QuoteSection({ quote, author, detail }: QuoteSectionProps) {
  return (
    <section className="relative overflow-hidden bg-ink2 px-6 py-32 text-center md:py-40">
      <span
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(184,188,196,0.2), transparent)',
        }}
        aria-hidden="true"
      />
      <span
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(184,188,196,0.2), transparent)',
        }}
        aria-hidden="true"
      />
      <Reveal>
        <span
          className="mx-auto block font-serif text-[120px] leading-[0.5] text-silver"
          style={{ opacity: 0.12 }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
      </Reveal>
      <Reveal delay={80}>
        <p className="mx-auto mt-5 max-w-3xl text-balance font-serif text-3xl font-light italic leading-snug text-ivory md:text-4xl">
          {quote}
        </p>
      </Reveal>
      {author && (
        <Reveal delay={160}>
          <p className="mt-10 text-xs uppercase tracking-[0.12em] text-[rgba(250,247,242,0.35)]">
            <strong className="font-medium text-[rgba(250,247,242,0.65)]">
              {author}
            </strong>
            {detail ? ` — ${detail}` : ''}
          </p>
        </Reveal>
      )}
    </section>
  )
}
