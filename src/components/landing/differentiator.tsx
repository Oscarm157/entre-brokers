import { Check, X } from "lucide-react";

const comparison = [
  { feature: "Usuarios", portal: "Compradores directos + brokers", eb: "Solo brokers verificados" },
  { feature: "Contenido", portal: "Miles de listados públicos", eb: "Solicitudes de demanda real" },
  { feature: "Match", portal: "Búsqueda manual", eb: "Match % automático" },
  { feature: "Spam", portal: "Grupos saturados", eb: "Zero spam, solo relevante" },
  { feature: "Confianza", portal: "Sin verificación", eb: "Brokers verificados" },
  { feature: "Costo", portal: "Suscripción mensual fija", eb: "Gratis hasta el resultado" },
];

export function Differentiator() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-foreground">
            Diferenciador
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            No somos un portal inmobiliario
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mientras otros listan propiedades para el público general, nosotros
            conectamos oportunidades reales entre profesionales.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-card">
          <div className="grid grid-cols-3 border-b border-border bg-secondary/50">
            <div className="p-4" />
            <div className="border-l border-border p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Portal tradicional
              </p>
            </div>
            <div className="border-l border-amber-200 bg-amber-50/50 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-foreground">
                entre-brokers
              </p>
            </div>
          </div>

          {comparison.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 ${i < comparison.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="p-4">
                <p className="text-sm font-medium text-primary">{row.feature}</p>
              </div>
              <div className="flex items-center gap-2 border-l border-border p-4">
                <X className="h-3.5 w-3.5 shrink-0 text-red-300" />
                <p className="text-xs text-muted-foreground">{row.portal}</p>
              </div>
              <div className="flex items-center gap-2 border-l border-amber-200 bg-amber-50/30 p-4">
                <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                <p className="text-xs text-primary">{row.eb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
