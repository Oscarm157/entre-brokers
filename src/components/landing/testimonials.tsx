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
    color: "bg-amber-100 text-amber-700",
    accent: "bg-amber-400",
  },
  {
    name: "Roberto Mendoza",
    role: "RE/MAX Guadalajara",
    initials: "RM",
    quote: "Por fin una plataforma pensada para profesionales. Sin compradores directos preguntando tonterías. Solo brokers serios.",
    stars: 5,
    color: "bg-teal-100 text-teal-700",
    accent: "bg-teal-400",
  },
  {
    name: "Ana Lucía Torres",
    role: "Broker Independiente CDMX",
    initials: "AT",
    quote: "El match automático es brutal. Solo recibo propuestas que realmente cumplen lo que mi cliente busca. Ahorré horas.",
    stars: 5,
    color: "bg-indigo-100 text-indigo-700",
    accent: "bg-indigo-400",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-white via-amber-50/20 to-white">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-foreground">
            Testimonios
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            Brokers que ya conectan diferente
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3 items-start"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className={i === 1 ? "md:-translate-y-3" : ""}
            >
              <motion.div
                whileHover={cardHover}
                className="relative rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover overflow-hidden"
              >
                {/* Accent bar */}
                <motion.div
                  className={`absolute top-0 left-0 h-[3px] ${t.accent} rounded-full`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "60%" }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                />

                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Decorative quote mark */}
                <span className="mt-3 block font-heading text-5xl leading-none text-gold/20 select-none">
                  &ldquo;
                </span>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t.quote}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`text-xs font-semibold ${t.color}`}>
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-primary">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
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
