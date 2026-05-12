"use client"

import { motion } from "framer-motion"
import { TrendingUp, DollarSign, Settings } from "lucide-react"

const levers = [
  {
    icon: TrendingUp,
    title: "Convert More Moments",
    value: "£300M–£500M",
    region: "(UK)",
    how: "+0.75% lift across ~1bn annual interactions = 7.5M incremental outcomes/year",
    detail: "Blended value: £63 per outcome (credit cards, loans, mortgages, wealth, insurance)",
    benchmark: "Tier-1 NBA deployments show 0.5–1.5% lift range",
  },
  {
    icon: DollarSign,
    title: "Monetise Customer Attention",
    value: "£50M–£100M",
    region: "(UK)",
    how: "5% capture of 1bn interactions = 50M monetised moments/year at £3 revenue each",
    detail: "",
    benchmark: "Chase generates 18B+ offers annually — this is modelled conservatively at half that rate",
  },
  {
    icon: Settings,
    title: "Reduce the Cost to Grow",
    value: "£90M–£225M",
    region: "(UK)",
    how: "30% reduction in campaign & marketing ops (~£420M estimated annual ops base)",
    detail: "Equivalent to 600–800 FTE automated",
    benchmark: "Midpoint of Accenture agentic programme range (20–40%)",
  },
]

const summaryStats = [
  { label: "Total UK Value", value: "£400M–£700M+" },
  { label: "Total Global Value", value: "~$1.7bn" },
  { label: "ROI", value: "8:1 over 2 years" },
]

export function BenefitsSection() {
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
            Quantifiable Business Impact
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Value Levers Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {levers.map((lever, index) => (
            <motion.div
              key={lever.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <lever.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary font-[family-name:var(--font-display)]">{lever.value}</span>
                    <span className="text-sm text-muted-foreground ml-1">{lever.region}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
                  {lever.title}
                </h3>

                {/* How */}
                <p className="text-sm text-foreground/80 mb-3">{lever.how}</p>

                {/* Detail */}
                {lever.detail && (
                  <p className="text-sm text-muted-foreground mb-3">{lever.detail}</p>
                )}

                {/* Benchmark */}
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground italic">
                    Benchmark: {lever.benchmark}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary/5 rounded-2xl p-6 border border-primary/20"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {summaryStats.map((stat, index) => (
              <div key={stat.label} className={index !== summaryStats.length - 1 ? "md:border-r md:border-primary/20" : ""}>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-primary font-[family-name:var(--font-display)]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
