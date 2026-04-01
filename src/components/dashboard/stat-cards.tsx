"use client";

import { motion } from "motion/react";
import { FileText, MessageSquare, Target, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  FileText,
  MessageSquare,
  Target,
  Unlock,
};

export interface StatItem {
  label: string;
  value: string;
  iconName: keyof typeof icons;
  accentColor: string;
  accentBg: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function StatCards({ stats }: { stats: StatItem[] }) {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat) => {
        const Icon = icons[stat.iconName];
        return (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            className="group rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                stat.accentBg
              )}>
                <Icon className={cn("size-5", stat.accentColor)} />
              </div>
            </div>
            {/* Bottom accent */}
            <motion.div
              className={cn("mt-4 h-[3px] rounded-full", stat.accentBg)}
              initial={{ width: "0%" }}
              animate={{ width: "40%" }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 25, delay: 0.4 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
