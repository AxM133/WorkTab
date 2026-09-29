import { ActualWorksSection } from './sections/ActualWorksSection'
import { BusinessPromoSection } from './sections/BusinessPromoSection'
import { HeroSection } from './sections/HeroSection'
import { HowItWorksSection } from './sections/HowItWorksSection'
import { TopFreelancersSection } from './sections/TopFreelancersSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="bg-surface-soft">
        <ActualWorksSection />
        <TopFreelancersSection />
        <HowItWorksSection />
      </div>
      <BusinessPromoSection />
    </>
  )
}
