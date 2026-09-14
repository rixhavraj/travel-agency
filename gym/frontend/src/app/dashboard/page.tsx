"use client";

import React, { useState } from "react";
import { Compass, Cpu, Flame, Heart, Calendar, Zap, Plus, Trash2, Shield, Activity, UserCheck } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

interface WorkoutNode {
  id: number;
  exercise: string;
  weight: number;
  reps: number;
}

export default function Dashboard() {
  const [workouts, setWorkouts] = useState<WorkoutNode[]>([
    { id: 1, exercise: "BIOMECHANICAL DEADLIFT", weight: 315, reps: 5 },
    { id: 2, exercise: "HOLOGRAPHIC INCLINE PRESS", weight: 225, reps: 8 },
  ]);
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState(135);
  const [reps, setReps] = useState(8);
  const [caloricGoal, setCaloricGoal] = useState(3000);
  const [caloricConsumed, setCaloricConsumed] = useState(1850);

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise) return;

    const newNode: WorkoutNode = {
      id: Date.now(),
      exercise: exercise.toUpperCase(),
      weight: Number(weight),
      reps: Number(reps)
    };

    setWorkouts([newNode, ...workouts]);
    setExercise("");
    
    canvasConfetti({
      particleCount: 30,
      spread: 40,
      colors: ["#ccff00", "#a855f7"]
    });
  };

  const handleRemoveWorkout = (id: number) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  // AI Coaching diagnostic based on biometrics
  const getAICoachAdvice = () => {
    const balance = caloricGoal - caloricConsumed;
    if (balance > 500) {
      return '"Caloric baseline is currently deficient. Inject at least 650 calories of clean amino micro-molecules within the next 45 minutes to sustain active recovery grids."';
    } else if (balance <= 0) {
      return '"Caloric limit reached. Cell recovery threshold fully configured. Direct active focus on neurological range adaptation loops today."';
    } else {
      return '"Hypertrophy synthesis optimal. System is synchronized. Maintain explosive lift velocities to lock in maximum motor unit stimulation scores."';
    }
  };

  return (
    <div className="relative overflow-hidden w-full py-12">
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-neon-lime/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start gap-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-purple/20 rounded-full bg-black/60 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
              <span className="font-mono text-[9px] text-neon-purple tracking-widest uppercase">
                MEMBER DASHBOARD // CODENAME: SHATTER-POINT // SYNCED
              </span>
            </div>
            <h1 className="font-mono text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
              ATHLETE <span className="text-neon-lime cyber-glow-text">TELEMETRY</span>
            </h1>
          </div>

          {/* SYSTEM SUMMARY BAR */}
          <div className="font-mono text-xs text-muted-text flex items-center gap-6 border border-white/10 rounded bg-black/60 p-4 w-fit">
            <div className="flex flex-col text-left">
              <span className="text-[8px] uppercase">MEMBERSHIP SYNC</span>
              <span className="text-neon-purple font-bold">BLACK CHROMIUM</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="flex flex-col text-left">
              <span className="text-[8px] uppercase">NEXUS CONNECT INDEX</span>
              <span className="text-neon-lime font-bold">NODE_ Tokyo_882</span>
            </div>
          </div>
        </div>

        {/* CORE TELEMETRY METRIC WIDGETS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Heart Beat Graph */}
          <GlassCard glowColor="purple" className="p-6 text-left flex flex-col justify-between h-56 relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-15" />
            <div className="flex justify-between items-center font-mono text-[9px] text-muted-text relative z-10">
              <span className="flex items-center gap-1.5 text-neon-purple"><Heart className="w-3.5 h-3.5 animate-pulse" /> BIO FEEDBACK</span>
              <span>142 BPM</span>
            </div>
            
            {/* SVG Pulsing heartbeat graph */}
            <div className="h-20 w-full relative z-10 select-none my-2 flex items-center">
              <svg className="w-full h-full text-neon-purple" viewBox="0 0 100 40">
                <path
                  d="M0,20 L30,20 L35,10 L40,30 L45,5 L50,35 L55,20 L100,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              </svg>
            </div>
            
            <span className="font-mono text-[8px] text-muted-text relative z-10 block uppercase">
              STATUS // STEADY DOCK INTERFACE
            </span>
          </GlassCard>

          {/* Calorie Analytics Slider */}
          <GlassCard glowColor="lime" className="p-6 text-left flex flex-col justify-between h-56">
            <div className="flex justify-between items-center font-mono text-[9px] text-muted-text">
              <span className="flex items-center gap-1.5 text-neon-lime"><Flame className="w-3.5 h-3.5" /> METABOLIC LOAD</span>
              <span>{caloricConsumed} / {caloricGoal} KCAL</span>
            </div>

            {/* Interactive sliders to configure consumption */}
            <div className="flex flex-col gap-4 my-2">
              <div className="flex flex-col gap-1 font-mono text-[8px]">
                <div className="flex justify-between">
                  <span>INPUT INTAKE:</span>
                  <span className="text-white font-bold">{caloricConsumed} KCAL</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="50"
                  value={caloricConsumed}
                  onChange={(e) => setCaloricConsumed(Number(e.target.value))}
                  className="w-full h-1"
                />
              </div>

              <div className="flex flex-col gap-1 font-mono text-[8px]">
                <div className="flex justify-between">
                  <span>METABOLIC TARIFF GOAL:</span>
                  <span className="text-white font-bold">{caloricGoal} KCAL</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="6000"
                  step="100"
                  value={caloricGoal}
                  onChange={(e) => setCaloricGoal(Number(e.target.value))}
                  className="w-full h-1"
                />
              </div>
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neon-lime" 
                style={{ width: `${Math.min(100, (caloricConsumed / caloricGoal) * 100)}%` }}
              />
            </div>
          </GlassCard>

          {/* AI Virtual Advisor Panel */}
          <GlassCard glowColor="silver" className="p-6 text-left flex flex-col justify-between h-56">
            <div className="flex justify-between items-center font-mono text-[9px] text-muted-text">
              <span className="flex items-center gap-1.5 text-white"><Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} /> AI VIRTUAL COACH</span>
              <span>SYNAPSE v4.8</span>
            </div>

            <div className="font-mono text-xs text-white/80 leading-relaxed my-2 italic text-left">
              {getAICoachAdvice()}
            </div>

            <span className="font-mono text-[8px] text-neon-lime uppercase tracking-wider block">
              // TELEMETRY EVALUATION: SECURE
            </span>
          </GlassCard>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          {/* LEFT: ADD WORKOUT INPUT MODULE */}
          <div className="lg:col-span-5">
            <GlassCard glowColor="lime" className="p-6 text-left">
              <form onSubmit={handleAddWorkout} className="flex flex-col gap-6 font-mono text-xs text-muted-text">
                <span className="text-[8px] uppercase tracking-widest block font-bold text-neon-lime">
                  // LOG COMPLETED WORKOUT NODE
                </span>

                <div className="flex flex-col gap-2">
                  <label className="uppercase tracking-widest text-[9px] text-white">EXERCISE EXECUTED</label>
                  <input
                    type="text"
                    required
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    placeholder="E.G. BARBELL SQUATS..."
                    className="bg-black/60 border border-white/10 rounded-sm py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime focus:shadow-[0_0_10px_rgba(204,255,0,0.15)] transition-all cursor-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="uppercase tracking-widest text-[9px] text-white">LOAD VECTOR (LBS)</label>
                    <input
                      type="number"
                      required
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="bg-black/60 border border-white/10 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-neon-lime transition-all cursor-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="uppercase tracking-widest text-[9px] text-white">REPETITION ITERATIONS</label>
                    <input
                      type="number"
                      required
                      value={reps}
                      onChange={(e) => setReps(Number(e.target.value))}
                      className="bg-black/60 border border-white/10 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-neon-lime transition-all cursor-none"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <CyberButton type="submit" variant="lime" size="sm" className="w-full text-center">
                    LOG WORKOUT NODE
                  </CyberButton>
                </div>
              </form>
            </GlassCard>
          </div>

          {/* RIGHT: WORKOUTS LOGS DATAGRID */}
          <div className="lg:col-span-7">
            <GlassCard glowColor="silver" className="p-6 text-left flex flex-col gap-6 min-h-[385px] justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider">
                    COMPLETED COMPOSITIONS ACTIVE
                  </h3>
                  <span className="font-mono text-[8px] text-muted-text uppercase">LOGS SYNCED: SECURE</span>
                </div>

                <div className="flex flex-col gap-3 font-mono text-xs">
                  {workouts.length === 0 ? (
                    <div className="py-12 text-center text-muted-text text-[11px]">
                      // NO COMPOSITIONS DETECTED ON GRID IN THIS SESSION //
                    </div>
                  ) : (
                    workouts.map((w) => (
                      <div
                        key={w.id}
                        className="p-3 border border-white/5 bg-white/5 rounded-sm flex items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded bg-black/60 border border-white/10 text-neon-lime">
                            <Zap className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col gap-1 text-left">
                            <span className="text-white font-bold uppercase">{w.exercise}</span>
                            <span className="text-[9px] text-muted-text">
                              LOAD TARIFF: {w.weight} LBS // REPS COMPLETED: {w.reps}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveWorkout(w.id)}
                          className="text-red-500 hover:text-red-400 p-1.5 cursor-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Server data diagnostics footer */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between font-mono text-[9px] text-muted-text">
                <span>TOTAL WEIGHT LOGGED: {workouts.reduce((sum, w) => sum + w.weight * w.reps, 0)} LBS</span>
                <span className="text-neon-lime animate-pulse">GRID SERVER STREAM: COMPRESSED</span>
              </div>
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
}
