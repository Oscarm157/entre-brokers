"use client";

import { motion } from "motion/react";
import { Clock, Zap, AlertTriangle, Coffee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { SolicitudForm } from "../use-solicitud-form";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const urgencyOptions = [
  { value: "baja", label: "Sin prisa", icon: Coffee, color: "text-muted-foreground", activeBg: "bg-secondary", activeText: "text-foreground" },
  { value: "normal", label: "Normal", icon: Clock, color: "text-muted-foreground", activeBg: "bg-gold/15", activeText: "text-gold-foreground" },
  { value: "alta", label: "Pronto", icon: Zap, color: "text-muted-foreground", activeBg: "bg-warning/15", activeText: "text-warning" },
  { value: "urgente", label: "Urgente", icon: AlertTriangle, color: "text-muted-foreground", activeBg: "bg-urgent/15", activeText: "text-urgent" },
];

interface StepDetallesProps {
  form: SolicitudForm;
}

export function StepDetalles({ form }: StepDetallesProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Últimos detalles
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Dale un título a tu solicitud y cuéntanos más
        </p>
      </motion.div>

      {/* Título */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <Label htmlFor="title" className="text-sm font-medium">Título de la solicitud *</Label>
          <Input
            id="title"
            placeholder='Ej: "Departamento en Polanco, 2-3 recámaras"'
            className="mt-2 h-12 rounded-xl bg-secondary/50 text-base"
            value={form.title}
            onChange={(e) => form.setTitle(e.target.value)}
            required
          />
        </div>
      </motion.div>

      {/* Descripción */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <Label htmlFor="description" className="text-sm font-medium">Descripción adicional</Label>
          <Textarea
            id="description"
            placeholder="Agrega cualquier detalle adicional que ayude a otros brokers..."
            rows={4}
            className="mt-2 rounded-xl bg-secondary/50 text-base"
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Urgencia como cards seleccionables */}
      <motion.div variants={itemVariants} className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Urgencia
        </span>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {urgencyOptions.map((opt) => {
            const isActive = form.urgency === opt.value;
            return (
              <motion.button
                key={opt.value}
                type="button"
                whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl px-4 py-5 cursor-pointer transition-all duration-300",
                  isActive
                    ? cn(opt.activeBg, opt.activeText, "shadow-[0_4px_14px_rgba(0,0,0,0.08)]")
                    : "bg-white/80 text-muted-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
                )}
                onClick={() => form.setUrgency(opt.value)}
              >
                <opt.icon className={cn("size-5", isActive ? opt.activeText : opt.color)} />
                <span className="text-sm font-semibold">{opt.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Mini resumen */}
      {(form.operationType || form.propertyType || form.zone) && (
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-primary/5 px-6 py-4"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Resumen
          </span>
          <p className="mt-1 font-heading text-sm font-medium text-foreground">
            {[
              form.operationType === "compra" ? "Compra" : form.operationType === "renta" ? "Renta" : "",
              form.propertyType,
              form.zone,
              form.budgetMax ? `hasta $${Number(form.budgetMax).toLocaleString()} MXN` : "",
            ].filter(Boolean).join(" · ")}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
