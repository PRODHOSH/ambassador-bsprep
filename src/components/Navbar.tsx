"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Timeline", href: "/#timeline" },
  { label: "Perks", href: "/#benefits" },
  { label: "Responsibilities", href: "/#features" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsTop(latest < 50);
  });

  // Hide entirely on dashboard
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: "rgba(255, 255, 255, 0)", backdropFilter: "blur(0px)" }}
        animate={{ 
          backgroundColor: isTop ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: isTop ? "blur(0px)" : "blur(12px)",
          borderBottomColor: isTop ? "rgba(0,0,0,0)" : "rgba(0, 0, 0, 0.05)"
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-12 py-5 font-semibold uppercase text-black border-b"
      >
        <Link href="/">
          <div className="relative w-10 h-10 shrink-0 cursor-pointer">
            <Image src="/bsprep.png" alt="BSPrep Logo" fill className="object-contain" />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] tracking-widest hover:text-[#5E0ED7] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1 shrink-0 group hover:bg-[#5E0ED7] transition-colors"
        >
          <span className="w-4 h-[2px] bg-white group-hover:scale-x-90 transition-transform origin-center" />
          <span className="w-4 h-[2px] bg-white group-hover:scale-x-110 transition-transform origin-center" />
          <span className="w-4 h-[2px] bg-white group-hover:scale-x-90 transition-transform origin-center" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-5 sm:p-8 font-semibold uppercase tracking-widest"
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
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl text-black hover:text-[#5E0ED7] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-auto flex flex-col gap-2">
              <Link
                href="https://unstop.com"
                target="_blank"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-lg text-white bg-[#5E0ED7] py-4 rounded-full hover:bg-[#4a0ba8] transition-colors"
              >
                Apply Now
                <ArrowUpRight className="w-[18px] h-[18px]" />
              </Link>
              <div className="text-center text-[10px] opacity-50 pb-2">
                Applications Opening Soon
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
