"use client";

import { motion } from "framer-motion";

const features = [
  "AI Analysis",
  "Computer Vision",
  "Machine Learning",
  "Edge Computing",
  "Real-Time Processing"
];

export function TechnologySection() {
  return (
    <section className="py-24 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left: Premium Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[32px] overflow-hidden relative shadow-2xl">
               <div className="absolute inset-0 bg-dark-1/10 mix-blend-multiply z-10" />
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/80 to-[#8B5A2B]/40 z-0 flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                 <span className="text-white/60 font-bold uppercase tracking-widest text-sm z-20">Technology Setup Image</span>
               </div>
            </div>
            {/* Floating Performance Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 rounded-[24px] shadow-xl border border-border"
            >
               <div className="flex flex-col gap-1">
                 <span className="text-brand-lime font-heading font-black text-3xl">+94%</span>
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">accuracy vs lab baseline</span>
               </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-brand-lime uppercase tracking-widest mb-4 block">Core Technology</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 tracking-tight text-foreground leading-[1.1]">
              PRECISION SCIENCE, <br/>ENGINEERED FOR THE FIELD.
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg mb-10 font-medium">
              <p>
                SoilSense combines colorimetric chemical sensing with vision-based spectroscopy and adaptive AI calibration — delivering results that rival professional laboratory equipment at a fraction of the cost and time.
              </p>
              <p>
                The AI accounts for lighting variability, strip age, and sample temperature to produce consistent, reliable readings across diverse field conditions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="px-5 py-2.5 rounded-full border border-[#D1DFD5] bg-[#EBF1EC] text-foreground text-sm font-bold shadow-sm"
                >
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
