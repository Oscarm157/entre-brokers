"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonHover, buttonTap } from "./motion-utils";

export function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 z-50 w-full glass-dark"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15">
            <Building2 className="h-4 w-4 text-gold" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-white">
            entre-brokers
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#como-funciona" className="text-sm text-white/50 hover:text-white/90 transition-colors">
            Cómo funciona
          </a>
          <a href="#solucion" className="text-sm text-white/50 hover:text-white/90 transition-colors">
            Solución
          </a>
          <a href="#precios" className="text-sm text-white/50 hover:text-white/90 transition-colors">
            Precios
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm text-white/60 hover:text-white hover:bg-white/5">
              Iniciar sesión
            </Button>
          </Link>
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Link href="/registro">
              <Button
                size="sm"
                className="bg-gold-gradient text-white hover:opacity-90 text-sm font-semibold shadow-gold rounded-xl"
              >
                Solicitar Acceso
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
