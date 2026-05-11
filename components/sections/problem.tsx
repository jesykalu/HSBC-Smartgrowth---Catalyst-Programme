"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingDown, UserX, Bot, ExternalLink, DollarSign, Heart, AlertTriangle } from "lucide-react"

const leftItems = [
  { icon: DollarSign, text: "Customers hold idle cash (e.g. £10,000+)" },
  { icon: Heart, text: "No proactive engagement from banks" },
  { icon: Bot, text: "Customers go to AI tools" },
  { icon: ExternalLink, text: "They find better options externally" },
]

const rightItems = [
  { icon: TrendingDown, text: "Deposit outflow" },
  { icon: UserX, text: "Reduced customer lifetime value" },
  { icon: AlertTriangle, text: "AI-led disintermediation" },
]

export function ProblemSection() {
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
            The Shift You Can&apos;t Ignore
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left side - Current State */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-sm border border-border"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6 font-[family-name:var(--font-display)]">
              What&apos;s Happening
            </h3>
            <div className="space-y-4">
              {leftItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Arrow indicator for desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          {/* Right side - Consequences */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card rounded-2xl p-8 shadow-sm border border-destructive/20"
          >
            <h3 className="text-sm font-semibold text-destructive uppercase tracking-widest mb-6 font-[family-name:var(--font-display)]">
              The Consequence
            </h3>
            <div className="space-y-4">
              {rightItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 hover:bg-destructive/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bold statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-8 py-6 rounded-2xl bg-primary/5 border border-primary/20">
<p className="text-xl md:text-2xl font-bold text-foreground tracking-tight font-[family-name:var(--font-display)]">
            {"\u201C"}If you don&apos;t guide your customers&apos; money,{" "}
            <span className="text-primary">someone else will.</span>{"\u201D"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
