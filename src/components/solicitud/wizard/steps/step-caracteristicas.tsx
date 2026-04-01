"use client";

import { motion } from "motion/react";
import { Ruler, BedDouble, Bath } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { featureOptions, type SolicitudForm } from "../use-solicitud-form";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

interface StepCaracteristicasProps {
  form: SolicitudForm;
}

export function StepCaracteristicas({ form }: StepCaracteristicasProps) {
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
          Características
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Especifica tamaño, espacios y amenidades deseadas
        </p>
      </motion.div>

      {/* Tamaño y espacios — icon-labeled inputs */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "min-m2", label: "m² mínimo", icon: Ruler, value: form.minM2, onChange: form.setMinM2 },
            { id: "max-m2", label: "m² máximo", icon: Ruler, value: form.maxM2, onChange: form.setMaxM2 },
            { id: "bedrooms", label: "Recámaras", icon: BedDouble, value: form.bedrooms, onChange: form.setBedrooms },
            { id: "bathrooms", label: "Baños", icon: Bath, value: form.bathrooms, onChange: form.setBathrooms },
          ].map((field) => (
            <div
              key={field.id}
              className="rounded-2xl bg-white/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <field.icon className="size-4 text-muted-foreground" />
              </div>
              <Label htmlFor={field.id} className="text-sm text-muted-foreground">{field.label}</Label>
              <Input
                id={field.id}
                type="number"
                placeholder="0"
                className="mt-1.5 h-11 rounded-xl border-0 bg-secondary/50 text-lg font-semibold"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Amenidades como chips premium */}
      <motion.div variants={itemVariants} className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Amenidades deseadas
        </span>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featureOptions.map((feature) => {
            const isActive = form.features.includes(feature);
            return (
              <motion.button
                key={feature}
                type="button"
                variants={chipVariants}
                whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium cursor-pointer transition-all duration-300",
                  isActive
                    ? "bg-accent text-white shadow-[0_4px_14px_rgba(12,148,136,0.25)]"
                    : "bg-white/80 text-muted-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:text-accent hover:shadow-[0_4px_14px_rgba(12,148,136,0.1)]"
                )}
                onClick={() => form.toggleFeature(feature)}
              >
                {feature}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
