import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-background to-teal-50/30" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            ¿Listo para cerrar más tratos?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Únete a la red de brokers que ya están conectando oportunidades reales.
          </p>

          <div className="mt-8">
            <Link href="/registro">
              <Button
                size="lg"
                className="bg-gold-gradient text-white hover:opacity-90 font-semibold text-base px-10 shadow-gold"
              >
                Crear mi cuenta gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Sin tarjeta de crédito · Acceso inmediato · Solo para profesionales
          </p>
        </div>
      </div>
    </section>
  );
}
