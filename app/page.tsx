import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { MissionVisionSection } from "@/components/mission-vision-section";
import { ProblemSection } from "@/components/problem-section";
import { WhyNowSection } from "@/components/why-now-section";
import { TechnologySection } from "@/components/technology-section";
import { HowItWorks } from "@/components/how-it-works";
import { ImpactMetrics } from "@/components/impact-metrics";
import { CTASection } from "@/components/cta-section";
import { SurveySection } from "@/components/survey-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-brand-lime selection:text-dark-0 bg-background">
      <Navbar />
      
      <HeroSection />
      
      <MissionVisionSection />
      
      <ProblemSection />
      
      <WhyNowSection />
      
      <TechnologySection />
      
      <HowItWorks />
      
      <ImpactMetrics />
      
      <SurveySection />
      
      <CTASection />
      
      <Footer />
    </main>
  );
}
