"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const majorReviews = [
    {
      text: "GymPro changed my life. The coaches, community and programs are absolutely amazing!",
      author: "John D.",
      role: "Member"
    },
    {
      text: "I experienced a 12% jump in raw strength in three months. Unparalleled luxury facility and expert guidance.",
      author: "Valerie V.",
      role: "Member // Tier 3"
    },
    {
      text: "The coaching team and classes schedule are supreme cheat codes. My recovery times decreased by half.",
      author: "Takemura H.",
      role: "Member // VIP Elite"
    }
  ];

  const gridReviews = [
    {
      author: "Stella R.",
      role: "Member",
      rating: 5,
      text: "Highly recommended if you want a premium gym that actually cares about your goals. Top tier equipment and staff."
    },
    {
      author: "Marcus K.",
      role: "Member",
      rating: 5,
      text: "The absolute best gym experience in New York. The programs are customizable and coaches are extremely detailed."
    },
    {
      author: "Elena G.",
      role: "Member",
      rating: 5,
      text: "Premium aesthetic, high-end locker rooms, and world-class compound power racks. It makes workouts exciting every day."
    }
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % majorReviews.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + majorReviews.length) % majorReviews.length);
  };

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit font-mono text-[9px] text-neon-lime tracking-widest uppercase">
            // MEMBER REVIEWS INDEX
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            OUR <span className="text-neon-lime italic">TESTIMONIALS</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl leading-relaxed mt-2">
            Read verified feedback from our community. Find out how personal alignment loops and coaches have altered training tracks.
          </p>
        </div>

        {/* CAROUSEL BLOCK */}
        <div className="max-w-4xl mx-auto mb-20 relative select-none">
          <GlassCard glowColor="lime" className="p-12 text-center flex flex-col items-center gap-6 min-h-[280px] justify-center relative">
            <span className="text-8xl text-neon-lime/25 font-serif absolute -top-4 left-6">“</span>
            
            <p className="font-mono text-lg md:text-2xl text-white tracking-wide leading-relaxed italic max-w-3xl">
              {majorReviews[activeIdx].text}
            </p>

            <div className="flex flex-col items-center gap-1 font-mono mt-4">
              <span className="text-sm font-black text-white uppercase">{majorReviews[activeIdx].author}</span>
              <span className="text-[10px] text-neon-lime uppercase tracking-wider">{majorReviews[activeIdx].role}</span>
            </div>
          </GlassCard>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-2 border border-white/10 hover:border-neon-lime hover:text-neon-lime rounded bg-black/60 text-white pointer-events-auto transition-colors cursor-none transform -translate-x-1/2"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-white/10 hover:border-neon-lime hover:text-neon-lime rounded bg-black/60 text-white pointer-events-auto transition-colors cursor-none transform translate-x-1/2"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GRID OF ADDITIONAL TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-left">
          {gridReviews.map((rev, idx) => (
            <GlassCard key={idx} glowColor="lime" className="p-6 flex flex-col justify-between min-h-[220px]">
              <div className="flex flex-col gap-4 font-sans">
                <div className="flex text-neon-lime">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                <div className="w-8 h-8 rounded bg-neon-lime/10 border border-neon-lime/20 flex items-center justify-center font-mono text-xs text-neon-lime">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex flex-col font-mono text-[9px]">
                  <span className="text-white font-bold uppercase">{rev.author}</span>
                  <span className="text-neutral-500 uppercase tracking-widest">{rev.role}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </div>
  );
}
