import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import SpinningModel from '../art/SpinningModel'

// A gentle vertical sine — the membrane between the two worlds, never quite straight.
const SEAM_PATH = (() => {
  const H = 1000
  const mid = 75
  const amp = 10
  const waves = 6
  const steps = 60
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const y = (H / steps) * i
    const x = mid + Math.sin((i / steps) * Math.PI * 2 * waves) * amp
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '
  }
  return d.trim()
})()

// Motes leaking each way across the membrane: 'tech' drifts left into tradition,
// 'trad' drifts right into the machine.
const MOTES: Array<{ dir: 'tech' | 'trad'; top: string; dur: string; delay: string }> = [
  { dir: 'tech', top: '13%', dur: '3.6s', delay: '0s' },
  { dir: 'trad', top: '23%', dur: '4.2s', delay: '0.8s' },
  { dir: 'tech', top: '37%', dur: '3.9s', delay: '1.6s' },
  { dir: 'trad', top: '45%', dur: '3.4s', delay: '0.4s' },
  { dir: 'tech', top: '57%', dur: '4.4s', delay: '1.1s' },
  { dir: 'trad', top: '67%', dur: '3.7s', delay: '2.0s' },
  { dir: 'tech', top: '77%', dur: '4.0s', delay: '0.6s' },
  { dir: 'trad', top: '87%', dur: '3.5s', delay: '1.4s' },
]

function MorphSeam() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className="morph-seam hidden md:block" aria-hidden="true">
      <svg className="morph-seam__svg" viewBox="0 0 150 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="seamGrad" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--signal)" stopOpacity="0" />
            <stop offset="0.16" stopColor="var(--signal)" />
            <stop offset="0.5" stopColor="#9fd8c8" />
            <stop offset="0.84" stopColor="var(--terracotta)" />
            <stop offset="1" stopColor="var(--terracotta)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* soft halo underlay */}
        <path
          d={SEAM_PATH}
          fill="none"
          stroke="url(#seamGrad)"
          strokeWidth={6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.28}
          style={{ filter: 'blur(3px)' }}
        />
        {/* bright flowing core */}
        <path
          d={SEAM_PATH}
          fill="none"
          stroke="url(#seamGrad)"
          strokeWidth={1.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className={reduced ? undefined : 'seam-flow'}
        />
      </svg>

      <span className="morph-node" />

      {!reduced &&
        MOTES.map((m, i) => (
          <span
            key={i}
            className={`morph-particle morph-particle--${m.dir}`}
            style={{ top: m.top, ['--dur' as string]: m.dur, animationDelay: m.delay }}
          />
        ))}
    </div>
  )
}

const BEFORE = [
  'Ustaneš s kauča po podnevnoj žegi',
  'Tražiš daljinski — pa bateriju za daljinski',
  'Pogađaš temperaturu napamet',
  'Čekaš da se soba polako ohladi',
]

const AFTER = [
  'Otključaš mobitel — s kauča ili s plaže',
  'Jedan dodir, ili pustiš raspored',
  'Točna temperatura, svaki put',
  'Dođeš u već rashlađenu kuću',
]

export default function ContrastSection() {
  return (
    <section className="page-wrap mt-24">
      <SectionHeader
        index="02 — 07"
        kicker="Prije i poslije"
        title={<>Ista klima. Dva svijeta.</>}
        intro="Uređaj na zidu se ne mijenja. Mijenja se sve oko njega."
        className="mb-10"
      />

      <div className="relative grid overflow-hidden rounded-[2rem] border border-[var(--line)] md:grid-cols-2">
        {/* PRIJE — traditional */}
        <div className="paper-panel p-7 sm:p-10">
          {/* tech bleeding in from the seam on the right */}
          <div className="contrast-bleed contrast-bleed--tech hidden md:block" aria-hidden="true" />
          <div className="relative mb-6 flex items-center gap-3">
            <span className="tech-label" style={{ color: 'var(--terracotta)' }}>
              Prije
            </span>
            <span className="h-px flex-1" style={{ background: 'var(--line)' }} />
          </div>
          <div className="relative mb-8 h-52 w-full sm:h-60">
            <SpinningModel src="/assets/remote.glb" poster="/assets/remote-poster.jpg" alt="Daljinski upravljač klime, 3D model" oscillate />
          </div>
          <ul className="relative m-0 list-none space-y-3 p-0">
            {BEFORE.map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm text-[var(--ink-soft)] sm:text-base">
                <span aria-hidden="true" className="mt-2 h-px w-3 flex-none" style={{ background: 'var(--terracotta)' }} />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* SAD — modern */}
        <div className="night-panel p-7 sm:p-10">
          <div className="tech-grid" />
          {/* tradition's warmth bleeding in from the seam on the left */}
          <div className="contrast-bleed contrast-bleed--trad hidden md:block" aria-hidden="true" />
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <span className="tech-label" style={{ color: 'var(--signal)' }}>
                Sad
              </span>
              <span className="h-px flex-1" style={{ background: 'rgba(45,212,200,0.3)' }} />
            </div>
            <div className="mb-8 h-56 w-full sm:h-64">
              <SpinningModel src="/assets/phone.glb" poster="/assets/phone-poster.jpg" alt="Pametni telefon s Bonaca aplikacijom" oscillate />
            </div>
            <ul className="m-0 list-none space-y-3 p-0">
              {AFTER.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-[rgba(234,246,243,0.9)] sm:text-base">
                  <span aria-hidden="true" className="mt-1.5 text-[var(--signal)]">→</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* the membrane between the two worlds — each bleeding into the other (desktop) */}
        <MorphSeam />
      </div>

      <p className="mt-3 text-right text-[0.65rem] text-[var(--ink-soft)]">
        3D modeli: Poly by Google · Sal Blrm (CC BY) — Poly Pizza
      </p>
    </section>
  )
}
