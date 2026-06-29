interface BrandMarkProps {
  size?: number
  className?: string
}

// "Mirno more" — a sun resting on a dead-flat calm sea, broken by a single
// signal ripple. The name, drawn: bonaca is the flat line; the smart signal is
// the one arc rising off it. Colours come from the theme so it flips for dark.
export default function BrandMark({ size = 28, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={(size * 30) / 40}
      viewBox="0 0 40 30"
      fill="none"
      className={className}
      role="img"
      aria-label="Bonaca"
    >
      {/* signal ripples rising off the calm sea */}
      <path d="M3 22 A17 17 0 0 1 37 22" stroke="var(--signal)" strokeWidth={1.6} strokeLinecap="round" opacity={0.5} />
      <path d="M8 22 A12 12 0 0 1 32 22" stroke="var(--signal)" strokeWidth={2.4} strokeLinecap="round" />
      {/* the flat, calm horizon */}
      <line x1="4" y1="22" x2="36" y2="22" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
      {/* the sun, low on the water */}
      <circle cx="20" cy="22" r="5.5" fill="var(--terracotta)" />
    </svg>
  )
}
