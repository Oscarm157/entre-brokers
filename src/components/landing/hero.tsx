"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import {
  staggerContainer,
  cardVariants,
  cardHover,
  buttonHover,
  buttonTap,
  viewportOnce,
} from "./motion-utils";

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28 },
  },
};

const fadeDown = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28 },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28, delay: 0.4 },
  },
};

function MatchRing({ score }: { score: number }) {
  const cls = score >= 90 ? "match-gold match-pulse" : score >= 70 ? "match-teal" : "match-blue";
  const textCls = score >= 90 ? "text-[#7d5800]" : score >= 70 ? "text-success" : "text-[#6366f1]";
  return (
    <div className={`match-ring h-11 w-11 ${cls}`}>
      <span className={`font-heading text-sm font-bold ${textCls}`}>{score}%</span>
      {score >= 90 && <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-gold sparkle" />}
    </div>
  );
}

function DashboardMock() {
  const solicitudes = [
    { title: "Depa Polanco 2-3 rec", zone: "Polanco", match: 92, urgency: "Alta", budget: "$2M - $3.5M" },
    { title: "Casa Coyoacán con jardín", zone: "Coyoacán", match: 85, urgency: "Normal", budget: "$4M - $6M" },
    { title: "Oficina Santa Fe 200m²", zone: "Santa Fe", match: 71, urgency: "Urgente", budget: "$8M - $12M" },
  ];

  const urgencyStyle: Record<string, string> = {
    Alta: "bg-amber-100 text-amber-700",
    Normal: "bg-teal-50 text-success",
    Urgente: "bg-red-50 text-red-600",
  };

  return (
    <motion.div
      variants={scaleUp}
      className="relative mx-auto w-full max-w-2xl rounded-2xl bg-white p-5 shadow-card-hover"
    >
      <div className="mb-4 flex items-center gap-2 bg-secondary/60 -mx-5 -mt-5 px-5 py-3 rounded-t-2xl">
        <div className="h-3 w-3 rounded-full bg-red-300" />
        <div className="h-3 w-3 rounded-full bg-amber-300" />
        <div className="h-3 w-3 rounded-full bg-green-300" />
        <span className="ml-2 font-mono text-xs text-muted-foreground tracking-wider uppercase">entre-brokers — Dashboard</span>
      </div>
      <motion.div
        className="space-y-2.5"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {solicitudes.map((s) => (
          <motion.div
            key={s.title}
            variants={cardVariants}
            whileHover={cardHover}
            className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3 transition-colors"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary">{s.title}</p>
              <div className="mt-1.5 flex gap-2">
                <Badge variant="outline" className="text-xs font-medium">{s.zone}</Badge>
                <Badge className={`text-xs border-0 ${urgencyStyle[s.urgency]}`}>
                  {s.urgency}
                </Badge>
                <span className="text-xs text-muted-foreground">{s.budget}</span>
              </div>
            </div>
            <MatchRing score={s.match} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Soft background accents */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[150px]" />
      <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-success/8 blur-[120px]" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeDown}>
            <Badge className="mb-6 border-gold/30 bg-gold/10 text-gold-foreground font-mono text-xs tracking-widest uppercase shadow-sm">
              <ShieldCheck className="mr-1.5 h-3 w-3" />
              Solo brokers verificados
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl"
          >
            No listamos propiedades.{" "}
            <span className="text-gradient-animated">
              Conectamos oportunidades reales
            </span>{" "}
            entre brokers.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed"
          >
            La red privada donde brokers profesionales publican lo que sus
            clientes buscan y otros responden con propiedades reales. Sin spam.
            Sin intermediarios. Solo negocios.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link href="/registro">
                <Button
                  size="lg"
                  className="bg-gold-gradient text-white hover:opacity-90 font-semibold text-base px-8 shadow-gold"
                >
                  Solicitar Acceso
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <a href="#como-funciona">
                <Button variant="outline" size="lg" className="text-base">
                  Ver cómo funciona
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}
