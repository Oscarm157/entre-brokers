"use client";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SolicitudForm } from "../use-solicitud-form";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

interface StepDetallesProps {
  form: SolicitudForm;
}

export function StepDetalles({ form }: StepDetallesProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="font-heading text-xl font-bold text-foreground">
          Últimos detalles
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Dale un título a tu solicitud y cuéntanos más
        </p>
      </motion.div>

      {/* Título */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="title">Título de la solicitud *</Label>
        <Input
          id="title"
          placeholder='Ej: "Departamento en Polanco, 2-3 recámaras"'
          value={form.title}
          onChange={(e) => form.setTitle(e.target.value)}
          required
        />
      </motion.div>

      {/* Descripción */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="description">Descripción adicional</Label>
        <Textarea
          id="description"
          placeholder="Agrega cualquier detalle adicional..."
          rows={4}
          value={form.description}
          onChange={(e) => form.setDescription(e.target.value)}
        />
      </motion.div>

      {/* Urgencia */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label>Urgencia</Label>
        <Select value={form.urgency} onValueChange={(v) => form.setUrgency(v ?? "normal")}>
          <SelectTrigger className="w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="baja">Baja — Sin prisa</SelectItem>
            <SelectItem value="normal">Normal — Tiempo estándar</SelectItem>
            <SelectItem value="alta">Alta — Necesito pronto</SelectItem>
            <SelectItem value="urgente">Urgente — Lo antes posible</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
    </motion.div>
  );
}
