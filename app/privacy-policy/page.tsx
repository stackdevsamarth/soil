import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SoilSense",
  description: "How SoilSense collects, uses, and protects your personal data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "**Account Information:** When you create a SoilSense account, we collect your name, email address, and farm location to personalise your experience.",
      "**Soil Scan Data:** Photos and colour readings captured during a scan are processed locally on your device. Only the computed result (pH value, nutrient status) is stored on our servers — raw images are never uploaded unless you explicitly share a report.",
      "**Usage Data:** We collect anonymised data about how you interact with the app (screens visited, buttons tapped) to help us improve the product.",
      "**Device Information:** We may collect your device model, operating system version, and camera specifications to optimise scan accuracy.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To provide and personalise the SoilSense soil diagnostic service.",
      "To generate and store your historical scan reports so you can track soil health over time.",
      "To send you agronomic alerts, product updates, and retest reminders (you can opt out at any time).",
      "To improve scan accuracy by training our colour-matching models on anonymised, aggregated colour data.",
      "To comply with applicable legal and regulatory obligations.",
    ],
  },
  {
    title: "3. Data Sharing",
    content: [
      "We do not sell your personal data to third parties.",
      "We may share anonymised, aggregated soil health data with agricultural research institutions and government bodies for public-interest soil mapping programmes.",
      "We work with trusted service providers (cloud hosting, analytics) who process data on our behalf under strict data-processing agreements.",
      "We may disclose data if required by law or to protect the rights and safety of SoilSense users.",
    ],
  },
  {
    title: "4. Data Retention",
    content: [
      "Your scan reports and account data are retained for as long as your account is active.",
      "If you delete your account, all personal data is permanently erased within 30 days, except where retention is required by law.",
      "Anonymised, aggregated data may be retained indefinitely for research purposes.",
    ],
  },
  {
    title: "5. Your Rights",
    content: [
      "**Access:** Request a copy of all personal data we hold about you.",
      "**Correction:** Ask us to correct inaccurate information.",
      "**Deletion:** Request erasure of your personal data (\"right to be forgotten\").",
      "**Portability:** Receive your scan history in a machine-readable format.",
      "**Objection:** Opt out of marketing communications at any time via your account settings.",
    ],
  },
  {
    title: "6. Security",
    content: [
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256).",
      "Access to production systems is restricted to authorised SoilSense engineers using multi-factor authentication.",
      "We conduct regular security audits and penetration testing.",
    ],
  },
  {
    title: "7. Contact Us",
    content: [
      "For privacy-related questions or to exercise your rights, please contact our Data Protection Officer at privacy@soilsense.in.",
      "We aim to respond to all requests within 10 working days.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F4]">
      {/* Header */}
      <header className="bg-[#021B0F] text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-[#7CBF35] p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Leaf className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl tracking-widest uppercase">SoilSense</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-[#021B0F]">
        <div className="max-w-4xl mx-auto px-6 pb-16 pt-10">
          <span className="text-[#7CBF35] text-xs font-bold uppercase tracking-[0.2em]">Legal</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/50 text-sm font-medium">
            Last updated: 25 June 2026 &nbsp;·&nbsp; Effective: 25 June 2026
          </p>
        </div>
        {/* Wave divider */}
        <svg viewBox="0 0 1440 60" className="w-full block" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F8F8F4" />
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        <p className="text-[#5B665E] text-base md:text-lg leading-relaxed border-l-4 border-[#7CBF35] pl-6 py-2 bg-white rounded-r-2xl shadow-sm">
          At SoilSense, we believe farmers deserve to know exactly what data we collect and how we use it — the same transparency we bring to soil health. This policy explains our practices clearly and without legal jargon.
        </p>

        {sections.map((section) => (
          <section key={section.title} className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8F0EA]">
            <h2 className="text-xl font-bold text-[#021B0F] mb-5 pb-4 border-b border-[#E8F0EA]">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#5B665E] text-sm md:text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7CBF35] shrink-0 mt-2" />
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#021B0F]">$1</strong>') }} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Footer links */}
        <div className="flex flex-wrap gap-6 pt-4 text-sm text-[#5B665E]">
          <span>Related:</span>
          <Link href="/terms-of-service" className="text-[#7CBF35] hover:underline font-medium">Terms of Service</Link>
          <Link href="/cookie-policy" className="text-[#7CBF35] hover:underline font-medium">Cookie Policy</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E8F0EA] bg-white py-8 mt-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#5B665E]">
          <span>© 2026 SoilSense. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/terms-of-service" className="hover:text-[#021B0F] transition-colors">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-[#021B0F] transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
