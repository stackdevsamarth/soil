"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-4 md:px-6 py-4",
        isScrolled ? "py-2" : "py-6"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-4 md:px-8 py-2 md:py-3 border",
        isScrolled 
          ? "bg-dark-1/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-transparent"
      )}>
        <Link href="/" className="flex items-center gap-2 group relative z-[70]">
          <div className="bg-brand-lime p-1.5 md:p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(141,198,63,0.3)]">
            <Leaf className="h-5 w-5 md:h-6 md:w-6 text-dark-0" />
          </div>
          <span className="font-heading font-bold text-lg md:text-2xl tracking-tighter text-white uppercase italic">SoilSense</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-zinc-400 hover:text-brand-lime transition-all uppercase tracking-widest hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-full font-bold uppercase tracking-wider text-xs">
              Sign In
            </Button>
          </Link>
          <Link href="/scan">
            <Button className="bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full px-8 h-11 shadow-[0_0_25px_-5px_rgba(141,198,63,0.4)] transition-all hover:scale-105 active:scale-95">
              Launch App <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-[70] p-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-24 left-4 right-4 bg-dark-1 border border-white/10 rounded-[32px] p-8 shadow-2xl md:hidden z-[55] backdrop-blur-2xl"
            >
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-heading font-bold text-zinc-400 hover:text-brand-lime transition-all uppercase italic tracking-tight block py-2 border-b border-white/5"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-4 pt-6"
                >
                  <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full h-14 rounded-full border-white/10 text-white font-bold uppercase tracking-widest text-sm">Sign In</Button>
                  </Link>
                  <Link href="/scan" className="w-full">
                    <Button className="w-full h-14 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full text-lg shadow-[0_10px_20px_-5px_rgba(141,198,63,0.3)]">Launch App</Button>
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
