import { Link } from '@tanstack/react-router'
import BrandMark from './BrandMark'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-20 px-4 pb-12 pt-12 text-[var(--ink-soft)]">
      <div className="page-wrap">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="mb-2 flex items-center gap-2">
              <BrandMark size={22} className="flex-none" />
              <span className="display-title text-base font-semibold text-[var(--ink)]">
                Bonaca
              </span>
            </div>
            <p className="m-0 text-sm">Vlastita bonaca, na dodir prsta.</p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="island-kicker mb-2">Proizvod</p>
              <ul className="m-0 list-none space-y-1.5 p-0">
                <li>
                  <a href="#kako-radi">Kako radi</a>
                </li>
                <li>
                  <a href="#proizvod">Proizvod</a>
                </li>
                <li>
                  <a href="#iznajmljivaci">Za iznajmljivače</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="island-kicker mb-2">Kontakt</p>
              <ul className="m-0 list-none space-y-1.5 p-0">
                <li>
                  <a href="mailto:bok@bonaca.hr">bok@bonaca.hr</a>
                </li>
                <li>
                  <a href="#prijava">Lista čekanja</a>
                </li>
              </ul>
            </div>
            <div>
              <p className="island-kicker mb-2">Pravno</p>
              <ul className="m-0 list-none space-y-1.5 p-0">
                <li>
                  <Link to="/privatnost">Politika privatnosti</Link>
                </li>
                <li>
                  <Link to="/uvjeti">Uvjeti korištenja</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[var(--line)] pt-6 text-center text-xs sm:flex-row sm:text-left">
          <p className="m-0">&copy; {year} Bonaca. Sva prava pridržana.</p>
          <p className="m-0">Zamišljeno na hrvatskoj obali.</p>
        </div>
      </div>
    </footer>
  )
}
