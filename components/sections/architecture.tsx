"use client"

import { motion } from "framer-motion"
import { Database, Package, Brain, Users, RefreshCw, ArrowDown } from "lucide-react"

const layers = [
  {
    number: "1",
    icon: Database,
    title: "GCP Data Factories",
    description: "Organises fragmented data into domain-aligned, scalable pipelines by standardising ingestion, transformation, and integration across sources.",
    isNew: false,
  },
  {
    number: "2",
    icon: Package,
    title: "Agentic Data Product Creation",
    description: "Builds reusable, trusted data products that are discoverable, interoperable, and designed for cross-domain consumption.",
    tags: ["Secure", "Discoverable", "Addressable", "Interoperable", "Trustworthy"],
    isNew: false,
  },
  {
    number: "3",
    icon: Brain,
    title: "Agentic Decision Engine",
    description: "Drives real-time, context-aware decisions by combining data, business rules, and AI to determine next best actions.",
    callout: "What is the next best action or product for this customer right now?",
    isNew: true,
  },
  {
    number: "4",
    icon: Users,
    title: "User Interactions",
    description: "Activates decisions across channels through four intelligent agents:",
    agents: [
      { name: "NBA Agent", desc: "Real-time decisioning" },
      { name: "Journey Agent", desc: "Cross-channel orchestration" },
      { name: "Advisory Agent", desc: "Customer guidance" },
      { name: "Offer Agent", desc: "Marketplace & retail media" },
    ],
    isNew: true,
  },
  {
    number: "5",
    icon: RefreshCw,
    title: "Agentic Operating Model & Feedback Loop",
    description: "Continuously learns and optimises outcomes through performance monitoring, feedback signals, and adaptive models. Human-in-the-loop throughout.",
    isNew: true,
  },
]

export function ArchitectureSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
            The Solution: How the Advice-Led Growth Engine Works
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            An always-on system that replaces campaigns with continuous, AI-driven growth operations — integrating with HSBC&apos;s existing data, channels, and core systems. No rip-and-replace required.
          </p>
        </motion.div>

        {/* Layers Stack */}
        <div className="space-y-4">
          {layers.map((layer, index) => (
            <div key={layer.number}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-card rounded-2xl p-6 border ${
                  layer.isNew ? "border-[#A100FF]/30" : "border-border"
                } relative`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    layer.isNew 
                      ? "bg-[#A100FF]/10 text-[#A100FF]" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {layer.isNew ? "Critical New for Gen AI" : "Existing Pre Gen AI"}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  {/* Number and Icon */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      layer.isNew ? "bg-[#A100FF]/10" : "bg-primary/10"
                    }`}>
                      <layer.icon className={`w-6 h-6 ${layer.isNew ? "text-[#A100FF]" : "text-primary"}`} />
                    </div>
                    <span className={`text-sm font-bold mt-2 ${layer.isNew ? "text-[#A100FF]" : "text-primary"}`}>
                      Layer {layer.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pr-24">
                    <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight font-[family-name:var(--font-display)]">
                      {layer.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{layer.description}</p>

                    {/* Tags */}
                    {layer.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {layer.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Callout */}
                    {layer.callout && (
                      <p className="text-sm italic text-primary border-l-2 border-primary pl-3">
                        &quot;{layer.callout}&quot;
                      </p>
                    )}

                    {/* Agents */}
                    {layer.agents && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {layer.agents.map((agent) => (
                          <div key={agent.name} className="bg-muted/50 rounded-lg p-2">
                            <p className="text-sm font-medium text-foreground">{agent.name}</p>
                            <p className="text-xs text-muted-foreground">{agent.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Connector arrow */}
              {index < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
