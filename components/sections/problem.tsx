"use client"

import { motion } from "framer-motion"

const gaps = [
  {
    number: "01",
    title: "The Capability Gap",
    points: [
      "Banks built for campaigns, not real-time decisions",
      "Data fragmentation prevents acting in the moment",
      "Rules-based, manually orchestrated systems",
      "Cannot respond when the customer moment arises",
    ],
  },
  {
    number: "02",
    title: "The Value Gap",
    points: [
      "~1 billion customer interactions annually",
      "Conversion rate: ~2% — most moments are wasted",
      "Limited personalisation at the point of decision",
      "Billions in untapped revenue going unmonetised",
    ],
  },
  {
    number: "03",
    title: "The Control Gap",
    points: [
      "AI is becoming the customer's decision layer",
      "Customers are already delegating financial choices",
      "New entrants (e.g. Era.app: \"Make Claude manage your money\") are filling the gap",
      "If banks don't act, the customer relationship moves elsewhere",
    ],
  },
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
            The role of the bank is being redefined — faster than banks are adapting
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Three Gaps Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {gaps.map((gap, index) => (
            <motion.div
              key={gap.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 h-full"
            >
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
                {gap.number}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
                {gap.title}
              </h3>
              
              <ul className="space-y-3">
                {gap.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bold callout quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
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
