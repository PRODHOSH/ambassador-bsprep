"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SPONSORS = [
  { name: "XYZ DOMAIN", src: "/sponsors/xyz.png" },
  { name: "UNSTOP", src: "/sponsors/unstop.png" },
  { name: "STICKERFEVER", src: "/sponsors/stickerfever.png" },
  { name: "TRUSCHOLAR", src: "/sponsors/truscholar.png" },
];

export default function Sponsors() {
  return (
    <section className="bg-white text-black py-20 sm:py-24 px-5 border-t border-black/5 overflow-hidden font-semibold uppercase tracking-widest">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl tracking-widest mb-4">Our Sponsors</h2>
        <p className="text-[10px] sm:text-xs opacity-50 mb-16 text-center">Backed by industry leaders</p>
        
        <div className="flex flex-wrap justify-center gap-10 sm:gap-16 md:gap-24 items-center mb-16">
          {SPONSORS.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative grayscale hover:grayscale-0 transition-all duration-300 w-32 h-12 sm:w-40 sm:h-16"
            >
              <Image 
                src={sponsor.src} 
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>

        <a href="/sponsors" className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest text-white bg-black px-6 py-3 rounded-full hover:bg-[#5E0ED7] transition-all shadow-md hover:shadow-lg mt-4">
          CHECK OUT OUR SPONSORS <span className="text-lg leading-none">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
