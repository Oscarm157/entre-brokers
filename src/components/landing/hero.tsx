import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

function MatchRing({ score }: { score: number }) {
  const cls = score >= 90 ? "match-gold match-pulse" : score >= 70 ? "match-teal" : "match-blue";
  const textCls = score >= 90 ? "text-[#7d5800]" : score >= 70 ? "text-success" : "text-[#6366f1]";
  return (
    <div className={`match-ring h-11 w-11 ${cls}`}>
      <span className={`font-heading text-sm font-bold ${textCls}`}>{score}%</span>
      {score >= 90 && <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-gold sparkle" />}
    </div>
  );
}

function DashboardMock() {
  const solicitudes = [
    { title: "Depa Polanco 2-3 rec", zone: "Polanco", match: 92, urgency: "Alta", budget: "$2M - $3.5M" },
    { title: "Casa Coyoacán con jardín", zone: "Coyoacán", match: 85, urgency: "Normal", budget: "$4M - $6M" },
    { title: "Oficina Santa Fe 200m²", zone: "Santa Fe", match: 71, urgency: "Urgente", budget: "$8M - $12M" },
  ];

  const urgencyStyle: Record<string, string> = {
    Alta: "bg-amber-100 text-amber-700",
    Normal: "bg-teal-50 text-success",
    Urgente: "bg-red-50 text-red-600",
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-2xl border border-border bg-white p-5 shadow-card-hover">
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
        <div className="h-3 w-3 rounded-full bg-red-300" />
        <div className="h-3 w-3 rounded-full bg-amber-300" />
        <div className="h-3 w-3 rounded-full bg-green-300" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground tracking-wider uppercase">entre-brokers — Dashboard</span>
      </div>
      <div className="space-y-2.5">
        {solicitudes.map((s) => (
          <div
            key={s.title}
            className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 px-4 py-3 transition-all hover:shadow-card"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary">{s.title}</p>
              <div className="mt-1.5 flex gap-2">
                <Badge variant="outline" className="text-[10px] font-medium">{s.zone}</Badge>
                <Badge className={`text-[10px] border-0 ${urgencyStyle[s.urgency]}`}>
                  {s.urgency}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{s.budget}</span>
              </div>
            </div>
            <MatchRing score={s.match} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Soft background accents */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[150px]" />
      <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-success/8 blur-[120px]" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6 border-gold/30 bg-gold/10 text-gold-foreground font-mono text-[10px] tracking-widest uppercase shadow-sm">
            <ShieldCheck className="mr-1.5 h-3 w-3" />
            Solo brokers verificados
          </Badge>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl">
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
                className="bg-gold-gradient text-white hover:opacity-90 font-semibold text-base px-8 shadow-gold"
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

        <div className="mt-20">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
