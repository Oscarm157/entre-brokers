import { MessageSquare, Ban, Clock, ShieldAlert } from "lucide-react";

const problems = [
  { icon: MessageSquare, text: "Grupos de WhatsApp saturados de spam" },
  { icon: Ban, text: "Propiedades que no cumplen los requisitos" },
  { icon: Clock, text: "Horas perdidas filtrando información basura" },
  { icon: ShieldAlert, text: "Sin forma de saber si el broker es confiable" },
];

export function Problem() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-urgent">
              // El problema
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
              ¿Sigues cerrando tratos por WhatsApp?
            </h2>
            <p className="mt-4 text-muted-foreground">
              El mercado inmobiliario entre brokers opera con herramientas del
              2010. Grupos saturados, información desorganizada y cero
              trazabilidad.
            </p>

            <div className="mt-8 space-y-4">
              {problems.map((p) => (
                <div key={p.text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-urgent/20 bg-urgent/5">
                    <p.icon className="h-4 w-4 text-urgent" />
                  </div>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div className="space-y-4">
            <div className="rounded-xl border border-urgent/15 bg-urgent/5 p-5 relative overflow-hidden">
              <div className="absolute inset-0 scanlines" />
              <p className="relative mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-urgent">
                STATUS: CAOS.exe
              </p>
              <div className="relative space-y-2 font-mono text-xs text-muted-foreground">
                <p className="rounded border border-border bg-background/80 p-2">
                  Tengo depa en Polanco 2rec $2.8M interesados???
                </p>
                <p className="rounded border border-border bg-background/80 p-2">
                  Alguien tiene terreno en Querétaro? 500m2 max 3M urgeeee
                </p>
                <p className="rounded border border-border bg-background/80 p-2">
                  VENDO casa en Naucalpan excelente precio!!!
                </p>
                <p className="rounded border border-border bg-background/80 p-2">
                  Buenos días grupo, alguien sabe de oficinas en Santa Fe?
                </p>
                <p className="rounded border border-border bg-background/80 p-2 opacity-40">
                  +47 mensajes sin leer...
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-success/15 bg-success/5 p-5 glow-success">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-success">
                STATUS: MATCH.OK
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between rounded border border-success/10 bg-background/80 p-2">
                  <span>Depa Polanco 2-3 rec · $2M-$3.5M</span>
                  <span className="font-bold text-success">92%</span>
                </div>
                <div className="flex items-center justify-between rounded border border-success/10 bg-background/80 p-2">
                  <span>Oficina Santa Fe 200m² · $8M-$12M</span>
                  <span className="font-bold text-success">85%</span>
                </div>
                <div className="flex items-center justify-between rounded border border-border bg-background/80 p-2 opacity-30">
                  <span>Casa Naucalpan · fuera de rango</span>
                  <span className="text-muted-foreground">12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
