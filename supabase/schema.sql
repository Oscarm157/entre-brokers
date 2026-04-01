-- entre-brokers database schema
-- B2B platform for real estate brokers

-- Perfiles de broker
CREATE TABLE broker_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  license_number TEXT,
  zones TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  reputation_score DECIMAL(3,2) DEFAULT 0,
  total_deals INTEGER DEFAULT 0,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Solicitudes (demanda)
CREATE TABLE solicitudes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_id UUID NOT NULL REFERENCES broker_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('casa', 'departamento', 'terreno', 'local', 'oficina')),
  operation_type TEXT NOT NULL CHECK (operation_type IN ('compra', 'renta')),
  zone TEXT NOT NULL,
  budget_min DECIMAL,
  budget_max DECIMAL NOT NULL,
  min_m2 DECIMAL,
  max_m2 DECIMAL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  features TEXT[] DEFAULT '{}',
  description TEXT,
  urgency TEXT DEFAULT 'normal' CHECK (urgency IN ('baja', 'normal', 'alta', 'urgente')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed', 'expired')),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  response_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Respuestas (oferta)
CREATE TABLE respuestas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
  broker_id UUID NOT NULL REFERENCES broker_profiles(id) ON DELETE CASCADE,
  price DECIMAL NOT NULL,
  zone TEXT NOT NULL,
  address_hint TEXT,
  area_m2 DECIMAL NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  features TEXT[] DEFAULT '{}',
  description TEXT,
  photos TEXT[] DEFAULT '{}',
  match_score DECIMAL(5,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'interested', 'rejected', 'reported')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Desbloqueos de contacto (monetización)
CREATE TABLE unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES broker_profiles(id) ON DELETE CASCADE,
  target_id UUID NOT NULL REFERENCES broker_profiles(id) ON DELETE CASCADE,
  respuesta_id UUID REFERENCES respuestas(id) ON DELETE SET NULL,
  solicitud_id UUID REFERENCES solicitudes(id) ON DELETE SET NULL,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'MXN',
  payment_method TEXT,
  payment_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notificaciones
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES broker_profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('new_response', 'new_match', 'unlock', 'system')),
  title TEXT NOT NULL,
  body TEXT,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reportes/flags
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES broker_profiles(id) ON DELETE CASCADE,
  reported_id UUID REFERENCES broker_profiles(id) ON DELETE SET NULL,
  respuesta_id UUID REFERENCES respuestas(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_solicitudes_broker ON solicitudes(broker_id);
CREATE INDEX idx_solicitudes_status ON solicitudes(status);
CREATE INDEX idx_solicitudes_zone ON solicitudes(zone);
CREATE INDEX idx_solicitudes_property_type ON solicitudes(property_type);
CREATE INDEX idx_solicitudes_expires ON solicitudes(expires_at);
CREATE INDEX idx_respuestas_solicitud ON respuestas(solicitud_id);
CREATE INDEX idx_respuestas_broker ON respuestas(broker_id);
CREATE INDEX idx_respuestas_match ON respuestas(match_score DESC);
CREATE INDEX idx_unlocks_requester ON unlocks(requester_id);
CREATE INDEX idx_unlocks_target ON unlocks(target_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE read = false;

-- RLS Policies
ALTER TABLE broker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitudes ENABLE ROW LEVEL SECURITY;
ALTER TABLE respuestas ENABLE ROW LEVEL SECURITY;
ALTER TABLE unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Broker profiles: public read, self write
CREATE POLICY "Profiles are viewable by authenticated users"
  ON broker_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile"
  ON broker_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile"
  ON broker_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Solicitudes: public read for active, self write
CREATE POLICY "Active solicitudes are viewable by authenticated users"
  ON solicitudes FOR SELECT TO authenticated USING (status = 'active' OR broker_id = auth.uid());
CREATE POLICY "Users can create solicitudes"
  ON solicitudes FOR INSERT TO authenticated WITH CHECK (broker_id = auth.uid());
CREATE POLICY "Users can update own solicitudes"
  ON solicitudes FOR UPDATE TO authenticated USING (broker_id = auth.uid());

-- Respuestas: visible to solicitud owner and responder
CREATE POLICY "Respuestas visible to involved brokers"
  ON respuestas FOR SELECT TO authenticated
  USING (
    broker_id = auth.uid()
    OR solicitud_id IN (SELECT id FROM solicitudes WHERE broker_id = auth.uid())
  );
CREATE POLICY "Users can create respuestas"
  ON respuestas FOR INSERT TO authenticated WITH CHECK (broker_id = auth.uid());
CREATE POLICY "Users can update own respuestas"
  ON respuestas FOR UPDATE TO authenticated USING (broker_id = auth.uid());

-- Unlocks: visible to requester and target
CREATE POLICY "Unlocks visible to involved parties"
  ON unlocks FOR SELECT TO authenticated
  USING (requester_id = auth.uid() OR target_id = auth.uid());
CREATE POLICY "Users can create unlocks"
  ON unlocks FOR INSERT TO authenticated WITH CHECK (requester_id = auth.uid());

-- Notifications: self only
CREATE POLICY "Users see own notifications"
  ON notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Reports: self only for creation
CREATE POLICY "Users can create reports"
  ON reports FOR INSERT TO authenticated WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "Users see own reports"
  ON reports FOR SELECT TO authenticated USING (reporter_id = auth.uid());
