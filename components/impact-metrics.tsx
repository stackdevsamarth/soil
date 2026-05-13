"use client";

import { motion } from "framer-motion";
import { Globe2, Users, Sprout, ShieldAlert } from "lucide-react";

const metrics = [
  { icon: Globe2, val: "250K+", label: "Hectares Protected", sub: "Degraded land restored across 14 states." },
  { icon: Users, val: "1.2M", label: "Farmers Empowered", sub: "Reducing cost of input by 30% on average." },
  { icon: Sprout, val: "18%", label: "Yield Increase", sub: "Verified increase in food production per acre." },
  { icon: ShieldAlert, val: "40%", label: "Fertilizer Saved", sub: "Stopping unnecessary chemical runoff into rivers." }
];

export function ImpactMetrics() {
  return (
    <section id="impact" className="py-32 relative bg-dark-0">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-0 via-transparent to-dark-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-lime font-mono text-sm tracking-[0.3em] uppercase mb-4"
          >
            Mission // Impact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-heading font-bold mb-8 italic uppercase tracking-tighter"
          >
            RESTORING THE <span className="text-brand-lime">EARTH'S PULSE</span>
          </motion.h2>
          <p className="text-zinc-400 max-w-2xl text-lg md:text-xl">
            We are not just a company. We are a movement to save the world's most valuable asset: its topsoil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[32px] border-white/5 hover:border-brand-lime/30 transition-all group"
            >
              <div className="bg-brand-lime/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-brand-lime group-hover:scale-110 transition-transform">
                <m.icon className="h-6 w-6" />
              </div>
              <div className="text-5xl font-heading font-bold text-white mb-2 tracking-tighter italic">
                {m.val}
              </div>
              <div className="text-brand-lime font-bold uppercase text-xs tracking-widest mb-4">
                {m.label}
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {m.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
