"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, FileText, Scan, Shield, PiggyBank, TrendingUp, Sparkles, ChevronUp, Send, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

// Chat messages for each screen
const chatMessages: Record<number, string> = {
  1: "Hi Jes! I can see you have some idle funds. Would you like me to help you make the most of them?",
  2: "Based on your goal of saving for a home, I'd suggest looking at options that balance security with growth.",
  3: "Your financial profile looks strong! You have a good savings pattern which opens up several options.",
  4: "The Smart Split Strategy combines security with growth potential. Does this approach make sense for your goals?",
  5: "This allocation protects £6,000 with guaranteed returns while giving £4,000 growth potential. Any questions?",
  6: "Great progress! All compliance checks are complete. We just need to verify your identity.",
  7: "Everything looks good! Take a moment to review the details before confirming.",
  8: "Congratulations on setting up your plan! I'm here if you have any questions going forward.",
}

// Stage 1 screens with new goal screen and enhanced screen 5
const stage1Screens = [
  {
    id: 0,
    title: "Financial Goals",
    content: ({ onGoalSelect, selectedGoal }: { onGoalSelect: (goal: string) => void; selectedGoal: string | null }) => (
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#DB0011]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#DB0011]" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">HSBC AI</div>
              <div className="text-sm text-gray-500">Just now</div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Hi Jes! Before we look at your finances, what matters most to you right now?
          </p>
        </div>
        <div className="space-y-3">
          {[
            { id: "save", label: "Save more money", emoji: "💰" },
            { id: "holiday", label: "Plan a holiday", emoji: "✈️" },
            { id: "returns", label: "Get better returns", emoji: "📈" },
            { id: "home", label: "Save for a home", emoji: "🏠" },
          ].map((goal) => (
            <button
              key={goal.id}
              onClick={() => onGoalSelect(goal.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                selectedGoal === goal.id
                  ? "border-[#DB0011] bg-[#DB0011]/5"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <span className="text-2xl">{goal.emoji}</span>
              <span className="font-medium text-gray-900">{goal.label}</span>
              {selectedGoal === goal.id && (
                <Check className="w-5 h-5 text-[#DB0011] ml-auto" />
              )}
            </button>
          ))}
        </div>
        {selectedGoal && (
          <button className="w-full mt-6 py-3 rounded-xl bg-[#DB0011] text-white font-semibold flex items-center justify-center gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    ),
  },
  {
    id: 1,
    title: "Account Overview",
    content: () => (
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">Current Account</div>
        <div className="text-3xl font-bold text-gray-900 mb-4">£18,500</div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-700 font-medium mb-1">
            <PiggyBank className="w-4 h-4" />
            Available Savings Opportunity
          </div>
          <div className="text-2xl font-bold text-amber-800">£10,000</div>
          <div className="text-sm text-amber-600">Idle funds detected</div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "AI Insight",
    content: () => (
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#DB0011]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#DB0011]" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">HSBC Insights</div>
              <div className="text-sm text-gray-500">Just now</div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            &quot;Jes, we&apos;ve noticed you have <span className="font-semibold text-[#DB0011]">£10,000</span> in unused savings. Would you like to grow this money?&quot;
          </p>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-[#DB0011] text-white font-medium text-sm">Yes, show me</button>
            <button className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm">Not now</button>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Your Profile",
    content: () => (
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">Your Financial Profile</div>
        <div className="space-y-3">
          {[
            { label: "Risk Appetite", value: "Low–Medium", color: "bg-blue-100 text-blue-700" },
            { label: "Spending Behaviour", value: "Travel, Retail", color: "bg-purple-100 text-purple-700" },
            { label: "Savings Pattern", value: "Strong Surplus", color: "bg-green-100 text-green-700" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600">{item.label}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Recommendations",
    content: () => (
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">Recommended Products</div>
        <div className="space-y-3">
          {[
            { name: "Fixed Saver", rate: "4.10% AER", icon: PiggyBank, recommended: false },
            { name: "Investment ISA", rate: "5–7% return", icon: TrendingUp, recommended: false },
            { name: "Smart Split Strategy", rate: "Optimised", icon: Sparkles, recommended: true },
          ].map((product) => (
            <div key={product.name} className={`p-4 rounded-xl border-2 transition-all ${product.recommended ? 'border-[#DB0011] bg-[#DB0011]/5' : 'border-gray-100 bg-white'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${product.recommended ? 'bg-[#DB0011]/10' : 'bg-gray-100'}`}>
                  <product.icon className={`w-5 h-5 ${product.recommended ? 'text-[#DB0011]' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.rate}</div>
                </div>
                {product.recommended && (
                  <span className="px-2 py-1 rounded-full bg-[#DB0011] text-white text-xs font-medium">Recommended</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Your Plan",
    content: ({ showInfoCard, setShowInfoCard, onDiscuss }: { showInfoCard: boolean; setShowInfoCard: (show: boolean) => void; onDiscuss: () => void }) => (
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">Suggested Allocation</div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-900">Fixed Saver</span>
              <span className="text-xl font-bold text-blue-700">£6,000</span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-blue-500 rounded-full" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-green-50 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-900">Investment ISA</span>
              <span className="text-xl font-bold text-green-700">£4,000</span>
            </div>
            <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-green-500 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Info card when "Find out more" is clicked */}
        <AnimatePresence>
          {showInfoCard && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 relative"
            >
              <button 
                onClick={() => setShowInfoCard(false)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100"
              >
                <X className="w-4 h-4 text-blue-600" />
              </button>
              <div className="flex items-start gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="font-medium text-blue-900">FSCS Protection</div>
              </div>
              <p className="text-sm text-blue-700 leading-relaxed">
                Your savings are protected up to £85,000 per institution under the Financial Services Compensation Scheme (FSCS). This government-backed protection applies to the first £85K of your savings.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Action buttons */}
        <div className="mt-6 space-y-3">
          <button 
            onClick={() => setShowInfoCard(true)}
            className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Info className="w-4 h-4" />
            Find out more
          </button>
          <button 
            onClick={onDiscuss}
            className="w-full py-3 rounded-xl bg-[#DB0011] text-white font-semibold flex items-center justify-center gap-2"
          >
            💬 I&apos;d like to discuss this
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Verification",
    content: () => (
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">Compliance Checks</div>
        <div className="space-y-2 mb-6">
          {["Eligibility", "Suitability", "KYC", "CDD", "Fraud Screening", "Affordability"].map((check) => (
            <div key={check} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700">{check}</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
          <Scan className="w-12 h-12 text-[#DB0011] mx-auto mb-2" />
          <div className="font-medium text-gray-900">Confirm your identity</div>
          <div className="text-sm text-gray-500">Face ID verification</div>
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="text-green-700 text-sm font-medium">Identity verified. All checks complete.</span>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Summary",
    content: () => (
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">Plan Summary</div>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fixed Saver</span>
              <span className="font-semibold">£6,000 @ 4.10% AER</span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Investment ISA</span>
              <span className="font-semibold">£4,000 @ 5–7% return</span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-500 mb-1">Access conditions</div>
            <div className="text-sm text-gray-700">Fixed term: 12 months • ISA: Flexible</div>
          </div>
        </div>
        <button className="w-full mt-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          Download terms and agreement
        </button>
        <button className="w-full mt-3 py-3 rounded-xl bg-[#DB0011] text-white font-semibold">Confirm Plan</button>
      </div>
    ),
  },
  {
    id: 8,
    title: "Success",
    content: () => (
      <div className="p-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">Your plan is now active</div>
        <div className="text-gray-500 mb-6">Congratulations, Jes!</div>
        <div className="space-y-3 text-left">
          <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
            <span className="text-gray-600">Total Invested</span>
            <span className="font-bold text-gray-900">£10,000</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl flex justify-between">
            <span className="text-gray-600">Blended Return</span>
            <span className="font-bold text-green-600">~4.9% avg</span>
          </div>
        </div>
      </div>
    ),
  },
]

// Chat Panel Component
function ChatPanel({ isOpen, onToggle, message, screenIndex }: { isOpen: boolean; onToggle: () => void; message: string; screenIndex: number }) {
  const [inputValue, setInputValue] = useState("")
  
  if (screenIndex === 0) return null // Don't show on goals screen
  
  return (
    <div className="absolute bottom-6 left-0 right-0 px-2">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <button 
              onClick={onToggle}
              className="w-full px-4 py-3 flex items-center justify-between bg-[#DB0011] text-white"
            >
              <span className="font-medium flex items-center gap-2">
                💬 Chat with HSBC AI
              </span>
              <ChevronUp className="w-4 h-4 rotate-180" />
            </button>
            <div className="p-4 max-h-40 overflow-y-auto">
              <div className="flex items-start gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#DB0011]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#DB0011]" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3">
                  <p className="text-sm text-gray-700">{message}</p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything…"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#DB0011]"
              />
              <button className="p-2 bg-[#DB0011] text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="w-full px-4 py-3 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-between"
          >
            <span className="font-medium text-gray-700 flex items-center gap-2">
              💬 Chat with HSBC AI
            </span>
            <ChevronUp className="w-4 h-4 text-gray-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function PhoneMockup({ children, showChatPanel, chatPanelOpen, onChatToggle, chatMessage, screenIndex }: { 
  children: React.ReactNode; 
  showChatPanel?: boolean;
  chatPanelOpen?: boolean;
  onChatToggle?: () => void;
  chatMessage?: string;
  screenIndex?: number;
}) {
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
        <div className="h-[calc(100%-7rem)] overflow-y-auto bg-gray-50 relative">
          {children}
          {showChatPanel && onChatToggle && (
            <ChatPanel 
              isOpen={chatPanelOpen || false} 
              onToggle={onChatToggle} 
              message={chatMessage || ""} 
              screenIndex={screenIndex || 0}
            />
          )}
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

// Static phone preview component for hero section
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

export function PhoneDemoSection() {
  const [stage1Index, setStage1Index] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [chatPanelOpen, setChatPanelOpen] = useState(false)
  const [showInfoCard, setShowInfoCard] = useState(false)

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal)
  }

  const handleDiscuss = () => {
    setChatPanelOpen(true)
  }

  const renderScreenContent = () => {
    const screen = stage1Screens[stage1Index]
    if (stage1Index === 0) {
      // Goals screen
      const GoalsContent = screen.content as ({ onGoalSelect, selectedGoal }: { onGoalSelect: (goal: string) => void; selectedGoal: string | null }) => JSX.Element
      return <GoalsContent onGoalSelect={handleGoalSelect} selectedGoal={selectedGoal} />
    } else if (stage1Index === 5) {
      // Your Plan screen with info card and discuss button
      const PlanContent = screen.content as ({ showInfoCard, setShowInfoCard, onDiscuss }: { showInfoCard: boolean; setShowInfoCard: (show: boolean) => void; onDiscuss: () => void }) => JSX.Element
      return <PlanContent showInfoCard={showInfoCard} setShowInfoCard={setShowInfoCard} onDiscuss={handleDiscuss} />
    } else {
      // Regular screens
      const RegularContent = screen.content as () => JSX.Element
      return <RegularContent />
    }
  }

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

        {/* Single centered phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <span className="text-sm font-semibold uppercase tracking-widest">Interactive Demo</span>
            </div>
            <h3 className="text-xl font-bold text-foreground tracking-tight font-[family-name:var(--font-display)]">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground mt-1">Experience the AI-powered journey</p>
          </div>

          <PhoneMockup 
            showChatPanel={true}
            chatPanelOpen={chatPanelOpen}
            onChatToggle={() => setChatPanelOpen(!chatPanelOpen)}
            chatMessage={chatMessages[stage1Index] || "How can I help you today?"}
            screenIndex={stage1Index}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={stage1Index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={stage1Index !== 0 ? "pb-20" : ""}
              >
                {renderScreenContent()}
              </motion.div>
            </AnimatePresence>
          </PhoneMockup>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setStage1Index((i) => Math.max(0, i - 1))}
              disabled={stage1Index === 0}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              {stage1Screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStage1Index(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === stage1Index ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setStage1Index((i) => Math.min(stage1Screens.length - 1, i + 1))}
              disabled={stage1Index === stage1Screens.length - 1}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {stage1Screens[stage1Index].title} ({stage1Index + 1}/{stage1Screens.length})
          </p>
        </motion.div>
      </div>
    </section>
  )
}
