import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-64 w-64 rounded-full bg-success/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            ¿Listo para cerrar más tratos?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Únete a la red de brokers que ya están conectando oportunidades
            reales.
          </p>

          <div className="mt-8">
            <Link href="/registro">
              <Button
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold text-base px-10 glow-gold"
              >
                Crear mi cuenta gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Sin tarjeta de crédito · Acceso inmediato · Solo para profesionales
          </p>
        </div>
      </div>
    </section>
  );
}
