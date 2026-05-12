"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Opportunity", sectionId: "the-opportunity" },
  { label: "Our Thinking", sectionId: "our-thinking" },
  { label: "The Solution", sectionId: "the-solution" },
  { label: "How It Works", sectionId: "how-it-works" },
  { label: "Value Creation", sectionId: "value-creation" },
  { label: "Roadmap", sectionId: "roadmap" },
  { label: "Why Accenture", sectionId: "why-us" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = navItems.map(item => item.sectionId)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                setActiveSection(sectionId)
              }
            })
          },
          { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <>
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
            {/* Logo lockup */}
            <div className="flex items-center gap-4">
              {/* Accenture logo */}
              <img 
                src="/accenture-logo.png" 
                alt="Accenture" 
                className="h-8 w-auto"
              />
              
              {/* Divider */}
              <div className="w-px h-6 bg-muted-foreground/30" />
              
              {/* HSBC logo */}
              <img 
                src="/hsbc-logo.png" 
                alt="HSBC" 
                className="h-6 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`text-sm font-medium px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    activeSection === item.sectionId
                      ? scrolled
                        ? "text-foreground bg-muted"
                        : "text-white bg-white/10"
                      : scrolled
                        ? "text-foreground/60 hover:text-foreground"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side - CTA button (desktop) and mobile menu button */}
            <div className="flex items-center gap-4">
              {/* See the Demo CTA - Desktop */}
              <button
                onClick={scrollToTop}
                className="hidden md:block rounded-full px-4 py-2 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all"
              >
                See the Demo
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
            >
              <nav className="flex flex-col py-4 px-6">
                {navItems.map((item) => (
                  <button
                    key={item.sectionId}
                    onClick={() => scrollToSection(item.sectionId)}
                    className={`text-left text-sm font-medium py-3 px-4 rounded-lg transition-colors ${
                      activeSection === item.sectionId
                        ? "text-foreground bg-muted"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                {/* Mobile See the Demo CTA */}
                <button
                  onClick={scrollToTop}
                  className="mt-4 rounded-full px-4 py-3 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all text-center"
                >
                  See the Demo
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
