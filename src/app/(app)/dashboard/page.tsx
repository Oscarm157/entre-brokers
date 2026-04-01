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
import { createClient } from "@/utils/supabase/server";

const urgencyColors: Record<string, string> = {
  baja: "bg-success/20 text-success",
  normal: "bg-warning/20 text-warning",
  alta: "bg-[#F97316]/20 text-[#F97316]",
  urgente: "bg-urgent/20 text-urgent",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Get broker profile
  const { data: profile } = await supabase
    .from("broker_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get my active solicitudes count
  const { count: solicitudesCount } = await supabase
    .from("solicitudes")
    .select("*", { count: "exact", head: true })
    .eq("broker_id", user.id)
    .eq("status", "active");

  // Get my respuestas count
  const { count: respuestasCount } = await supabase
    .from("respuestas")
    .select("*", { count: "exact", head: true })
    .eq("broker_id", user.id);

  // Get unlocks count
  const { count: unlocksCount } = await supabase
    .from("unlocks")
    .select("*", { count: "exact", head: true })
    .eq("requester_id", user.id);

  // Get recent solicitudes with responses
  const { data: misSolicitudes } = await supabase
    .from("solicitudes")
    .select("*")
    .eq("broker_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(3);

  // Get recent respuestas to my solicitudes
  const { data: respuestasRecibidas } = await supabase
    .from("respuestas")
    .select("*, solicitudes!inner(broker_id, title)")
    .eq("solicitudes.broker_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const firstName = profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "Broker";

  const stats = [
    { label: "Solicitudes activas", value: String(solicitudesCount || 0), icon: FileText, color: "text-[#60A5FA]" },
    { label: "Respuestas enviadas", value: String(respuestasCount || 0), icon: MessageSquare, color: "text-success" },
    { label: "Match promedio", value: "—", icon: Target, color: "text-success" },
    { label: "Contactos desbloqueados", value: String(unlocksCount || 0), icon: Unlock, color: "text-gold" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Bienvenido, {firstName}</h1>
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

      {/* My Solicitudes */}
      <Card className="mt-8 border-border/50 bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading text-lg">Mis Solicitudes Activas</CardTitle>
          <Link href="/solicitudes">
            <Button variant="ghost" size="sm" className="text-xs text-gold">
              Ver todas <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {misSolicitudes && misSolicitudes.length > 0 ? (
            <div className="space-y-3">
              {misSolicitudes.map((s) => (
                <Link key={s.id} href={`/solicitudes/${s.id}`}>
                  <div className="flex items-center justify-between rounded-lg border border-border/30 bg-background/50 p-4 hover:border-gold/20 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{s.title}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{s.zone}</Badge>
                        <Badge className={`text-xs ${urgencyColors[s.urgency] || ""}`}>
                          {s.urgency}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {s.response_count} respuestas
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Ver detalle
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No tienes solicitudes activas aún.</p>
              <Link href="/solicitudes/nueva">
                <Button className="mt-3 bg-gold text-gold-foreground hover:bg-gold/90 text-sm font-semibold">
                  Crear tu primera solicitud
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="mt-8 border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          {respuestasRecibidas && respuestasRecibidas.length > 0 ? (
            <div className="space-y-4">
              {respuestasRecibidas.map((r) => (
                <div key={r.id} className="flex items-start gap-3">
                  <div className="mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Nueva respuesta con match {r.match_score ? `${r.match_score}%` : "—"} en tu solicitud
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Sin actividad reciente. Publica una solicitud o explora las existentes.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
