"use client";

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

const features = [
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
  "Polanco",
  "Condesa",
  "Roma Norte",
  "Roma Sur",
  "Santa Fe",
  "Coyoacán",
  "Del Valle",
  "Narvarte",
  "Nápoles",
  "San Ángel",
  "Pedregal",
  "Interlomas",
  "Satélite",
  "Querétaro Centro",
  "Monterrey Centro",
  "San Pedro Garza García",
  "Zapopan",
  "Guadalajara Centro",
  "Otra zona",
];

export default function NuevaSolicitudPage() {
  return (
    <div>
      <div className="mb-2 text-xs text-muted-foreground">
        Dashboard &gt; Nueva Solicitud
      </div>
      <h1 className="font-heading text-2xl font-bold">Nueva Solicitud</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Define lo que tu cliente busca. Brokers con inventario relevante podrán
        responderte.
      </p>

      <div className="mt-8 space-y-6">
        {/* Información General */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-heading text-base">
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la solicitud</Label>
              <Input
                id="title"
                placeholder='Ej: "Departamento en Polanco, 2-3 recámaras"'
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tipo de operación</Label>
                <Select>
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
                <Label>Tipo de propiedad</Label>
                <Select>
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
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-heading text-base">
              Ubicación y Presupuesto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Zona</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar zona" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map((z) => (
                    <SelectItem key={z} value={z.toLowerCase().replace(/ /g, "-")}>
                      {z}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget-min">Presupuesto mínimo (MXN)</Label>
                <Input
                  id="budget-min"
                  type="number"
                  placeholder="$0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-max">Presupuesto máximo (MXN)</Label>
                <Input
                  id="budget-max"
                  type="number"
                  placeholder="$0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Características */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-heading text-base">
              Características
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="min-m2">m² mínimo</Label>
                <Input id="min-m2" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-m2">m² máximo</Label>
                <Input id="max-m2" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Recámaras</Label>
                <Input id="bedrooms" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Baños</Label>
                <Input id="bathrooms" type="number" placeholder="0" />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Amenidades deseadas</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Checkbox id={f} />
                    <label htmlFor={f} className="text-sm text-muted-foreground">
                      {f}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalles adicionales */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="font-heading text-base">
              Detalles adicionales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Agrega cualquier detalle adicional que ayude a otros brokers a entender mejor lo que tu cliente busca..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Urgencia</Label>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Normal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">
                    🟢 Baja — Sin prisa
                  </SelectItem>
                  <SelectItem value="normal">
                    🟡 Normal — Tiempo estándar
                  </SelectItem>
                  <SelectItem value="alta">
                    🟠 Alta — Necesito pronto
                  </SelectItem>
                  <SelectItem value="urgente">
                    🔴 Urgente — Lo antes posible
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <Button variant="outline">Guardar borrador</Button>
          <Button className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold px-8">
            Publicar Solicitud
          </Button>
        </div>
      </div>
    </div>
  );
}
