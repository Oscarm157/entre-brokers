import {
  LayoutDashboard,
  FileText,
  Search,
  MessageSquare,
  Bell,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/solicitudes", label: "Mis Solicitudes", icon: FileText },
  { href: "/explorar", label: "Explorar", icon: Search },
  { href: "/respuestas", label: "Mis Respuestas", icon: MessageSquare },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/perfil", label: "Perfil", icon: User },
];

export interface SidebarData {
  userName: string;
  userEmail: string;
  avatarUrl?: string | null;
  tier: string;
  unreadNotifications: number;
  unlocksUsedThisMonth: number;
  unlockLimit: number; // 1 for free, 15 for pro, Infinity for enterprise
}
