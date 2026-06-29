import SectionHeader from './SectionHeader'
import { SITE } from '../../data/site'

type MomentKind = 'guest' | 'idle' | 'auto' | 'outcome'

const MOMENTS: Array<{ time: string; kind: MomentKind; title: string; desc: string }> = [
  {
    time: '09:00',
    kind: 'guest',
    title: 'Gost izlazi na plažu',
    desc: 'Ugasi klimu s telefona u dva dodira — ili je jednostavno ne mora paliti pred odlazak.',
  },
  {
    time: '09:00 – 17:00',
    kind: 'idle',
    title: '8 sati, 0 kWh',
    desc: 'Apartman stoji prazan. Klima se ne grije ni za koga.',
  },
  {
    time: '17:15',
    kind: 'guest',
    title: '„Stižemo oko 18h”',
    desc: 'Gost javi samo grubo vrijeme dolaska iz aplikacije — bez gledanja na sat.',
  },
  {
    time: '17:45',
    kind: 'auto',
    title: 'Bonaca sama pali klimu',
    desc: 'Tempirano unazad od javljenog vremena, dovoljno rano da stigne ohladiti prostor.',
  },
  {
    time: '18:00',
    kind: 'outcome',
    title: 'Rashlađen apartman',
    desc: 'Klima je radila 15 minuta, ne cijeli dan.',
  },
]

const DOT_STYLE: Record<MomentKind, React.CSSProperties> = {
  guest: { background: 'transparent', border: '2px solid rgba(94,232,220,0.55)' },
  idle: { background: 'transparent', border: '2px dashed rgba(234,246,243,0.3)' },
  auto: { background: 'var(--signal)', border: 'none', boxShadow: '0 0 0 4px rgba(45,212,200,0.2), 0 0 10px rgba(45,212,200,0.7)' },
  outcome: { background: 'var(--terracotta)', border: 'none', boxShadow: '0 0 0 4px rgba(229,132,98,0.2), 0 0 10px rgba(229,132,98,0.7)' },
}

export default function HostsSection() {
  return (
    <section id="iznajmljivaci" className="page-wrap mt-28 scroll-mt-24">
      <div className="night-panel island-shell relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14 lg:p-16">
        <div className="tech-grid" />

        <SectionHeader
          index="05 — 07"
          kicker="Za iznajmljivače"
          size="lg"
          title="Najveći skriveni trošak ljeta, riješen jednim dodirom."
          intro="Gost koji ne zna kad će se vratiti najčešće ostavi klimu upaljenu cijeli dan, „za svaki slučaj”. S Bonacom gost javi samo grubo vrijeme dolaska — ili klimom upravlja izravno sam, iz aplikacije — a vi i dalje odlučujete tko, kada i koliko dugo."
          tone="dark"
          className="relative mb-14"
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* the guest's day — a timeline, not a feature grid */}
          <div className="relative pl-9">
            <div
              className="absolute bottom-1 left-[15px] top-1 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(94,232,220,0.4) 12%, rgba(94,232,220,0.4) 88%, transparent)' }}
            />
            {MOMENTS.map((m) => (
              <div key={m.time} className="relative pb-9 last:pb-0">
                <span
                  className="absolute -left-9 top-0.5 h-[15px] w-[15px] rounded-full"
                  style={DOT_STYLE[m.kind]}
                  aria-hidden="true"
                />
                <p className="m-0 mb-1 font-mono text-[0.68rem] tracking-wide text-[rgba(234,246,243,0.55)]">{m.time}</p>
                <p className="m-0 mb-1 text-base font-semibold text-white">{m.title}</p>
                <p className="m-0 max-w-sm text-sm text-[rgba(234,246,243,0.78)]">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* the money hook + the trust mechanism + the ask */}
          <div className="flex flex-col gap-6">
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: 'rgba(229,132,98,0.32)',
                background: 'radial-gradient(120% 120% at 15% 0%, rgba(229,132,98,0.14), transparent 70%)',
              }}
            >
              <p className="tech-label mb-2" style={{ color: 'var(--terracotta)' }}>
                Trošak koji nestaje
              </p>
              <p className="display-title m-0 text-4xl font-bold leading-none sm:text-5xl" style={{ color: 'var(--terracotta)' }}>
                do 90 €
              </p>
              <p className="m-0 mt-2 text-sm text-[rgba(234,246,243,0.82)]">
                mjesečno po apartmanu — toliko može stajati klima upaljena „za svaki slučaj”, cijelo ljeto. Bonaca tu brojku svodi na minute rada, ne sate.
              </p>
              <p className="m-0 mt-3 font-mono text-[0.62rem] leading-relaxed text-[rgba(234,246,243,0.5)]">
                Procjena: {SITE.hostSavingBasis}. Stvarna ušteda ovisi o cijeni
                struje i navikama gostiju.
              </p>
            </div>

            <div>
              <p className="tech-label mb-2" style={{ color: 'var(--signal)' }}>
                Privremeni pristup za gosta
              </p>
              <p className="m-0 text-sm text-[rgba(234,246,243,0.78)]">
                Dok je gost kod vas, može sam uključiti i isključiti klimu iz aplikacije ili samo javiti grubo vrijeme dolaska — Bonaca sama tempira uključivanje. Pristup vrijedi isključivo za trajanje rezervacije; čim gost ode, klima i nadzor vraćaju se vama.
              </p>
            </div>

            <div className="mt-auto flex flex-col items-start gap-3">
              <a href="#prijava" className="btn btn-onnight plausible-event-name=Hosts+Waitlist">
                Opremi svoj smještaj
              </a>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent('Bonaca za 3+ smještaja')}`}
                className="text-sm font-semibold text-[var(--signal)] underline-offset-2 hover:underline"
              >
                Imate 3+ smještaja? Dogovorite poseban paket →
              </a>
            </div>
          </div>
        </div>

        {/* the rest of the case, kept short — fine print with teeth */}
        <ul
          className="relative m-0 mt-12 flex list-none flex-wrap gap-x-8 gap-y-3 border-t p-0 pt-6 text-sm text-[rgba(234,246,243,0.75)]"
          style={{ borderColor: 'rgba(94,232,220,0.18)' }}
        >
          {[
            'Automatski se ponavlja za svaki novi check-in — postavite raspored jednom.',
            'Isključite klimu na daljinu ako je gost zaboravi upaljenu, otkud god ste.',
            'Pregled svih smještaja i klima na jednom mjestu, ne po pogađanju.',
            'Postavljanje po klima-uređaju traje manje od 5 minuta.',
          ].map((point) => (
            <li key={point} className="flex max-w-xs items-start gap-2">
              <span className="mt-2 h-1 w-1 flex-none rounded-full" style={{ background: 'var(--signal)' }} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
