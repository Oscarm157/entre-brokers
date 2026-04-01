"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/solicitudes", label: "Mis Solicitudes", icon: FileText },
  { href: "/explorar", label: "Explorar", icon: Search },
  { href: "/respuestas", label: "Mis Respuestas", icon: MessageSquare },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell, badge: 3 },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <Building2 className="h-5 w-5 text-gold" />
        <span className="font-heading text-sm font-bold">entre-brokers</span>
      </div>

      {/* New solicitud button */}
      <div className="p-4">
        <Link href="/solicitudes/nueva">
          <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
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
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge className="h-5 min-w-5 justify-center bg-urgent px-1.5 text-xs text-white">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Plan indicator */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/50">
            <Crown className="h-3.5 w-3.5" />
            <span>Plan Free</span>
          </div>
          <Link href="/pricing" className="text-xs text-gold hover:underline">
            Upgrade
          </Link>
        </div>
      </div>
    </aside>
  );
}
