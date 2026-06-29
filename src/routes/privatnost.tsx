import { createFileRoute, Link } from '@tanstack/react-router'
import { SITE } from '../data/site'

export const Route = createFileRoute('/privatnost')({
  component: Privacy,
  head: () => ({
    meta: [
      { title: 'Politika privatnosti — Bonaca' },
      {
        name: 'description',
        content:
          'Kako Bonaca prikuplja i koristi vašu e-mail adresu za listu čekanja. Bez prodaje podataka, bez spama, odjava u svakom trenutku.',
      },
    ],
  }),
})

function Privacy() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <article className="island-shell prose prose-sm mx-auto max-w-2xl rounded-2xl p-6 sm:p-10">
        <p className="island-kicker mb-2">Pravno</p>
        <h1 className="display-title mb-2 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          Politika privatnosti
        </h1>
        <p className="text-sm text-[var(--ink-soft)]">
          Zadnja izmjena: lipanj 2026. Ova stranica objašnjava što radimo s podacima
          koje nam ostavite na listi čekanja.
        </p>

        <h2>Tko smo</h2>
        <p>
          Bonaca je projekt u izradi s hrvatske obale. Za sva pitanja o vašim podacima
          pišite nam na{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>Koje podatke prikupljamo</h2>
        <ul>
          <li>
            <strong>E-mail adresu</strong> — kako bismo vas obavijestili kad Bonaca
            bude spremna za narudžbu.
          </li>
          <li>
            <strong>Otok ili grad</strong> (neobavezno) — samo da bolje razumijemo
            odakle dolazi interes.
          </li>
        </ul>
        <p>
          Ne prikupljamo više od ovoga. Nema kolačića za praćenje; statistiku
          posjeta vodimo anonimno i bez profiliranja.
        </p>

        <h2>Kako koristimo podatke</h2>
        <p>
          Vašu e-mail adresu koristimo isključivo da vam javimo kad Bonaca postane
          dostupna i poneku važnu obavijest o lansiranju. <strong>Bez spama.</strong>{' '}
          Podatke ne prodajemo niti ustupamo trećim stranama u marketinške svrhe.
        </p>

        <h2>Vaša prava</h2>
        <p>
          U skladu s GDPR-om u svakom trenutku možete zatražiti uvid, ispravak ili
          brisanje svojih podataka, ili se odjaviti s liste. Dovoljan je jedan mail na{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> — odjavu rješavamo bez
          pitanja.
        </p>

        <p className="mt-8 text-sm">
          <Link to="/">← Natrag na početnu</Link>
        </p>
      </article>
    </main>
  )
}
