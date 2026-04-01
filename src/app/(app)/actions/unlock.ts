"use server";

import { createClient } from "@/utils/supabase/server";

const PLAN_LIMITS: Record<string, number> = {
  free: 1,
  pro: 15,
  enterprise: Infinity,
};

export type UnlockCheckResult =
  | { status: "already_unlocked"; phone: string | null; email: string | null; name: string }
  | { status: "has_plan_unlocks"; remaining: number }
  | { status: "needs_payment"; price: number; currency: string }
  | { status: "error"; message: string };

export type UnlockProcessResult =
  | { status: "success"; phone: string | null; email: string | null; name: string }
  | { status: "error"; message: string };

export async function checkUnlockStatus(
  targetBrokerId: string,
  respuestaId?: string,
  solicitudId?: string,
): Promise<UnlockCheckResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { status: "error", message: "No autenticado" };

  // Check if already unlocked
  let query = supabase
    .from("unlocks")
    .select("id")
    .eq("requester_id", user.id)
    .eq("target_id", targetBrokerId);

  if (respuestaId) query = query.eq("respuesta_id", respuestaId);
  if (solicitudId) query = query.eq("solicitud_id", solicitudId);

  const { data: existing } = await query.limit(1);

  if (existing && existing.length > 0) {
    // Already unlocked — fetch contact info
    const { data: target } = await supabase
      .from("broker_profiles")
      .select("full_name, phone")
      .eq("id", targetBrokerId)
      .single();

    return {
      status: "already_unlocked",
      phone: target?.phone ?? null,
      email: null, // email comes from auth.users, not accessible from client
      name: target?.full_name ?? "Broker",
    };
  }

  // Get requester tier
  const { data: profile } = await supabase
    .from("broker_profiles")
    .select("subscription_tier")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier || "free";
  const limit = PLAN_LIMITS[tier] ?? 1;

  // Count unlocks this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("unlocks")
    .select("*", { count: "exact", head: true })
    .eq("requester_id", user.id)
    .gte("created_at", startOfMonth.toISOString());

  const used = count ?? 0;

  if (used < limit) {
    return { status: "has_plan_unlocks", remaining: limit - used };
  }

  return { status: "needs_payment", price: 99, currency: "MXN" };
}

export async function processUnlock(
  targetBrokerId: string,
  paymentMethod: "plan_included" | "simulated",
  respuestaId?: string,
  solicitudId?: string,
): Promise<UnlockProcessResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { status: "error", message: "No autenticado" };

  const amount = paymentMethod === "plan_included" ? 0 : 99;

  // Insert unlock record
  const { error: insertError } = await supabase.from("unlocks").insert({
    requester_id: user.id,
    target_id: targetBrokerId,
    respuesta_id: respuestaId || null,
    solicitud_id: solicitudId || null,
    amount,
    currency: "MXN",
    payment_method: paymentMethod,
  });

  if (insertError) {
    return { status: "error", message: "Error al procesar el desbloqueo" };
  }

  // Fetch target contact info
  const { data: target } = await supabase
    .from("broker_profiles")
    .select("full_name, phone")
    .eq("id", targetBrokerId)
    .single();

  // Create notification for the target broker
  await supabase.from("notifications").insert({
    user_id: targetBrokerId,
    type: "unlock",
    title: "Contacto desbloqueado",
    body: `Un broker ha desbloqueado tu contacto`,
    data: { requester_id: user.id, solicitud_id: solicitudId },
    read: false,
  });

  return {
    status: "success",
    phone: target?.phone ?? null,
    email: null,
    name: target?.full_name ?? "Broker",
  };
}
