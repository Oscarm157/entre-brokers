"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const stepLabels = [
  "Tipo",
  "Ubicación",
  "Detalles",
  "Publicar",
];

interface AnimatedProgressProps {
  currentStep: number;
}

export function AnimatedProgress({ currentStep }: AnimatedProgressProps) {
  const progress = ((currentStep + 1) / stepLabels.length) * 100;

  return (
    <div className="mb-8">
      {/* Step indicators */}
      <div className="mb-3 flex items-center justify-between">
        {stepLabels.map((label, i) => (
          <button
            key={label}
            type="button"
            className="flex flex-col items-center gap-1.5"
            disabled
          >
            <motion.div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                i <= currentStep
                  ? "bg-gold text-white"
                  : "bg-muted text-muted-foreground"
              )}
              animate={{
                scale: i === currentStep ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {i + 1}
            </motion.div>
            <span className={cn(
              "text-xs font-medium",
              i <= currentStep ? "text-gold-foreground" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gold-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </div>
    </div>
  );
}
