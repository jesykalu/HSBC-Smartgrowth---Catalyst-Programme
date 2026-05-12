"use client"

import { motion } from "framer-motion"
import { Target, Zap, Music, DollarSign, RefreshCw, ArrowRight } from "lucide-react"

const todayItems = [
  "Campaigns, not decisions",
  "Segments, not individuals",
  "Rules, not context",
  "Episodic interactions",
  "The bank observes — but rarely acts",
]

const tomorrowItems = [
  "Decisions made in real time",
  "Every customer treated as an individual",
  "Actions triggered by context",
  "Optimised for outcomes: value, risk, growth",
  "The bank acts in the moment — when it matters",
]

const flywheelSteps = [
  {
    icon: Target,
    title: "Customer Moments",
    subtitle: "~1B+ interactions",
  },
  {
    icon: Zap,
    title: "Real-Time Decisioning",
    subtitle: "Context → next best action",
  },
  {
    icon: Music,
    title: "Orchestrated Action",
    subtitle: "Personalised, ready-to-execute",
  },
  {
    icon: DollarSign,
    title: "Value Creation",
    subtitle: "↑ Conversion ↑ Revenue ↓ Cost",
  },
  {
    icon: RefreshCw,
    title: "Data + Learning Loop",
    subtitle: "More signals → smarter decisions",
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
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Today vs Tomorrow Contrast */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Today Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-muted/50 rounded-2xl p-8 border border-border"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
              Today
            </h3>
            <p className="text-lg font-bold text-foreground/70 mb-6 font-[family-name:var(--font-display)]">
              Passive, campaign-led engagement
            </p>
            <ul className="space-y-3">
              {todayItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tomorrow Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-primary/5 rounded-2xl p-8 border border-primary/20"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
              Tomorrow
            </h3>
            <p className="text-lg font-bold text-foreground mb-6 font-[family-name:var(--font-display)]">
              Active, real-time financial management
            </p>
            <ul className="space-y-3">
              {tomorrowItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Agentic Growth Flywheel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-center text-xl font-bold text-foreground mb-8 font-[family-name:var(--font-display)]">
            Agentic Growth Flywheel
          </h3>
          
          {/* Desktop: Horizontal flow */}
          <div className="hidden md:flex items-center justify-between gap-2">
            {flywheelSteps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground max-w-[120px]">{step.subtitle}</p>
                </div>
                {index < flywheelSteps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-primary/50 mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Vertical flow */}
          <div className="md:hidden space-y-4">
            {flywheelSteps.map((step, index) => (
              <div key={step.title}>
                <div className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
                {index < flywheelSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="w-4 h-4 text-primary/50 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-bold text-foreground tracking-tight font-[family-name:var(--font-display)]">
            Every interaction becomes a decision.{" "}
            <span className="text-primary">Every decision creates value.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
