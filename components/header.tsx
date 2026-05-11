"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Accenture logo SVG - the ">" chevron
function AccentureLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <path d="M5 2L19 12L5 22V2Z" fill="currentColor" />
    </svg>
  )
}

// HSBC logo SVG - red hexagon with white triangles
function HSBCLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
      <rect width="32" height="32" fill="#DB0011" />
      <polygon points="0,0 16,0 0,16" fill="white" />
      <polygon points="32,32 16,32 32,16" fill="white" />
      <polygon points="32,0 16,0 32,16" fill="white" />
      <polygon points="0,32 16,32 0,16" fill="white" />
    </svg>
  )
}

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
          <div className="flex items-center gap-4">
            {/* Accenture logo with wordmark */}
            <div className="flex items-center gap-1.5 text-primary">
              <AccentureLogo />
              <span className="text-lg font-semibold tracking-tight">accenture</span>
            </div>
            
            {/* Divider */}
            <div className="w-px h-6 bg-muted-foreground/30" />
            
            {/* HSBC logo */}
            <HSBCLogo />
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
