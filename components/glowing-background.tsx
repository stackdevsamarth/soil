"use client";

import { motion } from "framer-motion";

export function GlowingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-deep/20 rounded-full blur-[120px]"
      />
      
      {/* Secondary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-lime/10 rounded-full blur-[100px]"
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(141, 198, 63, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(141, 198, 63, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise" />
    </div>
  );
}
