import SectionHeader from './SectionHeader'

type StampKind = 'lavender' | 'swords' | 'beach' | 'boat' | 'pines' | 'sunset'

const PLACES: Array<{
  name: string
  note: string
  coords: string
  stamp: StampKind
  rot: number
  tx: string
  ty: string
  tape: 'left' | 'right' | null
}> = [
  { name: 'Hvar', note: 'Lavanda, kamen i podnevna žega.', coords: 'N 43.17° · E 16.44°', stamp: 'lavender', rot: -7, tx: '-4px', ty: '18px', tape: 'left' },
  { name: 'Korčula', note: 'Moreška, mač i stare škure.', coords: 'N 42.96° · E 17.14°', stamp: 'swords', rot: 5, tx: '8px', ty: '-10px', tape: null },
  { name: 'Brač', note: 'Zlatni rat i bijeli kamen.', coords: 'N 43.31° · E 16.65°', stamp: 'beach', rot: -3.5, tx: '-2px', ty: '22px', tape: 'right' },
  { name: 'Vis', note: 'Ribarske barke, daleko od svega.', coords: 'N 43.06° · E 16.18°', stamp: 'boat', rot: 7.5, tx: '6px', ty: '2px', tape: null },
  { name: 'Mljet', note: 'Nacionalni park, jezera i borova šuma.', coords: 'N 42.75° · E 17.58°', stamp: 'pines', rot: -6, tx: '-8px', ty: '16px', tape: 'left' },
  { name: 'Zadar', note: 'Najljepši zalazak i nova klima.', coords: 'N 44.12° · E 15.23°', stamp: 'sunset', rot: 4, tx: '4px', ty: '-8px', tape: null },
]

function StampArt({ kind }: { kind: StampKind }) {
  switch (kind) {
    case 'lavender':
      return (
        <>
          <circle cx="33" cy="12" r="4.5" fill="#e7b24a" />
          <g stroke="#6e7858" strokeWidth="1.4" strokeLinecap="round" fill="none">
            <path d="M14 47 Q15 33 16 23" />
            <path d="M22 48 Q22 31 22 20" />
            <path d="M30 47 Q30 33 28 24" />
          </g>
          <g fill="#8a73b8">
            {[[16, 23], [15, 26], [17, 27], [15, 29], [16, 31],
              [22, 20], [21, 23], [23, 24], [21, 26], [23, 27], [22, 29],
              [28, 24], [27, 27], [29, 28], [27, 30], [28, 32]].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx={1.7} ry={2.3} />
            ))}
          </g>
        </>
      )
    case 'swords':
      return (
        <>
          {[35, -35].map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 22 28)`}>
              <rect x="20.6" y="7" width="2.8" height="30" rx="1.4" fill="#c2c6cc" />
              <path d="M20.6 7 L23.4 7 L22 4 Z" fill="#9aa0a8" />
              <rect x="16" y="36" width="12" height="3.4" rx="1.5" fill="#c15b3c" />
              <rect x="21" y="39" width="2" height="8" fill="#8f4a2a" />
              <circle cx="22" cy="48" r="2" fill="#c15b3c" />
            </g>
          ))}
        </>
      )
    case 'beach':
      return (
        <>
          <rect y="23" width="44" height="29" fill="#5fa3b0" />
          <circle cx="34" cy="11" r="4.5" fill="#e7b24a" />
          <path d="M18 23 L26 23 L23.5 45 Q22 48 20.5 45 Z" fill="#ece1c9" />
          <g fill="#4f6f4a">
            <path d="M22 24 l3.4 5 h-6.8 z" />
            <path d="M22 28 l4.2 6 h-8.4 z" />
          </g>
          <rect x="21.3" y="33" width="1.4" height="3.5" fill="#6a4d30" />
        </>
      )
    case 'boat':
      return (
        <>
          <rect y="31" width="44" height="21" fill="#5fa3b0" />
          <circle cx="33" cy="12" r="4.5" fill="#e7b24a" />
          <line x1="22" y1="18" x2="22" y2="34" stroke="#6a4d30" strokeWidth="1.4" />
          <path d="M22.6 19 L31 33 L22.6 33 Z" fill="#ece1c9" stroke="#b3a585" strokeWidth="0.5" />
          <path d="M9 33 Q22 41 35 33 L31.5 38 Q22 41 12.5 38 Z" fill="#c15b3c" />
          <g stroke="#cfe6ea" strokeWidth="1" opacity="0.7">
            <line x1="6" y1="44" x2="14" y2="44" />
            <line x1="30" y1="46" x2="40" y2="46" />
          </g>
        </>
      )
    case 'pines':
      return (
        <>
          <rect y="34" width="44" height="18" fill="#3f7e8c" />
          <circle cx="33" cy="11" r="4.5" fill="#e7b24a" />
          {[[11, 30], [19, 33]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 -22 L6 -10 L-6 -10 Z" fill="#3e5c3a" />
              <path d="M0 -15 L7 -3 L-7 -3 Z" fill="#4c6e46" />
              <rect x="-1.4" y="-3" width="2.8" height="5" fill="#6a4d30" />
            </g>
          ))}
          <g stroke="#dff0ee" strokeWidth="1" opacity="0.55">
            <line x1="26" y1="40" x2="38" y2="40" />
            <line x1="29" y1="45" x2="37" y2="45" />
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
          <g fill="#d8cdb6">
            <rect x="4" y="31" width="9" height="3" />
            <rect x="4" y="35" width="7" height="3" />
            <rect x="4" y="39" width="5" height="3" />
          </g>
        </>
      )
  }
}

function Stamp({ kind }: { kind: StampKind }) {
  return (
    <div className="stamp-frame flex-none p-1">
      <svg viewBox="0 0 44 52" className="h-12 w-10" aria-hidden="true">
        <rect width="44" height="52" fill="#f3ece0" />
        <StampArt kind={kind} />
      </svg>
    </div>
  )
}

// label burned into the corner of each chapter — same treatment as the Hero's brand kicker
function ChapterLabel({ roman, name }: { roman: string; name: string }) {
  return (
    <p className="island-kicker relative z-10 mb-4" style={{ color: '#fff', textShadow: '0 1px 10px rgba(20,12,4,0.7)' }}>
      {roman} · {name}
    </p>
  )
}

export default function IslandsSection() {
  return (
    <section id="otoci" className="page-wrap mt-24 scroll-mt-24">
      <SectionHeader
        index="06 — 07"
        kicker="Otkuda dolazimo"
        title="Sve je počelo s bonacom."
        intro="Bonaca nije nastala u uredu. Došla je iz tri stvari koje gledamo cijeli život: mjesta koja nas oblikuju, more koje znade potpuno stati, i kuće koje su vrućinu rješavale i prije struje."
        className="mb-10"
      />

      {/* one continuous object, three chapters — each frame fades into the next instead of stacking as separate cards */}
      <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(40,24,10,0.4)]">
        {/* I — places */}
        <div className="table-wood relative px-4 py-14 sm:px-10 sm:py-20">
          <ChapterLabel roman="I" name="Mjesta" />
          <span className="coffee-ring" style={{ right: '6%', top: '8%' }} aria-hidden="true" />
          <span className="coffee-ring" style={{ left: '3%', bottom: '4%', width: '70px', height: '70px' }} aria-hidden="true" />

          {/* a hand-drawn route, like a finger traced over the postcards while planning the trip */}
          <svg
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-[0.35] sm:block"
            aria-hidden="true"
          >
            <path
              d="M70 90 Q230 40 280 160 T520 130 Q620 110 560 250 T760 310"
              fill="none"
              stroke="#e8dfc9"
              strokeWidth="1.6"
              strokeDasharray="2 9"
              strokeLinecap="round"
            />
            {[[70, 90], [280, 160], [520, 130], [560, 250], [760, 310]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#e8dfc9" opacity="0.8" />
            ))}
          </svg>

          {/* compass doodle, tucked in a corner */}
          <svg viewBox="0 0 60 60" className="pointer-events-none absolute right-[4%] top-[5%] h-12 w-12 opacity-40 sm:h-14 sm:w-14" aria-hidden="true">
            <circle cx="30" cy="30" r="22" fill="none" stroke="#e8dfc9" strokeWidth="1" />
            <path d="M30 10 L34 30 L30 50 L26 30 Z" fill="#e8dfc9" opacity="0.85" />
            <path d="M10 30 L30 26 L50 30 L30 34 Z" fill="#e8dfc9" opacity="0.5" />
            <text x="30" y="7" textAnchor="middle" fontSize="6" fill="#e8dfc9" fontFamily="serif">N</text>
          </svg>

          <div className="relative mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-y-5">
            {PLACES.map((place, index) => (
              <article
                key={place.name}
                className={`scatter-card paper-card -mx-3 max-w-[80vw] p-5 pt-6 ${index % 2 === 0 ? 'w-[252px]' : 'w-[268px]'}`}
                style={
                  {
                    '--rot': `${place.rot}deg`,
                    '--tx': place.tx,
                    '--ty': place.ty,
                    zIndex: index % 2 === 0 ? 2 : 1,
                  } as React.CSSProperties
                }
              >
                {place.tape && (
                  <span
                    className="tape"
                    aria-hidden="true"
                    style={{
                      top: '-9px',
                      [place.tape]: '18px',
                      transform: place.tape === 'left' ? 'rotate(-8deg)' : 'rotate(7deg)',
                    } as React.CSSProperties}
                  />
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="display-title m-0 mb-1 text-xl font-semibold" style={{ color: '#2a2420' }}>
                      {place.name}
                    </p>
                    <p className="m-0 text-sm" style={{ color: '#6b5f55' }}>
                      {place.note}
                    </p>
                  </div>
                  <Stamp kind={place.stamp} />
                </div>
                <div className="relative mt-4 flex items-center gap-2 border-t border-dashed border-[rgba(120,95,55,0.35)] pt-3">
                  <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: '#147a70' }} />
                  <span className="postmark" style={{ color: '#147a70' }}>
                    {place.coords}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* this photo fades to pure black right where it meets the strip below */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28"
            style={{ background: 'linear-gradient(180deg, transparent, #0a0807)' }}
          />
        </div>

        {/* a clean black strip — the uniform seam, regardless of what colors sit on either side of it */}
        <div className="h-10 bg-[#0a0807] sm:h-14" />

        {/* II — the word itself */}
        <div
          className="relative flex min-h-[400px] items-center bg-cover bg-center px-6 py-16 sm:min-h-[440px] sm:px-16"
          style={{ backgroundImage: "url('/assets/sea-bonaca.jpg')" }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28"
            style={{ background: 'linear-gradient(0deg, transparent, #0a0807)' }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28"
            style={{ background: 'linear-gradient(180deg, transparent, #0a0807)' }}
          />
          <div className="relative ml-auto max-w-sm rounded-2xl p-5 text-right backdrop-blur-sm sm:p-6" style={{ background: 'rgba(8,14,16,0.4)' }}>
            <ChapterLabel roman="II" name="Bonaca" />
            <h3 className="display-title mb-2.5 text-lg font-bold leading-snug text-white sm:text-xl">
              Riječ za more koje stane.
            </h3>
            <p className="m-0 text-[0.85rem] leading-relaxed text-[rgba(255,255,255,0.86)]">
              Mornari to zovu bonaca — nema vjetra, nema vala, samo vrućina koja legne na vodu. Lijepo je prvih deset
              minuta. Onda je samo vruće. Ime smo uzeli po točno tom trenutku — kad zatreba daljinski kojeg ne možete
              pronaći.
            </p>
          </div>
        </div>

        {/* a clean black strip — the uniform seam, regardless of what colors sit on either side of it */}
        <div className="h-10 bg-[#0a0807] sm:h-14" />

        {/* III — the house that already knew */}
        <div
          className="relative flex min-h-[400px] items-center bg-cover bg-center px-6 py-16 sm:min-h-[440px] sm:px-16"
          style={{ backgroundImage: "url('/assets/stone-house-shutters.jpg')" }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28"
            style={{ background: 'linear-gradient(0deg, transparent, #0a0807)' }}
          />
          <div className="relative max-w-sm rounded-2xl p-5 backdrop-blur-sm sm:p-6" style={{ background: 'rgba(20,15,8,0.42)' }}>
            <ChapterLabel roman="III" name="Kuća koja već zna" />
            <h3 className="display-title mb-2.5 text-lg font-bold leading-snug text-white sm:text-xl">
              Vrućina je rješavana i prije struje.
            </h3>
            <p className="m-0 text-[0.85rem] leading-relaxed text-[rgba(255,255,255,0.86)]">
              Debeli zid, mali prozor, škure zatvorene u podne — ne po uputama, nego po iskustvu generacija. Klima na
              zidu je samo novi sloj iste ideje. Nismo joj htjeli oduzeti mjesto. Htjeli smo joj dati pamćenje.
            </p>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-base text-[var(--ink-soft)]">
        Bonaca je spoj sva tri — i razlog zašto smo je uopće htjeli napraviti.
      </p>
    </section>
  )
}
