"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  Plus,
  Crown,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { navItems, type SidebarData } from "./nav-config";

export function AppSidebar({
  userName,
  userEmail,
  tier,
  unreadNotifications = 0,
  unlocksUsedThisMonth = 0,
  unlockLimit = 1,
}: SidebarData) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

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
    <TooltipProvider>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex"
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/20">
            <Building2 className="h-4.5 w-4.5 text-gold-foreground" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap font-heading text-sm font-bold text-primary"
              >
                entre-brokers
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* New solicitud button */}
        <div className="p-3">
          <Tooltip>
            <TooltipTrigger
              render={
                <Link href="/solicitudes/nueva" className="block">
                  <Button className={cn(
                    "w-full bg-gold-gradient text-white hover:opacity-90 font-semibold shadow-gold transition-all",
                    collapsed ? "px-0 justify-center" : ""
                  )}>
                    <Plus className={cn("h-4 w-4", !collapsed && "mr-2")} />
                    {!collapsed && "Nueva Solicitud"}
                  </Button>
                </Link>
              }
            />
            {collapsed && (
              <TooltipContent side="right">Nueva Solicitud</TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const isNotifications = item.href === "/notificaciones";

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger
                  render={
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                        collapsed && "justify-center px-0",
                        !isActive && "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-xl bg-amber-50/80 shadow-sm"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-bar"
                          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gold-gradient"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      <item.icon className={cn(
                        "relative z-10 h-4 w-4 shrink-0",
                        isActive && "text-gold-foreground"
                      )} />

                      {!collapsed && (
                        <span className={cn(
                          "relative z-10 flex-1",
                          isActive && "text-gold-foreground font-medium"
                        )}>
                          {item.label}
                        </span>
                      )}

                      {/* Notification badge */}
                      {isNotifications && unreadNotifications > 0 && (
                        <span className={cn(
                          "relative z-10 flex items-center justify-center rounded-full bg-gold-gradient text-[10px] font-bold text-white",
                          collapsed ? "absolute -top-0.5 -right-0.5 h-4 w-4" : "h-5 min-w-5 px-1"
                        )}>
                          {unreadNotifications > 9 ? "9+" : unreadNotifications}
                        </span>
                      )}
                    </Link>
                  }
                />
                {collapsed && (
                  <TooltipContent side="right">
                    {item.label}
                    {isNotifications && unreadNotifications > 0 && ` (${unreadNotifications})`}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="px-3 pb-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-lg py-2 text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* User + Plan */}
        <div className="border-t border-sidebar-border p-3 space-y-3">
          {/* User row */}
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                }
              />
              {collapsed && (
                <TooltipContent side="right">
                  <p className="font-medium">{userName}</p>
                  <p className="text-muted-foreground">{userEmail}</p>
                </TooltipContent>
              )}
            </Tooltip>

            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Cerrar sesion"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Unlocks remaining */}
          {!collapsed && (
            <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
              <Unlock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {unlocksRemaining === Infinity
                  ? "Desbloqueos ilimitados"
                  : `${unlocksRemaining} desbloqueo${unlocksRemaining !== 1 ? "s" : ""} restante${unlocksRemaining !== 1 ? "s" : ""}`}
              </span>
            </div>
          )}

          {/* Plan CTA */}
          {!collapsed && tier === "free" ? (
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
                {/* Decorative shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
            </Link>
          ) : !collapsed ? (
            <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Crown className="h-3.5 w-3.5 text-gold" />
                <span className="font-medium">Plan {tier === "pro" ? "Pro" : "Enterprise"}</span>
              </div>
              <Link href="/pricing" className="text-[10px] font-medium text-gold-foreground hover:underline">
                Gestionar
              </Link>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Link href="/pricing" className="flex justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15">
                      <Crown className="h-3.5 w-3.5 text-gold-foreground" />
                    </div>
                  </Link>
                }
              />
              <TooltipContent side="right">
                Plan {tier === "free" ? "Free" : tier === "pro" ? "Pro" : "Enterprise"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
