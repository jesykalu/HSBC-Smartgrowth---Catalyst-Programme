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
                
                {/* Static iPhone mockup */}
                <div className="relative w-[200px] h-[410px]">
                  {/* iPhone frame */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3c] via-[#48484a] to-[#3a3a3c] rounded-[2.2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-[2px] bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-[2.1rem]" />
                  <div className="absolute inset-[4px] bg-black rounded-[2rem]" />
                  
                  {/* Screen content */}
                  <div className="absolute inset-[6px] bg-white rounded-[1.9rem] overflow-hidden">
                    {/* Status bar with Dynamic Island */}
                    <div className="h-12 bg-white relative flex items-end justify-between px-6 pb-1">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full flex items-center justify-center">
                        <div className="absolute left-3 w-[8px] h-[8px] rounded-full bg-[#1c1c1e] border border-[#2c2c2e]">
                          <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-[#3a3a3c] to-[#1c1c1e]" />
                        </div>
                        <div className="absolute right-4 w-[5px] h-[5px] rounded-full bg-[#2c2c2e]" />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-900">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-2.5 border border-gray-900 rounded-[2px] relative">
                          <div className="absolute inset-[1px] right-[2px] bg-gray-900 rounded-[1px]" />
                        </div>
                      </div>
                    </div>
                    
                    {/* HSBC Header */}
                    <div className="h-8 bg-[#DB0011] flex items-center px-3">
                      <div className="text-white font-bold text-sm tracking-tight">HSBC</div>
                    </div>
                    
                    {/* Chat preview content */}
                    <div className="p-3 space-y-2 bg-gray-50 h-full">
                      {/* AI message bubble */}
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#DB0011] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[8px] font-bold">AI</span>
                        </div>
                        <div className="bg-white rounded-xl rounded-tl-sm px-2.5 py-1.5 shadow-sm max-w-[85%]">
                          <p className="text-[9px] text-gray-700 leading-relaxed">
                            Hi there! I&apos;m your HSBC AI assistant. How can I help you today?
                          </p>
                        </div>
                      </div>
                      
                      {/* User message bubble */}
                      <div className="flex justify-end">
                        <div className="bg-[#DB0011] rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[85%]">
                          <p className="text-[9px] text-white leading-relaxed">
                            I want to save money
                          </p>
                        </div>
                      </div>
                      
                      {/* AI response */}
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#DB0011] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[8px] font-bold">AI</span>
                        </div>
                        <div className="bg-white rounded-xl rounded-tl-sm px-2.5 py-1.5 shadow-sm max-w-[85%]">
                          <p className="text-[9px] text-gray-700 leading-relaxed">
                            Great choice! Let me help you find the best savings option...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/20 rounded-full" />
                  
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
              className="relative z-10"
            >
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
