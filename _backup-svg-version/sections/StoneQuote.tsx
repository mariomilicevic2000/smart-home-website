import StoneWall from '../art/StoneWall'

export default function StoneQuote() {
  return (
    <section className="page-wrap mt-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)]">
        <svg
          viewBox="0 0 1200 420"
          className="h-[260px] w-full sm:h-[320px]"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <StoneWall width={1200} height={420} seed={47} tone="limestone" idPrefix="quote" rowHeight={56} />
          <rect x={0} y={0} width={1200} height={420} fill="rgba(20,12,4,0.06)" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="island-kicker mb-3" style={{ color: '#8a6a3c' }}>
            Bonaca
          </p>
          <p className="carved display-title max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
            „Vlastita bonaca, na dodir prsta.&rdquo;
          </p>
          <p className="carved mt-3 max-w-md text-sm sm:text-base" style={{ textShadow: 'none', opacity: 0.85 }}>
            Kad vani nema ni daška vjetra, vi napravite svoj.
          </p>
        </div>
      </div>
    </section>
  )
}
