"use client";

import { motion } from "framer-motion";
import { Target, Eye, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function MissionVisionSection() {
  return (
    <section className="relative bg-[#F4F8F1] py-24 md:py-32 overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #3a6b2a 0px, #3a6b2a 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #3a6b2a 0px, #3a6b2a 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true, margin: "-80px" }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-[#7CBF35] mb-6"
        >
          Who we are
        </motion.p>

        {/* Top rule + heading */}
        <div className="border-t-2 border-[#D4E8C2] mb-14 pt-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true, margin: "-80px" }}
            className="font-heading font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-[#021B0F] leading-[1.1] tracking-tight max-w-2xl"
          >
            Built with purpose,<br />
            <span className="text-[#7CBF35]">not just technology.</span>
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-0 md:divide-x-2 divide-[#D4E8C2]">
          {/* Mission */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={2}
            viewport={{ once: true, margin: "-80px" }}
            className="md:pr-16 pb-12 md:pb-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#7CBF35] flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-bold text-sm uppercase tracking-widest text-[#3a6b2a]">
                Mission
              </span>
            </div>

            <p className="text-[#021B0F] text-2xl md:text-3xl font-heading font-bold leading-[1.25] mb-5">
              Soil intelligence for every farmer — not just the ones who can afford labs.
            </p>

            <p className="text-[#5B665E] text-base md:text-lg leading-relaxed font-medium mb-8">
              We give smallholder farmers the same data that large agribusinesses pay thousands for. A simple card, a phone scan, and seconds later you know exactly what your soil needs.
            </p>

            <div className="space-y-3">
              {[
                "Instant NPK & pH results from a card scan",
                "No lab visits, no paperwork, no waiting weeks",
                "Works on any smartphone camera",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#7CBF35] mt-1 shrink-0" />
                  <span className="text-[#3a6b2a] text-sm font-semibold leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={3}
            viewport={{ once: true, margin: "-80px" }}
            className="md:pl-16 pt-12 md:pt-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#021B0F] flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-[#7CBF35]" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-bold text-sm uppercase tracking-widest text-[#021B0F]">
                Vision
              </span>
            </div>

            <p className="text-[#021B0F] text-2xl md:text-3xl font-heading font-bold leading-[1.25] mb-5">
              A world where no crop fails because a farmer didn't know their soil.
            </p>

            <p className="text-[#5B665E] text-base md:text-lg leading-relaxed font-medium mb-8">
              We see a future where precision agriculture is accessible, local, and owned by the communities that depend on it — from Maharashtra to Rajasthan, to Karnataka.
            </p>

            {/* Quote-style callout */}
            <div className="border-l-4 border-[#7CBF35] pl-5 py-1">
              <p className="text-[#102117] text-base md:text-lg font-semibold italic leading-relaxed">
                "Better soil data is not a luxury — it's what separates a good harvest from a devastating loss."
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#7CBF35]">
                — Soil Team
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <div className="border-t-2 border-[#D4E8C2] mt-14" />
      </div>
    </section>
  );
}
