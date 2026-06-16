"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Prepare",
    desc: "Use the SoilSense preparation tool to mix soil and water in the right ratio. Get a clean, uniform liquid sample in minutes."
  },
  {
    num: "02",
    title: "Detect",
    desc: "Apply a few drops of the liquid sample to the chemical card. Watch the colors respond and reveal key nutrient signals."
  },
  {
    num: "03",
    title: "Decide",
    desc: "Scan the card with our AI app. Get instant analysis, expert guidance, and actionable recommendations for your soil."
  }
];

export function HowItWorks() {
  return (
    <section className="py-32 relative bg-[#F8F8F4]">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <span className="text-sm font-bold text-brand-lime uppercase tracking-widest">Our Process</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1]">
              FROM SOIL TO <span className="text-brand-lime">SOLUTION.</span><br/> THREE SIMPLE STEPS.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-4 font-medium">
              A seamless workflow that turns raw soil into actionable insights.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-brand-lime/30 z-0">
             <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-lime" />
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-lime" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-lime" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-[#F8F8F4] w-24 h-24 rounded-full flex items-center justify-center mb-6 relative">
                   <span className="text-5xl font-heading font-black text-brand-lime relative z-10">{step.num}</span>
                   {/* Clean background behind number to cut the line */}
                   <div className="absolute inset-0 bg-[#F8F8F4] -z-10 rounded-full" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
