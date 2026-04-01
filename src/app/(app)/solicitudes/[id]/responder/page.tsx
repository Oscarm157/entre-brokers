"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

const solicitudResumen = {
  title: "Departamento en Polanco, 2-3 recámaras",
  zone: "Polanco",
  budget: "$2,000,000 - $3,500,000 MXN",
  type: "Departamento",
  operation: "Compra",
  features: "80-120 m², 2-3 rec, 2 baños, estacionamiento",
};

export default function ResponderSolicitudPage() {
  return (
    <div>
      <Link
        href="/explorar"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-3 w-3" />
        Volver a Explorar
      </Link>

      <h1 className="font-heading text-2xl font-bold">Responder Solicitud</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Envía tu propiedad como respuesta. El sistema calculará el match % automáticamente.
      </p>

      {/* Solicitud summary */}
      <Card className="mt-6 border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
            Respondiendo a:
          </p>
          <p className="text-sm font-semibold">{solicitudResumen.title}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">{solicitudResumen.operation}</Badge>
            <Badge variant="outline" className="text-xs">{solicitudResumen.zone}</Badge>
            <span className="text-xs text-gold">{solicitudResumen.budget}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Busca: {solicitudResumen.features}</p>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        {/* Propiedad info */}
        <Card className="border-border bg-white shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-base">Tu Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (MXN)</Label>
                <Input id="price" type="number" placeholder="$0" />
              </div>
              <div className="space-y-2">
                <Label>Zona</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polanco">Polanco</SelectItem>
                    <SelectItem value="condesa">Condesa</SelectItem>
                    <SelectItem value="roma">Roma Norte</SelectItem>
                    <SelectItem value="santa-fe">Santa Fe</SelectItem>
                    <SelectItem value="coyoacan">Coyoacán</SelectItem>
                    <SelectItem value="otra">Otra zona</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Referencia de ubicación</Label>
              <Input
                id="address"
                placeholder="Colonia, calle principal o referencia (no dirección exacta)"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="area">Superficie (m²)</Label>
                <Input id="area" type="number" placeholder="0" />
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
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-border bg-white shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-base">Descripción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Describe tu propiedad</Label>
              <Textarea
                id="description"
                placeholder="Detalla lo que hace atractiva esta propiedad para la solicitud. Menciona acabados, estado, ventajas de ubicación..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="border-border bg-white shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-base">Fotos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-8">
              <Upload className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                Arrastra fotos aquí o{" "}
                <button type="button" className="text-gold hover:underline">
                  selecciona archivos
                </button>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Máximo 10 fotos · JPG, PNG · Max 5MB cada una
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <Link href="/explorar">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button className="bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold px-8">
            Enviar Respuesta
          </Button>
        </div>
      </div>
    </div>
  );
}
