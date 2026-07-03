"use client";

import { motion } from "framer-motion";
import { Link2, CheckSquare, Award } from "lucide-react";

const FEATURES = [
  {
    icon: <Link2 className="w-8 h-8 sm:w-12 sm:h-12 text-[#5E0ED7]" />,
    title: "Referral Engine",
    description: "Get your unique invite link. Invite your peers and track every signup seamlessly on your dashboard.",
  },
  {
    icon: <CheckSquare className="w-8 h-8 sm:w-12 sm:h-12 text-[#5E0ED7]" />,
    title: "Bounty Tasks",
    description: "Earn points by completing verified tasks: from technical blogging to hosting exclusive campus sessions.",
  },
  {
    icon: <Award className="w-8 h-8 sm:w-12 sm:h-12 text-[#5E0ED7]" />,
    title: "Premium Rewards",
    description: "Redeem your points for zero-cost career perks like 1-on-1 resume roasts and mock interviews.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="bg-white text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="max-w-2xl mb-16 md:mb-24"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-tight mb-6">
            <span className="text-black">CORE</span> <span className="text-[#5E0ED7]">RESPONSIBILITIES</span>
          </h2>
          <div className="max-w-3xl mb-16">
            <p className="text-sm sm:text-base font-medium opacity-70 normal-case leading-relaxed">
              As a Student Ambassador, your primary mission is to expand the BSPrep community within your campus. 
              You are the bridge between us and the next generation of tech leaders.
            </p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors font-semibold tracking-widest text-xs uppercase">
            Download PDF Guidelines
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {FEATURES.map((feature, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col gap-6 group">
              <div className="p-4 bg-black/5 w-fit group-hover:bg-[#5E0ED7]/10 transition-colors">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-xs sm:text-sm tracking-widest opacity-70 leading-relaxed normal-case font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
