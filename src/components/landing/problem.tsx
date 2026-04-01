"use client";

import { motion } from "motion/react";
import { MessageSquare, Ban, Clock, ShieldAlert } from "lucide-react";
import {
  staggerContainer,
  cardVariants,
  slideFromLeft,
  slideFromRight,
  viewportOnce,
} from "./motion-utils";

const problems = [
  { icon: MessageSquare, text: "Grupos de WhatsApp saturados de spam" },
  { icon: Ban, text: "Propiedades que no cumplen los requisitos" },
  { icon: Clock, text: "Horas perdidas filtrando información basura" },
  { icon: ShieldAlert, text: "Sin forma de saber si el broker es confiable" },
];

export function Problem() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Atmospheric blob */}
      <div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-urgent">
              El problema
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
              ¿Sigues cerrando tratos por WhatsApp?
            </h2>
            <p className="mt-4 text-muted-foreground">
              El mercado inmobiliario entre brokers opera con herramientas del
              2010. Grupos saturados, información desorganizada y cero
              trazabilidad.
            </p>

            <motion.div
              className="mt-8 space-y-4"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {problems.map((p) => (
                <motion.div key={p.text} className="flex items-start gap-3" variants={cardVariants}>
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50">
                    <p.icon className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-base text-muted-foreground">{p.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Comparison */}
          <motion.div
            className="space-y-4"
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="rounded-2xl bg-red-50/50 p-5 shadow-card">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-400">
                Así se ve hoy
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="rounded-lg bg-white p-2.5 shadow-sm">
                  Tengo depa en Polanco 2rec $2.8M interesados???
                </p>
                <p className="rounded-lg bg-white p-2.5 shadow-sm">
                  Alguien tiene terreno en Querétaro? 500m2 max 3M urgeeee
                </p>
                <p className="rounded-lg bg-white p-2.5 shadow-sm">
                  VENDO casa en Naucalpan excelente precio!!!
                </p>
                <p className="rounded-lg bg-white p-2.5 shadow-sm">
                  Buenos días grupo, alguien sabe de oficinas en Santa Fe?
                </p>
                <p className="rounded-lg bg-white p-2.5 shadow-sm opacity-50">
                  +47 mensajes sin leer...
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-teal-50/50 p-5 shadow-card">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-success">
                Así se ve con entre-brokers
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-white p-2.5 shadow-sm">
                  <span className="text-primary">Depa Polanco 2-3 rec · $2M-$3.5M</span>
                  <span className="font-bold text-success">92% match</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white p-2.5 shadow-sm">
                  <span className="text-primary">Oficina Santa Fe 200m² · $8M-$12M</span>
                  <span className="font-bold text-success">85% match</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white p-2.5 shadow-sm opacity-40">
                  <span>Casa Naucalpan · fuera de rango</span>
                  <span className="text-muted-foreground">12% match</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
