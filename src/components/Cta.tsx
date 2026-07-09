"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-24 md:py-32 px-5 sm:px-8 md:px-12 bg-black text-white overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5E0ED7] rounded-full blur-[120px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8"
      >
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
          Ready to make an <span className="text-[#5E0ED7]">Impact?</span>
        </h2>
        <p className="text-sm md:text-base opacity-70 max-w-2xl font-medium tracking-wide uppercase">
          Join the BSPrep Student Ambassador Program and unlock exclusive rewards, networking opportunities, and career growth.
        </p>
        
        <div className="flex flex-col items-center gap-3 mt-4">
          <a
            href="https://unstop.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm md:text-base font-semibold text-white bg-[#5E0ED7] px-8 py-4 rounded-full whitespace-nowrap group hover:bg-[#4a0ba8] transition-all hover:scale-105 shadow-[0_0_40px_rgba(94,14,215,0.4)] hover:shadow-[0_0_60px_rgba(94,14,215,0.6)]"
          >
            Apply Now
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <span className="text-[10px] tracking-widest opacity-50 uppercase">
            Via Unstop Platform
          </span>
        </div>
      </motion.div>
    </section>
  );
}
