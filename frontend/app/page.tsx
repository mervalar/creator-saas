import { Navbar } from '@/components/landing/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { ProblemSection } from '@/components/landing/ProblemSection'
import { SolutionSection } from '@/components/landing/SolutionSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { SocialProofSection } from '@/components/landing/SocialProofSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { FinalCTA } from '@/components/landing/FinalCTA'

export default function LandingPage() {
  return (
    <main className="relative">
      {/* Grid background */}
      <div className="grid-bg pointer-events-none fixed inset-0" aria-hidden />

      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCTA />
    </main>
  )
}
