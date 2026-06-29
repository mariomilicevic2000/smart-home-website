const LINE = 'rgba(42,36,32,0.66)'
const ACCENT = '#1c9d92'
const SHELF = 'rgba(42,36,32,0.16)'

// Tiny blueprint marks — each flat-based, like the Bonaca pebble, never rolling.
function FigNaplav() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <line x1="9" y1="50" x2="55" y2="50" stroke={SHELF} strokeWidth="1.4" strokeLinecap="round" />
      <g fill="none" stroke={LINE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 50 C11 38 26 32 33 33 C44 34 53 39 50 50 Z" />
        <path d="M19 43 C29 40 39 40 47 43" strokeWidth="1.3" />
      </g>
      <circle cx="32" cy="42" r="3" fill={ACCENT} />
    </svg>
  )
}

function FigSedra() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <line x1="9" y1="50" x2="55" y2="50" stroke={SHELF} strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M15 50 C11 36 26 30 33 31 C45 32 53 39 49 50 Z"
        fill="none"
        stroke={LINE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill={LINE} opacity="0.7">
        <circle cx="24" cy="42" r="1.5" />
        <circle cx="32" cy="38" r="1.7" />
        <circle cx="39" cy="43" r="1.4" />
      </g>
      <circle cx="33" cy="40" r="3" fill={ACCENT} />
    </svg>
  )
}

function FigKamik() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <line x1="9" y1="50" x2="55" y2="50" stroke={SHELF} strokeWidth="1.4" strokeLinecap="round" />
      <g fill="none" stroke={LINE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 50 L50 50 L45 34 L33 28 L19 35 Z" />
        <path d="M19 35 L33 28 L45 34" strokeWidth="1.3" />
      </g>
      <circle cx="32" cy="41" r="3" fill={ACCENT} />
    </svg>
  )
}

const OFFSHOOTS = [
  { name: 'Naplav', region: 'Slavonija', Fig: FigNaplav },
  { name: 'Sedra', region: 'Lika', Fig: FigSedra },
  { name: 'Kamik', region: 'Istra', Fig: FigKamik },
]

export default function ComingSoon() {
  return (
    <section id="uskoro" className="page-wrap mb-12 mt-6">
      <div className="island-shell rounded-2xl px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-none gap-1.5">
              {OFFSHOOTS.map((o) => (
                <span
                  key={o.name}
                  title={`${o.name} · ${o.region}`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)]"
                >
                  <o.Fig />
                </span>
              ))}
            </div>
            <div>
              <p className="tech-label mb-1">Što slijedi · uskoro</p>
              <p className="m-0 max-w-md text-sm text-[var(--ink-soft)]">
                Isti mozak, oblik po mjeri mjesta —{' '}
                <span className="font-semibold text-[var(--ink)]">Naplav</span> (Slavonija),{' '}
                <span className="font-semibold text-[var(--ink)]">Sedra</span> (Lika),{' '}
                <span className="font-semibold text-[var(--ink)]">Kamik</span> (Istra).
              </p>
            </div>
          </div>

          <a
            href="#prijava"
            className="btn btn-secondary btn-sm plausible-event-name=ComingSoon+Waitlist flex-none self-start sm:self-auto"
          >
            Na listi čujete prvi
          </a>
        </div>
      </div>
    </section>
  )
}
