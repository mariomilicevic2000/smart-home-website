import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CameraOff, Clock, Radio, Snowflake, Timer, Wifi } from 'lucide-react'
import { SITE } from '../../data/site'

// layout effect on the client (runs before paint → no shift), plain effect on
// the server (where useLayoutEffect would warn)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1)
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

// placements in the 1408x768 coordinate space of house_interior.png
const AC = { x: 720, y: 168, w: 372, h: 130 }
const BONACA = { x: 990, y: 420, w: 120, h: 58 }
const SLIT = { x: 1050, y: 449 }
const ACPT = { x: 906, y: 300 }
const BEAM = `M ${SLIT.x} ${SLIT.y} C ${SLIT.x - 46} ${SLIT.y - 34}, ${ACPT.x + 44} ${ACPT.y + 36}, ${ACPT.x} ${ACPT.y}`
const SCENE_ORIGIN = '64% 46%'
const INTERIOR_SCALE = 'scale(1.18)' // steady — no push-in once inside
const BRANCH_FILTER = 'drop-shadow(0 10px 16px rgba(20,30,10,0.45)) saturate(1.18) contrast(1.08) brightness(1.03)'

export default function Hero() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const exteriorRef = useRef<HTMLDivElement>(null)
  const interiorRef = useRef<HTMLDivElement>(null)
  const cyberWrapRef = useRef<HTMLDivElement>(null)
  const bonacaOnRef = useRef<SVGImageElement>(null)
  const gradeRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const vignRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(false)
  const bL1 = useRef<HTMLDivElement>(null)
  const bR1 = useRef<HTMLDivElement>(null)
  const bL2 = useRef<HTMLDivElement>(null)
  const bR2 = useRef<HTMLDivElement>(null)
  const bML = useRef<HTMLDivElement>(null)
  const bMR = useRef<HTMLDivElement>(null)

  // Pull the hero full-bleed up under the (translucent, sticky) navbar. Done in
  // a layout effect so the offset lands before the browser paints — no CLS.
  useIsoLayoutEffect(() => {
    const header = document.querySelector('header')
    const runway = runwayRef.current
    function applyHeaderOffset() {
      if (runway && header) {
        runway.style.marginTop = `-${Math.round(header.getBoundingClientRect().height)}px`
      }
    }
    applyHeaderOffset()
    window.addEventListener('resize', applyHeaderOffset)
    return () => window.removeEventListener('resize', applyHeaderOffset)
  }, [])

  useEffect(() => {
    let frame = 0

    // Respect reduced-motion: skip the scroll movie entirely and compose the
    // final, lit interior scene immediately so the page stays calm and reachable.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setReduced(true)
      if (exteriorRef.current) exteriorRef.current.style.opacity = '0'
      if (interiorRef.current) interiorRef.current.style.opacity = '1'
      if (cyberWrapRef.current) cyberWrapRef.current.style.opacity = '1'
      if (bonacaOnRef.current) bonacaOnRef.current.style.opacity = '1'
      if (gradeRef.current) gradeRef.current.style.opacity = '0.82'
      if (glowRef.current) glowRef.current.style.opacity = '0.8'
      if (vignRef.current) vignRef.current.style.opacity = '0.5'
      if (hudRef.current) hudRef.current.style.opacity = '1'
      for (const b of [bL1, bR1, bL2, bR2, bML, bMR]) {
        if (b.current) b.current.style.opacity = '0'
      }
      return
    }

    function update() {
      const runway = runwayRef.current
      if (runway) {
        const rect = runway.getBoundingClientRect()
        const total = runway.offsetHeight - window.innerHeight
        const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0

        const branch = easeInOut(seg(p, 0, 0.12))
        const focus = easeInOut(seg(p, 0, 0.2)) // house pulls into focus as branches part
        const cyber = easeInOut(seg(p, 0.48, 0.72))

        if (exteriorRef.current) {
          exteriorRef.current.style.transform = `scale(${1 + easeInOut(seg(p, 0, 0.42)) * 0.34})`
          exteriorRef.current.style.filter = `blur(${(1 - focus) * 15}px)`
          exteriorRef.current.style.opacity = String(1 - easeInOut(seg(p, 0.3, 0.44)))
        }
        if (interiorRef.current) interiorRef.current.style.opacity = String(easeInOut(seg(p, 0.32, 0.46)))
        if (cyberWrapRef.current) cyberWrapRef.current.style.opacity = String(cyber)
        if (bonacaOnRef.current) bonacaOnRef.current.style.opacity = String(easeInOut(seg(p, 0.46, 0.6)))
        if (gradeRef.current) gradeRef.current.style.opacity = String(cyber * 0.82)
        if (glowRef.current) glowRef.current.style.opacity = String(cyber * 0.8)
        if (vignRef.current) vignRef.current.style.opacity = String(easeInOut(seg(p, 0.2, 0.5)) * 0.5)
        if (hudRef.current) {
          const h = easeInOut(seg(p, 0.56, 0.78))
          hudRef.current.style.opacity = String(h)
          hudRef.current.style.transform = `translateY(${(1 - h) * 12}px)`
        }
        // branches stay sharp at the start, blur only as they sweep away
        const bl = `blur(${seg(p, 0.06, 0.16) * 3}px)`
        if (bL1.current) {
          bL1.current.style.transform = `translate(${-branch * 95}%, ${branch * 80}%) rotate(${-branch * 22}deg)`
          bL1.current.style.filter = bl
        }
        if (bR1.current) {
          bR1.current.style.transform = `translate(${branch * 95}%, ${-branch * 70}%) rotate(${branch * 20}deg)`
          bR1.current.style.filter = bl
        }
        if (bL2.current) {
          bL2.current.style.transform = `translate(${-branch * 95}%, ${-branch * 70}%) rotate(${branch * 18}deg)`
          bL2.current.style.filter = bl
        }
        if (bR2.current) {
          bR2.current.style.transform = `translate(${branch * 95}%, ${branch * 80}%) rotate(${-branch * 20}deg)`
          bR2.current.style.filter = bl
        }
        if (bML.current) {
          bML.current.style.transform = `translate(${-branch * 90}%, 0%) rotate(${-branch * 16}deg)`
          bML.current.style.filter = bl
        }
        if (bMR.current) {
          bMR.current.style.transform = `translate(${branch * 90}%, 0%) rotate(${branch * 16}deg)`
          bMR.current.style.filter = bl
        }
      }
      frame = visible ? requestAnimationFrame(update) : 0
    }

    // only burn frames while the hero is actually on screen — once the visitor
    // scrolls into the page, the scroll-driven loop idles (mobile battery/CPU).
    let visible = true
    let io: IntersectionObserver | undefined
    if (runwayRef.current && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          if (visible && !frame) frame = requestAnimationFrame(update)
        },
        { threshold: 0 },
      )
      io.observe(runwayRef.current)
    }

    frame = requestAnimationFrame(update)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      io?.disconnect()
    }
  }, [])

  return (
    <>
      <section ref={runwayRef} className="relative" style={{ height: reduced ? '100svh' : '220vh' }}>
        <div className="hero-stage">
          {/* exterior — heavily blurred at first so the foreground branches read sharp */}
          <div
            ref={exteriorRef}
            className="hero-layer bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/house_exterior.png')", transformOrigin: '42% 48%' }}
          />

          {/* interior scene — steady framing, graded by the layers above it */}
          <div ref={interiorRef} className="hero-layer" style={{ transformOrigin: SCENE_ORIGIN, transform: INTERIOR_SCALE, opacity: 0 }}>
            <svg viewBox="0 0 1408 768" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
              <image href="/assets/house_interior.png" x={0} y={0} width={1408} height={768} />
              <image href="/assets/ac.png" x={AC.x} y={AC.y} width={AC.w} height={AC.h} />
              <image href="/assets/bonaca-off.png" x={BONACA.x} y={BONACA.y} width={BONACA.w} height={BONACA.h} />
              <image
                ref={bonacaOnRef}
                href="/assets/bonaca-on.png"
                x={BONACA.x}
                y={BONACA.y}
                width={BONACA.w}
                height={BONACA.h}
                style={{ opacity: 0 }}
              />
            </svg>
          </div>

          {/* grade + glow + vignette */}
          <div ref={gradeRef} className="hero-grade" />
          <div ref={glowRef} className="hero-glow" />
          <div ref={vignRef} className="hero-vignette" />

          {/* communication layer — above the grade, shares the steady scene transform */}
          <div ref={cyberWrapRef} className="hero-layer" style={{ transformOrigin: SCENE_ORIGIN, transform: INTERIOR_SCALE, opacity: 0 }}>
            <svg viewBox="0 0 1408 768" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
              <defs>
                <filter id="packet-glow" x="-300%" y="-300%" width="700%" height="700%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <path id="beamPath" d={BEAM} />
              </defs>

              {/* AC outline */}
              <rect
                x={AC.x + 8}
                y={AC.y + 6}
                width={AC.w - 16}
                height={AC.h - 12}
                rx={14}
                fill="none"
                stroke="#2dd4c8"
                strokeWidth={2.2}
                opacity={0.9}
                style={{ filter: 'drop-shadow(0 0 9px rgba(45,212,200,0.8))' }}
              />
              <circle cx={ACPT.x} cy={ACPT.y} r={9} fill="none" stroke="#5ee8dc" strokeWidth={2.2} className="signal-ring" />

              {/* Bonaca outline (matches the AC treatment) */}
              <ellipse
                cx={BONACA.x + BONACA.w / 2}
                cy={BONACA.y + BONACA.h / 2}
                rx={BONACA.w / 2 + 7}
                ry={BONACA.h / 2 + 7}
                fill="none"
                stroke="#2dd4c8"
                strokeWidth={2.2}
                opacity={0.9}
                style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,200,0.8))' }}
              />

              {/* refined data link: soft halo + thin bright core */}
              <use href="#beamPath" fill="none" stroke="rgba(45,212,200,0.3)" strokeWidth={5} strokeLinecap="round" style={{ filter: 'blur(3px)' }} />
              <use
                href="#beamPath"
                fill="none"
                stroke="#8af2e8"
                strokeWidth={1.6}
                strokeLinecap="round"
                className="beam-flow-slow"
                style={{ filter: 'drop-shadow(0 0 4px rgba(45,212,200,0.95))' }}
              />

              {/* a couple of slow, small packets */}
              {[0, 1.5].map((delay, i) => (
                <circle key={i} r={4.5} fill="#e6fffb" filter="url(#packet-glow)">
                  <animateMotion dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1">
                    <mpath href="#beamPath" />
                  </animateMotion>
                </circle>
              ))}

              {/* gentle pulse from the slit */}
              <circle cx={SLIT.x} cy={SLIT.y} r={10} fill="none" stroke="#2dd4c8" strokeWidth={1.6} className="signal-ring" />
            </svg>
          </div>

          {/* glass HUD — distributed across the frame */}
          <div ref={hudRef} className="pointer-events-none absolute inset-0 z-10" style={{ opacity: 0 }}>
            <div className="hud-chip hud-chip-lg absolute left-[52%] top-[34%]">
              <span className="hud-chip-ico"><Snowflake size={18} /></span>
              <span>
                <span className="block font-mono text-lg font-bold leading-none text-white">24°C</span>
                <span className="mt-0.5 block text-[0.62rem] tracking-wide text-[rgba(234,250,247,0.6)]">Hlađenje · dnevni boravak</span>
              </span>
            </div>

            <div className="hud-chip absolute left-[80%] top-[37%]">
              <span className="hud-chip-ico"><Wifi size={16} /></span>
              <span className="flex items-center gap-2 text-sm font-semibold">
                Povezano
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal)] shadow-[0_0_6px_rgba(45,212,200,0.9)]" />
              </span>
            </div>

            <div className="hud-chip absolute left-[55%] top-[72%]">
              <span className="hud-chip-ico"><Clock size={16} /></span>
              <span className="text-sm font-semibold">Raspored · 18:00</span>
            </div>
          </div>

          {/* six olive branches framing the frame — leaves always sweep toward center, as if shot through the canopy */}
          <div ref={bL2} className="hero-layer" style={{ left: '-14%', top: '-14%', width: '54%' }}>
            <img src="/assets/olive-branch-left.png" alt="" aria-hidden="true" className="w-full" style={{ transform: 'scaleY(-1) rotate(8deg)', filter: BRANCH_FILTER }} />
          </div>
          <div ref={bR2} className="hero-layer" style={{ left: 'auto', right: '-12%', bottom: '-14%', top: 'auto', width: '56%' }}>
            <img src="/assets/olive-branch-right.png" alt="" aria-hidden="true" className="w-full" style={{ transform: 'scaleY(-1) rotate(6deg)', filter: BRANCH_FILTER }} />
          </div>
          <div ref={bR1} className="hero-layer" style={{ left: 'auto', right: '-12%', top: '-14%', width: '60%' }}>
            <img src="/assets/olive-branch-right.png" alt="" aria-hidden="true" className="w-full" style={{ filter: BRANCH_FILTER }} />
          </div>
          <div ref={bL1} className="hero-layer" style={{ left: '-12%', bottom: '-12%', top: 'auto', width: '64%' }}>
            <img src="/assets/olive-branch-left.png" alt="" aria-hidden="true" className="w-full" style={{ filter: BRANCH_FILTER }} />
          </div>
          <div ref={bML} className="hero-layer" style={{ left: '-15%', right: 'auto', top: '36%', bottom: 'auto', width: '44%' }}>
            <img src="/assets/olive-branch-left.png" alt="" aria-hidden="true" className="w-full" style={{ transform: 'rotate(-6deg)', filter: BRANCH_FILTER }} />
          </div>
          <div ref={bMR} className="hero-layer" style={{ left: 'auto', right: '-15%', top: '36%', bottom: 'auto', width: '44%' }}>
            <img src="/assets/olive-branch-right.png" alt="" aria-hidden="true" className="w-full" style={{ transform: 'rotate(6deg)', filter: BRANCH_FILTER }} />
          </div>

          {/* legibility scrim so the value block reads over any phase of the scene */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72%]"
            style={{ background: 'linear-gradient(0deg, rgba(4,16,15,0.92) 0%, rgba(4,16,15,0.78) 26%, rgba(4,16,15,0.4) 58%, transparent 100%)' }}
          />

          {/* value proposition — always visible above the fold, headline + plain subhead + CTAs */}
          <div className="absolute inset-x-0 bottom-0 z-20">
            <div className="page-wrap pb-14 sm:pb-16">
              <p className="island-kicker mb-3" style={{ color: '#fff', textShadow: '0 1px 10px rgba(20,12,4,0.7)' }}>
                Stara klima. Nova pamet.
              </p>
              <h1 className="display-title max-w-2xl text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_22px_rgba(4,16,15,0.8)] sm:text-6xl">
                Pretvorite klimu koju već imate u pametnu.
              </h1>
              <p className="mt-4 max-w-xl text-base text-[rgba(255,255,255,0.92)] drop-shadow-[0_1px_10px_rgba(4,16,15,0.8)] sm:text-lg">
                Mali uređaj nauči daljinski vaše klime i daje vam je na mobitel — bez
                nove klime i bez bušenja zidova. Radi s većinom klima s daljinskim.
              </p>

              {/* objection-killers, surfaced above the fold */}
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[rgba(255,255,255,0.92)] drop-shadow-[0_1px_8px_rgba(4,16,15,0.85)]">
                <li className="flex items-center gap-1.5"><Wifi size={15} className="text-[var(--signal)]" /> Radi s većinom klima</li>
                <li className="flex items-center gap-1.5"><Timer size={15} className="text-[var(--signal)]" /> Montaža 5 min, bez alata</li>
                <li className="flex items-center gap-1.5"><CameraOff size={15} className="text-[var(--signal)]" /> Bez kamere i mikrofona</li>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href="#prijava" className="btn btn-primary plausible-event-name=Hero+Waitlist">
                  Prijavi se na listu čekanja
                </a>
                <a href="#kako-radi" className="text-sm font-semibold text-white underline decoration-[rgba(255,255,255,0.5)] underline-offset-4 hover:decoration-white">
                  Pogledaj kako radi →
                </a>
              </div>
            </div>
          </div>

          {/* scroll cue — secondary now that the value prop carries the frame */}
          {!reduced && (
            <div ref={hintRef} className="pointer-events-none absolute bottom-6 right-6 z-20 hidden flex-col items-center gap-1.5 text-white sm:flex">
              <span className="scroll-cue scroll-hint">
                <span />
              </span>
            </div>
          )}
        </div>
      </section>

      <HeroPitch />
    </>
  )
}

// The first beat after the hero earns the scroll by ANSWERING the three things
// a skeptic is thinking — "will it work with mine? is it a hassle? what's the
// catch on price?" — rather than repeating the hero.
const REASSURANCE = [
  {
    icon: Radio,
    title: 'Radi s klimom koju imate',
    body: 'Bonaca nauči infracrveni daljinski vaše klime — kao da ga je zapamtila. Radi s većinom klima koje se pale daljinskim.',
  },
  {
    icon: Timer,
    title: 'Gotovo za 5 minuta',
    body: 'Stavite je na policu nasuprot klime, spojite na WiFi i to je to. Bez bušenja, bez alata, bez majstora.',
  },
  {
    icon: CameraOff,
    title: 'Ne gleda i ne sluša',
    body: 'Nema kameru ni mikrofon. Šalje samo isti infracrveni signal kao i vaš daljinski — ništa više.',
  },
]

function HeroPitch() {
  return (
    <section className="page-wrap relative -mt-[1px] pt-16 sm:pt-24">
      <div className="island-shell relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('/assets/stone_wall_texture.png')" }}
        />
        <div className="relative">
          <h2 className="display-title mb-4 max-w-2xl text-3xl font-bold leading-[1.06] tracking-tight text-[var(--ink)] sm:text-5xl">
            Radi s klimom koju već imate.
          </h2>
          <p className="mb-10 max-w-xl text-base text-[var(--ink-soft)] sm:text-lg">
            Ne mijenjate klimu — samo joj dodajete pamet. Evo zašto je to
            jednostavnije nego što zvuči.
          </p>

          <div className="mb-10 grid gap-6 sm:grid-cols-3">
            {REASSURANCE.map((r) => (
              <div key={r.title}>
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--chip-bg)] text-[var(--signal-deep)]">
                  <r.icon size={20} strokeWidth={2.1} />
                </span>
                <p className="m-0 mb-1 text-base font-semibold text-[var(--ink)]">{r.title}</p>
                <p className="m-0 text-sm text-[var(--ink-soft)]">{r.body}</p>
              </div>
            ))}
          </div>

          {/* price anchor — reframe the spend as savings, two ways */}
          <div className="mb-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
            <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-sm text-[var(--ink-soft)] line-through">
                Nova pametna klima: {SITE.priceNewAcFrom} {SITE.currency}+
              </span>
              <span className="text-base font-semibold text-[var(--ink)]">
                Bonaca zadržava onu koju imate — okvirno {SITE.priceFrom}–{SITE.priceTo} {SITE.currency}.
              </span>
            </p>
            <p className="m-0 mt-2 text-sm text-[var(--ink-soft)]">
              A klima ostavljena „za svaki slučaj” troši i kad nikoga nema kod kuće —
              Bonaca je ugasi s mobitela i to se vrati i prije nego stigne.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#prijava" className="btn btn-primary plausible-event-name=Pitch+Waitlist">
              Prijavi se na listu čekanja
            </a>
            <a href="#kako-radi" className="text-sm font-semibold text-[var(--signal-deep)] underline-offset-4 hover:underline">
              Pogledaj kako radi →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
