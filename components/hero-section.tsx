"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center max-w-5xl relative z-10">
        
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tighter leading-[0.9] mb-10 uppercase">
            SOIL IS <span className="text-brand-lime italic font-black glow-text">FAILING</span> <br />
            <span className="text-white/40 font-black">— FARMERS CAN’T SEE IT.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg sm:text-xl md:text-2xl max-w-2xl mb-14 leading-relaxed font-medium">
            AI-powered soil diagnostics using colorimetric intelligence and smartphone scanning. Identify nutrient deficiencies in seconds, not weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center items-center">
            <Link href="/scan" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-16 sm:h-18 px-12 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold text-xl rounded-full shadow-[0_15px_35px_-5px_rgba(141,198,63,0.4)] transition-all hover:scale-105 active:scale-95 uppercase tracking-wider font-heading">
                Start Scanning <ArrowRight className="ml-2.5 h-6 w-6" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto h-16 sm:h-18 px-12 border-emerald-500/20 bg-emerald-950/15 hover:bg-emerald-950/30 text-white rounded-full text-xl font-bold backdrop-blur-md uppercase tracking-wider font-heading transition-all hover:scale-105 active:scale-95">
              <Play className="mr-2.5 h-5 w-5 fill-white text-white" /> Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-20 flex flex-wrap justify-center gap-10 items-center opacity-60">
            <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-zinc-300 tracking-[0.2em] uppercase italic">
              <ShieldCheck className="h-5 w-5 text-brand-lime" />
              99.8% Accuracy
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-zinc-300 tracking-[0.2em] uppercase italic">
              <CheckCircle2 className="h-5 w-5 text-brand-lime" />
              Farmer Verified
            </div>
          </div>
        </motion.div>

        {/* Cinematic Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] bg-brand-lime/10 blur-[130px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-brand-deep/15 blur-[150px] rounded-full" />
        </div>
        
      </div>
    </section>
  );
}
