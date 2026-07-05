"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedCounter({ 
  value, 
  duration = 1.5 
}: { 
  value: number; 
  duration?: number; 
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, { duration, ease: "easeOut" });
      return animation.stop;
    }
  }, [count, value, isInView, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
