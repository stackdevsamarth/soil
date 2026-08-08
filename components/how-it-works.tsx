"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, FlaskConical, Droplets, Smartphone, CheckCircle, Play } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Mix",
    desc: "Take a small soil sample from your field, mix it with water in the preparation tube, and let it settle for a few minutes.",
    icon: FlaskConical,
    imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
    timeRequired: "2 Mins",
    tip: "Use topsoil from 5-10 cm depth for best root-zone accuracy."
  },
  {
    num: "02",
    title: "Test",
    desc: "Apply a few drops of the liquid sample onto the test card. The indicator patches will change color to show Nitrogen, Phosphorus, and Potassium levels.",
    icon: Droplets,
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
    timeRequired: "3 Mins",
    tip: "Wait 180 seconds for complete reagent color saturation."
  },
  {
    num: "03",
    title: "Scan & Solve",
    desc: "Take a photo of the card inside the app. The system instantly translates the colors into exact nutrient levels and generates a tailored fertilizer plan.",
    icon: Smartphone,
    imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80",
    timeRequired: "10 Sec",
    tip: "Receive customized NPK dosage recommendations instantly offline."
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="pt-48 md:pt-56 pb-36 md:pb-48 relative bg-memphis-light dark:bg-memphis-dark overflow-hidden scroll-mt-36">
      
      {/* Decorative Memphis Pattern Shapes */}
      <div className="absolute top-16 right-16 w-36 h-36 rounded-full border-4 border-dashed border-[#7CBF35]/40 animate-spin-slow pointer-events-none" />
      
      <svg className="absolute bottom-16 left-12 w-28 h-28 text-[#7CBF35]/35 animate-float pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M10,20 L30,50 L50,20 L70,50 L90,20" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>

      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#7CBF35]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#7CBF35]/15 border border-[#7CBF35]/35 text-[#7CBF35] text-xs md:text-sm font-bold uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#7CBF35]" />
              Our Process
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-[#021B0F] dark:text-white leading-[1.05]">
              TEST YOUR SOIL IN <br/>
              <span className="inline-block pr-3 pb-1 text-[#7CBF35] bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] via-[#8ed945] to-[#5a9c1e]">
                THREE SIMPLE STEPS.
              </span>
            </h2>
            
            <p className="text-[#5B665E] dark:text-zinc-300 text-lg md:text-2xl max-w-3xl mt-4 font-medium leading-relaxed">
              No laboratory equipment required. Anyone can test their soil in under ten minutes.
            </p>
          </motion.div>
        </div>

        {/* Step Selector Tabs (Mobile & Desktop Interactivity) */}
        <div className="flex justify-center gap-4 mb-16">
          {steps.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs md:text-base font-bold transition-all ${
                activeStep === idx
                  ? "bg-[#7CBF35] text-[#021B0F] shadow-[0_8px_30px_rgba(124,191,53,0.5)] scale-105"
                  : "bg-white dark:bg-[#0A2616] text-[#5B665E] dark:text-zinc-300 border border-black/8 dark:border-white/10 hover:border-[#7CBF35]"
              }`}
            >
              <span className="font-mono font-black">{s.num}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          {/* Connecting Timeline Beam Line (Desktop) */}
          <div className="hidden md:block absolute top-[68px] left-[12%] right-[12%] h-[4px] bg-gradient-to-r from-[#7CBF35]/30 via-[#7CBF35] to-[#7CBF35]/30 z-0">
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-5 h-5 rounded-full bg-[#7CBF35] shadow-[0_0_20px_rgba(124,191,53,1)] border-2 border-white" />
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-5 h-5 rounded-full bg-[#7CBF35] shadow-[0_0_20px_rgba(124,191,53,1)] border-2 border-white" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#7CBF35] shadow-[0_0_20px_rgba(124,191,53,1)] border-2 border-white" />
          </div>

          {/* Generous Card Gap: gap-10 lg:gap-14 ("dur dur") */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-14 relative z-10">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  onClick={() => setActiveStep(idx)}
                  className={`bg-white dark:bg-[#0A2616] rounded-[44px] overflow-hidden border transition-all duration-500 flex flex-col justify-between cursor-pointer group ${
                    isCurrent
                      ? "border-[#7CBF35] shadow-[0_30px_70px_rgba(124,191,53,0.35)] ring-4 ring-[#7CBF35]/40 scale-[1.03]"
                      : "border-black/10 dark:border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.07)] hover:shadow-[0_25px_60px_rgba(2,27,15,0.2)] hover:-translate-y-2.5"
                  }`}
                >
                  {/* ENLARGED Image Container (h-80 md:h-[340px] for massive photo visibility) */}
                  <div className="h-80 md:h-[340px] relative overflow-hidden border-b border-black/5 dark:border-white/5 bg-zinc-900">
                    <img 
                      src={step.imageUrl} 
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021B0F]/90 via-[#021B0F]/20 to-transparent" />

                    <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#7CBF35] bg-black/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#7CBF35]/50 shadow-md">
                        {step.timeRequired}
                      </span>

                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7CBF35] to-[#5a9c1e] text-[#021B0F] flex items-center justify-center font-heading font-black text-2xl shadow-xl border-2 border-white">
                        {step.num}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body - Generous Padding (p-8 md:p-10) */}
                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-[#7CBF35] bg-[#7CBF35]/15 px-3.5 py-1.5 rounded-full mb-5">
                        <step.icon className="w-4 h-4 text-[#7CBF35]" />
                        <span>Step {step.num}</span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-extrabold text-[#021B0F] dark:text-white mb-4 font-heading tracking-tight">
                        {step.title}
                      </h3>
                      
                      <p className="text-[#5B665E] dark:text-zinc-300 leading-relaxed text-base md:text-lg font-medium mb-6">
                        {step.desc}
                      </p>
                    </div>

                    {/* Step Pro Tip note */}
                    <div className="pt-5 border-t border-black/8 dark:border-white/10 text-xs md:text-sm text-[#3a6b2a] dark:text-[#A5D65A] font-semibold flex items-start gap-3 bg-[#7CBF35]/15 p-4 rounded-2xl">
                      <CheckCircle className="w-5 h-5 text-[#7CBF35] shrink-0 mt-0.5" />
                      <span>{step.tip}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
