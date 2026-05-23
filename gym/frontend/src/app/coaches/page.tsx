"use client";

import React, { useState } from "react";
import { Award, Compass, Globe, Heart, Mail } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";

export default function Coaches() {
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null);

  const coaches = [
    {
      id: 0,
      name: "JAMES WILSON",
      role: "STRENGTH COACH",
      bio: "Over 10 years of personal training experience focusing on hypertrophy, heavy squats, and strength conditioning.",
      certs: ["Certified Strength Specialist (CSCS)", "ISSA Master Trainer"],
      skills: [
        { name: "POWERLIFTING SPEED", level: 98 },
        { name: "HYPERTROPHY TIMING", level: 95 },
        { name: "TACTICAL CONDITION", level: 90 }
      ],
      img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 1,
      name: "EMILY ROBERTS",
      role: "YOGA DIRECTOR",
      bio: "Expert in flexibility, alignment, breathing techniques, and rapid cognitive muscle recovery.",
      certs: ["RYT 500 Certified", "Therapeutic Alignment Expert"],
      skills: [
        { name: "FLEXIBILITY FLOW", level: 97 },
        { name: "BREATHING DYNAMICS", level: 92 },
        { name: "POST-WORKOUT RECOVERY", level: 95 }
      ],
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "DAVID LEE",
      role: "CROSSFIT TRAINER",
      bio: "High impact cardiovascular conditioning, tactical reflex training, and high-frequency power exercises.",
      certs: ["CrossFit Level 3 Coach", "Reflex Coach Specialist"],
      skills: [
        { name: "CARDIO ENHANCEMENT", level: 96 },
        { name: "TACTICAL DRILLS", level: 90 },
        { name: "OLYMPIC COMPOUND LIFTS", level: 94 }
      ],
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "SOPHIA MILLER",
      role: "YOGA & HIIT COACH",
      bio: "Expert in high-intensity interval training, functional core strength, and custom diet mapping.",
      certs: ["Certified Nutrition Specialist", "NASM Personal Trainer"],
      skills: [
        { name: "HIIT SPEED TRAINING", level: 95 },
        { name: "DIET & FUEL MAPPING", level: 98 },
        { name: "CORE CONDITIONING", level: 91 }
      ],
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse" />
            <span className="font-mono text-[9px] text-neon-lime tracking-widest uppercase">
              EXPERT COACHES // TRAINERS INDEX
            </span>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            MEET OUR <span className="text-neon-lime italic">COACHES</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed mt-2">
            Meet the professional directors behind your fitness transformation. Our certified experts will guide your path to absolute strength and health.
          </p>
        </div>

        {/* COACH PROFILE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {coaches.map((trainer) => (
            <GlassCard
              key={trainer.id}
              glowColor="lime"
              className="p-6 text-left flex flex-col justify-between min-h-[500px]"
            >
              {/* Profile Details */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] bg-white/5 border border-white/10 rounded px-2 py-0.5 text-neutral-400">
                    COACH_ID_0{trainer.id}
                  </span>
                  <div className="flex gap-2">
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors cursor-none"><Globe className="w-3.5 h-3.5" /></a>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors cursor-none"><Mail className="w-3.5 h-3.5" /></a>
                  </div>
                </div>

                {/* Black and white avatar */}
                <div className="relative aspect-square w-full rounded overflow-hidden border border-white/10 bg-neutral-900">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                    style={{ backgroundImage: `url('${trainer.img}')` }}
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-mono text-base font-black text-white uppercase tracking-wide">
                    {trainer.name}
                  </h3>
                  <span className="font-mono text-[9px] text-neon-lime tracking-widest uppercase">
                    {trainer.role}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {trainer.bio}
                </p>

                {/* Certifications */}
                <div className="flex flex-col gap-2 font-mono text-[10px] text-white/90">
                  <span className="text-[8px] text-neutral-500 uppercase tracking-widest">// CERTIFICATIONS:</span>
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
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest">// SPECIALIZATION METERS:</span>
                
                {trainer.skills.map((skill, sidx) => (
                  <div key={sidx} className="flex flex-col gap-1 text-left">
                    <div className="flex justify-between items-center text-neutral-400 text-[8px]">
                      <span>{skill.name}</span>
                      <span className="text-white font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neon-lime transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CyberButton
                  variant="lime"
                  size="sm"
                  className="w-full text-center"
                  onClick={() => setSelectedCoach(trainer.id)}
                  cornerSize={6}
                >
                  SECURE DOCKING SLOT
                </CyberButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* DOCK SLOT DIALOG MODAL */}
        {selectedCoach !== null && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="glass-panel-lime p-8 rounded-xl max-w-md w-full relative text-left font-mono">
              <span className="text-[9px] text-neon-lime tracking-widest block uppercase">// SECURE CONFIGURATION DETECTED</span>
              <h3 className="text-xl font-black text-white mt-2 uppercase">CONSULTATION ROUTED</h3>
              <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                You have requested a personal synchronization session with **{coaches[selectedCoach].name}**. Biometric sync scheduling arrays have routed this query successfully.
              </p>
              <div className="mt-6 flex gap-4">
                <CyberButton variant="lime" size="sm" onClick={() => setSelectedCoach(null)} cornerSize={4}>
                  DISMISS DOCK
                </CyberButton>
                <CyberButton variant="silver" size="sm" onClick={() => setSelectedCoach(null)} cornerSize={4}>
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
