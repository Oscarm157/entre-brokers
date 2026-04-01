import {
  FileText,
  MessageSquare,
  Target,
  Unlock,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { label: "Solicitudes activas", value: "5", icon: FileText, color: "text-[#60A5FA]" },
  { label: "Respuestas enviadas", value: "12", icon: MessageSquare, color: "text-success" },
  { label: "Match promedio", value: "78%", icon: Target, color: "text-success" },
  { label: "Contactos desbloqueados", value: "3", icon: Unlock, color: "text-gold" },
];

const recentMatches = [
  {
    title: "Depa Polanco 2-3 rec",
    zone: "Polanco",
    match: 92,
    urgency: "Alta" as const,
    broker: "María G.",
    time: "hace 2h",
  },
  {
    title: "Oficina Santa Fe 200m²",
    zone: "Santa Fe",
    match: 85,
    urgency: "Normal" as const,
    broker: "Roberto M.",
    time: "hace 5h",
  },
  {
    title: "Casa Coyoacán con jardín",
    zone: "Coyoacán",
    match: 71,
    urgency: "Baja" as const,
    broker: "Ana L.",
    time: "hace 1d",
  },
];

const activity = [
  { text: "María G. respondió a tu solicitud 'Depa Polanco 2-3M'", time: "hace 2h", type: "response" },
  { text: "Nuevo match 92% en tu solicitud de oficina en Santa Fe", time: "hace 5h", type: "match" },
  { text: "Roberto M. desbloqueó tu contacto", time: "hace 1 día", type: "unlock" },
];

const urgencyColors: Record<string, string> = {
  Baja: "bg-success/20 text-success",
  Normal: "bg-warning/20 text-warning",
  Alta: "bg-[#F97316]/20 text-[#F97316]",
  Urgente: "bg-urgent/20 text-urgent",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Bienvenido, Carlos</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Aquí tienes un resumen de tu actividad reciente.
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent matches */}
      <Card className="mt-8 border-border/50 bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading text-lg">Matches Recientes</CardTitle>
          <Link href="/explorar">
            <Button variant="ghost" size="sm" className="text-xs text-gold">
              Ver todos <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMatches.map((m) => (
              <div
                key={m.title}
                className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 p-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{m.title}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{m.zone}</Badge>
                    <Badge className={`text-xs ${urgencyColors[m.urgency]}`}>
                      {m.urgency}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {m.broker} · {m.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 ring-2 ring-success/30">
                    <span className="text-sm font-bold text-success">{m.match}%</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Ver detalle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity timeline */}
      <Card className="mt-8 border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{a.text}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
