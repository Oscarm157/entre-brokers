import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight } from "lucide-react";

function DashboardMock() {
  const solicitudes = [
    { title: "Depa Polanco 2-3 rec", zone: "Polanco", match: 92, urgency: "Alta", budget: "$2M - $3.5M" },
    { title: "Casa Coyoacán con jardín", zone: "Coyoacán", match: 85, urgency: "Normal", budget: "$4M - $6M" },
    { title: "Oficina Santa Fe 200m²", zone: "Santa Fe", match: 78, urgency: "Urgente", budget: "$8M - $12M" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-xl border border-border bg-card p-4 shadow-2xl border-gradient">
      {/* Window chrome */}
      <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
        <div className="h-2.5 w-2.5 rounded-full bg-urgent/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground tracking-wider">ENTRE-BROKERS://DASHBOARD</span>
      </div>
      <div className="space-y-2">
        {solicitudes.map((s) => (
          <div
            key={s.title}
            className="flex items-center justify-between rounded-lg border border-border bg-background/80 px-4 py-3 transition-colors hover:border-gold/20"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{s.title}</p>
              <div className="mt-1 flex gap-2">
                <Badge variant="outline" className="text-[10px] font-mono">{s.zone}</Badge>
                <Badge
                  className={`text-[10px] ${
                    s.urgency === "Urgente"
                      ? "bg-urgent/15 text-urgent border border-urgent/20"
                      : s.urgency === "Alta"
                        ? "bg-warning/15 text-warning border border-warning/20"
                        : "bg-success/15 text-success border border-success/20"
                  }`}
                >
                  {s.urgency}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-mono">{s.budget}</span>
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-success/30 bg-success/10 match-pulse">
              <span className="font-mono text-sm font-bold text-success">{s.match}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Tech grid background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Glow orbs */}
      <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-success/5 blur-[100px]" />
      <div className="absolute top-60 left-1/2 h-80 w-80 rounded-full bg-[#60A5FA]/3 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6 border-gold/20 bg-gold/5 text-gold font-mono text-[10px] tracking-widest uppercase">
            <ShieldCheck className="mr-1.5 h-3 w-3" />
            Solo brokers verificados
          </Badge>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            No listamos propiedades.{" "}
            <span className="text-gradient-animated">
              Conectamos oportunidades reales
            </span>{" "}
            entre brokers.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed">
            La red privada donde brokers profesionales publican lo que sus
            clientes buscan y otros responden con propiedades reales. Sin spam.
            Sin intermediarios. Solo negocios.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/registro">
              <Button
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold text-base px-8 glow-gold"
              >
                Solicitar Acceso
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#como-funciona">
              <Button variant="outline" size="lg" className="text-base border-border hover:border-gold/30 hover:bg-gold/5">
                Ver cómo funciona
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-20">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
