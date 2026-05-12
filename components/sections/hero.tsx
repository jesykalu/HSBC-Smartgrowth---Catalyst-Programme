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

      <div className="relative z-10 w-full px-8 md:px-12 lg:px-16 py-16 overflow-visible">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subscript pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <svg
                className="w-4 h-4 text-white/80 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L13.09 8.26L19 7L14.74 11.74L21 12L14.74 12.26L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.26L3 12L9.26 11.74L5 7L10.91 8.26Z" />
              </svg>
              <span className="text-sm font-semibold text-white tracking-wide">
                Accenture <span className="text-white/60">×</span> HSBC Proposal
              </span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-balance tracking-tight font-[family-name:var(--font-display)]">
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
            className="flex items-center justify-center overflow-visible"
          >
            <div className="relative overflow-visible">
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
