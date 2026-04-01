import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Eye, Clock } from "lucide-react";
import Link from "next/link";

const misRespuestas = [
  {
    id: "r1",
    solicitudId: "1",
    solicitudTitle: "Departamento en Polanco, 2-3 recámaras",
    zone: "Polanco",
    price: "$2,800,000 MXN",
    area: "95 m²",
    match: 92,
    status: "pending",
    broker: "María González",
    time: "hace 2 horas",
  },
  {
    id: "r2",
    solicitudId: "4",
    solicitudTitle: "Local comercial en Roma Norte",
    zone: "Roma Norte",
    price: "$35,000 MXN/mes",
    area: "80 m²",
    match: 78,
    status: "interested",
    broker: "Carmen Ruiz",
    time: "hace 1 día",
  },
  {
    id: "r3",
    solicitudId: "2",
    solicitudTitle: "Casa en Coyoacán con jardín",
    zone: "Coyoacán",
    price: "$5,200,000 MXN",
    area: "180 m²",
    match: 65,
    status: "rejected",
    broker: "Ana Torres",
    time: "hace 3 días",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pendiente", className: "bg-warning/20 text-warning" },
  interested: { label: "Interesado", className: "bg-success/20 text-success" },
  rejected: { label: "No relevante", className: "bg-muted text-muted-foreground" },
};

export default function MisRespuestasPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Mis Respuestas</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Respuestas que has enviado a solicitudes de otros brokers.
      </p>

      <div className="mt-8 space-y-4">
        {misRespuestas.map((r) => (
          <Card key={r.id} className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-6 p-5">
              {/* Match */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-success/15 ring-2 ring-success/30">
                <span className="font-heading text-base font-bold text-success">{r.match}%</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Link href={`/solicitudes/${r.solicitudId}`} className="hover:text-gold transition-colors">
                  <h3 className="text-sm font-semibold">{r.solicitudTitle}</h3>
                </Link>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge className={`text-xs ${statusConfig[r.status].className}`}>
                    {statusConfig[r.status].label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{r.zone}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="text-gold font-medium">{r.price}</span>
                  <span>{r.area}</span>
                  <span>Solicitud de {r.broker}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {r.time}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 gap-2">
                {r.status === "interested" && (
                  <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs font-semibold">
                    <Lock className="mr-1.5 h-3 w-3" />
                    Desbloquear
                  </Button>
                )}
                <Link href={`/solicitudes/${r.solicitudId}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Eye className="mr-1 h-3 w-3" />
                    Ver solicitud
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
