export type SubscriptionTier = "free" | "pro" | "enterprise";
export type PropertyType = "casa" | "departamento" | "terreno" | "local" | "oficina";
export type OperationType = "compra" | "renta";
export type Urgency = "baja" | "normal" | "alta" | "urgente";
export type SolicitudStatus = "active" | "paused" | "closed" | "expired";
export type RespuestaStatus = "pending" | "interested" | "rejected" | "reported";
export type NotificationType = "new_response" | "new_match" | "unlock" | "system";
export type ReportStatus = "pending" | "reviewed" | "resolved";

export interface BrokerProfile {
  id: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  license_number: string | null;
  zones: string[];
  verified: boolean;
  verified_at: string | null;
  reputation_score: number;
  total_deals: number;
  subscription_tier: SubscriptionTier;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Solicitud {
  id: string;
  broker_id: string;
  title: string;
  property_type: PropertyType;
  operation_type: OperationType;
  zone: string;
  budget_min: number | null;
  budget_max: number;
  min_m2: number | null;
  max_m2: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  features: string[];
  description: string | null;
  urgency: Urgency;
  status: SolicitudStatus;
  expires_at: string;
  response_count: number;
  created_at: string;
  updated_at: string;
  // Joined
  broker?: BrokerProfile;
}

export interface Respuesta {
  id: string;
  solicitud_id: string;
  broker_id: string;
  price: number;
  zone: string;
  address_hint: string | null;
  area_m2: number;
  bedrooms: number | null;
  bathrooms: number | null;
  features: string[];
  description: string | null;
  photos: string[];
  match_score: number | null;
  status: RespuestaStatus;
  created_at: string;
  // Joined
  broker?: BrokerProfile;
  solicitud?: Solicitud;
}

export interface Unlock {
  id: string;
  requester_id: string;
  target_id: string;
  respuesta_id: string | null;
  solicitud_id: string | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_reference: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_id: string | null;
  respuesta_id: string | null;
  reason: string;
  details: string | null;
  status: ReportStatus;
  created_at: string;
}
