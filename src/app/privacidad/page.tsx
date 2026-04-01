import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="inline-flex items-center gap-2 mb-8">
        <Building2 className="h-5 w-5 text-gold" />
        <span className="font-heading text-sm font-bold">entre-brokers</span>
      </Link>

      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-3 w-3" />
        Volver al inicio
      </Link>

      <h1 className="font-heading text-3xl font-bold">Política de Privacidad</h1>
      <p className="mt-2 text-sm text-muted-foreground">Última actualización: 1 de abril de 2026</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">1. Información que recopilamos</h2>
          <p>
            Recopilamos información que usted nos proporciona directamente al registrarse:
            nombre, email, teléfono, empresa, número de licencia y zonas de operación. También
            recopilamos datos de uso de la plataforma para mejorar el servicio.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">2. Uso de la información</h2>
          <p>
            Utilizamos su información para operar la plataforma, calcular matches entre
            solicitudes y respuestas, gestionar pagos de desbloqueos y enviar notificaciones
            relevantes sobre su actividad.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">3. Compartir información</h2>
          <p>
            Su información de contacto (teléfono y email) solo se comparte con otros brokers
            cuando ellos pagan por el desbloqueo correspondiente. No vendemos ni compartimos
            su información con terceros para fines de marketing.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">4. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger su
            información personal contra accesos no autorizados, alteración o destrucción.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">5. Sus derechos</h2>
          <p>
            Usted tiene derecho a acceder, rectificar o eliminar su información personal en
            cualquier momento. Puede ejercer estos derechos desde su perfil o contactándonos
            directamente.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">6. Contacto</h2>
          <p>
            Para cualquier consulta sobre privacidad:{" "}
            <a href="mailto:privacidad@entre-brokers.com" className="text-gold hover:underline">
              privacidad@entre-brokers.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
