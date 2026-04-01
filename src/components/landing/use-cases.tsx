"use client";

import { motion } from "motion/react";
import { Users, Building } from "lucide-react";
import {
  sectionVariants,
  staggerContainer,
  cardVariants,
  cardHover,
  viewportOnce,
} from "./motion-utils";

const bulletStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};

const bulletVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function UseCases() {
  return (
    <section className="relative py-24 md:py-36 bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold/[0.03] blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Casos de uso
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight">
            Dos lados, un mismo objetivo
          </h2>
        </motion.div>

        <motion.div
          className="mt-20 grid gap-8 md:grid-cols-2"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={cardHover}
              className="rounded-2xl bg-gradient-to-br from-amber-50/80 to-white p-10 shadow-card h-full"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10">
                <Users className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-8 font-heading text-xl font-semibold text-primary">
                &ldquo;Tengo un cliente buscando&rdquo;
              </h3>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Tu cliente quiere comprar o rentar pero no encuentras lo que
                necesita en tu inventario. Publica una solicitud y recibe ofertas
                relevantes.
              </p>
              <motion.div
                className="mt-8 space-y-3.5"
                variants={bulletStagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {["Define zona, presupuesto y características", "Recibe solo ofertas relevantes con match %", "Cierra más rápido, sin perder tiempo"].map((t) => (
                  <motion.div key={t} className="flex items-center gap-3" variants={bulletVariant}>
                    <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={cardHover}
              className="rounded-2xl bg-gradient-to-br from-teal-50/80 to-white p-10 shadow-card h-full"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success/10">
                <Building className="h-6 w-6 text-success" />
              </div>
              <h3 className="mt-8 font-heading text-xl font-semibold text-primary">
                &ldquo;Tengo propiedades disponibles&rdquo;
              </h3>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Tienes inventario pero no encuentras compradores o inquilinos.
                Explora solicitudes activas y responde con tus propiedades.
              </p>
              <motion.div
                className="mt-8 space-y-3.5"
                variants={bulletStagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {["Explora demanda real de otros brokers", "Responde con tu propiedad y ve el match %", "Mueve tu inventario más rápido"].map((t) => (
                  <motion.div key={t} className="flex items-center gap-3" variants={bulletVariant}>
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
