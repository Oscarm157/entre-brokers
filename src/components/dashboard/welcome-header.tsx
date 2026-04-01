"use client";

import { motion } from "motion/react";

interface WelcomeHeaderProps {
  firstName: string;
}

export function WelcomeHeader({ firstName }: WelcomeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
    >
      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Dashboard
      </div>
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
        Bienvenido, {firstName}
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        Aquí tienes un resumen de tu actividad reciente.
      </p>
    </motion.div>
  );
}
