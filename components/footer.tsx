"use client";

import Link from "next/link";
import { Leaf, Globe, Shield, Zap, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#021B0F] pt-24 pb-12 px-6 border-t border-white/10 relative overflow-hidden text-white">
      {/* Decorative Glow Leaks */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7CBF35]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#7CBF35]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 relative z-10 pb-16">
        
        {/* Brand Info (Cols 1-6) */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="bg-gradient-to-br from-[#7CBF35] to-[#5a9c1e] p-2.5 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
                <Leaf className="h-6 w-6 text-[#021B0F]" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-black text-2xl tracking-widest text-white uppercase flex items-center gap-1.5">
                SoilSense
                <span className="w-1.5 h-1.5 rounded-full bg-[#7CBF35] animate-pulse" />
              </span>
            </Link>

            <p className="text-zinc-400 text-base md:text-lg max-w-md mb-8 leading-relaxed font-medium">
              Providing accessible soil testing and targeted nutrient management to growers worldwide. Building a sustainable future, one scan at a time.
            </p>
          </div>

          <div className="flex gap-3">
            {[
              { icon: Globe, label: "Website" },
              { icon: Shield, label: "Security" },
              { icon: Zap, label: "Speed" },
              { icon: Mail, label: "Contact" },
            ].map((item, i) => (
              <Link
                key={i}
                href="#"
                aria-label={item.label}
                className="p-3 rounded-2xl bg-white/5 text-zinc-400 hover:text-[#7CBF35] hover:bg-[#7CBF35]/15 transition-all border border-white/10 hover:border-[#7CBF35]/30 hover:scale-105"
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Platform Links (Cols 7-9) */}
        <div className="md:col-span-3">
          <h4 className="font-heading font-extrabold text-white uppercase tracking-[0.2em] text-xs mb-6 text-[#7CBF35]">
            Platform
          </h4>
          <ul className="space-y-3.5">
            {["Technology", "Diagnostics", "Diagnostics Dashboard", "Security", "Marketplace"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7CBF35] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links (Cols 10-12) */}
        <div className="md:col-span-3">
          <h4 className="font-heading font-extrabold text-white uppercase tracking-[0.2em] text-xs mb-6 text-[#7CBF35]">
            Company
          </h4>
          <ul className="space-y-3.5">
            {["About Us", "Impact", "Partners", "Investors", "Careers"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7CBF35] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-400">
        <p>
          © 2026 SoilSense Intelligence Inc. Handcrafted with 💚 by Techetarian
        </p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
