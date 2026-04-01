"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { buttonHover, buttonTap, viewportOnce } from "./motion-utils";

const ctaStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 24 },
  },
};

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-background to-teal-50/30" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-10 left-10 h-[250px] w-[250px] rounded-full bg-gold/[0.06] blur-[120px]" />
      <div className="absolute bottom-10 right-10 h-[200px] w-[200px] rounded-full bg-[#6366f1]/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={ctaStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl tracking-tight"
          >
            ¿Listo para cerrar más tratos?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-muted-foreground"
          >
            Únete a la red de brokers que ya están conectando oportunidades reales.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
              <Link href="/registro">
                <Button
                  size="lg"
                  className="bg-gold-gradient text-white hover:opacity-90 font-semibold text-base px-10 h-13 shadow-gold rounded-xl"
                >
                  Crear mi cuenta gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm text-muted-foreground"
          >
            Sin tarjeta de crédito · Acceso inmediato · Solo para profesionales
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
