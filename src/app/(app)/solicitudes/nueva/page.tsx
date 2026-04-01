"use client";

import { WizardShell } from "@/components/solicitud/wizard/wizard-shell";
import { useSolicitudForm } from "@/components/solicitud/wizard/use-solicitud-form";

export default function NuevaSolicitudPage() {
  const form = useSolicitudForm();

  return (
    <div>
      <div className="mb-2 text-xs text-muted-foreground">
        Dashboard &gt; Nueva Solicitud
      </div>
      <h1 className="font-heading text-2xl font-bold">Nueva Solicitud</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Define lo que tu cliente busca. Brokers con inventario relevante podrán responderte.
      </p>

      <WizardShell form={form} />
    </div>
  );
}
