"use client";

import { motion } from "framer-motion";
import { Droplets, ScanLine, FileBarChart, Beaker } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "PREP",
    desc: "Mix soil with distilled water in the SoilSense kit.",
    icon: Beaker,
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-400"
  },
  {
    step: "02",
    title: "TEST",
    desc: "Dip the triple-indicator card into the soil solution.",
    icon: Droplets,
    color: "from-brand-lime/20 to-brand-lime/5",
    accent: "text-brand-lime"
  },
  {
    step: "03",
    title: "SCAN",
    desc: "Capture the colors using your smartphone camera.",
    icon: ScanLine,
    color: "from-brand-accent/20 to-brand-accent/5",
    accent: "text-brand-accent"
  },
  {
    step: "04",
    title: "REPORT",
    desc: "Receive AI-powered insights and crop guides.",
    icon: FileBarChart,
    color: "from-white/10 to-white/5",
    accent: "text-white"
  }
];

export function HowItWorks() {
  return (
    <section id="technology" className="py-24 md:py-32 relative overflow-hidden bg-dark-1/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-lime font-mono text-xs tracking-[0.4em] uppercase mb-6"
          >
            Diagnostic Workflow
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-heading font-bold mb-8 italic uppercase tracking-tighter"
          >
            PRECISION <span className="text-brand-lime">PROCESS</span>
          </motion.h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-base md:text-xl font-medium leading-relaxed">
            Our patent-pending technology combines chemical diagnostics with cloud AI to deliver lab-grade results in the palm of your hand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group text-center"
            >
              <div className={`mb-10 relative z-10 mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <step.icon className={`h-10 w-10 ${step.accent}`} />
                
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 bg-brand-lime text-dark-0 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest shadow-xl">
                  {step.step}
                </div>
              </div>

              <h3 className="text-2xl font-heading font-bold mb-4 tracking-tighter italic text-white group-hover:text-brand-lime transition-colors uppercase">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-[240px] mx-auto font-medium">
                {step.desc}
              </p>

              {/* Mobile Connector Line */}
              <div className="lg:hidden absolute left-1/2 -bottom-10 w-px h-8 bg-gradient-to-b from-white/10 to-transparent last:hidden" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative scanning line */}
      <motion.div 
        animate={{ y: [-1000, 1000] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 top-0 w-full h-[120px] bg-gradient-to-b from-transparent via-brand-lime/[0.05] to-transparent pointer-events-none"
      />
    </section>
  );
}
