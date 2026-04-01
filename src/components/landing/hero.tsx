"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, TrendingUp, Users } from "lucide-react";
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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 24 },
  },
};

const fadeDown = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28 },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 22, delay: 0.5 },
  },
};

const stats = [
  { icon: Users, value: "200+", label: "Brokers verificados" },
  { icon: TrendingUp, value: "1,500+", label: "Solicitudes activas" },
  { icon: Shield, value: "92%", label: "Match promedio" },
];

function MatchRing({ score, dark }: { score: number; dark?: boolean }) {
  const cls = score >= 90
    ? `${dark ? "match-gold-dark" : "match-gold"} match-pulse`
    : score >= 70
      ? dark ? "match-teal-dark" : "match-teal"
      : dark ? "match-blue-dark" : "match-blue";
  const textCls = score >= 90
    ? dark ? "text-[#f0d078]" : "text-[#92710a]"
    : score >= 70
      ? "text-success"
      : "text-[#818cf8]";
  return (
    <div className={`match-ring h-12 w-12 ${cls}`}>
      <span className={`font-heading text-sm font-bold ${textCls}`}>{score}%</span>
      {score >= 90 && <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-gold sparkle" />}
    </div>
  );
}

function DashboardMock() {
  const solicitudes = [
    { title: "Depa Polanco 2-3 rec", zone: "Polanco", match: 92, urgency: "Alta", budget: "$2M – $3.5M" },
    { title: "Casa Coyoacán con jardín", zone: "Coyoacán", match: 85, urgency: "Normal", budget: "$4M – $6M" },
    { title: "Oficina Santa Fe 200m²", zone: "Santa Fe", match: 71, urgency: "Urgente", budget: "$8M – $12M" },
  ];

  const urgencyStyle: Record<string, string> = {
    Alta: "bg-amber-500/15 text-amber-300",
    Normal: "bg-teal-500/15 text-teal-300",
    Urgente: "bg-red-500/15 text-red-300",
  };

  return (
    <motion.div
      variants={scaleUp}
      className="relative mx-auto w-full max-w-2xl rounded-2xl overflow-hidden shadow-dark-card"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-2 font-heading text-xs font-medium tracking-wider uppercase" style={{ color: "var(--dark-text-subtle)" }}>
          Solicitudes con match
        </span>
      </div>

      <motion.div
        className="px-6 pb-6 space-y-3"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {solicitudes.map((s) => (
          <motion.div
            key={s.title}
            variants={cardVariants}
            whileHover={cardHover}
            className="flex items-center justify-between rounded-xl px-5 py-4 transition-colors cursor-pointer"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: "var(--dark-text)" }}>{s.title}</p>
              <div className="mt-2 flex gap-2 items-center">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.06)", color: "var(--dark-text-muted)" }}>
                  {s.zone}
                </span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${urgencyStyle[s.urgency]}`}>
                  {s.urgency}
                </span>
                <span className="text-xs" style={{ color: "var(--dark-text-subtle)" }}>{s.budget}</span>
              </div>
            </div>
            <MatchRing score={s.match} dark />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="section-dark relative overflow-hidden bg-dark-gradient">
      {/* Atmospheric effects */}
      <div className="absolute inset-0 bg-glow-gold" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute top-0 left-1/3 h-[600px] w-[600px] rounded-full bg-gold/[0.04] blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#6366f1]/[0.03] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-48 md:pb-36">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeDown}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold/10 text-gold">
              <Shield className="h-3.5 w-3.5" />
              Red exclusiva para brokers verificados
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-8 font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: "var(--dark-text)" }}
          >
            La red privada donde brokers{" "}
            <span className="text-gradient-gold">cierran más tratos</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--dark-text-muted)" }}
          >
            Publica lo que tu cliente busca. Recibe propiedades que hacen match.
            Sin spam, sin intermediarios — solo negocios entre profesionales.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Link href="/registro">
                <Button
                  size="lg"
                  className="bg-gold-gradient text-white hover:opacity-90 font-semibold text-base px-8 h-13 shadow-gold rounded-xl"
                >
                  Solicitar Acceso
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <a href="#como-funciona">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base h-13 rounded-xl bg-transparent text-white/80 hover:text-white hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  Ver cómo funciona
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
                  <stat.icon className="h-4 w-4 text-gold" />
                </div>
                <div className="text-left">
                  <p className="font-heading text-xl font-bold text-gold">{stat.value}</p>
                  <p className="text-xs" style={{ color: "var(--dark-text-subtle)" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard mock */}
        <motion.div
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <DashboardMock />
        </motion.div>
      </div>

      {/* Bottom gradient transition to light */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
