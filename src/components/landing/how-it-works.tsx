import { FileText, Target, Handshake } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Publica tu solicitud",
    description:
      "Tu cliente busca un depa en Polanco de 2M-3M? Publícalo en 30 segundos. Define zona, presupuesto, tipo y características.",
    glow: "glow-gold",
    color: "text-gold bg-gold/10 border-gold/20",
  },
  {
    icon: Target,
    number: "02",
    title: "Recibe ofertas reales",
    description:
      "Brokers con inventario relevante te envían propiedades con match % automático. Solo ves lo que realmente cumple.",
    glow: "glow-success",
    color: "text-success bg-success/10 border-success/20",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Cierra el trato",
    description:
      "Desbloquea el contacto del broker y negocia directo. Sin intermediarios, sin complicaciones.",
    glow: "glow-blue",
    color: "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/20",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-dots opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            // Simple y directo
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
              className={`group relative rounded-xl border border-border bg-card p-8 transition-all hover:border-gold/20 ${step.glow}`}
            >
              {/* Grid overlay */}
              <div className="absolute inset-0 rounded-xl bg-grid-sm opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${step.color}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-3xl font-bold text-muted-foreground/20">
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
            </div>
          ))}
        </div>

        {/* Connection lines */}
        <div className="mt-4 hidden md:flex justify-center gap-4">
          <div className="h-px w-32 bg-gradient-to-r from-gold/30 to-transparent" />
          <div className="h-px w-32 bg-gradient-to-r from-success/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
