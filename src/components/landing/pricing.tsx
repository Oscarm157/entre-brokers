import { Check } from "lucide-react";

const items = [
  { action: "Publicar solicitudes", price: "Gratis", highlight: false },
  { action: "Responder solicitudes", price: "Gratis", highlight: false },
  { action: "Ver match %", price: "Gratis", highlight: false },
  { action: "Recibir notificaciones", price: "Gratis", highlight: false },
  { action: "Desbloquear contacto", price: "Desde $99 MXN", highlight: true },
];

export function Pricing() {
  return (
    <section id="precios" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-foreground">
            Transparencia total
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            Solo pagas cuando encuentras lo que buscas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sin suscripciones obligatorias. Sin cargos ocultos.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-2xl border border-amber-200 bg-white overflow-hidden shadow-card-hover">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-8 py-5 text-center">
              <p className="font-heading text-lg font-semibold text-gold-foreground">
                Modelo transparente
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Usa la plataforma gratis, paga por resultados</p>
            </div>
            <div className="p-8 space-y-3">
              {items.map((item) => (
                <div
                  key={item.action}
                  className={`flex items-center justify-between rounded-xl p-3.5 ${
                    item.highlight
                      ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                      : "bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm text-primary">{item.action}</span>
                  </div>
                  <span className={`text-sm font-semibold ${item.highlight ? "text-gold-foreground" : "text-success"}`}>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-8 py-4 text-center">
              <p className="text-xs text-muted-foreground">
                Próximamente planes Pro y Enterprise con desbloqueos incluidos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
