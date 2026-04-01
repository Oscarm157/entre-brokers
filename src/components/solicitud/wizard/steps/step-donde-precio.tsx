"use client";

import { motion } from "motion/react";
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
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
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
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="font-heading text-xl font-bold text-foreground">
          ¿Dónde y a qué precio?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Define la zona y el rango de presupuesto
        </p>
      </motion.div>

      {/* Zona */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label>Zona *</Label>
        <Select value={form.zone} onValueChange={(v) => form.setZone(v ?? "")}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar zona" />
          </SelectTrigger>
          <SelectContent>
            {zones.map((z) => (
              <SelectItem key={z} value={z}>{z}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Presupuesto */}
      <motion.div variants={itemVariants} className="space-y-3">
        <Label>Presupuesto (MXN)</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget-min" className="text-xs text-muted-foreground">Mínimo</Label>
            <Input
              id="budget-min"
              type="number"
              placeholder="$0"
              value={form.budgetMin}
              onChange={(e) => form.setBudgetMin(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget-max" className="text-xs text-muted-foreground">Máximo *</Label>
            <Input
              id="budget-max"
              type="number"
              placeholder="$0"
              value={form.budgetMax}
              onChange={(e) => form.setBudgetMax(e.target.value)}
              required
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
