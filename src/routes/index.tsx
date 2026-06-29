import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/sections/Hero'
import AudienceSplit from '../components/sections/AudienceSplit'
import WhySection from '../components/sections/WhySection'
import ContrastSection from '../components/sections/ContrastSection'
import IslandsSection from '../components/sections/IslandsSection'
import ProductShowcase from '../components/sections/ProductShowcase'
import HowItWorks from '../components/sections/HowItWorks'
import HostsSection from '../components/sections/HostsSection'
import SocialProof from '../components/sections/SocialProof'
import FaqSection from '../components/sections/FaqSection'
import StoneQuote from '../components/sections/StoneQuote'
import WaitlistSection from '../components/sections/WaitlistSection'
import ComingSoon from '../components/sections/ComingSoon'
import StickyCta from '../components/StickyCta'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main>
      <Hero />
      <AudienceSplit />
      <WhySection />
      <ContrastSection />
      {/* brand story sits mid-page as context — not between the visitor and the form */}
      <IslandsSection />
      <ProductShowcase />
      <HowItWorks />
      {/* the ROI argument, then proof, then the emotional payoff feeding the ask */}
      <HostsSection />
      <SocialProof />
      {/* resolve the rational objections right before the emotional close + ask */}
      <FaqSection />
      <StoneQuote />
      <WaitlistSection />
      {/* a wrap-up roadmap that loops the visitor back to the waitlist */}
      <ComingSoon />
      <StickyCta />
    </main>
  )
}
