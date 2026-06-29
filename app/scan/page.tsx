"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { X, RefreshCw, ScanLine, Loader2, AlertTriangle, Check, Camera, HelpCircle, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { matchTripleIndicator } from "@/utils/color";
import { motion, AnimatePresence } from "framer-motion";

const presets = [
  {
    name: "Slightly Acidic (Optimal for Rice/Corn)",
    ph: 5.5,
    ui: "#7CE000",
    mr: "#FFC000",
    tb: "#FFFF00",
    desc: "Perfect agricultural balance for acid-tolerant crops"
  },
  {
    name: "Neutral Balance (Perfect General Agriculture)",
    ph: 7.0,
    ui: "#006400",
    mr: "#FFFF00",
    tb: "#FFFF00",
    desc: "Maximum nutrient absorption efficiency"
  },
  {
    name: "Strongly Acidic (Needs Liming)",
    ph: 4.5,
    ui: "#D0FF00",
    mr: "#FF5400",
    tb: "#FFFF00",
    desc: "High risk of phosphorus lockout and aluminum toxicity"
  },
  {
    name: "Alkaline Soil (Needs Sulfur)",
    ph: 8.5,
    ui: "#00BFFF",
    mr: "#FFFF00",
    tb: "#CCFF99",
    desc: "Common in arid regions, causes trace element chlorosis"
  }
];

export default function ScanPage() {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const { addReport } = useStore();

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [qrId, setQrId] = useState<string>("");
  
  // Track selected preset for simulation/testing
  const [activePresetIdx, setActivePresetIdx] = useState<number>(0);
  
  // Dynamic color parameters based on active preset
  const [uiColor, setUiColor] = useState(presets[0].ui);
  const [mrColor, setMrColor] = useState(presets[0].mr);
  const [tbColor, setTbColor] = useState(presets[0].tb);

  // Sync colors when preset is updated
  useEffect(() => {
    setUiColor(presets[activePresetIdx].ui);
    setMrColor(presets[activePresetIdx].mr);
    setTbColor(presets[activePresetIdx].tb);
  }, [activePresetIdx]);

  // Shutter flash effect
  const [shutterFlash, setShutterFlash] = useState(false);

  const capture = useCallback(() => {
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 150);

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      const generatedQrId = "SSC-QR-" + Math.floor(1000 + Math.random() * 9000) + "-" + ["A4", "X7", "K9", "D3"][Math.floor(Math.random() * 4)];
      setQrId(generatedQrId);
    }
  }, [webcamRef]);

  const simulateWithoutCamera = () => {
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 150);

    // Render a high-fidelity schematic SoilSense chemical test strip card onto a canvas
    const canvas = document.createElement("canvas");
    canvas.width = 640; 
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Cinematic forest-green dark background
      const grad = ctx.createLinearGradient(0, 0, 0, 800);
      grad.addColorStop(0, "#05130A");
      grad.addColorStop(1, "#0C2415");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 800);

      // Card Background (Light Neutral Surface)
      ctx.fillStyle = "#F5F8F6";
      ctx.beginPath();
      ctx.roundRect(140, 60, 360, 680, 24);
      ctx.fill();

      // Delicate card border
      ctx.strokeStyle = "rgba(141, 198, 63, 0.2)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Brand Header on card
      ctx.fillStyle = "#0C2415";
      ctx.font = "bold 22px Helvetica, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SoilSense Diagnostic Card", 320, 115);

      // Draw simulated QR Code
      ctx.fillStyle = "#111111";
      ctx.fillRect(240, 155, 160, 160);
      // Draw QR anchors
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(250, 165, 40, 40);
      ctx.fillRect(350, 165, 40, 40);
      ctx.fillRect(250, 265, 40, 40);
      ctx.fillStyle = "#111111";
      ctx.fillRect(260, 175, 20, 20);
      ctx.fillRect(360, 175, 20, 20);
      ctx.fillRect(260, 275, 20, 20);

      // Reference colors scale
      const refColors = ["#FFFFFF", "#E53A00", "#008000", "#00BFFF", "#111111"];
      refColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = "#DDD";
        ctx.lineWidth = 1;
        ctx.fillRect(210 + i * 45, 345, 32, 24);
        ctx.strokeRect(210 + i * 45, 345, 32, 24);
      });

      // Label
      ctx.fillStyle = "#556A5B";
      ctx.font = "12px Helvetica, Arial, sans-serif";
      ctx.fillText("Calibration Reference Scales", 320, 400);

      // Reagent pads (Universal, Methyl Red, Thymol Blue)
      ctx.fillStyle = uiColor;
      ctx.strokeStyle = "#CCCCCC";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(200, 455, 70, 70, 12);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = mrColor;
      ctx.beginPath();
      ctx.roundRect(285, 455, 70, 70, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = tbColor;
      ctx.beginPath();
      ctx.roundRect(370, 455, 70, 70, 12);
      ctx.fill();
      ctx.stroke();

      // Footers
      ctx.fillStyle = "#888888";
      ctx.font = "bold 11px Courier New, monospace";
      ctx.fillText("UNIVERSAL    METHYL_RED    THYMOL_BLUE", 320, 555);
      
      ctx.strokeStyle = "#CCCCCC";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(160, 620);
      ctx.lineTo(480, 620);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = "#667A6C";
      ctx.font = "bold 11px Helvetica, Arial, sans-serif";
      ctx.fillText("↑ KEEP DRY ABOVE LINE ↑", 320, 610);
      ctx.fillText("↓ IMMERSE IN SOIL SLURRY ↓", 320, 645);
    }
    
    const fakeImage = canvas.toDataURL("image/jpeg");
    setImgSrc(fakeImage);
    const generatedQrId = "SSC-QR-" + Math.floor(1000 + Math.random() * 9000) + "-X7";
    setQrId(generatedQrId);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    // Smooth multi-step loading animation
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    try {
      const match = matchTripleIndicator({
        universal_indicator: uiColor,
        methyl_red: mrColor,
        thymol_blue: tbColor,
      });

      const reportId = Math.random().toString(36).substr(2, 9);
      
      const newReport = {
        id: reportId,
        date: new Date().toISOString(),
        image: imgSrc || undefined,
        scanResult: {
          ph: match.ph,
          classification: match.classification,
          condition: match.soilCondition,
          soilHealthScore: match.soilHealthScore,
          confidence: match.confidence,
          qrId: qrId || "SSC-QR-3401-X7",
        },
        nutrients: match.nutrients,
        recommendedCrops: match.recommendedCrops,
        fertilizerRecommendation: match.fertilizerRecommendation,
        waterRetention: match.waterRetention,
        aiInsights: match.aiInsights,
        colorMatched: match.colorMatched,
      };

      addReport(newReport);
      router.push(`/report/${reportId}`);
    } catch (error) {
      console.error("Match analysis failed:", error);
      setAnalyzing(false);
    }
  };

  const retake = () => {
    setImgSrc(null);
    setQrId("");
  };

  return (
    <div className="fixed inset-0 bg-dark-0 z-[100] flex flex-col items-center justify-between overflow-hidden font-sans select-none text-white">
      
      {/* 1. Camera Top Nav Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <button 
          onClick={() => router.back()} 
          className="p-3.5 bg-black/45 hover:bg-black/60 rounded-full border border-white/10 transition-all active:scale-95"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        <div className="text-white font-heading font-bold italic uppercase tracking-widest text-sm flex items-center gap-2 bg-black/45 px-5 py-2.5 rounded-full border border-white/10">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-lime animate-ping"></span>
          SOILSENSE <span className="text-brand-lime">SCANNER</span>
        </div>

        {/* Preset Selector Pill for easy simulator card switching */}
        <div className="flex items-center gap-1 bg-black/45 p-1 rounded-full border border-white/10">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                setActivePresetIdx(index);
                if (imgSrc) {
                  // If already generated/captured in simulator, regenerate it instantly
                  setTimeout(() => simulateWithoutCamera(), 50);
                }
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all tracking-wider ${
                activePresetIdx === index 
                  ? "bg-brand-lime text-dark-0 font-extrabold shadow-md" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              pH {preset.ph.toFixed(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Shutter Flash Overlay */}
      {shutterFlash && (
        <div className="absolute inset-0 bg-white z-[90] transition-opacity duration-150 animate-pulse" />
      )}

      {/* 3. Live Camera / Image Preview Area */}
      <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
        {imgSrc ? (
          // Image Preview Mode
          <img src={imgSrc} className="w-full h-full object-cover" alt="Captured Diagnostic Strip" />
        ) : (
          // Live Webcam Mode
          <>
            {cameraError ? (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-sm z-20">
                <div className="h-20 w-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.1)] animate-pulse">
                  <AlertTriangle className="h-10 w-10 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white uppercase italic mb-2 tracking-tight">Simulator Mode</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    SoilSense is ready. Select a pH preset at the top and initialize the high-fidelity chemical sensor simulator.
                  </p>
                </div>
                <Button 
                  onClick={simulateWithoutCamera} 
                  className="h-14 px-10 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full w-full shadow-[0_10px_30px_rgba(141,198,63,0.35)] transition-all hover:scale-105"
                >
                  Load Interactive test strip
                </Button>
              </div>
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                onUserMediaError={() => setCameraError(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </>
        )}

        {/* Scanner Framing Animation Overlay (Only visible in capturing/previewing mode) */}
        {!analyzing && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 z-10">
            <div className="w-full max-w-xs aspect-[3/4] border-2 border-white/20 rounded-[36px] relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-brand-lime/[0.01]"></div>
              {/* Green bracket corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-brand-lime rounded-tl-[24px]"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-brand-lime rounded-tr-[24px]"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-brand-lime rounded-bl-[24px]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-brand-lime rounded-br-[24px]"></div>
              
              {/* Laser Scanning Beam */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-lime/80 shadow-[0_0_20px_rgba(141,198,63,0.9)] animate-[scan_2.5s_infinite_linear]"></div>
            </div>
            
            <p className="text-white/95 text-[11px] font-bold uppercase tracking-[0.3em] mt-10 bg-black/75 px-7 py-3 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
              {imgSrc ? "Image Acquired successfully" : "Align card inside frame"}
            </p>
          </div>
        )}
      </div>

      {/* 4. Bottom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center justify-center z-50 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        
        {!imgSrc ? (
          // Shutter Button (Capture Mode)
          <div className="flex items-center gap-6">
            {!cameraError && (
              <button 
                onClick={capture}
                className="w-24 h-24 rounded-full border-4 border-white hover:border-brand-lime flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_10px_35px_rgba(0,0,0,0.6)] group"
                aria-label="Capture soil card"
              >
                <div className="w-18 h-18 bg-brand-lime group-hover:bg-brand-accent rounded-full flex items-center justify-center shadow-inner transition-colors">
                  <Camera className="h-9 w-9 text-dark-0" />
                </div>
              </button>
            )}
          </div>
        ) : (
          // Retake / Analyze Action Buttons (Captured Mode)
          <div className="flex gap-4 w-full max-w-sm">
            <Button 
              onClick={retake}
              variant="outline"
              className="flex-1 h-14 rounded-full border-white/20 bg-black/45 text-white font-bold uppercase tracking-wider text-xs backdrop-blur-md hover:bg-white/10 transition-all hover:scale-[1.02]"
            >
              <RefreshCw className="mr-2 h-4.5 w-4.5" /> Retake
            </Button>
            <Button
              onClick={handleAnalyze}
              className="flex-[2] h-14 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold uppercase tracking-wider text-xs rounded-full shadow-[0_10px_30px_rgba(141,198,63,0.35)] transition-all hover:scale-[1.02]"
            >
              Analyze soil card
            </Button>
          </div>
        )}
      </div>

      {/* 5. Fullscreen Cinematic Backend Loader */}
      <AnimatePresence>
        {analyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-0 flex flex-col items-center justify-center p-6 bg-cinematic"
          >
            <GlowingLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
}

// Futurized Glowing Loader for Backend Analysis Simulation
function GlowingLoader() {
  const [stepText, setStepText] = useState("Reading color indicators on your test card...");

  useEffect(() => {
    const steps = [
      "Adjusting for shadows and field lighting...",
      "Matching colors against reference chart...",
      "Calculating nutrient balance (N, P, K)...",
      "Generating your fertilizer recommendation..."
    ];
    let count = 0;
    const interval = setInterval(() => {
      if (count < steps.length) {
        setStepText(steps[count]);
        count++;
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-10 text-center max-w-sm">
      <div className="relative h-32 w-32 flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 border-4 border-brand-lime/10 rounded-full"></div>
        {/* Pulsing ring */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 border-2 border-brand-lime/25 rounded-full"
        />
        {/* Rotating dash ring */}
        <div className="absolute inset-0 border-t-4 border-brand-lime rounded-full animate-spin"></div>
        {/* Central icon */}
        <ScanLine className="h-12 w-12 text-brand-lime drop-shadow-[0_0_15px_rgba(141,198,63,0.8)] animate-pulse" />
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-heading font-bold uppercase tracking-tight italic text-brand-lime animate-pulse">
          Processing...
        </h3>
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest min-h-[24px]">
          {stepText}
        </p>
      </div>
    </div>
  );
}
