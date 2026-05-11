import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { PointOfViewSection } from "@/components/sections/point-of-view"
import { SolutionSection } from "@/components/sections/solution"
import { BenefitsSection } from "@/components/sections/benefits"
import { DemoIntroSection } from "@/components/sections/demo-intro"
import { PhoneDemoSection } from "@/components/sections/phone-demo"
import { ImplementationSection } from "@/components/sections/implementation"
import { ClosingSection } from "@/components/sections/closing"

export default function ProposalPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSection />
      <PointOfViewSection />
      <SolutionSection />
      <BenefitsSection />
      <DemoIntroSection />
      <PhoneDemoSection />
      <ImplementationSection />
      <ClosingSection />
    </main>
  )
}
