import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, MessageSquare, Clock, Eye } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

const urgencyColors: Record<string, string> = {
  baja: "bg-teal-50 text-success",
  normal: "bg-warning/20 text-warning",
  alta: "bg-orange-50 text-orange-500",
  urgente: "bg-urgent/20 text-urgent",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Activa", className: "bg-teal-50 text-success" },
  paused: { label: "Pausada", className: "bg-warning/20 text-warning" },
  closed: { label: "Cerrada", className: "bg-muted text-muted-foreground" },
  expired: { label: "Expirada", className: "bg-urgent/20 text-urgent" },
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

export default async function MisSolicitudesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: solicitudes } = await supabase
    .from("solicitudes")
    .select("*")
    .eq("broker_id", user!.id)
    .order("created_at", { ascending: false });

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
          <Button className="bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {solicitudes && solicitudes.length > 0 ? (
          solicitudes.map((s) => (
            <Card key={s.id} className="border-border bg-white shadow-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/solicitudes/${s.id}`} className="hover:text-gold transition-colors">
                      <h3 className="font-heading text-base font-semibold">{s.title}</h3>
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">{s.operation_type}</Badge>
                      <Badge className={`text-xs ${urgencyColors[s.urgency] || ""}`}>{s.urgency}</Badge>
                      <Badge variant="outline" className="text-xs">{s.zone}</Badge>
                      <Badge className={`text-xs ${statusConfig[s.status]?.className || ""}`}>
                        {statusConfig[s.status]?.label || s.status}
                      </Badge>
                    </div>
                  </div>
                  <Link href={`/solicitudes/${s.id}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Eye className="mr-1 h-3 w-3" />
                      Ver respuestas ({s.response_count})
                    </Button>
                  </Link>
                </div>

                <div className="mt-3 flex items-center gap-6 text-xs text-muted-foreground">
                  <span className="text-gold-foreground font-medium">
                    {s.budget_min ? formatCurrency(s.budget_min) + " - " : ""}
                    {formatCurrency(s.budget_max)}
                  </span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {s.response_count} respuestas
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(s.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No tienes solicitudes aún.</p>
            <Link href="/solicitudes/nueva">
              <Button className="mt-4 bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold">
                Crear tu primera solicitud
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
