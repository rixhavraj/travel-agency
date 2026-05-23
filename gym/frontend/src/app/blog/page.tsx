"use client";

import React, { useState } from "react";
import { Calendar, User, Clock, ChevronRight, MessageSquare, Send, Plus, Lock, Check } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

interface CommunityBlog {
  title: string;
  author: string;
  date: string;
  desc: string;
  category: string;
}

interface ChatMessage {
  author: string;
  text: string;
  time: string;
  isStaff: boolean;
}

export default function Blog() {
  const [activeTab, setActiveTab] = useState<"articles" | "community">("articles");
  const [userRole, setUserRole] = useState<"visitor" | "member">("visitor");
  const [filter, setFilter] = useState("ALL");
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  // Chat inputs state
  const [chatInput, setChatInput] = useState("");
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([
    { author: "JAMES WILSON", text: "Heavy leg session today! Who is joining at 5 PM?", time: "02:10 PM", isStaff: true },
    { author: "VALERIE V.", text: "I'll be there, James! Let's hit some heavy squats.", time: "02:12 PM", isStaff: false },
    { author: "SOPHIA MILLER", text: "Don't forget to sync your heart rate indexes before warm-up!", time: "02:15 PM", isStaff: true },
    { author: "JOHN D.", text: "GymPro changed my recovery entirely. Standard plan diet protocols are working wonders.", time: "02:18 PM", isStaff: false }
  ]);

  // Community blogs state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("FITNESS");
  const [blogContent, setBlogContent] = useState("");
  const [communityBlogs, setCommunityBlogs] = useState<CommunityBlog[]>([
    {
      title: "My 3-Month Transformation Journey",
      author: "John D.",
      date: "May 22, 2026",
      desc: "How structured training logs and elite community trainers helped me gain 6kg of lean muscle mass in 90 days.",
      category: "FITNESS"
    },
    {
      title: "Why Heavy Compounds Are Crucial",
      author: "Valerie V.",
      date: "May 19, 2026",
      desc: "Exploring biomechanical stress, central nervous system load, and long-term strength advantages of compound bars.",
      category: "FITNESS"
    }
  ]);

  const categories = ["ALL", "FITNESS", "NUTRITION", "MOTIVATION"];

  const mainPost = {
    title: "5 TIPS TO MAXIMIZE YOUR WORKOUT",
    author: "Admin",
    date: "May 10, 2026",
    desc: "Achieving your gym goals requires more than just pushing iron. Discover these five crucial steps to structure training load, optimize breathing rhythms, build solid muscular endurance, and quicken structural tissue repairs effectively.",
    readTime: "8 MINS"
  };

  const recentPosts = [
    {
      title: "Nutrition Guide for Muscle Gain",
      date: "May 8, 2026",
      desc: "Essential macronutrient splits, amino hydration protocols, and meal planning to optimize mass and strength gains.",
      category: "NUTRITION"
    },
    {
      title: "Best Pre-Workout Meals",
      date: "May 5, 2026",
      desc: "Top food and supplement combinations to fuel explosive lifts, maximize nitric oxide pathways, and bypass mid-session fatigue index.",
      category: "NUTRITION"
    },
    {
      title: "How to Stay Motivated Everyday",
      date: "May 2, 2026",
      desc: "Dismantling cognitive fatigue barriers, establishing solid gym habits, and keeping a long-term legendary state of mind.",
      category: "MOTIVATION"
    }
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    if (userRole === "visitor") {
      setShowUnlockModal(true);
      return;
    }

    const newMsg: ChatMessage = {
      author: "PREMIUM MEMBER (YOU)",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStaff: false
    };

    setChatLogs(prev => [...prev, newMsg]);
    setChatInput("");
    
    // Confetti pop
    canvasConfetti({
      particleCount: 30,
      spread: 40,
      colors: ["#ccff00", "#ffffff"]
    });
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) return;

    if (userRole === "visitor") {
      setShowUnlockModal(true);
      return;
    }

    const newBlog: CommunityBlog = {
      title: blogTitle,
      author: "Premium Member (You)",
      date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
      desc: blogContent,
      category: blogCategory
    };

    setCommunityBlogs(prev => [newBlog, ...prev]);
    setBlogTitle("");
    setBlogContent("");

    canvasConfetti({
      particleCount: 100,
      spread: 70,
      colors: ["#ccff00", "#ffffff"]
    });
  };

  const filteredRecents = filter === "ALL" 
    ? recentPosts 
    : recentPosts.filter(p => p.category === filter);

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ROLE INDICATOR SWITCHER */}
        <div className="mb-12 bg-neutral-900 border border-white/10 rounded-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs select-none">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">// USER SESSION SIMULATOR</span>
            <span className="text-white mt-1">Currently simulating website interactions as a: <span className="text-neon-lime font-bold uppercase">{userRole}</span></span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setUserRole("visitor"); canvasConfetti({ particleCount: 10 }); }}
              className={`px-4 py-2 border rounded transition-all cursor-none ${
                userRole === "visitor" ? "bg-red-650 border-red-500 text-white font-bold" : "bg-transparent border-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              VISITOR (LOCKED)
            </button>
            <button
              onClick={() => { setUserRole("member"); canvasConfetti({ particleCount: 50 }); }}
              className={`px-4 py-2 border rounded transition-all cursor-none ${
                userRole === "member" ? "bg-neon-lime border-neon-lime text-black font-bold" : "bg-transparent border-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              PREMIUM MEMBER (UNLOCKED)
            </button>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit font-mono text-[9px] text-neon-lime tracking-widest uppercase">
            // GYMPRO CONVERSATIONS & INSIGHTS
          </div>
          <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            GYMPRO <span className="text-neon-lime italic">COMMUNITY</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed mt-2">
            Read professional articles written by our staff, or toggle to the Community board to chat live with our coaches and read member-written logs.
          </p>
        </div>

        {/* TAB CONTROLLERS */}
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-4 font-mono text-xs select-none">
          <button
            onClick={() => setActiveTab("articles")}
            className={`pb-4 border-b-2 transition-colors cursor-none ${
              activeTab === "articles" ? "border-neon-lime text-neon-lime font-black" : "border-transparent text-neutral-500 hover:text-white"
            }`}
          >
            GYMPRO ARTICLES
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`pb-4 border-b-2 transition-colors cursor-none flex items-center gap-1.5 ${
              activeTab === "community" ? "border-neon-lime text-neon-lime font-black" : "border-transparent text-neutral-500 hover:text-white"
            }`}
          >
            <span>MEMBER COMMUNITY & CHAT</span>
            <span className="bg-neon-lime text-black font-black px-1.5 py-0.5 rounded text-[8px]">
              LIVE
            </span>
          </button>
        </div>

        {/* TAB 1: ARTICLES */}
        {activeTab === "articles" && (
          <div>
            {/* LOG CATEGORY SELECTION */}
            <div className="flex flex-wrap items-center gap-4 mb-12 font-mono text-xs select-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 border rounded transition-all cursor-none ${
                    filter === cat
                      ? "bg-neon-lime text-black border-neon-lime font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                      : "bg-transparent border-white/5 text-neutral-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  // {cat}
                </button>
              ))}
            </div>

            {/* BLOG LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
              {/* LEFT: MAIN FEATURED POST */}
              {filter === "ALL" && (
                <div className="lg:col-span-8 text-left">
                  <GlassCard glowColor="lime" className="p-8 flex flex-col gap-6">
                    <div className="aspect-video relative rounded overflow-hidden border border-white/15 bg-neutral-900">
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-65"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    </div>

                    <div className="flex items-center gap-4 font-mono text-[9px] text-neutral-400">
                      <span className="bg-neon-lime text-black font-black px-2 py-0.5 rounded">FEATURED ARTICLE</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-neon-lime" /> {mainPost.date}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-neon-lime" /> {mainPost.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-neon-lime" /> {mainPost.readTime}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-mono text-2xl md:text-3xl font-black text-white uppercase tracking-wide leading-tight">
                        {mainPost.title}
                      </h3>
                    </div>

                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      {mainPost.desc}
                    </p>
                    
                    <div className="mt-4">
                      <CyberButton variant="lime" size="sm" cornerSize={4}>
                        READ MORE
                      </CyberButton>
                    </div>
                  </GlassCard>
                </div>
              )}

              {/* RIGHT: RECENT LIST SIDEBAR */}
              <div className={filter === "ALL" ? "lg:col-span-4" : "lg:col-span-12"}>
                <div className="flex flex-col gap-6 text-left">
                  <h4 className="font-mono text-xs text-white uppercase tracking-widest font-black border-l-2 border-neon-lime pl-3">
                    RECENT ARTICLES
                  </h4>

                  <div className="flex flex-col gap-6">
                    {filteredRecents.map((post, idx) => (
                      <GlassCard key={idx} glowColor="lime" className="p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center font-mono text-[9px] text-neutral-400">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-neon-lime" /> {post.date}</span>
                          <span className="text-neon-lime font-bold uppercase tracking-widest">{post.category}</span>
                        </div>

                        <h3 className="font-mono text-sm font-black text-white uppercase tracking-wide leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {post.desc}
                        </p>

                        <button className="font-mono text-[9px] text-neon-lime hover:text-white transition-colors cursor-none uppercase tracking-widest mt-2 flex items-center gap-1 w-fit">
                          <span>READ ARTICLE</span> <ChevronRight className="w-3 h-3" />
                        </button>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBER COMMUNITY & CHAT */}
        {activeTab === "community" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24 text-left">
            
            {/* LEFT: COMMUNITY BLOGS LIST & CREATOR */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Blog Creator Form */}
              <GlassCard glowColor="lime" className="p-6 relative overflow-hidden">
                <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-neon-lime" /> WRITE A COMMUNITY BLOG
                </h3>

                <form onSubmit={handleCreateBlog} className="flex flex-col gap-4 font-mono text-xs text-neutral-400">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="uppercase tracking-widest text-[9px] text-white">POST TITLE</label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="ENTER TITLE..."
                        className="bg-neutral-950 border border-white/10 rounded-sm py-2.5 px-3 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime cursor-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="uppercase tracking-widest text-[9px] text-white">CATEGORY</label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="bg-neutral-950 border border-white/10 rounded-sm py-2.5 px-3 text-white focus:outline-none focus:border-neon-lime cursor-none"
                      >
                        <option value="FITNESS">FITNESS</option>
                        <option value="NUTRITION">NUTRITION</option>
                        <option value="MOTIVATION">MOTIVATION</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="uppercase tracking-widest text-[9px] text-white">CONTENT</label>
                    <textarea
                      required
                      rows={3}
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="SHARE YOUR WORKOUT PROTOCOLS, MEALS, OR RESULTS..."
                      className="bg-neutral-950 border border-white/10 rounded-sm py-2.5 px-3 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime resize-none cursor-none"
                    />
                  </div>

                  <div className="mt-2">
                    <CyberButton type="submit" variant="lime" size="sm">
                      PUBLISH ARTICLE
                    </CyberButton>
                  </div>
                </form>

                {/* Visitor overlay blur */}
                {userRole === "visitor" && (
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 select-none">
                    <Lock className="w-8 h-8 text-neon-lime mb-2 animate-bounce" />
                    <span className="font-mono text-[10px] text-neon-lime uppercase font-black tracking-widest">// POSTING LOCKED</span>
                    <p className="text-xs text-neutral-400 max-w-xs mt-2 leading-relaxed">
                      Only premium GymPro members can publish blog logs to the community node. Upgrade your account today!
                    </p>
                    <button
                      onClick={() => setShowUnlockModal(true)}
                      className="mt-4 px-4 py-2 bg-neon-lime text-black font-bold rounded-sm hover:bg-white transition-all cursor-none font-mono text-[10px]"
                    >
                      UNLOCK PREMIUM ACCESS
                    </button>
                  </div>
                )}
              </GlassCard>

              {/* Community blogs list */}
              <div className="flex flex-col gap-6">
                <h4 className="font-mono text-xs text-white uppercase tracking-widest font-black border-l-2 border-neon-lime pl-3">
                  COMMUNITY ARTICLES
                </h4>

                <div className="flex flex-col gap-6">
                  {communityBlogs.map((post, idx) => (
                    <GlassCard key={idx} glowColor="lime" className="p-6 flex flex-col gap-4">
                      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-neon-lime" /> {post.date}</span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3 text-neon-lime" /> {post.author}</span>
                        </div>
                        <span className="text-neon-lime font-bold uppercase tracking-widest">{post.category}</span>
                      </div>

                      <h3 className="font-mono text-base font-black text-white uppercase tracking-wide leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {post.desc}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: COMMUNITY CHAT BOX */}
            <div className="lg:col-span-4 h-full">
              <GlassCard glowColor="lime" className="p-6 h-[500px] flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-neon-lime" />
                    <span className="font-mono text-xs font-black text-white tracking-widest uppercase">GYMPRO LIVE CHAT</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                </div>

                {/* Conversation logs */}
                <div className="flex-grow overflow-y-auto py-4 flex flex-col gap-3 font-mono text-[10px]">
                  {chatLogs.map((msg, idx) => (
                    <div key={idx} className="flex flex-col gap-1 text-left">
                      <div className="flex items-center gap-2 justify-between">
                        <span className={`text-[9px] font-bold ${msg.isStaff ? 'text-neon-lime' : 'text-white'}`}>
                          {msg.author} {msg.isStaff && <span className="bg-neon-lime/10 text-neon-lime px-1 rounded text-[7px] font-black">COACH</span>}
                        </span>
                        <span className="text-[7px] text-neutral-500">{msg.time}</span>
                      </div>
                      <p className="bg-white/5 border border-white/5 p-2 rounded text-neutral-300 leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Input block */}
                <form onSubmit={handleSendChat} className="border-t border-white/10 pt-4 flex gap-2 relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="SINK MESSAGE..."
                    className="flex-grow bg-neutral-950 border border-white/10 rounded-sm px-3 py-2 text-white placeholder-white/20 focus:outline-none focus:border-neon-lime text-[10px] cursor-none"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-neon-lime text-black rounded-sm border border-neon-lime hover:bg-white hover:border-white transition-all cursor-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  {/* Visitor overlay blur */}
                  {userRole === "visitor" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 text-center z-20 select-none">
                      <Lock className="w-4 h-4 text-neon-lime mr-1.5" />
                      <span className="font-mono text-[8px] text-neon-lime uppercase font-black tracking-wider">CHAT LOCKED</span>
                      <button
                        type="button"
                        onClick={() => setShowUnlockModal(true)}
                        className="ml-2 font-mono text-[8px] text-white hover:text-neon-lime underline transition-colors cursor-none"
                      >
                        JOIN CONVERSATION
                      </button>
                    </div>
                  )}
                </form>
              </GlassCard>
            </div>

          </div>
        )}

        {/* MEMBERSHIP CONVERSION MODAL */}
        {showUnlockModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="glass-panel-lime p-8 rounded-xl max-w-md w-full relative text-left font-mono border border-neon-lime/40">
              <span className="text-[9px] text-neon-lime tracking-widest block uppercase font-black">// PREMIUM CONVERSATION GATE</span>
              <h3 className="text-xl font-black text-white mt-2 uppercase">JOIN GYMPRO TODAY</h3>
              <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
                GymPro community chats and articles are restricted to premium members. Join standard or premium plans today to unlock full access, chat directly with coaches, and sync physical biometrics!
              </p>

              <div className="mt-4 p-4 border border-white/5 bg-white/5 rounded-sm flex flex-col gap-2 text-[10px] text-neutral-400">
                <div className="flex justify-between items-center">
                  <span>BASIC ACCESS TIER:</span>
                  <span className="text-white font-bold">$29/mo</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2 text-neon-lime font-bold">
                  <span>STANDARD (COACH SYNC):</span>
                  <span>$59/mo</span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    setShowUnlockModal(false);
                    // Redirect to pricing page
                    window.location.href = "/pricing";
                  }}
                  className="px-5 py-2.5 bg-neon-lime text-black font-bold rounded-sm hover:bg-white transition-all cursor-none text-[10px] font-mono"
                >
                  UPGRADE NOW
                </button>
                <button
                  onClick={() => setShowUnlockModal(false)}
                  className="px-5 py-2.5 border border-white/10 text-neutral-400 rounded-sm hover:text-white hover:border-white transition-all cursor-none text-[10px] font-mono"
                >
                  DISMISS LOG
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
