"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SelectableCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

export function SelectableCard({ icon: Icon, label, value, selected, onSelect }: SelectableCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-xl border-2 px-5 py-6 cursor-pointer transition-colors",
        selected
          ? "border-gold bg-gold/10 shadow-gold"
          : "border-border bg-white hover:border-gold/40"
      )}
      onClick={() => onSelect(value)}
    >
      <Icon className={cn("size-7", selected ? "text-gold-foreground" : "text-muted-foreground")} />
      <span className={cn("font-heading text-sm font-semibold", selected ? "text-gold-foreground" : "text-foreground")}>
        {label}
      </span>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold"
          >
            <Check className="size-3 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
