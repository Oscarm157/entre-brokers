import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Unlock, MessageSquare, Bell, CheckCheck } from "lucide-react";
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

const typeConfig: Record<string, { icon: typeof Target; color: string }> = {
  match: { icon: Target, color: "text-success bg-teal-50" },
  unlock: { icon: Unlock, color: "text-gold bg-gold/10" },
  response: { icon: MessageSquare, color: "text-indigo-500 bg-[#60A5FA]/10" },
  system: { icon: Bell, color: "text-muted-foreground bg-muted" },
};

export default function NotificacionesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Notificaciones</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Mantente al día con tus matches, respuestas y más.
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          <CheckCheck className="mr-1.5 h-3.5 w-3.5" />
          Marcar todas como leídas
        </Button>
      </div>

      <div className="mt-8 space-y-8">
        {notifications.map((group) => (
          <div key={group.date}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.date}
            </h3>
            <div className="space-y-2">
              {group.items.map((n) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;
                return (
                  <Link key={n.id} href={n.link || "#"}>
                    <Card
                      className={`border-border transition-all hover:border-gold/20 ${
                        !n.read ? "bg-card/80" : "bg-white"
                      }`}
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{n.title}</p>
                            {!n.read && (
                              <div className="h-2 w-2 rounded-full bg-gold" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{n.body}</p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
