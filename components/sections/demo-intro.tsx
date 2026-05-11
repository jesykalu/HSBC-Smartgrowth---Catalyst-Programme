"use client"

import { motion } from "framer-motion"
import { User, Wallet } from "lucide-react"

export function DemoIntroSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-muted/50 via-background to-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
            Let&apos;s See It in Action
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#DB0011] flex items-center justify-center shadow-lg">
                <span className="text-white text-xs font-bold">HSBC</span>
              </div>
            </div>

            {/* Info */}
            <div className="text-left">
              <p className="text-lg text-muted-foreground mb-2">Meet</p>
              <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">Jes</h3>
              <p className="text-muted-foreground leading-relaxed">
                A loyal HSBC customer with{" "}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                  <Wallet className="w-4 h-4" />
                  £10,000
                </span>{" "}
                sitting idle in her account.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              Watch how AI-powered financial guidance transforms her banking experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
