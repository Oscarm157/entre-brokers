"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  Menu,
  Plus,
  Crown,
  LogOut,
  Sparkles,
  Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { navItems, type SidebarData } from "./nav-config";

export function MobileHeader({
  userName,
  userEmail,
  tier,
  unreadNotifications = 0,
  unlocksUsedThisMonth = 0,
  unlockLimit = 1,
}: SidebarData) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const unlocksRemaining = unlockLimit === Infinity ? Infinity : Math.max(0, unlockLimit - unlocksUsedThisMonth);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar/95 px-4 backdrop-blur-md lg:hidden">
      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary">
                <Menu className="h-5 w-5" />
              </button>
            }
          />
          <SheetContent side="left" className="w-72 p-0" showCloseButton={false}>
            {/* Drawer header */}
            <SheetHeader className="border-b border-sidebar-border px-5 py-4">
              <SheetTitle>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20">
                    <Building2 className="h-4 w-4 text-gold-foreground" />
                  </div>
                  <span className="font-heading text-sm font-bold text-primary">entre-brokers</span>
                </div>
              </SheetTitle>
            </SheetHeader>

            {/* New solicitud */}
            <div className="p-3">
              <SheetClose
                render={
                  <Link href="/solicitudes/nueva" className="block">
                    <Button className="w-full bg-gold-gradient text-white hover:opacity-90 font-semibold shadow-gold">
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva Solicitud
                    </Button>
                  </Link>
                }
              />
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const isNotifications = item.href === "/notificaciones";

                return (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                          isActive
                            ? "bg-amber-50/80 text-gold-foreground font-medium"
                            : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gold-gradient" />
                        )}
                        <item.icon className={cn("h-4 w-4", isActive && "text-gold-foreground")} />
                        <span className="flex-1">{item.label}</span>
                        {isNotifications && unreadNotifications > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-gradient px-1 text-[10px] font-bold text-white">
                            {unreadNotifications > 9 ? "9+" : unreadNotifications}
                          </span>
                        )}
                      </Link>
                    }
                  />
                );
              })}
            </nav>

            {/* Footer */}
            <div className="mt-auto border-t border-sidebar-border p-3 space-y-3">
              {/* Unlocks */}
              <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
                <Unlock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {unlocksRemaining === Infinity
                    ? "Desbloqueos ilimitados"
                    : `${unlocksRemaining} desbloqueo${unlocksRemaining !== 1 ? "s" : ""} restante${unlocksRemaining !== 1 ? "s" : ""}`}
                </span>
              </div>

              {/* Plan CTA */}
              {tier === "free" ? (
                <SheetClose
                  render={
                    <Link href="/pricing" className="block">
                      <div className="group relative overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-br from-amber-50/80 to-orange-50/40 px-3 py-3 transition-all hover:border-gold/50 hover:shadow-gold">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-gradient">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gold-foreground">Mejora tu plan</p>
                            <p className="text-[10px] text-muted-foreground">15 desbloqueos/mes desde $499</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      </div>
                    </Link>
                  }
                />
              ) : (
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Crown className="h-3.5 w-3.5 text-gold" />
                    <span className="font-medium">Plan {tier === "pro" ? "Pro" : "Enterprise"}</span>
                  </div>
                  <SheetClose
                    render={
                      <Link href="/pricing" className="text-[10px] font-medium text-gold-foreground hover:underline">
                        Gestionar
                      </Link>
                    }
                  />
                </div>
              )}

              {/* User */}
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
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/20">
            <Building2 className="h-3.5 w-3.5 text-gold-foreground" />
          </div>
          <span className="font-heading text-sm font-bold text-primary">entre-brokers</span>
        </div>
      </div>

      {/* Right: avatar */}
      <Link href="/perfil">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
