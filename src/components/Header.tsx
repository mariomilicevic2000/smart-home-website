import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import BrandMark from './BrandMark'

const NAV_LINKS = [
  { href: '#kako-radi', label: 'Kako radi' },
  { href: '#proizvod', label: 'Proizvod' },
  { href: '#iznajmljivaci', label: 'Za iznajmljivače' },
  { href: '#pitanja', label: 'Pitanja' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--ink)] no-underline shadow-[0_8px_24px_rgba(42,36,32,0.1)] sm:px-4 sm:py-2"
          >
            <BrandMark size={24} className="flex-none" />
            <span className="display-title text-[0.95rem] font-semibold">
              Bonaca
            </span>
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a href="#prijava" className="btn btn-primary plausible-event-name=Header+Waitlist">
            Lista čekanja
          </a>
        </div>
      </nav>
    </header>
  )
}
