"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2, Sparkles, Sun, Moon, CloudSun, ShieldCheck, Camera, Layers, Zap } from "lucide-react";

const features = [
  "Instant Digital Reading",
  "Shadow & Light Correction",
  "Simple Color Indicators",
  "Step-by-Step Guidance",
  "No Internet Needed"
];

const featureDetails: Record<string, string> = {
  "Instant Digital Reading": "Converts physical strip color gradients into calibrated NPK numbers within 300 milliseconds on-device.",
  "Shadow & Light Correction": "Patented optical matrix normalizes ambient light variations from 1,000 Lux up to 100,000 Lux direct sunlight.",
  "Simple Color Indicators": "Replaces confusing chemical color charts with clear numerical status badges.",
  "Step-by-Step Guidance": "Audio and visual cues guide farmers through exact timing for reagent immersion.",
  "No Internet Needed": "Executes fully offline using lightweight TensorFlow Lite neural models embedded in the mobile app."
};

const lightModes = [
  { id: "sun", label: "Full Sun", lux: "85,000 Lux", temp: "5500K", icon: Sun },
  { id: "shadow", label: "Shadow Canopy", lux: "12,000 Lux", temp: "6800K", icon: CloudSun },
  { id: "dusk", label: "Low Light", lux: "3,500 Lux", temp: "3200K", icon: Moon },
];

export function TechnologySection() {
  const [activeFeature, setActiveFeature] = useState<string>("Shadow & Light Correction");
  const [currentLightMode, setCurrentLightMode] = useState<string>("shadow");

  const selectedLight = lightModes.find(m => m.id === currentLightMode) || lightModes[1];

  return (
    <section id="technology" className="pt-48 md:pt-56 pb-36 md:pb-48 relative bg-[#F8F8F4] dark:bg-[#021B0F] overflow-hidden scroll-mt-36">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#7CBF35]/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Memphis Floating Accent Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-4 border-dashed border-[#7CBF35]/35 animate-spin-slow pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-[1400px] relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 lg:gap-24 items-center">

          {/* Left: Premium MASSIVE Interactive Tech HUD Card (h-[620px]) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="h-[520px] md:h-[620px] rounded-[48px] overflow-hidden relative shadow-[0_30px_75px_rgba(2,27,15,0.3)] border-2 border-black/10 dark:border-white/20 bg-slate-950 p-8 flex flex-col justify-between group">
              
              {/* Real High-Resolution Unsplash Smart Farming Tech Image - MASSIVE & Full Color */}
              <img 
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80"
                alt="Technology Setup"
                className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#021B0F] via-[#021B0F]/30 to-black/40" />
              
              {/* Memphis Tech Reticle HUD Overlay */}
              <div className="absolute inset-0 border-2 border-white/20 m-6 rounded-[38px] pointer-events-none flex flex-col justify-between p-6 z-10">
                <div className="flex justify-between items-start">
                  <div className="w-7 h-7 border-t-4 border-l-4 border-[#7CBF35]" />
                  <div className="w-7 h-7 border-t-4 border-r-4 border-[#7CBF35]" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-7 h-7 border-b-4 border-l-4 border-[#7CBF35]" />
                  <div className="w-7 h-7 border-b-4 border-r-4 border-[#7CBF35]" />
                </div>
              </div>

              {/* HUD Header Status */}
              <div className="flex justify-between items-center relative z-20">
                <div className="flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-md">
                  <Cpu className="w-5 h-5 text-[#7CBF35]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">AI Color Calibration</span>
                </div>

                <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7CBF35] animate-pulse" />
                  <span className="text-xs font-mono text-zinc-200 font-bold">LIVE SENSOR</span>
                </div>
              </div>

              {/* Center Content & Interactive Light Corrector Simulation */}
              <div className="relative z-20 text-center py-8 my-auto">
                <div className="w-24 h-24 rounded-3xl bg-black/85 border border-white/25 flex items-center justify-center mx-auto mb-5 backdrop-blur-md shadow-2xl group-hover:scale-110 transition-transform">
                  <selectedLight.icon className="w-12 h-12 text-[#7CBF35]" />
                </div>

                {/* Preserved Content Text Label Badge */}
                <div className="inline-block bg-black/85 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-white/25 mb-4 shadow-lg">
                  <span className="text-white font-extrabold uppercase tracking-widest text-base md:text-lg block drop-shadow-md">
                    Technology Setup Image
                  </span>
                </div>
                
                <p className="text-zinc-200 text-xs md:text-sm font-mono max-w-xs mx-auto mb-5 bg-black/80 px-5 py-2 rounded-full inline-block border border-white/20">
                  {selectedLight.label} Auto-Corrected ({selectedLight.lux})
                </p>

                {/* Interactive Lighting Mode Switcher Buttons */}
                <div className="flex justify-center gap-3 mt-2">
                  {lightModes.map((mode) => {
                    const active = mode.id === currentLightMode;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setCurrentLightMode(mode.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                          active
                            ? "bg-[#7CBF35] text-[#021B0F] shadow-[0_0_25px_rgba(124,191,53,0.7)] scale-105"
                            : "bg-black/80 text-zinc-200 hover:bg-white/20 border border-white/20"
                        }`}
                      >
                        <mode.icon className="w-4 h-4" />
                        <span>{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* HUD Bottom Footer */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-300 relative z-20 pt-4 border-t border-white/20 bg-black/85 backdrop-blur-md -mx-8 -mb-8 px-8 py-4 rounded-b-[46px]">
                <span>LIGHT MATRIX: {selectedLight.temp}</span>
                <span className="text-[#7CBF35] font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 100% OFFLINE CAPABLE
                </span>
              </div>

            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#7CBF35]/15 border border-[#7CBF35]/35 text-[#7CBF35] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-5">
              <Sparkles className="w-4 h-4 text-[#7CBF35]" />
              Core Technology
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 tracking-tight text-[#021B0F] dark:text-white leading-[1.05]">
              PRECISION SCIENCE, <br />
              <span className="inline-block pr-3 pb-1 text-[#7CBF35] bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] to-[#5a9c1e]">
                ENGINEERED FOR THE FIELD.
              </span>
            </h2>

            <div className="space-y-4 text-[#5B665E] dark:text-zinc-300 text-lg md:text-xl mb-10 font-medium leading-relaxed">
              <p>
                SoilSense uses simple chemical indicator cards designed for the field, combined with smartphone imaging. Our smart calibration system automatically adjusts for different sunlight and shadows, giving you clear, reliable readings without needing expensive laboratory hardware.
              </p>
              <p>
                The app automatically corrects for field conditions—like bright sunlight, cloudy skies, or shadows—ensuring you get a consistent, accurate reading every single time.
              </p>
            </div>

            {/* Interactive Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature, i) => {
                const isSelected = activeFeature === feature;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveFeature(feature)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-xs md:text-sm font-bold shadow-sm transition-all duration-300 ${
                      isSelected
                        ? "bg-[#7CBF35] text-[#021B0F] border-[#7CBF35] shadow-[0_6px_25px_rgba(124,191,53,0.4)] scale-105"
                        : "bg-white dark:bg-[#0A2616] border-black/8 dark:border-white/10 text-[#021B0F] dark:text-white hover:border-[#7CBF35]"
                    }`}
                  >
                    <CheckCircle2 className={`w-4.5 h-4.5 shrink-0 ${isSelected ? "text-[#021B0F]" : "text-[#7CBF35]"}`} />
                    <span>{feature}</span>
                  </button>
                );
              })}
            </div>

            {/* Feature Technical Explanation Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-[#0A2616] p-6 rounded-3xl border border-black/8 dark:border-white/10 shadow-md flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#7CBF35]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-5 h-5 text-[#7CBF35]" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#7CBF35] mb-1">
                    {activeFeature}
                  </h4>
                  <p className="text-xs md:text-sm text-[#5B665E] dark:text-zinc-300 font-medium leading-relaxed">
                    {featureDetails[activeFeature]}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
