import { BatteryCharging, Bluetooth, EyeOff, MicOff, Radio, Ruler, Smartphone, Usb, Weight, Wifi } from 'lucide-react'
import SectionHeader from './SectionHeader'
import SpinningModel from '../art/SpinningModel'

const SPECS = [
  { icon: Wifi, label: 'WiFi 2,4 GHz', desc: 'Spaja se na kućnu mrežu, bez huba.' },
  { icon: Bluetooth, label: 'Bluetooth 5.0', desc: 'Za prvo postavljanje iz aplikacije.' },
  { icon: Radio, label: 'Univerzalna IR baza', desc: 'Uči daljinski većine klima — provjerite popis.' },
  { icon: Smartphone, label: 'iOS i Android', desc: 'Jedna aplikacija, sve sobe.' },
]

const PRIVACY = [
  { icon: EyeOff, label: 'Bez kamere', desc: 'Ne vidi ništa. Nema leće, nema snimanja.' },
  { icon: MicOff, label: 'Bez mikrofona', desc: 'Ne sluša. Ne šalje zvuk nikamo.' },
  { icon: Radio, label: 'Samo signal', desc: 'Šalje isti infracrveni signal kao i vaš daljinski.' },
]

const DATASHEET = [
  { icon: Ruler, label: 'Promjer', value: '9,6 cm' },
  { icon: Weight, label: 'Težina', value: '145 g' },
  { icon: BatteryCharging, label: 'Baterija', value: 'do 6 mjeseci' },
  { icon: Usb, label: 'Punjenje', value: 'USB-C' },
]

export default function ProductShowcase() {
  return (
    <section id="proizvod" className="page-wrap mt-32 scroll-mt-24">
      <div className="island-shell relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14 lg:p-16">
        {/* faint stone texture wash */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('/assets/stone_wall_texture.png')" }}
        />

        <SectionHeader
          index="03 — 07"
          kicker="Proizvod"
          size="lg"
          title="Mali svjetionik za vašu dnevnu sobu."
          intro="Bonaca izgleda kao oblutak s plaže, a ne kao još jedan crni plastični gadget. Tiho stoji na polici i prema klimi šalje signal — ništa više. Bez oka koje gleda, bez kamere uperene u goste."
          className="relative mb-12"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* text column */}
          <div className="order-2 lg:order-1">
            <p className="tech-label mb-3" style={{ color: 'var(--terracotta)' }}>
              Privatnost prije svega
            </p>
            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {PRIVACY.map((item) => (
                <div key={item.label} className="rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] p-3">
                  <item.icon size={16} className="mb-1.5 text-[var(--signal-deep)]" strokeWidth={2.2} />
                  <p className="m-0 mb-0.5 text-sm font-semibold text-[var(--ink)]">{item.label}</p>
                  <p className="m-0 text-xs text-[var(--ink-soft)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="tech-label mb-3" style={{ color: 'var(--terracotta)' }}>
              Povezivanje
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {SPECS.map((spec) => (
                <div key={spec.label} className="flex items-start gap-3 rounded-xl border border-[var(--line)] p-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[var(--chip-bg)] text-[var(--signal-deep)]">
                    <spec.icon size={16} strokeWidth={2.2} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--ink)]">{spec.label}</span>
                    <span className="block text-xs text-[var(--ink-soft)]">{spec.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D model stage */}
          <div className="order-1 lg:order-2">
            <div
              className="relative flex h-72 items-center justify-center rounded-[1.8rem] sm:h-80 lg:h-[26rem]"
              style={{
                background:
                  'radial-gradient(120% 110% at 50% 38%, color-mix(in oklab, var(--signal) 22%, transparent), transparent 66%)',
              }}
            >
              <SpinningModel
                src="/assets/bonaca_on_3d.glb"
                poster="/assets/bonaca-on.png"
                alt="3D model Bonaca uređaja s upaljenim signalnim svjetlom"
                className="h-full w-full"
              />

              {/* floating spec tags — echo the app's own HUD chips */}
              <div className="hud-chip pointer-events-none absolute left-[4%] top-[10%] !py-1.5 !px-2.5 text-xs">
                <Ruler size={13} className="text-[var(--signal)]" />
                <span>⌀ 9,6 cm</span>
              </div>
              <div className="hud-chip pointer-events-none absolute bottom-[12%] right-[4%] !py-1.5 !px-2.5 text-xs">
                <Weight size={13} className="text-[var(--signal)]" />
                <span>145 g</span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--ink-soft)]">
              Bonaca · oblutak od recikliranog kompozita, ručno dorađen — povucite za rotaciju
            </p>
          </div>
        </div>

        {/* datasheet strip */}
        <div className="relative mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] sm:grid-cols-4">
          {DATASHEET.map((row) => (
            <div key={row.label} className="flex items-center gap-2.5 bg-[var(--surface)] p-4">
              <row.icon size={16} className="flex-none text-[var(--signal-deep)]" strokeWidth={2.2} />
              <span>
                <span className="block font-mono text-[0.65rem] uppercase tracking-wide text-[var(--ink-soft)]">
                  {row.label}
                </span>
                <span className="block text-sm font-semibold text-[var(--ink)]">{row.value}</span>
              </span>
            </div>
          ))}
        </div>

        <p className="relative mt-4 text-center font-mono text-[0.62rem] text-[var(--ink-soft)]">
          Trajanje baterije ovisno o korištenju · specifikacije okvirne do
          lansiranja
        </p>
      </div>
    </section>
  )
}
