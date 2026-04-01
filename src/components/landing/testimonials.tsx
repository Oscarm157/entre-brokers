"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import {
  sectionVariants,
  staggerContainer,
  cardVariants,
  cardHover,
  viewportOnce,
} from "./motion-utils";

const testimonials = [
  {
    name: "María González",
    role: "Century 21 Polanco",
    initials: "MG",
    quote: "Cerré 3 operaciones en mi primer mes. Lo que antes tardaba semanas por WhatsApp, aquí lo resolví en días.",
    stars: 5,
    avatarBg: "bg-gold/15 text-gold-foreground",
    accent: "bg-gold",
  },
  {
    name: "Roberto Mendoza",
    role: "RE/MAX Guadalajara",
    initials: "RM",
    quote: "Por fin una plataforma pensada para profesionales. Sin compradores directos preguntando tonterías. Solo brokers serios.",
    stars: 5,
    avatarBg: "bg-success/15 text-success",
    accent: "bg-success",
  },
  {
    name: "Ana Lucía Torres",
    role: "Broker Independiente CDMX",
    initials: "AT",
    quote: "El match automático es brutal. Solo recibo propuestas que realmente cumplen lo que mi cliente busca. Ahorré horas.",
    stars: 5,
    avatarBg: "bg-[#6366f1]/15 text-[#6366f1]",
    accent: "bg-[#6366f1]",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Testimonios
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight">
            Brokers que ya conectan diferente
          </h2>
        </motion.div>

        <motion.div
          className="mt-20 grid gap-8 md:grid-cols-3 items-start"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className={i === 1 ? "md:-translate-y-4" : ""}
            >
              <motion.div
                whileHover={cardHover}
                className="relative rounded-2xl bg-white p-10 shadow-card transition-shadow hover:shadow-card-hover overflow-hidden"
              >
                {/* Accent bar */}
                <motion.div
                  className={`absolute top-0 left-0 h-[3px] ${t.accent}`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "50%" }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                />

                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Decorative quote */}
                <span className="mt-4 block font-heading text-6xl leading-none text-gold/15 select-none">
                  &ldquo;
                </span>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {t.quote}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className={`text-xs font-semibold ${t.avatarBg}`}>
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-primary">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
