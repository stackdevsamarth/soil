"use client";

import { motion } from "framer-motion";
import { Sprout, Package, TrendingUp, Leaf } from "lucide-react";

const impacts = [
  {
    title: "Confidence in the Field",
    icon: Sprout,
    desc: "Stop guessing which fertilizer to buy. Know exactly what nutrients your crops are missing."
  },
  {
    title: "Save Money on Inputs",
    icon: Package,
    desc: "Prevent over-fertilization. Only buy and apply what your soil actually needs."
  },
  {
    title: "Improve Crop Yields",
    icon: TrendingUp,
    desc: "Fix nutrient deficiencies early in the season to ensure healthy growth and better harvest quality."
  },
  {
    title: "Restore Soil Health",
    icon: Leaf,
    desc: "Keep your land fertile and productive for future generations by avoiding chemical overuse."
  }
];

export function ImpactMetrics() {
  return (
    <section className="py-24 md:py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-brand-lime font-bold text-sm tracking-[0.2em] uppercase mb-4"
          >
            POTENTIAL IMPACT
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
          >
             What Happens When Farmers <br className="hidden md:block" />
             Can Finally <span className="text-brand-lime">See Their Soil?</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             viewport={{ once: true }}
             className="text-muted-foreground text-lg md:text-xl font-medium max-w-3xl mx-auto"
          >
             For too long, soil health has been the most critical yet least understood factor in agriculture. SoilSense gives you the visibility to build a more productive farm.
          </motion.p>
        </div>

        <div className="relative mb-24">
          {/* Connecting Wavy Line (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] z-0">
             <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none" className="overflow-visible stroke-brand-lime/30 fill-transparent stroke-[1px]">
                <path d="M0,10 C25,20 25,0 50,10 C75,20 75,0 100,10" />
             </svg>
          </div>

          <div className="grid md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 relative z-10">
            {impacts.map((impact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div className="mb-6 relative w-24 h-24 flex items-center justify-center">
                   {/* Glow effect */}
                   <div className="absolute inset-0 bg-brand-lime/10 rounded-full blur-xl group-hover:bg-brand-lime/20 transition-all duration-500" />
                   
                   {/* Main Circle */}
                   <div className="relative w-20 h-20 bg-[#F8F8F4] border-2 border-brand-lime/20 rounded-full flex items-center justify-center shadow-sm z-10 group-hover:-translate-y-1 transition-transform duration-500">
                      {/* Connection dots on the circle border */}
                      {idx > 0 && <div className="hidden md:block absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-brand-lime rounded-full" />}
                      {idx < impacts.length - 1 && <div className="hidden md:block absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-brand-lime rounded-full" />}
                      
                      <impact.icon className="w-8 h-8 text-foreground stroke-[1.5]" />
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{impact.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-[240px]">
                  {impact.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center flex items-center justify-center gap-6"
        >
           <div className="w-12 h-px bg-border" />
           <p className="text-lg md:text-xl font-medium text-foreground">
             One small test. A lifetime of better farming.
           </p>
           <div className="w-12 h-px bg-border" />
        </motion.div>

      </div>
    </section>
  );
}
