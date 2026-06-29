import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — SoilSense",
  description: "How SoilSense uses cookies and similar tracking technologies.",
};

const cookieTypes = [
  {
    name: "Strictly Necessary",
    canOptOut: false,
    color: "bg-[#E8F5E9] text-[#1B5E20]",
    dot: "bg-[#2E7D32]",
    examples: ["Session authentication token", "CSRF protection token", "User preference store (dark mode, language)"],
    description:
      "These cookies are essential for the SoilSense application to function. Without them, you cannot log in, save a scan, or navigate between pages. They cannot be disabled.",
  },
  {
    name: "Functional",
    canOptOut: true,
    color: "bg-[#E3F2FD] text-[#0D47A1]",
    dot: "bg-[#1565C0]",
    examples: ["Scan history page size preference", "Map region last viewed", "Retest reminder dismissal state"],
    description:
      "These cookies remember your preferences to improve your experience. For example, remembering which crop filter you last used. Disabling them may reduce personalisation but will not prevent core functionality.",
  },
  {
    name: "Analytics",
    canOptOut: true,
    color: "bg-[#FFF3E0] text-[#E65100]",
    dot: "bg-[#F57C00]",
    examples: ["Page view counts", "Feature usage frequency", "Session duration"],
    description:
      "We use anonymised analytics (via a self-hosted, privacy-preserving tool) to understand how farmers use SoilSense and where we can improve. No personal data or scan results are shared with third-party analytics providers.",
  },
  {
    name: "Marketing",
    canOptOut: true,
    color: "bg-[#FCE4EC] text-[#880E4F]",
    dot: "bg-[#AD1457]",
    examples: ["UTM campaign tracking", "Referral source attribution"],
    description:
      "These cookies help us understand which channels — partner NGOs, state agriculture departments, social media — are most effectively reaching farmers who need SoilSense. We do not use retargeting or cross-site tracking cookies.",
  },
];

const sections = [
  {
    title: "What Are Cookies?",
    content:
      "Cookies are small text files placed on your device when you visit a website or use an app. They help the service remember information about your visit, such as your login state, preferences, and which features you use most.",
  },
  {
    title: "How We Use Cookies",
    content:
      "SoilSense uses cookies and similar technologies (local storage, session storage) to keep you logged in between sessions, save your scan preferences, and measure how different parts of the app are being used so we can improve them.",
  },
  {
    title: "Third-Party Cookies",
    content:
      "We do not allow third-party advertising networks to place cookies on our platform. Our analytics tool is self-hosted, which means your usage data never leaves SoilSense's own infrastructure.",
  },
  {
    title: "Managing Your Cookie Preferences",
    content:
      "You can manage or withdraw your consent for optional cookies at any time through the Cookie Preferences panel in your account settings. You can also clear cookies through your browser settings, but note that this will log you out of SoilSense.",
  },
  {
    title: "Updates to This Policy",
    content:
      "If we add new cookie categories or change how we use existing ones, we will update this page and, for significant changes, notify you via email or an in-app banner.",
  },
];

export default function CookiePolicyPage() {
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
            Cookie Policy
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
          We believe in being transparent about the technologies we use. This policy explains exactly what cookies SoilSense places on your device, why, and how you can control them.
        </p>

        {/* Cookie Type Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#021B0F]">Cookie Categories</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {cookieTypes.map((type) => (
              <div key={type.name} className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8F0EA] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${type.dot}`} />
                    <span className="font-bold text-[#021B0F] text-base">{type.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${type.color}`}>
                    {type.canOptOut ? "Optional" : "Required"}
                  </span>
                </div>
                <p className="text-[#5B665E] text-sm leading-relaxed">{type.description}</p>
                <div className="bg-[#F8F8F4] rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A9E8C] mb-2">Examples</p>
                  <ul className="space-y-1">
                    {type.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-xs text-[#5B665E]">
                        <span className="text-[#7CBF35] mt-0.5">›</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prose sections */}
        {sections.map((section) => (
          <section key={section.title} className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8F0EA]">
            <h2 className="text-xl font-bold text-[#021B0F] mb-4 pb-4 border-b border-[#E8F0EA]">
              {section.title}
            </h2>
            <p className="text-[#5B665E] text-sm md:text-base leading-relaxed">{section.content}</p>
          </section>
        ))}

        {/* Contact box */}
        <div className="bg-[#021B0F] text-white rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-3">Questions about cookies?</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            If you have any questions about our use of cookies or want to exercise your preferences, contact our Privacy team.
          </p>
          <a
            href="mailto:privacy@soilsense.in"
            className="inline-block bg-[#7CBF35] hover:bg-[#6CAE2B] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            privacy@soilsense.in
          </a>
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-6 pt-4 text-sm text-[#5B665E]">
          <span>Related:</span>
          <Link href="/privacy-policy" className="text-[#7CBF35] hover:underline font-medium">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-[#7CBF35] hover:underline font-medium">Terms of Service</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E8F0EA] bg-white py-8 mt-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#5B665E]">
          <span>© 2026 SoilSense. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#021B0F] transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-[#021B0F] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
