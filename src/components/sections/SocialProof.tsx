import SectionHeader from './SectionHeader'
import { SITE, EARLY_ACCESS } from '../../data/site'

type StampKind = 'boat' | 'lavender' | 'sunset'

// compact island motifs — the postage on each card
function StampArt({ kind }: { kind: StampKind }) {
  switch (kind) {
    case 'boat':
      return (
        <>
          <rect y="30" width="44" height="22" fill="#5fa3b0" />
          <circle cx="33" cy="12" r="4.5" fill="#e7b24a" />
          <line x1="22" y1="17" x2="22" y2="33" stroke="#6a4d30" strokeWidth="1.4" />
          <path d="M22.6 18 L31 32 L22.6 32 Z" fill="#ece1c9" stroke="#b3a585" strokeWidth="0.5" />
          <path d="M9 32 Q22 40 35 32 L31.5 37 Q22 40 12.5 37 Z" fill="#c15b3c" />
        </>
      )
    case 'lavender':
      return (
        <>
          <circle cx="33" cy="12" r="4.5" fill="#e7b24a" />
          <g stroke="#6e7858" strokeWidth="1.4" strokeLinecap="round" fill="none">
            <path d="M14 48 Q15 34 16 24" />
            <path d="M22 49 Q22 32 22 21" />
            <path d="M30 48 Q30 34 28 25" />
          </g>
          <g fill="#8a73b8">
            {[[16, 24], [15, 27], [22, 21], [21, 24], [23, 25], [28, 25], [27, 28]].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx={1.7} ry={2.3} />
            ))}
          </g>
        </>
      )
    case 'sunset':
      return (
        <>
          <rect width="44" height="52" fill="#f6e3c9" />
          <circle cx="23" cy="27" r="9" fill="#e07a3c" />
          <rect y="31" width="44" height="21" fill="#3f7e8c" />
          <g stroke="#f0c98a" strokeWidth="1" opacity="0.7">
            <line x1="16" y1="36" x2="30" y2="36" />
            <line x1="19" y1="41" x2="27" y2="41" />
          </g>
        </>
      )
  }
}

function Postage({ kind, place }: { kind: StampKind; place: string }) {
  return (
    <div className="relative flex-none">
      <div className="stamp-frame bg-[#f3ece0] p-1">
        <svg viewBox="0 0 44 52" className="h-12 w-10" aria-hidden="true">
          <rect width="44" height="52" fill="#f3ece0" />
          <StampArt kind={kind} />
        </svg>
      </div>
      <svg
        viewBox="0 0 64 64"
        className="pointer-events-none absolute -right-4 -top-3 h-16 w-16 opacity-70"
        aria-hidden="true"
      >
        <g fill="none" stroke="#147a70" strokeWidth="1.1">
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="32" r="14" />
        </g>
        <text x="32" y="22" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="#147a70" letterSpacing="0.5">
          BONACA
        </text>
        <text x="32" y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="5.5" fill="#147a70">
          HR · ✶
        </text>
        <text x="32" y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fontWeight="700" fill="#147a70">
          {place.toUpperCase()}
        </text>
        <g stroke="#147a70" strokeWidth="1.1" opacity="0.8" fill="none">
          <path d="M50 26 q6 3 12 0" />
          <path d="M50 31 q6 3 12 0" />
          <path d="M50 36 q6 3 12 0" />
        </g>
      </svg>
    </div>
  )
}

export default function SocialProof() {
  return (
    <section className="page-wrap mt-24">
      <SectionHeader
        index="—"
        kicker="Rani pristup"
        title="Što dobiva tko je prvi na listi."
        intro="Bonaca je još u izradi, a pilot je u tijeku na obali. Lista čekanja nije marketinški red — ona stvarno određuje tko prvi dobije uređaj, po kojoj cijeni i čije povratne informacije ga oblikuju."
        className="mb-12"
      />

      <div className="relative flex flex-wrap items-start justify-center gap-x-6 gap-y-10 sm:gap-x-8">
        {EARLY_ACCESS.map((item) => (
          <article
            key={item.title}
            className="scatter-card paper-card w-[300px] max-w-[88vw] px-6 pb-5 pt-7"
            style={{ ['--rot' as string]: `${item.rot}deg` } as React.CSSProperties}
          >
            {item.tape && (
              <span
                className="tape"
                aria-hidden="true"
                style={
                  {
                    top: '-9px',
                    [item.tape]: '24px',
                    transform: item.tape === 'left' ? 'rotate(-8deg)' : 'rotate(7deg)',
                  } as React.CSSProperties
                }
              />
            )}

            <div className="relative flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="display-title m-0 mb-2 text-xl font-semibold" style={{ color: '#2a2420' }}>
                  {item.title}
                </p>
                <p className="m-0 text-[0.92rem] leading-relaxed" style={{ color: '#564b40' }}>
                  {item.note}
                </p>
              </div>
              <Postage kind={item.stamp} place={item.place} />
            </div>
          </article>
        ))}

        {/* honest status stamp — the pilot, not a fabricated headcount */}
        <div className="flex w-[300px] max-w-[88vw] items-center justify-center sm:w-auto sm:self-center">
          <div className="plate-stamp -rotate-[6deg] px-5 py-3 text-center leading-tight">
            <span className="block font-mono text-[0.58rem] font-bold tracking-[0.18em]">PILOT U TIJEKU</span>
            <span className="display-title block text-2xl font-bold">Rani pristup</span>
            <span className="block font-mono text-[0.55rem] font-bold tracking-[0.14em]">
              ✶ PRVA SERIJA · {SITE.launchWindow.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
