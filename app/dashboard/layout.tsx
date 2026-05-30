import Link from "next/link";
import { Home, ScanLine, FileText } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { GlowingBackground } from "@/components/glowing-background";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-dark-0 text-white relative selection:bg-brand-lime selection:text-black">
      {/* Dynamic cinematic backgrounds */}
      <GlowingBackground />
      
      {/* Unified premium navigation header */}
      <Navbar />

      <main className="flex-1 pb-24 md:pb-0 pt-16 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation (Glassmorphic) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-dark-1/80 border-t border-white/5 backdrop-blur-xl flex items-center justify-around z-50 px-4 pb-safe shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
        <Link href="/dashboard" className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-brand-lime active:text-brand-lime transition-colors">
          <Home className="h-5 w-5" />
          <span className="text-[9px] font-mono tracking-wider uppercase mt-1 font-bold">Home</span>
        </Link>
        <Link href="/scan" className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-brand-lime transition-all">
          <div className="bg-brand-lime hover:bg-brand-accent text-dark-0 p-3.5 rounded-2xl -mt-8 shadow-lg shadow-brand-lime/20 border border-white/10 hover:scale-105 active:scale-95 transition-all">
            <ScanLine className="h-5.5 w-5.5" />
          </div>
          <span className="text-[9px] font-mono tracking-wider uppercase mt-1 font-bold">Scan</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-brand-lime transition-colors">
          <FileText className="h-5 w-5" />
          <span className="text-[9px] font-mono tracking-wider uppercase mt-1 font-bold">History</span>
        </Link>
      </nav>
    </div>
  );
}
