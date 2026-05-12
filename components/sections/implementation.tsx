"use client"

import { motion } from "framer-motion"
import { Search, Hammer, Rocket, Globe, CheckCircle, Lightbulb } from "lucide-react"

const phases = [
  {
    number: "Phase 1",
    icon: Search,
    title: "Pilot & Discovery",
    duration: "M0–M3",
    highlight: "£1M Accenture-funded",
    subhighlight: "Go/no-go decision at Week 12",
    deliverables: [
      "Business Case",
      "Feasibility Assessment",
      "Target Operating Model",
      "Joint Partnership Team live",
    ],
    terms: "No risk to HSBC · 50% back if exit · Success criteria agreed upfront",
  },
  {
    number: "Phase 2",
    icon: Hammer,
    title: "Build & Enable",
    duration: "M3–M8",
    highlight: "Platform build",
    subhighlight: "Agentic engine · Data integration",
    deliverables: [
      "Joint Accenture + HSBC squad",
      "2-week sprints",
      "Steerco every 4 weeks",
    ],
    terms: null,
  },
  {
    number: "Phase 3",
    icon: Rocket,
    title: "Operate & Optimise",
    duration: "M8–M16",
    highlight: "Conversion lift",
    subhighlight: "Monetisation · Op model savings",
    deliverables: [
      "Always-on decisioning",
      "Continuous improvement across all 3 value levers",
    ],
    terms: null,
  },
  {
    number: "Phase 4",
    icon: Globe,
    title: "Scale Globally",
    duration: "M16–M22",
    highlight: "Markets: HK · SG · UAE · India",
    subhighlight: "Same playbook",
    deliverables: [
      "~$850M additional HSBC value",
      "$68M ACN fee",
    ],
    terms: null,
  },
]

const whyNowPoints = [
  {
    icon: "£",
    title: "£1M Accenture investment",
    description: "We fund the discovery phase, aligning incentives from day one",
  },
  {
    icon: "✓",
    title: "No commitment risk",
    description: "HSBC retains a go/no-go decision at Week 12 before any Run Phase spend",
  },
  {
    icon: "⚡",
    title: "Accelerated discovery",
    description: "Accenture's GenWizard tooling reduces estate discovery effort by ~40%",
  },
]

export function ImplementationSection() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
            Implementation Roadmap
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Timeline - Desktop Horizontal */}
        <div className="hidden lg:block relative mb-16">
          {/* Connection line */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-[#A100FF]" />

          <div className="grid lg:grid-cols-4 gap-6 relative">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <phase.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Phase info */}
                  <div className="text-center mb-4">
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">{phase.number}</span>
                    <h3 className="text-lg font-bold text-foreground tracking-tight font-[family-name:var(--font-display)]">{phase.title}</h3>
                    <span className="text-sm text-muted-foreground">{phase.duration}</span>
                  </div>

                  {/* Highlight */}
                  <div className="bg-primary/5 rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold text-primary text-center">{phase.highlight}</p>
                    <p className="text-xs text-muted-foreground text-center">{phase.subhighlight}</p>
                  </div>

                  {/* Deliverables */}
                  <ul className="space-y-2">
                    {phase.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Terms */}
                  {phase.terms && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground italic">{phase.terms}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile Vertical */}
        <div className="lg:hidden space-y-4 mb-16">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <phase.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">{phase.number}</span>
                  <h3 className="text-lg font-bold text-foreground tracking-tight font-[family-name:var(--font-display)]">{phase.title}</h3>
                  <span className="text-sm text-muted-foreground">{phase.duration}</span>
                  
                  <div className="bg-primary/5 rounded-lg p-3 my-3">
                    <p className="text-sm font-semibold text-primary">{phase.highlight}</p>
                    <p className="text-xs text-muted-foreground">{phase.subhighlight}</p>
                  </div>

                  <ul className="space-y-2">
                    {phase.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {phase.terms && (
                    <p className="text-xs text-muted-foreground italic mt-3 pt-3 border-t border-border">{phase.terms}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Start Now Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary/5 rounded-2xl p-8 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-display)]">Why start now?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whyNowPoints.map((point, index) => (
              <div key={point.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">{point.icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{point.title}</p>
                  <p className="text-xs text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
