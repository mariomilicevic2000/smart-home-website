import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Bonaca — Stara klima. Nova pamet.',
      },
      {
        name: 'description',
        content:
          'Bonaca pretvara vašu staru klimu u pametnu, bez bušenja zidova i bez novog uređaja. Upravljajte njome s mobitela, bilo gdje. Pametna klimatizacija za hrvatsku obalu.',
      },
      // Open Graph — so shared links (WhatsApp, Facebook, Instagram) render a card.
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Bonaca' },
      { property: 'og:title', content: 'Bonaca — Stara klima. Nova pamet.' },
      {
        property: 'og:description',
        content:
          'Pretvorite klimu koju već imate u pametnu — bez novog uređaja i bez bušenja zidova. Upravljajte njome s mobitela, bilo gdje.',
      },
      { property: 'og:locale', content: 'hr_HR' },
      { property: 'og:url', content: 'https://bonaca.hr/' },
      { property: 'og:image', content: 'https://bonaca.hr/assets/house_interior.png' },
      { property: 'og:image:width', content: '1408' },
      { property: 'og:image:height', content: '768' },
      // Twitter / X card.
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Bonaca — Stara klima. Nova pamet.' },
      {
        name: 'twitter:description',
        content:
          'Pretvorite klimu koju već imate u pametnu — bez novog uređaja. Upravljajte njome s mobitela, bilo gdje.',
      },
      { name: 'twitter:image', content: 'https://bonaca.hr/assets/house_interior.png' },
    ],
    links: [
      // Fonts via <link> (not CSS @import) so they don't serially block render.
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      // Preload the hero's first-paint image (LCP) so it isn't discovered late.
      { rel: 'preload', as: 'image', href: '/assets/house_exterior.png' },
    ],
  }),
  shellComponent: RootDocument,
})

// Organization + Product structured data for richer search results.
const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Bonaca',
  description:
    'Mali uređaj koji staru klimu pretvara u pametnu — uči infracrveni daljinski i daje upravljanje s mobitela, bez nove klime i bez bušenja zidova.',
  category: 'Smart home / Pametna klimatizacija',
  brand: { '@type': 'Brand', name: 'Bonaca' },
  url: 'https://bonaca.hr',
  image: 'https://bonaca.hr/assets/house_interior.png',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    price: '59',
    availability: 'https://schema.org/PreOrder',
    url: 'https://bonaca.hr/#prijava',
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
        {/* Privacy-friendly, cookieless analytics (GDPR-safe). Production only. */}
        {import.meta.env.PROD && (
          <script
            defer
            data-domain="bonaca.hr"
            src="https://plausible.io/js/script.tagged-events.js"
          />
        )}
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(45,212,200,0.28)]">
        <Header />
        {children}
        <Footer />
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
