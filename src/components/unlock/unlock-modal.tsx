"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  Unlock,
  Phone,
  Mail,
  Copy,
  Check,
  Crown,
  Zap,
  Loader2,
  Sparkles,
  Shield,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  checkUnlockStatus,
  processUnlock,
  type UnlockCheckResult,
} from "@/app/(app)/actions/unlock";

type ModalState = "checking" | "decision" | "confirm" | "processing" | "success" | "error";

interface UnlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetBrokerId: string;
  targetBrokerName: string;
  respuestaId?: string;
  solicitudId?: string;
  onUnlocked?: (contact: { phone: string | null; email: string | null }) => void;
}

export function UnlockModal({
  open,
  onOpenChange,
  targetBrokerId,
  targetBrokerName,
  respuestaId,
  solicitudId,
  onUnlocked,
}: UnlockModalProps) {
  const [state, setState] = useState<ModalState>("checking");
  const [checkResult, setCheckResult] = useState<UnlockCheckResult | null>(null);
  const [contact, setContact] = useState<{ phone: string | null; email: string | null } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const runCheck = useCallback(async () => {
    setState("checking");
    const result = await checkUnlockStatus(targetBrokerId, respuestaId, solicitudId);
    setCheckResult(result);

    if (result.status === "already_unlocked") {
      setContact({ phone: result.phone, email: result.email });
      setState("success");
    } else if (result.status === "has_plan_unlocks") {
      setState("confirm");
    } else if (result.status === "needs_payment") {
      setState("decision");
    } else {
      setErrorMsg(result.message);
      setState("error");
    }
  }, [targetBrokerId, respuestaId, solicitudId]);

  useEffect(() => {
    if (open) {
      runCheck();
    } else {
      // Reset on close
      setState("checking");
      setCheckResult(null);
      setContact(null);
      setCopiedField(null);
      setErrorMsg("");
    }
  }, [open, runCheck]);

  async function handleUnlock(method: "plan_included" | "simulated") {
    setState("processing");
    const result = await processUnlock(targetBrokerId, method, respuestaId, solicitudId);

    if (result.status === "success") {
      setContact({ phone: result.phone, email: result.email });
      setState("success");
      onUnlocked?.({ phone: result.phone, email: result.email });
    } else {
      setErrorMsg(result.message);
      setState("error");
    }
  }

  function handleCopy(value: string, field: string) {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <AnimatePresence mode="wait">
          {/* CHECKING */}
          {state === "checking" && (
            <motion.div
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="text-sm text-muted-foreground">Verificando disponibilidad...</p>
            </motion.div>
          )}

          {/* DECISION — needs payment */}
          {state === "decision" && (
            <motion.div
              key="decision"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/15">
                    <Lock className="h-4 w-4 text-gold-foreground" />
                  </div>
                  Desbloquear contacto
                </DialogTitle>
                <DialogDescription>
                  Conecta directamente con <span className="font-medium text-foreground">{targetBrokerName}</span> y cierra el trato
                </DialogDescription>
              </DialogHeader>

              {/* Social proof / urgency bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50/80 px-3 py-2"
              >
                <TrendingUp className="h-3.5 w-3.5 shrink-0 text-gold-foreground" />
                <p className="text-[11px] text-gold-foreground">
                  <span className="font-semibold">8 brokers</span> ya respondieron a esta solicitud. No pierdas la oportunidad.
                </p>
              </motion.div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {/* Per-unlock option */}
                <button
                  onClick={() => handleUnlock("simulated")}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-gold/50 hover:shadow-gold"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15">
                    <Zap className="h-5 w-5 text-gold-foreground" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Desbloqueo individual</p>
                  <p className="mt-1 text-xs text-muted-foreground">Acceso inmediato a un contacto</p>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                      <span>Telefono y email del broker</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                      <span>Contacto directo sin intermediarios</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" />
                      <span>Pago unico, sin suscripcion</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <p className="font-heading text-2xl font-bold text-gold-foreground">
                      $99 <span className="text-xs font-normal text-muted-foreground">MXN</span>
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-xs font-semibold text-foreground transition-colors group-hover:bg-gold/15 group-hover:text-gold-foreground">
                      Desbloquear ahora
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/5 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>

                {/* Pro plan option — highlighted */}
                <a
                  href="/pricing"
                  className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-gold/40 bg-gradient-to-br from-amber-50/80 to-orange-50/30 p-4 text-left transition-all hover:border-gold/70 hover:shadow-gold"
                >
                  <div className="absolute -top-px right-3">
                    <span className="rounded-b-lg bg-gold-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Mejor valor
                    </span>
                  </div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold-gradient shadow-gold">
                    <Crown className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Plan Pro</p>
                  <p className="mt-1 text-xs text-muted-foreground">Todo lo que necesitas para cerrar tratos</p>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-foreground">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-gold-foreground" />
                      <span><span className="font-semibold">15 desbloqueos</span> incluidos al mes</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-foreground">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-gold-foreground" />
                      <span>Analíticas avanzadas de match</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-foreground">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-gold-foreground" />
                      <span>Prioridad en resultados de busqueda</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-foreground">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-gold-foreground" />
                      <span>Badge <span className="font-semibold text-gold-foreground">Pro</span> en tu perfil</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex items-baseline gap-1.5">
                      <p className="font-heading text-2xl font-bold text-gold-foreground">$499</p>
                      <span className="text-xs text-muted-foreground">MXN/mes</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Solo <span className="font-semibold text-accent">$33 por desbloqueo</span> — ahorra 67%
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-gold-gradient py-2 text-xs font-bold text-white shadow-gold transition-opacity group-hover:opacity-90">
                      Ver Plan Pro
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>

                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </div>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-4 flex items-center justify-center gap-4 text-[10px] text-muted-foreground"
              >
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Pago seguro
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Acceso inmediato
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> +500 brokers activos
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* CONFIRM — has plan unlocks */}
          {state === "confirm" && checkResult?.status === "has_plan_unlocks" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Unlock className="h-4 w-4 text-accent" />
                  Confirmar desbloqueo
                </DialogTitle>
                <DialogDescription>
                  Desbloquear el contacto de <span className="font-medium text-foreground">{targetBrokerName}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 rounded-xl bg-accent/5 border border-accent/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Incluido en tu plan</p>
                    <p className="text-xs text-muted-foreground">
                      Te quedan <span className="font-semibold text-accent">{checkResult.remaining}</span> desbloqueo{checkResult.remaining !== 1 ? "s" : ""} este mes
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold"
                  onClick={() => handleUnlock("plan_included")}
                >
                  <Unlock className="mr-2 h-4 w-4" />
                  Desbloquear
                </Button>
              </div>
            </motion.div>
          )}

          {/* PROCESSING */}
          {state === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Unlock className="h-8 w-8 text-gold" />
              </motion.div>
              <p className="text-sm text-muted-foreground">Procesando desbloqueo...</p>
            </motion.div>
          )}

          {/* SUCCESS */}
          {state === "success" && contact && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-accent">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                  Contacto desbloqueado
                </DialogTitle>
                <DialogDescription>
                  Datos de contacto de {targetBrokerName}
                </DialogDescription>
              </DialogHeader>

              <motion.div
                className="mt-5 space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {contact.phone && (
                  <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15">
                      <Phone className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Telefono</p>
                      <p className="text-sm font-semibold">{contact.phone}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(contact.phone!, "phone")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {copiedField === "phone" ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15">
                      <Mail className="h-4 w-4 text-gold-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-semibold">{contact.email}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(contact.email!, "email")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {copiedField === "email" ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}

                {!contact.phone && !contact.email && (
                  <div className="rounded-xl bg-secondary/50 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Este broker aun no ha completado su informacion de contacto.
                    </p>
                  </div>
                )}
              </motion.div>

              <div className="mt-5">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cerrar
                </Button>
              </div>
            </motion.div>
          )}

          {/* ERROR */}
          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <Lock className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-sm text-muted-foreground">{errorMsg || "Ocurrio un error"}</p>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cerrar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
