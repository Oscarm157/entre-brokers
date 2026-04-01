import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, ShieldCheck, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

const solicitudes = [
  {
    id: "1",
    title: "Departamento en Polanco, 2-3 recámaras",
    zone: "Polanco",
    operation: "Compra",
    urgency: "Alta",
    budget: "$2,000,000 - $3,500,000 MXN",
    features: "2-3 rec, 2 baños, 80-120 m², estacionamiento",
    match: 92,
    broker: { name: "María González", initials: "MG", verified: true },
    time: "hace 2 horas",
    responses: 8,
  },
  {
    id: "2",
    title: "Oficina en Santa Fe, mínimo 200m²",
    zone: "Santa Fe",
    operation: "Renta",
    urgency: "Urgente",
    budget: "$45,000 - $80,000 MXN/mes",
    features: "200+ m², sala de juntas, estacionamiento x4",
    match: 85,
    broker: { name: "Roberto Mendoza", initials: "RM", verified: true },
    time: "hace 4 horas",
    responses: 5,
  },
  {
    id: "3",
    title: "Casa en Coyoacán con jardín amplio",
    zone: "Coyoacán",
    operation: "Compra",
    urgency: "Normal",
    budget: "$4,000,000 - $6,500,000 MXN",
    features: "3-4 rec, jardín >50m², pet-friendly",
    match: 78,
    broker: { name: "Ana Torres", initials: "AT", verified: true },
    time: "hace 6 horas",
    responses: 12,
  },
  {
    id: "4",
    title: "Terreno en Querétaro para desarrollo",
    zone: "Querétaro",
    operation: "Compra",
    urgency: "Baja",
    budget: "$8,000,000 - $15,000,000 MXN",
    features: "500+ m², uso mixto, acceso carretera",
    match: 65,
    broker: { name: "Luis Herrera", initials: "LH", verified: false },
    time: "hace 1 día",
    responses: 3,
  },
  {
    id: "5",
    title: "Local comercial en Roma Norte",
    zone: "Roma Norte",
    operation: "Renta",
    urgency: "Alta",
    budget: "$25,000 - $50,000 MXN/mes",
    features: "60-100 m², planta baja, alta afluencia",
    match: 71,
    broker: { name: "Carmen Ruiz", initials: "CR", verified: true },
    time: "hace 8 horas",
    responses: 6,
  },
];

const urgencyColors: Record<string, string> = {
  Baja: "bg-success/20 text-success",
  Normal: "bg-warning/20 text-warning",
  Alta: "bg-[#F97316]/20 text-[#F97316]",
  Urgente: "bg-urgent/20 text-urgent",
};

export default function ExplorarPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Explorar Solicitudes</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Encuentra solicitudes que coincidan con tu inventario y responde con tus propiedades.
      </p>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por zona, tipo..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Zona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="polanco">Polanco</SelectItem>
            <SelectItem value="santa-fe">Santa Fe</SelectItem>
            <SelectItem value="coyoacan">Coyoacán</SelectItem>
            <SelectItem value="roma">Roma Norte</SelectItem>
            <SelectItem value="condesa">Condesa</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="casa">Casa</SelectItem>
            <SelectItem value="departamento">Departamento</SelectItem>
            <SelectItem value="terreno">Terreno</SelectItem>
            <SelectItem value="local">Local</SelectItem>
            <SelectItem value="oficina">Oficina</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Urgencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="urgente">Urgente</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Solicitudes list */}
      <div className="mt-6 space-y-4">
        {solicitudes.map((s) => (
          <Card key={s.id} className="border-border/50 bg-card/50 transition-all hover:border-gold/20">
            <CardContent className="flex items-center gap-6 p-5">
              {/* Match circle */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-success/15 ring-2 ring-success/30">
                <span className="font-heading text-lg font-bold text-success">{s.match}%</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-base font-semibold">{s.title}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">{s.operation}</Badge>
                      <Badge className={`text-xs ${urgencyColors[s.urgency]}`}>
                        {s.urgency}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{s.zone}</Badge>
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-sm text-gold font-medium">{s.budget}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.features}</p>

                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-[8px] bg-primary/50">
                        {s.broker.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{s.broker.name}</span>
                    {s.broker.verified && (
                      <ShieldCheck className="h-3 w-3 text-success" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {s.time}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    {s.responses} respuestas
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 flex-col gap-2">
                <Link href={`/solicitudes/${s.id}/responder`}>
                  <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs font-semibold">
                    Responder
                  </Button>
                </Link>
                <Link href={`/solicitudes/${s.id}`}>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Ver detalle
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
