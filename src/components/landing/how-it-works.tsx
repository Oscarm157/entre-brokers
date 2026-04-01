"use client";

import { motion } from "motion/react";
import { FileText, Target, Handshake } from "lucide-react";
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
      "Tu cliente busca un depa en Polanco de 2M–3M? Publícalo en 30 segundos. Define zona, presupuesto, tipo y características.",
    accent: "bg-gold/10 text-gold",
  },
  {
    icon: Target,
    number: "02",
    title: "Recibe ofertas reales",
    description:
      "Brokers con inventario relevante te envían propiedades con match % automático. Solo ves lo que realmente cumple.",
    accent: "bg-success/10 text-success",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Cierra el trato",
    description:
      "Desbloquea el contacto del broker y negocia directo. Sin intermediarios, sin complicaciones.",
    accent: "bg-[#6366f1]/10 text-[#6366f1]",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Simple y directo
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight">
            Cómo funciona
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Tres pasos para conectar con el broker correcto
          </p>
        </motion.div>

        <motion.div
          className="mt-20 grid gap-8 md:grid-cols-3"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={cardVariants}>
              <motion.div
                whileHover={cardHover}
                className="relative rounded-2xl bg-white p-10 shadow-card transition-shadow hover:shadow-card-hover h-full"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${step.accent}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="font-heading text-5xl font-bold text-muted/60 select-none">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-8 font-heading text-xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
