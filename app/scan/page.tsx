"use client";

import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, X, RefreshCw, ScanLine, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { matchTripleIndicator } from "@/utils/color";

export default function ScanPage() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState<boolean>(false);
  const router = useRouter();
  const { addReport } = useStore();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      processImage(imageSrc);
    }
  }, [webcamRef]);

  const processImage = async (image: string) => {
    setAnalyzing(true);
    
    // Artificial delay to simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3500));
    
    try {
      // Simulate indicator colors from our reference DB
      const response = await fetch("/api/ph-data"); // We don't have a real API, so we simulate
      const data = await import("@/data/ph-reference.json");
      
      // Pick a random pH entry for variety in simulation
      const randomEntry = data.phLevels[Math.floor(Math.random() * data.phLevels.length)];
      
      const newReport = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        image: image,
        scanResult: {
          ph: randomEntry.ph,
          classification: randomEntry.classification,
          condition: randomEntry.soilCondition,
          soilHealthScore: randomEntry.soilHealthScore,
          confidence: Math.floor(Math.random() * 5) + 94, // 94-98%
        },
        nutrients: {
          nitrogen: randomEntry.nutrients.nitrogen,
          phosphorus: randomEntry.nutrients.phosphorus,
          potassium: randomEntry.nutrients.potassium,
        },
        recommendedCrops: randomEntry.cropCompatibility,
        fertilizerRecommendation: randomEntry.fertilizerRecommendation,
        waterRetention: randomEntry.waterRetention,
        aiInsights: [
          randomEntry.recommendedAction,
          `Optimal crops for this soil: ${randomEntry.cropCompatibility.slice(0, 2).join(", ")}.`,
          `Water retention is ${randomEntry.waterRetention}.`
        ],
      };

      addReport(newReport);
      router.push("/dashboard");
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalyzing(false);
    }
  };

  const retake = () => {
    setImgSrc(null);
    setAnalyzing(false);
  };

  const simulateWithoutCamera = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 640; canvas.height = 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0B0F0C";
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = "#8DC63F";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Simulated Diagnostic Field", 320, 240);
    }
    const fakeImage = canvas.toDataURL("image/jpeg");
    setImgSrc(fakeImage);
    processImage(fakeImage);
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col font-sans">
      {/* Header */}
      <div className="p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => router.back()} className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md border border-white/5">
          <X className="h-6 w-6" />
        </button>
        <div className="text-white font-heading font-bold italic uppercase tracking-widest">
           Diagnostic <span className="text-brand-lime">Scanner</span>
        </div>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {!imgSrc ? (
          <>
            {cameraError ? (
              <div className="flex flex-col items-center justify-center p-8 text-center z-50 space-y-8 max-w-sm">
                <div className="h-20 w-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center border border-yellow-500/30">
                   <AlertTriangle className="h-10 w-10 text-yellow-500" />
                </div>
                <div>
                   <h3 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tight mb-3">Camera Blocked</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed">
                     Mobile browsers require an HTTPS connection or localhost to access the camera. You can still test the flow using simulation.
                   </p>
                </div>
                <Button onClick={simulateWithoutCamera} className="h-14 px-10 bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full w-full shadow-2xl">
                  Simulate Scan
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
            
            {/* Scanner Overlay Guide */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
              <div className="w-full max-w-sm aspect-[3/4] border-2 border-white/20 rounded-[32px] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5"></div>
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-brand-lime rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-brand-lime rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-brand-lime rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-brand-lime rounded-br-2xl"></div>
                
                {/* Scanning Beam */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-lime/80 shadow-[0_0_20px_rgba(141,198,63,0.8)] animate-[scan_2s_infinite_linear]"></div>
              </div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mt-10 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                 Align Soil Strip Within Frame
              </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
            <img src={imgSrc} className="w-full h-full object-cover opacity-60" alt="Captured" />
            
            {analyzing && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
                <div className="relative h-24 w-24 mb-8">
                   <div className="absolute inset-0 border-4 border-brand-lime/20 rounded-full"></div>
                   <div className="absolute inset-0 border-t-4 border-brand-lime rounded-full animate-spin"></div>
                   <ScanLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-brand-lime" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white uppercase italic tracking-tighter mb-2 animate-pulse">Analyzing Soil</h3>
                <p className="text-brand-lime font-mono text-[10px] tracking-widest uppercase">AI_Calibrating_Indicators...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="h-40 bg-gradient-to-t from-black to-transparent flex items-center justify-center px-8 pb-10 z-50">
        {!imgSrc ? (
          <div className="flex flex-col items-center gap-4">
            {!cameraError && (
              <button 
                onClick={capture}
                className="w-20 h-20 rounded-full border-4 border-white/80 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                   <Camera className="h-8 w-8 text-black" />
                </div>
              </button>
            )}
          </div>
        ) : !analyzing ? (
          <div className="flex gap-6 w-full max-w-sm justify-center items-center">
            <Button 
              onClick={retake} 
              variant="outline"
              className="flex-1 h-14 rounded-full border-white/10 bg-white/5 text-white font-bold uppercase tracking-widest text-xs"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Retake
            </Button>
          </div>
        ) : null}
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
