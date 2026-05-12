import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { PointOfViewSection } from "@/components/sections/point-of-view"
import { SolutionSection } from "@/components/sections/solution"
import { ArchitectureSection } from "@/components/sections/architecture"
import { BenefitsSection } from "@/components/sections/benefits"
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
      <ArchitectureSection />
      <BenefitsSection />
      <ImplementationSection />
      <ClosingSection />
    </main>
  )
}
