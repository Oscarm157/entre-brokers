"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Building2, Mail, Lock, Eye, EyeOff, Loader2, User, Phone, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regLicense, setRegLicense] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Email o contraseña incorrectos"
        : error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }
    if (regPassword.length < 8) {
      setError("La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: {
        data: {
          full_name: regName,
          phone: regPhone,
          company: regCompany,
          license_number: regLicense,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("broker_profiles")
        .insert({
          id: data.user.id,
          full_name: regName,
          phone: regPhone || null,
          company: regCompany || null,
          license_number: regLicense || null,
        });

      if (profileError && !profileError.message.includes("duplicate")) {
        console.error("Profile creation error:", profileError);
      }
    }

    if (data.session) {
      router.push("/dashboard");
    } else {
      setSuccess("Cuenta creada. Revisa tu email para confirmar tu cuenta.");
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side — Branding */}
      <div className="hidden w-1/2 flex-col justify-between p-14 lg:flex relative overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-teal-50/60">
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Decorative circles */}
        <motion.div
          className="absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-gold/8"
          animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-10 bottom-1/4 h-40 w-40 rounded-full bg-accent/6"
          animate={{ scale: [1, 1.15, 1], y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/20">
              <Building2 className="h-6 w-6 text-gold-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-primary">entre-brokers</span>
          </Link>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.2 }}
        >
          <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight text-primary">
            Donde las oportunidades encuentran al broker correcto.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            La red privada de brokers inmobiliarios más eficiente de México.
            Publica solicitudes, recibe ofertas reales y cierra tratos más rápido.
          </p>

          {/* Trust indicators */}
          <div className="mt-10 flex gap-8">
            {[
              { value: "500+", label: "Brokers activos" },
              { value: "1,200+", label: "Solicitudes publicadas" },
              { value: "95%", label: "Tasa de respuesta" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <p className="font-heading text-2xl font-bold text-gold-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative flex items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-2.5 w-2.5 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Plataforma activa — Solo para brokers verificados</span>
        </motion.div>
      </div>

      {/* Right side — Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <motion.div
            className="mb-10 flex items-center gap-3 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20">
              <Building2 className="h-5 w-5 text-gold-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">entre-brokers</span>
          </motion.div>

          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-6 rounded-2xl bg-urgent/8 px-5 py-4 text-sm text-urgent"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-6 rounded-2xl bg-accent/8 px-5 py-4 text-sm text-accent"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab switcher */}
          <div className="mb-8 flex rounded-2xl bg-secondary/60 p-1.5">
            {[
              { value: "login", label: "Iniciar Sesión" },
              { value: "register", label: "Crear Cuenta" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => { setActiveTab(tab.value); setError(null); setSuccess(null); }}
                className="relative flex-1 rounded-xl py-3 text-center text-sm font-semibold transition-colors"
              >
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                    transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab.value ? "text-foreground" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Form content */}
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-13 rounded-xl bg-secondary/40 pl-12 text-base"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-sm font-medium">Contraseña</Label>
                    <a href="#" className="text-sm text-gold-foreground hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-13 rounded-xl bg-secondary/40 pl-12 pr-12 text-base"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-13 w-full gap-2 rounded-xl bg-gold-gradient text-base font-semibold text-white shadow-gold hover:opacity-90"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                      Iniciar Sesión
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative py-2">
                  <div className="h-[1px] w-full bg-border" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
                    o continúa con
                  </span>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-13 w-full gap-3 rounded-xl text-base"
                      onClick={handleGoogleAuth}
                      disabled={loading}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continuar con Google
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={handleRegister}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="reg-name" className="text-sm font-medium">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-name"
                      placeholder="Juan Pérez"
                      className="h-13 rounded-xl bg-secondary/40 pl-12 text-base"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="reg-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-13 rounded-xl bg-secondary/40 pl-12 text-base"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone" className="text-sm font-medium">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        className="h-13 rounded-xl bg-secondary/40 pl-12 text-base"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-company" className="text-sm font-medium">
                      Empresa <span className="text-muted-foreground">(opcional)</span>
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="reg-company"
                        placeholder="Tu inmobiliaria"
                        className="h-13 rounded-xl bg-secondary/40 pl-12 text-base"
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="reg-license" className="text-sm font-medium">
                    Número de licencia / cédula <span className="text-muted-foreground">(opcional)</span>
                  </Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-license"
                      placeholder="Para verificación acelerada"
                      className="h-13 rounded-xl bg-secondary/40 pl-12 text-base"
                      value={regLicense}
                      onChange={(e) => setRegLicense(e.target.value)}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="reg-password" className="text-sm font-medium">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      className="h-13 rounded-xl bg-secondary/40 pl-12 text-base"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start gap-3 pt-1">
                  <Checkbox
                    id="terms"
                    className="mt-0.5"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    Acepto los{" "}
                    <Link href="/terminos" className="text-gold-foreground hover:underline">
                      términos y condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link href="/privacidad" className="text-gold-foreground hover:underline">
                      política de privacidad
                    </Link>
                  </label>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-13 w-full gap-2 rounded-xl bg-gold-gradient text-base font-semibold text-white shadow-gold hover:opacity-90"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                      Crear Cuenta
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative py-1">
                  <div className="h-[1px] w-full bg-border" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
                    o regístrate con
                  </span>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-13 w-full gap-3 rounded-xl text-base"
                      onClick={handleGoogleAuth}
                      disabled={loading}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continuar con Google
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.p
            className="mt-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Solo para profesionales inmobiliarios verificados
          </motion.p>
        </div>
      </div>
    </div>
  );
}
