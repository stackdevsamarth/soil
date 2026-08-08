"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ShieldCheck, CheckCircle2, Leaf, Sparkles, Activity, ArrowUpRight, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const nutrientData = [
  { label: "Nitrogen", status: "Adequate", score: "+25", color: "text-[#7CBF35]", advice: "Optimal leaf growth support" },
  { label: "Phosphorus", status: "Low", score: "-15", color: "text-rose-500 font-bold", advice: "Add Rock Phosphate or DAP" },
  { label: "Potassium", status: "Adequate", score: "+20", color: "text-[#7CBF35]", advice: "Drought resistance high" },
  { label: "Organic Matter", status: "High", score: "+30", color: "text-[#7CBF35]", advice: "Rich microbial activity" },
];

export function HeroSection() {
  const [selectedNutrient, setSelectedNutrient] = useState<number>(1); // Phosphorus selected by default

  const currentNutrient = nutrientData[selectedNutrient];

  return (
    <section className="relative min-h-[95vh] md:min-h-screen flex items-center pt-28 md:pt-36 pb-32 overflow-hidden bg-[#F8F8F4] dark:bg-[#021B0F]">

      {/* Layered Background Elements */}
      {/* 1. Organic Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#7CBF35]/15 via-[#A5D65A]/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* 2. Precision Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(#3a6b2a 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 3. Subtle Ambient Light Leaks */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#7CBF35]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left max-w-2xl lg:col-span-7 pt-4"
          >
            {/* Organic Floating Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1EC] dark:bg-white/10 border border-[#7CBF35]/30 text-[#021B0F] dark:text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7CBF35] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7CBF35]"></span>
              </span>
              <span>Next-Gen Soil Intelligence</span>
              <Sparkles className="w-3.5 h-3.5 text-[#7CBF35]" />
            </motion.div>

            <h1 className="font-heading font-extrabold tracking-tighter leading-[1.02] mb-6 uppercase flex flex-col items-start relative">
              <span className="text-[#021B0F] dark:text-white whitespace-nowrap text-[clamp(2.4rem,6.5vw,5.5rem)] drop-shadow-sm">
                KNOW YOUR SOIL,
              </span>
              <span className="flex items-center text-[#7CBF35] whitespace-nowrap text-[clamp(2.4rem,6.5vw,5.5rem)]">
                GROW YOUR YIELD.
                {/* Leaf icon inline at end of line */}
                <Leaf className="w-[0.85em] h-[0.85em] ml-2 md:ml-3 text-[#7CBF35] fill-[#7CBF35] -mt-1 rotate-12 shrink-0 animate-float" />
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-[#102117] dark:text-emerald-100 mb-4 tracking-tight">
              Healthy Soil. Stronger Farms. Better Future.
            </h2>

            <p className="text-[#5B665E] dark:text-zinc-300 text-base md:text-lg mb-10 leading-relaxed font-medium max-w-lg">
              Get instant soil analysis right from your phone. Scan a simple indicator card to check Nitrogen, Phosphorus, Potassium, and pH levels in seconds, not weeks.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Link href="/scan" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 md:h-16 px-8 bg-gradient-to-r from-[#7CBF35] to-[#68ab24] hover:from-[#88cd3f] hover:to-[#73b82d] text-white font-bold text-base md:text-lg rounded-2xl shadow-[0_10px_30px_-5px_rgba(124,191,53,0.45)] transition-all hover:scale-[1.02] active:scale-98 uppercase tracking-wider font-heading flex items-center justify-center gap-2 group">
                  <Leaf className="h-5 w-5 group-hover:rotate-12 transition-transform" /> Start Scanning
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-8 border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 text-[#102117] dark:text-white rounded-2xl text-base md:text-lg font-bold uppercase tracking-wider font-heading transition-all shadow-sm hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2">
                <Play className="h-4 w-4 fill-[#102117] dark:fill-white text-[#102117] dark:text-white" /> See how it works
              </Button>
            </div>

            {/* Trust indicators pill */}
            <div className="flex bg-white/90 dark:bg-[#0A2616]/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_15px_35px_-10px_rgba(2,27,15,0.08)] border border-[#EBF1EC] dark:border-emerald-500/20 items-center justify-between gap-6 md:gap-10 w-full max-w-[480px]">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#7CBF35] to-[#5a9c1e] text-white p-2 rounded-xl shadow-md">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-black text-[#102117] dark:text-white font-heading leading-tight whitespace-nowrap">Lab-Grade</span>
                  <span className="text-[10px] md:text-xs text-[#5B665E] dark:text-zinc-400 uppercase tracking-widest font-bold whitespace-nowrap">Accuracy</span>
                </div>
              </div>

              <div className="w-px h-10 bg-[#D1DFD5] dark:bg-emerald-500/20" />

              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#7CBF35] to-[#5a9c1e] text-white p-2 rounded-xl shadow-md">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-black text-[#102117] dark:text-white font-heading uppercase leading-tight tracking-tight whitespace-nowrap">Tested by</span>
                  <span className="text-[10px] md:text-xs text-[#5B665E] dark:text-zinc-400 uppercase tracking-widest font-bold whitespace-nowrap">Farmers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Visual Mockup / Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:flex lg:col-span-5 relative h-[620px] items-center justify-center"
          >
            {/* Ambient Backdrop Spotlight */}
            <div className="absolute w-72 h-72 bg-[#7CBF35]/25 rounded-full blur-[90px] pointer-events-none" />

            {/* Floating Decorative Badges around Phone */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-6 z-30 bg-white/95 dark:bg-[#0A2616]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-black/8 dark:border-white/10 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#7CBF35]/15 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#7CBF35]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B665E] dark:text-zinc-400">Scan Time</p>
                <p className="text-xs font-black text-[#102117] dark:text-white">Under 10 Sec</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 -right-6 z-30 bg-white/95 dark:bg-[#0A2616]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-black/8 dark:border-white/10 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#7CBF35] text-white flex items-center justify-center shadow-md">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B665E] dark:text-zinc-400">NPK Balance</p>
                <p className="text-xs font-black text-[#7CBF35]">Calibrated AI</p>
              </div>
            </motion.div>

            {/* App Mockup Phone Shell */}
            <div className="relative w-full max-w-[320px] aspect-[1/2] bg-zinc-950 rounded-[44px] p-3 shadow-[0_30px_70px_-15px_rgba(2,27,15,0.4)] border-[6px] border-zinc-800/80 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 group">

              {/* Phone Outer Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-950 rounded-b-xl z-30 flex items-center justify-center">
                <div className="w-10 h-1 bg-zinc-800 rounded-full" />
              </div>

              {/* App Screen Content */}
              <div className="bg-[#F8F8F4] dark:bg-[#051C10] h-full w-full rounded-[34px] p-4 pt-8 flex flex-col relative overflow-hidden text-foreground">

                {/* Wavy gradient + Real Unsplash Crop background inside app header */}
                <div className="absolute top-0 left-0 w-full h-36 z-0 rounded-b-[40px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
                    alt="Fertile agricultural soil"
                    className="w-full h-full object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#7CBF35]/30 to-[#F8F8F4] dark:to-[#051C10]" />
                </div>

                <h3 className="text-center font-bold text-foreground dark:text-white mb-3 text-xs tracking-wider uppercase relative z-10 flex items-center justify-center gap-1">
                  <span>Soil Health Score</span>
                  <span className="text-[9px] text-[#7CBF35] font-mono">(Interactive)</span>
                </h3>

                {/* Circular Score Ring */}
                <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center rounded-full border-[8px] border-[#EBF1EC] dark:border-emerald-950 border-t-[#7CBF35] shadow-inner z-10 bg-white dark:bg-[#0A2616] cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-center">
                    <span className="text-3xl font-black text-[#102117] dark:text-white tracking-tight">82</span>
                    <p className="text-[10px] font-bold text-[#7CBF35] uppercase tracking-widest">Good</p>
                  </div>
                </div>

                {/* Interactive Nutrient Status List */}
                <div className="space-y-2 flex-1 relative z-10 bg-white/80 dark:bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[9px] font-bold text-[#5B665E] dark:text-zinc-400 uppercase tracking-widest">
                      Nutrient Status
                    </p>
                    <span className="text-[9px] text-[#7CBF35] font-bold">Tap to test</span>
                  </div>

                  {nutrientData.map((item, i) => {
                    const isSelected = selectedNutrient === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedNutrient(i)}
                        className={`w-full flex justify-between items-center text-[11px] font-semibold p-1.5 rounded-lg transition-all text-left ${isSelected
                          ? "bg-[#7CBF35]/15 border border-[#7CBF35]/40"
                          : "hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.status === 'Low' ? 'bg-rose-500 animate-pulse' : 'bg-[#7CBF35]'}`} />
                          <span className="text-[#102117] dark:text-zinc-200">{item.label}</span>
                        </div>
                        <span className={item.color}>{item.status}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Suggestion Card based on Selected Nutrient */}
                <motion.div
                  key={selectedNutrient}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 bg-white dark:bg-[#0A2616] p-3 rounded-xl border border-[#EBF1EC] dark:border-emerald-500/20 shadow-sm flex items-center justify-between relative z-10"
                >
                  <div>
                    <p className="text-[9px] text-[#5B665E] dark:text-zinc-400 uppercase font-bold tracking-wider">
                      Recommendation ({currentNutrient.label})
                    </p>
                    <p className="text-xs font-bold text-[#102117] dark:text-white">
                      {currentNutrient.advice}
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#7CBF35]/15 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-[#7CBF35]" />
                  </div>
                </motion.div>

              </div>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Decorative Wavy Bottom Separator */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <svg viewBox="0 0 1440 160" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0,60 C320,140 420,10 720,60 C1020,120 1120,20 1440,60 L1440,160 L0,160 Z" fill="#7CBF35" opacity="0.25"></path>
          <path d="M0,80 C280,160 480,30 720,80 C960,140 1160,40 1440,80 L1440,160 L0,160 Z" fill="#7CBF35" opacity="0.65"></path>
          <path d="M0,110 C300,170 450,50 720,110 C990,170 1140,70 1440,110 L1440,160 L0,160 Z" fill="currentColor" className="text-[#FAF9F5] dark:text-[#051C10]"></path>
        </svg>
      </div>
    </section>
  );
}
