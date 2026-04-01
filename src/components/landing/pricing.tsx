import { Check } from "lucide-react";

const items = [
  { action: "Publicar solicitudes", price: "Gratis", included: true },
  { action: "Responder solicitudes", price: "Gratis", included: true },
  { action: "Ver match %", price: "Gratis", included: true },
  { action: "Recibir notificaciones", price: "Gratis", included: true },
  {
    action: "Desbloquear contacto",
    price: "Desde $99 MXN",
    included: true,
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section id="precios" className="py-20 md:py-28 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Transparencia total
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Solo pagas cuando encuentras lo que buscas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sin suscripciones obligatorias. Sin cargos ocultos. Usas la
            plataforma gratis y solo pagas por desbloquear el contacto de un
            match real.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <div className="rounded-xl border border-gold/30 bg-card/50 overflow-hidden">
            <div className="bg-gold/10 px-8 py-4 text-center">
              <p className="font-heading text-lg font-semibold text-gold">
                Modelo transparente
              </p>
            </div>
            <div className="p-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.action}
                  className={`flex items-center justify-between rounded-lg p-3 ${
                    item.highlight
                      ? "border border-gold/20 bg-gold/5"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm">{item.action}</span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      item.highlight ? "text-gold" : "text-success"
                    }`}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border/50 px-8 py-4 text-center">
              <p className="text-xs text-muted-foreground">
                ¿Necesitas más? Próximamente planes Pro y Enterprise con
                desbloqueos incluidos, analytics y prioridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
