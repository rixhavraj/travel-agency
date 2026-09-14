"use client";

import React from "react";
import { Shield, Target, Cpu, Heart, Check, Star, Globe, Mail } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";

export default function About() {
  const values = [
    { name: "PASSION", desc: "Unwavering commitment to excellence, growth, and pushing athletic boundaries every single day.", icon: Target },
    { name: "INTEGRITY", desc: "Honesty and professional transparency in coaching, metrics tracking, and athletic evaluations.", icon: Shield },
    { name: "COMMUNITY", desc: "A powerful, unified, and positive network of high-performance individuals helping each other grow.", icon: Heart },
    { name: "EXCELLENCE", desc: "Top-tier world-class machines, premium support facilities, and highly customized performance plans.", icon: Cpu }
  ];

  const coaches = [
    {
      name: "JAMES WILSON",
      role: "STRENGTH COACH",
      img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "EMILY ROBERTS",
      role: "YOGA DIRECTOR",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "DAVID LEE",
      role: "CROSSFIT TRAINER",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "SOPHIA MILLER",
      role: "YOGA & HIIT COACH",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse" />
            <span className="font-mono text-[9px] text-neon-lime tracking-widest uppercase">
              ABOUT // GYMPRO CORE IDENTITY
            </span>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            WE ARE MORE THAN <br />
            <span className="text-neon-lime italic">JUST A GYM</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed mt-2">
            At GymPro, we believe fitness is not just about working out, it's about building discipline, confidence, and a stronger life. Experience premium world-class facilities and results.
          </p>
        </div>

        {/* DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <h3 className="font-mono text-xl font-bold uppercase tracking-wide">
              OUR PROTOCOLS FOR SUCCESS
            </h3>
            
            <div className="flex flex-col gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-neutral-300">Modern World-Class Equipment</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-neutral-300">Expert and Certified Personal Coaching</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-neutral-300">Unified and Motivating Community Support</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-neutral-300">Tailored Nutrition and Meal Guidance</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">15+ Years</span>
                <span className="text-[9px] font-mono text-neon-lime tracking-widest uppercase mt-1">EXPERIENCE</span>
              </div>
              <CyberButton variant="lime" size="md" cornerSize={4}>
                LEARN MORE
              </CyberButton>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-video bg-neutral-900 border border-white/10 rounded overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent" />
          </div>
        </div>

        {/* VALUES SECTION */}
        <section className="mb-28">
          <div className="flex flex-col items-center text-center mb-16 gap-2">
            <span className="font-mono text-xs text-neon-lime tracking-[0.2em] uppercase">// FOUNDATION</span>
            <h2 className="font-mono text-2xl md:text-4xl font-black text-white uppercase italic">
              OUR VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <GlassCard key={idx} glowColor="lime" className="p-6 text-left flex flex-col gap-4">
                <div className="w-12 h-12 rounded bg-neutral-900 border border-white/10 flex items-center justify-center text-neon-lime">
                  <val.icon className="w-5 h-5" />
                </div>
                <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider">{val.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{val.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* MEET OUR COACHES */}
        <section className="mb-16">
          <div className="flex flex-col items-center text-center mb-16 gap-2">
            <span className="font-mono text-xs text-neon-lime tracking-[0.2em] uppercase">// EXPERTISE</span>
            <h2 className="font-mono text-2xl md:text-4xl font-black text-white uppercase italic">
              MEET OUR COACHES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coaches.map((coach, idx) => (
              <div 
                key={idx}
                className="group relative h-96 rounded overflow-hidden border border-white/10 bg-black flex flex-col justify-end p-6 select-none"
              >
                {/* Profile image with B&W overlay to match the image precisely */}
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 z-0" 
                  style={{ backgroundImage: `url('${coach.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 pointer-events-none" />

                <div className="relative z-20 flex flex-col gap-1 text-left">
                  <h3 className="font-mono text-base font-black text-white uppercase tracking-wider">
                    {coach.name}
                  </h3>
                  <span className="font-mono text-[9px] text-neon-lime uppercase tracking-widest">
                    {coach.role}
                  </span>
                  
                  <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="text-white hover:text-neon-lime transition-colors cursor-none"><Globe className="w-3.5 h-3.5" /></a>
                    <a href="#" className="text-white hover:text-neon-lime transition-colors cursor-none"><Mail className="w-3.5 h-3.5" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
