"use client";

import { motion } from "framer-motion";
import { FlaskConical, MapPin, HelpCircle, TrendingDown, Layers, Search, Clock } from "lucide-react";

const problems = [
  {
    icon: FlaskConical,
    title: "Soil testing takes too long",
    description: "Traditional labs take up to 15 days for results.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
  },
  {
    icon: MapPin,
    title: "Labs are too far",
    description: "Long distances and limited access cost farmers time, money, and opportunity.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
  },
  {
    icon: HelpCircle,
    title: "Guesswork drives fertilization",
    description: "Without accurate data, farmers guess—and pay the price.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
  },
  {
    icon: TrendingDown,
    title: "Soil degradation continues",
    description: "Nutrient imbalance today means lower yields tomorrow.",
    bg: "bg-[#EBF1EC]",
    iconColor: "text-foreground",
  },
];

const stats = [
  {
    icon: FlaskConical,
    value: "12%",
    label: "Farmers Test Soil",
    description: "The vast majority of farmers operate in the dark, leading to inefficiency.",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    icon: TrendingDown,
    value: "40%",
    label: "Land Degraded",
    description: "Rapid loss of soil fertility across the subcontinent threatens food security.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Layers,
    value: "78%",
    label: "Fertilizer Overuse",
    description: "Excessive chemical usage is poisoning the water table and killing topsoil.",
    color: "text-brand-lime",
    bg: "bg-brand-lime/10",
  },
];

export function ProblemSection() {
  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex items-center gap-2 mb-4"
            >
               <Search className="h-5 w-5 text-brand-lime" />
               <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">The Problem</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 uppercase tracking-tight text-foreground"
            >
              THE SCALE OF <br/><span className="text-brand-lime">INDIA’S SOIL CRISIS</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl font-medium"
            >
              Traditional labs take 15 days. Field kits are inaccurate. Our soil is dying silently while the world’s population explodes.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block w-1/3 h-48 bg-zinc-200 rounded-3xl overflow-hidden relative"
          >
             {/* Placeholder for header image */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="w-full h-full bg-gradient-to-tr from-[#8B5A2B]/40 to-transparent flex items-center justify-center">
               <span className="text-white/50 font-bold uppercase tracking-widest text-sm">Cracked Soil Image</span>
             </div>
          </motion.div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((problem, idx) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-[24px] border border-border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-zinc-100 relative overflow-hidden flex items-center justify-center">
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                 <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs z-10">{problem.title} Image</span>
              </div>
              <div className="p-6 relative flex-1 flex flex-col">
                <div className={`absolute -top-8 left-6 ${problem.bg} w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-sm`}>
                  <problem.icon className={`h-5 w-5 ${problem.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mt-4 mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statistics Strip */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-dark-0 rounded-[32px] p-8 md:p-12 shadow-xl flex flex-col md:flex-row justify-between gap-8 items-start md:items-center"
        >
           {stats.map((stat, idx) => (
             <div key={idx} className="flex gap-6 items-start flex-1">
                <div className={`${stat.bg} w-14 h-14 rounded-full flex items-center justify-center shrink-0`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                 <div>
                    <h4 className={`font-heading font-bold uppercase tracking-wider text-lg mb-2 ${stat.color}`}>{stat.label}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed max-w-[200px]">
                      {stat.description}
                    </p>
                 </div>
             </div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}
