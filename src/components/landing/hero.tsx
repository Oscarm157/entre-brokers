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
    <div className="relative mx-auto w-full max-w-2xl rounded-xl border border-border/50 bg-card/50 p-4 shadow-2xl backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2 border-b border-border/30 pb-3">
        <div className="h-3 w-3 rounded-full bg-red-500/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <div className="h-3 w-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-muted-foreground">entre-brokers — Dashboard</span>
      </div>
      <div className="space-y-2">
        {solicitudes.map((s) => (
          <div
            key={s.title}
            className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 px-3 py-2"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{s.title}</p>
              <div className="mt-1 flex gap-2">
                <Badge variant="outline" className="text-xs">{s.zone}</Badge>
                <Badge
                  className={`text-xs ${
                    s.urgency === "Urgente"
                      ? "bg-urgent/20 text-urgent"
                      : s.urgency === "Alta"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                  }`}
                >
                  {s.urgency}
                </Badge>
                <span className="text-xs text-muted-foreground">{s.budget}</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
              <span className="text-sm font-bold text-success">{s.match}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6 border-gold/30 bg-gold/10 text-gold">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Solo para brokers verificados
          </Badge>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            No listamos propiedades.{" "}
            <span className="bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">
              Conectamos oportunidades reales
            </span>{" "}
            entre brokers.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            La red privada donde brokers profesionales publican lo que sus
            clientes buscan y otros responden con propiedades reales. Sin spam.
            Sin intermediarios. Solo negocios.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/registro">
              <Button
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold text-base px-8"
              >
                Solicitar Acceso
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#como-funciona">
              <Button variant="outline" size="lg" className="text-base">
                Ver cómo funciona
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-16">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
