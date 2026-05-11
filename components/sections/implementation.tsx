"use client"

import { motion } from "framer-motion"
import { Rocket, Target, CheckCircle, ArrowRight } from "lucide-react"

const phases = [
  {
    number: "Phase 1",
    icon: Target,
    title: "Intelligent Triggers",
    duration: "3–6 months",
    items: [
      "Trigger + recommend",
      "Existing products",
      "Embedded compliance",
    ],
  },
  {
    number: "Phase 2",
    icon: Rocket,
    title: "Elastic Products",
    duration: "6–12 months",
    items: [
      "Tailored products",
      "Expanded controls",
      "Personalised pricing",
    ],
  },
]

export function ImplementationSection() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
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

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-accent -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <phase.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-widest">{phase.number}</span>
                      <h3 className="text-xl font-bold text-foreground tracking-tight font-[family-name:var(--font-display)]">{phase.title}</h3>
                    </div>
                  </div>

                  <div className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-6">
                    {phase.duration}
                  </div>

                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-primary/10 text-primary">
            <span className="font-medium">Progressive value delivery</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
