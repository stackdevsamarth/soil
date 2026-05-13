"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, Layers, FlaskConical } from "lucide-react";

const stats = [
  {
    icon: FlaskConical,
    value: "12%",
    label: "Farmers Test Soil",
    description: "The vast majority of farmers operate in the dark, leading to inefficiency.",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    icon: TrendingDown,
    value: "40%",
    label: "Land Degraded",
    description: "Rapid loss of soil fertility across the subcontinent threatens food security.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Layers,
    value: "78%",
    label: "Fertilizer Overuse",
    description: "Excessive chemical usage is poisoning the water table and killing topsoil.",
    color: "text-brand-lime",
    bg: "bg-brand-lime/10",
  },
];

export function ProblemSection() {
  return (
    <section id="solutions" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6 italic"
          >
            THE SCALE OF <span className="text-brand-lime">INDIA’S SOIL CRISIS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-lg md:text-xl"
          >
            Traditional labs take 15 days. Field kits are inaccurate. Our soil is dying silently while the world’s population explodes.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-8 group hover:border-brand-lime/30 transition-colors"
            >
              <div className={`${stat.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className={`text-6xl font-heading font-bold mb-4 ${stat.color}`}>
                {stat.value}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tighter italic">{stat.label}</h3>
              <p className="text-zinc-500 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-lime/10 to-transparent -z-10" />
      </div>
    </section>
  );
}
