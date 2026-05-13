"use client";

import { useStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Droplets, Activity, ChevronRight, Sprout, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { reports } = useStore();
  const latestReport = reports.length > 0 ? reports[0] : null;

  return (
    <div className="min-h-screen bg-dark-0 pb-20 pt-24 px-4 md:px-8">
      <div className="container max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-brand-lime font-mono text-[10px] tracking-[0.3em] uppercase mb-2">Farmer Overview</div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white italic tracking-tighter uppercase">My <span className="text-brand-lime">Soil</span></h1>
          </motion.div>
          
          <Link href="/scan">
            <Button size="lg" className="bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full h-14 px-10 shadow-[0_10px_20px_-5px_rgba(141,198,63,0.3)]">
              <Plus className="mr-2 h-5 w-5" /> New Scan
            </Button>
          </Link>
        </div>

        {latestReport ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Health Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full lg:col-span-2 glass-card p-1"
            >
              <div className="bg-gradient-to-br from-brand-deep/40 to-brand-lime/10 rounded-[30px] p-8 h-full flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Overall Soil Health</div>
                  <div className="text-8xl font-heading font-bold text-brand-lime tracking-tighter mb-4">{latestReport.scanResult.soilHealthScore}%</div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/20 border border-brand-lime/30 text-brand-lime font-bold uppercase text-[10px] tracking-widest">
                    <Activity className="h-4 w-4" /> {latestReport.scanResult.condition}
                  </div>
                </div>
                
                <div className="flex-1 max-w-sm w-full space-y-6">
                   <div className="bg-dark-1/50 rounded-2xl p-6 border border-white/5 backdrop-blur-md">
                      <div className="flex justify-between text-xs font-bold uppercase text-zinc-500 mb-4 tracking-widest">
                         <span>Nitrogen</span>
                         <span className="text-white">{latestReport.nutrients.nitrogen}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: "85%" }} 
                           className="h-full bg-brand-lime shadow-[0_0_10px_rgba(141,198,63,0.5)]" 
                         />
                      </div>
                   </div>
                   <div className="bg-dark-1/50 rounded-2xl p-6 border border-white/5 backdrop-blur-md">
                      <div className="flex justify-between text-xs font-bold uppercase text-zinc-500 mb-4 tracking-widest">
                         <span>Phosphorus</span>
                         <span className="text-white">{latestReport.nutrients.phosphorus}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           animate={{ width: "92%" }} 
                           className="h-full bg-brand-accent shadow-[0_0_10px_rgba(141,198,63,0.5)]" 
                         />
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* pH Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 flex flex-col justify-between"
            >
               <div>
                  <div className="bg-brand-lime/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                     <Droplets className="h-6 w-6 text-brand-lime" />
                  </div>
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Latest pH Level</div>
                  <div className="text-6xl font-heading font-bold text-white mb-2 italic tracking-tighter">{latestReport.scanResult.ph.toFixed(1)}</div>
                  <div className="text-sm text-zinc-400 font-medium">Confidence: {latestReport.scanResult.confidence}%</div>
               </div>
               <div className="mt-8 pt-8 border-t border-white/5">
                  <Link href={`/report/${latestReport.id}`}>
                     <Button variant="ghost" className="w-full text-brand-lime hover:bg-brand-lime/10 hover:text-brand-lime font-bold uppercase tracking-widest text-xs h-12 rounded-xl">
                        View Detailed Report <ChevronRight className="ml-2 h-4 w-4" />
                     </Button>
                  </Link>
               </div>
            </motion.div>

            {/* AI Insights Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-full md:col-span-1 lg:col-span-1 glass-card p-8"
            >
               <h3 className="text-xl font-heading font-bold text-white uppercase italic tracking-tight mb-8">AI Insights</h3>
               <ul className="space-y-6">
                  {latestReport.aiInsights.slice(0, 3).map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <div className="bg-brand-lime/20 p-2 rounded-xl text-brand-lime group-hover:scale-110 transition-transform">
                        <Leaf className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-zinc-400 leading-relaxed font-medium group-hover:text-white transition-colors">{insight}</span>
                    </li>
                  ))}
               </ul>
            </motion.div>

            {/* History List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-full lg:col-span-2 glass-card p-8"
            >
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-heading font-bold text-white uppercase italic tracking-tight">Recent Scans</h3>
                  <Link href="/history" className="text-brand-lime text-xs font-bold uppercase tracking-widest hover:underline">View All</Link>
               </div>
               <div className="space-y-4">
                  {reports.slice(0, 4).map((report) => (
                    <Link 
                      key={report.id} 
                      href={`/report/${report.id}`} 
                      className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-6">
                         <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center font-bold text-brand-lime group-hover:scale-110 transition-transform">
                            {report.scanResult.ph}
                         </div>
                         <div>
                           <p className="font-bold text-white group-hover:text-brand-lime transition-colors">{report.scanResult.classification}</p>
                           <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">{new Date(report.date).toLocaleDateString()}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                            report.scanResult.soilHealthScore > 80 ? 'bg-brand-lime/10 border-brand-lime/20 text-brand-lime' : 'bg-orange-500/10 border-orange-500/20 text-orange-500'
                         }`}>
                           {report.scanResult.condition}
                         </div>
                         <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:text-brand-lime transition-colors" />
                      </div>
                    </Link>
                  ))}
               </div>
            </motion.div>

          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center glass-card border-dashed p-12 bg-white/[0.01]"
          >
            <div className="h-24 w-24 rounded-3xl bg-brand-lime/10 flex items-center justify-center mb-8 shadow-2xl border border-brand-lime/20">
              <Sprout className="h-12 w-12 text-brand-lime" />
            </div>
            <h3 className="text-3xl font-heading font-bold text-white uppercase italic tracking-tighter mb-4">No Data Detected</h3>
            <p className="text-zinc-500 max-w-sm text-lg mb-10 font-medium">
              You haven't scanned any soil samples yet. Run your first AI-calibrated scan to generate your health report.
            </p>
            <Link href="/scan">
              <Button className="h-14 px-12 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full text-lg shadow-2xl">
                Run First Scan
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
