import { useEffect, useRef } from 'react'
import StoneWall from '../art/StoneWall'
import OliveBranch from '../art/OliveBranch'

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1)
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

const CAPTIONS: Array<[number, string]> = [
  [0.0, 'Maslinik'],
  [0.26, 'Kamena kuća'],
  [0.5, 'Na polici'],
  [0.66, 'Bonaca'],
]

function GreenShutter({ x }: { x: number }) {
  const slats = []
  for (let i = 0; i < 14; i++) {
    const sy = 286 + i * 21
    slats.push(<line key={i} x1={x + 5} y1={sy} x2={x + 35} y2={sy} stroke="#2a5036" strokeWidth={2} opacity={0.7} />)
  }
  return (
    <g>
      <rect x={x} y={270} width={40} height={320} rx={3} fill="#3f6f4f" stroke="#264d34" strokeWidth={2} />
      <rect x={x + 3} y={273} width={34} height={314} rx={2} fill="#43744f" />
      {slats}
      <rect x={x + 16} y={273} width={3} height={314} fill="#2f5a3e" opacity={0.7} />
    </g>
  )
}

/** The interior seen through the window — shelf, AC, Bonaca, and the cyber overlay. */
function Interior({ cyberRef }: { cyberRef: React.RefObject<SVGGElement | null> }) {
  const grid = []
  for (let gx = 520; gx < 970; gx += 38) {
    grid.push(<line key={`v${gx}`} x1={gx} y1={282} x2={gx} y2={578} stroke="#2dd4c8" strokeWidth={0.5} />)
  }
  for (let gy = 290; gy < 578; gy += 34) {
    grid.push(<line key={`h${gy}`} x1={518} y1={gy} x2={968} y2={gy} stroke="#2dd4c8" strokeWidth={0.5} />)
  }

  return (
    <g clipPath="url(#window-clip)">
      {/* plaster back wall */}
      <rect x={515} y={280} width={452} height={300} fill="#e7d9be" />
      <rect x={515} y={280} width={452} height={300} fill="url(#plaster-shade)" />

      {/* AC split unit on the wall */}
      <g>
        <rect x={772} y={300} width={168} height={50} rx={9} fill="#f3efe7" stroke="#cbbfa8" strokeWidth={1.5} />
        <rect x={780} y={336} width={152} height={7} rx={3.5} fill="#d8cdb6" />
        <line x1={784} y1={313} x2={884} y2={313} stroke="#d2c6ae" strokeWidth={2} />
        <circle cx={922} cy={314} r={3} fill="#7faf86" />
      </g>

      {/* wooden shelf */}
      <g>
        <rect x={525} y={498} width={430} height={15} rx={3} fill="#7a5a39" />
        <rect x={525} y={498} width={430} height={5} rx={3} fill="#9a7a52" />
        <path d="M548 513 L566 513 L556 536 Z" fill="#6a4d30" />
        <path d="M915 513 L933 513 L923 536 Z" fill="#6a4d30" />
      </g>

      {/* Bonaca pebble on the shelf, lantern slit facing the AC */}
      <g>
        <ellipse cx={628} cy={500} rx={78} ry={11} fill="rgba(60,48,30,0.2)" />
        <path
          d="M556 478 C553 452 580 436 628 436 C676 436 703 454 700 480 C698 500 668 500 628 499 C588 500 558 498 556 478 Z"
          fill="url(#pebble-grad)"
          stroke="#bcab88"
          strokeWidth={1.3}
        />
        <path d="M576 456 C600 444 656 444 680 458 C656 451 600 451 576 456 Z" fill="rgba(255,255,255,0.5)" />
        <rect x={596} y={470} width={66} height={8} rx={4} fill="#0e2429" />
        <rect x={599} y={471.5} width={60} height={5} rx={2.5} fill="url(#slit-grad)" style={{ filter: 'drop-shadow(0 0 6px rgba(45,212,200,0.7))' }} />
        <text x={629} y={491} textAnchor="middle" fontFamily="Fraunces, serif" fontSize={9} letterSpacing={1.5} fill="#9a8a68">
          bonaca
        </text>
      </g>

      {/* ---- cyber overlay (revealed in the final phase) ---- */}
      <g ref={cyberRef} style={{ opacity: 0 }}>
        <g opacity={0.32}>{grid}</g>

        {/* signal beam from device to AC */}
        <path
          d="M664 470 C720 444 760 400 836 350"
          fill="none"
          stroke="#2dd4c8"
          strokeWidth={2.4}
          strokeLinecap="round"
          className="beam-flow"
          style={{ filter: 'drop-shadow(0 0 6px rgba(45,212,200,0.8))' }}
        />

        {/* pulse rings at the device */}
        <circle cx={629} cy={474} r={20} fill="none" stroke="#2dd4c8" strokeWidth={1.6} className="signal-ring" />
        <circle cx={629} cy={474} r={20} fill="none" stroke="#2dd4c8" strokeWidth={1.6} className="signal-ring" style={{ animationDelay: '0.9s' }} />

        {/* AC glow + status */}
        <rect x={772} y={300} width={168} height={50} rx={9} fill="none" stroke="#2dd4c8" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 10px rgba(45,212,200,0.6))' }} />

        {/* temp pill */}
        <g>
          <rect x={800} y={244} width={104} height={42} rx={13} fill="#08201f" stroke="#2dd4c8" strokeOpacity={0.6} />
          <text x={820} y={271} fontFamily="Manrope, sans-serif" fontSize={19} fontWeight={700} fill="#5ee8dc">24°C</text>
          <rect x={862} y={252} width={34} height={16} rx={8} fill="#2dd4c8" opacity={0.25} />
          <circle cx={872} cy={260} r={6} fill="#2dd4c8" />
        </g>

        {/* schedule chip */}
        <g>
          <rect x={536} y={300} width={150} height={34} rx={11} fill="#08201f" stroke="#2dd4c8" strokeOpacity={0.5} />
          <circle cx={556} cy={317} r={7} fill="none" stroke="#5ee8dc" strokeWidth={1.6} />
          <line x1={556} y1={317} x2={556} y2={313} stroke="#5ee8dc" strokeWidth={1.4} />
          <line x1={556} y1={317} x2={559} y2={319} stroke="#5ee8dc" strokeWidth={1.4} />
          <text x={572} y={322} fontFamily="Manrope, sans-serif" fontSize={13} fontWeight={600} fill="#bdeee7">18:00 · uključi</text>
        </g>
      </g>
    </g>
  )
}

export default function Hero() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const branchLRef = useRef<HTMLDivElement>(null)
  const branchRRef = useRef<HTMLDivElement>(null)
  const branchTRef = useRef<HTMLDivElement>(null)
  const gradeRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const vignRef = useRef<HTMLDivElement>(null)
  const cyberRef = useRef<SVGGElement>(null)
  const captionRef = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    let lastCaption = ''

    function update() {
      const runway = runwayRef.current
      if (runway) {
        const rect = runway.getBoundingClientRect()
        const total = runway.offsetHeight - window.innerHeight
        const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0

        const pA = easeInOut(seg(p, 0.0, 0.24))
        const pB = easeInOut(seg(p, 0.14, 0.6))
        const pD = easeInOut(seg(p, 0.6, 1.0))
        const blur = (1 - easeInOut(seg(p, 0.0, 0.22))) * 2.4

        if (worldRef.current) {
          const scale = 1 + pB * 1.55
          worldRef.current.style.transform = `scale(${scale})`
          worldRef.current.style.filter = blur > 0.05 ? `blur(${blur}px)` : 'none'
        }
        if (branchLRef.current) {
          branchLRef.current.style.transform = `translate(${-pA * 82}%, ${pA * 24}%) rotate(${-pA * 26}deg) scale(${1 + pA * 0.22})`
          branchLRef.current.style.filter = `blur(${seg(p, 0.12, 0.3) * 3}px)`
          branchLRef.current.style.opacity = String(1 - pA * 0.2)
        }
        if (branchRRef.current) {
          branchRRef.current.style.transform = `translate(${pA * 82}%, ${pA * 20}%) rotate(${pA * 24}deg) scale(${1 + pA * 0.22})`
          branchRRef.current.style.filter = `blur(${seg(p, 0.12, 0.3) * 3}px)`
          branchRRef.current.style.opacity = String(1 - pA * 0.2)
        }
        if (branchTRef.current) {
          branchTRef.current.style.transform = `translate(0%, ${-pA * 88}%) rotate(${pA * 10}deg)`
          branchTRef.current.style.opacity = String(1 - pA * 0.35)
        }
        if (vignRef.current) vignRef.current.style.opacity = String(pB * 0.7)
        if (gradeRef.current) gradeRef.current.style.opacity = String(pD * 0.92)
        if (glowRef.current) glowRef.current.style.opacity = String(pD * 0.8)
        if (cyberRef.current) cyberRef.current.style.opacity = String(pD)
        if (taglineRef.current) taglineRef.current.style.opacity = String(seg(p, 0.82, 1))
        if (hintRef.current) hintRef.current.style.opacity = String((1 - seg(p, 0, 0.1)) * 0.9)

        if (captionRef.current) {
          let label = CAPTIONS[0][1]
          for (const [at, text] of CAPTIONS) if (p >= at) label = text
          if (label !== lastCaption) {
            captionRef.current.textContent = label
            lastCaption = label
          }
        }
      }
      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <section ref={runwayRef} className="relative" style={{ height: '420vh' }}>
        <div className="hero-stage">
          {/* ---- the world: stone house + window + interior ---- */}
          <div ref={worldRef} className="hero-layer" style={{ transformOrigin: '62% 50%' }}>
            <svg viewBox="0 0 1200 820" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <clipPath id="window-clip">
                  <rect x={515} y={280} width={452} height={300} rx={6} />
                </clipPath>
                <linearGradient id="plaster-shade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(120,95,55,0.05)" />
                  <stop offset="100%" stopColor="rgba(80,60,30,0.22)" />
                </linearGradient>
                <radialGradient id="pebble-grad" cx="42%" cy="34%" r="80%">
                  <stop offset="0%" stopColor="#f4eede" />
                  <stop offset="60%" stopColor="#e7dcc6" />
                  <stop offset="100%" stopColor="#cdbf9f" />
                </radialGradient>
                <linearGradient id="slit-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1c9d92" />
                  <stop offset="50%" stopColor="#5ee8dc" />
                  <stop offset="100%" stopColor="#1c9d92" />
                </linearGradient>
                <radialGradient id="sun" cx="22%" cy="14%" r="70%">
                  <stop offset="0%" stopColor="rgba(255,244,214,0.8)" />
                  <stop offset="60%" stopColor="rgba(255,240,200,0)" />
                </radialGradient>
              </defs>

              {/* stone facade */}
              <StoneWall width={1200} height={820} seed={11} tone="limestone" idPrefix="facade" />

              {/* window recess + frame */}
              <rect x={499} y={264} width={484} height={332} rx={8} fill="#3a2f20" opacity={0.5} />
              <rect x={485} y={236} width={512} height={34} rx={4} fill="#efe7d3" stroke="#c8b994" strokeWidth={1.5} />
              <rect x={493} y={588} width={496} height={20} rx={3} fill="#e7dcc4" stroke="#c8b994" strokeWidth={1.5} />

              <Interior cyberRef={cyberRef} />

              {/* window inner frame line */}
              <rect x={515} y={280} width={452} height={300} rx={6} fill="none" stroke="#5a4a30" strokeWidth={2} opacity={0.4} />

              {/* open green shutters flanking the window */}
              <GreenShutter x={459} />
              <GreenShutter x={983} />

              {/* warm midday light */}
              <rect x={0} y={0} width={1200} height={820} fill="url(#sun)" style={{ mixBlendMode: 'screen' }} opacity={0.5} />
            </svg>
          </div>

          {/* ---- color grade + glow + vignette ---- */}
          <div ref={gradeRef} className="hero-grade" />
          <div ref={glowRef} className="hero-glow" />
          <div ref={vignRef} className="hero-vignette" />

          {/* ---- foreground olive branches that obstruct, then part ---- */}
          <div ref={branchTRef} className="hero-layer" style={{ left: '14%', top: '-18%', width: '72%', height: 'auto' }}>
            <div className="branch-sway">
              <OliveBranch seed={5} style={{ transform: 'rotate(92deg) scale(1.1)' }} />
              <OliveBranch seed={12} style={{ position: 'absolute', inset: 0, transform: 'rotate(108deg) scale(0.9)' }} />
            </div>
          </div>
          <div ref={branchLRef} className="hero-layer" style={{ left: '-12%', top: '4%', width: '82%', height: 'auto' }}>
            <div className="branch-sway">
              <OliveBranch seed={2} style={{ transform: 'rotate(8deg)' }} />
              <OliveBranch seed={7} style={{ position: 'absolute', inset: 0, transform: 'rotate(-12deg) scale(0.82) translate(8%, 18%)' }} />
            </div>
          </div>
          <div ref={branchRRef} className="hero-layer" style={{ left: 'auto', right: '-12%', top: '-2%', width: '84%', height: 'auto' }}>
            <div className="branch-sway" style={{ animationDelay: '1.4s' }}>
              <OliveBranch seed={9} flip style={{ transform: 'rotate(-6deg)' }} />
              <OliveBranch seed={3} flip style={{ position: 'absolute', inset: 0, transform: 'rotate(10deg) scale(0.85)' }} />
            </div>
          </div>

          {/* ---- text overlays ---- */}
          <div className="pointer-events-none absolute inset-0">
            <div className="page-wrap flex h-full flex-col justify-between pb-10 pt-24 sm:pt-28">
              <p
                className="island-kicker"
                style={{ color: '#fff', textShadow: '0 1px 8px rgba(20,12,4,0.6)' }}
              >
                Bonaca — pametna klimatizacija
              </p>

              <div
                ref={taglineRef}
                className="pointer-events-none mx-auto max-w-2xl text-center"
                style={{ opacity: 0 }}
              >
                <h1 className="display-title text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(4,16,15,0.6)] sm:text-6xl">
                  Stara klima. Nova pamet.
                </h1>
              </div>

              <div className="flex items-end justify-between">
                <span
                  ref={captionRef}
                  className="display-title text-lg font-semibold text-white/90 drop-shadow-[0_2px_10px_rgba(20,12,4,0.55)] sm:text-2xl"
                >
                  Maslinik
                </span>
                <div ref={hintRef} className="scroll-hint flex flex-col items-center gap-1 text-white/80">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                    Skrolaj
                  </span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeroPitch />
    </>
  )
}

function HeroPitch() {
  return (
    <section className="page-wrap relative -mt-[1px] pt-16 sm:pt-24">
      <div className="island-shell relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
          <svg viewBox="0 0 1200 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <StoneWall width={1200} height={360} seed={21} tone="limestone" idPrefix="pitch" rowHeight={52} />
          </svg>
        </div>
        <div className="relative max-w-2xl">
          <h2 className="display-title mb-5 text-3xl font-bold leading-[1.06] tracking-tight text-[var(--ink)] sm:text-5xl">
            Modernizirajte klimu koju već imate.
          </h2>
          <p className="mb-8 max-w-xl text-base text-[var(--ink-soft)] sm:text-lg">
            Bonaca je mali uređaj koji vašu staru klimu pretvara u pametnu — bez
            bušenja zidova, bez novog uređaja i bez traganja za izgubljenim
            daljinskim. Stavite je na policu, okrenite prema klimi i upravljajte
            njome s mobitela, gdje god da jeste.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#prijava" className="btn btn-primary">
              Prijavi se na listu čekanja
            </a>
            <a href="#kako-radi" className="btn btn-secondary">
              Pogledaj kako radi
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
