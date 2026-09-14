"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, Globe, Compass, ArrowUp, Shield } from "lucide-react";
import canvasConfetti from "canvas-confetti";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribed(true);
    setEmail("");
    
    // Blast glowing premium confetti
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      colors: ["#ccff00", "#ffffff"],
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black overflow-hidden pt-20 pb-10 z-10 cyber-grid">
      {/* Decorative technical visual layout details */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-lime to-transparent shadow-[0_0_8px_#ccff00]" />
      
      {/* Ambient background lines */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* COLUMN 1: BRAND DETAIL */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-1 group cursor-none">
              <span className="font-mono text-xl font-black tracking-widest text-white">
                GYMPRO<span className="text-neon-lime">.</span>
              </span>
            </Link>
            <p className="font-sans text-xs text-muted-text leading-relaxed">
              We don't build bodies. We build lifestyles. GymPro represents a curated premium ecosystem of elite trainers, premium biomechanical gear, and high-frequency coaching.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-neon-lime hover:border-neon-lime transition-all duration-300 cursor-none"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-white hover:border-white transition-all duration-300 cursor-none"
              >
                <Compass className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-neon-lime hover:border-neon-lime transition-all duration-300 cursor-none"
              >
                <Shield className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: PAGES LINKS */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs text-white uppercase tracking-widest font-black border-l-2 border-neon-lime pl-3">
              DIRECTORY
            </h4>
            <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
              <div className="flex flex-col gap-3 text-left">
                <Link href="/" className="text-muted-text hover:text-white transition-colors cursor-none">// HOME</Link>
                <Link href="/about" className="text-muted-text hover:text-white transition-colors cursor-none">// ABOUT</Link>
                <Link href="/programs" className="text-muted-text hover:text-white transition-colors cursor-none">// PROGRAMS</Link>
                <Link href="/coaches" className="text-muted-text hover:text-white transition-colors cursor-none">// COACHES</Link>
                <Link href="/pricing" className="text-muted-text hover:text-white transition-colors cursor-none">// PRICING</Link>
              </div>
              <div className="flex flex-col gap-3 text-left">
                <Link href="/classes" className="text-muted-text hover:text-white transition-colors cursor-none">// CLASSES</Link>
                <Link href="/shop" className="text-muted-text hover:text-white transition-colors cursor-none">// SHOP</Link>
                <Link href="/blog" className="text-muted-text hover:text-white transition-colors cursor-none">// BLOG</Link>
                <Link href="/testimonials" className="text-muted-text hover:text-white transition-colors cursor-none">// REVIEWS</Link>
                <Link href="/contact" className="text-muted-text hover:text-white transition-colors cursor-none">// CONTACT</Link>
              </div>
            </div>
          </div>

          {/* COLUMN 3: RECENT UPDATES */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs text-white uppercase tracking-widest font-black border-l-2 border-neon-lime pl-3">
              LATEST INSIGHTS
            </h4>
            <div className="flex flex-col gap-4 font-mono text-[11px] text-left">
              <div className="border-b border-white/5 pb-2">
                <span className="text-neon-lime text-[9px] block">NUTRITION</span>
                <Link href="/blog" className="text-muted-text hover:text-white transition-colors cursor-none">
                  Nutrition Guide for Muscle Gain: 5 Key Tips...
                </Link>
              </div>
              <div>
                <span className="text-neon-lime text-[9px] block">FITNESS</span>
                <Link href="/blog" className="text-muted-text hover:text-white transition-colors cursor-none">
                  How to Stay Motivated Everyday: Reaching Peak State...
                </Link>
              </div>
            </div>
          </div>

          {/* COLUMN 4: NEWSLETTER / NEWS */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-xs text-white uppercase tracking-widest font-black border-l-2 border-white pl-3">
              VIP MEMBERSHIP SINK
            </h4>
            <p className="font-sans text-xs text-muted-text leading-relaxed">
              Register to receive training schedule updates, exclusive product slots, and peak biological guidelines.
            </p>
            {subscribed ? (
              <div className="glass-panel-lime p-4 rounded font-mono text-xs text-neon-lime flex items-center gap-2">
                SUBSCRIBED SUCCESSFULLY. WELCOME TO GYMPRO.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER SECURE EMAIL..."
                    className="w-full bg-black/60 border border-white/10 rounded-sm py-2.5 px-3 font-mono text-xs text-white placeholder-white/35 focus:outline-none focus:border-neon-lime focus:shadow-[0_0_10px_rgba(204,255,0,0.2)] transition-all cursor-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-text hover:text-neon-lime transition-colors cursor-none"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[9px] text-muted-text">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span>© {new Date().getFullYear()} GYMPRO FITNESS CLUB. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors cursor-none">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors cursor-none">TERMS & CONDITIONS</a>
            </div>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 border border-white/10 rounded-sm py-1.5 px-3 hover:border-neon-lime hover:text-neon-lime transition-all cursor-none bg-black/40"
          >
            <span>SCROLL TO TOP</span>
            <ArrowUp className="w-3 h-3 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
}
