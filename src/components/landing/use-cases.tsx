import { Users, Building } from "lucide-react";

export function UseCases() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            // Casos de uso
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Dos lados, un mismo objetivo
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Broker con cliente */}
          <div className="rounded-xl border border-gold/15 bg-card p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
            <div className="absolute inset-0 bg-grid-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/20 bg-gold/5">
                <Users className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold">
                &ldquo;Tengo un cliente buscando&rdquo;
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Tu cliente quiere comprar o rentar pero no encuentras lo que
                necesita en tu inventario. Publica una solicitud con los
                requisitos exactos y recibe ofertas de brokers que sí tienen lo
                que buscas.
              </p>
              <div className="mt-6 space-y-3">
                {["Define zona, presupuesto y características", "Recibe solo ofertas relevantes con match %", "Cierra más rápido, sin perder tiempo"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <div className="h-1 w-1 rounded-full bg-gold" />
                    <span className="text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Broker con inventario */}
          <div className="rounded-xl border border-success/15 bg-card p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent" />
            <div className="absolute inset-0 bg-grid-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-success/20 bg-success/5">
                <Building className="h-6 w-6 text-success" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold">
                &ldquo;Tengo propiedades disponibles&rdquo;
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Tienes inventario pero no encuentras compradores o inquilinos.
                Explora solicitudes activas de brokers con clientes reales y
                responde con tus propiedades.
              </p>
              <div className="mt-6 space-y-3">
                {["Explora demanda real de otros brokers", "Responde con tu propiedad y ve el match %", "Mueve tu inventario más rápido"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <div className="h-1 w-1 rounded-full bg-success" />
                    <span className="text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
