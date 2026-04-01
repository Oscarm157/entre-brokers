import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

export default function TerminosPage() {
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

      <h1 className="font-heading text-3xl font-bold">Términos y Condiciones</h1>
      <p className="mt-2 text-sm text-muted-foreground">Última actualización: 1 de abril de 2026</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar la plataforma entre-brokers, usted acepta estar sujeto a estos
            términos y condiciones. Si no está de acuerdo con alguno de estos términos, no debe
            utilizar la plataforma.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">2. Descripción del servicio</h2>
          <p>
            entre-brokers es una plataforma B2B que conecta brokers inmobiliarios profesionales.
            No es un portal inmobiliario abierto al público. El servicio permite a los brokers
            publicar solicitudes de demanda y responder con propiedades específicas.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">3. Registro y verificación</h2>
          <p>
            Para utilizar la plataforma, debe registrarse como broker inmobiliario profesional.
            entre-brokers se reserva el derecho de verificar su identidad y credenciales
            profesionales. Las cuentas que no correspondan a profesionales inmobiliarios podrán
            ser suspendidas o eliminadas.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">4. Uso de la plataforma</h2>
          <p>
            Los usuarios se comprometen a utilizar la plataforma de manera profesional y ética.
            Queda prohibido publicar información falsa, spam, o cualquier contenido que no
            corresponda a solicitudes o propiedades inmobiliarias reales.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">5. Pagos y desbloqueos</h2>
          <p>
            El desbloqueo de información de contacto requiere un pago. Los pagos son definitivos
            y no reembolsables una vez que la información ha sido revelada. Los precios están
            sujetos a cambios con previo aviso.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">6. Privacidad</h2>
          <p>
            La información personal de los usuarios está protegida según nuestra{" "}
            <Link href="/privacidad" className="text-gold hover:underline">
              política de privacidad
            </Link>
            . Los datos de contacto solo se comparten cuando un usuario paga por el desbloqueo.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-2">7. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos términos, puede contactarnos en{" "}
            <a href="mailto:legal@entre-brokers.com" className="text-gold hover:underline">
              legal@entre-brokers.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
