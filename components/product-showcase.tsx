"use client";

import { motion } from "framer-motion";
import { Activity, LayoutDashboard, Smartphone, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProductShowcase() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-brand-lime font-mono text-xs tracking-widest uppercase mb-6">
              <Activity className="h-4 w-4" /> Comprehensive Ecosystem
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 italic tracking-tighter uppercase">
              ONE SMART <br />
              <span className="text-brand-lime">SYSTEM.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-xl">
              SoilSense is not just an app. It's a vertically integrated diagnostic platform that connects hardware-based colorimetric testing with real-time cloud data.
            </p>

            <div className="space-y-6">
              {[
                { icon: Smartphone, title: "Edge Analysis", desc: "Computer vision detects pH/NPK levels locally on device." },
                { icon: LayoutDashboard, title: "Cloud Insights", desc: "Data is synced to our AI engine for comparative historical analysis." },
                { icon: ClipboardCheck, title: "Expert Guides", desc: "Receive customized fertilizer schedules and crop compatibility lists." }
              ].map((feature, idx) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                >
                  <div className="bg-brand-lime/10 p-3 rounded-xl h-fit">
                    <feature.icon className="h-6 w-6 text-brand-lime" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-zinc-500 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            {/* Layered Glass Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 glass shadow-2xl rounded-[32px] overflow-hidden border-white/20 p-1"
            >
              <div className="bg-zinc-950 rounded-[30px] p-8 aspect-square flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div className="text-zinc-500 text-[10px] tracking-widest font-mono">LIVE_ANALYTICS</div>
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                
                {/* Visual Graph Mock */}
                <div className="flex-1 flex items-end gap-2 px-2">
                  {[40, 70, 45, 90, 65, 80, 50, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="flex-1 bg-gradient-to-t from-brand-lime to-brand-accent rounded-t-md opacity-80"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] text-zinc-500 mb-1">CROP_RECO</div>
                    <div className="font-bold text-brand-lime text-lg">WHEAT</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="text-[10px] text-zinc-500 mb-1">SOIL_STATUS</div>
                    <div className="font-bold text-white text-lg">OPTIMAL</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating back card */}
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-10 -right-10 w-full h-full glass border-white/10 rounded-[32px] -z-10 opacity-50"
            />
            
            {/* Floating accents */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-lime/30 blur-[80px] -z-20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
