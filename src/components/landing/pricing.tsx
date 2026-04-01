"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { sectionVariants, cardHover, viewportOnce } from "./motion-utils";

const items = [
  { action: "Publicar solicitudes", price: "Gratis", highlight: false },
  { action: "Responder solicitudes", price: "Gratis", highlight: false },
  { action: "Ver match %", price: "Gratis", highlight: false },
  { action: "Recibir notificaciones", price: "Gratis", highlight: false },
  { action: "Desbloquear contacto", price: "Desde $99 MXN", highlight: true },
];

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 24 },
  },
};

const itemStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function Pricing() {
  return (
    <section id="precios" className="relative py-24 md:py-36 bg-white overflow-hidden">
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#6366f1]/[0.03] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Transparencia total
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight">
            Solo pagas cuando encuentras lo que buscas
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Sin suscripciones obligatorias. Sin cargos ocultos.
          </p>
        </motion.div>

        <div className="mx-auto mt-20 max-w-lg">
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            whileHover={cardHover}
            className="rounded-2xl bg-white overflow-hidden shadow-card-hover"
          >
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 px-10 py-6 text-center">
              <p className="font-heading text-xl font-semibold text-gold-foreground">
                Modelo transparente
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Usa la plataforma gratis, paga por resultados</p>
            </div>
            <motion.div
              className="p-10 space-y-3.5"
              variants={itemStagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {items.map((item) => (
                <motion.div
                  key={item.action}
                  variants={itemFade}
                  className={`flex items-center justify-between rounded-xl p-4 ${
                    item.highlight
                      ? "bg-gradient-to-r from-gold/10 to-gold/5"
                      : "bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm text-primary">{item.action}</span>
                  </div>
                  <span className={`text-sm font-semibold ${item.highlight ? "text-gold-foreground" : "text-success"}`}>
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            <div className="bg-secondary/30 px-10 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                Próximamente planes Pro y Enterprise con desbloqueos incluidos
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
