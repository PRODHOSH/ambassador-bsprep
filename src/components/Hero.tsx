"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = ["Referrals", "Bounties", "Rewards", "Leaderboard"];

const STATS = [
  { value: "10K", label: "STUDENTS\nIMPACTED" },
  { value: "50", label: "PREMIUM\nREWARDS" },
  { value: "100", label: "GROWTH\nFELLOWS" },
];

const HEADING_WORDS = ["Growth", "Fellows", "Portal"];

const customEase = [0.22, 1, 0.36, 1] as const;

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: customEase,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: customEase,
    },
  }),
};

const slideUp = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      delay: 0.4 + i * 0.14,
      duration: 0.7,
      ease: customEase,
    },
  }),
};

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col font-semibold uppercase text-black selection:bg-[#5E0ED7] selection:text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
        />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6 relative z-10">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeDown}
          className="relative w-10 h-10 shrink-0 cursor-pointer"
        >
          <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={fadeDown}
              className="text-[14px] tracking-widest hover:text-[#5E0ED7] transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>

        <motion.button
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeDown}
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1 shrink-0 group hover:bg-[#5E0ED7] transition-colors"
        >
          <span className="w-4 h-[2px] bg-white group-hover:scale-x-90 transition-transform origin-center" />
          <span className="w-4 h-[2px] bg-white group-hover:scale-x-110 transition-transform origin-center" />
          <span className="w-4 h-[2px] bg-white group-hover:scale-x-90 transition-transform origin-center" />
        </motion.button>
      </nav>

      {/* Stats Row */}
      <div className="flex-1 flex items-center justify-end px-5 sm:px-8 md:px-12 py-8 md:py-0 relative z-10">
        <div className="flex items-center gap-5 sm:gap-8 md:gap-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i + 2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-right flex flex-col items-end"
            >
              <div
                className="flex items-start"
                style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", lineHeight: 1 }}
              >
                <span className="text-[#5E0ED7] text-[0.5em] mt-[0.2em]">+</span>
                <span>{stat.value}</span>
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm tracking-widest whitespace-pre-line leading-tight text-right mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-5 sm:px-8 md:px-12 pb-8 md:pb-12 flex flex-col gap-6 md:gap-12 relative z-10">
        {/* Row A */}
        <div className="flex flex-row items-center justify-between gap-4">
          <motion.p
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[10px] sm:text-xs md:text-sm tracking-widest max-w-[130px] sm:max-w-[160px] md:max-w-xs"
          >
            Empowering Next-Gen <br /> Tech Leaders <br /> Across Campuses
          </motion.p>

          <div className="flex flex-col items-end gap-1.5 sm:gap-2">
            <motion.a
              href="https://unstop.com" target="_blank" rel="noreferrer"
              custom={6}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-white bg-[#5E0ED7] px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full whitespace-nowrap group hover:bg-[#4a0ba8] transition-colors"
            >
              Apply Now
              <ArrowUpRight className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
            <motion.div
              custom={6.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[8px] sm:text-[9px] md:text-[10px] tracking-widest opacity-50 uppercase mr-2"
            >
              Applications Opening Soon
            </motion.div>
          </div>
        </div>

        {/* Row B */}
        <div className="flex flex-row items-end justify-between gap-3 sm:gap-4">
          <motion.p
            custom={7}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0 text-[9px] sm:text-xs md:text-sm tracking-widest text-left md:text-right"
          >
            An Exclusive, Invite-Only Portal For BSPrep Growth Fellows To Earn Rewards And Build Their Career
          </motion.p>

          <div className="flex flex-col items-end">
            {HEADING_WORDS.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.div
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={slideUp}
                  className="text-right"
                  style={{
                    fontSize: "clamp(2rem, 9vw, 9rem)",
                    lineHeight: 0.88,
                  }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-5 sm:p-8"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="relative w-10 h-10 shrink-0">
                <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#5E0ED7] transition-colors"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-8 mt-16">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl tracking-widest text-black hover:text-[#5E0ED7] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-auto flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-lg text-white bg-[#5E0ED7] py-4 rounded-full font-semibold tracking-widest hover:bg-[#4a0ba8] transition-colors"
              >
                Apply Now
                <ArrowUpRight className="w-[18px] h-[18px]" />
              </a>
              <div className="text-center text-[10px] tracking-widest opacity-50 uppercase pb-2">
                Applications Opening Soon
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
