import { FileText, Target, Handshake } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Publica tu solicitud",
    description:
      "Tu cliente busca un depa en Polanco de 2M-3M? Publícalo en 30 segundos. Define zona, presupuesto, tipo y características.",
  },
  {
    icon: Target,
    number: "02",
    title: "Recibe ofertas reales",
    description:
      "Brokers con inventario relevante te envían propiedades con match % automático. Solo ves lo que realmente cumple.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Cierra el trato",
    description:
      "Desbloquea el contacto del broker y negocia directo. Sin intermediarios, sin complicaciones.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Simple y directo
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tres pasos para conectar con el broker correcto
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-xl border border-border/50 bg-card/50 p-8 transition-all hover:border-gold/30 hover:bg-card"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                  <step.icon className="h-6 w-6 text-gold" />
                </div>
                <span className="font-heading text-3xl font-bold text-muted-foreground/30">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
