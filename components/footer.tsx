"use client";

import Link from "next/link";
import { Leaf, Globe, Shield, Zap, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark-0 pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-8 group">
            <div className="bg-brand-lime p-2 rounded-xl">
              <Leaf className="h-6 w-6 text-dark-0" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-white uppercase italic">SoilSense</span>
          </Link>
          <p className="text-zinc-500 text-lg max-w-sm mb-8 leading-relaxed">
            Revolutionizing global agriculture through AI-powered soil intelligence. Building a sustainable future, one scan at a time.
          </p>
          <div className="flex gap-4">
            {[Globe, Shield, Zap, Mail].map((Icon, i) => (
              <Link key={i} href="#" className="p-3 rounded-full bg-white/5 text-zinc-400 hover:text-brand-lime hover:bg-brand-lime/10 transition-all border border-transparent hover:border-brand-lime/20">
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Platform</h4>
          <ul className="space-y-4">
            {["Technology", "Diagnostics", "Cloud AI", "Security", "Marketplace"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-zinc-500 hover:text-brand-lime transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-white uppercase tracking-widest text-sm mb-6">Company</h4>
          <ul className="space-y-4">
            {["About Us", "Impact", "Partners", "Investors", "Careers"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-zinc-500 hover:text-brand-lime transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-600 text-sm">
          © 2026 SoilSense Intelligence Inc. Engineered for the planet.
        </p>
        <div className="flex gap-8">
          <Link href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Terms of Service</Link>
          <Link href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Cookie Policy</Link>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-brand-lime/5 blur-[120px] rounded-full -z-10" />
    </footer>
  );
}
