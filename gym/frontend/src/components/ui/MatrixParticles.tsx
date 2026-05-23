"use client";

import React, { useEffect, useRef } from "react";

interface MatrixParticlesProps {
  limeDensity?: number;
  purpleDensity?: number;
  interactive?: boolean;
}

export default function MatrixParticles({
  limeDensity = 35,
  purpleDensity = 35,
  interactive = true,
}: MatrixParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      baseAlpha: number;
      decay: number;

      constructor(color: string) {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.8 + 0.5;
        this.color = color;
        this.baseAlpha = Math.random() * 0.35 + 0.15;
        this.alpha = this.baseAlpha;
        this.decay = Math.random() * 0.005 + 0.002;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color.replace("ALPHA", this.alpha.toFixed(2));
        context.shadowBlur = this.radius * 2;
        context.shadowColor = this.color.replace("ALPHA", "0.8");
        context.fill();
        context.shadowBlur = 0; // reset
      }

      update(width: number, height: number, mouse: { x: number; y: number; radius: number }) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Pulse alpha gently
        this.alpha += this.decay;
        if (this.alpha > this.baseAlpha + 0.1 || this.alpha < this.baseAlpha - 0.1) {
          this.decay = -this.decay;
        }

        // Mouse interactivity
        if (interactive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Push particles slightly away
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const totalDensity = limeDensity + purpleDensity;
      const count = Math.min(200, Math.floor((window.innerWidth * window.innerHeight) / 9000));
      
      const limeRatio = limeDensity / totalDensity;
      const limeCount = Math.floor(count * limeRatio);
      const purpleCount = count - limeCount;

      // Neon Lime Particles (rgba format with ALPHA placeholder for dynamic opacity)
      for (let i = 0; i < limeCount; i++) {
        particles.push(new Particle("rgba(204, 255, 0, ALPHA)"));
      }

      // Neon Purple Particles
      for (let i = 0; i < purpleCount; i++) {
        particles.push(new Particle("rgba(168, 85, 247, ALPHA)"));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const mouse = mouseRef.current;

      // Draw interactive neon connections between close particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height, mouse);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Choose link color (blend or inherit)
            const opacity = (1 - dist / 90) * 0.08;
            ctx.strokeStyle = particles[i].color.includes("204") 
              ? `rgba(204, 255, 0, ${opacity})`
              : `rgba(168, 85, 247, ${opacity})`;
            
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [limeDensity, purpleDensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
