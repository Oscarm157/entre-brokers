"use client";

import { motion } from "motion/react";
import { FileText, Target, Handshake, ChevronRight } from "lucide-react";
import {
  sectionVariants,
  staggerContainer,
  cardVariants,
  cardHover,
  viewportOnce,
} from "./motion-utils";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Publica tu solicitud",
    description:
      "Tu cliente busca un depa en Polanco de 2M-3M? Publícalo en 30 segundos. Define zona, presupuesto, tipo y características.",
    color: "bg-amber-50 text-amber-600",
    accent: "bg-amber-50",
  },
  {
    icon: Target,
    number: "02",
    title: "Recibe ofertas reales",
    description:
      "Brokers con inventario relevante te envían propiedades con match % automático. Solo ves lo que realmente cumple.",
    color: "bg-teal-50 text-teal-600",
    accent: "bg-teal-50",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Cierra el trato",
    description:
      "Desbloquea el contacto del broker y negocia directo. Sin intermediarios, sin complicaciones.",
    color: "bg-indigo-50 text-indigo-600",
    accent: "bg-indigo-50",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-success">
            Simple y directo
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tres pasos para conectar con el broker correcto
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} className="relative" variants={cardVariants}>
              <motion.div
                whileHover={cardHover}
                className="rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.color}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-3xl font-bold text-border">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <motion.div
                  className="absolute top-1/2 -right-3 hidden -translate-y-1/2 md:block"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.4 + i * 0.15 }}
                >
                  <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
