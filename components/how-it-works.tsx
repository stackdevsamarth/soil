"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Mix",
    desc: "Take a small soil sample from your field, mix it with water in the preparation tube, and let it settle for a few minutes."
  },
  {
    num: "02",
    title: "Test",
    desc: "Apply a few drops of the liquid sample onto the test card. The indicator patches will change color to show Nitrogen, Phosphorus, and Potassium levels."
  },
  {
    num: "03",
    title: "Scan & Solve",
    desc: "Take a photo of the card inside the app. The system instantly translates the colors into exact nutrient levels and generates a tailored fertilizer plan."
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
              TEST YOUR SOIL IN <br/><span className="text-brand-lime">THREE SIMPLE STEPS.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-4 font-medium">
              No laboratory equipment required. Anyone can test their soil in under ten minutes.
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
