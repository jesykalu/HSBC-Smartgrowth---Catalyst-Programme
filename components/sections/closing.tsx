"use client"

import { motion } from "framer-motion"
import { Sparkles, Lock, Building2, ArrowRight, Globe, Link, BarChart3 } from "lucide-react"

const whyAccenturePoints = [
  {
    icon: Building2,
    title: "Deep HSBC Trust",
    description: "Delivered global mobile banking platform on time and on budget. Built L3 capabilities enabling digital self-serve at scale. Embedded across technology, digital, and operations.",
  },
  {
    icon: ArrowRight,
    title: "Natural Next Step",
    description: "HSBC has invested in building the digital platform. The next step is to activate the customer base. This proposal monetises what HSBC has already built — from capability build to value realisation.",
  },
  {
    icon: Globe,
    title: "Proven Delivery at Scale",
    description: "Similar models delivered at BBVA, Intesa Sanpaolo, and Standard Chartered. Complex, outcome-led programmes across industries globally.",
  },
  {
    icon: Link,
    title: "End-to-End Capability",
    description: "The only partner covering strategy → data → AI → orchestration → operations. No other partner can stitch all layers together end-to-end.",
  },
  {
    icon: BarChart3,
    title: "Outcomes-Aligned Commercial Model",
    description: "Fixed fee for platform build. Variable fees tied only to incremental growth, efficiency, and new revenue. HSBC retains the majority of value created.",
  },
]

export function ClosingSection() {
  return (
    <section id="why-us" className="py-32 px-6 bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(106,0,255,0.08),transparent_70%)]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Why Accenture Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">Why Accenture</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center tracking-tight font-[family-name:var(--font-display)]">
            Why Accenture
          </h3>
          
          <div className="space-y-4">
            {whyAccenturePoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{point.title}</h4>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-px bg-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-16 h-px bg-primary/30" />
        </div>

        {/* Main CTA / Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          {/* Main quote */}
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] text-balance mb-8 tracking-tight font-[family-name:var(--font-display)]">
            {"\u201C"}In the age of AI, the banks that win will be the ones that{" "}
            <span className="text-primary">guide their customers first.</span>{"\u201D"}
          </blockquote>

          {/* Subtext */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This is not just a feature. It is a new model for customer engagement and growth.
          </p>

          {/* Footer brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <p className="text-sm text-muted-foreground mb-2">Presented by</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl font-bold text-primary tracking-tight font-[family-name:var(--font-display)]">Team Orbit</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Confidential Footer Banner */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Top strip - Confidential notice */}
        <div className="bg-[#0a0a0a] py-3 border-b border-white/10">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Confidential — Internal Use Only
            </span>
            <Lock className="w-4 h-4 text-primary" />
          </div>
        </div>
        
        {/* Bottom strip - Copyright and authorship */}
        <div className="bg-[#0a0a0a] py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-xs text-white/40">
              © 2026 Accenture. All rights reserved.
            </span>
            <span className="text-xs text-white/40">
              Authored in collaboration with{" "}
              <span className="font-bold text-white/60">Accenture FS — Rockit team</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
