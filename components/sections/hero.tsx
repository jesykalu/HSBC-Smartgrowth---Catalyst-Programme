"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneDemoSection } from "./phone-demo"
import { Play, X } from "lucide-react"

export function HeroSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-visible">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        />
        
        {/* Overlay to ensure text readability on dark image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        <div className="relative z-10 w-full px-8 md:px-12 lg:px-16 py-16 overflow-visible">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr_0.8fr] gap-4 lg:gap-6 items-center">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Subscript pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#DB0011] animate-pulse" />
                <span className="text-xs font-medium text-white/70 uppercase tracking-widest">
                  Strategic Proposal
                </span>
              </div>
              
              {/* Main headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] text-balance tracking-tight">
                <span className="text-white">Your customers are already using AI to move their money.</span>
              </h1>
              
              {/* Subheadline with accent */}
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/60">
                The question is — will it be{" "}
                <span className="text-white font-medium">your AI</span>{" "}
                guiding them, or someone else&apos;s?
              </p>
              
              {/* Partnership badge */}
              <div className="flex items-center gap-3 pt-4">
                <span className="text-xs text-white/40 uppercase tracking-widest">Presented by</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/80 font-semibold text-sm">Accenture</span>
                  <span className="text-white/30">|</span>
                  <span className="text-white/80 font-semibold text-sm">HSBC</span>
                </div>
              </div>
            </motion.div>

            {/* Right column - Static phone preview with CTA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative">
                {/* Glow effect behind phone */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 pointer-events-none" />
                
                {/* Static iPhone mockup - Lock Screen with Notification */}
                <div className="relative w-[200px] h-[410px]">
                  {/* iPhone frame */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3c] via-[#48484a] to-[#3a3a3c] rounded-[2.2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-[2px] bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-[2.1rem]" />
                  <div className="absolute inset-[4px] bg-black rounded-[2rem]" />
                  
                  {/* Screen content - Lock Screen */}
                  <div className="absolute inset-[6px] bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-[1.9rem] overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full flex items-center justify-center z-10">
                      <div className="absolute left-2.5 w-[6px] h-[6px] rounded-full bg-[#1c1c1e] border border-[#2c2c2e]">
                        <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-[#3a3a3c] to-[#1c1c1e]" />
                      </div>
                      <div className="absolute right-3 w-[4px] h-[4px] rounded-full bg-[#2c2c2e]" />
                    </div>
                    
                    {/* Time display */}
                    <div className="pt-12 text-center">
                      <div className="text-white text-4xl font-light tracking-tight">9:41</div>
                      <div className="text-white/70 text-[10px] mt-0.5">Monday, 12 May</div>
                    </div>
                    
                    {/* HSBC Notification */}
                    <div className="mx-3 mt-6">
                      <div className="bg-white/95 backdrop-blur-xl rounded-xl p-2.5 shadow-lg">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#DB0011] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[8px] font-bold">HSBC</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900 text-[10px]">HSBC</span>
                              <span className="text-[8px] text-gray-500">now</span>
                            </div>
                            <p className="text-[8px] text-gray-700 mt-0.5 leading-relaxed">
                              Jes, you have £10,000 sitting idle. We&apos;ve found savings products that could make your money work harder.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                  </div>
                  
                  {/* Side buttons */}
                  <div className="absolute right-0 top-28 w-[2px] h-14 bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-r-sm" />
                  <div className="absolute left-0 top-24 w-[2px] h-8 bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm" />
                  <div className="absolute left-0 top-36 w-[2px] h-8 bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm" />
                </div>
              </div>
              
              {/* Experience Demo Button */}
              <motion.button
                onClick={() => setIsDemoOpen(true)}
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold text-sm shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4 fill-current" />
                Experience the Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Cinematic dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsDemoOpen(false)}
            />
            
            {/* Close button */}
            <button
              onClick={() => setIsDemoOpen(false)}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Demo container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Header */}
              <h2 className="text-white text-xl font-semibold mb-4 tracking-wide">Experience the Demo</h2>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full scale-150 pointer-events-none" />
              
              {/* Interactive phone demo */}
              <PhoneDemoSection heroMode={true} scale="large" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
