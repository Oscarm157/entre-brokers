import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShieldCheck, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

const urgencyColors: Record<string, string> = {
  baja: "bg-success/20 text-success",
  normal: "bg-warning/20 text-warning",
  alta: "bg-[#F97316]/20 text-[#F97316]",
  urgente: "bg-urgent/20 text-urgent",
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "hace menos de 1h";
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

export default async function ExplorarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get all active solicitudes (excluding own)
  const { data: solicitudes } = await supabase
    .from("solicitudes")
    .select("*, broker_profiles(full_name, verified, avatar_url)")
    .eq("status", "active")
    .neq("broker_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(20);

  // If no solicitudes from others, show all active (including own for demo)
  const { data: allSolicitudes } = !solicitudes?.length
    ? await supabase
        .from("solicitudes")
        .select("*, broker_profiles(full_name, verified, avatar_url)")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(20)
    : { data: null };

  const displaySolicitudes = solicitudes?.length ? solicitudes : allSolicitudes;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Explorar Solicitudes</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Encuentra solicitudes que coincidan con tu inventario y responde con tus propiedades.
      </p>

      {/* Solicitudes list */}
      <div className="mt-6 space-y-4">
        {displaySolicitudes && displaySolicitudes.length > 0 ? (
          displaySolicitudes.map((s) => {
            const broker = s.broker_profiles as { full_name: string; verified: boolean; avatar_url: string | null } | null;
            const initials = broker?.full_name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "?";

            return (
              <Card key={s.id} className="border-border/50 bg-card/50 transition-all hover:border-gold/20">
                <CardContent className="flex items-center gap-6 p-5">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/solicitudes/${s.id}`}>
                      <h3 className="font-heading text-base font-semibold hover:text-gold transition-colors">
                        {s.title}
                      </h3>
                    </Link>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">{s.operation_type}</Badge>
                      <Badge className={`text-xs ${urgencyColors[s.urgency] || ""}`}>{s.urgency}</Badge>
                      <Badge variant="outline" className="text-xs">{s.zone}</Badge>
                    </div>

                    <p className="mt-2 text-sm text-gold font-medium">
                      {s.budget_min ? formatCurrency(s.budget_min) + " - " : "Hasta "}
                      {formatCurrency(s.budget_max)}
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px] bg-primary/50">{initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{broker?.full_name || "Broker"}</span>
                        {broker?.verified && <ShieldCheck className="h-3 w-3 text-success" />}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {timeAgo(s.created_at)}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {s.response_count} respuestas
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
            );
          })
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No hay solicitudes activas por ahora.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sé el primero en publicar una solicitud y recibe respuestas de otros brokers.
            </p>
            <Link href="/solicitudes/nueva">
              <Button className="mt-4 bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
                Crear solicitud
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
