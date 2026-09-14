"use client";

import React, { useState, useRef, MouseEvent } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "lime" | "purple" | "silver" | "none";
  tiltAmount?: number;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "silver",
  tiltAmount = 15,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Set rotation degrees
    setRotateX(-mouseY * tiltAmount);
    setRotateY(mouseX * tiltAmount);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Determine glow borders
  const getGlowStyles = () => {
    switch (glowColor) {
      case "lime":
        return "border-[rgba(204,255,0,0.15)] hover:border-[rgba(204,255,0,0.4)] shadow-[rgba(204,255,0,0.02)_0px_0px_20px] hover:shadow-[rgba(204,255,0,0.08)_0px_0px_30px]";
      case "purple":
        return "border-[rgba(168,85,247,0.15)] hover:border-[rgba(168,85,247,0.4)] shadow-[rgba(168,85,247,0.02)_0px_0px_20px] hover:shadow-[rgba(168,85,247,0.08)_0px_0px_30px]";
      case "none":
        return "border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)]";
      case "silver":
      default:
        return "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.25)] shadow-[rgba(255,255,255,0.01)_0px_0px_20px] hover:shadow-[rgba(255,255,255,0.05)_0px_0px_30px]";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? "transform 0.05s ease-out" : "transform 0.5s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className={`glass-panel rounded-xl overflow-hidden backdrop-blur-md relative ${getGlowStyles()} ${className}`}
    >
      {/* Dynamic reflective light overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${rotateY * 20 + 50}% ${-rotateX * 20 + 50}%, rgba(255, 255, 255, 0.4), transparent)`,
          }}
        />
      )}
      
      {/* Corner HUD accent ticks */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
