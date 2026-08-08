"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Solutions", href: "/#solutions" },
  { name: "Technology", href: "/#technology" },
  { name: "Market", href: "/#market" },
  { name: "Impact", href: "/#impact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[60] pt-3 md:pt-5 pb-2 px-4 md:px-8 pointer-events-none"
    >
      <div
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-14 md:h-16 rounded-2xl md:rounded-full transition-all duration-500 pointer-events-auto",
          isScrolled
            ? "bg-[#FAF9F5]/85 dark:bg-[#061F12]/85 backdrop-blur-xl border border-black/8 dark:border-white/10 shadow-[0_8px_32px_rgba(2,27,15,0.08)]"
            : "bg-[#FAF9F5]/60 dark:bg-[#061F12]/60 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-sm"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="relative bg-gradient-to-br from-[#7CBF35] to-[#5a9c1e] p-2 rounded-xl text-white shadow-[0_4px_14px_rgba(124,191,53,0.35)] group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
            <Leaf className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-heading font-black text-lg md:text-xl tracking-widest text-[#0D1F13] dark:text-white uppercase flex items-center gap-1.5">
            SoilSense
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7CBF35] animate-pulse" />
          </span>
        </Link>

        {/* Desktop Nav — centered */}
        <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-[11px] font-bold text-[#0D1F13]/80 dark:text-white/80 hover:text-[#0D1F13] dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all uppercase tracking-[0.16em]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <Link
            href="/dashboard"
            className="text-[11px] font-bold text-[#0D1F13]/70 dark:text-white/70 hover:text-[#0D1F13] dark:hover:text-white uppercase tracking-[0.16em] transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link href="/scan">
            <button className="relative group overflow-hidden flex items-center gap-2 bg-gradient-to-r from-[#7CBF35] to-[#68ab24] text-white font-bold text-xs uppercase tracking-wider rounded-full px-5 py-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(124,191,53,0.35)] hover:shadow-[0_6px_25px_rgba(124,191,53,0.5)] hover:scale-[1.02] active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Launch App
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8bd63d] to-[#7CBF35] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl text-[#0D1F13] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[50] md:hidden pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-4 right-4 mt-2 bg-[#F8F8F4] dark:bg-[#061F12] border border-black/10 dark:border-white/10 shadow-2xl rounded-3xl md:hidden z-[55] pointer-events-auto p-6 overflow-hidden"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl text-sm font-bold text-[#0D1F13]/80 dark:text-white/80 hover:text-[#7CBF35] dark:hover:text-[#7CBF35] hover:bg-black/5 dark:hover:bg-white/5 uppercase tracking-widest transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-3 pt-4 border-t border-black/8 dark:border-white/10 mt-2"
                >
                  <Link href="/dashboard" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-12 rounded-2xl border border-black/15 dark:border-white/15 text-[#0D1F13] dark:text-white font-bold uppercase tracking-widest text-xs hover:bg-black/5 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/scan" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-12 bg-gradient-to-r from-[#7CBF35] to-[#68ab24] text-white font-bold rounded-2xl text-xs uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-2">
                      Launch App <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
