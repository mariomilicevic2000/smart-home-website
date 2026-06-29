import { createFileRoute, Link } from '@tanstack/react-router'
import { SITE } from '../data/site'

export const Route = createFileRoute('/uvjeti')({
  component: Terms,
  head: () => ({
    meta: [
      { title: 'Uvjeti korištenja — Bonaca' },
      {
        name: 'description',
        content:
          'Uvjeti korištenja Bonaca web-stranice i liste čekanja. Prijava ne obvezuje na kupnju.',
      },
    ],
  }),
})

function Terms() {
  return (
    <main className="page-wrap px-4 py-12 sm:py-16">
      <article className="island-shell prose prose-sm mx-auto max-w-2xl rounded-2xl p-6 sm:p-10">
        <p className="island-kicker mb-2">Pravno</p>
        <h1 className="display-title mb-2 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          Uvjeti korištenja
        </h1>
        <p className="text-sm text-[var(--ink-soft)]">Zadnja izmjena: lipanj 2026.</p>

        <h2>Lista čekanja</h2>
        <p>
          Prijavom na listu čekanja ostavljate nam e-mail adresu kako bismo vas
          obavijestili o dostupnosti proizvoda. Prijava{' '}
          <strong>ne predstavlja narudžbu</strong> niti obvezu na kupnju, i ne
          stvara nikakvu financijsku obvezu.
        </p>

        <h2>Proizvod u izradi</h2>
        <p>
          Bonaca je još u razvoju. Specifikacije, cijene i rokovi navedeni na
          stranici su <strong>okvirni i indikativni</strong> te se mogu promijeniti
          do lansiranja. Slike i 3D modeli su ilustrativni.
        </p>

        <h2>Intelektualno vlasništvo</h2>
        <p>
          Sadržaj stranice (tekst, dizajn, ilustracije) vlasništvo je Bonace, osim
          gdje je drukčije navedeno (npr. 3D modeli pod CC licencom).
        </p>

        <h2>Kontakt</h2>
        <p>
          Pitanja o ovim uvjetima šaljite na{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <p className="mt-8 text-sm">
          <Link to="/">← Natrag na početnu</Link>
        </p>
      </article>
    </main>
  )
}
