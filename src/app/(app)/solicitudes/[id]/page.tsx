import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Calendar,
  MapPin,
  DollarSign,
  Maximize2,
  BedDouble,
  Bath,
  Lock,
  ThumbsUp,
  ThumbsDown,
  Flag,
} from "lucide-react";
import Link from "next/link";

const solicitud = {
  id: "1",
  title: "Departamento en Polanco, 2-3 recámaras",
  operation: "Compra",
  urgency: "Alta",
  zone: "Polanco",
  budget_min: 2000000,
  budget_max: 3500000,
  property_type: "Departamento",
  min_m2: 80,
  max_m2: 120,
  bedrooms: "2-3",
  bathrooms: 2,
  features: ["Estacionamiento", "Seguridad 24h", "Amenidades"],
  description:
    "Mi cliente busca un departamento moderno en la zona de Polanco, de preferencia cerca de Masaryk. Necesita mínimo 2 recámaras (ideal 3), estacionamiento incluido y seguridad. Tiene preaprobación bancaria y puede cerrar en máximo 45 días.",
  broker: { name: "María González", company: "Century 21 Polanco", initials: "MG", verified: true },
  created: "15 Mar 2026",
  expires: "14 Abr 2026",
  responses: 8,
};

const respuestas = [
  {
    id: "r1",
    broker: { name: "Carlos Ramírez", initials: "CR", verified: true },
    zone: "Polanco",
    price: 2800000,
    area: 95,
    bedrooms: 2,
    bathrooms: 2,
    match: 92,
    status: "pending",
    description: "Depa recién remodelado en Homero, 2 rec + estudio, vista a parque.",
  },
  {
    id: "r2",
    broker: { name: "Ana Torres", initials: "AT", verified: true },
    zone: "Polanco",
    price: 3200000,
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    match: 85,
    status: "interested",
    description: "3 recámaras en Campos Elíseos, amenidades completas, listo para escriturar.",
  },
  {
    id: "r3",
    broker: { name: "Roberto Mendoza", initials: "RM", verified: false },
    zone: "Polanco",
    price: 2500000,
    area: 75,
    bedrooms: 2,
    bathrooms: 1,
    match: 71,
    status: "pending",
    description: "2 rec en Horacio, piso 8, buena luz. Solo 1 baño pero precio competitivo.",
  },
];

const urgencyColors: Record<string, string> = {
  Baja: "bg-teal-50 text-success",
  Normal: "bg-warning/20 text-warning",
  Alta: "bg-orange-50 text-orange-500",
  Urgente: "bg-urgent/20 text-urgent",
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export default async function SolicitudDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <div className="mb-2 text-xs text-muted-foreground">
        <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
        {" > "}Detalle de Solicitud
      </div>

      {/* Main solicitud card */}
      <Card className="border-border bg-white shadow-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading text-xl font-bold">{solicitud.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{solicitud.operation}</Badge>
                <Badge className={urgencyColors[solicitud.urgency]}>{solicitud.urgency}</Badge>
                <Badge variant="outline">{solicitud.zone}</Badge>
                <Badge variant="outline">{solicitud.property_type}</Badge>
              </div>
            </div>
            <Link href={`/solicitudes/${id}/responder`}>
              <Button className="bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold">
                Responder con una propiedad
              </Button>
            </Link>
          </div>

          <Separator className="my-6" />

          {/* Broker info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/50 text-xs font-semibold">
                {solicitud.broker.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{solicitud.broker.name}</span>
                {solicitud.broker.verified && <ShieldCheck className="h-3.5 w-3.5 text-success" />}
              </div>
              <p className="text-xs text-muted-foreground">{solicitud.broker.company}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-gold" />
              Contacto bloqueado
            </div>
          </div>

          {/* Details grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              <DollarSign className="h-4 w-4 text-gold" />
              <div>
                <p className="text-xs text-muted-foreground">Presupuesto</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(solicitud.budget_min)} - {formatCurrency(solicitud.budget_max)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              <Maximize2 className="h-4 w-4 text-indigo-500" />
              <div>
                <p className="text-xs text-muted-foreground">Superficie</p>
                <p className="text-sm font-semibold">{solicitud.min_m2} - {solicitud.max_m2} m²</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              <BedDouble className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Recámaras / Baños</p>
                <p className="text-sm font-semibold">{solicitud.bedrooms} rec · {solicitud.bathrooms} baños</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Vigencia</p>
                <p className="text-sm font-semibold">{solicitud.created} — {solicitud.expires}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-4 flex flex-wrap gap-2">
            {solicitud.features.map((f) => (
              <Badge key={f} variant="outline" className="text-xs">
                {f}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{solicitud.description}</p>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            {solicitud.responses} brokers han respondido
          </p>
        </CardContent>
      </Card>

      {/* Responses */}
      <div className="mt-8">
        <h2 className="font-heading text-lg font-bold">Respuestas recibidas</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Solo visibles para el creador de la solicitud
        </p>

        <div className="mt-4 space-y-4">
          {respuestas.map((r) => (
            <Card key={r.id} className="border-border bg-white shadow-card">
              <CardContent className="flex items-center gap-6 p-5">
                {/* Match */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-50 ">
                  <span className="font-heading text-base font-bold text-success">{r.match}%</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[8px] bg-primary/50">{r.broker.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold">{r.broker.name}</span>
                    {r.broker.verified && <ShieldCheck className="h-3 w-3 text-success" />}
                    {r.status === "interested" && (
                      <Badge className="bg-teal-50 text-success text-xs">Interesado</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="text-gold-foreground font-medium">{formatCurrency(r.price)}</span>
                    <span>{r.zone}</span>
                    <span>{r.area} m²</span>
                    <span>{r.bedrooms} rec · {r.bathrooms} baños</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col gap-2">
                  <Button size="sm" className="bg-gold-gradient text-white hover:opacity-90 shadow-gold text-xs font-semibold">
                    <Lock className="mr-1.5 h-3 w-3" />
                    Desbloquear contacto
                  </Button>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-xs text-success flex-1">
                      <ThumbsUp className="mr-1 h-3 w-3" /> Interesa
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground flex-1">
                      <ThumbsDown className="mr-1 h-3 w-3" /> No
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground px-2">
                      <Flag className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
