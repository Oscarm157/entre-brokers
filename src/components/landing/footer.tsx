"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Building2 } from "lucide-react";
import { viewportOnce } from "./motion-utils";

export function Footer() {
  return (
    <motion.footer
      className="py-14 bg-secondary/40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15">
                <Building2 className="h-4 w-4 text-gold" />
              </div>
              <span className="font-heading text-base font-bold text-primary">
                entre-brokers
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              La red privada de oportunidades inmobiliarias
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/terminos" className="hover:text-foreground transition-colors">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <a href="mailto:contacto@entre-brokers.com" className="hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © 2026 entre-brokers. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
