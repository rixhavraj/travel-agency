"use client";

import React, { useState } from "react";
import { Compass, Cpu, Flame, Heart, Calendar, Zap, MessageSquare, Apple, Compass as NavIcon } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";

export default function Mockups() {
  const [activeScreen, setActiveScreen] = useState<"BIOMETRIC" | "PLANNER" | "AI_COACH" | "NUTRITION">("BIOMETRIC");

  // Render screens based on mock simulator options
  const renderScreen = () => {
    switch (activeScreen) {
      case "PLANNER":
        return (
          <div className="flex flex-col justify-between h-full py-4 text-left font-mono">
            <div className="flex flex-col gap-4">
              <span className="text-[8px] text-neon-lime uppercase tracking-wider">// COMPOSITIONS SCHEDULE</span>
              <div className="p-3 border border-white/10 bg-white/5 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="text-white block font-bold">BIOMECHANICAL DEADLIFT</span>
                  <span className="text-[8px] text-muted-text mt-0.5 block">5 SETS X 5 REPS // 315 LBS</span>
                </div>
                <span className="text-[8px] text-neon-lime">ACTIVE</span>
              </div>
              <div className="p-3 border border-white/5 bg-black/40 rounded-lg flex items-center justify-between text-xs opacity-60">
                <div>
                  <span className="text-white block">NEURAL RECOVERY SLEEP</span>
                  <span className="text-[8px] text-muted-text mt-0.5 block">LEVEL 03 CHAMBER SYNCHRONIZATION</span>
                </div>
                <span className="text-[8px] text-muted-text">QUEUED</span>
              </div>
            </div>
            <span className="text-[8px] text-muted-text uppercase text-center mt-4">SESSION ESTIMATE: 45 MINS</span>
          </div>
        );
      case "AI_COACH":
        return (
          <div className="flex flex-col justify-between h-full py-4 text-left font-mono text-[9px]">
            <div className="flex flex-col gap-4">
              <span className="text-[8px] text-neon-purple uppercase tracking-wider">// SYNCED DIAGNOSTIC FEED</span>
              
              <div className="p-3 rounded-lg bg-neon-purple/5 border border-neon-purple/20 text-white/90">
                <span className="text-neon-purple font-bold block mb-1">NEXUS AI v4.8:</span>
                "Caloric efficiency is optimal. However, concentric lift velocity inside deadlift vectors is dropping by 8ms. Rest for 180 seconds before starting the next sets."
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-muted-text">
                <span className="text-white font-bold block mb-1">CLIENT QUERY:</span>
                "Analyze torque shear on lower joint angles."
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 text-center">
              <span className="text-neon-lime animate-pulse">// SYSTEM EVALUATING SHEAR VECTORS</span>
            </div>
          </div>
        );
      case "NUTRITION":
        return (
          <div className="flex flex-col justify-between h-full py-4 text-left font-mono">
            <div className="flex flex-col gap-4">
              <span className="text-[8px] text-white uppercase tracking-wider">// RECONSTITUTION CALORIES</span>
              
              <div className="p-3 border border-white/10 bg-white/5 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="text-white block font-bold">BIO-STEEL SHAKE SYNC</span>
                  <span className="text-[8px] text-muted-text mt-0.5 block">PROTEIN: 45G // CARBS: 80G // AMINOS</span>
                </div>
                <span className="text-neon-lime font-bold">+520 KCAL</span>
              </div>

              <div className="p-3 border border-white/10 bg-white/5 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <span className="text-white block font-bold">NEXUS ALPHA NOOTROPIC</span>
                  <span className="text-[8px] text-muted-text mt-0.5 block">FOCUS CONCENTRATE // ZERO CALORIC TAX</span>
                </div>
                <span className="text-neon-purple font-bold">+0 KCAL</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[9px] text-muted-text">
              <span>PROTEIN: 145G / 180G</span>
              <span>CARBS: 220G / 300G</span>
            </div>
          </div>
        );
      case "BIOMETRIC":
      default:
        return (
          <div className="flex flex-col justify-between h-full py-4 text-left font-mono">
            <div className="flex flex-col gap-4">
              <span className="text-[8px] text-neon-lime uppercase tracking-wider">// CELLULAR ENGINE</span>
              
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[9px] text-muted-text block uppercase">CURRENT KINETIC OUTPUT</span>
                <span className="text-xl font-bold text-white block">842 WATT</span>
                <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-neon-lime w-3/4 animate-pulse" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-neon-purple/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-neon-purple animate-pulse" />
                  <div>
                    <span className="text-[8px] text-muted-text block leading-none">HEART RATE</span>
                    <span className="text-sm font-bold text-white block mt-0.5">142 BPM</span>
                  </div>
                </div>
                <span className="text-[8px] text-neon-purple font-bold">SYNCED</span>
              </div>
            </div>

            <span className="text-[8px] text-muted-text uppercase text-center mt-4">NEXUS INTEGRITY SECURE: [99.8%]</span>
          </div>
        );
    }
  };

  return (
    <div className="relative overflow-hidden w-full py-12">
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-neon-lime/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse" />
            <span className="font-mono text-[9px] text-neon-lime tracking-widest uppercase">
              COMPANION SOFTWARE PREVIEW // INTERACTIVE SIMULATOR
            </span>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            NEXUS MOBILE <span className="text-neon-purple cyber-glow-purple">MOCKUPS</span>
          </h1>
          <p className="text-sm text-muted-text max-w-2xl leading-relaxed mt-2">
            Explore the high-fidelity UI layout designed for wealthy fitness seeker nodes. Click the dashboard keys below inside the visual phone container to test diagnostic screens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* LEFT: TEXT SWITCH CONTROLLER KEYS */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <h2 className="font-mono text-xl md:text-2xl font-black text-white uppercase tracking-wider border-l-2 border-neon-lime pl-3">
              SIMULATOR CHANNELS
            </h2>
            <p className="text-xs md:text-sm text-muted-text leading-relaxed">
              Every screen is styled to load zero unnecessary biological overhead, displaying crucial biometric information instantly in a sleek luxury cyber interface.
            </p>

            <div className="flex flex-col gap-3 font-mono text-xs mt-4">
              <button
                onClick={() => setActiveScreen("BIOMETRIC")}
                className={`py-3 px-4 rounded text-left border transition-all flex items-center justify-between cursor-none ${
                  activeScreen === "BIOMETRIC" ? "bg-white/5 border-neon-lime text-white" : "border-white/5 text-muted-text hover:border-white/10 hover:text-white"
                }`}
              >
                <span>01 // BIOMETRIC ENGINE</span>
                <Heart className="w-4 h-4 text-neon-purple animate-pulse" />
              </button>

              <button
                onClick={() => setActiveScreen("PLANNER")}
                className={`py-3 px-4 rounded text-left border transition-all flex items-center justify-between cursor-none ${
                  activeScreen === "PLANNER" ? "bg-white/5 border-neon-lime text-white" : "border-white/5 text-muted-text hover:border-white/10 hover:text-white"
                }`}
              >
                <span>02 // WORKOUT PLANNER</span>
                <Calendar className="w-4 h-4 text-neon-lime" />
              </button>

              <button
                onClick={() => setActiveScreen("AI_COACH")}
                className={`py-3 px-4 rounded text-left border transition-all flex items-center justify-between cursor-none ${
                  activeScreen === "AI_COACH" ? "bg-white/5 border-neon-lime text-white" : "border-white/5 text-muted-text hover:border-white/10 hover:text-white"
                }`}
              >
                <span>03 // AI NEURAL COACH</span>
                <MessageSquare className="w-4 h-4 text-neon-purple" />
              </button>

              <button
                onClick={() => setActiveScreen("NUTRITION")}
                className={`py-3 px-4 rounded text-left border transition-all flex items-center justify-between cursor-none ${
                  activeScreen === "NUTRITION" ? "bg-white/5 border-neon-lime text-white" : "border-white/5 text-muted-text hover:border-white/10 hover:text-white"
                }`}
              >
                <span>04 // BIO-NUTRITION NUTRIENTS</span>
                <Apple className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* RIGHT: PHONE CONTAINER SIMULATOR */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-80 h-[560px] rounded-[44px] border-4 border-white/20 bg-black overflow-hidden shadow-2xl p-3 flex flex-col justify-between">
              
              {/* Phone Camera notch detail */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl border-b border-white/10 z-30" />
              
              {/* App Screen inside phone shell */}
              <div className="h-full flex flex-col justify-between relative bg-dark-bg rounded-[32px] overflow-hidden p-4 pt-8">
                
                {/* Header status bar */}
                <div className="flex justify-between items-center font-mono text-[9px] text-muted-text border-b border-white/5 pb-2">
                  <span>NEXUS SYNCED</span>
                  <span>9:41 AM</span>
                </div>

                {/* Inner Screen Dynamic Layout */}
                <div className="flex-grow pt-4">
                  {renderScreen()}
                </div>

                {/* Navigation status footer tab keys */}
                <div className="border-t border-white/10 pt-3 flex justify-around items-center font-mono text-[8px] text-muted-text select-none">
                  <button onClick={() => setActiveScreen("BIOMETRIC")} className={`flex flex-col items-center gap-1 cursor-none ${activeScreen === "BIOMETRIC" ? "text-neon-lime" : ""}`}>
                    <Heart className="w-4 h-4" />
                    <span>BIO</span>
                  </button>
                  <button onClick={() => setActiveScreen("PLANNER")} className={`flex flex-col items-center gap-1 cursor-none ${activeScreen === "PLANNER" ? "text-neon-lime" : ""}`}>
                    <Calendar className="w-4 h-4" />
                    <span>PLAN</span>
                  </button>
                  <button onClick={() => setActiveScreen("AI_COACH")} className={`flex flex-col items-center gap-1 cursor-none ${activeScreen === "AI_COACH" ? "text-neon-lime" : ""}`}>
                    <MessageSquare className="w-4 h-4" />
                    <span>COACH</span>
                  </button>
                  <button onClick={() => setActiveScreen("NUTRITION")} className={`flex flex-col items-center gap-1 cursor-none ${activeScreen === "NUTRITION" ? "text-neon-lime" : ""}`}>
                    <Apple className="w-4 h-4" />
                    <span>FOOD</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
