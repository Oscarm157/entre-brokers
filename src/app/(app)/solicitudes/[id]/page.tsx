"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  Calendar,
  DollarSign,
  Maximize2,
  BedDouble,
  Bath,
  Lock,
  ThumbsUp,
  ThumbsDown,
  Flag,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { use } from "react";

const solicitud = {
  id: "1",
  title: "Departamento en Polanco, 2-3 recámaras",
  operation: "Compra",
  urgency: "Alta",
  zone: "Polanco",
  budget_min: 2000000,
  budget_max: 3500000,
  property_type: "Departamento",
  min_m2: 80,
  max_m2: 120,
  bedrooms: "2-3",
  bathrooms: 2,
  features: ["Estacionamiento", "Seguridad 24h", "Amenidades"],
  description:
    "Mi cliente busca un departamento moderno en la zona de Polanco, de preferencia cerca de Masaryk. Necesita mínimo 2 recámaras (ideal 3), estacionamiento incluido y seguridad. Tiene preaprobación bancaria y puede cerrar en máximo 45 días.",
  broker: { name: "María González", company: "Century 21 Polanco", initials: "MG", verified: true },
  created: "15 Mar 2026",
  expires: "14 Abr 2026",
  responses: 8,
};

const respuestas = [
  {
    id: "r1",
    broker: { name: "Carlos Ramírez", initials: "CR", verified: true },
    zone: "Polanco",
    price: 2800000,
    area: 95,
    bedrooms: 2,
    bathrooms: 2,
    match: 92,
    status: "pending",
    description: "Depa recién remodelado en Homero, 2 rec + estudio, vista a parque.",
  },
  {
    id: "r2",
    broker: { name: "Ana Torres", initials: "AT", verified: true },
    zone: "Polanco",
    price: 3200000,
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    match: 85,
    status: "interested",
    description: "3 recámaras en Campos Elíseos, amenidades completas, listo para escriturar.",
  },
  {
    id: "r3",
    broker: { name: "Roberto Mendoza", initials: "RM", verified: false },
    zone: "Polanco",
    price: 2500000,
    area: 75,
    bedrooms: 2,
    bathrooms: 1,
    match: 71,
    status: "pending",
    description: "2 rec en Horacio, piso 8, buena luz. Solo 1 baño pero precio competitivo.",
  },
];

const urgencyStyles: Record<string, { bg: string; text: string }> = {
  Baja: { bg: "bg-accent/10", text: "text-accent" },
  Normal: { bg: "bg-gold/15", text: "text-gold-foreground" },
  Alta: { bg: "bg-warning/15", text: "text-warning" },
  Urgente: { bg: "bg-urgent/15", text: "text-urgent" },
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);
}

function matchColor(score: number) {
  if (score >= 85) return { bg: "bg-gold/15", text: "text-gold-foreground", ring: "ring-gold/30" };
  if (score >= 70) return { bg: "bg-accent/10", text: "text-accent", ring: "ring-accent/30" };
  return { bg: "bg-secondary", text: "text-muted-foreground", ring: "ring-border" };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function SolicitudDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const urgency = urgencyStyles[solicitud.urgency] || urgencyStyles.Normal;

  return (
    <div>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <Link href="/solicitudes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Mis Solicitudes
        </Link>
      </motion.div>

      {/* Main solicitud */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        className="rounded-2xl bg-white/80 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight">{solicitud.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium">{solicitud.operation}</span>
              <span className={cn("rounded-lg px-3 py-1 text-sm font-semibold", urgency.bg, urgency.text)}>
                {solicitud.urgency}
              </span>
              <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium">{solicitud.zone}</span>
              <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium">{solicitud.property_type}</span>
            </div>
          </div>
          <Link href={`/solicitudes/${id}/responder`}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button className="h-12 gap-2 rounded-xl bg-gold-gradient px-8 text-base font-semibold text-white shadow-gold hover:opacity-90">
                Responder con una propiedad
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Broker info */}
        <div className="mt-6 flex items-center gap-4 rounded-xl bg-secondary/40 px-5 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {solicitud.broker.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold">{solicitud.broker.name}</span>
              {solicitud.broker.verified && <ShieldCheck className="h-4 w-4 text-accent" />}
            </div>
            <p className="text-sm text-muted-foreground">{solicitud.broker.company}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-gold" />
            Contacto bloqueado
          </div>
        </div>

        {/* Details grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: DollarSign, label: "Presupuesto", value: `${formatCurrency(solicitud.budget_min)} – ${formatCurrency(solicitud.budget_max)}`, color: "text-gold-foreground", bg: "bg-gold/10" },
            { icon: Maximize2, label: "Superficie", value: `${solicitud.min_m2} – ${solicitud.max_m2} m²`, color: "text-indigo-500", bg: "bg-indigo-500/10" },
            { icon: BedDouble, label: "Recámaras / Baños", value: `${solicitud.bedrooms} rec · ${solicitud.bathrooms} baños`, color: "text-purple-500", bg: "bg-purple-500/10" },
            { icon: Calendar, label: "Vigencia", value: `${solicitud.created} — ${solicitud.expires}`, color: "text-muted-foreground", bg: "bg-secondary" },
          ].map((detail) => (
            <div key={detail.label} className="rounded-xl bg-secondary/30 p-4">
              <div className={cn("mb-2 flex h-9 w-9 items-center justify-center rounded-lg", detail.bg)}>
                <detail.icon className={cn("h-4 w-4", detail.color)} />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{detail.label}</p>
              <p className="mt-0.5 text-base font-semibold">{detail.value}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-5 flex flex-wrap gap-2">
          {solicitud.features.map((f) => (
            <span key={f} className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {f}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {solicitud.description}
        </p>

        <p className="mt-5 text-sm font-medium text-foreground">
          {solicitud.responses} brokers han respondido
        </p>
      </motion.div>

      {/* Responses */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.2 }}
      >
        <h2 className="font-heading text-xl font-bold">Respuestas recibidas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Solo visibles para el creador de la solicitud
        </p>

        <motion.div
          className="mt-6 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {respuestas.map((r) => {
            const colors = matchColor(r.match);
            return (
              <motion.div
                key={r.id}
                variants={itemVariants}
                whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="group rounded-2xl bg-white/80 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start gap-5">
                  {/* Match circle */}
                  <div className={cn(
                    "flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full ring-2",
                    colors.bg, colors.text, colors.ring
                  )}>
                    <span className="font-heading text-lg font-bold">{r.match}%</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-70">match</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {r.broker.initials}
                      </div>
                      <span className="text-base font-semibold">{r.broker.name}</span>
                      {r.broker.verified && <ShieldCheck className="h-4 w-4 text-accent" />}
                      {r.status === "interested" && (
                        <span className="rounded-lg bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                          Interesado
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-base text-muted-foreground leading-relaxed">{r.description}</p>

                    {/* Property details */}
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <span className="font-heading text-base font-bold text-gold-foreground">
                        {formatCurrency(r.price)}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {r.zone}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Maximize2 className="h-3.5 w-3.5" /> {r.area} m²
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <BedDouble className="h-3.5 w-3.5" /> {r.bedrooms} rec
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Bath className="h-3.5 w-3.5" /> {r.bathrooms} baños
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      <Button className="h-10 gap-2 rounded-xl bg-gold-gradient px-6 text-sm font-semibold text-white shadow-gold hover:opacity-90">
                        <Lock className="h-4 w-4" />
                        Desbloquear
                      </Button>
                    </motion.div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-accent hover:text-accent">
                        <ThumbsUp className="h-4 w-4" /> Interesa
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground">
                        <ThumbsDown className="h-4 w-4" /> No
                      </Button>
                      <Button variant="ghost" size="sm" className="px-2 text-muted-foreground">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
