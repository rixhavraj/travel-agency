"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden w-full min-h-[70vh] py-20 bg-black text-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 relative z-10 text-center font-mono">
        <GlassCard glowColor="lime" className="p-8 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-neon-lime/10 border border-neon-lime flex items-center justify-center text-neon-lime animate-pulse">
            <Dumbbell className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white tracking-widest uppercase">404</h1>
            <h2 className="text-sm font-black text-neon-lime uppercase tracking-widest">// PAGE NOT FOUND</h2>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            The page you are looking for doesn't exist or has been moved to a secure partition index.
          </p>

          <div className="w-full mt-4">
            <Link href="/" className="cursor-none">
              <CyberButton variant="lime" size="sm" className="w-full text-center" cornerSize={4}>
                BACK TO HOME
              </CyberButton>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
