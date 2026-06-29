// Procedural Dalmatian coursed-rubble masonry, rendered as an inline SVG <g>.
// Deterministic via a seeded PRNG so server and client render identically.

type Tone = 'limestone' | 'cool'

interface Palette {
  mortar: string
  shadow: string
  faces: Array<string>
  highlight: string
}

const PALETTES: Record<Tone, Palette> = {
  limestone: {
    mortar: '#c4b696',
    shadow: 'rgba(95, 80, 55, 0.45)',
    faces: ['#efe7d4', '#e8dcc4', '#f3ecdb', '#e1d4ba', '#ece1c9', '#e6dabf'],
    highlight: 'rgba(255, 250, 240, 0.6)',
  },
  cool: {
    mortar: '#1c343a',
    shadow: 'rgba(3, 14, 16, 0.55)',
    faces: ['#214149', '#1d3a41', '#274b52', '#1a343a', '#23454c', '#1f3e45'],
    highlight: 'rgba(120, 230, 220, 0.18)',
  },
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface StoneWallProps {
  width: number
  height: number
  seed?: number
  tone?: Tone
  idPrefix?: string
  rowHeight?: number
  opacity?: number
}

export default function StoneWall({
  width,
  height,
  seed = 7,
  tone = 'limestone',
  idPrefix = 'sw',
  rowHeight = 46,
  opacity = 1,
}: StoneWallProps) {
  const rng = mulberry32(seed)
  const palette = PALETTES[tone]
  const grainId = `${idPrefix}-grain`
  const clipId = `${idPrefix}-clip`

  const stones: Array<React.ReactNode> = []
  let key = 0
  let y = -8
  let rowIndex = 0

  while (y < height) {
    const rh = rowHeight * (0.78 + rng() * 0.5)
    // Stagger row starts so vertical seams never line up.
    let x = -rng() * 90 - 10

    while (x < width) {
      const w = rowHeight * (1.1 + rng() * 1.9)
      const gap = 2.2 + rng() * 1.6

      // Jitter each corner for an organic, hand-laid course.
      const tl = y + (rng() - 0.5) * 7
      const tr = y + (rng() - 0.5) * 7
      const br = y + rh + (rng() - 0.5) * 7
      const bl = y + rh + (rng() - 0.5) * 7
      const x0 = x + gap
      const x1 = x + w - gap

      const face = palette.faces[(key + rowIndex) % palette.faces.length]
      const points = `${x0},${tl} ${x1},${tr} ${x1},${br} ${x0},${bl}`

      stones.push(
        <g key={key++}>
          {/* drop shadow for depth */}
          <polygon
            points={`${x0 + 1.5},${tl + 2} ${x1 + 1.5},${tr + 2} ${x1 + 1.5},${br + 2} ${x0 + 1.5},${bl + 2}`}
            fill={palette.shadow}
          />
          <polygon points={points} fill={face} />
          {/* top-edge catch-light */}
          <line
            x1={x0 + 2}
            y1={tl + 1.5}
            x2={x1 - 2}
            y2={tr + 1.5}
            stroke={palette.highlight}
            strokeWidth={1}
          />
        </g>,
      )
      x += w
    }
    y += rh
    rowIndex++
  }

  return (
    <g opacity={opacity}>
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={width} height={height} />
        </clipPath>
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} result="n" />
          <feColorMatrix in="n" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" intercept="0" />
          </feComponentTransfer>
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect x={0} y={0} width={width} height={height} fill={palette.mortar} />
        {stones}
        {/* speckled grain layer for stone texture */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={tone === 'cool' ? '#9fe9df' : '#7a6b4d'}
          filter={`url(#${grainId})`}
          opacity={0.12}
          style={{ mixBlendMode: 'overlay' }}
        />
      </g>
    </g>
  )
}
