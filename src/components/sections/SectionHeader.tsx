interface SectionHeaderProps {
  index: string
  kicker: string
  title: React.ReactNode
  intro?: React.ReactNode
  tone?: 'light' | 'dark'
  /** 'lg' bumps the title up a notch for sections that should read as the centerpiece. */
  size?: 'default' | 'lg'
  className?: string
}

// Editorial header: monospace index + cyan signal seam + carved serif title.
// The mono/serif pairing is the modern-vs-traditional clash in miniature.
export default function SectionHeader({
  index,
  kicker,
  title,
  intro,
  tone = 'light',
  size = 'default',
  className,
}: SectionHeaderProps) {
  const titleColor = tone === 'dark' ? 'text-white' : 'text-[var(--ink)]'
  const introColor = tone === 'dark' ? 'text-[rgba(234,246,243,0.78)]' : 'text-[var(--ink-soft)]'
  const indexColor = tone === 'dark' ? 'text-[rgba(234,246,243,0.6)]' : 'text-[var(--ink-soft)]'
  const titleSize = size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'

  return (
    <div className={`max-w-2xl ${className ?? ''}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className={`section-index ${indexColor}`}>{index}</span>
        <span className="seam-inline" />
        <span className="tech-label" style={tone === 'dark' ? { color: 'var(--signal)' } : undefined}>
          {kicker}
        </span>
      </div>
      <h2 className={`display-title font-bold leading-[1.08] tracking-tight ${titleSize} ${titleColor}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-base ${introColor}`}>{intro}</p>}
    </div>
  )
}
