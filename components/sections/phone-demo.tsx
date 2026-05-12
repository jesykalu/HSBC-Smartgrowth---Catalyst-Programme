"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, PiggyBank, TrendingUp, ChevronRight, ChevronLeft, Play, Pause, MessageCircle, ArrowLeft, Calendar, Coins, Lock, Shield, FileText, Users, Sparkles, CreditCard, Plane, BarChart3, ArrowUpDown, ShoppingBag, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

// Phase types
type Phase = "lockscreen" | "faceid" | "chat" | "productDetail_fixedSaver" | "productDetail_isa" | "done"

// Step definition
interface Step {
  id: number
  phase: Phase
  action: string
}

// All steps in the demo - updated with new Financial Snapshot steps
const demoSteps: Step[] = [
  { id: 1, phase: "lockscreen", action: "notification" },
  { id: 2, phase: "faceid", action: "authenticate" },
  { id: 3, phase: "chat", action: "greeting" },
  { id: 4, phase: "chat", action: "userReply1" },
  { id: 5, phase: "chat", action: "financialSnapshot" },      // NEW - Bot presents profile
  { id: 6, phase: "chat", action: "userAckSnapshot" },        // NEW - User acknowledgement
  { id: 7, phase: "chat", action: "question1" },
  { id: 8, phase: "chat", action: "question2" },
  { id: 9, phase: "chat", action: "question3" },
  { id: 10, phase: "chat", action: "profileSummary" },
  { id: 11, phase: "chat", action: "allocation" },
  { id: 12, phase: "chat", action: "compliance" },
  { id: 13, phase: "chat", action: "identityConfirmed" },
  { id: 14, phase: "chat", action: "planSummary" },
  { id: 15, phase: "chat", action: "userConfirm" },
  { id: 16, phase: "done", action: "success" },
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

// Donut Chart Component
function DonutChart() {
  const radius = 50
  const strokeWidth = 16
  const circumference = 2 * Math.PI * radius
  const bluePercent = 60
  const greenPercent = 40
  const blueOffset = 0
  const greenOffset = circumference * (bluePercent / 100)

  return (
    <div className="flex flex-col items-center my-3">
      <div className="relative w-[140px] h-[140px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          {/* Blue segment - Fixed Saver 60% */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * (bluePercent / 100)} ${circumference}`}
            strokeDashoffset={-blueOffset}
            strokeLinecap="round"
          />
          {/* Green segment - Investment ISA 40% */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#22C55E"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * (greenPercent / 100)} ${circumference}`}
            strokeDashoffset={-greenOffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-900">£10,000</span>
          <span className="text-xs text-gray-500">Total</span>
        </div>
      </div>
    </div>
  )
}

// Product cards for allocation
function ProductCards({ 
  onTapFixedSaver, 
  onTapISA,
  visitedProducts = new Set() 
}: { 
  onTapFixedSaver?: () => void
  onTapISA?: () => void
  visitedProducts?: Set<string>
}) {
  const fixedSaverVisited = visitedProducts.has("fixedSaver")
  const isaVisited = visitedProducts.has("isa")
  
  return (
    <div className="space-y-2 mt-2">
      <motion.div 
        className="bg-blue-50 border border-blue-200 rounded-xl p-3 cursor-pointer hover:bg-blue-100 transition-colors relative"
        whileTap={{ scale: 0.98 }}
        onClick={onTapFixedSaver}
      >
        {fixedSaverVisited && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">
            <Check className="w-3 h-3" />
            Viewed
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <PiggyBank className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-blue-900 text-sm">Fixed Saver</div>
            <div className="text-xs text-blue-700">£6,000 · 4.10% AER</div>
          </div>
        </div>
        <button className="w-full py-1.5 px-3 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
          Tap to explore →
        </button>
      </motion.div>
      <motion.div 
        className="bg-green-50 border border-green-200 rounded-xl p-3 cursor-pointer hover:bg-green-100 transition-colors relative"
        whileTap={{ scale: 0.98 }}
        onClick={onTapISA}
      >
        {isaVisited && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">
            <Check className="w-3 h-3" />
            Viewed
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-green-900 text-sm">Investment ISA</div>
            <div className="text-xs text-green-700">£4,000 · 5–7% return</div>
          </div>
        </div>
        <button className="w-full py-1.5 px-3 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
          Tap to explore →
        </button>
      </motion.div>
    </div>
  )
}

// Reply chips component - clicking only highlights, does NOT auto-advance
function ReplyChips({ 
  options, 
  selectedIndex,
  onSelect 
}: { 
  options: string[]
  selectedIndex: number | null
  onSelect?: (index: number) => void 
}) {
  return (
    <div className="flex flex-col gap-2 mt-2 max-w-[75%] ml-8">
      {/* Please select label */}
      <span className="text-[10px] text-gray-400 mb-0.5">please select</span>
      {options.map((option, index) => (
        <motion.button
          key={option}
          className={`w-full px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
            selectedIndex === index 
              ? "bg-[#DB0011] text-white" 
              : "bg-pink-100 text-gray-700 hover:bg-pink-200"
          }`}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect?.(index)}
        >
          {option}
        </motion.button>
      ))}
    </div>
  )
}

// Financial Snapshot Card - NEW component
function FinancialSnapshotCard() {
  const data = [
    { icon: PiggyBank, label: "Current savings products", value: "LISA · Easy Access Saver" },
    { icon: CreditCard, label: "Avg. monthly spend", value: "£1,840 / month" },
    { icon: Plane, label: "Large purchases (last 6 months)", value: "None detected" },
    { icon: BarChart3, label: "Savings rate", value: "~18% of monthly income" },
    { icon: ArrowUpDown, label: "Avg. monthly transfers to savings", value: "£320 / month" },
    { icon: ShoppingBag, label: "Top spending categories", value: "Groceries, Transport, Subscriptions" },
    { icon: Wallet, label: "Idle funds (uninvested)", value: "£10,000" },
  ]

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm p-4 mt-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="font-bold text-gray-900 text-sm">Your Financial Snapshot</span>
      </div>
      
      {/* Data rows */}
      <div className="space-y-0">
        {data.map((item, index) => (
          <div key={item.label}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <item.icon className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
              <span className="text-xs text-gray-900 font-medium text-right max-w-[45%]">{item.value}</span>
            </div>
            {index < data.length - 1 && <div className="h-px bg-gray-100" />}
          </div>
        ))}
      </div>
    </div>
  )
}

// Profile card with withdrawal needs
function ProfileCardNew() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 mt-2 space-y-2">
      {[
        { label: "Risk Appetite", value: "Low–Medium", color: "bg-blue-100 text-blue-700" },
        { label: "Spending Behaviour", value: "Travel, Retail", color: "bg-purple-100 text-purple-700" },
        { label: "Savings Pattern", value: "Strong Surplus", color: "bg-green-100 text-green-700" },
        { label: "Withdrawal needs", value: "Occasional", color: "bg-yellow-100 text-yellow-700" },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{item.label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.color}`}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

// Compliance card - all checks visible immediately
function ComplianceCardNew() {
  const checks = ["Eligibility", "Suitability", "KYC", "CDD", "Fraud Screening", "Affordability"]

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 mt-2 space-y-1.5">
      {checks.map((check) => (
        <div
          key={check}
          className="flex items-center gap-2 p-1.5 bg-green-50 rounded-lg"
        >
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-gray-700 text-xs">{check}</span>
        </div>
      ))}
    </div>
  )
}

// Summary card
function SummaryCardNew() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 mt-2 space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Fixed Saver</span>
        <span className="font-medium text-gray-900">£6,000 @ 4.10% AER</span>
      </div>
      <div className="text-[10px] text-gray-500 pl-0">12-month fixed term</div>
      <div className="flex justify-between items-center text-sm pt-1 border-t border-gray-100">
        <span className="text-gray-600">Investment ISA</span>
        <span className="font-medium text-gray-900">£4,000 @ 5–7%</span>
      </div>
      <div className="text-[10px] text-gray-500 pl-0">Flexible access</div>
      <div className="pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">Total</span>
          <span className="font-bold text-gray-900">£10,000</span>
        </div>
        <div className="text-xs text-gray-500 mt-0.5">Estimated blended return: ~4.9% avg</div>
      </div>
    </div>
  )
}

// Success card
function SuccessCard() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-3 text-center">
      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
        <Check className="w-6 h-6 text-white" />
      </div>
      <div className="font-bold text-green-800 text-sm">Plan Active</div>
      <div className="text-xs text-green-700 mt-1">£10,000 invested · ~4.9% avg return</div>
    </div>
  )
}

// Lock Screen Component - notification is static, visible immediately
function LockScreen({ showNotification }: { showNotification: boolean }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex flex-col">
      {/* Time display */}
      <div className="pt-16 text-center">
        <div className="text-white text-5xl font-light tracking-tight">9:41</div>
        <div className="text-white/70 text-sm mt-1">Monday, 12 May</div>
      </div>
      
      {/* Notification - static, no animation delay */}
      {showNotification && (
        <div className="mx-4 mt-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DB0011] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">HSBC</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-sm">HSBC</span>
                  <span className="text-xs text-gray-500">now</span>
                </div>
                <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">
                  Jes, you have £10,000 sitting idle. We&apos;ve found savings products that could make your money work harder.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Home indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
    </div>
  )
}

// Face ID Screen Component - shows authenticated state immediately, no tap required
function FaceIDScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white px-6">
      {/* Face ID icon - already authenticated */}
      <div className="w-20 h-20 relative mb-6">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* Face outline */}
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            rx="16"
            fill="none"
            stroke="#22C55E"
            strokeWidth="3"
          />
          {/* Corner scan lines */}
          <path
            d="M10 25 L10 16 Q10 10 16 10 L25 10"
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M55 10 L64 10 Q70 10 70 16 L70 25"
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M70 55 L70 64 Q70 70 64 70 L55 70"
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M25 70 L16 70 Q10 70 10 64 L10 55"
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Eyes */}
          <circle cx="30" cy="35" r="3" fill="#22C55E" />
          <circle cx="50" cy="35" r="3" fill="#22C55E" />
          {/* Nose */}
          <line x1="40" y1="40" x2="40" y2="48" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
          {/* Mouth */}
          <path
            d="M32 55 Q40 60 48 55"
            fill="none"
            stroke="#22C55E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Status text - already authenticated */}
      <div className="text-center">
        <div className="text-green-600 text-sm font-medium flex items-center gap-1 justify-center">
          Face ID recognised <Check className="w-4 h-4" />
        </div>
        <div className="text-gray-500 text-xs mt-1">Welcome back, Jes</div>
      </div>
    </div>
  )
}

// Fixed Saver Detail Screen Component
function FixedSaverDetailScreen({ onReturn }: { onReturn: () => void }) {
  const details = [
    { icon: Calendar, label: "Term", value: "12 months fixed" },
    { icon: Coins, label: "Min deposit", value: "£500" },
    { icon: Coins, label: "Max deposit", value: "£85,000" },
    { icon: Lock, label: "Withdrawals", value: "Not permitted during term" },
    { icon: Shield, label: "FSCS Protection", value: "Up to £85,000" },
    { icon: FileText, label: "Interest paid", value: "Annually" },
    { icon: Users, label: "Eligibility", value: "UK residents 18+" },
  ]

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Back button */}
      <button 
        onClick={onReturn}
        className="flex items-center gap-1 px-4 py-2 text-[#DB0011] text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to chat
      </button>
      
      {/* Product hero */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
          <PiggyBank className="w-6 h-6 text-white" />
        </div>
        <div className="text-white font-bold text-lg">Fixed Saver</div>
        <div className="text-white/90 text-2xl font-bold mt-1">4.10% AER</div>
      </div>
      
      {/* Details list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {details.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2 border-b border-gray-100">
            <item.icon className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600 w-24">{item.label}</span>
            <span className="text-xs text-gray-900 flex-1">{item.value}</span>
          </div>
        ))}
        
        {/* Terms section */}
        <div className="pt-3">
          <div className="text-xs font-medium text-gray-900 mb-1">Terms & Conditions</div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Your capital is at risk. The value of your investment can go down as well as up. 
            Early withdrawal may result in loss of interest…
            <span className="text-[#DB0011]"> read more</span>
          </p>
        </div>
        
        {/* Regulatory info */}
        <div className="pt-3 pb-16">
          <div className="text-xs font-medium text-gray-900 mb-1">Regulatory Information</div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            This product is regulated by the FCA. Your eligible deposits are protected up to £85,000 under the FSCS.
          </p>
        </div>
      </div>
      
      {/* Floating chat button */}
      <motion.button
        onClick={onReturn}
        className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-[#DB0011] text-white flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  )
}

// Investment ISA Detail Screen Component
function ISADetailScreen({ onReturn }: { onReturn: () => void }) {
  const details = [
    { icon: FileText, label: "Wrapper", value: "Stocks & Shares ISA" },
    { icon: Coins, label: "Annual allowance", value: "Up to £20,000 per tax year" },
    { icon: TrendingUp, label: "Investment type", value: "Diversified funds" },
    { icon: Lock, label: "Withdrawals", value: "Flexible — anytime" },
    { icon: Shield, label: "FSCS Protection", value: "Up to £85,000 on cash held" },
    { icon: FileText, label: "Returns", value: "Variable, not guaranteed" },
    { icon: Users, label: "Eligibility", value: "UK residents 18+, not held another ISA this tax year" },
  ]

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Back button */}
      <button 
        onClick={onReturn}
        className="flex items-center gap-1 px-4 py-2 text-[#DB0011] text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      
      {/* Product hero */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 px-4 py-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div className="text-white font-bold text-lg">Investment ISA</div>
        <div className="text-white/90 text-2xl font-bold mt-1">5–7% projected return</div>
      </div>
      
      {/* Details list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {details.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2 border-b border-gray-100">
            <item.icon className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600 w-24">{item.label}</span>
            <span className="text-xs text-gray-900 flex-1">{item.value}</span>
          </div>
        ))}
        
        {/* Terms section */}
        <div className="pt-3">
          <div className="text-xs font-medium text-gray-900 mb-1">Terms & Conditions</div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            The value of your investment can go down as well as up and you may get back less than you originally invested. 
            Past performance is not a reliable indicator of future results…
            <span className="text-[#DB0011]"> read more</span>
          </p>
        </div>
        
        {/* Regulatory info */}
        <div className="pt-3 pb-16">
          <div className="text-xs font-medium text-gray-900 mb-1">Regulatory Information</div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            This product is regulated by the FCA. Returns are not guaranteed and the value of your investment may go down as well as up.
          </p>
        </div>
      </div>
      
      {/* Floating chat button */}
      <motion.button
        onClick={onReturn}
        className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-[#DB0011] text-white flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  )
}

// Chat Message Component
interface ChatMessageProps {
  type: "bot" | "user"
  text?: string
  children?: React.ReactNode
  isNew?: boolean
}

function ChatMessage({ type, text, children, isNew = false }: ChatMessageProps) {
  const isBot = type === "bot"

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 px-2 py-1 ${isBot ? "" : "flex-row-reverse"}`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? "bg-[#DB0011]" : "bg-gray-400"
      }`}>
        <span className="text-white text-[9px] font-bold">{isBot ? "H" : "J"}</span>
      </div>

      <div className={`flex flex-col ${isBot ? "items-start max-w-[75%]" : "items-end max-w-[68%]"}`}>
        {text && (
          <div className={`rounded-2xl px-3 py-2 text-left ${
            isBot 
              ? "bg-gray-100 rounded-tl-none" 
              : "bg-[#DB0011] rounded-tr-none"
          }`}>
            <p className={`text-xs leading-relaxed ${isBot ? "text-gray-800" : "text-white"}`}>
              {renderText(text)}
            </p>
          </div>
        )}
        {children}
      </div>
    </motion.div>
  )
}

// Phone mockup shell component
function PhoneShell({ 
  phase, 
  children,
  isLockScreen = false,
  isLarge = false,
  isXLarge = false
}: { 
  phase: Phase
  children: React.ReactNode
  isLockScreen?: boolean
  isLarge?: boolean
  isXLarge?: boolean
}) {
  // Dimension classes based on scale (reduced by 20% total)
  const dimensions = isXLarge 
    ? "w-[324px] h-[697px]" 
    : isLarge 
      ? "w-[259px] h-[535px]" 
      : "w-[227px] h-[486px]"
  const outerRadius = isXLarge ? "rounded-[4rem]" : isLarge ? "rounded-[3.2rem]" : "rounded-[3.2rem]"
  const innerRadius1 = isXLarge ? "rounded-[3.9rem]" : isLarge ? "rounded-[3.1rem]" : "rounded-[3.1rem]"
  const innerRadius2 = isXLarge ? "rounded-[3.8rem]" : isLarge ? "rounded-[3rem]" : "rounded-[3rem]"
  const screenRadius = isXLarge ? "rounded-[3.6rem]" : isLarge ? "rounded-[2.8rem]" : "rounded-[2.8rem]"
  const statusBarHeight = isXLarge ? "h-20" : isLarge ? "h-14" : "h-14"
  const headerHeight = isXLarge ? "h-20" : isLarge ? "h-14" : "h-14"
  const dynamicIslandWidth = isXLarge ? "w-[140px] h-[44px]" : isLarge ? "w-[124px] h-[38px]" : "w-[100px] h-[32px]"
  const timeTextSize = isXLarge ? "text-base" : isLarge ? "text-sm" : "text-xs"
  const hsbcTextSize = isXLarge ? "text-2xl" : isLarge ? "text-xl" : "text-lg"
  const homeIndicatorWidth = isXLarge ? "w-40" : isLarge ? "w-36" : "w-32"
  
  return (
    <div className={`relative mx-auto ${dimensions}`}>
      {/* iPhone frame */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[#3a3a3c] via-[#48484a] to-[#3a3a3c] ${outerRadius} shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]`} />
      <div className={`absolute inset-[2px] bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] ${innerRadius1}`} />
      <div className={`absolute inset-[4px] bg-black ${innerRadius2}`} />
      
      {/* Screen content */}
      <div className={`absolute inset-[6px] bg-white ${screenRadius} overflow-hidden`}>
        {isLockScreen ? (
          // Lock screen - full screen takeover
          children
        ) : (
          <>
            {/* Status bar with Dynamic Island */}
            <div className={`${statusBarHeight} bg-white relative flex items-end justify-between ${isXLarge ? "px-10" : "px-8"} pb-1`}>
              <div className={`absolute ${isXLarge ? "top-4" : "top-3"} left-1/2 -translate-x-1/2 ${dynamicIslandWidth} bg-black rounded-full flex items-center justify-center`}>
                <div className={`absolute left-4 ${isXLarge ? "w-[14px] h-[14px]" : isLarge ? "w-[12px] h-[12px]" : "w-[10px] h-[10px]"} rounded-full bg-[#1c1c1e] border border-[#2c2c2e]`}>
                  <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#3a3a3c] to-[#1c1c1e]" />
                </div>
                <div className={`absolute right-6 ${isXLarge ? "w-[8px] h-[8px]" : isLarge ? "w-[7px] h-[7px]" : "w-[6px] h-[6px]"} rounded-full bg-[#2c2c2e]`} />
              </div>
              <span className={`${timeTextSize} font-semibold text-gray-900`}>9:41</span>
              <div className="flex items-center gap-1">
                <div className={`flex items-end gap-[2px] ${isXLarge ? "h-5" : isLarge ? "h-4" : "h-3"}`}>
                  <div className={`${isXLarge ? "w-[5px] h-[6px]" : isLarge ? "w-[4px] h-[5px]" : "w-[3px] h-[4px]"} bg-gray-900 rounded-sm`} />
                  <div className={`${isXLarge ? "w-[5px] h-[9px]" : isLarge ? "w-[4px] h-[7px]" : "w-[3px] h-[6px]"} bg-gray-900 rounded-sm`} />
                  <div className={`${isXLarge ? "w-[5px] h-[12px]" : isLarge ? "w-[4px] h-[10px]" : "w-[3px] h-[8px]"} bg-gray-900 rounded-sm`} />
                  <div className={`${isXLarge ? "w-[5px] h-[15px]" : isLarge ? "w-[4px] h-[12px]" : "w-[3px] h-[10px]"} bg-gray-900 rounded-sm`} />
                </div>
                <svg className={`${isXLarge ? "w-6 h-6" : isLarge ? "w-5 h-5" : "w-4 h-4"} text-gray-900`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4C9.4 16.4 10.6 16 12 16s2.6.4 3.5 1.1l1.4-1.4C15.4 14.6 13.8 14 12 14s-3.4.6-4.9 1.7zm-2.8-2.8l1.4 1.4C7.2 13.1 9.5 12 12 12s4.8 1.1 6.3 2.3l1.4-1.4C17.7 11.1 15 10 12 10s-5.7 1.1-7.7 2.9z"/>
                </svg>
                <div className={`${isXLarge ? "w-8 h-5" : isLarge ? "w-7 h-4" : "w-6 h-3"} border border-gray-900 rounded-[3px] relative`}>
                  <div className="absolute inset-[2px] right-[3px] bg-gray-900 rounded-[1px]" />
                  <div className={`absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] ${isXLarge ? "h-[7px]" : isLarge ? "h-[6px]" : "h-[5px]"} bg-gray-900 rounded-r-sm`} />
                </div>
              </div>
            </div>
            
            {/* HSBC Header - only show in chat/done phases */}
            {(phase === "chat" || phase === "done") && (
              <div className={`${headerHeight} bg-[#DB0011] flex items-center px-4`}>
                <div className={`text-white font-bold ${hsbcTextSize} tracking-tight`}>HSBC</div>
              </div>
            )}
            
            {/* Content area */}
            <div className={`overflow-hidden bg-gray-50 ${
              phase === "faceid" || phase === "productDetail_fixedSaver" || phase === "productDetail_isa"
                ? (isXLarge ? "h-[calc(100%-5rem)]" : isLarge ? "h-[calc(100%-4rem)]" : "h-[calc(100%-3.5rem)]")
                : (isXLarge ? "h-[calc(100%-10rem)]" : isLarge ? "h-[calc(100%-8rem)]" : "h-[calc(100%-7rem)]")
            }`}>
              {children}
            </div>
          </>
        )}
        
        {/* Home indicator */}
        {!isLockScreen && (
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 ${homeIndicatorWidth} h-1 bg-black/20 rounded-full`} />
        )}
      </div>
      
      {/* Side buttons */}
      <div className={`absolute right-0 ${isXLarge ? "top-48" : isLarge ? "top-40" : "top-32"} w-[3px] ${isXLarge ? "h-24" : isLarge ? "h-20" : "h-16"} bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-r-sm`} />
      <div className={`absolute left-0 ${isXLarge ? "top-44" : isLarge ? "top-36" : "top-28"} w-[3px] ${isXLarge ? "h-12" : isLarge ? "h-10" : "h-8"} bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm`} />
      <div className={`absolute left-0 ${isXLarge ? "top-64" : isLarge ? "top-52" : "top-40"} w-[3px] ${isXLarge ? "h-12" : isLarge ? "h-10" : "h-8"} bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm`} />
      <div className={`absolute left-0 ${isXLarge ? "top-28" : isLarge ? "top-24" : "top-20"} w-[3px] ${isXLarge ? "h-7" : isLarge ? "h-6" : "h-5"} bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-l-sm`} />
    </div>
  )
}

// Static phone preview component (kept for reference)
export function PhonePreview() {
  return (
    <div className="relative mx-auto w-[240px] h-[520px]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3c] via-[#48484a] to-[#3a3a3c] rounded-[2.8rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" />
      <div className="absolute inset-[2px] bg-gradient-to-b from-[#636366] via-[#8e8e93] to-[#636366] rounded-[2.7rem]" />
      <div className="absolute inset-[4px] bg-black rounded-[2.6rem]" />
      <div className="absolute inset-[6px] bg-white rounded-[2.4rem] overflow-hidden">
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
        <div className="h-12 bg-[#DB0011] flex items-center px-4">
          <div className="text-white font-bold text-base tracking-tight">HSBC</div>
        </div>
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
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/20 rounded-full" />
      </div>
    </div>
  )
}

interface PhoneDemoSectionProps {
  heroMode?: boolean
  scale?: "default" | "large" | "xlarge"
}

export function PhoneDemoSection({ heroMode = false, scale = "default" }: PhoneDemoSectionProps) {
  const isLarge = scale === "large" || scale === "xlarge"
  const isXLarge = scale === "xlarge"
  const [currentStep, setCurrentStep] = useState(0)
  const [chipSelections, setChipSelections] = useState<Record<number, number | null>>({})
  const [visitedProducts, setVisitedProducts] = useState<Set<string>>(new Set())
  const [currentProductView, setCurrentProductView] = useState<"fixedSaver" | "isa" | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const totalSteps = demoSteps.length
  const step = demoSteps[currentStep] || demoSteps[0]
  
  // Determine phase - check if we're viewing a product detail
  const getPhase = (): Phase => {
    if (currentProductView === "fixedSaver") return "productDetail_fixedSaver"
    if (currentProductView === "isa") return "productDetail_isa"
    return step?.phase || "lockscreen"
  }
  const phase = getPhase()
  
  // Scroll chat to bottom when messages change
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }
  
  // Build messages for a given step (no timers, immediate rendering)
  // Uses currentChipSelections to properly include user answers
  const buildMessagesForStep = (targetStep: number, currentChipSelections: Record<number, number | null> = {}) => {
    const newMessages: Array<{ id: number; type: "bot" | "user"; text?: string }> = []
    
    for (let i = 0; i <= targetStep; i++) {
      const s = demoSteps[i]
      if (!s || s.phase === "lockscreen" || s.phase === "faceid") continue
      
      switch (s.action) {
        case "greeting":
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Hi Jes! I noticed you have **£10,000** in idle funds in your current account. Based on your spending patterns and existing products, I think I can help put that money to work. Want to explore your options?"
          })
          break
          
        case "userReply1":
          newMessages.push({
            id: newMessages.length + 1,
            type: "user",
            text: "Yes, show me what's available."
          })
          break
          
        case "financialSnapshot":
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Before I make any recommendations, let me share what I already know about you — so we're starting from the right place."
          })
          // The Financial Snapshot card is rendered inline via special handling
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "You're clearly a disciplined saver, Jes — that £320 a month going into savings consistently is great to see. The LISA is a smart move too. Now let's put that £10,000 to work in a way that fits how you actually live."
          })
          break
          
        case "userAckSnapshot":
          newMessages.push({
            id: newMessages.length + 1,
            type: "user",
            text: "Thanks — let's see what you'd recommend"
          })
          break
          
        case "question1":
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Great! Just a couple of quick questions so I can tailor the right products for you. First — do you have any **travel plans or large expenses** coming up in the next 12 months?"
          })
          break
          
        case "question2":
          // Add selected chip answer from question1 if exists
          if (currentChipSelections[6] !== undefined && currentChipSelections[6] !== null) {
            const opts = ["Yes, within 6 months", "Maybe, 6–12 months", "No plans"]
            newMessages.push({ id: newMessages.length + 1, type: "user", text: opts[currentChipSelections[6]] })
          }
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Got it. And how often do you think you'd need to **access or withdraw** from these savings?"
          })
          break
          
        case "question3":
          if (currentChipSelections[7] !== undefined && currentChipSelections[7] !== null) {
            const opts = ["Regularly (monthly)", "Occasionally", "Rarely / lock it away"]
            newMessages.push({ id: newMessages.length + 1, type: "user", text: opts[currentChipSelections[7]] })
          }
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Last one — how would you describe your attitude to **investment risk**?"
          })
          break
          
        case "profileSummary":
          if (currentChipSelections[8] !== undefined && currentChipSelections[8] !== null) {
            const opts = ["Play it safe", "Balanced approach", "Happy to take risks"]
            newMessages.push({ id: newMessages.length + 1, type: "user", text: opts[currentChipSelections[8]] })
          }
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Perfect, thanks Jes. Here's what I've built for your profile:"
          })
          break
          
        case "allocation":
          if (currentChipSelections[9] !== undefined && currentChipSelections[9] !== null) {
            const opts = ["Yes, that's me", "Not quite"]
            newMessages.push({ id: newMessages.length + 1, type: "user", text: opts[currentChipSelections[9]] })
          }
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Based on your profile, here's how I'd suggest allocating your £10,000:"
          })
          break
          
        case "compliance":
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Running your compliance checks now..."
          })
          break
          
        case "identityConfirmed":
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Identity already verified via Face ID earlier. All checks passed."
          })
          break
          
        case "planSummary":
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Here's your final plan before we confirm:"
          })
          break
          
        case "userConfirm":
          newMessages.push({
            id: newMessages.length + 1,
            type: "user",
            text: "Looks great — confirm my plan."
          })
          break
          
        case "success":
          newMessages.push({
            id: newMessages.length + 1,
            type: "bot",
            text: "Done, Jes! Your savings plan is now active. Your £10,000 is officially working for you. I'll check in with you in 30 days. Great choice!"
          })
          break
      }
    }
    
    return { messages: newMessages }
  }
  
  // Handle chip selection - ONLY highlights, does NOT advance
  const handleChipSelect = (stepId: number, index: number) => {
    setChipSelections(prev => ({ ...prev, [stepId]: index }))
  }
  
  // Navigate to Fixed Saver product detail
  const handleTapFixedSaver = () => {
    setCurrentProductView("fixedSaver")
  }
  
  // Navigate to ISA product detail
  const handleTapISA = () => {
    setCurrentProductView("isa")
  }
  
  // Return from product detail
  const handleReturnFromProduct = () => {
    if (currentProductView) {
      setVisitedProducts(prev => {
        const updated = new Set(prev)
        updated.add(currentProductView)
        return updated
      })
    }
    setCurrentProductView(null)
  }
  
  // Handle Next button - just advances step, messages computed directly
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      setTimeout(scrollToBottom, 100)
    }
  }
  
  // Handle Prev button - goes back and clears future chip selections
  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      setCurrentProductView(null)
      
      // Clear chip selections for steps after the target
      const newSelections = { ...chipSelections }
      Object.keys(newSelections).forEach(key => {
        if (parseInt(key) > prevStep) {
          delete newSelections[parseInt(key)]
        }
      })
      setChipSelections(newSelections)
      
      setTimeout(scrollToBottom, 100)
    }
  }
  
  // Compute messages directly based on currentStep and chipSelections
  const result = buildMessagesForStep(currentStep, chipSelections)
  const computedMessages = result.messages
  
  // Handle replay
  const handleReplay = () => {
    setCurrentStep(0)
    setChipSelections({})
    setVisitedProducts(new Set())
    setCurrentProductView(null)
    setIsAutoPlaying(false)
  }
  
  // Autoplay effect - auto-advance every 2.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= totalSteps - 1) {
          setIsAutoPlaying(false)
          return prev
        }
        // Auto-select chip options for question steps
        const nextStep = prev + 1
        const nextStepAction = demoSteps[nextStep]?.action
        if (nextStepAction === "question1" || nextStepAction === "question2" || nextStepAction === "question3") {
          setChipSelections(prevSelections => ({
            ...prevSelections,
            [nextStep]: 0 // Auto-select first option
          }))
        }
        setTimeout(scrollToBottom, 100)
        return nextStep
      })
    }, 2500)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSteps])
  
  // Toggle autoplay
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false)
    } else {
      // If at the end, restart first
      if (currentStep >= totalSteps - 1) {
        setCurrentStep(0)
        setChipSelections({})
        setVisitedProducts(new Set())
        setCurrentProductView(null)
      }
      setIsAutoPlaying(true)
    }
  }
  
  const isComplete = currentStep >= totalSteps - 1
  
  // Determine disabled states for nav buttons
  const isPrevDisabled = currentStep === 0
  const isNextDisabled = currentStep >= totalSteps - 1
  
  // Render phone content based on phase
  const renderContent = () => {
    switch (phase) {
      case "lockscreen":
        return (
          <PhoneShell phase={phase} isLockScreen isLarge={isLarge} isXLarge={isXLarge}>
            <LockScreen showNotification={true} />
          </PhoneShell>
        )
        
      case "faceid":
        return (
          <PhoneShell phase={phase} isLarge={isLarge} isXLarge={isXLarge}>
            <FaceIDScreen />
          </PhoneShell>
        )
        
      case "productDetail_fixedSaver":
        return (
          <PhoneShell phase={phase} isLarge={isLarge} isXLarge={isXLarge}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              <FixedSaverDetailScreen onReturn={handleReturnFromProduct} />
            </motion.div>
          </PhoneShell>
        )
        
      case "productDetail_isa":
        return (
          <PhoneShell phase={phase} isLarge={isLarge} isXLarge={isXLarge}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              <ISADetailScreen onReturn={handleReturnFromProduct} />
            </motion.div>
          </PhoneShell>
        )
        
      case "chat":
      case "done":
        return (
          <PhoneShell phase={phase} isLarge={isLarge} isXLarge={isXLarge}>
            <div ref={scrollRef} className="h-full w-full overflow-y-auto py-2 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full" style={{ scrollbarGutter: 'stable' }}>
              <>
                {computedMessages.map((msg, index) => {
                  const isLast = index === computedMessages.length - 1
                  
                  // Financial Snapshot card - show after the intro message
                  if (msg.type === "bot" && msg.text?.includes("starting from the right place")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <FinancialSnapshotCard />
                      </ChatMessage>
                    )
                  }
                  
                  // Travel plans question with chips (step index 6)
                  if (msg.type === "bot" && msg.text?.includes("travel plans")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <ReplyChips 
                          options={["Yes, within 6 months", "Maybe, 6–12 months", "No plans"]}
                          selectedIndex={chipSelections[6] ?? null}
                          onSelect={(idx) => handleChipSelect(6, idx)}
                        />
                      </ChatMessage>
                    )
                  }
                  
                  // Access/withdraw question with chips (step index 7)
                  if (msg.type === "bot" && msg.text?.includes("access or withdraw")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <ReplyChips 
                          options={["Regularly (monthly)", "Occasionally", "Rarely / lock it away"]}
                          selectedIndex={chipSelections[7] ?? null}
                          onSelect={(idx) => handleChipSelect(7, idx)}
                        />
                      </ChatMessage>
                    )
                  }
                  
                  // Investment risk question with chips (step index 8)
                  if (msg.type === "bot" && msg.text?.includes("investment risk")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <ReplyChips 
                          options={["Play it safe", "Balanced approach", "Happy to take risks"]}
                          selectedIndex={chipSelections[8] ?? null}
                          onSelect={(idx) => handleChipSelect(8, idx)}
                        />
                      </ChatMessage>
                    )
                  }
                  
                  // Profile summary with card and confirmation chips (step index 9)
                  if (msg.type === "bot" && msg.text?.includes("built for your profile")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <ProfileCardNew />
                        <div className="text-sm text-gray-800 mt-2 bg-gray-100 rounded-2xl rounded-bl-none px-3 py-2 inline-block">
                          Does this look right to you?
                        </div>
                        <ReplyChips 
                          options={["Yes, that's me", "Not quite"]}
                          selectedIndex={chipSelections[9] ?? null}
                          onSelect={(idx) => handleChipSelect(9, idx)}
                        />
                      </ChatMessage>
                    )
                  }
                  
                  // Allocation with donut chart and product cards (step 11)
                  if (msg.type === "bot" && msg.text?.includes("suggest allocating")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <DonutChart />
                        <ProductCards 
                          onTapFixedSaver={handleTapFixedSaver}
                          onTapISA={handleTapISA}
                          visitedProducts={visitedProducts}
                        />
                      </ChatMessage>
                    )
                  }
                  
                  // Compliance checks (step 12)
                  if (msg.type === "bot" && msg.text?.includes("compliance checks")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <ComplianceCardNew />
                      </ChatMessage>
                    )
                  }
                  
                  // Plan summary (step 14)
                  if (msg.type === "bot" && msg.text?.includes("final plan")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <SummaryCardNew />
                      </ChatMessage>
                    )
                  }
                  
                  // Success card (step 16)
                  if (msg.type === "bot" && msg.text?.includes("Done, Jes")) {
                    return (
                      <ChatMessage key={msg.id} type="bot" text={msg.text} isNew={isLast}>
                        <SuccessCard />
                      </ChatMessage>
                    )
                  }
                  
                  return (
                    <ChatMessage key={msg.id} type={msg.type} text={msg.text} isNew={isLast} />
                  )
                })}
              </>
            </div>
          </PhoneShell>
        )
        
      default:
        return <PhoneShell phase="chat" isLarge={isLarge} isXLarge={isXLarge}><div /></PhoneShell>
    }
  }

  if (heroMode) {
    return (
      <div className="flex items-center gap-3 overflow-visible">
        {renderContent()}
        
        {/* Controls panel - right side of phone */}
        <div className="flex flex-col items-center gap-2 relative z-[100]">
          {/* Step counter */}
          <span className="text-xs text-white font-medium bg-black/50 px-2 py-0.5 rounded-full whitespace-nowrap">
            {currentStep + 1}/{totalSteps}
          </span>
          
          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={`rounded-full p-1.5 border bg-white shadow-sm transition-all ${
              isPrevDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"
            }`}
            title="Previous"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          
          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`rounded-full p-1.5 bg-[#DB0011] text-white shadow-sm transition-all ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#b8000e] cursor-pointer"
            }`}
            title="Next"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          
          {/* Autoplay toggle button */}
          <button
            type="button"
            onClick={toggleAutoPlay}
            className={`rounded-full p-1.5 border shadow-sm transition-all ${
              isAutoPlaying 
                ? "bg-[#DB0011] text-white border-[#DB0011] hover:bg-[#b8000e]" 
                : "bg-white hover:bg-gray-50"
            }`}
            title={isAutoPlaying ? "Pause" : "Autoplay"}
          >
            {isAutoPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
          
          {/* Replay button - only on final step */}
          {isComplete && !isAutoPlaying && (
            <button
              type="button"
              onClick={handleReplay}
              className="rounded-full p-1.5 border bg-white shadow-sm hover:bg-gray-50"
              title="Replay"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // Full section version
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
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
          {renderContent()}
          
          {/* Navigation bar - always visible */}
          <div className="mt-4 flex items-center justify-between gap-4 w-[280px]">
            {/* Prev button */}
            <Button
              type="button"
              onClick={handlePrev}
              variant="outline"
              size="sm"
              className={`rounded-full px-3 ${isPrevDisabled ? "opacity-50 pointer-events-none" : ""}`}
              disabled={isPrevDisabled}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </Button>
            
            {/* Step counter */}
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {totalSteps}
            </span>
            
            {/* Next button */}
            <Button
              type="button"
              onClick={handleNext}
              size="sm"
              className={`rounded-full px-3 bg-[#DB0011] text-white hover:bg-[#b8000e] ${isNextDisabled ? "opacity-50 pointer-events-none" : ""}`}
              disabled={isNextDisabled}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          {/* Autoplay toggle button */}
          <div className="mt-3">
            <Button
              type="button"
              onClick={toggleAutoPlay}
              variant={isAutoPlaying ? "default" : "outline"}
              size="sm"
              className={`rounded-full px-4 ${isAutoPlaying ? "bg-[#DB0011] text-white hover:bg-[#b8000e]" : ""}`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1" />
                  Autoplay
                </>
              )}
            </Button>
          </div>
          
          {/* Replay button - only on final step */}
          {isComplete && !isAutoPlaying && (
            <div className="mt-3">
              <Button
                type="button"
                onClick={handleReplay}
                variant="outline"
                size="sm"
                className="rounded-full px-4"
              >
                <Play className="w-4 h-4 mr-1" />
                Replay
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
