"use client";

import { motion } from "framer-motion";

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdRxyvDfxAKUMaRQuIdKx7Y0rENJlPXCusVXxmIcvMimEgnCg/viewform?embedded=true";

export function SurveySection() {
  return (
    <section className="relative bg-[#F4F8F1] py-24 md:py-32 overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3a6b2a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-[#7CBF35] mb-6"
        >
          Have your say
        </motion.p>

        <div className="border-t-2 border-[#D4E8C2] mb-12 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <h2 className="font-heading font-extrabold text-[clamp(1.8rem,4.5vw,3rem)] text-[#021B0F] leading-[1.1] tracking-tight">
                Help us build what<br />
                <span className="text-[#7CBF35]">farmers actually need.</span>
              </h2>
              <p className="mt-4 text-[#5B665E] text-base md:text-lg font-medium max-w-xl leading-relaxed">
                This quick survey takes under 2 minutes. Your answers directly shape how we develop Soil — no fluff, just honest questions.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#7CBF35] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B665E]">
                Open · 2 min
              </span>
            </div>
          </motion.div>
        </div>

        {/* Form embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="rounded-2xl overflow-hidden border-2 border-[#D4E8C2] bg-white shadow-[0_4px_32px_-8px_rgba(60,107,42,0.12)]"
        >
          <iframe
            src={FORM_EMBED_URL}
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Soil Farmer Survey"
            className="block w-full"
            style={{ minHeight: "720px" }}
          >
            Loading…
          </iframe>
        </motion.div>

        {/* Bottom rule */}
        <div className="border-t-2 border-[#D4E8C2] mt-14" />
      </div>
    </section>
  );
}
