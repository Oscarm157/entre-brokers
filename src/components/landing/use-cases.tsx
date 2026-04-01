import { Users, Building } from "lucide-react";

export function UseCases() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-foreground">
            Casos de uso
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            Dos lados, un mismo objetivo
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 border border-amber-200">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-6 font-heading text-xl font-semibold text-primary">
              &ldquo;Tengo un cliente buscando&rdquo;
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Tu cliente quiere comprar o rentar pero no encuentras lo que
              necesita en tu inventario. Publica una solicitud y recibe ofertas
              relevantes.
            </p>
            <div className="mt-6 space-y-3">
              {["Define zona, presupuesto y características", "Recibe solo ofertas relevantes con match %", "Cierra más rápido, sin perder tiempo"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-8 shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100 border border-teal-200">
              <Building className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="mt-6 font-heading text-xl font-semibold text-primary">
              &ldquo;Tengo propiedades disponibles&rdquo;
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Tienes inventario pero no encuentras compradores o inquilinos.
              Explora solicitudes activas y responde con tus propiedades.
            </p>
            <div className="mt-6 space-y-3">
              {["Explora demanda real de otros brokers", "Responde con tu propiedad y ve el match %", "Mueve tu inventario más rápido"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  <span className="text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
