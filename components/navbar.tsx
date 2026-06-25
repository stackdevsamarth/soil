"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";
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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
        isScrolled
          ? "bg-[#F5F2E8]/95 backdrop-blur-md shadow-sm border-b border-black/8"
          : "bg-[#F5F2E8] border-b border-black/8"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16 md:h-[70px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="bg-[#8DC63F] p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Leaf className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-xl tracking-widest text-[#0D1F13] uppercase">
            SoilSense
          </span>
        </Link>

        {/* Desktop Nav — centered */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold text-[#0D1F13]/80 hover:text-[#8DC63F] transition-colors uppercase tracking-[0.16em]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-5 flex-shrink-0">
          <Link
            href="/dashboard"
            className="text-[11px] font-bold text-[#0D1F13]/70 hover:text-[#0D1F13] uppercase tracking-[0.16em] transition-colors"
          >
            Sign In
          </Link>
          <Link href="/scan">
            <button className="flex items-center gap-2 bg-[#8DC63F] hover:bg-[#7ab534] text-white font-bold text-sm uppercase tracking-wide rounded-full px-5 py-2.5 transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-sm">
              Launch App
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-[#0D1F13] hover:bg-black/5 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#F5F2E8] border-b border-black/8 shadow-lg md:hidden z-[55] px-6 py-6"
            >
              <nav className="flex flex-col gap-1">
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
                      className="block py-3 text-base font-bold text-[#0D1F13]/80 hover:text-[#8DC63F] uppercase tracking-widest border-b border-black/5 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-col gap-3 pt-5"
                >
                  <Link href="/dashboard" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-12 rounded-full border-2 border-black/10 text-[#0D1F13] font-bold uppercase tracking-widest text-sm hover:border-[#8DC63F] hover:text-[#8DC63F] transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/scan" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full h-12 bg-[#8DC63F] hover:bg-[#7ab534] text-white font-bold rounded-full text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
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

