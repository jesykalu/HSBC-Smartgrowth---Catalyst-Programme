"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const scrollToSolution = () => {
    document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      />
      
      {/* Overlay to ensure text readability on dark image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      <div className="relative z-10 w-full pl-6 md:pl-12 lg:pl-20 pr-6 py-24 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white mb-8 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Accenture × HSBC Proposal</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance mb-8 tracking-tight font-[family-name:var(--font-display)]">
            <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Your customers are already using AI to move their money.</span>{" "}
            <span className="text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              The question is — will it be your AI guiding them, or someone else&apos;s?
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 leading-relaxed text-pretty font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Transform your mobile app into a proactive, AI-powered financial companion that retains deposits, increases product uptake, and personalises growth.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Button
              size="lg"
              onClick={scrollToSolution}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              See the solution
              <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
