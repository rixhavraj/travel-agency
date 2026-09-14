"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const schedulerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Ambient Low Frequency Pad Node
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(110, ctx.currentTime); // Low A note
      gain.gain.setValueAtTime(0.02, ctx.currentTime); // Very soft

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      ambientOscRef.current = osc;
      ambientGainRef.current = gain;

      // 2. Rhythmic Cyber Synth blips scheduler
      let step = 0;
      schedulerIntervalRef.current = setInterval(() => {
        if (ctx.state === "suspended") return;

        // Sequence pitches: A2 (110Hz), C3 (130Hz), E3 (164Hz), G3 (196Hz)
        const scale = [110, 130, 164, 196, 220, 196, 164, 130];
        const freq = scale[step % scale.length];

        const blipOsc = ctx.createOscillator();
        const blipGain = ctx.createGain();

        blipOsc.type = "triangle";
        blipOsc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Soft volume envelope
        blipGain.gain.setValueAtTime(0.015, ctx.currentTime);
        blipGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        blipOsc.connect(blipGain);
        blipGain.connect(ctx.destination);

        blipOsc.start();
        blipOsc.stop(ctx.currentTime + 0.35);

        step++;
      }, 400); // 150 BPM sync tempo

    } catch (e) {
      // Browser blocks or no audio support
    }
  };

  const handleToggle = () => {
    if (!audioCtxRef.current) {
      initSynth();
      setIsPlaying(true);
      return;
    }

    const ctx = audioCtxRef.current;
    if (isPlaying) {
      ctx.suspend().then(() => setIsPlaying(false));
    } else {
      ctx.resume().then(() => setIsPlaying(true));
    }
  };

  useEffect(() => {
    return () => {
      if (ambientOscRef.current) {
        try {
          ambientOscRef.current.stop();
        } catch(e) {}
      }
      if (schedulerIntervalRef.current) {
        clearInterval(schedulerIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 font-mono text-[9px] select-none">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2.5 border rounded-full px-4 py-2.5 bg-black/80 shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer ${
          isPlaying
            ? "border-neon-lime text-neon-lime shadow-[0_0_20px_rgba(204,255,0,0.25)]"
            : "border-white/10 text-muted-text hover:border-white/20 hover:text-white"
        }`}
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        <span className="uppercase tracking-wider font-bold">
          {isPlaying ? "AMBIENT SYNCED [ON]" : "SYSTEM AMBIENT [OFF]"}
        </span>

        {/* Dancing frequency bars indicator */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 w-6 overflow-hidden">
            <span className="w-0.5 bg-neon-lime animate-[pulse_0.6s_infinite_alternate]" style={{ height: "40%" }} />
            <span className="w-0.5 bg-neon-lime animate-[pulse_0.4s_infinite_alternate]" style={{ height: "80%" }} />
            <span className="w-0.5 bg-neon-lime animate-[pulse_0.8s_infinite_alternate]" style={{ height: "60%" }} />
            <span className="w-0.5 bg-neon-lime animate-[pulse_0.5s_infinite_alternate]" style={{ height: "30%" }} />
          </div>
        )}
      </button>
    </div>
  );
}
