import BonacaDevice from '../art/BonacaDevice'
import StoneWall from '../art/StoneWall'

const SPECS = [
  'WiFi 2,4 GHz',
  'Bluetooth 5.0',
  'Univerzalna IR baza',
  'Baterija do 6 mjeseci',
  'Punjenje USB-C',
  'Aplikacija za iOS i Android',
]

const PRIVACY = [
  { label: 'Bez kamere', desc: 'Ne vidi ništa. Nema leće, nema snimanja.' },
  { label: 'Bez mikrofona', desc: 'Ne sluša. Ne šalje zvuk nikamo.' },
  { label: 'Samo signal', desc: 'Šalje isti infracrveni signal kao i vaš daljinski.' },
]

export default function ProductShowcase() {
  return (
    <section id="proizvod" className="page-wrap mt-24 scroll-mt-24">
      <div className="island-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
        {/* faint stone texture wash */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
          <svg viewBox="0 0 1200 700" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <StoneWall width={1200} height={700} seed={33} tone="limestone" idPrefix="product" rowHeight={50} />
          </svg>
        </div>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="island-kicker mb-3">Proizvod</p>
            <h2 className="display-title mb-4 text-3xl font-bold leading-[1.08] tracking-tight text-[var(--ink)] sm:text-4xl">
              Mali svjetionik za vašu dnevnu sobu.
            </h2>
            <p className="mb-6 max-w-xl text-base text-[var(--ink-soft)] sm:text-lg">
              Bonaca izgleda kao oblutak s plaže, a ne kao još jedan crni
              plastični gadget. Tiho stoji na polici i prema klimi šalje signal —
              ništa više. Bez oka koje gleda, bez kamere uperene u goste.
            </p>

            {/* privacy callout — the answer to "why point a thing at my guests" */}
            <div className="mb-7 grid gap-3 sm:grid-cols-3">
              {PRIVACY.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] p-3"
                >
                  <p className="m-0 mb-0.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)]">
                    <span className="text-[var(--signal-deep)]">✓</span>
                    {item.label}
                  </p>
                  <p className="m-0 text-xs text-[var(--ink-soft)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {SPECS.map((spec) => (
                <span key={spec} className="chip">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              className="relative rounded-[1.6rem] p-8"
              style={{
                background:
                  'radial-gradient(120% 110% at 50% 30%, color-mix(in oklab, var(--signal) 16%, transparent), transparent 65%)',
              }}
            >
              <BonacaDevice className="h-auto w-full" glow signal />
            </div>
            <p className="mt-3 text-center text-xs text-[var(--ink-soft)]">
              Bonaca · oblutak od recikliranog kompozita, ručno dorađen
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
