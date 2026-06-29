// A single olive sprig drawn into a 460x260 viewBox, stem entering from the
// top-left and arcing down-right. Leaves and olives are placed along the curve.
// Render it inside a sized wrapper and flip via the `flip` prop for the
// opposite side of the frame.

interface OliveBranchProps {
  flip?: boolean
  seed?: number
  className?: string
  style?: React.CSSProperties
}

// Quadratic Bézier sample + tangent angle, used to lay leaves along the stem.
function bezier(t: number, p0: number, p1: number, p2: number) {
  const mt = 1 - t
  return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2
}

const P0 = { x: 8, y: 24 }
const P1 = { x: 210, y: 70 }
const P2 = { x: 452, y: 232 }

export default function OliveBranch({ flip, seed = 1, className, style }: OliveBranchProps) {
  const leaves: Array<React.ReactNode> = []
  const count = 18

  for (let i = 0; i < count; i++) {
    const t = 0.06 + (i / (count - 1)) * 0.92
    const cx = bezier(t, P0.x, P1.x, P2.x)
    const cy = bezier(t, P0.y, P1.y, P2.y)
    const dx = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x)
    const dy = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y)
    const stemAngle = (Math.atan2(dy, dx) * 180) / Math.PI
    // Two leaves per node (both sides) for a fuller sprig.
    for (const side of [1, -1]) {
      const spread = 40 + ((i * 7 + seed * 11) % 30)
      const angle = stemAngle + side * spread
      const len = 46 + ((i * 13 + seed * 5 + (side > 0 ? 0 : 7)) % 20)
      const dark = (i + (side > 0 ? 0 : 1)) % 3 === 0

      leaves.push(
        <g key={`${i}-${side}`} transform={`translate(${cx} ${cy}) rotate(${angle})`}>
          <ellipse rx={len / 2} ry={7} cx={len / 2} cy={0} fill={dark ? '#566b42' : '#6e8556'} />
          <ellipse
            rx={len / 2 - 3}
            ry={3.2}
            cx={len / 2 - 1}
            cy={-1.6}
            fill={dark ? '#83a068' : '#9bb682'}
            opacity={0.7}
          />
          <line x1={2} y1={0} x2={len - 3} y2={0} stroke="#4c5d3b" strokeWidth={0.8} opacity={0.5} />
        </g>,
      )
    }
  }

  // A few olives clustered near the heavier end of the sprig.
  const olives = [
    { t: 0.55, off: 14 },
    { t: 0.68, off: -12 },
    { t: 0.82, off: 16 },
  ].map((o, i) => {
    const cx = bezier(o.t, P0.x, P1.x, P2.x)
    const cy = bezier(o.t, P0.y, P1.y, P2.y) + o.off
    return (
      <g key={`o-${i}`}>
        <ellipse rx={8} ry={10} cx={cx} cy={cy} fill={i === 1 ? '#3c4a2a' : '#586b34'} transform={`rotate(12 ${cx} ${cy})`} />
        <ellipse rx={2.6} ry={3.4} cx={cx - 2} cy={cy - 3} fill="#8a9a5e" opacity={0.6} />
      </g>
    )
  })

  return (
    <svg
      viewBox="0 0 460 260"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, ...style }}
      aria-hidden="true"
    >
      {/* woody stem */}
      <path
        d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
        fill="none"
        stroke="#6a5638"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <path
        d={`M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
        fill="none"
        stroke="#86714c"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.7}
      />
      {olives}
      {leaves}
    </svg>
  )
}
