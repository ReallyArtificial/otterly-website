"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — thin amber progress bar at the top of the viewport.
 * Sits below the navbar. Only visible mid-scroll, fades at extremes.
 * Design reasoning: gives spatial awareness without being intrusive.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  /* Spring-damped for organic feel — not a raw pixel tracker */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #c4652a 0%, #d99668 60%, #c4652a 100%)",
      }}
      /* Fade in after a small scroll, fade out near bottom */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    />
  );
}
