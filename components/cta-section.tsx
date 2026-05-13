"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto glass rounded-[48px] p-8 md:p-20 relative overflow-hidden text-center border-white/10"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-lime/10 blur-[120px] -z-10" />
        
        <div className="flex flex-col items-center gap-8 relative z-10">
          <div className="bg-brand-lime p-4 rounded-3xl rotate-12 shadow-[0_0_40px_rgba(141,198,63,0.5)]">
            <Leaf className="h-10 w-10 text-dark-0" />
          </div>
          
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter leading-[0.9] italic uppercase">
            BUILD HEALTHIER SOIL. <br />
            <span className="text-brand-lime">GROW SMARTER.</span>
          </h2>
          
          <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl">
            Join the thousand of farmers and agronomists already using SoilSense to protect our planet's future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            <Link href="/scan">
              <Button size="lg" className="h-16 px-10 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold text-xl rounded-full shadow-2xl hover:scale-105 transition-all">
                Launch App Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-16 px-10 border-white/10 text-white rounded-full text-xl hover:bg-white/5 backdrop-blur-md">
              Book Investor Demo
            </Button>
          </div>
        </div>

        {/* Floating background particles (CSS only) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-brand-lime rounded-full blur-[1px] animate-pulse" />
          <div className="absolute bottom-20 right-20 w-3 h-3 bg-brand-lime rounded-full blur-[2px] animate-pulse delay-700" />
          <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full animate-ping" />
        </div>
      </motion.div>
    </section>
  );
}
