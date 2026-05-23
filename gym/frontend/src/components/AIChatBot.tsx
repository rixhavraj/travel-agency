"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Cpu, Bot, Sparkles } from "lucide-react";
import CyberButton from "./ui/CyberButton";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize introductory sales pitch upon opening the chatbot
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "🏋️ WELCOME TO GYMPRO! I am your GymPro AI Coach. Ready to take your physical training to the absolute peak?\n\n🔥 SPECIAL COMMERCIAL ANNOUNCEMENT: This high-performance premium fitness website is active and FOR SALE! Features include: (1) Instantaneous route loads with Next.js & Turbopack, (2) Elite local SEO targeting 'Gym in Greater Noida' searches, (3) Interactive Visitor vs. Premium Member blog community, and (4) Responsive, sleek cyberpunk design. Call/WhatsApp Admin directly at +91 9708169442 if you want to acquire this digital asset! \n\nType 'website benefits' or ask any questions about our gym plans!",
          timestamp: new Date().toTimeString().split(" ")[0]
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timestamp = new Date().toTimeString().split(" ")[0];
    const userMsg: ChatMessage = { sender: "user", text: input, timestamp };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Dynamic sales marketing responses matrix
    setTimeout(() => {
      let botText = "That's an excellent question! Joining GymPro gives you absolute value. Our Standard Plan ($59/mo) features personal training, custom diet planning, and unlimited equipment access. Ask me about our basic or premium plans to learn more!";
      const query = input.toLowerCase();

      if (query.includes("website") || query.includes("buy") || query.includes("sell") || query.includes("purchase") || query.includes("price") || query.includes("admin") || query.includes("contact") || query.includes("phone") || query.includes("9708169442")) {
        botText = "💼 BUY THIS WEBSITE TODAY!\n\nThis is a premier, battle-tested, high-converting digital product crafted with Next.js 16 and Tailwind CSS v4 variables. It is optimized for the local market in Greater Noida to dominate search engine results. \n\n⚡ KEY BENEFITS FOR BUSINESS OWNERS:\n• 📍 Search Engine Optimized for high-intent keywords like 'Best Gym in Greater Noida'\n• ⚡ Lightning-fast page loads and transitions using Turbopack pre-fetching\n• 🤖 Integrated AI Coach Chatbot that captures leads and closes plans\n• 💬 Fully working Interactive Member vs. Visitor blog & community simulator\n• 📱 Fully responsive layout optimized for all mobile viewports\n\n📞 CONTACT ADMIN DIRECTLY:\n• Call/WhatsApp: +91 9708169442\n• WhatsApp Link: https://wa.me/919708169442\n\nContact us now to negotiate and make it yours!";
      } else if (query.includes("membership") || query.includes("cost") || query.includes("join") || query.includes("fee") || query.includes("plan")) {
        botText = "GymPro offers 3 high-value tiers: (1) BASIC ($29/mo) for full equipment access, (2) STANDARD ($59/mo) which adds personal coaching and nutrition plans, and (3) PREMIUM ($89/mo) for unlimited group classes, 10h personal training, and priority VIP support. Yearly subscriptions save 20%! Join now to claim your slot.";
      } else if (query.includes("workout") || query.includes("train") || query.includes("program") || query.includes("specialty") || query.includes("greater noida")) {
        botText = "IRON NEXUS by GymPro is the #1 gym in Greater Noida! We offer tailored programs including Strength Training, Fat Burning, Body Building, CrossFit, Yoga Flow, and HIIT circuits. Each module lists precise specifications for load, frequency, and duration. Come down to Plot Alpha II, Greater Noida, or join online today!";
      } else if (query.includes("coach") || query.includes("trainer") || query.includes("staff") || query.includes("james") || query.includes("emily")) {
        botText = "Our trainers hold elite doctoral and master degrees in kinetics, human performance, and nutrition! James Wilson (Strength Coach), Emily Roberts (Yoga Director), David Lee (CrossFit), and Sophia Miller (HIIT) will structure and sync your workouts perfectly.";
      } else if (query.includes("supplement") || query.includes("protein") || query.includes("creatine") || query.includes("shop")) {
        botText = "Yes, our GymPro Shop features premium supplements: Whey Protein Isolate ($49.99) and Pure Creatine Monohydrate ($24.99) to optimize your biological fuel, alongside Hexagonal Dumbbells and accessories. Standard members get exclusive discounts!";
      } else if (query.includes("community") || query.includes("chat") || query.includes("blog") || query.includes("post")) {
        botText = "Premium GymPro members get exclusive access to our community blog and live chat boards! You can share your personal logs, request immediate guidance, and coordinate training slots directly with our coaches. Standard or Premium tiers unlock this instantly.";
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
        botText = "Hello! I am your GymPro AI Coach. Are you ready to build discipline, confidence, and absolute strength? What goals or price plans can I analyze for you today? (Note: If you're interested in buying this website, ask me about its benefits!)";
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botText, timestamp: new Date().toTimeString().split(" ")[0] }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono text-xs select-none">
      {isOpen ? (
        <div className="w-80 h-96 rounded-xl border border-neon-lime bg-black/95 shadow-[0_0_20px_rgba(204,255,0,0.25)] backdrop-blur-md flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="bg-white/5 border-b border-white/10 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-neon-lime" />
              <span className="font-bold text-white uppercase tracking-wider">GYMPRO AI COACH</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 max-w-[85%] ${
                  msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                }`}
              >
                <div className={`p-2 rounded border text-[10px] text-left leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-neon-lime/10 border-neon-lime text-white"
                    : "bg-white/5 border-white/10 text-neutral-200"
                }`}>
                  <p>{msg.text}</p>
                  <span className="text-[7px] text-neutral-500 block mt-1 text-right">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="self-start flex items-center gap-2 p-2 border border-white/5 bg-white/5 rounded text-[10px] text-neutral-400 animate-pulse">
                <span>COACH IS ANALYZING...</span>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Input field */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ASK ABOUT MEMBERSHIP & PLANS..."
              className="flex-grow bg-neutral-950 border border-white/10 rounded-sm px-3 py-1.5 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime text-[10px]"
            />
            <button
              type="submit"
              className="p-2 bg-neon-lime text-black rounded border border-neon-lime hover:bg-white hover:border-white transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full border border-neon-lime bg-black/80 flex items-center justify-center text-neon-lime hover:border-white hover:text-white shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all cursor-pointer relative"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-lime rounded-full border-2 border-black animate-ping" />
        </button>
      )}
    </div>
  );
}
