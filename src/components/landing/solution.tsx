"use client";

import { motion } from "motion/react";
import { Brain, ShieldCheck, FileSearch, Coins } from "lucide-react";
import {
  sectionVariants,
  staggerContainer,
  cardVariants,
  cardHover,
  viewportOnce,
} from "./motion-utils";

const cards = [
  {
    icon: Brain,
    title: "Match inteligente",
    description: "Algoritmo que calcula compatibilidad automática entre solicitud y oferta. Solo ves lo relevante.",
    color: "bg-amber-50 text-amber-600",
    featured: true,
  },
  {
    icon: ShieldCheck,
    title: "Solo brokers verificados",
    description: "Cada broker pasa por verificación. Sin compradores directos, sin curiosos, sin spam.",
    color: "bg-teal-50 text-teal-600",
    featured: false,
  },
  {
    icon: FileSearch,
    title: "Solicitudes, no listados",
    description: "Aquí se publica lo que el cliente busca, no un catálogo infinito de propiedades sin contexto.",
    color: "bg-indigo-50 text-indigo-600",
    featured: false,
  },
  {
    icon: Coins,
    title: "Paga solo por resultados",
    description: "Publicar y responder es gratis. Solo pagas cuando quieres desbloquear el contacto de un match real.",
    color: "bg-purple-50 text-purple-600",
    featured: false,
  },
];

export function Solution() {
  return (
    <section id="solucion" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-sm opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-success">
            La solución
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            Tu red privada de oportunidades
          </h2>
          <p className="mt-4 text-muted-foreground">
            Una plataforma diseñada exclusivamente para que brokers profesionales
            conecten demanda real con oferta relevante.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 space-y-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Featured card — bento hero */}
          {(() => {
            const FeaturedIcon = cards[0].icon;
            return (
              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={cardHover}
                  className="rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover sm:flex sm:items-center sm:gap-8"
                >
                  <div className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${cards[0].color}`}>
                    <FeaturedIcon className="h-7 w-7" />
                  </div>
                  <div className="mt-5 sm:mt-0">
                    <h3 className="font-heading text-xl font-semibold text-primary">
                      {cards[0].title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {cards[0].description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}

          {/* Remaining 3 cards in a row */}
          <div className="grid gap-6 sm:grid-cols-3">
            {cards.slice(1).map((card) => (
              <motion.div key={card.title} variants={cardVariants}>
                <motion.div
                  whileHover={cardHover}
                  className="rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover h-full"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
