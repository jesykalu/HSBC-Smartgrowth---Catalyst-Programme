"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, FileText, Shield, PiggyBank, TrendingUp, Sparkles, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

// Message types
type MessageType = "bot" | "user"

interface ChatMessage {
  id: number
  type: MessageType
  text?: string
  card?: "profile" | "recommendations" | "allocation" | "terms" | "compliance" | "summary"
  delay?: number // time before this message appears after the previous one
}

// Full conversation script
const conversationScript: ChatMessage[] = [
  {
    id: 1,
    type: "bot",
    text: "Hi Jes 👋 We've detected that you have **£10,000** in idle funds sitting in your current account. Based on your spending habits and existing savings products, we think we can put that money to work for you. Would you like to explore your options?",
    delay: 1500,
  },
  {
    id: 2,
    type: "user",
    text: "Yes, show me what's available.",
    delay: 1500,
  },
  {
    id: 3,
    type: "bot",
    text: "Great! Here's what we know about you:",
    delay: 1500,
  },
  {
    id: 4,
    type: "bot",
    card: "profile",
    delay: 500,
  },
  {
    id: 5,
    type: "bot",
    text: "Based on your profile, here are the products we'd recommend:",
    delay: 1500,
  },
  {
    id: 6,
    type: "bot",
    card: "recommendations",
    delay: 500,
  },
  {
    id: 7,
    type: "bot",
    text: "We suggest splitting your £10,000 like this:",
    delay: 1500,
  },
  {
    id: 8,
    type: "bot",
    card: "allocation",
    delay: 500,
  },
  {
    id: 9,
    type: "bot",
    text: "📋 Important: Your savings are protected up to **£85,000** under the FSCS (Financial Services Compensation Scheme). Tap below if you'd like to read the full terms.",
    delay: 1500,
  },
  {
    id: 10,
    type: "bot",
    card: "terms",
    delay: 500,
  },
  {
    id: 11,
    type: "bot",
    text: "✅ Running compliance checks…",
    delay: 1500,
  },
  {
    id: 12,
    type: "bot",
    card: "compliance",
    delay: 500,
  },
  {
    id: 13,
    type: "bot",
    text: "🔒 Identity verified via Face ID. All checks passed.",
    delay: 1500,
  },
  {
    id: 14,
    type: "bot",
    text: "Here's your plan summary before we confirm:",
    delay: 1500,
  },
  {
    id: 15,
    type: "bot",
    card: "summary",
    delay: 500,
  },
  {
    id: 16,
    type: "user",
    text: "Looks good — confirm my plan.",
    delay: 1500,
  },
  {
    id: 17,
    type: "bot",
    text: "🎉 Your plan is now active, Jes! Total invested: £10,000. Estimated blended return: ~4.9% avg. Your HSBC savings are working for you.",
    delay: 1500,
  },
]

// Helper to render bold text
function renderText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="w-8 h-8 rounded-full bg-[#DB0011] flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold">H</span>
      </div>
      <div className="ml-2 bg-gray-100 rounded-2xl rounded-bl-none px-4 py-3">
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
          />
          <motion.div
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}

// Profile card component
function ProfileCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 mt-2 space-y-2">
      {[
        { label: "Risk Appetite", value: "Low–Medium", color: "bg-blue-100 text-blue-700" },
        { label: "Spending Behaviour", value: "Travel, Retail", color: "bg-purple-100 text-purple-700" },
        { label: "Savings Pattern", value: "Strong Surplus", color: "bg-green-100 text-green-700" },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{item.label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.color}`}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

// Recommendations card component
function RecommendationsCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 mt-2 space-y-2">
      {[
        { name: "Fixed Saver", rate: "4.10% AER", icon: PiggyBank, recommended: false },
        { name: "Investment ISA", rate: "5–7% return", icon: TrendingUp, recommended: false },
        { name: "Smart Split Strategy", rate: "Optimised", icon: Sparkles, recommended: true },
      ].map((product) => (
        <div key={product.name} className={`p-2 rounded-lg border ${product.recommended ? 'border-[#DB0011] bg-[#DB0011]/5' : 'border-gray-100'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${product.recommended ? 'bg-[#DB0011]/10' : 'bg-gray-100'}`}>
              <product.icon className={`w-4 h-4 ${product.recommended ? 'text-[#DB0011]' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm">{product.name}</div>
              <div className="text-xs text-gray-500">{product.rate}</div>
            </div>
            {product.recommended && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#DB0011] text-white text-[10px] font-medium">Rec</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Allocation card component
function AllocationCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 mt-2 space-y-3">
      <div className="p-2 rounded-lg bg-blue-50">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-blue-900 text-sm">Fixed Saver</span>
          <span className="font-bold text-blue-700 text-sm">£6,000</span>
        </div>
        <div className="w-full h-1.5 bg-blue-200 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-blue-500 rounded-full" />
        </div>
      </div>
      <div className="p-2 rounded-lg bg-green-50">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-green-900 text-sm">Investment ISA</span>
          <span className="font-bold text-green-700 text-sm">£4,000</span>
        </div>
        <div className="w-full h-1.5 bg-green-200 rounded-full overflow-hidden">
          <div className="h-full w-2/5 bg-green-500 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Terms button card
function TermsCard() {
  return (
    <div className="mt-2">
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors">
        <FileText className="w-3 h-3" />
        Download terms & info
      </button>
    </div>
  )
}

// Compliance card with staggered checks
function ComplianceCard() {
  const checks = ["Eligibility", "Suitability", "KYC", "CDD", "Fraud Screening", "Affordability"]
  const [visibleChecks, setVisibleChecks] = useState<number>(0)

  useEffect(() => {
    if (visibleChecks < checks.length) {
      const timer = setTimeout(() => {
        setVisibleChecks(v => v + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [visibleChecks, checks.length])

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 mt-2 space-y-1.5">
      {checks.map((check, i) => (
        <motion.div
          key={check}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: i < visibleChecks ? 1 : 0, x: i < visibleChecks ? 0 : -10 }}
          className="flex items-center gap-2 p-1.5 bg-green-50 rounded-lg"
        >
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-gray-700 text-xs">{check}</span>
        </motion.div>
      ))}
    </div>
  )
}

// Summary card
function SummaryCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 mt-2 space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Fixed Saver</span>
        <span className="font-medium">£6,000 @ 4.10% AER</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Investment ISA</span>
        <span className="font-medium">£4,000 @ 5–7%</span>
      </div>
      <div className="pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">12-month fixed term</span>
      </div>
    </div>
  )
}

// Chat bubble component
function ChatBubble({ message, isNew }: { message: ChatMessage; isNew: boolean }) {
  const isBot = message.type === "bot"

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 px-3 py-1.5 ${isBot ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? "bg-[#DB0011]" : "bg-gray-400"
      }`}>
        <span className="text-white text-[10px] font-bold">{isBot ? "H" : "J"}</span>
      </div>

      {/* Message content */}
      <div className={`max-w-[75%] ${isBot ? "" : "text-right"}`}>
        <div className={`inline-block rounded-2xl px-3 py-2 ${
          isBot 
            ? "bg-gray-100 rounded-bl-none text-left" 
            : "bg-[#DB0011] text-white rounded-br-none"
        }`}>
          {message.text && (
            <p className={`text-sm leading-relaxed ${isBot ? "text-gray-800" : "text-white"}`}>
              {renderText(message.text)}
            </p>
          )}
        </div>
        
        {/* Inline cards */}
        {message.card === "profile" && <ProfileCard />}
        {message.card === "recommendations" && <RecommendationsCard />}
        {message.card === "allocation" && <AllocationCard />}
        {message.card === "terms" && <TermsCard />}
        {message.card === "compliance" && <ComplianceCard />}
        {message.card === "summary" && <SummaryCard />}
      </div>
    </motion.div>
  )
}

// Phone mockup component
function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[280px] h-[600px]">
      {/* iPhone 17 Max titanium frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3c] via-[#48484a] to-[#3a3a3c] rounded-[3.2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" />
      {/* Inner titanium edge */}
      <div className="absolute inset-[2px] bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-[3.1rem]" />
      {/* Black bezel - ultra thin */}
      <div className="absolute inset-[4px] bg-black rounded-[3rem]" />
      {/* Screen */}
      <div className="absolute inset-[6px] bg-white rounded-[2.8rem] overflow-hidden">
        {/* Status bar with Dynamic Island */}
        <div className="h-14 bg-white relative flex items-end justify-between px-8 pb-1">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-full flex items-center justify-center">
            {/* Camera lens */}
            <div className="absolute left-4 w-[10px] h-[10px] rounded-full bg-[#1c1c1e] border border-[#2c2c2e]">
              <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#3a3a3c] to-[#1c1c1e]" />
              <div className="absolute top-[1px] left-[1px] w-[2px] h-[2px] rounded-full bg-[#5a5a5e]" />
            </div>
            {/* Face ID sensor */}
            <div className="absolute right-6 w-[6px] h-[6px] rounded-full bg-[#2c2c2e]" />
          </div>
          <span className="text-xs font-semibold text-gray-900">9:41</span>
          <div className="flex items-center gap-1">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px] h-3">
              <div className="w-[3px] h-[4px] bg-gray-900 rounded-sm" />
              <div className="w-[3px] h-[6px] bg-gray-900 rounded-sm" />
              <div className="w-[3px] h-[8px] bg-gray-900 rounded-sm" />
              <div className="w-[3px] h-[10px] bg-gray-900 rounded-sm" />
            </div>
            {/* WiFi */}
            <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.4 14.6 13.8 14 12 14s-3.4.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.2 13.1 9.5 12 12 12s4.8 1.1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9z"/>
            </svg>
            {/* Battery */}
            <div className="w-6 h-3 border border-gray-900 rounded-[3px] relative">
              <div className="absolute inset-[2px] right-[3px] bg-gray-900 rounded-[1px]" />
              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[5px] bg-gray-900 rounded-r-sm" />
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="h-14 bg-[#DB0011] flex items-center px-4">
          <div className="text-white font-bold text-lg tracking-tight">HSBC</div>
        </div>
        {/* Content */}
        <div className="h-[calc(100%-7rem)] overflow-hidden bg-gray-50">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full" />
      </div>
      {/* Side buttons - Power */}
      <div className="absolute right-0 top-32 w-[3px] h-16 bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-r-sm" />
      {/* Side buttons - Volume */}
      <div className="absolute left-0 top-28 w-[3px] h-8 bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm" />
      <div className="absolute left-0 top-40 w-[3px] h-8 bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm" />
      {/* Action button */}
      <div className="absolute left-0 top-20 w-[3px] h-5 bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm" />
    </div>
  )
}

// Static phone preview component (kept for reference)
export function PhonePreview() {
  return (
    <div className="relative mx-auto w-[240px] h-[520px]">
      {/* iPhone frame */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3c] via-[#48484a] to-[#3a3a3c] rounded-[2.8rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" />
      <div className="absolute inset-[2px] bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-[2.7rem]" />
      <div className="absolute inset-[4px] bg-black rounded-[2.6rem]" />
      <div className="absolute inset-[6px] bg-white rounded-[2.4rem] overflow-hidden">
        {/* Status bar */}
        <div className="h-12 bg-white relative flex items-end justify-between px-6 pb-1">
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[80px] h-[26px] bg-black rounded-full" />
          <span className="text-[10px] font-semibold text-gray-900">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-[2px] h-2.5">
              <div className="w-[2px] h-[3px] bg-gray-900 rounded-sm" />
              <div className="w-[2px] h-[5px] bg-gray-900 rounded-sm" />
              <div className="w-[2px] h-[7px] bg-gray-900 rounded-sm" />
              <div className="w-[2px] h-[9px] bg-gray-900 rounded-sm" />
            </div>
            <div className="w-5 h-2.5 border border-gray-900 rounded-[2px] relative">
              <div className="absolute inset-[1px] right-[2px] bg-gray-900 rounded-[1px]" />
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="h-12 bg-[#DB0011] flex items-center px-4">
          <div className="text-white font-bold text-base tracking-tight">HSBC</div>
        </div>
        {/* Content - Account Overview screen */}
        <div className="p-3 bg-gray-50 h-[calc(100%-6rem)]">
          <div className="text-xs text-gray-500 mb-0.5">Current Account</div>
          <div className="text-2xl font-bold text-gray-900 mb-3">£18,500</div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-amber-700 font-medium mb-0.5 text-xs">
              <PiggyBank className="w-3 h-3" />
              Available Savings Opportunity
            </div>
            <div className="text-xl font-bold text-amber-800">£10,000</div>
            <div className="text-xs text-amber-600">Idle funds detected</div>
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/20 rounded-full" />
      </div>
    </div>
  )
}

interface PhoneDemoSectionProps {
  heroMode?: boolean
}

export function PhoneDemoSection({ heroMode = false }: PhoneDemoSectionProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-start the demo
  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true)
      }, 1000)
      return () => clearTimeout(startTimer)
    }
  }, [hasStarted])

  // Progress through conversation
  useEffect(() => {
    if (!hasStarted || isPaused) return
    if (currentIndex >= conversationScript.length) {
      setIsComplete(true)
      return
    }

    const message = conversationScript[currentIndex]
    const stepDelay = 4000 // 4 seconds between steps
    const typingDelay = 1500 // 1.5 seconds for typing indicator

    // Show typing indicator for bot messages
    if (message.type === "bot" && message.text) {
      setIsTyping(true)
      timerRef.current = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages(prev => [...prev, message])
        setCurrentIndex(prev => prev + 1)
      }, typingDelay)
    } else {
      timerRef.current = setTimeout(() => {
        setVisibleMessages(prev => [...prev, message])
        setCurrentIndex(prev => prev + 1)
      }, message.card ? 500 : stepDelay) // Cards show quickly, messages wait 4s
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentIndex, hasStarted, isPaused])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [visibleMessages, isTyping])

  const handleReplay = () => {
    setVisibleMessages([])
    setCurrentIndex(0)
    setIsTyping(false)
    setIsComplete(false)
    setIsPaused(false)
    setHasStarted(true)
  }

  const handlePauseResume = () => {
    if (isPaused) {
      // Resume - the useEffect will pick up from currentIndex
      setIsPaused(false)
    } else {
      // Pause - cancel any pending timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      setIsTyping(false)
      setIsPaused(true)
    }
  }

  // Hero mode - compact version without section wrapper
  if (heroMode) {
    return (
      <div className="flex flex-col items-center">
        <PhoneMockup>
          <div ref={scrollRef} className="h-full overflow-y-auto py-3">
            <AnimatePresence mode="popLayout">
              {visibleMessages.map((message, index) => (
                <ChatBubble 
                  key={message.id} 
                  message={message} 
                  isNew={index === visibleMessages.length - 1}
                />
              ))}
            </AnimatePresence>
            {isTyping && <TypingIndicator />}
          </div>
        </PhoneMockup>
        
        {/* Navigation controls - Play/Replay and Pause side by side */}
        <div className="mt-6 flex items-center gap-3">
          {/* Play/Replay button */}
          <Button
            onClick={isComplete ? handleReplay : handlePauseResume}
            variant="outline"
            size="sm"
            className="rounded-full px-4"
            disabled={!isPaused && !isComplete}
          >
            <Play className="w-4 h-4 mr-1" />
            {isComplete ? "Replay" : "Play"}
          </Button>
          
          {/* Pause button */}
          <Button
            onClick={handlePauseResume}
            variant="outline"
            size="sm"
            className="rounded-full px-4"
            disabled={isPaused || isComplete}
          >
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
        </div>
      </div>
    )
  }

  // Full section version (kept for reference, but no longer used on page)
  return (
    <section id="phone-demo" className="py-24 px-6 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight font-[family-name:var(--font-display)]">
            See It In Action
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <PhoneMockup>
            <div ref={scrollRef} className="h-full overflow-y-auto py-3">
              <AnimatePresence mode="popLayout">
                {visibleMessages.map((message, index) => (
                  <ChatBubble 
                    key={message.id} 
                    message={message} 
                    isNew={index === visibleMessages.length - 1}
                  />
                ))}
              </AnimatePresence>
              {isTyping && <TypingIndicator />}
            </div>
          </PhoneMockup>
          
          {/* Navigation controls - Play/Replay and Pause side by side */}
          <div className="mt-6 flex items-center gap-3">
            {/* Play/Replay button */}
            <Button
              onClick={isComplete ? handleReplay : handlePauseResume}
              variant="outline"
              size="sm"
              className="rounded-full px-4"
              disabled={!isPaused && !isComplete}
            >
              <Play className="w-4 h-4 mr-1" />
              {isComplete ? "Replay" : "Play"}
            </Button>
            
            {/* Pause button */}
            <Button
              onClick={handlePauseResume}
              variant="outline"
              size="sm"
              className="rounded-full px-4"
              disabled={isPaused || isComplete}
            >
              <Pause className="w-4 h-4 mr-1" />
              Pause
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
