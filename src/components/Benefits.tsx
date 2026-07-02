"use client";

import { motion } from "framer-motion";
import { Fingerprint, Cpu, Gift, Briefcase } from "lucide-react";

const BENEFITS = [
  {
    icon: <Fingerprint className="w-8 h-8 text-white" />,
    title: "Digital Identity",
    items: [
      "Free .xyz Domains (1 Year) for top performers",
      "Blockchain-powered Digital Certificates",
      "Official Digital Badges",
      "Smart Credential Wallet Access",
    ],
  },
  {
    icon: <Cpu className="w-8 h-8 text-white" />,
    title: "AI Career Arsenal",
    items: [
      "AI Career Coach Access",
      "AI Interview Preparation Tool",
      "TruResume (AI-powered Resume Builder)",
    ],
  },
  {
    icon: <Briefcase className="w-8 h-8 text-white" />,
    title: "Platform Perks",
    items: [
      "Access to the Job & Internship Portal",
      "Custom credential design support",
      "Marketing support for the program",
    ],
  },
  {
    icon: <Gift className="w-8 h-8 text-white" />,
    title: "Physical Swags",
    items: [
      "Exclusive BSPrep T-Shirts",
      "Premium Diaries & Pens",
      "Official Sticker Sheets",
      "Bookmarks & Collectibles",
    ],
    note: "Unlocked based on referral milestones"
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Benefits() {
  return (
    <section id="benefits" className="bg-black text-white py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase tracking-widest relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#5E0ED7]/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4">Elite Perks</h2>
          <p className="text-xs sm:text-sm opacity-60">Unlock rewards as you climb the leaderboard</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {BENEFITS.map((benefit) => (
            <motion.div key={benefit.title} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 hover:border-[#5E0ED7]/50 transition-colors flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-[#5E0ED7] flex items-center justify-center mb-6 shadow-lg shadow-[#5E0ED7]/20">
                {benefit.icon}
              </div>
              <h3 className="text-lg sm:text-xl mb-6">{benefit.title}</h3>
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {benefit.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm normal-case font-medium opacity-80 leading-relaxed">
                    <span className="text-[#5E0ED7] mt-1 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              {benefit.note && (
                <div className="mt-auto text-[10px] text-[#5E0ED7] opacity-80 border-t border-white/10 pt-4">
                  * {benefit.note}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
