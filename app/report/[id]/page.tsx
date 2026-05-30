"use client";

import { use, useEffect, useState } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { GlowingBackground } from "@/components/glowing-background";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sprout, Leaf, Activity, ArrowLeft, Calendar, ShieldAlert, CheckCircle2, 
  HelpCircle, Share2, Printer, RefreshCw, BarChart3, Database, Droplets, Loader2
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mini deterministic SVG QR Code generator
function MiniQrCode({ value, size = 40 }: { value: string; size?: number }) {
  // Deterministic modules based on string value hashing
  const hash = Array.from(value).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const getPixel = (x: number, y: number) => {
    // Top-left finder pattern (7x7)
    if (x < 7 && y < 7) {
      if (x === 0 || x === 6 || y === 0 || y === 6) return true;
      if (x >= 2 && x <= 4 && y >= 2 && y <= 4) return true;
      return false;
    }
    // Top-right finder pattern (7x7)
    if (x >= 14 && y < 7) {
      const rx = x - 14;
      if (rx === 0 || rx === 6 || y === 0 || y === 6) return true;
      if (rx >= 2 && rx <= 4 && y >= 2 && y <= 4) return true;
      return false;
    }
    // Bottom-left finder pattern (7x7)
    if (x < 7 && y >= 14) {
      const ry = y - 14;
      if (x === 0 || x === 6 || ry === 0 || ry === 6) return true;
      if (x >= 2 && x <= 4 && ry >= 2 && ry <= 4) return true;
      return false;
    }
    // Deterministic random pixel for data
    return (x * 7 + y * 13 + hash) % 3 === 0;
  };

  const grid = [];
  const matrixSize = 21; // 21x21 grid
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (getPixel(x, y)) {
        grid.push({ x, y });
      }
    }
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${matrixSize} ${matrixSize}`}
      className="w-full h-full text-black shrink-0"
    >
      {grid.map((p, i) => (
        <rect 
          key={i} 
          x={p.x} 
          y={p.y} 
          width={1} 
          height={1} 
          fill="#111" 
          shapeRendering="crispEdges"
        />
      ))}
    </svg>
  );
}

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { reports } = useStore();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const foundReport = reports.find((r) => r.id === id);
    if (foundReport) {
      setReport(foundReport);
    }
  }, [id, reports]);

  if (!report) {
    return (
      <main className="relative bg-dark-0 min-h-screen flex items-center justify-center text-white">
        <GlowingBackground />
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 text-brand-lime animate-spin mx-auto" />
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading diagnostics database...</p>
        </div>
      </main>
    );
  }

  const { scanResult, nutrients, recommendedCrops, fertilizerRecommendation, waterRetention, aiInsights, colorMatched, date } = report;
  const qrId = scanResult.qrId || "SSC-QR-2026-X8B";
  const ph = scanResult.ph;

  // Determine pH styling colors
  let phThemeColor = "from-brand-lime to-green-500";
  let phGlowColor = "rgba(141,198,63,0.4)";
  let phBgColor = "bg-brand-lime/10 border-brand-lime/30 text-brand-lime";

  if (ph < 5.5) {
    // Strongly Acidic
    phThemeColor = "from-red-500 to-orange-500";
    phGlowColor = "rgba(239,68,68,0.4)";
    phBgColor = "bg-red-500/10 border-red-500/30 text-red-400";
  } else if (ph >= 5.5 && ph < 6.5) {
    // Slightly Acidic
    phThemeColor = "from-brand-lime to-yellow-500";
    phGlowColor = "rgba(180,198,63,0.4)";
    phBgColor = "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
  } else if (ph >= 6.5 && ph <= 7.5) {
    // Neutral
    phThemeColor = "from-green-500 to-teal-500";
    phGlowColor = "rgba(16,185,129,0.4)";
    phBgColor = "bg-green-500/10 border-green-500/30 text-green-400";
  } else if (ph > 7.5 && ph <= 8.5) {
    // Slightly Alkaline
    phThemeColor = "from-teal-500 to-blue-500";
    phGlowColor = "rgba(14,165,233,0.4)";
    phBgColor = "bg-sky-500/10 border-sky-500/30 text-sky-400";
  } else {
    // Strongly Alkaline
    phThemeColor = "from-blue-600 to-purple-600";
    phGlowColor = "rgba(139,92,246,0.4)";
    phBgColor = "bg-purple-500/10 border-purple-500/30 text-purple-400";
  }

  // Visual NPK progress metrics mapping
  const getNPKMetrics = (status: string) => {
    switch (status) {
      case "Optimal": return { val: 92, text: "Optimal Level", color: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" };
      case "Good": return { val: 82, text: "Healthy Level", color: "bg-brand-lime shadow-[0_0_10px_rgba(141,198,63,0.5)]" };
      case "Balanced": return { val: 75, text: "Balanced", color: "bg-brand-lime shadow-[0_0_10px_rgba(141,198,63,0.5)]" };
      case "Moderate": return { val: 60, text: "Moderate Deficiency", color: "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" };
      case "Medium": return { val: 55, text: "Moderate Deficiency", color: "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" };
      case "Low": return { val: 35, text: "Strong Deficiency", color: "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" };
      case "Locked": return { val: 15, text: "Chemically Locked", color: "bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]" };
      case "Very Low": return { val: 18, text: "Critical Depletion", color: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" };
      default: return { val: 50, text: "Analyzing", color: "bg-zinc-500" };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="relative bg-dark-0 min-h-screen text-white pb-24 selection:bg-brand-lime selection:text-black">
      <GlowingBackground />
      <Navbar />

      <div className="container max-w-5xl mx-auto px-4 md:px-6 pt-28 space-y-8">
        
        {/* Futurized Top Calibration Header - Unique QR ID Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass rounded-3xl p-5 sm:p-6 border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Glowing back-glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/30 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-5 z-10 w-full md:w-auto">
            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0 p-2.5">
              <MiniQrCode value={qrId} size={36} />
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="inline-flex h-2 w-2 rounded-full bg-brand-lime"></span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em]">Verified AI Diagnostic Result</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold italic uppercase tracking-tight flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3">
                QR ID: <span className="text-brand-lime font-mono normal-case tracking-normal break-all">{qrId}</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 z-10 w-full md:w-auto">
            <Link href="/scan">
              <Button variant="outline" className="h-11 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs">
                <RefreshCw className="mr-2 h-4 w-4" /> Scan Again
              </Button>
            </Link>
            <Button onClick={handlePrint} className="h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold uppercase tracking-wider text-xs">
              <Printer className="mr-2 h-4.5 w-4.5" /> Export Report
            </Button>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link href="/dashboard" className="inline-flex items-center text-xs font-bold text-zinc-500 hover:text-brand-lime uppercase tracking-widest transition-colors group">
            <ArrowLeft className="mr-2 h-4.5 w-4.5 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          
          <div className="inline-flex items-center gap-2 text-zinc-500 text-xs font-mono">
            <Calendar className="h-4 w-4" />
            {new Date(date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Main Dial Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 glass-card p-6 sm:p-8 bg-gradient-to-br from-dark-1 via-dark-0 to-dark-1 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden"
          >
              
              {/* Dial Rings */}
              <div className="relative h-56 w-56 sm:h-64 sm:w-64 flex items-center justify-center mt-4">
                {/* Background Track ring */}
                <div className="absolute inset-0 rounded-full border-8 border-white/5"></div>
                {/* Colored visual range glow */}
                <div 
                  className={`absolute inset-0 rounded-full border-8 border-transparent border-t-brand-lime border-r-brand-lime/75 animate-[spin_4s_linear_infinite]`}
                  style={{
                    boxShadow: `0 0 40px ${phGlowColor} inset, 0 0 30px ${phGlowColor}`,
                    borderColor: "transparent"
                  }}
                ></div>
                
                {/* Massive metallic circle inner display */}
                <div className="absolute inset-4 rounded-full bg-zinc-950 border border-white/10 flex flex-col items-center justify-center shadow-2xl">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Measured pH</span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent my-1 py-2.5 px-4 overflow-visible leading-none">
                    {ph.toFixed(1)}
                  </h1>
                  <span className="text-[10px] font-mono text-brand-lime mt-1 tracking-widest uppercase">Confidence: {scanResult.confidence}%</span>
                </div>
              </div>

              <div>
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold uppercase text-xs tracking-widest mb-3 ${phBgColor}`}>
                  <Activity className="h-4.5 w-4.5" /> {scanResult.classification}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tight">
                  Soil Condition: <span className="text-brand-lime">{scanResult.condition}</span>
                </h3>
              </div>
          </motion.div>

          {/* Color Verification Grid: The click vs reference verification proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-heading font-bold text-white uppercase italic tracking-tight mb-2">Color Verification</h3>
              <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                This verification board displays the actual color clicked/captured from the camera sensor side-by-side with the matched database reference.
              </p>

              {colorMatched ? (
                <div className="space-y-5">
                  {[
                    { label: "Universal Pad", scanned: colorMatched.scanned.universal_indicator, reference: colorMatched.reference.universal_indicator },
                    { label: "Methyl Red Pad", scanned: colorMatched.scanned.methyl_red, reference: colorMatched.reference.methyl_red },
                    { label: "Thymol Blue Pad", scanned: colorMatched.scanned.thymol_blue, reference: colorMatched.reference.thymol_blue }
                  ].map((pad, idx) => (
                    <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2.5">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{pad.label}</div>
                      <div className="flex items-center justify-between gap-4">
                        
                        {/* Scanned/Clicked Color */}
                        <div className="flex-1 flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg border border-white/20 shadow-md" style={{ backgroundColor: pad.scanned }} />
                          <div>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Captured</span>
                            <span className="text-[10px] font-mono font-bold text-white">{pad.scanned}</span>
                          </div>
                        </div>

                        <div className="text-xs text-brand-lime font-mono font-bold">»</div>

                        {/* Reference Color */}
                        <div className="flex-1 flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg border border-white/20 shadow-md" style={{ backgroundColor: pad.reference }} />
                          <div>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Reference</span>
                            <span className="text-[10px] font-mono font-bold text-white">{pad.reference}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <HelpCircle className="h-8 w-8 text-zinc-600 mb-2" />
                  <span className="text-xs text-zinc-500 font-mono">Verification info missing</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 text-[9px] font-mono text-zinc-600 uppercase tracking-widest text-center">
              AI Calibration Matrix Match
            </div>
          </motion.div>

          {/* Nutrients & Health Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass-card p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xl font-heading font-bold text-white uppercase italic tracking-tight">Chemical Nutrients</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime/10 text-brand-lime font-bold uppercase text-[9px] tracking-wider border border-brand-lime/20">
                <BarChart3 className="h-3.5 w-3.5" /> NPK Analysis Metrics
              </span>
            </div>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
              {[
                { name: "Nitrogen (N)", status: nutrients.nitrogen, symbol: "N" },
                { name: "Phosphorus (P)", status: nutrients.phosphorus, symbol: "P" },
                { name: "Potassium (K)", status: nutrients.potassium, symbol: "K" }
              ].map((n, idx) => {
                const metric = getNPKMetrics(n.status);
                return (
                  <div key={idx} className="bg-dark-1/40 border border-white/5 rounded-2xl p-4 sm:p-5 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute right-3 top-3 font-heading font-black text-6xl text-white/[0.02] pointer-events-none group-hover:scale-110 transition-transform">{n.symbol}</div>
                    
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">{n.name}</span>
                    <span className={`text-xl font-heading font-bold italic uppercase tracking-tight block mb-4 ${
                      n.status === "Locked" || n.status === "Very Low" ? "text-red-400" : n.status === "Low" ? "text-orange-400" : "text-brand-lime"
                    }`}>
                      {n.status}
                    </span>

                    {/* Progress Slider */}
                    <div className="space-y-1.5">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.val}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`h-full rounded-full ${metric.color}`}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                        <span>Deficient</span>
                        <span>Optimal</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Other parameters */}
            <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Droplets className="h-4.5 w-4.5 text-brand-lime" /> Soil Water Retention
                </span>
                <span className="text-sm font-bold text-white font-mono uppercase tracking-widest">{waterRetention}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Activity className="h-4.5 w-4.5 text-brand-lime" /> Soil Health Index
                </span>
                <span className="text-sm font-bold text-brand-lime font-mono uppercase tracking-widest">{report.scanResult.soilHealthScore}%</span>
              </div>
            </div>
          </motion.div>

          {/* AI Critical Insights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6 sm:p-8"
          >
            <h3 className="text-lg font-heading font-bold text-white uppercase italic tracking-tight mb-6">Diagnostics Log</h3>
            <ul className="space-y-5">
              {aiInsights.map((insight: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3.5 group">
                  <div className="bg-brand-lime/10 border border-brand-lime/20 p-2 rounded-xl text-brand-lime mt-0.5 group-hover:scale-110 transition-transform">
                    <Leaf className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-200 transition-colors">
                    {insight}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Crop Suitability Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 glass-card p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xl font-heading font-bold text-white uppercase italic tracking-tight">Plant Suitability Index</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime/10 text-brand-lime font-bold uppercase text-[9px] tracking-wider border border-brand-lime/20">
                <Sprout className="h-3.5 w-3.5" /> Botanical Affinities
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {recommendedCrops.map((crop: string, idx: number) => (
                <div 
                  key={idx} 
                  className="p-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-brand-lime/20 rounded-2xl flex items-center gap-4 transition-all group hover:-translate-y-1 shadow-md"
                >
                  <div className="h-10 w-10 bg-brand-lime/10 rounded-xl flex items-center justify-center text-brand-lime group-hover:scale-110 transition-transform border border-brand-lime/15">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors block">{crop}</span>
                    <span className="text-[9px] text-zinc-600 font-mono tracking-widest block uppercase">Compatible Crop</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Soil Corrective Recommendations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-lg font-heading font-bold text-white uppercase italic tracking-tight">Agronomic Interventions</h3>
            
            <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex items-start gap-4">
              <ShieldAlert className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0 animate-pulse" />
              <div>
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest block mb-1">Soil Amendments Summary</span>
                <span className="text-xs text-zinc-400 font-medium leading-relaxed block">
                  {fertilizerRecommendation}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Action Plan Guide</span>
              <div className="space-y-3">
                <div className="flex gap-3 text-xs">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-lime shrink-0" />
                  <span className="text-zinc-400 font-medium">Verify card calibration with a water test card regularly.</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-lime shrink-0" />
                  <span className="text-zinc-400 font-medium">Perform three different sensor scans across field quadrants.</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-lime shrink-0" />
                  <span className="text-zinc-400 font-medium">Coordinate amendment additions prior to planting season cycle.</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </main>
  );
}
