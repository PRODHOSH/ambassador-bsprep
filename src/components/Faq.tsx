"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What is the Growth Fellow program?",
    answer: "An exclusive, invite-only ambassador program where driven students earn premium rewards by promoting BSPrep and building their campus community.",
  },
  {
    question: "Who is eligible to apply?",
    answer: "Any student with a passion for technology, networking, and community building. No prior technical experience is required—just eagerness and drive.",
  },
  {
    question: "How are candidates shortlisted?",
    answer: "Shortlisting is based strictly on your application. We look for enthusiasm, clear communication, and a genuine desire to grow your skills.",
  },
  {
    question: "What is the time commitment?",
    answer: "The program is entirely flexible. You complete tasks (bounties) and refer peers at your own pace alongside your studies.",
  },
  {
    question: "How do the rewards work?",
    answer: "You earn points for every successful referral and verified bounty task. These points unlock our elite perks, from .xyz domains to physical swag and AI career tools.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white text-black py-20 sm:py-32 px-5 sm:px-8 md:px-12 font-semibold uppercase tracking-widest border-t border-black/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-5xl tracking-tight mb-4">FAQ</h2>
          <p className="text-xs sm:text-sm opacity-50">Everything you need to know</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="border border-black/10 rounded-2xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-black/5 transition-colors"
                >
                  <span className="text-sm sm:text-base leading-snug pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#5E0ED7] text-white' : 'bg-black/5 text-black'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-xs sm:text-sm normal-case font-medium opacity-70 leading-relaxed border-t border-black/5 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
