"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Enable custom cursor styles on body
    document.body.classList.add("custom-cursor-enabled");

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Listeners for checking interactive hover status
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-cursor'
      );
      
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    // Setup initial listeners
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Watch for dynamic updates to DOM
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverListeners();

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Animate the smooth trailing ring
  useEffect(() => {
    const animateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease calculation (0.15 makes it drag smoothly behind the cursor)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      requestRef.current = requestAnimationFrame(animateTrail);
    };

    requestRef.current = requestAnimationFrame(animateTrail);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position]);

  if (hidden) return null;

  return (
    <>
      {/* Background follow-light torch overlay */}
      <div
        className="fixed pointer-events-none z-30 inset-0 mix-blend-screen opacity-10 transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(circle 250px at ${position.x}px ${position.y}px, rgba(204, 255, 0, 0.4), rgba(168, 85, 247, 0.15), transparent)`,
        }}
      />

      {/* Futuristic Target Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-lime pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 hidden lg:block shadow-[0_0_8px_#ccff00]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          scale: isClicked ? 0.6 : 1,
        }}
      />

      {/* Trailing Targeting Reticle Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-all duration-300 ${
          isHovered
            ? "w-10 h-10 border-neon-purple bg-neon-purple/5 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
            : "w-6 h-6 border-neon-lime bg-transparent shadow-[0_0_6px_rgba(204,255,0,0.15)]"
        }`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          scale: isClicked ? 1.3 : 1,
        }}
      >
        {/* Neon target cross-hair ticks inside trailing ring */}
        {isHovered && (
          <>
            <div className="absolute top-0 left-1/2 w-[1px] h-1.5 bg-neon-purple transform -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-[1px] h-1.5 bg-neon-purple transform -translate-x-1/2" />
            <div className="absolute left-0 top-1/2 h-[1px] w-1.5 bg-neon-purple transform -translate-y-1/2" />
            <div className="absolute right-0 top-1/2 h-[1px] w-1.5 bg-neon-purple transform -translate-y-1/2" />
          </>
        )}
      </div>
    </>
  );
}
