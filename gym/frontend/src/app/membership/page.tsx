"use client";

import React, { useState } from "react";
import { Compass, CheckCircle2, XCircle, Info, Landmark, HelpCircle, Activity, Sparkles } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

export default function Membership() {
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "ANNUAL">("MONTHLY");
  const [checkoutTier, setCheckoutTier] = useState<string | null>(null);

  const tiers = [
    {
      name: "PREMIUM GRID",
      monthlyPrice: 199,
      annualPrice: 159,
      tag: "CORE OPTIMIZATION",
      desc: "Perfect for dedicated strength seekers looking to synchronize their training telemetry to the Nexus database.",
      features: [
        { label: "24/7 Facility Grid Access", active: true },
        { label: "Biomechanical Sensor Profiling", active: true },
        { label: "Basic Telemetry Data App Sync", active: true },
        { label: "AI Core Nutritional Suggestions", active: true },
        { label: "Holographic Recovery Bays Access", active: false },
        { label: "Custom Bio-Marker Lab Analysis", active: false },
      ],
      glow: "silver",
      action: "SECURE CORE NODE"
    },
    {
      name: "ELITE SYNAPSE",
      monthlyPrice: 349,
      annualPrice: 289,
      tag: "HIGH ENERGY INDEX // RECOMMEND",
      desc: "Our most popular tier. Incorporates direct machine feedback loops, thermal tracking, and recovery modules.",
      features: [
        { label: "24/7 Facility Grid Access", active: true },
        { label: "Biomechanical Sensor Profiling", active: true },
        { label: "Full Telemetry Data App Sync", active: true },
        { label: "Continuous AI Coach Analysis", active: true },
        { label: "Holographic Recovery Bays Access", active: true },
        { label: "Custom Bio-Marker Lab Analysis", active: false },
      ],
      glow: "lime",
      action: "SECURE ELITE NODE"
    },
    {
      name: "BLACK CHROMIUM",
      monthlyPrice: 799,
      annualPrice: 659,
      tag: "SUPREME BIOMECHANIC SHIELD",
      desc: "Designed for high-net-worth clients, top athletes, and executives seeking complete cellular dominance.",
      features: [
        { label: "Priority VIP Chamber Slots", active: true },
        { label: "Complete Biomechanical Profiling", active: true },
        { label: "Full Telemetry Data App Sync", active: true },
        { label: "Continuous AI Coach Analysis", active: true },
        { label: "Holographic Recovery Bays Access", active: true },
        { label: "Quarterly Bio-Marker Lab Analysis", active: true },
      ],
      glow: "purple",
      action: "SECURE BLACK CHROMIUM"
    }
  ];

  const handleCheckout = (tierName: string) => {
    setCheckoutTier(tierName);
    canvasConfetti({
      particleCount: 120,
      spread: 90,
      colors: ["#ccff00", "#a855f7", "#ffffff"]
    });
  };

  return (
    <div className="relative overflow-hidden w-full py-12">
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-neon-lime/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-purple/20 rounded-full bg-black/60">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
            <span className="font-mono text-[9px] text-neon-purple tracking-widest uppercase">
              MEMBERSHIP TIER PROTOCOLS // SECURE UPGRADE
            </span>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            VIP ACCESS <span className="text-neon-lime cyber-glow-text">GRID LEVELS</span>
          </h1>
          <p className="text-sm text-muted-text max-w-xl leading-relaxed mt-2">
            Secure your physical upgrade license. Choose a system layout below. Capacity is strictly limited to 500 members per facility node.
          </p>

          {/* MONTHLY/YEARLY DYNAMIC TOGGLE */}
          <div className="mt-8 p-1.5 border border-white/10 bg-black/40 backdrop-blur-md rounded flex items-center gap-2 font-mono text-xs select-none">
            <button
              onClick={() => setBillingCycle("MONTHLY")}
              className={`px-4 py-2 rounded cursor-none transition-all ${
                billingCycle === "MONTHLY"
                  ? "bg-neon-lime text-black font-bold"
                  : "text-muted-text hover:text-white"
              }`}
            >
              MONTHLY TARIFF
            </button>
            <button
              onClick={() => setBillingCycle("ANNUAL")}
              className={`px-4 py-2 rounded cursor-none transition-all flex items-center gap-1.5 ${
                billingCycle === "ANNUAL"
                  ? "bg-neon-purple text-white font-bold"
                  : "text-muted-text hover:text-white"
              }`}
            >
              ANNUAL SAVER <span className="text-[8px] bg-neon-lime text-black font-black px-1 py-0.5 rounded">-20%</span>
            </button>
          </div>
        </div>

        {/* PRICING GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-24">
          {tiers.map((tier) => {
            const price = billingCycle === "MONTHLY" ? tier.monthlyPrice : tier.annualPrice;
            const cycleText = billingCycle === "MONTHLY" ? "/ MO" : "/ MO Billed Annually";
            
            return (
              <GlassCard
                key={tier.name}
                glowColor={tier.glow as any}
                className="p-8 text-left flex flex-col justify-between min-h-[580px] relative overflow-hidden"
              >
                {/* Tech tag bar */}
                <div className="absolute top-2 right-2 font-mono text-[7px] text-white/20 uppercase">
                  NODE // {tier.glow.toUpperCase()}_SECTOR
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 font-mono">
                    <span className="text-[10px] text-neon-lime tracking-widest block uppercase font-bold">
                      {tier.tag}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-wide">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-text leading-relaxed">
                    {tier.desc}
                  </p>

                  <div className="font-mono flex items-baseline gap-1 py-4 border-t border-b border-white/5">
                    <span className="text-5xl font-black text-white">${price}</span>
                    <span className="text-[10px] text-muted-text uppercase">{cycleText}</span>
                  </div>

                  {/* Benefit Items Checklist */}
                  <div className="flex flex-col gap-3 font-mono text-xs">
                    {tier.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        {feat.active ? (
                          <CheckCircle2 className="w-4 h-4 text-neon-lime flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white/20 flex-shrink-0" />
                        )}
                        <span className={feat.active ? "text-white/90" : "text-white/30"}>
                          {feat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <CyberButton
                    variant={tier.glow === "purple" ? "purple" : tier.glow === "lime" ? "lime" : "silver"}
                    size="md"
                    className="w-full text-center"
                    onClick={() => handleCheckout(tier.name)}
                  >
                    {tier.action}
                  </CyberButton>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* SECURE SUB-MODAL RECEIPT DRAWER */}
        {checkoutTier && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="glass-panel-purple p-8 rounded-xl max-w-md w-full relative text-left font-mono">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] text-neon-purple tracking-widest uppercase">// SECURE CHECKOUT</span>
                <span className="text-[8px] bg-neon-lime text-black font-black px-1.5 py-0.5 rounded">ONLINE</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase">ORDER CALIBRATION</h3>
              <p className="text-xs text-muted-text mt-4 leading-relaxed">
                You have queued **{checkoutTier}** under the **{billingCycle}** subscription tariff. Your cryptographic connection index has been logged.
              </p>
              
              <div className="mt-6 border-t border-b border-white/5 py-4 flex flex-col gap-2 font-mono text-xs text-muted-text">
                <div className="flex justify-between">
                  <span>FACILITY GRID BASE:</span>
                  <span className="text-white">SYNCHRONIZED</span>
                </div>
                <div className="flex justify-between">
                  <span>TELEMETRY HOSTING:</span>
                  <span className="text-white">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-white/10 pt-2 text-white font-bold">
                  <span>EST. TOTAL DEPOSIT:</span>
                  <span className="text-neon-lime">SECURE INITIALIZE</span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <CyberButton variant="lime" size="sm" onClick={() => setCheckoutTier(null)} cornerSize={4}>
                  DISMISS TRANSACTION
                </CyberButton>
                <CyberButton variant="purple" size="sm" onClick={() => setCheckoutTier(null)} cornerSize={4}>
                  INITIALIZE BIOMETRIC SYNC
                </CyberButton>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
