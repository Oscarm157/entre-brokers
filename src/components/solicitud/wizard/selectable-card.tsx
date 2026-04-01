"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SelectableCardProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  size?: "default" | "large";
}

export function SelectableCard({
  icon: Icon,
  label,
  description,
  value,
  selected,
  onSelect,
  size = "default",
}: SelectableCardProps) {
  const isLarge = size === "large";

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center gap-3 rounded-2xl text-center transition-all duration-300",
        isLarge ? "px-8 py-8" : "px-5 py-6",
        selected
          ? "bg-gradient-to-b from-gold/15 to-gold/5 shadow-[0_8px_30px_rgba(252,195,85,0.15)]"
          : "bg-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white"
      )}
      onClick={() => onSelect(value)}
    >
      {/* Icon container */}
      <div className={cn(
        "flex items-center justify-center rounded-xl transition-all duration-300",
        isLarge ? "h-16 w-16" : "h-12 w-12",
        selected
          ? "bg-gold/20"
          : "bg-secondary group-hover:bg-gold/10"
      )}>
        <Icon className={cn(
          "transition-colors duration-300",
          isLarge ? "size-8" : "size-6",
          selected ? "text-gold-foreground" : "text-muted-foreground group-hover:text-gold-foreground"
        )} />
      </div>

      {/* Label */}
      <div>
        <span className={cn(
          "font-heading font-semibold transition-colors duration-300",
          isLarge ? "text-base" : "text-sm",
          selected ? "text-gold-foreground" : "text-foreground"
        )}>
          {label}
        </span>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Selection indicator */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring" as const, stiffness: 500, damping: 20 }}
            className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold shadow-[0_2px_8px_rgba(252,195,85,0.4)]"
          >
            <Check className="size-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[3px] rounded-full bg-gold-gradient"
        initial={{ width: 0, x: "-50%" }}
        animate={{ width: selected ? "60%" : "0%", x: "-50%" }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
      />
    </motion.button>
  );
}
