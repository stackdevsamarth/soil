"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Package, TrendingUp, Leaf, Sparkles, CheckCircle2 } from "lucide-react";

const impacts = [
  {
    title: "Confidence in the Field",
    icon: Sprout,
    desc: "Stop guessing which fertilizer to buy. Know exactly what nutrients your crops are missing.",
    statHighlight: "+100% Data Clarity",
    metricTip: "Eliminates blind purchasing of wrong fertilizer blends."
  },
  {
    title: "Save Money on Inputs",
    icon: Package,
    desc: "Prevent over-fertilization. Only buy and apply what your soil actually needs.",
    statHighlight: "Save ~₹4,500/Acre",
    metricTip: "Reduces wasted urea & DAP purchases in the first season."
  },
  {
    title: "Improve Crop Yields",
    icon: TrendingUp,
    desc: "Fix nutrient deficiencies early in the season to ensure healthy growth and better harvest quality.",
    statHighlight: "+25% Higher Yield",
    metricTip: "Targeted NPK application produces fuller grains and uniform harvests."
  },
  {
    title: "Restore Soil Health",
    icon: Leaf,
    desc: "Keep your land fertile and productive for future generations by avoiding chemical overuse.",
    statHighlight: "Long-Term Soil Fertility",
    metricTip: "Preserves organic carbon and beneficial soil microorganisms."
  }
];

export function ImpactMetrics() {
  const [activeImpact, setActiveImpact] = useState<number>(0);

  return (
    <section id="impact" className="py-28 md:py-36 relative bg-[#F8F8F4] dark:bg-[#021B0F] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7CBF35]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7CBF35]/15 border border-[#7CBF35]/30 text-[#7CBF35] text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7CBF35]" />
            POTENTIAL IMPACT
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 tracking-tight text-[#021B0F] dark:text-white leading-[1.08]"
          >
            What Happens When Farmers <br className="hidden md:block" />
            Can Finally <span className="text-[#7CBF35] bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] to-[#5a9c1e]">See Their Soil?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#5B665E] dark:text-zinc-300 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed"
          >
            For too long, soil health has been the most critical yet least understood factor in agriculture. SoilSense gives you the visibility to build a more productive farm.
          </motion.p>
        </div>

        {/* 4 Connected Impact Cards with Interactive Metric Preview */}
        <div className="relative mb-20">
          {/* Connecting Wavy Path (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] z-0">
            <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none" className="overflow-visible stroke-[#7CBF35]/30 fill-transparent stroke-[2px]">
              <path d="M0,12 C25,24 25,0 50,12 C75,24 75,0 100,12" />
            </svg>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4 lg:gap-6 relative z-10">
            {impacts.map((impact, idx) => {
              const isSelected = activeImpact === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  onClick={() => setActiveImpact(idx)}
                  className={`bg-white dark:bg-[#0A2616] rounded-[28px] p-6 border transition-all duration-500 flex flex-col items-center text-center cursor-pointer group relative ${
                    isSelected
                      ? "border-[#7CBF35] shadow-[0_20px_50px_rgba(124,191,53,0.25)] ring-2 ring-[#7CBF35]/40 scale-[1.03]"
                      : "border-black/8 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgba(2,27,15,0.12)] hover:border-[#7CBF35]/40 hover:-translate-y-2"
                  }`}
                >
                  {/* Icon Container with Halo Glow */}
                  <div className="mb-6 relative w-20 h-20 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isSelected ? "bg-[#7CBF35]/40 scale-125" : "bg-[#7CBF35]/20 group-hover:bg-[#7CBF35]/35"}`} />
                    
                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-md z-10 transition-transform duration-500 ${isSelected ? "bg-[#7CBF35] text-[#021B0F]" : "bg-gradient-to-br from-[#7CBF35]/15 to-[#5a9c1e]/15 dark:from-[#7CBF35]/20 dark:to-transparent border border-[#7CBF35]/30 text-[#7CBF35] group-hover:scale-110"}`}>
                      <impact.icon className={`w-8 h-8 stroke-[2] ${isSelected ? "text-[#021B0F]" : "text-[#7CBF35]"}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-extrabold text-[#021B0F] dark:text-white mb-2 font-heading tracking-tight">
                    {impact.title}
                  </h3>
                  
                  <p className="text-[#5B665E] dark:text-zinc-300 leading-relaxed text-xs md:text-sm font-medium mb-3">
                    {impact.desc}
                  </p>

                  {/* Stat Highlight Pill */}
                  <div className="mt-auto pt-3 w-full border-t border-black/5 dark:border-white/10">
                    <span className="inline-block text-[11px] font-extrabold text-[#7CBF35] bg-[#7CBF35]/10 px-3 py-1 rounded-full">
                      {impact.statHighlight}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Callout for Selected Impact */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeImpact}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center flex items-center justify-center gap-4 md:gap-6 bg-white dark:bg-[#0A2616] py-5 px-8 rounded-full border border-black/8 dark:border-white/10 shadow-md max-w-2xl mx-auto"
          >
            <CheckCircle2 className="w-5 h-5 text-[#7CBF35] shrink-0" />
            <p className="text-sm md:text-base font-bold text-[#021B0F] dark:text-white font-heading tracking-tight">
              {impacts[activeImpact].title}: <span className="text-[#7CBF35]">{impacts[activeImpact].metricTip}</span>
            </p>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
