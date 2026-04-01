import Link from "next/link";
import { Building2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/20">
              <Building2 className="h-3.5 w-3.5 text-gold-foreground" />
            </div>
            <span className="font-heading text-sm font-bold text-primary">entre-brokers</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/terminos" className="hover:text-foreground transition-colors">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <a href="mailto:contacto@entre-brokers.com" className="hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-muted-foreground">
          © 2026 entre-brokers. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
