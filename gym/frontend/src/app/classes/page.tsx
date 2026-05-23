"use client";

import React, { useState } from "react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

export default function Classes() {
  const [activeDay, setActiveDay] = useState("WED");
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const scheduleData: Record<string, Array<{ time: string; name: string; coach: string }>> = {
    MON: [
      { time: "07:00 AM", name: "HIIT Training", coach: "Emily Roberts" },
      { time: "09:00 AM", name: "Yoga Flow", coach: "Sophia Miller" },
      { time: "12:00 PM", name: "Strength Training", coach: "James Wilson" },
      { time: "03:00 PM", name: "CrossFit", coach: "David Lee" },
      { time: "07:00 PM", name: "Body Pump", coach: "Emily Roberts" }
    ],
    TUE: [
      { time: "07:00 AM", name: "Yoga Flow", coach: "Sophia Miller" },
      { time: "09:00 AM", name: "HIIT Training", coach: "Emily Roberts" },
      { time: "12:00 PM", name: "CrossFit", coach: "David Lee" },
      { time: "03:00 PM", name: "Strength Training", coach: "James Wilson" },
      { time: "07:00 PM", name: "Athletic Conditioning", coach: "David Lee" }
    ],
    WED: [
      { time: "07:00 AM", name: "HIIT Training", coach: "Emily Roberts" },
      { time: "09:00 AM", name: "Yoga Flow", coach: "Sophia Miller" },
      { time: "12:00 PM", name: "Strength Training", coach: "James Wilson" },
      { time: "03:00 PM", name: "CrossFit", coach: "David Lee" },
      { time: "07:00 PM", name: "Body Pump", coach: "Emily Roberts" }
    ],
    THU: [
      { time: "07:00 AM", name: "Yoga Flow", coach: "Sophia Miller" },
      { time: "09:00 AM", name: "HIIT Training", coach: "Emily Roberts" },
      { time: "12:00 PM", name: "CrossFit", coach: "David Lee" },
      { time: "03:00 PM", name: "Strength Training", coach: "James Wilson" },
      { time: "07:00 PM", name: "Athletic Conditioning", coach: "David Lee" }
    ],
    FRI: [
      { time: "07:00 AM", name: "HIIT Training", coach: "Emily Roberts" },
      { time: "09:00 AM", name: "Yoga Flow", coach: "Sophia Miller" },
      { time: "12:00 PM", name: "Strength Training", coach: "James Wilson" },
      { time: "03:00 PM", name: "CrossFit", coach: "David Lee" },
      { time: "07:00 PM", name: "Body Pump", coach: "Emily Roberts" }
    ],
    SAT: [
      { time: "09:00 AM", name: "Yoga Balance", coach: "Sophia Miller" },
      { time: "11:00 AM", name: "CrossFit Team Challenge", coach: "David Lee" },
      { time: "02:00 PM", name: "Heavy Squats Mechanics", coach: "James Wilson" }
    ],
    SUN: [
      { time: "10:00 AM", name: "Stretch & Mobilize", coach: "Sophia Miller" },
      { time: "01:00 PM", name: "Elite Athlete Seminar", coach: "James Wilson" }
    ]
  };

  const handleBookNow = (className: string) => {
    setBookingConfirmed(className);
    canvasConfetti({
      particleCount: 50,
      spread: 40,
      colors: ["#ccff00", "#ffffff"]
    });
  };

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse" />
            <span className="font-mono text-[9px] text-neon-lime tracking-widest uppercase">
              FACILITY SCHEDULE // WEEKLY TIMETABLE
            </span>
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            OUR <span className="text-neon-lime italic">CLASSES</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed mt-2">
            Browse through daily classes and book your slot. Ensure timely arrival so that our coaches can structure and align training loads perfectly.
          </p>
        </div>

        {/* WEEKDAYS CONTROLLER */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 font-mono text-xs select-none">
          {weekdays.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2.5 border rounded transition-all cursor-none ${
                activeDay === day
                  ? "bg-neon-lime text-black border-neon-lime font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                  : "bg-transparent border-white/5 text-neutral-400 hover:border-white/15 hover:text-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* SCHEDULE SLOT ITEMS GRID */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4 mb-24">
          {(scheduleData[activeDay] || []).map((slot, idx) => (
            <GlassCard 
              key={idx}
              glowColor="lime"
              className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-white/5 text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <span className="font-mono text-base font-black text-neon-lime border border-neon-lime/20 rounded bg-neon-lime/5 py-1 px-3 w-fit">
                  {slot.time}
                </span>
                
                <div className="flex flex-col gap-1">
                  <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wide">
                    {slot.name}
                  </h3>
                  <span className="text-xs text-neutral-400 font-sans">
                    Coach: <span className="text-white font-bold">{slot.coach}</span>
                  </span>
                </div>
              </div>

              <div className="self-start sm:self-auto">
                <CyberButton 
                  variant="lime" 
                  size="sm"
                  cornerSize={4}
                  onClick={() => handleBookNow(`${slot.name} (${activeDay})`)}
                >
                  BOOK NOW
                </CyberButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CONFIRMATION OVERLAY */}
        {bookingConfirmed && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="glass-panel-lime p-8 rounded-xl max-w-md w-full relative text-left font-mono">
              <span className="text-[9px] text-neon-lime tracking-widest block uppercase">// RESERVATION CONFIRMED</span>
              <h3 className="text-xl font-black text-white mt-2 uppercase">SLOT SECURED</h3>
              <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                You have successfully booked **{bookingConfirmed}**. Our coaches have been notified and are preparing your workout profile.
              </p>
              <div className="mt-6">
                <CyberButton variant="lime" size="sm" onClick={() => setBookingConfirmed(null)} cornerSize={4}>
                  DISMISS LOG
                </CyberButton>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
