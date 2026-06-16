"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2024",
    title: "THE AI TIPPING POINT",
    desc: "Edge computing reaches the power necessary for field diagnostics."
  },
  {
    year: "2025",
    title: "GLOBAL MANDATES",
    desc: "UN directives for chemical reduction in agriculture become law."
  },
  {
    year: "2026+",
    title: "THE NEW STANDARD",
    desc: "SoilSense becomes the core OS for sustainable precision farming."
  }
];

export function WhyNowSection() {
  return (
    <section className="py-32 relative bg-dark-0 text-white overflow-hidden dark">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-deep/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Timeline */}
          <div className="order-2 lg:order-1 relative">
             <div className="space-y-6">
               {timeline.map((item, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.15 }}
                   viewport={{ once: true }}
                   className="flex gap-8 group bg-[#0A2616] p-8 rounded-[24px] border border-brand-lime/10 shadow-lg hover:border-brand-lime/30 transition-all"
                 >
                   <div className="flex flex-col items-center">
                     <div className="h-4 w-4 rounded-full bg-brand-lime shadow-[0_0_15px_rgba(124,191,53,1)] mt-1" />
                     {i !== timeline.length - 1 && (
                        <div className="w-[2px] flex-1 bg-gradient-to-b from-brand-lime/50 to-transparent mt-2" />
                     )}
                   </div>
                   <div>
                     <div className="text-brand-lime font-mono text-sm mb-2 font-bold tracking-widest">{item.year}</div>
                     <h4 className="text-2xl font-heading font-extrabold text-white mb-2 italic tracking-tight uppercase">{item.title}</h4>
                     <p className="text-[#90AFA0] text-sm md:text-base leading-relaxed">{item.desc}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
          
          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-5xl md:text-7xl font-heading font-extrabold mb-8 italic uppercase tracking-tighter"
            >
              WHY <span className="text-brand-lime">NOW?</span>
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               viewport={{ once: true }}
               className="text-[#90AFA0] text-lg md:text-xl leading-relaxed mb-8 font-medium"
            >
              The intersection of food security, climate change, and mobile computing has created a unique window for SoilSense to scale globally.
            </motion.p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
