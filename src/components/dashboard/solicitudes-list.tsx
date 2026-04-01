"use client";

import { motion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const urgencyStyles: Record<string, { bg: string; text: string }> = {
  baja: { bg: "bg-accent/10", text: "text-accent" },
  normal: { bg: "bg-gold/15", text: "text-gold-foreground" },
  alta: { bg: "bg-warning/15", text: "text-warning" },
  urgente: { bg: "bg-urgent/15", text: "text-urgent" },
};

export interface SolicitudItem {
  id: string;
  title: string;
  zone: string;
  urgency: string;
  response_count: number;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function SolicitudesList({ solicitudes }: { solicitudes: SolicitudItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.3 }}
      className="rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold">Mis Solicitudes Activas</h2>
        </div>
        <Link href="/solicitudes">
          <Button variant="ghost" size="sm" className="gap-1 text-xs text-gold-foreground hover:text-gold-foreground">
            Ver todas <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      {solicitudes.length > 0 ? (
        <motion.div
          className="mt-5 space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {solicitudes.map((s) => {
            const urgency = urgencyStyles[s.urgency] || urgencyStyles.normal;
            return (
              <motion.div key={s.id} variants={itemVariants}>
                <Link href={`/solicitudes/${s.id}`}>
                  <motion.div
                    whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                    className="group flex items-center justify-between rounded-xl bg-secondary/40 p-4 transition-colors hover:bg-secondary/70"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground group-hover:text-gold-foreground transition-colors">
                        {s.title}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-lg bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          {s.zone}
                        </span>
                        <span className={cn(
                          "rounded-lg px-2.5 py-0.5 text-xs font-semibold capitalize",
                          urgency.bg, urgency.text
                        )}>
                          {s.urgency}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {s.response_count} respuestas
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="py-10 text-center">
          <p className="text-sm text-muted-foreground">No tienes solicitudes activas aún.</p>
          <Link href="/solicitudes/nueva">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Button className="mt-4 h-11 gap-2 rounded-xl bg-gold-gradient px-8 text-sm font-semibold text-white shadow-gold hover:opacity-90">
                <Plus className="h-4 w-4" />
                Crear tu primera solicitud
              </Button>
            </motion.div>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
