"use client";

import React, { useState } from "react";
import { Dumbbell, ShieldAlert, Zap, HeartPulse, BrainCircuit, Activity, Compass, Flame } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

export default function Programs() {
  const [filter, setFilter] = useState("ALL");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const categories = ["ALL", "STRENGTH", "FAT LOSS", "BODY BUILDING", "CROSSFIT", "YOGA", "HIIT"];

  const programsList = [
    {
      id: "strength",
      title: "STRENGTH TRAINING",
      category: "STRENGTH",
      desc: "Hypertrophic conditioning utilizing mechanical resistance loads and targeted concentric compound lifts.",
      load: "HIGH LOAD",
      frequency: "4 DAYS / WEEK",
      duration: "60 MINS",
      icon: Dumbbell,
      glow: "lime"
    },
    {
      id: "fatloss",
      title: "FAT BURNING",
      category: "FAT LOSS",
      desc: "High-intensity metabolic aerobic conditioning designed to optimize calorie consumption and boost energy.",
      load: "MODERATE LOAD",
      frequency: "5 DAYS / WEEK",
      duration: "45 MINS",
      icon: Flame,
      glow: "lime"
    },
    {
      id: "bodybuilding",
      title: "BODY BUILDING",
      category: "BODY BUILDING",
      desc: "Isolated muscle stimulation and traditional high-volume hyper-trophy structures to build your ultimate physique.",
      load: "HIGH LOAD",
      frequency: "5 DAYS / WEEK",
      duration: "75 MINS",
      icon: Zap,
      glow: "lime"
    },
    {
      id: "crossfit",
      title: "CROSSFIT CLASS",
      category: "CROSSFIT",
      desc: "Olympic weightlifting combined with explosive cardiovascular routines under certified team support.",
      load: "MAXIMUM LOAD",
      frequency: "4 DAYS / WEEK",
      duration: "60 MINS",
      icon: ShieldAlert,
      glow: "lime"
    },
    {
      id: "yoga",
      title: "YOGA FLOW",
      category: "YOGA",
      desc: "Calm mindfulness, muscle re-alignment, structural mobility, and high-quality recovery breathing guidelines.",
      load: "LIGHT LOAD",
      frequency: "3 DAYS / WEEK",
      duration: "50 MINS",
      icon: HeartPulse,
      glow: "lime"
    },
    {
      id: "hiit",
      title: "HIIT SPEED CIRCUITS",
      category: "HIIT",
      desc: "Fast athletic drills, functional kettlebells, and dynamic rowing circuits designed for high-performance seekers.",
      load: "MAXIMUM LOAD",
      frequency: "4 DAYS / WEEK",
      duration: "45 MINS",
      icon: Activity,
      glow: "lime"
    }
  ];

  const handleInquirePlan = (planName: string) => {
    setSelectedPlan(planName);
    canvasConfetti({
      particleCount: 50,
      spread: 50,
      colors: ["#ccff00", "#ffffff"]
    });
  };

  const filteredPrograms = filter === "ALL" 
    ? programsList 
    : programsList.filter(p => p.category === filter);

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse" />
            <span className="font-mono text-[9px] text-neon-lime tracking-widest uppercase">
              TRAINING PROGRAMS DIRECTORY
            </span>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            OUR <span className="text-neon-lime italic">PROGRAMS</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed mt-2">
            Configure your workout path. Select from traditional biomechanical hypertrophy tracks to high-intensity cardiovascular conditioning arrays designed to hit your goals.
          </p>
        </div>

        {/* INTERACTIVE FILTERS GRID */}
        <div className="flex flex-wrap items-center gap-4 mb-12 font-mono text-xs select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 border rounded transition-all cursor-none ${
                filter === cat
                  ? "bg-neon-lime text-black border-neon-lime font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                  : "bg-transparent border-white/5 text-muted-text hover:border-white/10 hover:text-white"
              }`}
            >
              // {cat}
            </button>
          ))}
        </div>

        {/* PROGRAM CARDS CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <GlassCard 
              key={prog.id} 
              glowColor={prog.glow as any} 
              className="p-6 text-left flex flex-col justify-between min-h-[360px]"
            >
              {/* Card structural details */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] bg-white/5 border border-white/10 rounded px-2 py-0.5 text-muted-text">
                    MODULE_{prog.id.toUpperCase()}
                  </span>
                  <span className="font-mono text-[8px] text-neon-lime uppercase tracking-widest">
                    // {prog.category}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded bg-neutral-900 border border-white/10 text-white">
                    <prog.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-mono text-lg font-black text-white uppercase tracking-wide leading-tight">
                    {prog.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {prog.desc}
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="border-t border-b border-white/5 py-3 grid grid-cols-3 gap-2 font-mono text-[9px] text-neutral-400 text-center">
                  <div>
                    <span className="text-[7px] text-neutral-500 block uppercase">LOAD</span>
                    <span className="text-white font-bold block mt-0.5">{prog.load}</span>
                  </div>
                  <div className="border-l border-r border-white/5">
                    <span className="text-[7px] text-neutral-500 block uppercase">FREQUENCY</span>
                    <span className="text-white font-bold block mt-0.5">{prog.frequency}</span>
                  </div>
                  <div>
                    <span className="text-[7px] text-neutral-500 block uppercase">DURATION</span>
                    <span className="text-white font-bold block mt-0.5">{prog.duration}</span>
                  </div>
                </div>

                {/* Inquiry control button */}
                <CyberButton
                  variant="lime"
                  size="sm"
                  className="w-full text-center"
                  onClick={() => handleInquirePlan(prog.title)}
                  cornerSize={6}
                >
                  CALIBRATE ROUTINE
                </CyberButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* DYNAMIC CONFIRMATION MODAL OVERLAY */}
        {selectedPlan && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="glass-panel-lime p-8 rounded-xl max-w-md w-full relative text-left font-mono">
              <span className="text-[9px] text-neon-lime tracking-widest block uppercase">// SYSTEM CONFIGURATION</span>
              <h3 className="text-xl font-black text-white mt-2 uppercase">PLAN ASSIGNED</h3>
              <p className="text-xs text-muted-text mt-4 leading-relaxed">
                You have requested calibration details for **{selectedPlan}**. The server has successfully cached this choice to your digital athlete profile.
              </p>
              <div className="mt-6 flex gap-4">
                <CyberButton variant="lime" size="sm" onClick={() => setSelectedPlan(null)} cornerSize={4}>
                  DISMISS LOG
                </CyberButton>
                <CyberButton variant="silver" size="sm" onClick={() => setSelectedPlan(null)} cornerSize={4}>
                  SYNC PROFILE
                </CyberButton>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
