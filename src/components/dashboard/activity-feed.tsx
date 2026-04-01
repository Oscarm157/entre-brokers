"use client";

import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  match_score: number | null;
  created_at: string;
  solicitud_title: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

function matchColor(score: number | null) {
  if (!score) return { bg: "bg-secondary", text: "text-muted-foreground" };
  if (score >= 80) return { bg: "bg-gold/15", text: "text-gold-foreground" };
  if (score >= 60) return { bg: "bg-accent/10", text: "text-accent" };
  return { bg: "bg-secondary", text: "text-muted-foreground" };
}

export function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.4 }}
      className="rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <h2 className="font-heading text-lg font-bold">Actividad Reciente</h2>

      {activities.length > 0 ? (
        <motion.div
          className="mt-5 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activities.map((r) => {
            const colors = matchColor(r.match_score);
            const date = new Date(r.created_at).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "short",
            });

            return (
              <motion.div
                key={r.id}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                {/* Match score circle */}
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  colors.bg, colors.text
                )}>
                  {r.match_score ? `${r.match_score}%` : "—"}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    Nueva respuesta en <span className="font-semibold">{r.solicitud_title}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{date}</p>
                </div>

                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Sin actividad reciente. Publica una solicitud o explora las existentes.
          </p>
        </div>
      )}
    </motion.div>
  );
}
