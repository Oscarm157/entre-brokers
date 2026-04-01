import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { MobileHeader } from "@/components/dashboard/mobile-header";

function getUnlockLimit(tier: string): number {
  if (tier === "enterprise") return Infinity;
  if (tier === "pro") return 15;
  return 1;
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get broker profile
  const { data: profile } = await supabase
    .from("broker_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const tier = profile?.subscription_tier || "free";

  // Count unlocks used this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: unlocksUsedThisMonth } = await supabase
    .from("unlocks")
    .select("*", { count: "exact", head: true })
    .eq("requester_id", user.id)
    .gte("created_at", startOfMonth.toISOString());

  // Count unread notifications
  const { count: unreadNotifications } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("read", false);

  const sidebarData = {
    userName: profile?.full_name || user.email?.split("@")[0] || "Broker",
    userEmail: user.email || "",
    avatarUrl: profile?.avatar_url,
    tier,
    unreadNotifications: unreadNotifications ?? 0,
    unlocksUsedThisMonth: unlocksUsedThisMonth ?? 0,
    unlockLimit: getUnlockLimit(tier),
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <MobileHeader {...sidebarData} />
      <AppSidebar {...sidebarData} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
      </main>
    </div>
  );
}
