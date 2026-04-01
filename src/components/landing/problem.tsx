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
    <section className="relative py-24 md:py-36 bg-white overflow-hidden">
      <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-gold/[0.04] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-urgent">
              El problema
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight">
              ¿Sigues cerrando tratos por WhatsApp?
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              El mercado inmobiliario entre brokers opera con herramientas del
              2010. Grupos saturados, información desorganizada y cero
              trazabilidad.
            </p>

            <motion.div
              className="mt-10 space-y-5"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {problems.map((p) => (
                <motion.div key={p.text} className="flex items-center gap-4" variants={cardVariants}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <p.icon className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="text-base text-foreground/80">{p.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-5"
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="rounded-2xl bg-red-50/60 p-6 shadow-card">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-red-400">
                Así se ve hoy
              </p>
              <div className="space-y-2.5">
                {[
                  "Tengo depa en Polanco 2rec $2.8M interesados???",
                  "Alguien tiene terreno en Querétaro? 500m2 max 3M urgeeee",
                  "VENDO casa en Naucalpan excelente precio!!!",
                  "Buenos días grupo, alguien sabe de oficinas en Santa Fe?",
                ].map((msg) => (
                  <p key={msg} className="rounded-xl bg-white p-3 text-sm text-muted-foreground shadow-sm">
                    {msg}
                  </p>
                ))}
                <p className="rounded-xl bg-white p-3 text-sm text-muted-foreground/50 shadow-sm">
                  +47 mensajes sin leer...
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-teal-50/60 p-6 shadow-card">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-success">
                Así se ve con entre-brokers
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                  <span className="text-sm text-primary font-medium">Depa Polanco 2-3 rec · $2M–$3.5M</span>
                  <span className="font-heading text-sm font-bold text-success">92%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                  <span className="text-sm text-primary font-medium">Oficina Santa Fe 200m² · $8M–$12M</span>
                  <span className="font-heading text-sm font-bold text-success">85%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm opacity-40">
                  <span className="text-sm">Casa Naucalpan · fuera de rango</span>
                  <span className="font-heading text-sm text-muted-foreground">12%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
