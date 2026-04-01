"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Building2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left side — Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-7 w-7 text-gold" />
            <span className="font-heading text-xl font-bold">entre-brokers</span>
          </Link>
        </div>

        <div>
          <h2 className="font-heading text-3xl font-bold leading-tight">
            Donde las oportunidades encuentran al broker correcto.
          </h2>
          <p className="mt-4 text-sm text-foreground/60 leading-relaxed">
            La red privada de brokers inmobiliarios más eficiente de México.
            Publica solicitudes, recibe ofertas reales y cierra tratos más rápido.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-foreground/40">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span>Plataforma activa — Solo para brokers verificados</span>
        </div>
      </div>

      {/* Right side — Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Building2 className="h-6 w-6 text-gold" />
            <span className="font-heading text-lg font-bold">entre-brokers</span>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
            </TabsList>

            {/* Login tab */}
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <a href="#" className="text-xs text-gold hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
                Iniciar Sesión
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                  o continúa con
                </span>
              </div>

              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </TabsContent>

            {/* Register tab */}
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Nombre completo</Label>
                <Input id="reg-name" placeholder="Juan Pérez" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="tu@email.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-phone">Teléfono</Label>
                  <Input id="reg-phone" type="tel" placeholder="+52 55 1234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-company">
                    Empresa <span className="text-muted-foreground">(opcional)</span>
                  </Label>
                  <Input id="reg-company" placeholder="Tu inmobiliaria" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-license">
                  Número de licencia / cédula{" "}
                  <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <Input id="reg-license" placeholder="Para verificación acelerada" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Contraseña</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" className="mt-0.5" />
                <label htmlFor="terms" className="text-xs text-muted-foreground">
                  Acepto los{" "}
                  <Link href="/terminos" className="text-gold hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacidad" className="text-gold hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 font-semibold">
                Crear Cuenta
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                  o regístrate con
                </span>
              </div>

              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Solo para profesionales inmobiliarios verificados
          </p>
        </div>
      </div>
    </div>
  );
}
