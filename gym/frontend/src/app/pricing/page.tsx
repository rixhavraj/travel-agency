"use client";

import React, { useState } from "react";
import { Check, Star } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "BASIC",
      price: billingCycle === "monthly" ? 29 : 23,
      popular: false,
      features: [
        "Gym Access",
        "Basic Equipment",
        "1 Group Class",
        "Locker Room Access"
      ]
    },
    {
      name: "STANDARD",
      price: billingCycle === "monthly" ? 59 : 47,
      popular: true,
      features: [
        "All Basic Features",
        "All Group Classes",
        "Personal Training (2h/Month)",
        "Custom Nutrition Plan"
      ]
    },
    {
      name: "PREMIUM",
      price: billingCycle === "monthly" ? 89 : 71,
      popular: false,
      features: [
        "All Standard Features",
        "Unlimited Fitness Classes",
        "Personal Training (10h/Month)",
        "Priority VIP Support"
      ]
    }
  ];

  const handleSelectPlan = (planName: string) => {
    setPurchasedPlan(planName);
    canvasConfetti({
      particleCount: 120,
      spread: 80,
      colors: ["#ccff00", "#ffffff"]
    });
  };

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit font-mono text-[9px] text-neon-lime tracking-widest uppercase">
            // PRICE PLAN SELECTION TERMINAL
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            PRICING <span className="text-neon-lime italic">PLANS</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl leading-relaxed mt-2">
            Choose the membership tier that fits your training volume. Save 20% by subscribing to a yearly billing cycle.
          </p>

          {/* MONTHLY / YEARLY TOGGLE */}
          <div className="flex items-center gap-4 mt-8 bg-neutral-900 border border-white/10 rounded-full p-1 select-none font-mono text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full transition-colors cursor-none ${
                billingCycle === "monthly" ? "bg-neon-lime text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full transition-colors flex items-center gap-1.5 cursor-none ${
                billingCycle === "yearly" ? "bg-neon-lime text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>YEARLY</span>
              <span className={`text-[8px] font-black rounded-full px-1.5 py-0.5 ${
                billingCycle === "yearly" ? "bg-black text-neon-lime" : "bg-neon-lime text-black"
              }`}>
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* PLANS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 items-stretch">
          {plans.map((plan, idx) => (
            <GlassCard
              key={idx}
              glowColor="lime"
              className={`p-8 text-left flex flex-col justify-between rounded border transition-all duration-300 relative ${
                plan.popular 
                  ? "border-neon-lime bg-neutral-950 scale-105 shadow-[0_0_25px_rgba(204,255,0,0.15)] z-10" 
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-neon-lime text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> MOST POPULAR
                </span>
              )}

              <div className="flex flex-col gap-6">
                <h3 className="font-mono text-xl font-black text-white tracking-widest uppercase">{plan.name}</h3>
                
                <div className="flex items-baseline font-mono">
                  <span className="text-4xl md:text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-xs text-neutral-400 ml-1">/ month</span>
                </div>

                {/* Features checklist */}
                <div className="flex flex-col gap-4 font-mono text-xs text-neutral-300 border-t border-white/10 pt-6">
                  {plan.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded border border-neon-lime/20 flex items-center justify-center text-neon-lime bg-neon-lime/5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <CyberButton
                  variant={plan.popular ? "lime" : "silver"}
                  size="md"
                  className="w-full text-center"
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  CHOOSE PLAN
                </CyberButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CONFIRMATION OVERLAY */}
        {purchasedPlan && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="glass-panel-lime p-8 rounded-xl max-w-md w-full relative text-left font-mono">
              <span className="text-[9px] text-neon-lime tracking-widest block uppercase">// SUBSCRIPTION SECURED</span>
              <h3 className="text-xl font-black text-white mt-2 uppercase">WELCOME TO THE TEAM</h3>
              <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                You have successfully joined GymPro as a **{purchasedPlan}** member billed **{billingCycle}**. We are excited to support your fitness path!
              </p>
              <div className="mt-6">
                <CyberButton variant="lime" size="sm" onClick={() => setPurchasedPlan(null)} cornerSize={4}>
                  DISMISS LOG
                </CyberButton>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
