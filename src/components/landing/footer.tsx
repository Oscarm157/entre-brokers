"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Building2 } from "lucide-react";
import { viewportOnce } from "./motion-utils";

export function Footer() {
  return (
    <motion.footer
      className="section-dark py-14"
      style={{ background: "var(--dark-bg)" }}
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
              <span className="font-heading text-base font-bold" style={{ color: "var(--dark-text)" }}>
                entre-brokers
              </span>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--dark-text-subtle)" }}>
              La red privada de oportunidades inmobiliarias
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm" style={{ color: "var(--dark-text-subtle)" }}>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <a href="mailto:contacto@entre-brokers.com" className="hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-center text-xs" style={{ color: "var(--dark-text-subtle)" }}>
            © 2026 entre-brokers. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
