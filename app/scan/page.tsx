"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { Camera, X, RefreshCw, ScanLine, Loader2, AlertTriangle, Check, Sliders, Play, Award, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { matchTripleIndicator } from "@/utils/color";

export default function ScanPage() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  
  // Scanning phases: "capture" | "extracting" | "calibrating"
  const [phase, setPhase] = useState<"capture" | "extracting" | "calibrating">("capture");
  const [extractStep, setExtractStep] = useState(0);
  const [qrId, setQrId] = useState("");
  
  // Selected indicator colors (defaulting to a slightly acidic state values)
  const [uiColor, setUiColor] = useState("#7CE000"); // Universal Indicator
  const [mrColor, setMrColor] = useState("#FFC000"); // Methyl Red
  const [tbColor, setTbColor] = useState("#FFFF00"); // Thymol Blue
  
  // Selected pin for calibration
  const [activePin, setActivePin] = useState<"universal" | "methyl" | "thymol">("universal");

  const [analyzing, setAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState<boolean>(false);
  const router = useRouter();
  const { addReport } = useStore();

  // Color Swatches matching indicator properties
  const uiSwatches = [
    { hex: "#800000", name: "Maroon (pH 0.0)" },
    { hex: "#FF5400", name: "Orange (pH 2.0)" },
    { hex: "#FFFF00", name: "Yellow (pH 4.0)" },
    { hex: "#7CE000", name: "Green-Yellow (pH 5.5)" },
    { hex: "#008000", name: "Green (pH 6.5)" },
    { hex: "#006400", name: "Dark Green (pH 7.0)" },
    { hex: "#00BFFF", name: "Sky Blue (pH 8.5)" },
    { hex: "#8A2BE2", name: "Purple (pH 10.5)" },
    { hex: "#8B0000", name: "Brown-Red (pH 14.0)" }
  ];

  const mrSwatches = [
    { hex: "#D22B2B", name: "Red (pH 0-4.0)" },
    { hex: "#FF5400", name: "Orange-Red (pH 4.5)" },
    { hex: "#FFC000", name: "Gold-Orange (pH 5.5)" },
    { hex: "#FFFF00", name: "Yellow (pH 6.0-14.0)" }
  ];

  const tbSwatches = [
    { hex: "#FF0000", name: "Red (pH 0-1.2)" },
    { hex: "#FFE6CC", name: "Peach (pH 2.0)" },
    { hex: "#FFFF00", name: "Yellow (pH 2.8-8.0)" },
    { hex: "#CCFF99", name: "Yellow-Green (pH 8.5)" },
    { hex: "#66CCFF", name: "Light Blue (pH 9.5)" },
    { hex: "#003366", name: "Navy Blue (pH 12.0)" }
  ];

  // Presets matching actual card readings
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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      startExtraction(imageSrc);
    }
  }, [webcamRef]);

  const simulateWithoutCamera = () => {
    // Generate a beautiful schematic chemical strip image
    const canvas = document.createElement("canvas");
    canvas.width = 640; 
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Dark slate background
      const grad = ctx.createLinearGradient(0, 0, 0, 800);
      grad.addColorStop(0, "#121814");
      grad.addColorStop(1, "#080b09");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 800);

      // Card Background (Off-white/light gray)
      ctx.fillStyle = "#F5F6F5";
      ctx.beginPath();
      ctx.roundRect(140, 60, 360, 680, 24);
      ctx.fill();

      // Card Shadow
      ctx.strokeStyle = "rgba(141, 198, 63, 0.15)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // SoilSense Brand Header on card
      ctx.fillStyle = "#0B0F0C";
      ctx.font = "bold 22px Helvetica, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SoilSense Diagnostic Card", 320, 110);

      // Draw simulated QR Code
      ctx.fillStyle = "#111111";
      ctx.fillRect(240, 150, 160, 160);
      // Draw simulated QR anchors
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(250, 160, 40, 40);
      ctx.fillRect(350, 160, 40, 40);
      ctx.fillRect(250, 260, 40, 40);
      ctx.fillStyle = "#111111";
      ctx.fillRect(260, 170, 20, 20);
      ctx.fillRect(360, 170, 20, 20);
      ctx.fillRect(260, 270, 20, 20);

      // Reference colors
      const refColors = ["#FFFFFF", "#E53A00", "#008000", "#00BFFF", "#111111"];
      refColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = "#DDD";
        ctx.lineWidth = 1;
        ctx.fillRect(210 + i * 45, 340, 32, 24);
        ctx.strokeRect(210 + i * 45, 340, 32, 24);
      });

      // Label
      ctx.fillStyle = "#666666";
      ctx.font = "12px Helvetica, Arial, sans-serif";
      ctx.fillText("Calibration Reference Scales", 320, 395);

      // Reagent pads (representing the 3 test indicators)
      // Universal Indicator Pad
      ctx.fillStyle = uiColor;
      ctx.strokeStyle = "#BBBBBB";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(200, 450, 70, 70, 12);
      ctx.fill();
      ctx.stroke();
      
      // Methyl Red Pad
      ctx.fillStyle = mrColor;
      ctx.beginPath();
      ctx.roundRect(285, 450, 70, 70, 12);
      ctx.fill();
      ctx.stroke();

      // Thymol Blue Pad
      ctx.fillStyle = tbColor;
      ctx.beginPath();
      ctx.roundRect(370, 450, 70, 70, 12);
      ctx.fill();
      ctx.stroke();

      // Dashed text instruction on card
      ctx.fillStyle = "#999999";
      ctx.font = "bold 11px Courier New, monospace";
      ctx.fillText("UNIVERSAL    METHYL_RED    THYMOL_BLUE", 320, 550);
      ctx.fillText("PAD_01         PAD_02        PAD_03", 320, 570);

      // Keep dry & Keep wet indicator lines
      ctx.strokeStyle = "#CCCCCC";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(160, 620);
      ctx.lineTo(480, 620);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = "#777777";
      ctx.font = "bold 11px Helvetica, Arial, sans-serif";
      ctx.fillText("↑ KEEP DRY ABOVE LINE ↑", 320, 610);
      ctx.fillText("↓ IMMERSE IN SOIL SLURRY BELOW ↓", 320, 640);
    }
    const fakeImage = canvas.toDataURL("image/jpeg");
    setImgSrc(fakeImage);
    startExtraction(fakeImage);
  };

  const startExtraction = (image: string) => {
    setPhase("extracting");
    setExtractStep(1);
    
    // Simulate steps in QR parsing and color detection
    setTimeout(() => {
      setExtractStep(2);
      const generatedQrId = "SSC-QR-" + Math.floor(1000 + Math.random() * 9000) + "-" + ["A4", "X7", "K9", "D3"][Math.floor(Math.random() * 4)];
      setQrId(generatedQrId);
    }, 1200);

    setTimeout(() => {
      setExtractStep(3);
    }, 2400);

    setTimeout(() => {
      setPhase("calibrating");
    }, 3600);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    // Slight delay for analysis simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    try {
      // Calculate real matching using the ph_data.json utility engine!
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
          qrId: qrId || "SSC-QR-2026-X8B",
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

  const loadPreset = (preset: typeof presets[0]) => {
    setUiColor(preset.ui);
    setMrColor(preset.mr);
    setTbColor(preset.tb);
  };

  const retake = () => {
    setImgSrc(null);
    setPhase("capture");
    setExtractStep(0);
    setQrId("");
    setAnalyzing(false);
  };

  // Regeneration of canvas if Preset changes during calibration mode
  useEffect(() => {
    if (imgSrc && phase === "calibrating") {
      // If we are in simulation, regenerate the visual canvas
      const canvas = document.createElement("canvas");
      canvas.width = 640; 
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, 800);
        grad.addColorStop(0, "#121814");
        grad.addColorStop(1, "#080b09");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 640, 800);
        ctx.fillStyle = "#F5F6F5";
        ctx.beginPath();
        ctx.roundRect(140, 60, 360, 680, 24);
        ctx.fill();
        ctx.strokeStyle = "rgba(141, 198, 63, 0.15)";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = "#0B0F0C";
        ctx.font = "bold 22px Helvetica, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SoilSense Diagnostic Card", 320, 110);
        ctx.fillStyle = "#111111";
        ctx.fillRect(240, 150, 160, 160);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(250, 160, 40, 40);
        ctx.fillRect(350, 160, 40, 40);
        ctx.fillRect(250, 260, 40, 40);
        ctx.fillStyle = "#111111";
        ctx.fillRect(260, 170, 20, 20);
        ctx.fillRect(360, 170, 20, 20);
        ctx.fillRect(260, 270, 20, 20);
        const refColors = ["#FFFFFF", "#E53A00", "#008000", "#00BFFF", "#111111"];
        refColors.forEach((color, i) => {
          ctx.fillStyle = color;
          ctx.strokeStyle = "#DDD";
          ctx.lineWidth = 1;
          ctx.fillRect(210 + i * 45, 340, 32, 24);
          ctx.strokeRect(210 + i * 45, 340, 32, 24);
        });
        ctx.fillStyle = "#666666";
        ctx.font = "12px Helvetica, Arial, sans-serif";
        ctx.fillText("Calibration Reference Scales", 320, 395);
        ctx.fillStyle = uiColor;
        ctx.strokeStyle = "#BBBBBB";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(200, 450, 70, 70, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = mrColor;
        ctx.beginPath();
        ctx.roundRect(285, 450, 70, 70, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = tbColor;
        ctx.beginPath();
        ctx.roundRect(370, 450, 70, 70, 12);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#999999";
        ctx.font = "bold 11px Courier New, monospace";
        ctx.fillText("UNIVERSAL    METHYL_RED    THYMOL_BLUE", 320, 550);
        ctx.fillText("PAD_01         PAD_02        PAD_03", 320, 570);
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(160, 620);
        ctx.lineTo(480, 620);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#777777";
        ctx.font = "bold 11px Helvetica, Arial, sans-serif";
        ctx.fillText("↑ KEEP DRY ABOVE LINE ↑", 320, 610);
        ctx.fillText("↓ IMMERSE IN SOIL SLURRY BELOW ↓", 320, 640);
      }
      setImgSrc(canvas.toDataURL("image/jpeg"));
    }
  }, [uiColor, mrColor, tbColor, phase]);

  return (
    <div className="fixed inset-0 bg-dark-0 z-[100] flex flex-col md:flex-row overflow-hidden font-sans selection:bg-brand-lime selection:text-black">
      
      {/* Left side: Camera View or Strip Calibration */}
      <div className="flex-1 relative bg-black flex items-center justify-center border-r border-white/5">
        {/* Universal Scan Overlay Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/95 via-black/60 to-transparent">
          <button onClick={() => router.back()} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md border border-white/10 transition-colors">
            <X className="h-5 w-5" />
          </button>
          <div className="text-white font-heading font-bold italic uppercase tracking-widest text-sm flex items-center gap-2">
             <span className="h-2 w-2 rounded-full bg-brand-lime animate-ping"></span>
             SOILSENSE <span className="text-brand-lime">DIAGNOSTIC</span>
          </div>
          <div className="w-10"></div>
        </div>

        {phase === "capture" && (
          <>
            {cameraError ? (
              <div className="flex flex-col items-center justify-center p-8 text-center z-40 space-y-8 max-w-sm">
                <div className="h-20 w-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center border border-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.15)] animate-pulse">
                   <AlertTriangle className="h-10 w-10 text-yellow-500" />
                </div>
                <div>
                   <h3 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tight mb-3">Camera Unavailable</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed mb-1">
                     To access the hardware camera, browser security requires an HTTPS connection.
                   </p>
                   <p className="text-brand-lime/80 font-mono text-[10px] uppercase tracking-widest">
                     Loading Sandbox Diagnostics Module...
                   </p>
                </div>
                <Button onClick={simulateWithoutCamera} className="h-14 px-10 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full w-full shadow-[0_0_30px_rgba(141,198,63,0.3)] transition-all">
                  Initialize Interactive Simulator
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
            
            {/* Camera Overlay Grid lines */}
            {!cameraError && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xs aspect-[3/4] border-2 border-white/20 rounded-[32px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/[0.02]"></div>
                  <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-brand-lime rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-brand-lime rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-brand-lime rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-brand-lime rounded-br-2xl"></div>
                  
                  {/* Scanning Beam */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-lime/80 shadow-[0_0_20px_rgba(141,198,63,0.8)] animate-[scan_2s_infinite_linear]"></div>
                </div>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] mt-10 bg-black/60 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl">
                   Center the Chemical Card Within Frame
                </p>
              </div>
            )}
          </>
        )}

        {phase === "extracting" && imgSrc && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
            <img src={imgSrc} className="w-full h-full object-cover opacity-30" alt="Captured" />
            
            {/* Beautiful visual analysis steps */}
            <div className="absolute z-50 flex flex-col items-center p-8 max-w-md w-full text-center">
              <div className="relative h-24 w-24 mb-8">
                 <div className="absolute inset-0 border-4 border-brand-lime/20 rounded-full"></div>
                 <div className="absolute inset-0 border-t-4 border-brand-lime rounded-full animate-spin"></div>
                 <ScanLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-brand-lime" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tighter mb-6">AI Stripping Engine</h3>
              
              <div className="space-y-4 w-full bg-dark-1/80 border border-white/5 p-6 rounded-3xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase">1. Reading QR Anchor Code</span>
                  {extractStep >= 1 ? (
                    <span className="text-brand-lime font-bold flex items-center gap-1">
                      {extractStep > 1 ? <Check className="h-4.5 w-4.5" /> : "PROCESSED"}
                    </span>
                  ) : <span className="text-zinc-600">WAITING...</span>}
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase">2. Decoded Card ID</span>
                  {extractStep >= 2 ? (
                    <span className="text-brand-lime font-bold font-sans tracking-wide">
                      {qrId || "LOADING..."}
                    </span>
                  ) : <span className="text-zinc-600">WAITING...</span>}
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase">3. Extracting Reagents</span>
                  {extractStep >= 3 ? (
                    <span className="text-brand-lime font-bold">READY</span>
                  ) : <span className="text-zinc-600">ANALYZING...</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {phase === "calibrating" && imgSrc && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-zinc-950">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={imgSrc} className="w-full h-full object-cover" alt="Calibration Card" />
              
              {/* Interactive cursor pins overlaid on the three actual reagent card coordinates */}
              <button 
                onClick={() => setActivePin("universal")}
                className={`absolute top-[52%] left-[34%] -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  activePin === "universal" ? "border-brand-lime bg-brand-lime/30 scale-125 shadow-[0_0_20px_#8DC63F]" : "border-white/50 bg-black/40 hover:scale-110"
                }`}
              >
                <div className="h-4.5 w-4.5 rounded-md border border-white" style={{ backgroundColor: uiColor }}></div>
              </button>
              
              <button 
                onClick={() => setActivePin("methyl")}
                className={`absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  activePin === "methyl" ? "border-brand-lime bg-brand-lime/30 scale-125 shadow-[0_0_20px_#8DC63F]" : "border-white/50 bg-black/40 hover:scale-110"
                }`}
              >
                <div className="h-4.5 w-4.5 rounded-md border border-white" style={{ backgroundColor: mrColor }}></div>
              </button>
              
              <button 
                onClick={() => setActivePin("thymol")}
                className={`absolute top-[52%] left-[62%] -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  activePin === "thymol" ? "border-brand-lime bg-brand-lime/30 scale-125 shadow-[0_0_20px_#8DC63F]" : "border-white/50 bg-black/40 hover:scale-110"
                }`}
              >
                <div className="h-4.5 w-4.5 rounded-md border border-white" style={{ backgroundColor: tbColor }}></div>
              </button>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-md">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">Extracted Card ID</span>
              <span className="text-xs font-mono font-bold text-brand-lime">{qrId}</span>
            </div>
          </div>
        )}
      </div>

      {/* Right side: Calibration Control Panel & Analysis Results Triggers */}
      <div className="w-full md:w-[460px] bg-dark-1/80 border-t md:border-t-0 border-white/5 p-6 flex flex-col justify-between overflow-y-auto backdrop-blur-xl h-[450px] md:h-full md:pt-28">
        
        {phase === "capture" ? (
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <div className="text-brand-lime font-mono text-[9px] tracking-[0.3em] uppercase mb-2">Step 01: Imaging</div>
              <h2 className="text-3xl font-heading font-bold text-white uppercase italic tracking-tighter mb-4">Click to <span className="text-brand-lime">Acquire</span></h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Take a clean photo of your mechanical-readable chemical sensor strip. The AI will parse the QR anchors to self-calibrate lighting, then detect indicator colors.
              </p>
            </div>

            {!cameraError && (
              <button 
                onClick={capture}
                className="w-24 h-24 rounded-full border-4 border-white/10 hover:border-brand-lime/30 flex items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-all shadow-2xl group mt-6"
              >
                <div className="w-20 h-20 bg-brand-lime group-hover:bg-brand-accent rounded-full flex items-center justify-center shadow-lg shadow-brand-lime/20">
                   <Camera className="h-10 w-10 text-dark-0" />
                </div>
              </button>
            )}

            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 font-mono">
                <Sliders className="h-4 w-4 text-brand-lime" /> PRE-CALIBRATED QUICK PRESETS:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      simulateWithoutCamera();
                      loadPreset(preset);
                    }}
                    className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-brand-lime/30 hover:bg-white/[0.04] transition-all text-left group"
                  >
                    <span className="text-[10px] font-mono text-brand-lime block mb-1">pH {preset.ph.toFixed(1)}</span>
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white line-clamp-1">{preset.name.split(" ")[0]} presets</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : phase === "extracting" ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
            <Loader2 className="h-12 w-12 text-brand-lime animate-spin mb-4" />
            <h3 className="text-xl font-heading font-bold text-white uppercase italic tracking-tight">Extracting QR & Colors</h3>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Aligning reference matrix arrays and compensating for environmental lighting anomalies...
            </p>
          </div>
        ) : (
          /* Calibrating Reagent Colors Panel */
          <div className="flex-1 flex flex-col justify-between h-full space-y-8">
            <div className="space-y-6">
              <div>
                <div className="text-brand-lime font-mono text-[9px] tracking-[0.3em] uppercase mb-1">Step 02: Verification</div>
                <h2 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tight mb-2">Color <span className="text-brand-lime">Calibration</span></h2>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Verify or fine-tune the indicator colors extracted from the chemical card. Click on any pin on the left to calibrate its color.
                </p>
              </div>

              {/* Quick Preset Selector */}
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">QuickPresets / Reference Cards</span>
                <div className="flex flex-col gap-2">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadPreset(preset)}
                      className="flex items-center justify-between p-2.5 bg-dark-1/50 rounded-xl hover:bg-brand-lime/10 border border-white/5 hover:border-brand-lime/20 text-left transition-all group"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-white group-hover:text-brand-lime transition-colors block">{preset.name}</span>
                        <span className="text-[9px] text-zinc-500 block">{preset.desc}</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: preset.ui }}></div>
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: preset.mr }}></div>
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: preset.tb }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Calibration Area */}
              <div className="space-y-4">
                {/* Pad Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setActivePin("universal")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      activePin === "universal" ? "bg-white/[0.05] border-brand-lime" : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md mx-auto mb-2 border border-white/20" style={{ backgroundColor: uiColor }}></div>
                    <span className="text-[10px] font-bold text-zinc-400 block line-clamp-1">Universal</span>
                  </button>
                  <button 
                    onClick={() => setActivePin("methyl")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      activePin === "methyl" ? "bg-white/[0.05] border-brand-lime" : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md mx-auto mb-2 border border-white/20" style={{ backgroundColor: mrColor }}></div>
                    <span className="text-[10px] font-bold text-zinc-400 block line-clamp-1">Methyl Red</span>
                  </button>
                  <button 
                    onClick={() => setActivePin("thymol")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      activePin === "thymol" ? "bg-white/[0.05] border-brand-lime" : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md mx-auto mb-2 border border-white/20" style={{ backgroundColor: tbColor }}></div>
                    <span className="text-[10px] font-bold text-zinc-400 block line-clamp-1">Thymol Blue</span>
                  </button>
                </div>

                {/* Color Swatch Picker */}
                <div className="p-4 bg-dark-1/40 border border-white/5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    <span>Selected: {activePin === "universal" ? "Universal Indicator" : activePin === "methyl" ? "Methyl Red" : "Thymol Blue"}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {(activePin === "universal" ? uiSwatches : activePin === "methyl" ? mrSwatches : tbSwatches).map((swatch, idx) => (
                      <button
                        key={idx}
                        title={swatch.name}
                        onClick={() => {
                          if (activePin === "universal") setUiColor(swatch.hex);
                          else if (activePin === "methyl") setMrColor(swatch.hex);
                          else setTbColor(swatch.hex);
                        }}
                        className={`aspect-square rounded-xl border-2 transition-all relative group flex items-center justify-center ${
                          (activePin === "universal" ? uiColor : activePin === "methyl" ? mrColor : tbColor) === swatch.hex
                            ? "border-brand-lime scale-110 shadow-lg"
                            : "border-transparent hover:border-white/20"
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {(activePin === "universal" ? uiColor : activePin === "methyl" ? mrColor : tbColor) === swatch.hex && (
                          <div className="bg-black/50 p-1 rounded-full border border-white/20">
                            <Check className="h-3.5 w-3.5 text-brand-lime" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Match trigger */}
            <div className="pt-6 border-t border-white/5 flex gap-3">
              <Button 
                onClick={retake} 
                variant="outline"
                className="flex-1 h-14 rounded-full border-white/10 bg-white/5 text-white font-bold uppercase tracking-widest text-xs"
              >
                <RefreshCw className="mr-2 h-4.5 w-4.5" /> Retake
              </Button>
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="flex-[2] h-14 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold uppercase tracking-widest text-xs rounded-full shadow-[0_0_30px_rgba(141,198,63,0.3)]"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" /> Matching...
                  </>
                ) : (
                  "Analyze & Match"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
