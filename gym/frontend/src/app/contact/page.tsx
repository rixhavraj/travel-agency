"use client";

import React, { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    
    setSubmitted(true);
    
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      colors: ["#ccff00", "#ffffff"]
    });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitted(false);
  };

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit font-mono text-[9px] text-neon-lime tracking-widest uppercase">
            // CONNECTION TERMINAL PROTOCOLS
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            CONTACT <span className="text-neon-lime italic">US</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed mt-2">
            Have questions about pricing, programs, or coaches? Reach out directly using our contact form, or find our phone and address details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* LEFT: INFORMATION DETAILS */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <GlassCard glowColor="lime" className="p-6 flex flex-col gap-6">
              <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">// NODE DETAILS</span>
              
              <div className="flex flex-col gap-6 font-mono text-xs">
                {/* ADDRESS */}
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-neutral-900 border border-white/10 text-neon-lime mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-[9px] uppercase tracking-wider">ADDRESS</span>
                    <span className="text-white mt-1">123 Fitness Street, New York, NY 10001</span>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-neutral-900 border border-white/10 text-neon-lime mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-[9px] uppercase tracking-wider">PHONE</span>
                    <span className="text-white mt-1">+1 234 567 890</span>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-neutral-900 border border-white/10 text-neon-lime mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-[9px] uppercase tracking-wider">EMAIL</span>
                    <span className="text-white mt-1">info@gympro.com</span>
                  </div>
                </div>

                {/* HOURS */}
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded bg-neutral-900 border border-white/10 text-neon-lime mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-[9px] uppercase tracking-wider">HOURS</span>
                    <span className="text-white mt-1 leading-relaxed">
                      Mon - Fri: 6AM - 10PM <br />
                      Sat - Sun: 8AM - 8PM
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* RIGHT: CONTACT FORM MODULE */}
          <div className="lg:col-span-7">
            {submitted ? (
              <GlassCard glowColor="lime" className="p-8 text-left font-mono flex flex-col gap-6">
                <div className="w-12 h-12 rounded bg-neon-lime/10 border border-neon-lime flex items-center justify-center text-neon-lime">
                  <Check className="w-6 h-6 animate-pulse" />
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-neon-lime uppercase tracking-widest">// LOG CONFIGURED</span>
                  <h3 className="text-xl font-black text-white uppercase">MESSAGE CACHED</h3>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  Thank you, **{form.name}**. Your query has been successfully routed to our gym administration server. A support representative will email you back at **{form.email}** shortly.
                </p>

                <div className="mt-4">
                  <CyberButton variant="lime" size="sm" onClick={resetForm}>
                    OPEN NEW TICKET
                  </CyberButton>
                </div>
              </GlassCard>
            ) : (
              <GlassCard glowColor="lime" className="p-8 text-left">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono text-xs text-neutral-400">
                  <span className="text-[8px] uppercase tracking-widest block">// SEND INPUT PACKETS</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="uppercase tracking-widest text-[9px] text-white">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="ENTER NAME..."
                        className="bg-neutral-950 border border-white/10 rounded-sm py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime focus:shadow-[0_0_10px_rgba(204,255,0,0.15)] transition-all cursor-none"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="uppercase tracking-widest text-[9px] text-white">YOUR EMAIL</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ENTER EMAIL..."
                        className="bg-neutral-950 border border-white/10 rounded-sm py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime focus:shadow-[0_0_10px_rgba(204,255,0,0.15)] transition-all cursor-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="uppercase tracking-widest text-[9px] text-white">SUBJECT</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="ENTER SUBJECT..."
                      className="bg-neutral-950 border border-white/10 rounded-sm py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime focus:shadow-[0_0_10px_rgba(204,255,0,0.15)] transition-all cursor-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="uppercase tracking-widest text-[9px] text-white">YOUR MESSAGE</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="ENTER DETAILED MESSAGE..."
                      className="bg-neutral-950 border border-white/10 rounded-sm py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime focus:shadow-[0_0_10px_rgba(204,255,0,0.15)] transition-all cursor-none resize-none"
                    />
                  </div>

                  <div className="mt-4">
                    <CyberButton type="submit" variant="lime" size="md" className="w-full text-center">
                      SEND MESSAGE
                    </CyberButton>
                  </div>
                </form>
              </GlassCard>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
