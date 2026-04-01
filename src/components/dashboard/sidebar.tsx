"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  FileText,
  Search,
  MessageSquare,
  Bell,
  User,
  Plus,
  Crown,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/solicitudes", label: "Mis Solicitudes", icon: FileText },
  { href: "/explorar", label: "Explorar", icon: Search },
  { href: "/respuestas", label: "Mis Respuestas", icon: MessageSquare },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/perfil", label: "Perfil", icon: User },
];

interface AppSidebarProps {
  userName: string;
  userEmail: string;
  avatarUrl?: string | null;
  tier: string;
}

export function AppSidebar({ userName, userEmail, tier }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20">
          <Building2 className="h-4 w-4 text-gold-foreground" />
        </div>
        <span className="font-heading text-sm font-bold text-primary">entre-brokers</span>
      </div>

      {/* New solicitud button */}
      <div className="p-4">
        <Link href="/solicitudes/nueva">
          <Button className="w-full bg-gold-gradient text-white hover:opacity-90 font-semibold shadow-gold">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Solicitud
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                isActive
                  ? "bg-amber-50 text-gold-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + Plan */}
      <div className="border-t border-sidebar-border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Crown className="h-3.5 w-3.5" />
            <span>Plan {tier === "free" ? "Free" : tier === "pro" ? "Pro" : "Enterprise"}</span>
          </div>
          <Link href="/pricing" className="text-xs font-medium text-gold-foreground hover:underline">
            Upgrade
          </Link>
        </div>
      </div>
    </aside>
  );
}
