"use client";

import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  className?: string;
  currency?: string;
};

export function AnimatedNumber({
  value,
  className,
  currency = "EUR",
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState("0");

  useMotionValueEvent(springValue, "change", (latest) => {
    setDisplayValue(
      new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(latest),
    );
  });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return (
    <motion.span className={className} aria-label={displayValue}>
      {displayValue}
    </motion.span>
  );
}
