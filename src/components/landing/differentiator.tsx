"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import {
  sectionVariants,
  staggerContainer,
  cardVariants,
  viewportOnce,
} from "./motion-utils";

const comparison = [
  { feature: "Usuarios", portal: "Compradores directos + brokers", eb: "Solo brokers verificados" },
  { feature: "Contenido", portal: "Miles de listados públicos", eb: "Solicitudes de demanda real" },
  { feature: "Match", portal: "Búsqueda manual", eb: "Match % automático" },
  { feature: "Spam", portal: "Grupos saturados", eb: "Zero spam, solo relevante" },
  { feature: "Confianza", portal: "Sin verificación", eb: "Brokers verificados" },
  { feature: "Costo", portal: "Suscripción mensual fija", eb: "Gratis hasta el resultado" },
];

export function Differentiator() {
  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Diferenciador
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight">
            No somos un portal inmobiliario
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Mientras otros listan propiedades para el público general, nosotros
            conectamos oportunidades reales entre profesionales.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-2xl bg-white shadow-card-hover"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-3 bg-secondary/50">
            <div className="p-5" />
            <div className="p-5 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Portal tradicional
              </p>
            </div>
            <div className="bg-gold/8 p-5 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-foreground">
                entre-brokers
              </p>
            </div>
          </div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {comparison.map((row, i) => (
              <motion.div
                key={row.feature}
                variants={cardVariants}
                className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-secondary/25"}`}
              >
                <div className="p-5">
                  <p className="text-sm font-medium text-primary">{row.feature}</p>
                </div>
                <div className="flex items-center gap-2.5 p-5">
                  <X className="h-4 w-4 shrink-0 text-red-300" />
                  <p className="text-sm text-muted-foreground">{row.portal}</p>
                </div>
                <div className="flex items-center gap-2.5 bg-gold/[0.04] p-5">
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  <p className="text-sm text-primary">{row.eb}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
