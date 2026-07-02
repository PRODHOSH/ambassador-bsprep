"use client";

import { motion } from "framer-motion";
import { Fingerprint, Cpu, Briefcase } from "lucide-react";
import Image from "next/image";

const BENEFITS = [
  {
    icon: <Fingerprint className="w-8 h-8 text-[#5E0ED7]" />,
    title: "Digital Identity",
    items: [
      "Free .xyz Domains (1 Year) for top performers",
      "Blockchain-powered Digital Certificates",
      "Official Digital Badges",
      "Smart Credential Wallet Access",
    ],
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#5E0ED7]" />,
    title: "AI Career Arsenal",
    items: [
      "AI Career Coach Access",
      "AI Interview Preparation Tool",
      "TruResume (AI-powered Resume Builder)",
    ],
  },
  {
    icon: <Briefcase className="w-8 h-8 text-[#5E0ED7]" />,
    title: "Platform Perks",
    items: [
      "Access to the Job & Internship Portal",
      "Custom credential design support",
      "Marketing support for the program",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Benefits() {
  return (
    <section id="benefits" className="bg-slate-50 text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase tracking-widest relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            <span className="text-black">ELITE</span> <span className="text-[#5E0ED7]">PERKS</span>
          </h2>
          <p className="text-xs sm:text-sm opacity-50">Unlock premium rewards as you climb the leaderboard</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8"
        >
          {BENEFITS.map((benefit) => (
            <motion.div 
              key={benefit.title} 
              variants={itemVariants} 
              className="bg-white p-6 sm:p-8 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(94,14,215,0.1)] transition-all duration-300 hover:-translate-y-2 border border-black/5 group"
            >
              <div className="w-16 h-16 bg-[#5E0ED7]/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#5E0ED7]/20 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg sm:text-xl mb-6 text-black/90">{benefit.title}</h3>
              <ul className="flex flex-col gap-4 flex-1 mb-6">
                {benefit.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm normal-case font-medium opacity-70 leading-relaxed group-hover:opacity-100 transition-opacity">
                    <span className="text-[#5E0ED7] mt-1 shrink-0 text-[10px]">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Physical Swag Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: customEase }}
          className="bg-white p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(94,14,215,0.1)] transition-all duration-300 border border-black/5 group flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
        >
          <div className="flex-1 w-full">
            <h3 className="text-2xl sm:text-3xl mb-6 text-black/90 tracking-tight">
              <span className="text-black">PHYSICAL</span> <span className="text-[#5E0ED7]">SWAGS</span>
            </h3>
            <p className="text-xs sm:text-sm opacity-50 mb-8 normal-case font-medium">Unlock exclusive BSPrep merchandise based on referral milestones.</p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-sm normal-case font-medium opacity-70"><span className="text-[#5E0ED7] shrink-0 text-[10px]">✦</span> Exclusive BSPrep T-Shirts</li>
              <li className="flex items-center gap-3 text-sm normal-case font-medium opacity-70"><span className="text-[#5E0ED7] shrink-0 text-[10px]">✦</span> Premium Diaries & Pens</li>
              <li className="flex items-center gap-3 text-sm normal-case font-medium opacity-70"><span className="text-[#5E0ED7] shrink-0 text-[10px]">✦</span> Official Sticker Sheets</li>
              <li className="flex items-center gap-3 text-sm normal-case font-medium opacity-70"><span className="text-[#5E0ED7] shrink-0 text-[10px]">✦</span> Bookmarks & Collectibles</li>
            </ul>
          </div>
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] overflow-hidden bg-slate-50 flex items-center justify-center p-4">
            <Image 
              src="/swag_mockup.png" 
              alt="BSPrep Physical Swags" 
              fill 
              className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const customEase = [0.22, 1, 0.36, 1] as const;
