"use client"

import { motion } from "framer-motion"
import { PhoneDemoSection } from "./phone-demo"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-visible">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      />
      
      {/* Overlay to ensure text readability on dark image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-24 overflow-visible">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-balance mb-8 tracking-tight font-[family-name:var(--font-display)]">
              <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Your customers are already using AI to move their money.</span>{" "}
              <span className="text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                The question is — will it be your AI guiding them, or someone else&apos;s?
              </span>
            </h1>
          </motion.div>

          {/* Right column - Interactive phone demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end overflow-visible"
          >
            <div className="relative max-w-[320px] lg:max-w-none overflow-visible">
              {/* Glow effect behind phone - pointer-events-none so buttons work */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 pointer-events-none" />
              <PhoneDemoSection heroMode={true} scale="large" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
