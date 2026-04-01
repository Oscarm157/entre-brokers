import { Check, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ mes",
    description: "Para empezar",
    highlight: false,
    cta: "Plan actual",
    ctaVariant: "outline" as const,
    features: [
      { text: "Publicar solicitudes ilimitadas", included: true },
      { text: "Responder solicitudes ilimitadas", included: true },
      { text: "Ver match %", included: true },
      { text: "1 desbloqueo gratis al mes", included: true },
      { text: "Analytics avanzados", included: false },
      { text: "Prioridad en resultados", included: false },
      { text: "Badge Pro en perfil", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$499",
    period: "/ mes",
    description: "Para brokers activos",
    highlight: true,
    cta: "Activar Pro",
    ctaVariant: "default" as const,
    features: [
      { text: "Todo lo de Free", included: true },
      { text: "15 desbloqueos incluidos", included: true },
      { text: "Analytics de demanda por zona", included: true },
      { text: "Prioridad en resultados", included: true },
      { text: "Badge Pro en perfil", included: true },
      { text: "Soporte prioritario", included: true },
      { text: "Alertas avanzadas", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "$1,499",
    period: "/ mes",
    description: "Para inmobiliarias",
    highlight: false,
    cta: "Contactar ventas",
    ctaVariant: "outline" as const,
    features: [
      { text: "Todo lo de Pro", included: true },
      { text: "Desbloqueos ilimitados", included: true },
      { text: "Dashboard de equipo", included: true },
      { text: "API access", included: true },
      { text: "Account manager dedicado", included: true },
      { text: "Multi-usuario (hasta 10)", included: true },
      { text: "Reportes personalizados", included: true },
    ],
  },
];

const faqs = [
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, sin penalizaciones. Tu plan vuelve a Free al final del periodo pagado.",
  },
  {
    q: "¿Qué pasa si uso todos mis desbloqueos?",
    a: "Puedes comprar desbloqueos adicionales por $99 MXN cada uno, o hacer upgrade a un plan superior.",
  },
  {
    q: "¿Hay descuento anual?",
    a: "Sí, si pagas anual obtienes 2 meses gratis en cualquier plan.",
  },
  {
    q: "¿Puedo cambiar de plan?",
    a: "Sí, puedes hacer upgrade o downgrade en cualquier momento. Los cambios aplican inmediatamente.",
  },
];

export default function PricingPage() {
  return (
    <div>
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold">Planes y Precios</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Elige el plan que mejor se adapte a tu volumen de negocios.
        </p>
      </div>

      {/* Plans */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`border-border bg-white shadow-card relative ${
              plan.highlight ? "border-gold/50 ring-1 ring-gold/20" : ""
            }`}
          >
            {plan.highlight && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-gold-foreground text-xs font-semibold">
                <Crown className="mr-1 h-3 w-3" />
                Popular
              </Badge>
            )}
            <CardHeader className="text-center pb-2">
              <p className="text-sm font-semibold text-muted-foreground">{plan.name}</p>
              <div className="mt-2">
                <span className="font-heading text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-2">
                    {f.included ? (
                      <Check className="h-4 w-4 shrink-0 text-success" />
                    ) : (
                      <X className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span
                      className={`text-sm ${
                        f.included ? "" : "text-muted-foreground/50"
                      }`}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                className={`w-full font-semibold ${
                  plan.highlight
                    ? "bg-gold-gradient text-white hover:opacity-90 shadow-gold"
                    : ""
                }`}
                variant={plan.ctaVariant}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-16 mx-auto max-w-2xl">
        <h2 className="font-heading text-lg font-bold text-center mb-6">
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-lg border border-border bg-white shadow-card p-4">
              <p className="text-sm font-semibold">{faq.q}</p>
              <p className="mt-1 text-xs text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
