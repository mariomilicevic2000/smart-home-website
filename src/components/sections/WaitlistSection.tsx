import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Check, Copy, Share2 } from 'lucide-react'
import { SITE } from '../../data/site'

type Status = 'idle' | 'loading' | 'success' | 'error'

const SHARE_TEXT =
  'Bonaca pretvara staru klimu u pametnu — bez novog uređaja. Otvorena je lista čekanja:'

export default function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [place, setPlace] = useState('')
  const [model, setModel] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  // move focus to the confirmation so screen readers (and everyone) register it
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'loading') return

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Unesite ispravnu e-mail adresu.')
      setStatus('error')
      return
    }
    if (!consent) {
      setError('Molimo potvrdite privolu za kontakt.')
      setStatus('error')
      return
    }

    setError('')
    setStatus('loading')
    try {
      // TODO(backend): POST { email, place, model } to the waitlist endpoint here.
      // The UI states (loading / success / error) are already wired — just
      // replace this block with the real request and throw on failure.
      await new Promise((resolve) => setTimeout(resolve, 700))
      setStatus('success')
    } catch {
      setError('Nešto je pošlo po zlu. Pokušajte ponovno za koji trenutak.')
      setStatus('error')
    }
  }

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Bonaca', text: SHARE_TEXT, url: SITE.url })
        return
      } catch {
        // user dismissed the share sheet — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(SITE.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked — nothing to do
    }
  }

  return (
    <section id="prijava" className="page-wrap mt-24 mb-8 scroll-mt-24">
      <div className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(45,212,200,0.28),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(193,91,60,0.2),transparent_66%)]" />

        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="section-index">07 — 07</span>
          <span className="seam-inline" />
          <span className="tech-label">Budite prvi</span>
        </div>
        <h2 className="display-title mx-auto mb-4 max-w-xl text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
          Uđite u prvu seriju Bonace, po founding cijeni.
        </h2>
        <p className="mx-auto mb-8 max-w-md text-base text-[var(--ink-soft)]">
          Ostavite e-mail, i odakle ste ako želite. Javimo se čim Bonaca bude
          spremna za narudžbu — prijave s liste idu prve. Bez spama, samo poneka
          poruka kad bude važno.
        </p>

        {/* honest incentive: indicative price (anchored) + real, not-fake urgency */}
        <div className="mx-auto mb-8 max-w-md rounded-2xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-5 py-4 text-left">
          <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center sm:justify-start sm:text-left">
            <span className="tech-label" style={{ color: 'var(--terracotta)' }}>
              Founding cijena
            </span>
            <span className="font-semibold text-[var(--ink)]">
              okvirno {SITE.priceFrom}–{SITE.priceTo} {SITE.currency}
            </span>
            <span className="text-sm text-[var(--ink-soft)] line-through">
              nova klima {SITE.priceNewAcFrom} {SITE.currency}+
            </span>
          </div>
          <p className="m-0 mt-2 text-center text-xs text-[var(--ink-soft)] sm:text-left">
            Prva serija je ograničena, a founding cijena vrijedi samo za listu — do
            lansiranja ({SITE.launchWindow}).
          </p>
        </div>

        {status === 'success' ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="rise-in mx-auto max-w-md outline-none"
          >
            <p className="m-0 flex items-center justify-center gap-2 text-base font-semibold text-[var(--signal-deep)]">
              <span className="tech-label" style={{ fontSize: '0.7rem' }}>
                ✓ Upisano
              </span>
              Hvala na prijavi! Javljamo se uskoro.
            </p>
            <p className="m-0 mt-2 text-sm text-[var(--ink-soft)]">
              Znate li nekoga tko ljeti gubi živce s daljinskim? Pošaljite mu Bonacu.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={handleShare} className="btn btn-primary plausible-event-name=Share+Click">
                <Share2 size={16} />
                Podijeli
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SITE.url}`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary plausible-event-name=Share+WhatsApp"
              >
                WhatsApp
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)]"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Link kopiran' : 'Kopiraj link'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mx-auto flex max-w-md flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                placeholder="vasa@email.hr"
                aria-label="E-mail adresa"
                className="flex-1 rounded-full border border-[var(--chip-line)] bg-[var(--stone-soft)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--signal-deep)]"
              />
              <input
                type="text"
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                placeholder="Otok ili grad (opcionalno)"
                aria-label="Otok ili grad (opcionalno)"
                className="flex-1 rounded-full border border-[var(--chip-line)] bg-[var(--stone-soft)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--signal-deep)]"
              />
            </div>

            {/* kills the #1 objection — "will it work with MINE?" — and harvests
                the real model list of the market at the same time */}
            <input
              type="text"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder="Marka i model vaše klime (opcionalno)"
              aria-label="Marka i model vaše klime (opcionalno)"
              className="w-full rounded-full border border-[var(--chip-line)] bg-[var(--stone-soft)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--signal-deep)]"
            />
            <p className="m-0 px-1 text-left text-xs text-[var(--ink-soft)]">
              Radi s većinom klima s daljinskim. Upišite model pa provjerimo baš
              vašu.
            </p>

            <label className="flex items-start gap-2.5 px-1 text-left text-xs text-[var(--ink-soft)]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked)
                  if (status === 'error') setStatus('idle')
                }}
                className="mt-0.5 h-4 w-4 flex-none accent-[var(--signal-deep)]"
              />
              <span>
                Pristajem da me Bonaca kontaktira e-mailom o lansiranju. Bez spama,
                odjava u svakom trenutku. Pogledajte{' '}
                <Link to="/privatnost" className="underline">
                  politiku privatnosti
                </Link>
                .
              </span>
            </label>

            {status === 'error' && (
              <p className="m-0 text-sm font-medium text-[var(--terracotta)]" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary plausible-event-name=Waitlist+Submit w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? 'Šaljem…' : 'Osiguraj founding cijenu'}
            </button>

            <p className="m-0 text-xs text-[var(--ink-soft)]">
              Prijava ne obvezuje na kupnju · obavještavamo vas prvi, bez spama.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
