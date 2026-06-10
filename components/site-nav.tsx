'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Logo } from './logo'

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Study', href: '/case-study' },
  { label: 'Mission', href: '/mission' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Home has a dark hero behind a transparent nav; other pages use a light nav.
  const overHero = pathname === '/'
  const light = !overHero || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: light ? 'rgba(250,247,242,0.92)' : 'rgba(13,12,10,0.72)',
        backdropFilter: 'blur(20px)',
        borderBottom: light
          ? '1px solid var(--border)'
          : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo variant={light ? 'dark' : 'light'} />

        <div className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.08em] transition-colors"
              style={{
                color:
                  pathname === link.href
                    ? light
                      ? 'var(--ink)'
                      : 'var(--ivory)'
                    : light
                      ? 'rgba(44,40,32,0.5)'
                      : 'rgba(250,247,242,0.5)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="border px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors"
            style={{
              color: light ? 'var(--ink)' : 'var(--ivory)',
              borderColor: light
                ? 'rgba(44,40,32,0.25)'
                : 'rgba(250,247,242,0.3)',
            }}
          >
            Login
          </Link>
          <Link
            href="/contact"
            className="px-7 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-transform hover:-translate-y-px"
            style={{
              background: light ? 'var(--ink)' : 'var(--ivory)',
              color: light ? 'var(--ivory)' : 'var(--ink)',
            }}
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="relative block h-4 w-5">
            <span
              className="absolute left-0 block h-px w-5 transition-transform duration-300"
              style={{
                background: light ? 'var(--ink)' : 'var(--ivory)',
                top: menuOpen ? '7px' : '2px',
                transform: menuOpen ? 'rotate(45deg)' : 'none',
              }}
            />
            <span
              className="absolute left-0 top-[7px] block h-px w-5 transition-opacity duration-200"
              style={{
                background: light ? 'var(--ink)' : 'var(--ivory)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="absolute left-0 block h-px w-5 transition-transform duration-300"
              style={{
                background: light ? 'var(--ink)' : 'var(--ivory)',
                top: menuOpen ? '7px' : '12px',
                transform: menuOpen ? 'rotate(-45deg)' : 'none',
              }}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t lg:hidden"
          style={{
            background: 'var(--ivory)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b py-4 text-sm font-medium uppercase tracking-[0.08em] text-charcoal"
                style={{ borderColor: 'var(--border)' }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="border border-input px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-ink"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="bg-ink px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-ivory"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
