import { Home, KeyRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Arm = {
  href: string
  Icon: LucideIcon
  label: string
  dot: string
  dir: 'left' | 'right'
}

const ARMS: Arm[] = [
  { href: '#kako-radi', Icon: Home, label: 'Za vaš dom', dot: 'var(--terracotta)', dir: 'left' },
  { href: '#iznajmljivaci', Icon: KeyRound, label: 'Za iznajmljivače', dot: 'var(--signal)', dir: 'right' },
]

function SignArm({ href, Icon, label, dot, dir }: Arm) {
  const edge = dir === 'left' ? 'right-2.5' : 'left-2.5'
  return (
    <a href={href} className={`sign-arm sign-arm--${dir} relative`}>
      {/* rusted bolts where the plank is nailed to the pole */}
      <span className={`pointer-events-none absolute ${edge} top-2 h-2 w-2 rounded-full bg-[#2c1c0e] shadow-[0_0_0_2px_rgba(120,70,30,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]`} aria-hidden="true" />
      <span className={`pointer-events-none absolute ${edge} bottom-2 h-2 w-2 rounded-full bg-[#2c1c0e] shadow-[0_0_0_2px_rgba(120,70,30,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]`} aria-hidden="true" />

      <Icon size={17} strokeWidth={2.1} className="flex-none opacity-90" />
      <span className="sign-engrave display-title whitespace-nowrap text-[0.97rem] font-bold">{label}</span>
      <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: dot }} aria-hidden="true" />
    </a>
  )
}

// A sun-beaten coastal putokaz: one thick, planted pole; two arms nailed on at
// different heights and slightly crooked, pointing opposite ways.
export default function AudienceSplit() {
  return (
    <section className="page-wrap mt-16 sm:mt-20">
      <p className="mb-4 text-center">
        <span className="tech-label">Skoči na ono što vas zanima</span>
      </p>

      {/* desktop: crooked arms on a thick pole, kept compact */}
      <div className="relative mx-auto hidden h-[176px] max-w-2xl sm:block">
        <div className="absolute inset-y-0 left-1/2 z-0 flex -translate-x-1/2 flex-col items-center">
          <span className="sign-post-cap h-3 w-10" />
          <span className="sign-post w-6 flex-1" />
          <span className="sign-post-cap h-2.5 w-12" />
        </div>

        {/* high arm, pointing left, sagging a touch — pivots at the bolt */}
        <div
          className="absolute right-1/2 top-[12%] z-10 w-[46%]"
          style={{ transform: 'rotate(-2.4deg)', transformOrigin: 'right center' }}
        >
          <SignArm {...ARMS[0]} />
        </div>

        {/* low arm, pointing right, tilted the other way */}
        <div
          className="absolute left-1/2 top-[54%] z-10 w-[46%]"
          style={{ transform: 'rotate(2.8deg)', transformOrigin: 'left center' }}
        >
          <SignArm {...ARMS[1]} />
        </div>
      </div>

      {/* mobile: stacked planks, each nudged crooked */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div style={{ transform: 'rotate(-1.4deg)' }}>
          <SignArm {...ARMS[0]} />
        </div>
        <div style={{ transform: 'rotate(1.4deg)' }}>
          <SignArm {...ARMS[1]} />
        </div>
      </div>
    </section>
  )
}
