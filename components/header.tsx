"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold text-primary tracking-tight font-[family-name:var(--font-display)]">Accenture</div>
            <span className="text-muted-foreground">×</span>
            <div className="text-xl font-bold text-[#DB0011] tracking-tight font-[family-name:var(--font-display)]">HSBC</div>
          </div>

          {/* Navigation indicator */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">AI Financial Guidance Proposal</span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
