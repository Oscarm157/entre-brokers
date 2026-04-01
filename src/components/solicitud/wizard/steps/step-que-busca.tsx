"use client";

import { motion } from "motion/react";
import { Home, Building2, TreePine, Store, Briefcase, ShoppingBag, Key } from "lucide-react";
import { SelectableCard } from "../selectable-card";
import type { SolicitudForm } from "../use-solicitud-form";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const operationTypes = [
  { value: "compra", label: "Compra", icon: ShoppingBag },
  { value: "renta", label: "Renta", icon: Key },
];

const propertyTypes = [
  { value: "casa", label: "Casa", icon: Home },
  { value: "departamento", label: "Departamento", icon: Building2 },
  { value: "terreno", label: "Terreno", icon: TreePine },
  { value: "local", label: "Local comercial", icon: Store },
  { value: "oficina", label: "Oficina", icon: Briefcase },
];

interface StepQueBuscaProps {
  form: SolicitudForm;
}

export function StepQueBusca({ form }: StepQueBuscaProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="font-heading text-xl font-bold text-foreground">
          ¿Qué busca tu cliente?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecciona el tipo de operación y propiedad
        </p>
      </motion.div>

      {/* Tipo de operación */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="text-sm font-medium text-foreground">Tipo de operación</label>
        <div className="grid grid-cols-2 gap-4">
          {operationTypes.map((op) => (
            <SelectableCard
              key={op.value}
              icon={op.icon}
              label={op.label}
              value={op.value}
              selected={form.operationType === op.value}
              onSelect={form.setOperationType}
            />
          ))}
        </div>
      </motion.div>

      {/* Tipo de propiedad */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="text-sm font-medium text-foreground">Tipo de propiedad</label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {propertyTypes.map((pt) => (
            <SelectableCard
              key={pt.value}
              icon={pt.icon}
              label={pt.label}
              value={pt.value}
              selected={form.propertyType === pt.value}
              onSelect={form.setPropertyType}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
