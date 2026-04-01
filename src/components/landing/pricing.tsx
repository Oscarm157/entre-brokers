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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28 },
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
    <section id="precios" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-foreground">
            Transparencia total
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            Solo pagas cuando encuentras lo que buscas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sin suscripciones obligatorias. Sin cargos ocultos.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-lg">
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            whileHover={cardHover}
            className="rounded-2xl bg-white overflow-hidden shadow-card-hover"
          >
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-5 text-center">
              <p className="font-heading text-lg font-semibold text-gold-foreground">
                Modelo transparente
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Usa la plataforma gratis, paga por resultados</p>
            </div>
            <motion.div
              className="p-8 space-y-3"
              variants={itemStagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {items.map((item) => (
                <motion.div
                  key={item.action}
                  variants={itemFade}
                  className={`flex items-center justify-between rounded-xl p-3.5 ${
                    item.highlight
                      ? "bg-gradient-to-r from-amber-50 to-orange-50"
                      : "bg-secondary/50"
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
            <div className="bg-secondary/30 px-8 py-4 text-center">
              <p className="text-xs text-muted-foreground">
                Próximamente planes Pro y Enterprise con desbloqueos incluidos
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
