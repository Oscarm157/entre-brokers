"use client";

import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { featureOptions, type SolicitudForm } from "../use-solicitud-form";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
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
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="font-heading text-xl font-bold text-foreground">
          Características
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Especifica tamaño, espacios y amenidades deseadas
        </p>
      </motion.div>

      {/* Tamaño y espacios */}
      <motion.div variants={itemVariants}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="min-m2">m² mínimo</Label>
            <Input id="min-m2" type="number" placeholder="0" value={form.minM2} onChange={(e) => form.setMinM2(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-m2">m² máximo</Label>
            <Input id="max-m2" type="number" placeholder="0" value={form.maxM2} onChange={(e) => form.setMaxM2(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Recámaras</Label>
            <Input id="bedrooms" type="number" placeholder="0" value={form.bedrooms} onChange={(e) => form.setBedrooms(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Baños</Label>
            <Input id="bathrooms" type="number" placeholder="0" value={form.bathrooms} onChange={(e) => form.setBathrooms(e.target.value)} />
          </div>
        </div>
      </motion.div>

      {/* Amenidades como chips */}
      <motion.div variants={itemVariants} className="space-y-3">
        <Label>Amenidades deseadas</Label>
        <div className="flex flex-wrap gap-2.5">
          {featureOptions.map((feature) => {
            const isActive = form.features.includes(feature);
            return (
              <motion.button
                key={feature}
                type="button"
                layout
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium cursor-pointer transition-colors",
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-white text-muted-foreground hover:border-accent/40"
                )}
                onClick={() => form.toggleFeature(feature)}
              >
                {feature}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
