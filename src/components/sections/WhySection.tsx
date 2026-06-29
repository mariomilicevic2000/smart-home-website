import SectionHeader from './SectionHeader'

// Engraved spec rows — but the "specs" are the reasons to keep your old AC.
const ROWS = [
  { label: 'Stanje klime', value: 'Radi savršeno' },
  { label: 'Potrebna zamjena', value: 'Ne' },
  { label: 'Montaža', value: '5 min · bez bušenja' },
  { label: 'Daljinski', value: 'Uči skoro svaki' },
  { label: 'Upravljanje', value: 'Mobitel, bilo gdje' },
  { label: 'Raspored', value: 'Automatski' },
]

// screws sit in the four corners; each slot turned a little differently
const SCREWS = [
  { pos: { top: '14px', left: '14px' }, slot: '24deg' },
  { pos: { top: '14px', right: '14px' }, slot: '-52deg' },
  { pos: { bottom: '14px', left: '14px' }, slot: '108deg' },
  { pos: { bottom: '14px', right: '14px' }, slot: '8deg' },
]

export default function WhySection() {
  return (
    <section className="page-wrap mt-24 scroll-mt-24">
      <SectionHeader
        index="01 — 07"
        kicker="Zašto Bonaca"
        title="Zašto bacati klimu koja dobro radi?"
        intro="Vaša klima i dalje hladi savršeno. Samo joj treba pamet, ne zamjena."
        className="mb-10"
      />

      {/* the answer, engraved into the kind of metal nameplate riveted to every old appliance */}
      <div className="nameplate mx-auto max-w-3xl px-7 py-8 sm:px-12 sm:py-10">
        {SCREWS.map((screw, i) => (
          <span key={i} className="plate-screw" style={{ ...screw.pos, ['--slot' as string]: screw.slot } as React.CSSProperties} aria-hidden="true" />
        ))}

        {/* masthead */}
        <div className="relative mb-6 flex items-end justify-between gap-3 border-b plate-divider pb-3">
          <div>
            <p className="engrave-strong display-title m-0 text-xl font-bold leading-none">Bonaca</p>
            <p className="engrave mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em]">Pločica o nadogradnji</p>
          </div>
          <p className="engrave font-mono text-[0.58rem] uppercase tracking-[0.16em]">Tip · klima-uređaj</p>
        </div>

        {/* body: engraved spec rows + the device embossed into the plate */}
        <div className="relative grid gap-8 sm:grid-cols-[1fr_180px] sm:items-center">
          <dl className="m-0">
            {ROWS.map((row, i) => (
              <div key={row.label} className={`flex items-baseline gap-3 py-2.5 ${i > 0 ? 'border-t plate-divider' : ''}`}>
                <dt className="engrave flex-none font-mono text-[0.66rem] uppercase tracking-[0.14em]">{row.label}</dt>
                <span className="plate-leader -translate-y-0.5 flex-1" aria-hidden="true" />
                <dd className="engrave-strong m-0 flex-none text-right text-sm font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col items-center gap-6">
            <div className="pebble-emboss h-24 w-24">
              <svg viewBox="0 0 80 80" className="h-14 w-16" aria-hidden="true">
                <path
                  d="M14 50 q26 -30 52 0"
                  fill="none"
                  stroke="#5b594f"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.5))' }}
                />
                <line x1="14" y1="50" x2="66" y2="50" stroke="#5b594f" strokeWidth="2.2" strokeLinecap="round" />
                <rect
                  x="28"
                  y="39.5"
                  width="24"
                  height="3"
                  rx="1.5"
                  fill="var(--signal)"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(45,212,200,0.9))' }}
                />
              </svg>
            </div>

            <span className="plate-stamp -rotate-[7deg] px-3 py-1.5 text-center leading-tight">
              <span className="block text-base">Ne bacati</span>
              <span className="block text-[0.55rem] font-bold tracking-[0.12em] opacity-90">↻ nadogradivo</span>
            </span>
          </div>
        </div>

        {/* footer: fake serial + the wry sign-off */}
        <div className="relative mt-6 flex items-center justify-between gap-4 border-t plate-divider pt-3">
          <span className="engrave font-mono text-[0.58rem] uppercase tracking-[0.16em]">Ser. B-01 · 2026</span>
          <span className="engrave text-right text-xs italic">Staro? Ne — samo još nije bilo pametno.</span>
        </div>
      </div>
    </section>
  )
}
