"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-32 md:py-44 relative bg-[#021B0F] text-white overflow-hidden dark border-t border-white/10">
      {/* Real Unsplash Golden Hour Farm Photo Background - Bright & Clear */}
      <div className="absolute inset-0 opacity-45 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80" 
          alt="Farmland at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021B0F] via-[#021B0F]/70 to-[#021B0F]/80" />
      </div>

      {/* Layered Multi-Color Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[450px] bg-gradient-to-tr from-[#7CBF35]/25 via-[#A5D65A]/15 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7CBF35]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Decorative Floating Organic Shapes */}
      <div className="absolute top-12 left-12 w-20 h-20 rounded-full border border-white/10 bg-black/40 backdrop-blur-md animate-float pointer-events-none hidden md:block" />
      <div className="absolute bottom-16 right-16 w-32 h-32 rounded-full border border-[#7CBF35]/20 bg-[#7CBF35]/10 backdrop-blur-md animate-float pointer-events-none hidden md:block" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7CBF35]/20 border border-[#7CBF35]/40 text-[#7CBF35] text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-md backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#7CBF35]" />
          <span>Transform Your Farm</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-8 leading-[1.05] uppercase drop-shadow-lg"
        >
          Give your farm the <br/>
          <span className="text-[#7CBF35] bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] via-[#A5D65A] to-white">
            foundation it deserves.
          </span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-zinc-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md"
        >
          Start testing your soil today and grow with confidence. Contact us for early access or a demonstration.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button className="w-full sm:w-auto h-16 px-10 bg-gradient-to-r from-[#7CBF35] to-[#68ab24] hover:from-[#88cd3f] hover:to-[#73b82d] text-[#021B0F] font-black text-lg rounded-2xl shadow-[0_10px_35px_rgba(124,191,53,0.5)] transition-all hover:scale-[1.03] active:scale-98 flex items-center justify-center gap-3 uppercase tracking-wider group font-heading">
            <span>Get Early Access</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#021B0F]" />
          </Button>

          <Button variant="outline" className="w-full sm:w-auto h-16 px-10 border border-white/30 bg-black/50 hover:bg-white/10 text-white rounded-2xl text-lg font-bold backdrop-blur-md transition-all hover:scale-[1.03] active:scale-98 uppercase tracking-wider font-heading">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
