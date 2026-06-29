// Single source of truth for the marketing facts that recur across the page.
// Pre-launch: nothing here is fabricated. No invented waitlist counts, no fake
// "spots left", no named testimonials. Prices are an indicative range only,
// always shown with a clear "okvirno" label until they're final.

export const SITE = {
  email: 'bok@bonaca.hr',
  domain: 'bonaca.hr',
  url: 'https://bonaca.hr',

  // Target availability window.
  launchWindow: 'ljeto 2026.',

  // Indicative price range — NOT final. Only ever rendered with an "okvirno"
  // qualifier next to it. Edit freely; remove if you'd rather show no number.
  priceFrom: 59,
  priceTo: 79,
  currency: '€',

  // Indicative cost of buying a NEW smart AC — used only as a price anchor.
  priceNewAcFrom: 800,

  // Host ROI — basis for the "do 90 €" figure so it reads sourced, not invented.
  hostSavingMax: 90,
  hostSavingBasis: '1 kW × 8 h/dan × 30 dana × ~0,38 €/kWh',
} as const

// What an early-access signup actually gets — concrete, honest, no fake people.
export const EARLY_ACCESS: Array<{
  title: string
  note: string
  place: string
  coords: string
  stamp: 'boat' | 'lavender' | 'sunset'
  rot: number
  tape: 'left' | 'right' | null
}> = [
  {
    title: 'Prvi red',
    note: 'Prva serija ide ljudima s liste, prije bilo kakve šire prodaje. Bez gužve, bez čekanja u redu.',
    place: 'Vis',
    coords: 'N 43.06° · E 16.18°',
    stamp: 'boat',
    rot: -3,
    tape: 'left',
  },
  {
    title: 'Founding cijena',
    note: 'Prijave s liste dobivaju okvirnu founding cijenu za prvu seriju — povoljnije nego kasnije u prodaji.',
    place: 'Hvar',
    coords: 'N 43.17° · E 16.44°',
    stamp: 'lavender',
    rot: 2.5,
    tape: null,
  },
  {
    title: 'Vaš glas',
    note: 'Pilot je u tijeku. Povratne informacije ranih korisnika oblikuju finalni uređaj prije nego što izađe.',
    place: 'Zadar',
    coords: 'N 44.12° · E 15.23°',
    stamp: 'sunset',
    rot: -1.5,
    tape: 'right',
  },
]
