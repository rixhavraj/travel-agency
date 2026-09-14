"use client";

import React, { MouseEvent } from "react";

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "lime" | "purple" | "silver" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  cornerSize?: number;
  glow?: boolean;
  cyberSound?: boolean;
}

export default function CyberButton({
  children,
  onClick,
  className = "",
  variant = "lime",
  size = "md",
  disabled = false,
  type = "button",
  cornerSize = 8,
  glow = true,
  cyberSound = true,
}: CyberButtonProps) {
  
  // Play dynamic synthesizer cyber sound using Web Audio API on click
  const playCyberSound = () => {
    if (!cyberSound) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Cyber blip synthesis
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "square";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.12);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Audio context permission or browser block silently ignored
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    playCyberSound();
    if (onClick) onClick(e);
  };

  // Resolve sizes
  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs font-mono tracking-wider",
    md: "px-6 py-2.5 text-sm font-mono tracking-widest uppercase",
    lg: "px-8 py-3.5 text-base font-mono tracking-widest uppercase font-semibold",
  };

  // Resolve styles
  const variantStyles = {
    lime: {
      bg: "bg-neon-lime text-black hover:bg-white",
      border: "border-neon-lime",
      shadow: "shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)]",
      clipBar: "bg-black",
    },
    purple: {
      bg: "bg-neon-purple text-white hover:bg-neon-lime hover:text-black",
      border: "border-neon-purple",
      shadow: "shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]",
      clipBar: "bg-white",
    },
    silver: {
      bg: "bg-transparent text-silver-text hover:bg-white hover:text-black",
      border: "border-white/20 hover:border-white",
      shadow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
      clipBar: "bg-neon-lime",
    },
    danger: {
      bg: "bg-red-600 text-white hover:bg-red-500",
      border: "border-red-600",
      shadow: "shadow-[0_0_15px_rgba(220,38,38,0.3)]",
      clipBar: "bg-black",
    },
  };

  const styles = variantStyles[variant];

  // Inline custom clip path for futuristic tech corners
  const clipPathString = `polygon(
    0px ${cornerSize}px, 
    ${cornerSize}px 0px, 
    100% 0px, 
    100% calc(100% - ${cornerSize}px), 
    calc(100% - ${cornerSize}px) 100%, 
    0px 100%
  )`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={{ clipPath: clipPathString }}
      className={`relative inline-flex items-center justify-center font-bold transition-all duration-300 border focus:outline-none cursor-none ${
        sizeClasses[size]
      } ${styles.bg} ${styles.border} ${glow ? styles.shadow : ""} ${
        disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
      } group ${className}`}
    >
      {/* Decorative inner HUD corner grid line */}
      <span className="absolute top-0.5 left-0.5 right-0.5 bottom-0.5 border border-white/5 pointer-events-none rounded-sm transition-all group-hover:border-black/10" />

      {/* Futuristic Corner Tech Indicator Ticks */}
      <span className="absolute top-0 right-0 w-1 h-1 bg-white/20 transition-colors group-hover:bg-black/20" />
      <span className="absolute bottom-0 left-0 w-1 h-1 bg-white/20 transition-colors group-hover:bg-black/20" />

      {/* Scanning laser glow line effect */}
      <span className="absolute inset-0 w-full h-[1px] bg-white/40 top-0 left-0 transform -translate-y-full group-hover:animate-scanline pointer-events-none" />

      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Mini technical bar indicator on bottom left */}
      <span
        style={{ width: "6px", height: "2px" }}
        className={`absolute bottom-1 left-2 transition-all ${styles.clipBar}`}
      />
    </button>
  );
}
