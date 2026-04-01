import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Star,
  FileText,
  MessageSquare,
  Handshake,
  MapPin,
  Building2,
  Mail,
  Phone,
  Lock,
  Settings,
} from "lucide-react";
import Link from "next/link";

const profile = {
  name: "Carlos Ramírez",
  initials: "CR",
  company: "RE/MAX Monterrey",
  email: "car***@remax.com",
  phone: "Oculto",
  license: "Verificada",
  verified: true,
  member_since: "Mar 2026",
  zones: ["Monterrey Centro", "San Pedro", "Valle Oriente"],
  stats: {
    solicitudes: 12,
    respuestas: 34,
    deals: 8,
    rating: 4.7,
  },
};

const reviews = [
  { name: "Ana L.", text: "Excelente comunicación, cerró rápido. Muy profesional.", rating: 5 },
  { name: "María G.", text: "Propiedad tal como la describió, proceso limpio.", rating: 5 },
  { name: "Roberto M.", text: "Buena respuesta pero tardó un poco en contestar.", rating: 4 },
];

export default function PerfilPage() {
  return (
    <div>
      {/* Header/Banner */}
      <div className="relative rounded-xl bg-gradient-to-r from-primary to-primary/60 p-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 border-4 border-background">
            <AvatarFallback className="bg-gold/20 text-2xl font-bold text-gold">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold">{profile.name}</h1>
              {profile.verified && (
                <Badge className="bg-success/20 text-success text-xs">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Verificado
                </Badge>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-foreground/70">
              <Building2 className="h-3.5 w-3.5" />
              {profile.company}
            </div>
            <p className="mt-1 text-xs text-foreground/50">
              Miembro desde {profile.member_since}
            </p>
          </div>
          <div className="ml-auto">
            <Link href="/perfil/editar">
              <Button variant="outline" size="sm" className="text-xs">
                <Settings className="mr-1.5 h-3 w-3" />
                Editar perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-3 p-4">
            <FileText className="h-5 w-5 text-[#60A5FA]" />
            <div>
              <p className="text-xl font-bold font-heading">{profile.stats.solicitudes}</p>
              <p className="text-xs text-muted-foreground">Solicitudes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-3 p-4">
            <MessageSquare className="h-5 w-5 text-success" />
            <div>
              <p className="text-xl font-bold font-heading">{profile.stats.respuestas}</p>
              <p className="text-xs text-muted-foreground">Respuestas</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-3 p-4">
            <Handshake className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xl font-bold font-heading">{profile.stats.deals}</p>
              <p className="text-xs text-muted-foreground">Deals cerrados</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center gap-3 p-4">
            <Star className="h-5 w-5 text-gold fill-gold" />
            <div>
              <p className="text-xl font-bold font-heading">{profile.stats.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Info */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-heading text-base">Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{profile.phone}</span>
              <Lock className="h-3 w-3 text-gold" />
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profile.company}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span className="text-sm">Licencia: {profile.license}</span>
            </div>
            <Separator />
            <div>
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Zonas de operación</p>
              <div className="flex flex-wrap gap-2">
                {profile.zones.map((z) => (
                  <Badge key={z} variant="outline" className="text-xs">
                    <MapPin className="mr-1 h-3 w-3" />
                    {z}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-heading text-base">Reputación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <span className="font-heading text-3xl font-bold">{profile.stats.rating}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(profile.stats.rating)
                        ? "fill-gold text-gold"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({reviews.length} reseñas)</span>
            </div>

            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div key={i} className="rounded-lg bg-background/50 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">— {r.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">&ldquo;{r.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
