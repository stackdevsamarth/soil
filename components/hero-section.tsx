"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 md:pt-32 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-deep/20 border border-brand-lime/20 text-brand-lime text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-lime"></span>
            </span>
            Next-Gen Agricultural Intelligence
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.95] mb-8">
            SOIL IS <span className="text-brand-lime italic">FAILING</span> <br className="hidden md:block" />
            <span className="text-white/40">— FARMERS CAN’T SEE IT.</span>
          </h1>
          
          <p className="text-zinc-500 text-base md:text-xl max-w-xl mb-12 leading-relaxed font-medium">
            AI-powered soil diagnostics using colorimetric intelligence and smartphone scanning. Identify nutrient deficiencies in seconds, not weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/scan" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-16 px-10 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold text-lg rounded-full shadow-[0_15px_30px_-5px_rgba(141,198,63,0.5)] transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter">
                Start Scanning <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto h-16 px-10 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full text-lg font-bold backdrop-blur-md uppercase tracking-tighter">
              <Play className="mr-2 h-5 w-5 fill-white" /> Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 items-center opacity-50">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 tracking-widest uppercase italic">
              <ShieldCheck className="h-4 w-4 text-brand-lime" />
              99.8% Accuracy
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 tracking-widest uppercase italic">
              <CheckCircle2 className="h-4 w-4 text-brand-lime" />
              Farmer Verified
            </div>
          </div>
        </motion.div>

        {/* Right Content - Animated Dashboard/Phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative lg:h-[700px] flex items-center justify-center pointer-events-none"
        >
          {/* Main Card (Dashboard Preview) */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card w-full max-w-[480px] p-1 aspect-[4/3] relative z-20 shadow-2xl border-white/10"
          >
            <div className="bg-dark-1 h-full w-full rounded-[28px] overflow-hidden p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-red-500/50" />
                  <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[8px] md:text-[10px] text-zinc-600 font-mono tracking-[0.3em] uppercase">SOILSENSE // SYS_V1.0</div>
              </div>
              
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <div>
                    <div className="text-zinc-600 text-[10px] uppercase tracking-widest mb-2 font-bold">Health Score</div>
                    <div className="text-4xl md:text-5xl font-bold text-brand-lime font-heading tracking-tighter">94%</div>
                  </div>
                  <Activity className="h-10 w-10 md:h-12 md:w-12 text-brand-lime opacity-30" />
                </div>
                
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { label: "N", val: 82, col: "bg-blue-500" },
                    { label: "P", val: 91, col: "bg-green-500" },
                    { label: "K", val: 87, col: "bg-orange-500" }
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5">
                      <div className="text-[10px] text-zinc-600 mb-2 font-bold">{stat.label}</div>
                      <div className="font-bold text-sm md:text-base mb-3 text-white">{stat.val}%</div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          transition={{ duration: 2, delay: 0.8 }}
                          className={`h-full ${stat.col} shadow-[0_0_10px_rgba(255,255,255,0.3)]`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto bg-brand-lime/10 border border-brand-lime/20 rounded-2xl p-4">
                  <div className="text-[10px] text-brand-lime font-bold uppercase tracking-widest mb-2">AI Recommendation</div>
                  <div className="text-xs text-brand-lime/70 leading-relaxed italic font-medium">
                    "Ideal conditions for high-yield Rabi crops. Nitrogen levels optimal."
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Background Floating Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[80%] h-[80%] border border-white/5 rounded-full border-dashed"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-lime/10 blur-[120px] rounded-full" />
          </div>
          
          {/* Decorative stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute -bottom-4 -right-4 md:-right-10 z-30 glass-card px-6 py-4 border-brand-lime/30 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-brand-lime rounded-2xl flex items-center justify-center font-bold text-dark-0 text-sm shadow-lg">pH</div>
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Calibration</div>
                <div className="text-sm md:text-base font-bold text-white tracking-tight">NEAR NEUTRAL [6.8]</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
