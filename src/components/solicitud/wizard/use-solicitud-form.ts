"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export const featureOptions = [
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

export const zones = [
  "Polanco", "Condesa", "Roma Norte", "Roma Sur", "Santa Fe", "Coyoacán",
  "Del Valle", "Narvarte", "Nápoles", "San Ángel", "Pedregal", "Interlomas",
  "Satélite", "Querétaro Centro", "Monterrey Centro", "San Pedro Garza García",
  "Zapopan", "Guadalajara Centro", "Otra zona",
];

export function useSolicitudForm() {
  const router = useRouter();

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleFeature(feature: string) {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  }

  function canAdvance(step: number): boolean {
    switch (step) {
      case 0:
        return !!operationType && !!propertyType;
      case 1:
        return !!zone && !!budgetMax;
      case 2:
        return true;
      case 3:
        return !!title;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setError(null);

    if (!title || !operationType || !propertyType || !zone || !budgetMax) {
      setError("Completa los campos obligatorios.");
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

  return {
    operationType, setOperationType,
    propertyType, setPropertyType,
    zone, setZone,
    budgetMin, setBudgetMin,
    budgetMax, setBudgetMax,
    minM2, setMinM2,
    maxM2, setMaxM2,
    bedrooms, setBedrooms,
    bathrooms, setBathrooms,
    features, toggleFeature,
    title, setTitle,
    description, setDescription,
    urgency, setUrgency,
    loading, error, setError,
    canAdvance, handleSubmit,
  };
}

export type SolicitudForm = ReturnType<typeof useSolicitudForm>;
