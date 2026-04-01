import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AppSidebar } from "@/components/dashboard/sidebar";

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

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        userName={profile?.full_name || user.email?.split("@")[0] || "Broker"}
        userEmail={user.email || ""}
        avatarUrl={profile?.avatar_url}
        tier={profile?.subscription_tier || "free"}
      />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
