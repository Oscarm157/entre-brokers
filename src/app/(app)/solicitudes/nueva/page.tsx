"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const featureOptions = [
  "Estacionamiento",
  "Jardín",
  "Seguridad 24h",
  "Amenidades",
  "Amueblado",
  "Pet-friendly",
  "Elevador",
  "Roof garden",
  "Bodega",
  "Balcón",
];

const zones = [
  "Polanco", "Condesa", "Roma Norte", "Roma Sur", "Santa Fe", "Coyoacán",
  "Del Valle", "Narvarte", "Nápoles", "San Ángel", "Pedregal", "Interlomas",
  "Satélite", "Querétaro Centro", "Monterrey Centro", "San Pedro Garza García",
  "Zapopan", "Guadalajara Centro", "Otra zona",
];

export default function NuevaSolicitudPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [operationType, setOperationType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [zone, setZone] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [minM2, setMinM2] = useState("");
  const [maxM2, setMaxM2] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("normal");

  function toggleFeature(feature: string) {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title || !operationType || !propertyType || !zone || !budgetMax) {
      setError("Completa los campos obligatorios: título, operación, tipo, zona y presupuesto máximo.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Debes iniciar sesión");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("solicitudes").insert({
      broker_id: user.id,
      title,
      property_type: propertyType,
      operation_type: operationType,
      zone,
      budget_min: budgetMin ? Number(budgetMin) : null,
      budget_max: Number(budgetMax),
      min_m2: minM2 ? Number(minM2) : null,
      max_m2: maxM2 ? Number(maxM2) : null,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      features,
      description: description || null,
      urgency,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/solicitudes");
  }

  return (
    <div>
      <div className="mb-2 text-xs text-muted-foreground">
        Dashboard &gt; Nueva Solicitud
      </div>
      <h1 className="font-heading text-2xl font-bold">Nueva Solicitud</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Define lo que tu cliente busca. Brokers con inventario relevante podrán responderte.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border border-urgent/30 bg-urgent/10 px-4 py-3 text-sm text-urgent">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Información General */}
        <Card className="border-border bg-white shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-base">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la solicitud *</Label>
              <Input
                id="title"
                placeholder='Ej: "Departamento en Polanco, 2-3 recámaras"'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tipo de operación *</Label>
                <Select value={operationType} onValueChange={(v) => setOperationType(v ?? "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compra">Compra</SelectItem>
                    <SelectItem value="renta">Renta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de propiedad *</Label>
                <Select value={propertyType} onValueChange={(v) => setPropertyType(v ?? "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="local">Local comercial</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ubicación y Presupuesto */}
        <Card className="border-border bg-white shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-base">Ubicación y Presupuesto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Zona *</Label>
              <Select value={zone} onValueChange={(v) => setZone(v ?? "")}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((z) => (
                    <SelectItem key={z} value={z}>{z}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget-min">Presupuesto mínimo (MXN)</Label>
                <Input id="budget-min" type="number" placeholder="$0" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-max">Presupuesto máximo (MXN) *</Label>
                <Input id="budget-max" type="number" placeholder="$0" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Características */}
        <Card className="border-border bg-white shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-base">Características</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="min-m2">m² mínimo</Label>
                <Input id="min-m2" type="number" placeholder="0" value={minM2} onChange={(e) => setMinM2(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-m2">m² máximo</Label>
                <Input id="max-m2" type="number" placeholder="0" value={maxM2} onChange={(e) => setMaxM2(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Recámaras</Label>
                <Input id="bedrooms" type="number" placeholder="0" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Baños</Label>
                <Input id="bathrooms" type="number" placeholder="0" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
              </div>
            </div>
            <div className="space-y-3">
              <Label>Amenidades deseadas</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {featureOptions.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Checkbox
                      id={f}
                      checked={features.includes(f)}
                      onCheckedChange={() => toggleFeature(f)}
                    />
                    <label htmlFor={f} className="text-sm text-muted-foreground">{f}</label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalles adicionales */}
        <Card className="border-border bg-white shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-base">Detalles adicionales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Agrega cualquier detalle adicional..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Urgencia</Label>
              <Select value={urgency} onValueChange={(v) => setUrgency(v ?? "normal")}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja — Sin prisa</SelectItem>
                  <SelectItem value="normal">Normal — Tiempo estándar</SelectItem>
                  <SelectItem value="alta">Alta — Necesito pronto</SelectItem>
                  <SelectItem value="urgente">Urgente — Lo antes posible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold px-8"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Publicar Solicitud
          </Button>
        </div>
      </form>
    </div>
  );
}
