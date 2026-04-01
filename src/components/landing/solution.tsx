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

const featured = {
  icon: Brain,
  title: "Match inteligente",
  description: "Nuestro algoritmo calcula compatibilidad automática entre solicitud y oferta. Solo ves lo que realmente importa — sin ruido, sin pérdida de tiempo.",
  accent: "bg-gold/10 text-gold",
};

const cards = [
  {
    icon: ShieldCheck,
    title: "Solo brokers verificados",
    description: "Cada broker pasa por verificación. Sin compradores directos, sin curiosos, sin spam.",
    accent: "bg-success/10 text-success",
  },
  {
    icon: FileSearch,
    title: "Solicitudes, no listados",
    description: "Aquí se publica lo que el cliente busca, no un catálogo infinito de propiedades sin contexto.",
    accent: "bg-[#6366f1]/10 text-[#6366f1]",
  },
  {
    icon: Coins,
    title: "Paga solo por resultados",
    description: "Publicar y responder es gratis. Solo pagas cuando quieres desbloquear el contacto de un match real.",
    accent: "bg-gold/10 text-gold",
  },
];

export function Solution() {
  return (
    <section id="solucion" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-success/[0.03] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            La solución
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight">
            Tu red privada de oportunidades
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Una plataforma diseñada exclusivamente para que brokers profesionales
            conecten demanda real con oferta relevante.
          </p>
        </motion.div>

        <motion.div
          className="mt-20 space-y-8"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Featured card — full width bento */}
          <motion.div variants={cardVariants}>
            <motion.div
              whileHover={cardHover}
              className="rounded-2xl bg-white p-10 shadow-card transition-shadow hover:shadow-card-hover sm:flex sm:items-center sm:gap-10"
            >
              <div className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${featured.accent}`}>
                <featured.icon className="h-7 w-7" />
              </div>
              <div className="mt-6 sm:mt-0">
                <h3 className="font-heading text-xl font-semibold text-primary">
                  {featured.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground max-w-xl">
                  {featured.description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* 3 cards in a row */}
          <div className="grid gap-8 sm:grid-cols-3">
            {cards.map((card) => (
              <motion.div key={card.title} variants={cardVariants}>
                <motion.div
                  whileHover={cardHover}
                  className="rounded-2xl bg-white p-10 shadow-card transition-shadow hover:shadow-card-hover h-full"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${card.accent}`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-semibold text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
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
