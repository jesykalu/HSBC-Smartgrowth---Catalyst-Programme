"use client"

import { motion } from "framer-motion"
import { Search, User, Zap } from "lucide-react"

const pillars = [
  {
    icon: Search,
    title: "Detect",
    description: "Identify idle funds and savings opportunities in real-time",
  },
  {
    icon: User,
    title: "Personalise",
    description: "Tailor recommendations based on individual financial profiles",
  },
  {
    icon: Zap,
    title: "Act",
    description: "Enable instant, compliant product activation within the app",
  },
]

export function PointOfViewSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
            From Passive Banking to Proactive Financial Guidance
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Banks already hold the richest financial data about their customers. By activating this data through AI, banks can guide decisions at the right moment, retain deposits, and increase product engagement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight font-[family-name:var(--font-display)]">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
