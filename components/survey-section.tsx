"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Lock, CheckCircle2, ArrowRight, ArrowLeft, Send, User, MapPin, Phone, Check, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const USER_TYPES = [
  "Smallholder Farmer (छोटे किसान)",
  "Large Farmer (बड़े किसान)",
  "Home Gardener (घर में बागवानी करने वाले)",
  "Rooftop Grower (छत पर खेती करने वाले)",
  "FPO Member (किसान उत्पादक संगठन का सदस्य)",
  "Agri Retailer (एग्री-इनपुट बेचने वाले दुकानदार)",
  "Agronomist (कृषि सलाहकार / वैज्ञानिक)",
  "Other"
];

const FREQUENCIES = [
  "हर सीज़न (Every season)",
  "साल में एक बार (Once a year)",
  "कभी-कभी ही (Rarely)",
  "कभी नहीं (Never)"
];

const LOCATIONS = [
  "सरकारी लैब में (Government soil lab)",
  "प्राइवेट लैब में (Private lab)",
  "FPO या Agri Retailer के ज़रिए (Through an FPO or Agri retailer)",
  "मैं मिट्टी की जांच नहीं करवाता/करवाती (I don’t test my soil)"
];

const CHALLENGES = [
  "जांच करवाना महँगा पड़ता है (Too expensive)",
  "जांच सेंटर दूर या पहुंच से बाहर है (Inaccessible location)",
  "रिपोर्ट मिलने में देर होती है (Reports are delayed)",
  "रिपोर्ट समझना मुश्किल होता है (Reports are hard to understand)",
  "रिपोर्ट के बाद कोई सलाह या फॉलोअप नहीं मिलता (No follow-up action or guidance)",
  "पता नहीं कहां जाकर जांच करवानी है (Don’t know where to go)"
];

const DIY_INTEREST = [
  "हाँ (Yes)",
  "शायद (Maybe)",
  "नहीं (No)"
];

const APP_UTILITY = [
  "हाँ (Yes)",
  "शायद (Maybe)",
  "नहीं (No)"
];

const RECOMMENDATION_TYPES = [
  "खाद की सही मात्रा (Fertilizer dosage)",
  "जैविक सुधार की सलाह (Organic amendment suggestions)",
  "सिंचाई से जुड़ी गाइडेंस (Irrigation guidance)",
  "फसल के अनुसार मिट्टी की सलाह (Crop-specific soil practices)",
  "Other"
];

const DRONE_INTEREST = [
  "हाँ, मुझे बहुत रुचि है (Yes, very interested)",
  "अगर सस्ता हो तो रुचि है (Interested, if affordable)",
  "नहीं (No)"
];

export function SurveySection() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    stateDistrict: "",
    phone: "",
    userType: "",
    userTypeOther: "",
    frequency: "",
    location: "",
    challenges: [] as string[],
    diyInterest: "",
    appUtility: "",
    recommendations: [] as string[],
    recommendationOther: "",
    droneInterest: "",
    motivation: "",
    feedback: "",
  });

  const handleCheckboxToggle = (field: "challenges" | "recommendations", value: string) => {
    setFormData((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  const validateStep = (step: number) => {
    setErrorMsg("");
    if (step === 1) {
      if (!formData.name.trim()) {
        setErrorMsg("कृपया अपना नाम भरें / Please enter your name");
        return false;
      }
      if (!formData.userType) {
        setErrorMsg("कृपया उपयोगकर्ता का प्रकार चुनें / Please select type of user");
        return false;
      }
    } else if (step === 2) {
      if (!formData.frequency) {
        setErrorMsg("कृपया बताएं कि आप जांच कितनी बार करते हैं / Please select soil testing frequency");
        return false;
      }
      if (!formData.location) {
        setErrorMsg("कृपया बताएं कि आप जांच कहां करवाते हैं / Please select where you test soil");
        return false;
      }
      if (formData.challenges.length === 0) {
        setErrorMsg("कृपया कम से कम एक परेशानी चुनें / Please select at least one challenge");
        return false;
      }
    } else if (step === 3) {
      if (!formData.diyInterest) {
        setErrorMsg("कृपया DIY किट में रुचि बताएं / Please select DIY kit interest");
        return false;
      }
      if (!formData.appUtility) {
        setErrorMsg("कृपया ऐप की उपयोगिता पर अपनी राय दें / Please select app utility");
        return false;
      }
      if (formData.recommendations.length === 0) {
        setErrorMsg("कृपया सलाह के प्रकार चुनें / Please select at least one expected recommendation type");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      stateDistrict: "",
      phone: "",
      userType: "",
      userTypeOther: "",
      frequency: "",
      location: "",
      challenges: [],
      diyInterest: "",
      appUtility: "",
      recommendations: [],
      recommendationOther: "",
      droneInterest: "",
      motivation: "",
      feedback: "",
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrorMsg("");
  };

  return (
    <section id="survey" className="relative bg-memphis-light dark:bg-memphis-dark py-28 md:py-36 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#7CBF35]/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#021B0F]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Decorative Memphis SVG Shapes */}
      <svg className="absolute top-12 right-12 w-24 h-24 text-[#7CBF35]/30 animate-float pointer-events-none" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" strokeDasharray="8 8" />
      </svg>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7CBF35]/15 border border-[#7CBF35]/30 text-[#7CBF35] text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#7CBF35]" />
            Have Your Say
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-black/8 dark:border-white/10 pb-8"
          >
            <div>
              <h2 className="font-heading font-extrabold text-[clamp(2.2rem,5vw,3.8rem)] text-[#021B0F] dark:text-white leading-[1.08] tracking-tight">
                User Survey for Soil Health<br />
                <span className="text-[#7CBF35] bg-clip-text text-transparent bg-gradient-to-r from-[#7CBF35] to-[#5a9c1e]">
                  Diagnostic & Advisory Tool
                </span>
              </h2>
              <p className="mt-4 text-[#5B665E] dark:text-zinc-300 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                हम एक Soil Health Monitoring System विकसित कर रहे हैं। आपका feedback हमारे लिए बहुत important है ताकि हम इसे असली farming के लिए उपयोगी और field-ready बना सकें।
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 bg-white dark:bg-[#0A2616] px-5 py-2.5 rounded-full border border-black/8 dark:border-white/10 shadow-sm self-start md:self-auto">
              <span className="w-3 h-3 rounded-full bg-[#7CBF35] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5B665E] dark:text-zinc-300">
                Interactive Form · Step {currentStep} of 4
              </span>
            </div>
          </motion.div>
        </div>

        {/* Handcrafted SaaS Browser Container with Interactive Native Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[36px] overflow-hidden border-2 border-black/10 dark:border-white/15 bg-white dark:bg-[#0A2616] shadow-[0_30px_70px_-15px_rgba(2,27,15,0.25)]"
        >
          {/* Window Title Bar */}
          <div className="bg-[#EBF1EC] dark:bg-[#061F12] px-6 py-4 border-b border-black/8 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-400/90 shadow-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400/90 shadow-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/90 shadow-sm" />
            </div>

            {/* Fake URL bar */}
            <div className="hidden sm:flex items-center gap-2.5 bg-white/80 dark:bg-black/50 px-5 py-1.5 rounded-full text-xs font-mono text-[#5B665E] dark:text-zinc-300 border border-black/5 dark:border-white/10">
              <Lock className="w-3.5 h-3.5 text-[#7CBF35]" />
              <span>https://soilsense.ag/survey</span>
            </div>

            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7CBF35] bg-[#7CBF35]/15 px-3 py-1 rounded-full border border-[#7CBF35]/30">
              {isSubmitted ? "Submitted" : `Progress: ${currentStep * 25}%`}
            </div>
          </div>

          {/* Form Wizard Progress Bar */}
          {!isSubmitted && (
            <div className="w-full bg-[#EBF1EC] dark:bg-[#061F12] h-2">
              <div
                className="bg-gradient-to-r from-[#7CBF35] to-[#5a9c1e] h-2 transition-all duration-500"
                style={{ width: `${currentStep * 25}%` }}
              />
            </div>
          )}

          {/* Main Form Body */}
          <div className="p-8 md:p-12">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                
                {/* Error Banner */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm font-semibold flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Personal & User Type Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-[#7CBF35] uppercase tracking-widest block mb-1">
                          Step 01 / 04
                        </span>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-[#021B0F] dark:text-white tracking-tight">
                          Basic Information (सामान्य जानकारी)
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                            Name (नाम) <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B665E] dark:text-zinc-400" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="आपका नाम / Your Name"
                              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#061F12] border border-black/10 dark:border-white/15 text-[#021B0F] dark:text-white text-sm focus:outline-none focus:border-[#7CBF35] transition-colors"
                            />
                          </div>
                        </div>

                        {/* State & District */}
                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                            State & District (राज्य और ज़िला)
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B665E] dark:text-zinc-400" />
                            <input
                              type="text"
                              value={formData.stateDistrict}
                              onChange={(e) => setFormData({ ...formData, stateDistrict: e.target.value })}
                              placeholder="उदा. उत्तर प्रदेश, लखनऊ"
                              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#061F12] border border-black/10 dark:border-white/15 text-[#021B0F] dark:text-white text-sm focus:outline-none focus:border-[#7CBF35] transition-colors"
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                            Phone Number (फ़ोन नंबर)
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B665E] dark:text-zinc-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#061F12] border border-black/10 dark:border-white/15 text-[#021B0F] dark:text-white text-sm focus:outline-none focus:border-[#7CBF35] transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Type of User Single Select */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-3">
                          Type of user (आप किस प्रकार के उपयोगकर्ता हैं?) <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {USER_TYPES.map((type) => {
                            const isSelected = formData.userType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setFormData({ ...formData, userType: type })}
                                className={`p-4 rounded-2xl border text-left text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white shadow-sm ring-2 ring-[#7CBF35]/40"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                <span>{type}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#7CBF35] shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {formData.userType === "Other" && (
                          <input
                            type="text"
                            value={formData.userTypeOther}
                            onChange={(e) => setFormData({ ...formData, userTypeOther: e.target.value })}
                            placeholder="कृपया अपना उपयोगकर्ता प्रकार लिखें / Please specify"
                            className="mt-3 w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] dark:bg-[#061F12] border border-black/10 dark:border-white/15 text-sm"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Soil Testing Habits & Challenges */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-[#7CBF35] uppercase tracking-widest block mb-1">
                          Step 02 / 04
                        </span>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-[#021B0F] dark:text-white tracking-tight">
                          Testing Habits & Challenges (जांच का तरीका और परेशानियाँ)
                        </h3>
                      </div>

                      {/* Frequency */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-3">
                          आप मिट्टी की जांच कितनी बार करते हैं? (How often do you test your soil?) <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {FREQUENCIES.map((freq) => {
                            const isSelected = formData.frequency === freq;
                            return (
                              <button
                                key={freq}
                                type="button"
                                onClick={() => setFormData({ ...formData, frequency: freq })}
                                className={`p-4 rounded-2xl border text-left text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white shadow-sm ring-2 ring-[#7CBF35]/40"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                <span>{freq}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#7CBF35] shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-3">
                          आप मिट्टी की जांच कहां करवाते हैं? (Where do you get your soil tested?) <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {LOCATIONS.map((loc) => {
                            const isSelected = formData.location === loc;
                            return (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => setFormData({ ...formData, location: loc })}
                                className={`p-4 rounded-2xl border text-left text-xs md:text-sm font-semibold transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white shadow-sm ring-2 ring-[#7CBF35]/40"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                <span>{loc}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#7CBF35] shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Challenges Multi-Select */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-1">
                          मिट्टी की जांच में आपको कौन-कौन सी परेशानियाँ होती हैं? (एक से ज़्यादा चुन सकते हैं) <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-xs text-[#5B665E] dark:text-zinc-400 mb-3">
                          What challenges do you face in soil testing? (Select all that apply)
                        </p>
                        <div className="space-y-2.5">
                          {CHALLENGES.map((ch) => {
                            const isChecked = formData.challenges.includes(ch);
                            return (
                              <div
                                key={ch}
                                onClick={() => handleCheckboxToggle("challenges", ch)}
                                className={`p-4 rounded-2xl border cursor-pointer text-xs md:text-sm font-semibold transition-all flex items-center gap-3 ${
                                  isChecked
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white shadow-sm"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                                  isChecked ? "bg-[#7CBF35] border-[#7CBF35] text-[#021B0F]" : "border-black/20 dark:border-white/20"
                                }`}>
                                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <span>{ch}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Solution Utility & Recommendation Expectations */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-[#7CBF35] uppercase tracking-widest block mb-1">
                          Step 03 / 04
                        </span>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-[#021B0F] dark:text-white tracking-tight">
                          Solution Feedback (समाधान पर आपकी राय)
                        </h3>
                      </div>

                      {/* DIY Test Kit */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                          क्या आप एक ऐसा DIY मिट्टी जांच किट इस्तेमाल करना चाहेंगे जिसमें मिट्टी के पोषक तत्व रंग बदलने वाली टेस्ट स्ट्रिप से पता चलें? <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-xs text-[#5B665E] dark:text-zinc-400 mb-3">
                          (Would you be interested in a DIY soil testing kit that shows nutrient levels through color-changing test strips?)
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {DIY_INTEREST.map((opt) => {
                            const isSelected = formData.diyInterest === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, diyInterest: opt })}
                                className={`p-4 rounded-2xl border text-center text-xs md:text-sm font-semibold transition-all ${
                                  isSelected
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white ring-2 ring-[#7CBF35]/40"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile App Utility */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                          अगर मोबाइल ऐप टेस्ट स्ट्रिप को स्कैन करके तुरंत सलाह दे, तो क्या वो आपके लिए उपयोगी होगा? <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-xs text-[#5B665E] dark:text-zinc-400 mb-3">
                          (Would you find it useful if a mobile app scanned the test strip and gave you instant recommendations?)
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {APP_UTILITY.map((opt) => {
                            const isSelected = formData.appUtility === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, appUtility: opt })}
                                className={`p-4 rounded-2xl border text-center text-xs md:text-sm font-semibold transition-all ${
                                  isSelected
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white ring-2 ring-[#7CBF35]/40"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recommendation Expectations Multi-Select */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-1">
                          आप ऐप से किस तरह की सलाह की उम्मीद करेंगे? (एक से ज़्यादा चुन सकते हैं) <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-xs text-[#5B665E] dark:text-zinc-400 mb-3">
                          (What kind of recommendations would you expect from the app?)
                        </p>
                        <div className="space-y-2.5">
                          {RECOMMENDATION_TYPES.map((rec) => {
                            const isChecked = formData.recommendations.includes(rec);
                            return (
                              <div
                                key={rec}
                                onClick={() => handleCheckboxToggle("recommendations", rec)}
                                className={`p-4 rounded-2xl border cursor-pointer text-xs md:text-sm font-semibold transition-all flex items-center gap-3 ${
                                  isChecked
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white shadow-sm"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                                  isChecked ? "bg-[#7CBF35] border-[#7CBF35] text-[#021B0F]" : "border-black/20 dark:border-white/20"
                                }`}>
                                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <span>{rec}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Drone Service, Motivation & Open Feedback */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-[#7CBF35] uppercase tracking-widest block mb-1">
                          Step 04 / 04
                        </span>
                        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-[#021B0F] dark:text-white tracking-tight">
                          Drone Services & Open Feedback (ड्रोन सर्विस और सुझाव)
                        </h3>
                      </div>

                      {/* Drone Interest */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                          क्या आप ऐसी ड्रोन सर्विस में रुचि रखते हैं जो मिट्टी के डेटा के आधार पर आपके खेत में पानी में घुलने वाले फर्टिलाइज़र का छिड़काव करे?
                        </label>
                        <p className="text-xs text-[#5B665E] dark:text-zinc-400 mb-3">
                          (Would you be interested in a drone service that sprays water-soluble fertilizers based on soil data?)
                        </p>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {DRONE_INTEREST.map((opt) => {
                            const isSelected = formData.droneInterest === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, droneInterest: opt })}
                                className={`p-4 rounded-2xl border text-center text-xs md:text-sm font-semibold transition-all ${
                                  isSelected
                                    ? "bg-[#7CBF35]/15 border-[#7CBF35] text-[#021B0F] dark:text-white ring-2 ring-[#7CBF35]/40"
                                    : "bg-[#FAF9F5] dark:bg-[#061F12] border-black/8 dark:border-white/10 text-[#5B665E] dark:text-zinc-300 hover:border-[#7CBF35]"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Motivation Driver */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                          आपको ऐसा solution इस्तेमाल करने में क्या चीज़ ज़्यादा प्रेरित करेगी?
                        </label>
                        <p className="text-xs text-[#5B665E] dark:text-zinc-400 mb-3">
                          (What would make you more likely to use this type of solution?)
                        </p>
                        <textarea
                          rows={3}
                          value={formData.motivation}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          placeholder="अपनी राय लिखें..."
                          className="w-full p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#061F12] border border-black/10 dark:border-white/15 text-[#021B0F] dark:text-white text-sm focus:outline-none focus:border-[#7CBF35] transition-colors"
                        />
                      </div>

                      {/* Suggestions & Feedback */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#021B0F] dark:text-white mb-2">
                          कोई सुझाव, फीडबैक या फीचर रिक्वेस्ट जो आप देना चाहें?
                        </label>
                        <p className="text-xs text-[#5B665E] dark:text-zinc-400 mb-3">
                          (Any suggestions, feedback, or feature requests?)
                        </p>
                        <textarea
                          rows={3}
                          value={formData.feedback}
                          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                          placeholder="आपके विचार हमारे लिए बहुत कीमती हैं..."
                          className="w-full p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#061F12] border border-black/10 dark:border-white/15 text-[#021B0F] dark:text-white text-sm focus:outline-none focus:border-[#7CBF35] transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Form Navigation Controls */}
                <div className="flex justify-between items-center pt-8 mt-8 border-t border-black/8 dark:border-white/10">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="px-6 py-3 rounded-2xl border border-black/15 dark:border-white/20 text-[#021B0F] dark:text-white font-bold text-xs md:text-sm flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back (पीछे)</span>
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 rounded-2xl bg-[#7CBF35] hover:bg-[#68ab24] text-[#021B0F] font-extrabold text-xs md:text-sm flex items-center gap-2 shadow-md uppercase tracking-wider font-heading"
                    >
                      <span>Next (आगे)</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#7CBF35] to-[#5a9c1e] text-[#021B0F] font-black text-sm md:text-base flex items-center gap-2.5 shadow-[0_8px_30px_rgba(124,191,53,0.5)] uppercase tracking-wider font-heading"
                    >
                      <span>Submit Feedback (सबमिट करें)</span>
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                </div>

              </form>
            ) : (
              /* SUCCESS CONFIRMATION SCREEN */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center max-w-xl mx-auto space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-[#7CBF35]/20 border-2 border-[#7CBF35] flex items-center justify-center mx-auto text-[#7CBF35] shadow-[0_0_40px_rgba(124,191,53,0.4)]">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-[#021B0F] dark:text-white uppercase tracking-tight">
                  धन्यवाद! (Thank You!)
                </h3>

                <p className="text-[#5B665E] dark:text-zinc-300 text-base md:text-lg leading-relaxed font-medium">
                  आपका फीडबैक सफलतापूर्वक दर्ज कर लिया गया है। आपकी राय हमें <span className="text-[#7CBF35] font-bold">SoilSense</span> को असली खेती के लिए एक प्रभावी समाधान बनाने में मदद करेगी।
                </p>

                <div className="bg-[#FAF9F5] dark:bg-[#061F12] p-6 rounded-3xl border border-black/8 dark:border-white/10 text-left text-xs space-y-2">
                  <div className="font-bold text-[#7CBF35] uppercase tracking-wider mb-2">Response Summary</div>
                  <div><strong className="text-[#021B0F] dark:text-white">Name:</strong> {formData.name}</div>
                  <div><strong className="text-[#021B0F] dark:text-white">User Type:</strong> {formData.userType}</div>
                  <div><strong className="text-[#021B0F] dark:text-white">Selected Challenges:</strong> {formData.challenges.join(", ")}</div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="px-6 py-3 rounded-2xl border border-[#7CBF35] text-[#7CBF35] font-bold text-xs uppercase tracking-wider flex items-center gap-2 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Submit Another Feedback</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
