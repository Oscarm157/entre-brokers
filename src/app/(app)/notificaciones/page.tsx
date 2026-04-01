"use client";

import { motion } from "motion/react";
import { Target, Unlock, MessageSquare, Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Notification {
  id: string;
  type: "match" | "unlock" | "response" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: string;
}

const notifications: { date: string; items: Notification[] }[] = [
  {
    date: "Hoy",
    items: [
      {
        id: "1",
        type: "match",
        title: "Nuevo match 92%",
        body: "María G. respondió a tu solicitud 'Depa Polanco 2-3 rec'",
        time: "hace 15 min",
        read: false,
        link: "/solicitudes/1",
      },
      {
        id: "2",
        type: "unlock",
        title: "Contacto desbloqueado",
        body: "Roberto M. desbloqueó tu contacto",
        time: "hace 2 horas",
        read: false,
        link: "/perfil",
      },
      {
        id: "3",
        type: "response",
        title: "Nueva respuesta",
        body: "Nueva respuesta en 'Oficina Santa Fe 200m²'",
        time: "hace 4 horas",
        read: true,
        link: "/solicitudes/2",
      },
    ],
  },
  {
    date: "Ayer",
    items: [
      {
        id: "4",
        type: "match",
        title: "Match 85%",
        body: "Match en tu solicitud de casa en Coyoacán",
        time: "ayer",
        read: true,
        link: "/solicitudes/3",
      },
      {
        id: "5",
        type: "system",
        title: "Solicitud por expirar",
        body: "Tu solicitud 'Terreno Querétaro' expira en 5 días",
        time: "ayer",
        read: true,
        link: "/solicitudes/4",
      },
    ],
  },
  {
    date: "Esta semana",
    items: [
      {
        id: "6",
        type: "response",
        title: "2 nuevas respuestas",
        body: "Recibiste 2 respuestas en 'Depa Condesa para renta'",
        time: "hace 3 días",
        read: true,
        link: "/solicitudes/5",
      },
      {
        id: "7",
        type: "system",
        title: "Bienvenido a entre-brokers",
        body: "Completa tu perfil para recibir mejores matches",
        time: "hace 5 días",
        read: true,
        link: "/perfil",
      },
    ],
  },
];

const typeConfig: Record<string, { icon: typeof Target; color: string; iconColor: string }> = {
  match: { icon: Target, color: "bg-accent/10", iconColor: "text-accent" },
  unlock: { icon: Unlock, color: "bg-gold/15", iconColor: "text-gold-foreground" },
  response: { icon: MessageSquare, color: "bg-indigo-500/10", iconColor: "text-indigo-500" },
  system: { icon: Bell, color: "bg-secondary", iconColor: "text-muted-foreground" },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function NotificacionesPage() {
  return (
    <div>
      {/* Header */}
      <motion.div
        className="flex items-end justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
      >
        <div>
          <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Centro de actividad
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Notificaciones
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            Mantente al día con tus matches, respuestas y más.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Button variant="ghost" className="gap-2 text-sm text-muted-foreground hover:text-foreground">
            <CheckCheck className="h-4 w-4" />
            Marcar todas como leídas
          </Button>
        </motion.div>
      </motion.div>

      {/* Notification groups */}
      <div className="mt-8 space-y-8">
        {notifications.map((group, groupIndex) => (
          <motion.div
            key={group.date}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: groupIndex * 0.1 }}
          >
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group.date}
            </h3>
            <motion.div
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {group.items.map((n) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;
                return (
                  <motion.div key={n.id} variants={itemVariants}>
                    <Link href={n.link || "#"}>
                      <motion.div
                        whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                        className={cn(
                          "group flex items-center gap-5 rounded-2xl p-5 transition-all",
                          !n.read
                            ? "bg-gold/[0.04] shadow-[0_2px_12px_rgba(252,195,85,0.08)]"
                            : "bg-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]",
                          "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                        )}
                      >
                        {/* Icon */}
                        <div className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                          config.color
                        )}>
                          <Icon className={cn("h-5 w-5", config.iconColor)} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <p className="text-base font-semibold text-foreground group-hover:text-gold-foreground transition-colors">
                              {n.title}
                            </p>
                            {!n.read && (
                              <motion.div
                                className="h-2.5 w-2.5 rounded-full bg-gold"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" as const, stiffness: 500, damping: 20 }}
                              />
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                        </div>

                        {/* Time */}
                        <span className="shrink-0 text-sm text-muted-foreground">{n.time}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
