"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import CyberButton from "./ui/CyberButton";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Monitor scrolling to transition header density
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Coaches", path: "/coaches" },
    { name: "Pricing", path: "/pricing" },
  ];

  const dropdownLinks = [
    { name: "Classes", path: "/classes" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "404", path: "/not-found-page-test" },
  ];

  return (
    <>
      {/* Persistent Top Sale Banner */}
      <div className="fixed top-0 left-0 w-full h-[36px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-between px-4 lg:px-8 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase z-50 border-b border-white/10 select-none shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
        <div className="hidden md:flex items-center gap-2">
          <span className="animate-pulse text-yellow-300">🔥</span>
          <span className="text-white/90">HIGH-CONVERTING PREMIUM GYM WEBSITE FOR SALE</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 mx-auto md:mx-0">
          <span className="text-yellow-300 animate-pulse">🔔 FOR SALE:</span>
          <a href="tel:+919708169442" className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-all duration-300 px-2.5 py-1 rounded text-white border border-white/20 cursor-none">
            <svg className="w-3.5 h-3.5 text-neon-lime" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a1.003 1.003 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4.03C3.47 3 3 3.47 3 4.02 3 13.39 10.61 21 19.98 21c.55 0 1.02-.46 1.02-1.02v-3.6c0-.55-.45-1-1-1z"/>
            </svg>
            <span>+91 9708169442</span>
          </a>
          <a href="https://wa.me/919708169442?text=I%20am%20interested%20in%20buying%20the%20gym%20website" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/40 text-green-300 hover:text-white transition-all duration-300 px-2 py-1 rounded border border-green-500/30 cursor-none">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.219h.005c5.505 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.18-2.92-7.062a9.925 9.925 0 0 0-7.083-2.899zm5.228 14.18c-.286.8-1.42 1.487-1.954 1.547-.478.053-.948.163-3.05-.668-2.69-1.062-4.407-3.803-4.54-3.98-.135-.178-1.1-1.464-1.1-2.794 0-1.33.696-1.984.945-2.25.247-.268.544-.336.726-.336.182 0 .365.002.522.01.164.007.382-.062.597.45.222.527.76 1.85.826 1.983.065.132.11.286.022.463-.087.177-.132.287-.262.44-.132.155-.276.347-.393.465-.132.13-.27.273-.116.536.154.263.684 1.127 1.465 1.82.78.694 1.436.91 1.7.102.264-.103.527-.263.658-.464.133-.203.264-.13.395-.084.13.048.823.388.966.46.142.072.238.107.273.167.035.06.035.348-.25.1.15z"/>
            </svg>
            <span className="hidden sm:inline">WHATSAPP</span>
          </a>
        </div>
      </div>

      <header
        className={`fixed top-[36px] left-0 w-full z-45 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-1 group cursor-none">
          <span className="font-mono text-2xl font-black tracking-tighter text-white flex items-center">
            GYMPRO<span className="text-neon-lime group-hover:text-white transition-colors duration-300">.</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`font-mono text-[11px] uppercase tracking-widest relative py-1 cursor-none transition-colors duration-300 hover:text-white ${
                  isActive ? "text-neon-lime" : "text-muted-text"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-neon-lime shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                )}
              </Link>
            );
          })}

          {/* PAGES DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`font-mono text-[11px] uppercase tracking-widest py-1 cursor-none transition-colors duration-300 flex items-center gap-1 hover:text-white ${
                dropdownLinks.some(link => pathname === link.path) ? "text-neon-lime" : "text-muted-text"
              }`}
            >
              <span>Pages</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-2 w-48 bg-neutral-950 border border-white/10 p-2 shadow-2xl rounded-sm transition-all duration-300 ${
                isDropdownOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible pointer-events-none"
              }`}
            >
              {dropdownLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block font-mono text-[10px] uppercase tracking-wider py-2 px-3 hover:bg-white/5 rounded-sm transition-colors cursor-none ${
                      isActive ? "text-neon-lime" : "text-muted-text hover:text-white"
                    }`}
                  >
                    // {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919708169442"
            className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-white hover:text-neon-lime transition-all duration-300 px-3 py-1.5 rounded-sm border border-purple-500/50 bg-purple-950/20 hover:bg-purple-900/30 shadow-[0_0_12px_rgba(168,85,247,0.2)] cursor-none"
            title="Interested in buying this premium Next.js gym website? Contact Admin!"
          >
            <svg className="w-3.5 h-3.5 text-purple-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>BUY WEBSITE</span>
          </a>
          <Link href="/pricing" className="cursor-none">
            <CyberButton variant="lime" size="sm" cornerSize={4}>
              JOIN NOW
            </CyberButton>
          </Link>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/pricing" className="cursor-none">
            <CyberButton variant="lime" size="sm" cornerSize={4}>
              JOIN
            </CyberButton>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 border border-white/10 rounded-sm bg-black/40 text-white focus:outline-none"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-[106px] left-0 w-full h-[calc(100vh-106px)] bg-neutral-950 border-t border-white/10 z-40 transition-all duration-500 overflow-y-auto px-6 py-8 flex flex-col gap-8 justify-between lg:hidden ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-mono text-sm uppercase tracking-wider py-2 border-b border-white/5 flex items-center justify-between ${
                  isActive ? "text-neon-lime font-black" : "text-muted-text"
                }`}
              >
                {link.name}
                {isActive && <div className="w-2 h-2 rounded-full bg-neon-lime shadow-[0_0_8px_#ccff00]" />}
              </Link>
            );
          })}

          {/* Mobile Dropdown Category Header */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">// ADDITIONAL PAGES</span>
            <div className="grid grid-cols-2 gap-3 pl-2">
              {dropdownLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-mono text-[11px] uppercase py-1.5 ${
                      isActive ? "text-neon-lime" : "text-muted-text"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer inside mobile drawer */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[10px]">
          <a
            href="tel:+919708169442"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm border border-purple-500/50 bg-purple-950/30 text-purple-200 uppercase tracking-widest text-[10px]"
          >
            <svg className="w-3.5 h-3.5 text-purple-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>BUY WEBSITE: +91 9708169442</span>
          </a>
          <div className="flex justify-between items-center">
            <span className="text-muted-text">STATUS:</span>
            <span className="text-neon-lime">OPERATIONAL</span>
          </div>
          <div className="w-full text-center mt-2">
            <span className="text-[9px] text-muted-text tracking-widest uppercase">
              // BE LEGENDARY //
            </span>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}

