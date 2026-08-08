"use client";

import { motion } from "framer-motion";
import { Clock, TrendingUp, Cpu, Sparkles } from "lucide-react";

const timeline = [
  {
    year: "2024",
    title: "Better Mobile Cameras",
    desc: "Smartphone cameras now capture subtle color variations with laboratory-grade consistency.",
    icon: Cpu,
  },
  {
    year: "2025",
    title: "Rising Fertilizer Costs",
    desc: "Skyrocketing input prices make targeted, precise nutrient application a necessity for farm survival.",
    icon: TrendingUp,
  },
  {
    year: "2026+",
    title: "Soil Recovery Shift",
    desc: "Growers are actively restoring soil biology to reduce reliance on chemical inputs.",
    icon: Clock,
  }
];

export function WhyNowSection() {
  return (
    <section id="market" className="pt-48 md:pt-56 pb-36 md:pb-48 relative bg-[#021B0F] text-white overflow-hidden dark scroll-mt-36">
      {/* Background Ambient Spotlights & Textures */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#0A2616] via-[#072415] to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#7CBF35]/10 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Heading & Context - Plentiful Top Clearance for Fixed Navbar */}
          <div className="lg:col-span-5 pt-8 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7CBF35]/15 border border-[#7CBF35]/35 text-[#7CBF35] text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#7CBF35]" />
              Market Timing
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-heading font-extrabold mb-8 uppercase tracking-tight leading-snug py-3"
            >
              WHY{" "}
              <span className="inline-block pr-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] to-[#A5D65A]">
                NOW?
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-[#90AFA0] text-lg md:text-xl leading-relaxed mb-8 font-medium max-w-md"
            >
              With fertilizer costs rising and soil health declining, farmers need simple, immediate answers to protect their yields and land.
            </motion.p>
          </div>

          {/* Right Column: Connected Timeline Cards */}
          <div className="lg:col-span-7 relative">
            
            <div className="space-y-6 relative">
              {timeline.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="flex gap-6 md:gap-8 group bg-[#0A2616]/80 backdrop-blur-md p-6 md:p-8 rounded-[32px] border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.3)] hover:border-[#7CBF35]/40 hover:shadow-[0_15px_45px_rgba(124,191,53,0.15)] transition-all duration-500"
                >
                  {/* Vertical Progress Node */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-6 w-6 rounded-full bg-[#7CBF35] shadow-[0_0_20px_rgba(124,191,53,0.9)] flex items-center justify-center mt-1 group-hover:scale-125 transition-transform">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                    {i !== timeline.length - 1 && (
                      <div className="w-[2px] flex-1 bg-gradient-to-b from-[#7CBF35] via-[#7CBF35]/30 to-transparent mt-3" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-[#7CBF35] font-mono text-xs md:text-sm font-bold tracking-widest bg-[#7CBF35]/15 px-3.5 py-1 rounded-full border border-[#7CBF35]/30 inline-block">
                        {item.year}
                      </div>
                      <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-[#7CBF35] transition-colors" />
                    </div>

                    <h3 className="text-2xl font-heading font-extrabold text-white mb-2 tracking-tight uppercase">
                      {item.title}
                    </h3>
                    
                    <p className="text-[#90AFA0] text-sm md:text-base leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
