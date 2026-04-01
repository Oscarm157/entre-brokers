"use client";

import { motion } from "motion/react";
import { MapPin, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zones, type SolicitudForm } from "../use-solicitud-form";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

interface StepDondePrecioProps {
  form: SolicitudForm;
}

export function StepDondePrecio({ form }: StepDondePrecioProps) {
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
          ¿Dónde y a qué precio?
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Define la zona y el rango de presupuesto
        </p>
      </motion.div>

      {/* Zona */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
              <MapPin className="size-5 text-gold-foreground" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ubicación</span>
            </div>
          </div>
          <Select value={form.zone} onValueChange={(v) => form.setZone(v ?? "")}>
            <SelectTrigger className="h-12 rounded-xl bg-secondary/50 text-base">
              <SelectValue placeholder="Seleccionar zona" />
            </SelectTrigger>
            <SelectContent>
              {zones.map((z) => (
                <SelectItem key={z} value={z}>{z}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Presupuesto */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
              <DollarSign className="size-5 text-gold-foreground" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Presupuesto (MXN)</span>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget-min" className="text-sm text-muted-foreground">Mínimo</Label>
              <Input
                id="budget-min"
                type="number"
                placeholder="$0"
                className="h-12 rounded-xl bg-secondary/50 text-base"
                value={form.budgetMin}
                onChange={(e) => form.setBudgetMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget-max" className="text-sm text-muted-foreground">Máximo *</Label>
              <Input
                id="budget-max"
                type="number"
                placeholder="$0"
                className="h-12 rounded-xl bg-secondary/50 text-base"
                value={form.budgetMax}
                onChange={(e) => form.setBudgetMax(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
