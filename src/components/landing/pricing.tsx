import { Check } from "lucide-react";

const items = [
  { action: "Publicar solicitudes", price: "GRATIS", included: true },
  { action: "Responder solicitudes", price: "GRATIS", included: true },
  { action: "Ver match %", price: "GRATIS", included: true },
  { action: "Recibir notificaciones", price: "GRATIS", included: true },
  { action: "Desbloquear contacto", price: "DESDE $99 MXN", included: true, highlight: true },
];

export function Pricing() {
  return (
    <section id="precios" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            // Transparencia total
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
          <div className="rounded-xl border border-gold/20 bg-card overflow-hidden border-gradient glow-gold">
            <div className="bg-gold/5 border-b border-gold/10 px-8 py-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                Modelo transparente
              </p>
            </div>
            <div className="p-8 space-y-3">
              {items.map((item) => (
                <div
                  key={item.action}
                  className={`flex items-center justify-between rounded-lg border p-3 ${
                    item.highlight
                      ? "border-gold/20 bg-gold/5"
                      : "border-border bg-background/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Check className="h-3.5 w-3.5 text-success" />
                    <span className="text-sm">{item.action}</span>
                  </div>
                  <span
                    className={`font-mono text-[10px] tracking-wider font-semibold ${
                      item.highlight ? "text-gold" : "text-success"
                    }`}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-8 py-4 text-center">
              <p className="font-mono text-[10px] text-muted-foreground tracking-wider">
                PRÓXIMAMENTE: PLANES PRO Y ENTERPRISE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
