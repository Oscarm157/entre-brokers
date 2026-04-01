import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, MessageSquare, Clock, Pause, Eye } from "lucide-react";
import Link from "next/link";

const misSolicitudes = [
  {
    id: "1",
    title: "Departamento en Polanco, 2-3 recámaras",
    zone: "Polanco",
    operation: "Compra",
    urgency: "Alta",
    budget: "$2M - $3.5M MXN",
    status: "active",
    responses: 8,
    created: "15 Mar 2026",
    expires: "14 Abr 2026",
  },
  {
    id: "2",
    title: "Oficina Santa Fe 200m²",
    zone: "Santa Fe",
    operation: "Renta",
    urgency: "Urgente",
    budget: "$45K - $80K MXN/mes",
    status: "active",
    responses: 5,
    created: "18 Mar 2026",
    expires: "17 Abr 2026",
  },
  {
    id: "3",
    title: "Casa en San Ángel con jardín",
    zone: "San Ángel",
    operation: "Compra",
    urgency: "Normal",
    budget: "$6M - $10M MXN",
    status: "paused",
    responses: 2,
    created: "10 Mar 2026",
    expires: "9 Abr 2026",
  },
];

const urgencyColors: Record<string, string> = {
  Baja: "bg-success/20 text-success",
  Normal: "bg-warning/20 text-warning",
  Alta: "bg-[#F97316]/20 text-[#F97316]",
  Urgente: "bg-urgent/20 text-urgent",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Activa", className: "bg-success/20 text-success" },
  paused: { label: "Pausada", className: "bg-warning/20 text-warning" },
  closed: { label: "Cerrada", className: "bg-muted text-muted-foreground" },
  expired: { label: "Expirada", className: "bg-urgent/20 text-urgent" },
};

export default function MisSolicitudesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Mis Solicitudes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestiona las solicitudes que has publicado para tus clientes.
          </p>
        </div>
        <Link href="/solicitudes/nueva">
          <Button className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {misSolicitudes.map((s) => (
          <Card key={s.id} className="border-border/50 bg-card/50">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/solicitudes/${s.id}`} className="hover:text-gold transition-colors">
                    <h3 className="font-heading text-base font-semibold">{s.title}</h3>
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs">{s.operation}</Badge>
                    <Badge className={`text-xs ${urgencyColors[s.urgency]}`}>{s.urgency}</Badge>
                    <Badge variant="outline" className="text-xs">{s.zone}</Badge>
                    <Badge className={`text-xs ${statusConfig[s.status].className}`}>
                      {statusConfig[s.status].label}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/solicitudes/${s.id}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Eye className="mr-1 h-3 w-3" />
                      Ver respuestas ({s.responses})
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Pause className="mr-1 h-3 w-3" />
                    {s.status === "paused" ? "Reanudar" : "Pausar"}
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="text-gold font-medium">{s.budget}</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {s.responses} respuestas
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Creada {s.created}
                </div>
                <span>Expira {s.expires}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
