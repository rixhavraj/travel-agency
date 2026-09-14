"use client";

import React, { useState } from "react";
import { ShoppingBag, Plus, Minus, Trash2, X, Activity } from "lucide-react";
import CyberButton from "@/components/ui/CyberButton";
import GlassCard from "@/components/ui/GlassCard";
import canvasConfetti from "canvas-confetti";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function Shop() {
  const [filter, setFilter] = useState("ALL");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["ALL", "SUPPLEMENTS", "ACCESSORIES", "APPAREL", "EQUIPMENT"];

  const products = [
    {
      id: "sup-protein",
      name: "WHEY PROTEIN",
      category: "SUPPLEMENTS",
      desc: "Premium quality micro-filtered muscle builder isolate to support quick tissue reconstruction.",
      price: 49.99,
      stat: "25G PROTEIN / SERVING"
    },
    {
      id: "sup-creatine",
      name: "CREATINE MONOHYDRATE",
      category: "SUPPLEMENTS",
      desc: "Vibrant pure micronized power optimizer. Boosts cellular energy output during heavy load compound lifts.",
      price: 24.99,
      stat: "100% PURE MONOHYDRATE"
    },
    {
      id: "app-tshirt",
      name: "GYM T-SHIRT",
      category: "APPAREL",
      desc: "Sleek, lightweight, and athletic mesh fit crafted from pure resilient poly-cotton blends.",
      price: 19.99,
      stat: "ATHLETIC FIT MESH"
    },
    {
      id: "eq-belt",
      name: "WEIGHT BELT",
      category: "EQUIPMENT",
      desc: "Heavy-duty dual-pronged leather supporting belt to stabilize intra-abdominal pressure.",
      price: 24.99,
      stat: "10MM EMBOSSED LEATHER"
    },
    {
      id: "eq-dumbbell",
      name: "DUMBBELL SET",
      category: "EQUIPMENT",
      desc: "Commercial-grade hexagonal dumbbells coated in premium sound-insulating resilient rubber.",
      price: 129.99,
      stat: "2.5KG - 25KG OPTIONS"
    },
    {
      id: "acc-shaker",
      name: "SHAKER BOTTLE",
      category: "ACCESSORIES",
      desc: "Leakproof high-volume liquid storage accessory featuring a custom surgical steel mixing grid.",
      price: 8.99,
      stat: "700ML CAPACITY"
    }
  ];

  const handleAddToCart = (prod: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.id === prod.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: prod.id, name: prod.name, price: prod.price, qty: 1 }];
    });
    
    // Confetti blip
    canvasConfetti({
      particleCount: 20,
      spread: 30,
      colors: ["#ccff00", "#ffffff"]
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = filter === "ALL" 
    ? products 
    : products.filter((p) => p.category === filter);

  return (
    <div className="relative overflow-hidden w-full py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start gap-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-neon-lime/20 rounded-full bg-black/60 w-fit font-mono text-[9px] text-neon-lime tracking-widest uppercase">
              // GYMPRO MERCHANDISE TERMINAL
            </div>
            <h1 className="font-mono text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
              GYMPRO <span className="text-neon-lime italic">SHOP</span>
            </h1>
            <p className="text-sm text-neutral-400 max-w-xl leading-relaxed mt-2">
              Optimize your performance from the inside out. Purchase high-quality supplements, premium gear, and clothing lines.
            </p>
          </div>

          {/* CART TOGGLE */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 border border-white/10 rounded-sm py-2.5 px-6 bg-black/60 text-white hover:border-neon-lime hover:text-neon-lime transition-all cursor-none font-mono text-xs relative select-none w-fit self-start md:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>CART INDEX</span>
            <span className="bg-neon-lime text-black font-black px-1.5 py-0.5 rounded text-[10px]">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          </button>
        </div>

        {/* INTERACTIVE SHOPPING CATEGORIES */}
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

        {/* PRODUCT ITEMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredProducts.map((prod) => (
            <GlassCard
              key={prod.id}
              glowColor="lime"
              className="p-6 text-left flex flex-col justify-between min-h-[380px]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] bg-white/5 border border-white/10 rounded px-2 py-0.5 text-neutral-400">
                    {prod.id.toUpperCase()}
                  </span>
                  <span className="font-mono text-[8px] text-neon-lime uppercase tracking-widest">
                    {prod.category}
                  </span>
                </div>

                <div className="flex flex-col gap-2 font-mono">
                  <h3 className="text-base font-black text-white uppercase tracking-wide">
                    {prod.name}
                  </h3>
                  <span className="text-xs text-neon-lime font-semibold leading-none">{prod.stat}</span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {prod.desc}
                </p>
              </div>

              {/* Purchase Details */}
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 font-mono">
                <div className="flex flex-col">
                  <span className="text-[8px] text-neutral-500 block uppercase">EST. TARIFF</span>
                  <span className="text-2xl font-black text-white block">${prod.price}</span>
                </div>

                <CyberButton
                  variant="lime"
                  size="sm"
                  onClick={() => handleAddToCart(prod)}
                  cornerSize={6}
                >
                  ADD TO CART
                </CyberButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* SIDE BAR SHOPPING CART SLIDE OVER */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-md h-full bg-neutral-950 border-l border-white/10 p-6 flex flex-col justify-between font-mono relative">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-neon-lime" />
                  <span className="text-base font-black text-white">SHOPPING CART</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 border border-white/10 rounded-sm bg-black/40 text-neutral-400 hover:text-white cursor-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cart items list */}
              <div className="flex-grow overflow-y-auto py-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 text-xs gap-3">
                    <Activity className="w-8 h-8 text-white/20 animate-pulse" />
                    <span>SECURE CART IS EMPTY.<br />QUEUE ITEMS TO INITIATE PURCHASE.</span>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border border-white/5 bg-white/5 rounded-sm flex items-center justify-between gap-4 text-xs animate-pulse"
                    >
                      <div className="flex flex-col gap-1 text-left">
                        <span className="text-white font-bold uppercase">{item.name}</span>
                        <span className="text-[10px] text-neon-lime">${item.price} each</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border border-white/10 rounded bg-black/60 px-1 py-0.5">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="text-neutral-400 hover:text-white px-1 cursor-none"
                          >
                            -
                          </button>
                          <span className="text-white font-bold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="text-neutral-400 hover:text-white px-1 cursor-none"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-450 p-1 cursor-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer pricing details */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-6 flex flex-col gap-4 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>NET PRICE:</span>
                    <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-white/10 pt-4 text-sm text-white font-bold">
                    <span>TOTAL DUE:</span>
                    <span className="text-neon-lime">${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <CyberButton
                      variant="lime"
                      size="md"
                      className="w-full text-center"
                      onClick={() => {
                        setCart([]);
                        setIsCartOpen(false);
                        canvasConfetti({
                          particleCount: 150,
                          spread: 90,
                          origin: { y: 0.5 },
                        });
                      }}
                    >
                      SECURE CHECKOUT
                    </CyberButton>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
