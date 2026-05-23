"use client";

import React, { useState } from "react";
import { Compass, Award, ShieldAlert, Cpu, Heart, Globe, Activity } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";

export default function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  const trainers = [
    {
      id: 0,
      name: "DR. JAXON STRYKER",
      role: "BIOPHYSICAL KINETICS HEAD",
      bio: "Former Olympic neuro-biomechanist. Over 15 years designing velocity load algorithms for global combat athletes.",
      certs: ["Ph.D. Neuro-Biophysics", "CSCS *D", "Bio-Steel Consultant"],
      skills: [
        { name: "CELL STIMULATION SYNC", level: 98 },
        { name: "JOINT TORQUE ALIGNMENT", level: 95 },
        { name: "AI DIAGNOSTIC METRIC", level: 90 }
      ],
      glow: "lime",
      avatar: "JS"
    },
    {
      id: 1,
      name: "ATHENA VANCE",
      role: "QUANTUM HYPERTROPHY STRATEGIST",
      bio: "Expert in electronic high-frequency adaptation models. Specializes in rapid kinetic recovery indexes for premium executives.",
      certs: ["M.S. Human Performance", "Certified Bio-Remodeler", "ISSA Master Trainer"],
      skills: [
        { name: "CELL STIMULATION SYNC", level: 92 },
        { name: "JOINT TORQUE ALIGNMENT", level: 97 },
        { name: "AI DIAGNOSTIC METRIC", level: 88 }
      ],
      glow: "purple",
      avatar: "AV"
    },
    {
      id: 2,
      name: "KAIEN SHINODA",
      role: "NEURAL COMBAT DIRECTOR",
      bio: "Tactical reflexes expert. Former defensive training director for corporate military squads in Neo-Tokyo.",
      certs: ["Master Tactical Combat", "Biometric Safety Expert", "Reflex Coach Level 3"],
      skills: [
        { name: "CELL STIMULATION SYNC", level: 85 },
        { name: "JOINT TORQUE ALIGNMENT", level: 90 },
        { name: "AI DIAGNOSTIC METRIC", level: 96 }
      ],
      glow: "silver",
      avatar: "KS"
    }
  ];

  return (
    <div className="relative overflow-hidden w-full py-12">
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-neon-lime/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-purple/20 rounded-full bg-black/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
            <span className="font-mono text-[9px] text-neon-purple tracking-widest uppercase">
              GRID SPECIALISTS OPERATIONAL // TRAINERS INDEX
            </span>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            NEURAL BIOPHYSICAL <span className="text-neon-lime cyber-glow-text">DIRECTORS</span>
          </h1>
          <p className="text-sm text-muted-text max-w-2xl leading-relaxed mt-2">
            Meet the architectural directors behind your upgrades. Our coaches hold doctoral degrees in neural performance, physical bio-kinetics, and biomechanical cellular optimization.
          </p>
        </div>

        {/* TRAINER PROFILE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {trainers.map((trainer) => (
            <GlassCard
              key={trainer.id}
              glowColor={trainer.glow as any}
              className="p-6 text-left flex flex-col justify-between min-h-[500px]"
            >
              {/* Profile Details */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] bg-white/5 border border-white/10 rounded px-2 py-0.5 text-muted-text">
                    DIRECTOR_ID_0{trainer.id}
                  </span>
                  <div className="flex gap-2">
                    <a href="#" className="text-muted-text hover:text-white transition-colors cursor-none"><Globe className="w-3.5 h-3.5" /></a>
                    <a href="#" className="text-muted-text hover:text-white transition-colors cursor-none"><Compass className="w-3.5 h-3.5" /></a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded border border-white/10 flex items-center justify-center font-mono text-base font-black bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05),_transparent_70%)] ${
                    trainer.glow === "lime" ? "text-neon-lime border-neon-lime/40" : trainer.glow === "purple" ? "text-neon-purple border-neon-purple/40" : "text-white"
                  }`}>
                    {trainer.avatar}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-mono text-base font-black text-white uppercase tracking-wide">
                      {trainer.name}
                    </h3>
                    <span className="font-mono text-[9px] text-muted-text tracking-wider uppercase">
                      {trainer.role}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-text leading-relaxed font-sans">
                  {trainer.bio}
                </p>

                {/* Certifications Checklist */}
                <div className="flex flex-col gap-2 font-mono text-[10px] text-white/90">
                  <span className="text-[8px] text-muted-text uppercase tracking-widest">// DECRYPTED CERTIFICATES:</span>
                  {trainer.certs.map((cert, cidx) => (
                    <div key={cidx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPECIALIZATION LEVEL SLIDERS */}
              <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 font-mono text-[9px]">
                <span className="text-[8px] text-muted-text uppercase tracking-widest">// SPECIALIZATION METERS:</span>
                
                {trainer.skills.map((skill, sidx) => (
                  <div key={sidx} className="flex flex-col gap-1 text-left">
                    <div className="flex justify-between items-center text-muted-text text-[8px]">
                      <span>{skill.name}</span>
                      <span className="text-white font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          trainer.glow === "lime" ? "bg-neon-lime" : trainer.glow === "purple" ? "bg-neon-purple" : "bg-white"
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CyberButton
                  variant={trainer.glow === "lime" ? "lime" : trainer.glow === "purple" ? "purple" : "silver"}
                  size="sm"
                  className="w-full text-center"
                  onClick={() => setSelectedTrainer(trainer.id)}
                  cornerSize={6}
                >
                  SECURE DOCKING SLOT
                </CyberButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* DOCK SLOT DIALOG MODAL */}
        {selectedTrainer !== null && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="glass-panel-lime p-8 rounded-xl max-w-md w-full relative text-left font-mono">
              <span className="text-[9px] text-neon-lime tracking-widest block uppercase">// DOCKING PROTOCOL INITIALIZED</span>
              <h3 className="text-xl font-black text-white mt-2 uppercase">CONSULTATION CACHED</h3>
              <p className="text-xs text-muted-text mt-4 leading-relaxed">
                You have requested a secure training sync slot with **{trainers[selectedTrainer].name}**. Biometric profile routing has been registered.
              </p>
              <div className="mt-6 flex gap-4">
                <CyberButton variant="lime" size="sm" onClick={() => setSelectedTrainer(null)} cornerSize={4}>
                  DISMISS TICKET
                </CyberButton>
                <CyberButton variant="silver" size="sm" onClick={() => setSelectedTrainer(null)} cornerSize={4}>
                  VERIFY CHANNEL
                </CyberButton>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
