import Link from 'next/link'
import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo variant="light" className="mb-5" />
            <p className="max-w-xs text-sm leading-relaxed text-[rgba(250,247,242,0.45)]">
              A managed AI receptionist for local businesses that run on
              Instagram DMs.
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: 'How It Works', href: '/how-it-works' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Case Study', href: '/case-study' },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'Mission', href: '/mission' },
              { label: 'Contact', href: '/contact' },
              { label: 'Login', href: '/login' },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: 'Privacy Policy', href: '/legal#privacy' },
              { label: 'Terms of Service', href: '/legal#terms' },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[rgba(255,255,255,0.08)] pt-8 sm:flex-row sm:items-center">
          <span className="text-xs tracking-[0.06em] text-[rgba(250,247,242,0.35)]">
            &copy; 2026 SilverLink AI. All rights reserved.
          </span>
          <span className="text-xs tracking-[0.06em] text-[rgba(250,247,242,0.25)]">
            info@silverlinkai.com
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgba(250,247,242,0.3)]">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[rgba(250,247,242,0.6)] transition-colors hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
