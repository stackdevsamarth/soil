"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-32 relative bg-[#0B2114] text-white overflow-hidden dark border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-brand-lime/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 leading-tight"
        >
          Every farmer deserves <br/> better soil data.
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           viewport={{ once: true }}
           className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium"
        >
          Join the SoilSense early access program and transform how you grow.
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           viewport={{ once: true }}
           className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button className="w-full sm:w-auto h-14 px-10 bg-[#7CBF35] hover:bg-[#6CAE2B] text-dark-0 font-bold text-lg rounded-xl shadow-lg transition-all hover:-translate-y-1">
            Get Early Access
          </Button>
          <Button variant="outline" className="w-full sm:w-auto h-14 px-10 border-white/20 bg-transparent hover:bg-white/5 text-white rounded-xl text-lg font-medium transition-all hover:-translate-y-1">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
