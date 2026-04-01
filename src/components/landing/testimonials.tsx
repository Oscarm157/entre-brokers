import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Century 21 Polanco",
    initials: "MG",
    quote: "Cerré 3 operaciones en mi primer mes. Lo que antes tardaba semanas por WhatsApp, aquí lo resolví en días.",
    stars: 5,
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Roberto Mendoza",
    role: "RE/MAX Guadalajara",
    initials: "RM",
    quote: "Por fin una plataforma pensada para profesionales. Sin compradores directos preguntando tonterías. Solo brokers serios.",
    stars: 5,
    color: "bg-teal-100 text-teal-700",
  },
  {
    name: "Ana Lucía Torres",
    role: "Broker Independiente CDMX",
    initials: "AT",
    quote: "El match automático es brutal. Solo recibo propuestas que realmente cumplen lo que mi cliente busca. Ahorré horas.",
    stars: 5,
    color: "bg-indigo-100 text-indigo-700",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-foreground">
            Testimonios
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-4xl">
            Brokers que ya conectan diferente
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-white p-8 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`text-xs font-semibold ${t.color}`}>
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
