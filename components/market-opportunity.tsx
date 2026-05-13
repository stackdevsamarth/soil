"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart4, PieChart, Globe } from "lucide-react";

const marketData = [
  {
    type: "TAM",
    val: "$12.5B",
    label: "Total Addressable Market",
    desc: "Global precision agriculture and soil diagnostic market by 2028."
  },
  {
    type: "SAM",
    val: "$4.2B",
    label: "Serviceable Addressable Market",
    desc: "Mobile-first diagnostic solutions in emerging agricultural economies."
  },
  {
    type: "SOM",
    val: "$850M",
    label: "Serviceable Obtainable Market",
    desc: "Targeting 15% penetration in the Indian and SE Asian market segments."
  }
];

export function MarketOpportunity() {
  return (
    <section id="market" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6 italic tracking-tighter uppercase"
          >
            THE <span className="text-brand-lime">OPPORTUNITY</span>
          </motion.h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            A massive untapped market at the intersection of deep-tech and food security.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {marketData.map((m, i) => (
            <motion.div
              key={m.type}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[32px] border-white/5 relative overflow-hidden group hover:border-brand-lime/30 transition-all"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                {i === 0 ? <Globe className="h-24 w-24" /> : i === 1 ? <TrendingUp className="h-24 w-24" /> : <PieChart className="h-24 w-24" />}
              </div>
              
              <div className="text-brand-lime font-mono font-bold text-sm tracking-[0.3em] mb-4">
                {m.type}
              </div>
              <div className="text-6xl font-heading font-bold text-white mb-4 italic tracking-tighter">
                {m.val}
              </div>
              <h3 className="text-lg font-bold text-white/90 mb-4 uppercase">{m.label}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed relative z-10">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


