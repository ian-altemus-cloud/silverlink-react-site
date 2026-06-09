import { Reveal } from './reveal'

interface PageHeroProps {
  image: string
  eyebrow: string
  title: React.ReactNode
  intro?: string
  align?: 'left' | 'center'
}

export function PageHero({
  image,
  eyebrow,
  title,
  intro,
  align = 'left',
}: PageHeroProps) {
  const centered = align === 'center'
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: centered
            ? 'linear-gradient(to bottom, rgba(13,12,10,0.7), rgba(13,12,10,0.82))'
            : 'linear-gradient(to right, rgba(13,12,10,0.92) 0%, rgba(13,12,10,0.7) 55%, rgba(13,12,10,0.4) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-44"
        style={{
          background: 'linear-gradient(to top, var(--ink), transparent)',
        }}
        aria-hidden="true"
      />
      <div
        className={`relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 ${
          centered ? 'text-center' : ''
        }`}
      >
        <Reveal>
          <p
            className={`eyebrow text-[rgba(184,188,196,0.7)] ${
              centered ? 'eyebrow-center' : ''
            }`}
          >
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1
            className={`mt-5 max-w-3xl text-balance text-5xl text-ivory md:text-6xl lg:text-7xl ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p
              className={`mt-6 max-w-xl text-pretty leading-relaxed text-[rgba(250,247,242,0.6)] ${
                centered ? 'mx-auto' : ''
              }`}
            >
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
