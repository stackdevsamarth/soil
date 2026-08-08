"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, MapPin, HelpCircle, TrendingDown, Layers, Search, AlertTriangle, ArrowDownRight, Sparkles, CheckCircle2 } from "lucide-react";

const problems = [
  {
    icon: FlaskConical,
    title: "Weeks of waiting",
    description: "Traditional lab reports take up to two weeks to return, missing the critical window for fertilization.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
    accentBg: "from-amber-500/20 to-orange-500/10",
    tag: "Time Delay",
    imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1000&q=80",
    detailText: "Soil chemistry changes rapidly after rainfall. Waiting 14 days for a lab report means your fertilizer decision is based on outdated data."
  },
  {
    icon: MapPin,
    title: "Distant testing centers",
    description: "Traveling to government or private labs costs farmers precious time and travel expenses.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
    accentBg: "from-[#7CBF35]/20 to-[#5a9c1e]/10",
    tag: "High Friction",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    detailText: "Farmers in remote villages often travel 40+ km to reach the nearest agricultural extension center, losing an entire day of field work."
  },
  {
    icon: HelpCircle,
    title: "Farming by guesswork",
    description: "Without knowing actual nutrient levels, farmers end up over-applying or under-applying fertilizers.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
    accentBg: "from-blue-500/20 to-indigo-500/10",
    tag: "Uncertainty",
    imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
    detailText: "Applying Nitrogen when your soil actually needs Phosphorus wastes up to 35% of fertilizer budget and stunts root growth."
  },
  {
    icon: TrendingDown,
    title: "Declining soil health",
    description: "Using the wrong fertilizer blend damages soil biology and reduces future crop yields.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
    accentBg: "from-rose-500/20 to-red-500/10",
    tag: "Long-term Harm",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
    detailText: "Excess urea turns soil acidic over consecutive seasons, killing beneficial earthworms and mycorrhizal fungi."
  },
];

const stats = [
  {
    icon: FlaskConical,
    label: "90% of Farms Untested",
    description: "Most smallholders have never had their soil tested, relying only on traditional routines.",
    color: "text-rose-400",
    bg: "bg-rose-500/15 border-rose-500/30",
  },
  {
    icon: TrendingDown,
    label: "Degraded Farmland",
    description: "Soil organic carbon levels are critically low across millions of hectares of agricultural land.",
    color: "text-amber-400",
    bg: "bg-amber-500/15 border-amber-500/30",
  },
  {
    icon: Layers,
    label: "Imbalanced Fertilization",
    description: "Over-application of urea destroys soil microbes and causes nutrient lockup.",
    color: "text-[#7CBF35]",
    bg: "bg-[#7CBF35]/15 border-[#7CBF35]/30",
  },
];

export function ProblemSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="solutions" className="pt-48 md:pt-56 pb-36 md:pb-48 relative overflow-hidden bg-memphis-light dark:bg-memphis-dark scroll-mt-36">
      
      {/* Decorative Memphis SVG Geometric Shapes */}
      <svg className="absolute top-12 left-8 w-28 h-28 text-[#7CBF35]/35 animate-float pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M10,50 Q25,20 40,50 T70,50 T100,50" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <circle cx="20" cy="20" r="7" fill="#7CBF35" />
        <circle cx="80" cy="80" r="9" fill="#021B0F" opacity="0.3" />
      </svg>

      <div className="absolute bottom-16 left-12 w-36 h-36 rounded-full border-4 border-dashed border-[#7CBF35]/35 animate-spin-slow pointer-events-none" />
      
      <svg className="absolute top-1/3 right-10 w-20 h-20 text-amber-500/35 animate-float pointer-events-none" viewBox="0 0 60 60" fill="currentColor">
        <polygon points="30,5 55,50 5,50" />
      </svg>

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-[600px] h-[600px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#7CBF35]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10 border-b border-black/8 dark:border-white/10 pb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#7CBF35]/15 border border-[#7CBF35]/35 text-[#7CBF35] text-xs md:text-sm font-bold uppercase tracking-wider mb-5 shadow-sm"
            >
              <Search className="h-4 w-4 text-[#7CBF35]" />
              <span>The Problem</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 uppercase tracking-tight text-[#021B0F] dark:text-white leading-[1.05]"
            >
              THE SCALE OF <br/>
              <span className="inline-block pr-3 pb-1 text-[#7CBF35] bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] via-[#94d64d] to-[#5a9c1e]">
                INDIA’S SOIL CRISIS
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[#5B665E] dark:text-zinc-300 text-lg md:text-2xl max-w-2xl font-medium leading-relaxed"
            >
              Healthy soil is the foundation of every successful harvest. Yet millions of hectares of farmland are losing fertility, leaving farmers to guess what their crops need.
            </motion.p>
          </div>
          
          {/* Top Large Graphic Banner - MASSIVE BOX & IMAGE (h-80 md:h-96) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[480px] h-80 md:h-96 rounded-[44px] overflow-hidden relative border-2 border-black/10 dark:border-white/15 shadow-2xl group cursor-pointer bg-[#0A2616] shrink-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80" 
              alt="Cracked soil in drought" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021B0F] via-transparent to-black/30" />
            
            <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#7CBF35] bg-black/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#7CBF35]/50 shadow-md">
                Field Data
              </span>
              <div className="w-12 h-12 rounded-full bg-amber-400/20 backdrop-blur-md flex items-center justify-center border border-amber-400/40 shadow-lg">
                <AlertTriangle className="w-6 h-6 text-amber-400 drop-shadow-md" />
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10 bg-black/80 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-xl">
              <span className="text-white font-extrabold uppercase tracking-widest text-base block mb-1 drop-shadow-md">
                Cracked Soil Image
              </span>
              <span className="text-xs text-[#A5D65A] font-mono">Soil Degradation Index</span>
            </div>
          </motion.div>
        </div>

        {/* ENLARGED 4 Cards Grid - 2x2 Layout with Generous Gap (gap-10 lg:gap-16 - "dur dur") */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 mb-20">
          {problems.map((problem, idx) => {
            const isSelected = activeCard === idx;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                onClick={() => setActiveCard(isSelected ? null : idx)}
                className={`bg-white dark:bg-[#0A2616] rounded-[44px] border transition-all duration-500 overflow-hidden flex flex-col cursor-pointer group relative ${
                  isSelected 
                    ? "border-[#7CBF35] shadow-[0_30px_70px_rgba(124,191,53,0.35)] ring-4 ring-[#7CBF35]/40 scale-[1.03]" 
                    : "border-black/10 dark:border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.07)] hover:shadow-[0_25px_60px_rgba(2,27,15,0.2)] hover:-translate-y-2.5"
                }`}
              >
                {/* MASSIVE Image Container (h-80 md:h-[360px] for massive photo visibility) */}
                <div className="h-80 md:h-[360px] relative overflow-hidden border-b border-black/5 dark:border-white/5 bg-zinc-900">
                  <img 
                    src={problem.imageUrl} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-white bg-black/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-md">
                      {problem.tag}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-black/75 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#7CBF35] group-hover:text-[#021B0F] transition-all shadow-md">
                      <ArrowDownRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                  
                  {/* Preserved Content Label Pill */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 inline-block shadow-lg">
                      <span className="text-white font-extrabold uppercase tracking-widest text-xs md:text-sm block drop-shadow-md">
                        {problem.title} Image
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content Body - Generous Padding (p-8 md:p-10) */}
                <div className="p-8 md:p-10 relative flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#EBF1EC] dark:bg-[#12331E] border border-black/8 dark:border-white/10 flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                      <problem.icon className="h-7 w-7 text-[#021B0F] dark:text-white" />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#021B0F] dark:text-white mb-3 font-heading tracking-tight flex items-center justify-between">
                      <span>{problem.title}</span>
                      <Sparkles className={`w-5 h-5 text-[#7CBF35] opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </h3>
                    
                    <p className="text-[#5B665E] dark:text-zinc-300 text-base md:text-lg leading-relaxed font-medium mb-5">
                      {problem.description}
                    </p>
                  </div>

                  {/* Interactive Details Expand on Click */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 mt-4 border-t border-black/8 dark:border-white/10 text-sm text-[#3a6b2a] dark:text-[#A5D65A] font-semibold flex items-start gap-3 bg-[#7CBF35]/15 p-4 rounded-2xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#7CBF35] shrink-0 mt-0.5" />
                        <span>{problem.detailText}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-xs font-bold text-[#7CBF35] uppercase tracking-wider mt-4 flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                    <span>{isSelected ? "Click to collapse" : "Click for impact insight"}</span>
                    <span className="text-base">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statistics Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#021B0F] via-[#072415] to-[#0A2616] rounded-[48px] p-10 md:p-14 shadow-[0_25px_60px_rgba(2,27,15,0.45)] border border-white/15 flex flex-col lg:flex-row justify-between gap-10 items-start lg:items-center relative overflow-hidden"
        >
          {/* Memphis Squiggle in Stats Ribbon */}
          <div className="absolute top-6 right-10 opacity-25 pointer-events-none">
            <svg width="140" height="48" viewBox="0 0 140 48" fill="none" stroke="#7CBF35" strokeWidth="5">
              <path d="M0,24 Q17.5,0 35,24 T70,24 T105,24 T140,24" />
            </svg>
          </div>

          {stats.map((stat, idx) => (
            <div key={idx} className="flex gap-6 items-start flex-1 relative z-10 w-full lg:w-auto border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-10 last:border-0 last:pb-0 last:pr-0 group">
              <div className={`${stat.bg} border w-18 h-18 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div>
                <h4 className={`font-heading font-extrabold uppercase tracking-wider text-lg md:text-xl mb-2 ${stat.color}`}>
                  {stat.label}
                </h4>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-[260px] font-medium">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
