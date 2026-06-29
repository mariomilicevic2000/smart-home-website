import SectionHeader from './SectionHeader'

const INK = '#5b4f3c'
const SIGNAL = '#147a70'
const SUN = '#c98a3c'

// Hand-inked, patent-manual style line diagrams — one per setup step.
function FigPlace() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* wall AC unit, top-right */}
        <rect x="112" y="24" width="74" height="28" rx="7" />
        <line x1="120" y1="50" x2="178" y2="50" strokeWidth="1.2" />
        <path d="M126 50 q3 5 6 0 M142 50 q3 5 6 0 M158 50 q3 5 6 0" strokeWidth="1.1" />
        {/* shelf plank */}
        <path d="M12 120 L148 120 L148 128 L12 128 Z" />
        {/* pebble device on the shelf */}
        <path d="M28 110 q28 -24 58 0" />
        <line x1="28" y1="110" x2="86" y2="110" />
        <line x1="44" y1="103" x2="70" y2="103" strokeWidth="1.2" />
      </g>
      {/* line of sight to the AC */}
      <path d="M82 100 C 100 78, 110 66, 120 54" fill="none" stroke={SIGNAL} strokeWidth="1.4" strokeDasharray="3 4" strokeLinecap="round" />
      <circle cx="120" cy="54" r="2.4" fill={SIGNAL} />
    </svg>
  )
}

function FigConnect() {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* pebble device, lower-left */}
        <path d="M20 114 q26 -22 54 0" />
        <line x1="20" y1="114" x2="74" y2="114" />
        <line x1="34" y1="107" x2="60" y2="107" strokeWidth="1.2" />
        {/* phone, right */}
        <rect x="138" y="42" width="42" height="78" rx="9" />
        <line x1="146" y1="52" x2="172" y2="52" strokeWidth="1.2" />
        <circle cx="159" cy="112" r="2.6" />
      </g>
      {/* wifi arcs rising off the device */}
      <g fill="none" stroke={SIGNAL} strokeWidth="1.4" strokeLinecap="round">
        <path d="M37 96 q10 -11 20 0" />
        <path d="M31 90 q16 -17 32 0" opacity="0.75" />
        <path d="M25 84 q22 -23 44 0" opacity="0.5" />
        <circle cx="47" cy="99" r="2" fill={SIGNAL} stroke="none" />
        {/* link to the phone */}
        <path d="M66 98 C 104 72, 122 72, 150 82" strokeWidth="1.4" strokeDasharray="3 4" />
      </g>
    </svg>
  )
}

function FigControl() {
  const rays = Array.from({ length: 8 }).map((_, i) => {
    const a = (i * Math.PI) / 4
    return [40 + Math.cos(a) * 13, 30 + Math.sin(a) * 13, 40 + Math.cos(a) * 18, 30 + Math.sin(a) * 18]
  })
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full" aria-hidden="true">
      {/* sun — you're at the beach */}
      <g stroke={SUN} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <circle cx="40" cy="30" r="9" />
        {rays.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <g fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* phone in your hand */}
        <rect x="24" y="62" width="44" height="80" rx="9" />
        <line x1="32" y1="118" x2="60" y2="118" strokeWidth="1.2" />
        {/* far-off house with its AC */}
        <path d="M150 134 L150 104 L168 91 L186 104 L186 134 Z" />
        <rect x="159" y="112" width="13" height="7" rx="1.4" />
      </g>
      <text x="46" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="15" fill={INK}>
        24°
      </text>
      {/* control reaches across the distance */}
      <path d="M64 78 C 112 38, 142 58, 168 98" fill="none" stroke={SIGNAL} strokeWidth="1.4" strokeDasharray="3 4" strokeLinecap="round" />
      <circle cx="168" cy="98" r="2.4" fill={SIGNAL} />
    </svg>
  )
}

const STEPS = [
  {
    number: '01',
    title: 'Postavite',
    desc: 'Stavite Bonacu na policu, stol ili prozorsku dasku — bilo gdje odakle „vidi” vašu klimu.',
    Fig: FigPlace,
  },
  {
    number: '02',
    title: 'Povežite',
    desc: 'Spojite je na WiFi kroz aplikaciju i u nekoliko sekundi „nauči” daljinski vaše klime.',
    Fig: FigConnect,
  },
  {
    number: '03',
    title: 'Upravljajte',
    desc: 'Uključujte, gasite i mijenjajte temperaturu s telefona — kod kuće, na plaži ili stotinama kilometara dalje.',
    Fig: FigControl,
  },
]

export default function HowItWorks() {
  return (
    <section id="kako-radi" className="page-wrap mt-24 scroll-mt-24">
      <SectionHeader
        index="04 — 07"
        kicker="U tri koraka"
        title="Od stare klime do pametne, prije popodnevne kave."
        className="mb-10"
      />

      {/* a quick-start leaflet, the kind folded inside an old AC's box */}
      <div className="paper-card relative mx-auto max-w-3xl overflow-hidden px-6 py-7 sm:px-12 sm:py-10">
        {/* fold creases */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-3 w-[3px]" style={{ left: '33%', background: 'linear-gradient(90deg, rgba(120,95,55,0.12), rgba(255,255,255,0.5))' }} />
          <div className="absolute inset-y-3 w-[3px]" style={{ left: '66%', background: 'linear-gradient(90deg, rgba(120,95,55,0.12), rgba(255,255,255,0.5))' }} />
          <div className="absolute inset-x-3 h-[3px]" style={{ top: '50%', background: 'linear-gradient(180deg, rgba(120,95,55,0.1), rgba(255,255,255,0.45))' }} />
        </div>

        {/* masthead */}
        <div className="relative mb-7 flex items-end justify-between gap-3 border-b-2 pb-3" style={{ borderColor: 'rgba(120,95,55,0.4)' }}>
          <div>
            <p className="display-title m-0 text-lg font-bold leading-none" style={{ color: '#2a2420' }}>
              Bonaca
            </p>
            <p className="postmark mt-1" style={{ color: '#8a6f47' }}>
              MODEL B-01 · UPUTE ZA POSTAVLJANJE
            </p>
          </div>
          <p className="postmark whitespace-nowrap" style={{ color: '#8a6f47' }}>
            ≈ 5 MIN · BEZ ALATA
          </p>
        </div>

        {/* numbered figures */}
        <div className="relative">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 gap-4 py-6 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-8 ${
                index > 0 ? 'border-t border-dashed' : ''
              }`}
              style={index > 0 ? { borderColor: 'rgba(120,95,55,0.4)' } : undefined}
            >
              <figure className="m-0">
                <div className="stamp-frame mx-auto h-[120px] w-full max-w-[200px] bg-[rgba(255,255,255,0.35)] p-2 sm:mx-0">
                  <step.Fig />
                </div>
                <figcaption className="postmark mt-1.5 text-center" style={{ color: '#8a6f47' }}>
                  Sl. {index + 1}
                </figcaption>
              </figure>

              <div>
                <div className="mb-1.5 flex items-baseline gap-3">
                  <span className="display-title text-4xl font-bold leading-none" style={{ color: '#c15b3c' }}>
                    {step.number}
                  </span>
                  <h3 className="m-0 text-xl font-semibold" style={{ color: '#2a2420' }}>
                    {step.title}
                  </h3>
                </div>
                <p className="m-0 text-sm sm:text-[0.95rem]" style={{ color: '#6b5f55' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* footer — fake part code + the wry sign-off */}
        <div className="relative mt-6 flex items-center justify-between gap-4 border-t-2 pt-3" style={{ borderColor: 'rgba(120,95,55,0.4)' }}>
          <span className="flex items-center gap-2">
            <svg width="56" height="16" aria-hidden="true">
              {[0, 4, 6, 11, 13, 14, 19, 23, 25, 30, 34, 36, 41, 45, 50, 52].map((x, i) => (
                <rect key={i} x={x} y="0" width={i % 3 === 0 ? 2.4 : 1.2} height="16" fill="#3a3128" />
              ))}
            </svg>
            <span className="postmark" style={{ color: '#8a6f47' }}>
              BR-01
            </span>
          </span>
          <p className="m-0 text-right text-xs italic" style={{ color: '#8a6f47' }}>
            Daljinski se ne prilaže. To je, uostalom, cijela poanta.
          </p>
        </div>
      </div>
    </section>
  )
}
