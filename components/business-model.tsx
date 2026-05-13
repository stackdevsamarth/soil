"use client";

import { motion } from "framer-motion";
import { CreditCard, Zap, Handshake, BarChart3 } from "lucide-react";

const models = [
  { icon: Zap, title: "Sensor Subscriptions", desc: "Predictable recurring revenue from our proprietary indicator cards." },
  { icon: CreditCard, title: "SaaS Platform", desc: "Tiered access for large-scale farm management and data analytics." },
  { icon: Handshake, title: "Govt. Partnerships", desc: "National-scale soil mapping contracts and public-private initiatives." },
  { icon: BarChart3, title: "Marketplace Data", desc: "Anonymized soil health data for localized fertilizer and seed optimization." }
];

export function BusinessModel() {
  return (
    <section className="py-24 relative bg-dark-1/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-heading font-bold italic uppercase tracking-tighter"
            >
              SUSTAINABLE <br />
              <span className="text-brand-lime">REVENUE.</span>
            </motion.h2>
          </div>
          <p className="text-zinc-500 max-w-sm">
            A diversified monetization strategy designed for rapid global scale and long-term investor value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 border-white/5 hover:bg-brand-lime/[0.02] transition-all cursor-default"
            >
              <div className="text-brand-lime mb-6">
                <m.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 italic uppercase tracking-tight">{m.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
