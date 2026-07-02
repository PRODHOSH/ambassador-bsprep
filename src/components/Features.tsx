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

export default function Features() {
  return (
    <section id="features" className="bg-white text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl md:text-7xl leading-[0.9] tracking-tight">
              Built For <br />
              <span className="text-[#5E0ED7]">High Impact</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm tracking-widest max-w-[280px] text-left md:text-right">
            The ultimate zero-cost accelerator for driven students.
          </p>
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
              <div className="p-4 rounded-2xl bg-black/5 w-fit group-hover:bg-[#5E0ED7]/10 transition-colors">
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
