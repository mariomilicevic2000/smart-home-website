import { createElement, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

// Google's <model-viewer> web component. Both the library and each GLB are
// deferred until the model nears the viewport — until then we show the poster,
// so first paint (especially on mobile) never pays for three 3D scenes.
const MV_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js'

function ensureScript() {
  if (typeof document === 'undefined') return
  if (document.querySelector('script[data-model-viewer]')) return
  const s = document.createElement('script')
  s.type = 'module'
  s.src = MV_SRC
  s.setAttribute('data-model-viewer', '')
  document.head.appendChild(s)
}

interface SpinningModelProps {
  src: string
  alt: string
  poster?: string
  className?: string
  /** degrees per second */
  speed?: string
  autoRotate?: boolean
  /** fixed model-viewer camera-orbit, e.g. "0deg 90deg 110%" */
  cameraOrbit?: string
  /** lock the camera (no auto-rotate, no user controls) */
  fixed?: boolean
  /** pivot back and forth across the front face instead of a full 360 spin */
  oscillate?: boolean
  /** half-swing in degrees for oscillate mode */
  amplitude?: number
  /** overlay rendered on top of the model (e.g. a faked screen UI) */
  children?: ReactNode
}

const OSC_PHI = 80 // degrees from vertical — a gentle top-down angle
const OSC_PERIOD = 7000 // ms for one full left→right→left swing

export default function SpinningModel({
  src,
  alt,
  poster,
  className,
  speed = '16deg',
  autoRotate = true,
  cameraOrbit,
  fixed = false,
  oscillate = false,
  amplitude = 42,
  children,
}: SpinningModelProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  // reveal (and only then load the library + GLB) once the model is near view
  useEffect(() => {
    const node = wrapRef.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (inView) ensureScript()
  }, [inView])

  useEffect(() => {
    if (!oscillate || !inView) return
    const el = ref.current as (HTMLElement & { jumpCameraToGoal?: () => void }) | null
    if (!el) return

    let frame = 0
    let start = 0
    let stopped = false

    // hand control over to the user the moment they grab the model
    function onCameraChange(event: Event) {
      const source = (event as CustomEvent<{ source?: string }>).detail?.source
      if (source === 'user-interaction') {
        stopped = true
        cancelAnimationFrame(frame)
        el?.removeEventListener('camera-change', onCameraChange)
      }
    }
    el.addEventListener('camera-change', onCameraChange)

    function tick(t: number) {
      if (stopped) return
      if (!start) start = t
      const theta = amplitude * Math.sin((2 * Math.PI * (t - start)) / OSC_PERIOD)
      el?.setAttribute('camera-orbit', `${theta}deg ${OSC_PHI}deg auto`)
      frame = requestAnimationFrame(tick)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.setAttribute('camera-orbit', `0deg ${OSC_PHI}deg auto`)
    } else {
      frame = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('camera-change', onCameraChange)
    }
  }, [oscillate, amplitude, inView])

  const viewer = inView
    ? createElement('model-viewer', {
        ref,
        src,
        alt,
        poster,
        'auto-rotate': autoRotate && !fixed && !oscillate ? true : undefined,
        'auto-rotate-delay': '0',
        'rotation-per-second': speed,
        'camera-controls': fixed ? undefined : true,
        'camera-orbit': oscillate ? `0deg ${OSC_PHI}deg auto` : cameraOrbit,
        'disable-zoom': true,
        'disable-pan': true,
        'interaction-prompt': 'none',
        'shadow-intensity': '0.35',
        exposure: '1.05',
        'environment-image': 'neutral',
        loading: 'lazy',
        style: {
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          '--poster-color': 'transparent',
        },
      } as Record<string, unknown>)
    : poster
      ? createElement('img', {
          src: poster,
          alt,
          loading: 'lazy',
          decoding: 'async',
          style: { width: '100%', height: '100%', objectFit: 'contain' },
        })
      : null

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className ?? ''}`}>
      {viewer}
      {children ? <div className="pointer-events-none absolute inset-0">{children}</div> : null}
    </div>
  )
}
