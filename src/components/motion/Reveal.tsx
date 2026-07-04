"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type RevealProps = MotionProps & {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={false}
      whileHover={props.whileHover}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ opacity: 1, transform: "translateY(0px)" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
