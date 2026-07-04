"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import Image from "next/image";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function OnboardingModal() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if we've already onboarded using local storage
    const hasOnboarded = localStorage.getItem("bsprep_has_onboarded");
    if (!hasOnboarded) {
      setShowWelcome(true);
    }
  }, []);

  const startTour = () => {
    setShowWelcome(false);
    localStorage.setItem("bsprep_has_onboarded", "true"); // Prevent welcome modal from showing again
    localStorage.setItem("bsprep_tour_step", "1"); // Tell TourProvider to start step 1
    window.dispatchEvent(new Event("storage")); // Trigger storage event for same-page sync if needed
    // The TourProvider will pick it up on the next render loop or we can just force a reload
    window.location.reload();
  };

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col p-8 items-center text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
          Welcome to BSPrep!
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Congratulations on being selected as an official Student Ambassador. You are now part of an exclusive group empowering the next generation of tech leaders.
        </p>
        
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
          <Image
            src="/badges/bsprep_badge.png"
            alt="Verified Badge"
            fill
            className="object-contain"
          />
        </div>
        
        <p className="text-sm font-semibold text-[#5E0ED7] mb-4">
          You've earned the Verified Ambassador Badge!
        </p>
        
        <a
          href="/docs/bsprep_overview.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-8"
        >
          <Link2 className="w-3 h-3" /> Download Program Overview PDF
        </a>

        <button
          onClick={startTour}
          className="w-full flex items-center justify-center bg-[#5E0ED7] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4a0ba8] transition-colors"
        >
          Start Dashboard Tour
        </button>
      </motion.div>
    </div>
  );
}
