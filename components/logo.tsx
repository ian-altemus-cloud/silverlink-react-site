import Link from 'next/link'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  const isLight = variant === 'light'
  return (
    <Link
      href="/"
      className={`flex items-center gap-3.5 ${className ?? ''}`}
      aria-label="SilverLink AI home"
    >
      <span
        className="flex h-[38px] w-[38px] items-center justify-center border font-serif text-sm font-medium tracking-[0.06em]"
        style={{
          borderColor: isLight ? 'rgba(184,188,196,0.4)' : 'rgba(44,40,32,0.2)',
          color: isLight ? 'var(--silver)' : 'var(--charcoal)',
        }}
      >
        SL
      </span>
      <span
        className="font-serif text-xl font-medium tracking-[0.06em]"
        style={{ color: isLight ? 'var(--ivory)' : 'var(--ink)' }}
      >
        SilverLink AI
      </span>
    </Link>
  )
}
