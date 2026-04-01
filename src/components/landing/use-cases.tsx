import { Users, Building } from "lucide-react";

export function UseCases() {
  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Casos de uso
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Dos lados, un mismo objetivo
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Broker con cliente */}
          <div className="rounded-xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10">
              <Users className="h-7 w-7 text-gold" />
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
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-muted-foreground">Define zona, presupuesto y características</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-muted-foreground">Recibe solo ofertas relevantes con match %</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-muted-foreground">Cierra más rápido, sin perder tiempo</span>
              </div>
            </div>
          </div>

          {/* Broker con inventario */}
          <div className="rounded-xl border border-success/20 bg-gradient-to-br from-success/5 to-transparent p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success/10">
              <Building className="h-7 w-7 text-success" />
            </div>
            <h3 className="mt-6 font-heading text-xl font-semibold">
              &ldquo;Tengo propiedades disponibles&rdquo;
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Tienes inventario pero no encuentras compradores o inquilinos.
              Explora solicitudes activas de brokers con clientes reales y
              responde con tus propiedades. El sistema te dice qué tan bien
              hacen match.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-muted-foreground">Explora demanda real de otros brokers</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-muted-foreground">Responde con tu propiedad y ve el match %</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-muted-foreground">Mueve tu inventario más rápido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
