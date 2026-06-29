// Bonaca device — a smooth Adriatic sea-pebble with a horizontal "lantern
// slit" that glows signal-cyan, like a little lighthouse. Deliberately NOT an
// eye: no central lens, no face. IR leaves from the slit toward the AC.

interface BonacaDeviceProps {
  className?: string
  glow?: boolean
  signal?: boolean
}

export default function BonacaDevice({ className, glow = true, signal = false }: BonacaDeviceProps) {
  return (
    <svg viewBox="0 0 280 220" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="pebble-body" cx="42%" cy="34%" r="78%">
          <stop offset="0%" stopColor="#f4eede" />
          <stop offset="55%" stopColor="#e7dcc6" />
          <stop offset="100%" stopColor="#cdbf9f" />
        </radialGradient>
        <linearGradient id="slit-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c9d92" />
          <stop offset="50%" stopColor="#5ee8dc" />
          <stop offset="100%" stopColor="#1c9d92" />
        </linearGradient>
      </defs>

      {/* contact shadow */}
      <ellipse cx="140" cy="194" rx="96" ry="16" fill="rgba(60,48,30,0.22)" />

      {/* pebble body */}
      <path
        d="M44 132 C40 86 78 54 140 54 C202 54 240 88 236 134 C233 172 196 196 140 194 C86 192 48 174 44 132 Z"
        fill="url(#pebble-body)"
        stroke="#bcab88"
        strokeWidth="1.5"
      />
      {/* soft top sheen */}
      <path
        d="M70 86 C96 64 188 64 212 88 C188 78 96 78 70 86 Z"
        fill="rgba(255,255,255,0.55)"
        opacity="0.7"
      />

      {/* lantern slit */}
      <g style={glow ? { filter: 'drop-shadow(0 0 12px rgba(45,212,200,0.75))' } : undefined}>
        <rect x="92" y="120" width="96" height="11" rx="5.5" fill="#0e2429" />
        <rect x="95" y="122.5" width="90" height="6" rx="3" fill="url(#slit-glow)" />
      </g>

      {/* engraved wordmark */}
      <text
        x="140"
        y="158"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="2"
        fill="#9a8a68"
      >
        bonaca
      </text>

      {/* IR signal arcs leaving the slit (toward upper-right) */}
      {signal && (
        <g className="signal-dash" stroke="#2dd4c8" fill="none" strokeLinecap="round">
          <path d="M196 118 q14 -10 26 -4" strokeWidth="2.4" opacity="0.9" />
          <path d="M200 128 q22 -14 40 -6" strokeWidth="2" opacity="0.6" />
          <path d="M202 138 q30 -18 54 -8" strokeWidth="1.6" opacity="0.4" />
        </g>
      )}
    </svg>
  )
}
