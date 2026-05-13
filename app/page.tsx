import { Navbar } from "@/components/navbar";
import { GlowingBackground } from "@/components/glowing-background";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { HowItWorks } from "@/components/how-it-works";
import { ProductShowcase } from "@/components/product-showcase";
import { ImpactMetrics } from "@/components/impact-metrics";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { MarketOpportunity } from "@/components/market-opportunity";
import { BusinessModel } from "@/components/business-model";
import { Smartphone, LayoutDashboard, ScanLine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative bg-dark-0 min-h-screen selection:bg-brand-lime selection:text-black">
      <GlowingBackground />
      <Navbar />
      
      <HeroSection />
      
      <ProblemSection />

      {/* "Why Now" Timeline Section */}
      <section id="technology" className="py-24 relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="space-y-12">
              {[
                { year: "2024", title: "The AI Tipping Point", desc: "Edge computing reaches the power necessary for field diagnostics." },
                { year: "2025", title: "Global Mandates", desc: "UN directives for chemical reduction in agriculture become law." },
                { year: "2026+", title: "The New Standard", desc: "SoilSense becomes the core OS for sustainable precision farming." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-brand-lime shadow-[0_0_15px_rgba(141,198,63,1)]" />
                    <div className="w-[2px] flex-1 bg-gradient-to-b from-brand-lime to-transparent mt-2" />
                  </div>
                  <div>
                    <div className="text-brand-lime font-mono text-sm mb-1">{item.year}</div>
                    <h4 className="text-2xl font-heading font-bold text-white mb-2 italic tracking-tight">{item.title}</h4>
                    <p className="text-zinc-500 max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 italic uppercase tracking-tighter">
              WHY <span className="text-brand-lime">NOW?</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              The intersection of food security, climate change, and mobile computing has created a unique window for SoilSense to scale globally.
            </p>
          </div>
        </div>
      </section>

      <HowItWorks />

      <ProductShowcase />

      {/* Interactive App Preview Section */}
      <section className="py-32 relative bg-dark-1/30">
        <div className="container mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 italic tracking-tighter uppercase">
            EXPERIENCE THE <span className="text-brand-lime">PLATFORM</span>
          </h2>
          <p className="text-zinc-500 text-lg">Native performance. Scientific accuracy. Universal access.</p>
        </div>

        <div className="max-w-4xl mx-auto glass rounded-[48px] p-2 md:p-4 shadow-2xl relative group">
          <div className="bg-zinc-950 rounded-[40px] overflow-hidden aspect-[16/10] flex items-center justify-center relative">
             <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/20 to-transparent pointer-events-none" />
             <div className="flex flex-col items-center gap-8 relative z-10 p-12">
                <div className="flex gap-6">
                   <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center gap-3 group-hover:-translate-y-2 transition-transform">
                      <LayoutDashboard className="h-10 w-10 text-brand-lime" />
                      <span className="text-xs font-mono text-zinc-500 uppercase">Dashboard</span>
                   </div>
                   <div className="p-6 bg-brand-lime text-dark-0 rounded-3xl flex flex-col items-center gap-3 shadow-[0_0_40px_rgba(141,198,63,0.3)] group-hover:-translate-y-4 transition-transform delay-75">
                      <ScanLine className="h-10 w-10" />
                      <span className="text-xs font-mono font-bold uppercase">Scanner</span>
                   </div>
                   <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center gap-3 group-hover:-translate-y-2 transition-transform delay-150">
                      <Smartphone className="h-10 w-10 text-brand-lime" />
                      <span className="text-xs font-mono text-zinc-500 uppercase">Reports</span>
                   </div>
                </div>
                <div className="text-center">
                   <h3 className="text-2xl font-heading font-bold text-white mb-4 italic uppercase">Ready to test your soil?</h3>
                   <Link href="/scan">
                      <Button className="bg-brand-lime hover:bg-brand-accent text-dark-0 font-bold rounded-full h-14 px-10 shadow-lg">
                         Open Live Preview
                      </Button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      <MarketOpportunity />

      <BusinessModel />

      <ImpactMetrics />

      <CTASection />
      
      <Footer />
    </main>
  );
}
