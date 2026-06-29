export default function StoneQuote() {
  return (
    <section className="page-wrap mt-24">
      <div className="relative h-[260px] overflow-hidden rounded-[2rem] border border-[var(--line)] sm:h-[320px]">
        {/* real Dalmatian stone wall */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/stone_wall_texture.png')" }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(20,12,4,0.08)' }} />
        {/* sunlit plaque behind the text so the carved letters have a bright, calm backing */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(62% 72% at 50% 50%, rgba(250,245,236,0.92) 0%, rgba(250,245,236,0.62) 42%, rgba(250,245,236,0.18) 66%, transparent 80%)',
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p
            className="display-title max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl"
            style={{
              color: '#2c2316',
              textShadow: '0 1px 0 rgba(255,255,255,0.85), 0 -1px 1px rgba(40,30,18,0.3)',
            }}
          >
            Dođete kući. Već je rashlađena.
          </p>
          <p className="mt-3 max-w-md text-sm font-medium sm:text-base" style={{ color: '#403525', textShadow: '0 1px 0 rgba(255,255,255,0.7)' }}>
            Klima koju već imate sad zna kad ćete doći.
          </p>
        </div>
      </div>
    </section>
  )
}
