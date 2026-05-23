"use client";

import { useStore } from "@/store";
import { Navbar } from "@/components/navbar";
import { GlowingBackground } from "@/components/glowing-background";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sprout, Leaf, Activity, ArrowLeft, Calendar, Search, 
  ChevronRight, Database, Droplets, Trash2, ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const { reports } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter((report) => {
    const term = searchTerm.toLowerCase();
    const qrId = (report.scanResult.qrId || "").toLowerCase();
    const classification = (report.scanResult.classification || "").toLowerCase();
    const condition = (report.scanResult.condition || "").toLowerCase();
    return qrId.includes(term) || classification.includes(term) || condition.includes(term);
  });

  // Calculate statistics
  const totalScans = reports.length;
  const averagePh = totalScans > 0 
    ? (reports.reduce((acc, r) => acc + r.scanResult.ph, 0) / totalScans).toFixed(1) 
    : "N/A";
  const optimalCount = reports.filter(r => r.scanResult.soilHealthScore >= 80).length;

  return (
    <main className="relative bg-dark-0 min-h-screen text-white pb-24 selection:bg-brand-lime selection:text-black">
      <GlowingBackground />
      <Navbar />

      <div className="container max-w-5xl mx-auto px-4 md:px-6 pt-28 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-brand-lime font-mono text-[10px] tracking-[0.3em] uppercase mb-2">Scan Archives</div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white italic tracking-tighter uppercase">
              Scan <span className="text-brand-lime">History</span>
            </h1>
          </motion.div>
          
          <Link href="/scan">
            <Button size="lg" className="bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full h-13 px-8 shadow-[0_10px_20px_-5px_rgba(141,198,63,0.3)]">
              <Sprout className="mr-2 h-4.5 w-4.5" /> Start New Scan
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          <div className="glass-card p-5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Total Archives</span>
            <span className="text-3xl font-heading font-bold text-white italic">{totalScans} Scans</span>
          </div>
          <div className="glass-card p-5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Average Soil pH</span>
            <span className="text-3xl font-heading font-bold text-brand-lime italic">pH {averagePh}</span>
          </div>
          <div className="glass-card p-5 col-span-2 md:col-span-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Healthy Samples</span>
            <span className="text-3xl font-heading font-bold text-green-400 italic">
              {optimalCount} / {totalScans}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search archives by QR ID, classification, or soil condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white/[0.02] border-white/10 text-white rounded-2xl focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 font-mono text-sm placeholder:font-sans placeholder:text-zinc-500"
          />
        </div>

        {/* Scan List */}
        {filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report, idx) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  href={`/report/${report.id}`} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-lime/20 transition-all group gap-4"
                >
                  <div className="flex items-center gap-5">
                    {/* Circle Indicator pH */}
                    <div className="h-14 w-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center font-heading font-black text-xl text-brand-lime group-hover:scale-110 group-hover:border-brand-lime/30 transition-all">
                      {report.scanResult.ph.toFixed(1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white group-hover:text-brand-lime transition-colors">
                          {report.scanResult.classification}
                        </span>
                        <span className="text-[9px] font-mono text-brand-lime/80 bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/15 uppercase">
                          {report.scanResult.qrId || "SSC-QR"}
                        </span>
                      </div>
                      
                      <div className="flex gap-4 text-[10px] text-zinc-500 font-mono">
                        <span className="uppercase tracking-wider flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> 
                          {new Date(report.date).toLocaleDateString()}
                        </span>
                        <span className="uppercase tracking-wider">
                          NPK: {report.nutrients.nitrogen.substring(0, 3)}/{report.nutrients.phosphorus.substring(0, 3)}/{report.nutrients.potassium.substring(0, 3)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      report.scanResult.soilHealthScore >= 80 
                        ? 'bg-brand-lime/10 border-brand-lime/25 text-brand-lime' 
                        : 'bg-orange-500/10 border-orange-500/25 text-orange-400'
                    }`}>
                      {report.scanResult.condition}
                    </div>
                    <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-brand-lime transition-colors hidden sm:block" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center glass-card border-dashed p-12 bg-white/[0.01]">
            <div className="h-20 w-20 rounded-2xl bg-brand-lime/10 flex items-center justify-center mb-6 border border-brand-lime/20">
              <Database className="h-10 w-10 text-brand-lime" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tighter mb-2">No Archives Found</h3>
            <p className="text-zinc-500 max-w-sm text-sm mb-6 leading-relaxed">
              No chemical scans matched your search criteria. Try filtering by another condition or QR calibration ID.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
