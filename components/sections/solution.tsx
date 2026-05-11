"use client"

import { motion } from "framer-motion"
import { Lightbulb, Layers, CheckCircle } from "lucide-react"

const stages = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "Intelligent product matching based on customer behaviour",
    features: [
      "Recommend existing products",
      "Driven by behaviour and profile",
      "Fast to deploy",
    ],
    color: "primary",
  },
  {
    number: "02",
    icon: Layers,
    title: "Elastic Financial Products",
    description: "Dynamic, personalised product creation at scale",
    features: [
      "Dynamically tailored products",
      "Adjustable interest, limits, structure",
      "True personalisation at scale",
    ],
    color: "accent",
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
            A Two-Stage Transformation
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 h-full shadow-sm hover:shadow-lg">
                {/* Stage number */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-bold text-primary/20">{stage.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stage.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight font-[family-name:var(--font-display)]">{stage.title}</h3>
                <p className="text-muted-foreground mb-6">{stage.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {stage.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connection line for desktop */}
              {index === 0 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary/50 to-primary/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
