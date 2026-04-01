import { createClient } from "@/utils/supabase/server";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { StatCards, type StatItem } from "@/components/dashboard/stat-cards";
import { SolicitudesList, type SolicitudItem } from "@/components/dashboard/solicitudes-list";
import { ActivityFeed, type ActivityItem } from "@/components/dashboard/activity-feed";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch all data in parallel
  const [
    { data: profile },
    { count: solicitudesCount },
    { count: respuestasCount },
    { count: unlocksCount },
    { data: misSolicitudes },
    { data: respuestasRecibidas },
  ] = await Promise.all([
    supabase.from("broker_profiles").select("*").eq("id", user.id).single(),
    supabase.from("solicitudes").select("*", { count: "exact", head: true }).eq("broker_id", user.id).eq("status", "active"),
    supabase.from("respuestas").select("*", { count: "exact", head: true }).eq("broker_id", user.id),
    supabase.from("unlocks").select("*", { count: "exact", head: true }).eq("requester_id", user.id),
    supabase.from("solicitudes").select("*").eq("broker_id", user.id).eq("status", "active").order("created_at", { ascending: false }).limit(3),
    supabase.from("respuestas").select("*, solicitudes!inner(broker_id, title)").eq("solicitudes.broker_id", user.id).order("created_at", { ascending: false }).limit(5),
  ]);

  const firstName = profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "Broker";

  const stats: StatItem[] = [
    { label: "Solicitudes activas", value: String(solicitudesCount || 0), iconName: "FileText", accentColor: "text-indigo-500", accentBg: "bg-indigo-500/10" },
    { label: "Respuestas enviadas", value: String(respuestasCount || 0), iconName: "MessageSquare", accentColor: "text-accent", accentBg: "bg-accent/10" },
    { label: "Match promedio", value: "—", iconName: "Target", accentColor: "text-gold-foreground", accentBg: "bg-gold/15" },
    { label: "Contactos desbloqueados", value: String(unlocksCount || 0), iconName: "Unlock", accentColor: "text-gold", accentBg: "bg-gold/15" },
  ];

  const solicitudes: SolicitudItem[] = (misSolicitudes || []).map((s) => ({
    id: s.id,
    title: s.title,
    zone: s.zone,
    urgency: s.urgency,
    response_count: s.response_count ?? 0,
  }));

  const activities: ActivityItem[] = (respuestasRecibidas || []).map((r) => ({
    id: r.id,
    match_score: r.match_score,
    created_at: r.created_at,
    solicitud_title: (r.solicitudes as { title: string })?.title || "Solicitud",
  }));

  return (
    <div className="space-y-8">
      <WelcomeHeader firstName={firstName} />
      <StatCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SolicitudesList solicitudes={solicitudes} />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
