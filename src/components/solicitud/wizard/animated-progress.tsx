"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Tipo", number: 1 },
  { label: "Ubicación", number: 2 },
  { label: "Detalles", number: 3 },
  { label: "Publicar", number: 4 },
];

interface AnimatedProgressProps {
  currentStep: number;
}

export function AnimatedProgress({ currentStep }: AnimatedProgressProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center" style={{ flex: i < steps.length - 1 ? 1 : "none" }}>
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full font-heading text-sm font-bold transition-colors",
                  i < currentStep && "bg-gold text-white",
                  i === currentStep && "bg-primary text-white",
                  i > currentStep && "bg-secondary text-muted-foreground"
                )}
                animate={{
                  scale: i === currentStep ? 1.1 : 1,
                }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              >
                {i < currentStep ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 500, damping: 20 }}
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  step.number
                )}
                {/* Active ring pulse */}
                {i === currentStep && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </motion.div>
              <span className={cn(
                "text-xs font-medium tracking-wide uppercase",
                i <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="relative mx-3 h-[2px] flex-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gold-gradient"
                  initial={{ width: "0%" }}
                  animate={{ width: i < currentStep ? "100%" : "0%" }}
                  transition={{ type: "spring" as const, stiffness: 200, damping: 25, delay: 0.1 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
