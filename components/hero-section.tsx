"use client";

import { motion } from "framer-motion";
import { Play, ShieldCheck, CheckCircle2, Scan, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 pb-32 overflow-hidden">

      {/* Background Image & Gradient Overlays */}
      {/* Fallback color if image fails to load */}
      <div className="absolute inset-0 bg-[#E8F1EB] -z-20" />

      {/* Farm Background Image (Using exactly the user's provided PPT image) */}
      <div
        className="absolute inset-0 bg-[url('/api/hero-bg')] bg-cover bg-right bg-no-repeat -z-20 opacity-100"
      />

      {/* Gradient to completely hide the left side (where the PPT text is) and fade out towards the farmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8F4] via-[#F8F8F4] via-[50%] to-transparent -z-10 w-full" />

      {/* Top gradient for navbar blending */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#F8F8F4] to-transparent -z-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left max-w-2xl lg:col-span-7 pt-10"
          >
            <h1 className="font-heading font-extrabold tracking-tighter leading-[1.05] mb-6 uppercase flex flex-col items-start relative">
              <span className="text-[#021B0F] whitespace-nowrap text-[clamp(2.5rem,7vw,5.5rem)]">KNOW YOUR SOIL,</span>
              <span className="flex items-center text-brand-lime whitespace-nowrap text-[clamp(2.5rem,7vw,5.5rem)]">
                GROW YOUR YIELD.
                {/* Leaf icon inline at end of line */}
                <Leaf className="w-[0.9em] h-[0.9em] ml-2 text-brand-lime fill-brand-lime -mt-1 rotate-12 shrink-0" />
              </span>
            </h1>

            <h2 className="text-lg md:text-2xl font-bold text-[#102117] mb-4">
              Healthy Soil. Stronger Farms. Better Future.
            </h2>

            <p className="text-[#5B665E] text-base md:text-lg mb-10 leading-relaxed font-medium max-w-lg">
              Get instant soil analysis right from your phone. Scan a simple indicator card to check Nitrogen, Phosphorus, Potassium, and pH levels in seconds, not weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Link href="/scan" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 md:h-16 px-8 bg-[#7CBF35] hover:bg-[#6CAE2B] text-white font-bold text-lg rounded-[16px] shadow-[0_8px_25px_-5px_rgba(124,191,53,0.4)] transition-all hover:-translate-y-1 uppercase tracking-wider font-heading">
                  <Leaf className="mr-2.5 h-6 w-6" /> Start Scanning
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-8 border-transparent bg-white hover:bg-zinc-50 text-[#102117] rounded-[16px] text-lg font-bold uppercase tracking-wider font-heading transition-all shadow-md hover:-translate-y-1">
                <Play className="mr-2.5 h-5 w-5 fill-[#102117] text-[#102117]" /> See how it works
              </Button>
            </div>

            {/* Trust indicators pill */}
            <div className="flex bg-white px-6 py-4 rounded-2xl shadow-lg border border-[#EBF1EC] items-center gap-8 md:gap-12 w-full max-w-[480px]">
              <div className="flex items-center gap-3">
                <div className="bg-[#7CBF35] text-white p-1.5 rounded-full">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black text-[#102117] font-heading leading-tight whitespace-nowrap">Lab-Grade</span>
                  <span className="text-[10px] md:text-xs text-[#5B665E] uppercase tracking-widest font-bold whitespace-nowrap">Accuracy</span>
                </div>
              </div>

              <div className="w-px h-10 bg-[#D1DFD5]" />

              <div className="flex items-center gap-3">
                <div className="bg-[#7CBF35] text-white p-1.5 rounded-full">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-black text-[#102117] font-heading uppercase leading-tight tracking-tight whitespace-nowrap">Tested by</span>
                  <span className="text-[10px] md:text-xs text-[#5B665E] uppercase tracking-widest font-bold whitespace-nowrap">Farmers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Visual Mockup / Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex lg:col-span-5 relative h-[600px] items-center justify-end"
          >


            {/* App Mockup UI */}
            <div className="relative w-full max-w-[320px] aspect-[1/2] bg-white rounded-[40px] border-[10px] border-zinc-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col rotate-[-2deg] mt-10">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-xl z-20" />

              <div className="bg-[#F8F8F4] h-full w-full p-5 pt-8 flex flex-col relative">
                {/* Top wavy green shape inside app */}
                <div className="absolute top-0 left-0 w-full h-32 bg-brand-lime/10 z-0 rounded-b-[40px]" />

                <h3 className="text-center font-bold text-foreground mb-6 text-sm relative z-10">Soil Health Score</h3>

                {/* Circular Score */}
                <div className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center rounded-full border-[10px] border-[#EBF1EC] border-t-brand-lime shadow-sm z-10 bg-white">
                  <div className="text-center">
                    <span className="text-4xl font-black text-foreground">82</span>
                    <p className="text-xs font-bold text-brand-lime uppercase">Good</p>
                  </div>
                </div>

                {/* Nutrient Status List */}
                <div className="space-y-3 flex-1 relative z-10">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Nutrient Status</p>
                  {[
                    { label: "Nitrogen", status: "Adequate", color: "text-brand-lime" },
                    { label: "Phosphorus", status: "Low", color: "text-red-500" },
                    { label: "Potassium", status: "Adequate", color: "text-brand-lime" },
                    { label: "Organic Matter", status: "High", color: "text-brand-lime" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-medium border-b border-border/40 pb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Low' ? 'bg-red-500' : 'bg-brand-lime'}`} />
                        <span className="text-foreground">{item.label}</span>
                      </div>
                      <span className={item.color}>{item.status}</span>
                    </div>
                  ))}
                </div>

                {/* Suggestion Card */}
                <div className="mt-auto bg-white p-3 rounded-xl border border-border shadow-sm flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase font-bold">Suggestion</p>
                    <p className="text-xs font-bold text-foreground">Add Phosphorus</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Decorative Wavy Bottom (Matched to PPT style) */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        {/* Wavy solid green layer */}
        <svg viewBox="0 0 1440 180" className="w-full h-auto block" preserveAspectRatio="none">
          {/* Light green shadow/blur layer */}
          <path d="M0,80 C320,160 420,20 720,80 C1020,140 1120,40 1440,80 L1440,180 L0,180 Z" fill="#D9FF9E" opacity="0.4"></path>
          {/* Main green wave */}
          <path d="M0,100 C280,180 480,40 720,100 C960,160 1160,60 1440,100 L1440,180 L0,180 Z" fill="#7CBF35"></path>
          {/* Bottom white wave */}
          <path d="M0,130 C300,190 450,70 720,130 C990,190 1140,90 1440,130 L1440,180 L0,180 Z" fill="#F8F8F4"></path>
        </svg>
      </div>
    </section>
  );
}
