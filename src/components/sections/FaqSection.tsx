import SectionHeader from './SectionHeader'
import { SITE } from '../../data/site'

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'Radi li Bonaca s mojom klimom?',
    a: 'Radi s većinom klima koje se pale infracrvenim daljinskim — a to je gotovo svaka zidna split-klima. Bonaca jednostavno „nauči” signale vašeg daljinskog. Pri prijavi upišite marku i model pa provjerimo baš vašu.',
  },
  {
    q: 'Trebam li originalni daljinski?',
    a: 'Za prvo postavljanje da — Bonaca uči njegove signale. Nakon toga vam više ne treba: klimom upravljate s mobitela. Sam uređaj se i ne isporučuje s daljinskim — to je, uostalom, cijela poanta.',
  },
  {
    q: 'Kako se postavlja i koliko traje?',
    a: 'Stavite je na policu ili stol odakle „vidi” klimu, spojite na kućni WiFi kroz aplikaciju i nauči daljinski. Oko 5 minuta, bez bušenja zidova i bez alata.',
  },
  {
    q: 'Mora li „vidjeti” klimu?',
    a: 'Da. Kao i daljinski, Bonaca šalje infracrveni signal, pa joj treba čista linija prema klimi. Zato stoji na polici ili stolu okrenuta prema njoj.',
  },
  {
    q: 'Snima li ili sluša išta u stanu?',
    a: 'Ne. Nema kameru ni mikrofon. Šalje samo isti infracrveni signal kao vaš daljinski — ništa ne gleda, ne sluša i ne snima.',
  },
  {
    q: 'Koju mrežu i napajanje koristi?',
    a: 'Spaja se na kućni WiFi na 2,4 GHz, bez dodatnog huba. Puni se USB-C kabelom, a punjenje traje do nekoliko mjeseci, ovisno o korištenju.',
  },
  {
    q: 'Kada stiže i koliko će koštati?',
    a: `Prva serija planirana je za ${SITE.launchWindow} Cijena je okvirno ${SITE.priceFrom}–${SITE.priceTo} ${SITE.currency} (potvrđujemo pred lansiranje). Prijave s liste dobivaju founding cijenu, a prva je serija ograničena.`,
  },
  {
    q: 'Obvezuje li me prijava na nešto?',
    a: 'Ne. Prijava na listu čekanja je besplatna i ne obvezuje na kupnju. Odjava je moguća u svakom trenutku, bez pitanja.',
  },
]

const PAPER_INK = '#2a2420'
const PAPER_SOFT = '#6b5f55'
const PAPER_MARK = '#8a6f47'
const PAPER_ACCENT = '#c15b3c'
const PAPER_RULE = 'rgba(120,95,55,0.4)'

export default function FaqSection() {
  return (
    <section id="pitanja" className="page-wrap mt-24 scroll-mt-24">
      <SectionHeader
        index="—"
        kicker="Česta pitanja"
        title="Pitanja prije nego što se javite."
        intro="Kratki odgovori na ono što ljudi najčešće pitaju. Ako nešto fali, javite se — odgovaramo brzo."
        className="mb-10"
      />

      {/* a printed Q&A sheet, same hand as the quick-start leaflet */}
      <div className="paper-card relative mx-auto max-w-3xl overflow-hidden px-6 py-7 sm:px-10 sm:py-9">
        {/* masthead */}
        <div className="relative mb-4 flex items-end justify-between gap-3 border-b-2 pb-3" style={{ borderColor: PAPER_RULE }}>
          <div>
            <p className="display-title m-0 text-lg font-bold leading-none" style={{ color: PAPER_INK }}>
              Bonaca
            </p>
            <p className="postmark mt-1" style={{ color: PAPER_MARK }}>
              ČESTO PITANO · LIST BR-01
            </p>
          </div>
          <p className="postmark hidden whitespace-nowrap sm:block" style={{ color: PAPER_MARK }}>
            P — pitanje · O — odgovor
          </p>
        </div>

        <div className="relative">
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className={`group ${i > 0 ? 'border-t border-dashed' : ''}`}
              style={i > 0 ? { borderColor: PAPER_RULE } : undefined}
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 py-4 [&::-webkit-details-marker]:hidden">
                <span className="display-title text-lg font-bold leading-none" style={{ color: PAPER_ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="postmark mt-0.5 hidden sm:block" style={{ color: PAPER_MARK }}>
                  P
                </span>
                <span className="flex-1 text-base font-semibold" style={{ color: PAPER_INK }}>
                  {item.q}
                </span>
                {/* hand-inked +, becomes − when open */}
                <span className="relative h-3.5 w-3.5 flex-none" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-[2px] w-3.5 -translate-y-1/2 rounded-full" style={{ background: PAPER_ACCENT }} />
                  <span className="absolute left-1/2 top-0 h-3.5 w-[2px] -translate-x-1/2 rounded-full transition-transform duration-200 group-open:scale-y-0" style={{ background: PAPER_ACCENT }} />
                </span>
              </summary>
              <div className="flex gap-3 pb-5 pl-1 sm:pl-9">
                <span className="postmark mt-1 flex-none" style={{ color: PAPER_MARK }}>
                  O
                </span>
                <p className="m-0 text-sm leading-relaxed" style={{ color: PAPER_SOFT }}>
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* footer sign-off, leaflet-style */}
        <div className="relative mt-4 flex items-center justify-between gap-4 border-t-2 pt-3" style={{ borderColor: PAPER_RULE }}>
          <span className="postmark" style={{ color: PAPER_MARK }}>
            Još pitanja?
          </span>
          <a href={`mailto:${SITE.email}`} className="text-sm font-semibold" style={{ color: PAPER_ACCENT }}>
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  )
}
