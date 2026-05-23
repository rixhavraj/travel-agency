"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, Cpu, Shield, Award, Users, ChevronRight, Activity, 
  Play, Flame, Heart, Sparkles, Star, Dumbbell, Trophy
} from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeStat, setActiveStat] = useState<number | null>(null);

  const [currentBg, setCurrentBg] = useState(0);
  const heroBgs = [
    "/images/hero1.png",
    "/images/hero2.png",
    "/images/hero3.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    { id: 1, title: "FITNESS", desc: "Build functional strength and athletic resilience." },
    { id: 2, title: "NUTRITION", desc: "Premium custom fuel designed for muscle recovery." },
    { id: 3, title: "DISCIPLINE", desc: "Forge daily habits to build your ultimate lifestyle." }
  ];

  const features = [
    {
      title: "ELITE COACHES",
      desc: "Certified experts to guide your journey.",
      icon: Trophy
    },
    {
      title: "PREMIUM EQUIPMENT",
      desc: "Top-tier machines for maximum performance.",
      icon: Dumbbell
    },
    {
      title: "PERSONALIZED PLAN",
      desc: "Custom workouts for your unique goals.",
      icon: Zap
    },
    {
      title: "PROGRESS TRACKING",
      desc: "Track, Analyze, Improve. Every single day.",
      icon: Activity
    }
  ];

  const programs = [
    {
      title: "STRENGTH TRAINING",
      desc: "Build muscle and gain strength.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "FAT BURNING",
      desc: "High intensity workouts to burn fat.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "BODY BUILDING",
      desc: "Sculpt and build your physique.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "CROSSFIT",
      desc: "Push your limits everyday.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const facilities = [
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <div className="relative overflow-hidden w-full bg-[#030303] text-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black">
        {/* Background visual elements carousel (AI Generated Images) */}
        {heroBgs.map((bg, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 bg-cover bg-right lg:bg-center transition-all duration-[1500ms] ease-in-out select-none pointer-events-none z-0 ${
              currentBg === idx ? "opacity-70 scale-100" : "opacity-0 scale-105"
            }`} 
            style={{ backgroundImage: `url('${bg}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/10 z-5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Hero Left Content */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            {/* SEO Location Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neon-lime/10 border border-neon-lime/30 text-neon-lime font-mono text-[10px] tracking-widest uppercase w-fit select-none shadow-[0_0_15px_rgba(204,255,0,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-ping" />
              <span>📍 BEST PREMIUM GYM IN GREATER NOIDA</span>
            </div>

            <div className="flex flex-col">
              <h1 className="font-mono text-6xl md:text-8xl font-black tracking-tight leading-none uppercase select-none">
                <span className="italic font-extrabold text-white block">STRONGER</span>
                <span className="italic text-neon-lime block mt-2 drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]">EVERYDAY</span>
              </h1>
            </div>

            <p className="font-mono text-sm tracking-widest text-white/95 uppercase border-l-2 border-neon-lime pl-3">
              TRAIN HARD, STAY FOCUSED, BE LEGENDARY.
            </p>

            <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
              Experience the fitness revolution at the <strong className="text-neon-lime">best gym in Greater Noida</strong>. Featuring world-class cyberpunk biomechanical equipment, elite performance coaches, and a highly competitive training community designed to help you smash plateaus.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link href="/pricing" className="cursor-none">
                <CyberButton variant="lime" size="lg">
                  GET STARTED
                </CyberButton>
              </Link>
              <Link href="/about" className="cursor-none">
                <button className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-neon-lime transition-colors py-3 px-6 rounded border border-white/10 hover:border-neon-lime/40 cursor-none bg-black/40">
                  <Play className="w-4 h-4 text-neon-lime fill-current" />
                  <span>WATCH VIDEO</span>
                </button>
              </Link>
            </div>

            {/* Slider Tabs */}
            <div className="flex items-center gap-6 border-t border-white/15 pt-8 mt-8">
              <div className="font-mono text-2xl font-bold text-white/30">01</div>
              <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-widest uppercase">
                {heroSlides.map(slide => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveTab(slide.id)}
                    className={`pb-1 border-b cursor-none transition-colors duration-300 ${
                      activeTab === slide.id ? "border-neon-lime text-neon-lime font-black" : "border-transparent text-neutral-500 hover:text-white"
                    }`}
                  >
                    0{slide.id + 1} {slide.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUILT FOR RESULTS */}
      <section className="py-24 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-2 mb-16">
            <span className="font-mono text-xs text-neon-lime tracking-[0.2em] uppercase">
              // WHY CHOOSE US
            </span>
            <h2 className="font-mono text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic">
              BUILT FOR RESULTS
            </h2>
            <p className="text-xs text-neutral-500 font-mono tracking-widest mt-1 uppercase">
              GREATER NOIDA'S ELITE ATHLETIC POWERHOUSE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feat, idx) => (
              <GlassCard
                key={idx}
                glowColor="lime"
                className="p-6 text-left flex flex-col gap-4 border border-white/5 hover:border-neon-lime/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded bg-neutral-900 border border-white/10 flex items-center justify-center text-neon-lime group-hover:bg-neon-lime group-hover:text-black transition-all duration-300">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-mono text-sm font-black text-white uppercase tracking-wide mt-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {feat.desc}
                </p>
              </GlassCard>
            ))}
          </div>

          {/* Stats counts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-16 font-mono">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-white">15K+</span>
              <span className="text-[10px] text-neon-lime uppercase tracking-widest mt-2">MEMBERS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-white">150+</span>
              <span className="text-[10px] text-neon-lime uppercase tracking-widest mt-2">EXPERT COACHES</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-white">50+</span>
              <span className="text-[10px] text-neon-lime uppercase tracking-widest mt-2">CLASSES / WEEK</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-white">98%</span>
              <span className="text-[10px] text-neon-lime uppercase tracking-widest mt-2">SUCCESS RATE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR PROGRAMS */}
      <section className="py-24 bg-neutral-950 relative border-t border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div className="flex flex-col items-start text-left gap-2">
              <span className="font-mono text-xs text-neon-lime tracking-[0.2em] uppercase">// DIRECTORY</span>
              <h2 className="font-mono text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic">
                POPULAR PROGRAMS
              </h2>
            </div>
            <Link href="/programs" className="font-mono text-xs text-neon-lime hover:text-white transition-colors flex items-center gap-1 cursor-none uppercase tracking-widest pb-1 border-b border-neon-lime/20 hover:border-white">
              <span>VIEW ALL</span> <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => (
              <div 
                key={idx}
                className="group relative h-96 rounded overflow-hidden border border-white/5 bg-black flex flex-col justify-end p-6 select-none"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-500 z-0" 
                  style={{ backgroundImage: `url('${prog.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

                <div className="relative z-20 flex flex-col gap-2 text-left">
                  <h3 className="font-mono text-base font-black text-white uppercase tracking-wider">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {prog.desc}
                  </p>
                  <Link href="/programs" className="font-mono text-[10px] text-neon-lime uppercase tracking-widest mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-none">
                    <span>EXPLORE</span> <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION: YOUR ONLY LIMIT IS YOU */}
      <section className="relative py-32 overflow-hidden bg-black text-center z-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none z-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-5 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-mono text-4xl md:text-7xl font-black tracking-tight text-white uppercase italic leading-none">
            YOUR ONLY LIMIT <br />
            <span className="text-neon-lime drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">IS YOU</span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest mt-4">
            <span className="w-8 h-[1px] bg-white/30" />
            <button className="flex items-center gap-2 text-white hover:text-neon-lime transition-colors cursor-none">
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-lime transition-colors">
                <Play className="w-4 h-4 text-neon-lime fill-current" />
              </span>
              <span>JOIN THE MOVEMENT</span>
            </button>
            <span className="w-8 h-[1px] bg-white/30" />
          </div>

          <div className="mt-8">
            <Link href="/pricing" className="cursor-none">
              <CyberButton variant="lime" size="lg">
                GET STARTED
              </CyberButton>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PREMIUM FACILITIES */}
      <section className="py-24 bg-neutral-950 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-2 mb-16">
            <span className="font-mono text-xs text-neon-lime tracking-[0.2em] uppercase">// LOCALIZED AT ALPHA II, GREATER NOIDA</span>
            <h2 className="font-mono text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic">
              PREMIUM FACILITIES
            </h2>
            <p className="text-xs text-neutral-400 max-w-lg mt-2">
              Visit the largest premium fitness chamber in Greater Noida equipped with military-grade biomechanical gear, saunas, and custom juice bars.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {facilities.map((url, idx) => (
              <div 
                key={idx}
                className="aspect-square relative rounded overflow-hidden border border-white/5 group bg-neutral-900"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                  style={{ backgroundImage: `url('${url}')` }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-neon-lime bg-black/80 px-4 py-2 border border-neon-lime/30 rounded">
                    VIEW CHAMBER
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ROTATING NEON TICKER */}
      <section className="py-8 bg-neon-lime text-black overflow-hidden relative z-10 w-full select-none transform rotate-1 border-t border-b border-black font-black uppercase tracking-wider text-lg md:text-xl">
        <div className="flex whitespace-nowrap gap-16 animate-marquee font-mono">
          <span>✦ STRONGER EVERYDAY</span>
          <span>✦ BUILT FOR RESULTS</span>
          <span>✦ MEET OUR COACHES</span>
          <span>✦ CHOOSE YOUR PRICE PLAN</span>
          <span>✦ STRONGER EVERYDAY</span>
          <span>✦ BUILT FOR RESULTS</span>
          <span>✦ MEET OUR COACHES</span>
          <span>✦ CHOOSE YOUR PRICE PLAN</span>
        </div>
      </section>
    </div>
  );
}
