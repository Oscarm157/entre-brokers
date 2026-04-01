import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 border border-gold/20">
            <Building2 className="h-4 w-4 text-gold" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">
            entre-brokers
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Cómo funciona
          </a>
          <a href="#solucion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Solución
          </a>
          <a href="#precios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Precios
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/registro">
            <Button
              size="sm"
              className="bg-gold text-gold-foreground hover:bg-gold/90 text-sm font-semibold glow-gold"
            >
              Solicitar Acceso
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
