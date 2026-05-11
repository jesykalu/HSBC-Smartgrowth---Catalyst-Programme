"use client"

import { motion } from "framer-motion"
import { Wallet, TrendingUp, Heart, PiggyBank, Shield, Rocket } from "lucide-react"

const benefits = [
  {
    icon: Wallet,
    title: "Deposit Retention",
    metric: "20–30%",
    description: "Retain up to 20–30% of at-risk idle balances",
    subtext: "Reduce outflows to competitors and AI-driven platforms",
  },
  {
    icon: TrendingUp,
    title: "Revenue Uplift",
    metric: "15–25%",
    description: "Increase product conversion rates by 15–25%",
    subtext: "Unlock new revenue from previously idle funds",
  },
  {
    icon: Heart,
    title: "Customer Loyalty",
    metric: "↑",
    description: "Increase engagement frequency within mobile app",
    subtext: "Strengthen trust through proactive guidance",
  },
  {
    icon: PiggyBank,
    title: "Cost Efficiency",
    metric: "↓",
    description: "Reduce reliance on outbound sales and advisory channels",
    subtext: "Shift to digital self-service conversion",
  },
  {
    icon: Shield,
    title: "Competitive Positioning",
    metric: "AI",
    description: "Compete directly with AI tools like ChatGPT",
    subtext: "Prevent disintermediation by external platforms",
  },
  {
    icon: Rocket,
    title: "Future-Ready Architecture",
    metric: "∞",
    description: "Foundation for personalised and dynamic product models",
    subtext: "Enables long-term innovation in retail banking",
  },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-primary font-[family-name:var(--font-display)]">{benefit.metric}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight font-[family-name:var(--font-display)]">{benefit.title}</h3>
                <p className="text-foreground/80 mb-2">{benefit.description}</p>
                <p className="text-sm text-muted-foreground">{benefit.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
