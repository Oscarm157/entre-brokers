import { createClient } from "@/utils/supabase/server";
import { SolicitudesPageClient, type SolicitudPageItem } from "@/components/solicitud/solicitudes-page-client";

export default async function MisSolicitudesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: raw } = await supabase
    .from("solicitudes")
    .select("*")
    .eq("broker_id", user!.id)
    .order("created_at", { ascending: false });

  const solicitudes: SolicitudPageItem[] = (raw || []).map((s) => ({
    id: s.id,
    title: s.title,
    operation_type: s.operation_type,
    urgency: s.urgency,
    zone: s.zone,
    status: s.status,
    budget_min: s.budget_min,
    budget_max: s.budget_max,
    response_count: s.response_count ?? 0,
    created_at: s.created_at,
  }));

  return <SolicitudesPageClient solicitudes={solicitudes} />;
}
