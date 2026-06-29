import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SoilSense",
  description: "The terms and conditions that govern your use of the SoilSense platform.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By downloading, accessing, or using the SoilSense application or website (\"the Service\"), you agree to be bound by these Terms of Service.",
      "If you are using SoilSense on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
      "If you do not agree to these Terms, please do not use the Service.",
    ],
  },
  {
    title: "2. Description of Service",
    content: [
      "SoilSense provides a mobile-based soil diagnostic service that analyses chemical indicator cards to estimate soil pH, Nitrogen (N), Phosphorus (P), and Potassium (K) levels.",
      "The results provided are indicative estimates based on colorimetric analysis and should be used as a decision-support tool, not as a substitute for certified laboratory analysis when planting high-value crops.",
      "Recommendations (fertilizer plans, crop suggestions) are generated algorithmically and may not account for local micro-conditions. Always consult a qualified agronomist for critical decisions.",
    ],
  },
  {
    title: "3. User Accounts",
    content: [
      "You must create an account to access personalised scan history and reports.",
      "You are responsible for maintaining the confidentiality of your login credentials.",
      "You must notify us immediately at support@soilsense.in if you suspect unauthorised access to your account.",
      "We reserve the right to suspend or terminate accounts that violate these Terms.",
    ],
  },
  {
    title: "4. Acceptable Use",
    content: [
      "You agree to use the Service only for lawful agricultural and educational purposes.",
      "You must not reverse-engineer, decompile, or attempt to extract the source code of the SoilSense application.",
      "You must not use automated scripts or bots to access the Service.",
      "You must not upload or transmit any content that is harmful, fraudulent, or infringes on third-party intellectual property rights.",
    ],
  },
  {
    title: "5. Intellectual Property",
    content: [
      "All content, technology, trademarks, and software within the SoilSense platform are the exclusive property of SoilSense Intelligence Pvt. Ltd.",
      "Your scan reports and data remain your property. We claim no ownership over your agricultural data.",
      "You grant SoilSense a non-exclusive, royalty-free licence to process your data solely for the purpose of providing the Service to you.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    content: [
      "SoilSense provides diagnostic results on a best-effort basis. We make no warranty that results will be accurate for every soil type, lighting condition, or strip batch.",
      "To the fullest extent permitted by law, SoilSense is not liable for any crop loss, financial loss, or indirect damages resulting from reliance on the Service.",
      "Our total liability to you for any claim arising from use of the Service shall not exceed the amount you paid for the Service in the 12 months prior to the claim.",
    ],
  },
  {
    title: "7. Modifications & Termination",
    content: [
      "We may update these Terms from time to time. Continued use of the Service after updates constitutes acceptance of the revised Terms.",
      "We will notify you of material changes via email or an in-app notification at least 14 days before they take effect.",
      "You may terminate your account at any time. We may terminate or suspend access for violations of these Terms without prior notice.",
    ],
  },
  {
    title: "8. Governing Law",
    content: [
      "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lucknow, Uttar Pradesh.",
      "For any questions about these Terms, contact us at legal@soilsense.in.",
    ],
  },
];

export default function TermsOfServicePage() {
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
            Terms of Service
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
          These Terms of Service govern your use of the SoilSense platform. Please read them carefully. By using SoilSense, you agree to be bound by these terms.
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
          <Link href="/privacy-policy" className="text-[#7CBF35] hover:underline font-medium">Privacy Policy</Link>
          <Link href="/cookie-policy" className="text-[#7CBF35] hover:underline font-medium">Cookie Policy</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E8F0EA] bg-white py-8 mt-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#5B665E]">
          <span>© 2026 SoilSense. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#021B0F] transition-colors">Privacy</Link>
            <Link href="/cookie-policy" className="hover:text-[#021B0F] transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
