"use client";

import { motion } from "motion/react";
import { Plus, MessageSquare, Clock, Eye, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const urgencyStyles: Record<string, { bg: string; text: string; label: string }> = {
  baja: { bg: "bg-accent/10", text: "text-accent", label: "Baja" },
  normal: { bg: "bg-gold/15", text: "text-gold-foreground", label: "Normal" },
  alta: { bg: "bg-warning/15", text: "text-warning", label: "Alta" },
  urgente: { bg: "bg-urgent/15", text: "text-urgent", label: "Urgente" },
};

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-accent/10", text: "text-accent", label: "Activa" },
  paused: { bg: "bg-warning/15", text: "text-warning", label: "Pausada" },
  closed: { bg: "bg-secondary", text: "text-muted-foreground", label: "Cerrada" },
  expired: { bg: "bg-urgent/15", text: "text-urgent", label: "Expirada" },
};

export interface SolicitudPageItem {
  id: string;
  title: string;
  operation_type: string;
  urgency: string;
  zone: string;
  status: string;
  budget_min: number | null;
  budget_max: number;
  response_count: number;
  created_at: string;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export function SolicitudesPageClient({ solicitudes }: { solicitudes: SolicitudPageItem[] }) {
  return (
    <div>
      {/* Header */}
      <motion.div
        className="flex items-end justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <div>
          <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Gestión
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Mis Solicitudes
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            Gestiona las solicitudes que has publicado para tus clientes.
          </p>
        </div>
        <Link href="/solicitudes/nueva">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button className="h-12 gap-2 rounded-xl bg-gold-gradient px-8 text-base font-semibold text-white shadow-gold hover:opacity-90">
              <Plus className="h-5 w-5" />
              Nueva Solicitud
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* List */}
      {solicitudes.length > 0 ? (
        <motion.div
          className="mt-8 space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {solicitudes.map((s) => {
            const urgency = urgencyStyles[s.urgency] || urgencyStyles.normal;
            const status = statusStyles[s.status] || statusStyles.active;
            const date = new Date(s.created_at).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <motion.div key={s.id} variants={itemVariants}>
                <Link href={`/solicitudes/${s.id}`}>
                  <motion.div
                    whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                    className="group rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-gold-foreground transition-colors">
                          {s.title}
                        </h3>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium capitalize text-muted-foreground">
                            {s.operation_type}
                          </span>
                          <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground">
                            {s.zone}
                          </span>
                          <span className={cn("rounded-lg px-3 py-1 text-sm font-semibold capitalize", urgency.bg, urgency.text)}>
                            {urgency.label}
                          </span>
                          <span className={cn("rounded-lg px-3 py-1 text-sm font-semibold", status.bg, status.text)}>
                            {status.label}
                          </span>
                        </div>

                        {/* Meta info */}
                        <div className="mt-4 flex items-center gap-6">
                          <span className="font-heading text-base font-bold text-gold-foreground">
                            {s.budget_min ? formatCurrency(s.budget_min) + " – " : "Hasta "}
                            {formatCurrency(s.budget_max)}
                          </span>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            {s.response_count} respuestas
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {date}
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex shrink-0 items-center gap-2">
                        {s.response_count > 0 && (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold-foreground">
                            {s.response_count}
                          </div>
                        )}
                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          className="mt-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.2 }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
            <FileText className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="mt-4 text-lg text-muted-foreground">No tienes solicitudes aún.</p>
          <p className="mt-1 text-sm text-muted-foreground">Crea tu primera solicitud y empieza a recibir ofertas.</p>
          <Link href="/solicitudes/nueva">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mt-6">
              <Button className="h-12 gap-2 rounded-xl bg-gold-gradient px-8 text-base font-semibold text-white shadow-gold hover:opacity-90">
                <Plus className="h-5 w-5" />
                Crear tu primera solicitud
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
