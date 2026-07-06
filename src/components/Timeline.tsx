"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Rocket } from "lucide-react";

const TIMELINE_STEPS = [
  {
    icon: <Calendar className="w-6 h-6 text-[#5E0ED7]" />,
    date: "July 15",
    title: "Applications Open",
    description: "Submit your application on Unstop. Limited slots available.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#5E0ED7]" />,
    date: "August",
    title: "Shortlisting Phase",
    description: "Candidates are selected based strictly on eagerness, drive, and merit.",
  },
  {
    icon: <Rocket className="w-6 h-6 text-[#5E0ED7]" />,
    date: "Sept 10 - Oct 30",
    title: "The Ambassador Program",
    description: "Launch of the official BSPrep Ambassador Program.",
    isActive: true,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="bg-white text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase tracking-widest border-t border-black/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            <span className="text-black">YOUR</span> <span className="text-[#5E0ED7]">TIMELINE</span>
          </h2>
          <p className="text-xs sm:text-sm opacity-50">Your journey to becoming a Student Ambassador</p>
        </motion.div>

        <div className="relative border-l-2 border-[#5E0ED7]/20 ml-4 sm:ml-8 space-y-12 pb-4">
          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2 }}
              className="relative pl-8 sm:pl-12"
            >
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#5E0ED7] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#5E0ED7] rounded-full" />
              </div>
              
              <div className="bg-black/5 p-6 border border-black/5 hover:border-[#5E0ED7]/30 transition-colors group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-[#5E0ED7] text-xs font-bold mb-1">{step.date}</div>
                    <h3 className="text-lg sm:text-xl">{step.title}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm normal-case font-medium opacity-70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
