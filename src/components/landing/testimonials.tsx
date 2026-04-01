import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Century 21 Polanco",
    initials: "MG",
    quote:
      "Cerré 3 operaciones en mi primer mes. Lo que antes tardaba semanas por WhatsApp, aquí lo resolví en días.",
    stars: 5,
  },
  {
    name: "Roberto Mendoza",
    role: "RE/MAX Guadalajara",
    initials: "RM",
    quote:
      "Por fin una plataforma pensada para profesionales. Sin compradores directos preguntando tonterías. Solo brokers serios.",
    stars: 5,
  },
  {
    name: "Ana Lucía Torres",
    role: "Broker Independiente CDMX",
    initials: "AT",
    quote:
      "El match automático es brutal. Solo recibo propuestas que realmente cumplen lo que mi cliente busca. Ahorré horas.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-15" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            // Testimonios
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Brokers que ya conectan diferente
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-card p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarFallback className="bg-card text-[10px] font-mono font-semibold text-gold">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
