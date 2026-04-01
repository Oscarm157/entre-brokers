"use client";

import { WizardShell } from "@/components/solicitud/wizard/wizard-shell";
import { useSolicitudForm } from "@/components/solicitud/wizard/use-solicitud-form";

export default function NuevaSolicitudPage() {
  const form = useSolicitudForm();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Dashboard &gt; Nueva Solicitud
      </div>

      {/* Page header — editorial style */}
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
        Nueva Solicitud
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        Define lo que tu cliente busca. Brokers con inventario relevante podrán responderte.
      </p>

      <WizardShell form={form} />
    </div>
  );
}
