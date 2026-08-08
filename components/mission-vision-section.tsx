"use client";

import { motion } from "framer-motion";
import { Target, Eye, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function MissionVisionSection() {
  return (
    <section className="relative bg-memphis-light dark:bg-memphis-dark py-32 md:py-44 overflow-hidden">
      
      {/* Memphis Pattern Accent Element */}
      <div className="absolute top-16 right-16 w-32 h-32 rounded-full border-4 border-dashed border-[#7CBF35]/35 animate-spin-slow pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        
        {/* Section header layout */}
        <div className="max-w-3xl mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7CBF35]/15 border border-[#7CBF35]/35 text-[#3a6b2a] text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7CBF35]" />
            Who we are
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true, margin: "-80px" }}
            className="font-heading font-extrabold text-[clamp(2.2rem,5vw,3.8rem)] text-[#021B0F] leading-[1.08] tracking-tight"
          >
            Built with purpose,<br />
            <span className="text-[#7CBF35] bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] to-[#5a9c1e]">not just technology.</span>
          </motion.h2>
        </div>

        {/* Two asymmetric container cards - Generous Gap (gap-12 lg:gap-16) */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Mission Card with MASSIVE Crisp Unsplash Background Photo (h-80 md:h-96) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-[44px] p-8 md:p-12 border border-[#D4E8C2] shadow-[0_15px_50px_-15px_rgba(2,27,15,0.12)] hover:shadow-[0_30px_70px_-15px_rgba(2,27,15,0.2)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* MASSIVE Photo Container (h-80 md:h-96) */}
            <div className="mb-10 h-80 md:h-96 rounded-[32px] overflow-hidden relative shadow-xl border border-black/5">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80" 
                alt="Farmer checking soil"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">Field Agronomy Data</span>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7CBF35] to-[#5a9c1e] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Target className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
                <span className="font-heading font-extrabold text-xs uppercase tracking-[0.2em] text-[#3a6b2a] bg-[#EBF1EC] px-4 py-1.5 rounded-full">
                  Mission
                </span>
              </div>

              <h3 className="text-[#021B0F] text-2xl md:text-3xl font-heading font-extrabold leading-[1.2] mb-5 tracking-tight">
                Soil intelligence for every farmer — not just the ones who can afford labs.
              </h3>

              <p className="text-[#5B665E] text-base md:text-lg leading-relaxed font-medium mb-8">
                We give smallholder farmers the same data that large agribusinesses pay thousands for. A simple card, a phone scan, and seconds later you know exactly what your soil needs.
              </p>
            </div>

            <div className="space-y-3.5 pt-6 border-t border-[#EBF1EC] relative z-10">
              {[
                "Instant NPK & pH results from a card scan",
                "No lab visits, no paperwork, no waiting weeks",
                "Works on any smartphone camera",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7CBF35]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowRight className="w-3.5 h-3.5 text-[#7CBF35]" />
                  </div>
                  <span className="text-[#021B0F] text-sm md:text-base font-semibold leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision Card with MASSIVE Crisp Unsplash Background Photo (h-80 md:h-96) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView={{ opacity: 1, y: 0 }}
            custom={3}
            viewport={{ once: true, margin: "-80px" }}
            className="bg-gradient-to-br from-[#021B0F] to-[#0A2616] rounded-[44px] p-8 md:p-12 border border-white/10 shadow-[0_15px_50px_-15px_rgba(2,27,15,0.4)] text-white flex flex-col justify-between group hover:border-[#7CBF35]/40 hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden"
          >
            {/* MASSIVE Photo Container (h-80 md:h-96) */}
            <div className="mb-10 h-80 md:h-96 rounded-[32px] overflow-hidden relative shadow-xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80" 
                alt="Fertile agricultural farm valley"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021B0F] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-black/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">Sustainable Harvest Vision</span>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Eye className="w-7 h-7 text-[#7CBF35]" strokeWidth={2.2} />
                </div>
                <span className="font-heading font-extrabold text-xs uppercase tracking-[0.2em] text-[#7CBF35] bg-white/10 px-4 py-1.5 rounded-full border border-[#7CBF35]/20">
                  Vision
                </span>
              </div>

              <h3 className="text-white text-2xl md:text-3xl font-heading font-extrabold leading-[1.2] mb-5 tracking-tight">
                A world where no crop fails because a farmer didn't know their soil.
              </h3>

              <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-medium mb-8">
                We see a future where precision agriculture is accessible, local, and owned by the communities that depend on it — from Maharashtra to Rajasthan, to Karnataka.
              </p>
            </div>

            {/* Handcrafted Quote Callout */}
            <div className="relative z-10 bg-white/5 backdrop-blur-md rounded-2xl p-6 border-l-4 border-[#7CBF35] border-t border-r border-b border-white/10">
              <p className="text-emerald-100 text-base md:text-lg font-semibold italic leading-relaxed">
                "Better soil data is not a luxury — it's what separates a good harvest from a devastating loss."
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#7CBF35] flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#7CBF35]" /> — Soil Team
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
