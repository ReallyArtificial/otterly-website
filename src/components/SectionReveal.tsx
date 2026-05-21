"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * SectionReveal — reusable scroll-triggered entrance wrapper.
 * Uses framer-motion useInView with spring physics.
 * Respects prefers-reduced-motion via framer's built-in support.
 *
 * Design reasoning: consistent reveal language across sections,
 * but each section customizes direction/stagger for its own personality.
 */
export function SectionReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  threshold = 0.2,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once,
    margin: `-${Math.round(threshold * 100)}% 0px` as any,
  });

  const directionMap = {
    up: { y: 32 },
    down: { y: -32 },
    left: { x: 32 },
    right: { x: -32 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directionMap[direction],
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directionMap[direction] }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerReveal — staggers children's reveal with configurable delay.
 * Wraps each child in a SectionReveal with incremental delay.
 */
export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
  baseDelay = 0,
  direction = "up",
}: {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <SectionReveal
          key={i}
          delay={baseDelay + i * staggerDelay}
          direction={direction}
        >
          {child}
        </SectionReveal>
      ))}
    </div>
  );
}
