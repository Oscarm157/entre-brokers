import { Brain, ShieldCheck, FileSearch, Coins } from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "Match inteligente",
    description:
      "Algoritmo que calcula compatibilidad automática entre solicitud y oferta. Solo ves lo relevante.",
    color: "text-gold border-gold/20 bg-gold/5",
  },
  {
    icon: ShieldCheck,
    title: "Solo brokers verificados",
    description:
      "Cada broker pasa por verificación. Sin compradores directos, sin curiosos, sin spam.",
    color: "text-success border-success/20 bg-success/5",
  },
  {
    icon: FileSearch,
    title: "Solicitudes, no listados",
    description:
      "Aquí se publica lo que el cliente busca, no un catálogo infinito de propiedades sin contexto.",
    color: "text-[#60A5FA] border-[#60A5FA]/20 bg-[#60A5FA]/5",
  },
  {
    icon: Coins,
    title: "Paga solo por resultados",
    description:
      "Publicar y responder es gratis. Solo pagas cuando quieres desbloquear el contacto de un match real.",
    color: "text-[#A78BFA] border-[#A78BFA]/20 bg-[#A78BFA]/5",
  },
];

export function Solution() {
  return (
    <section id="solucion" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-success">
            // La solución
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Tu red privada de oportunidades
          </h2>
          <p className="mt-4 text-muted-foreground">
            Una plataforma diseñada exclusivamente para que brokers profesionales
            conecten demanda real con oferta relevante.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-gold/15 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-sm opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
