-- ============================================================
-- Activated Creators — Full Database Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('creator', 'business');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'in_progress', 'converted', 'closed');
CREATE TYPE lead_source AS ENUM ('content', 'search', 'referral', 'direct');
CREATE TYPE price_type AS ENUM ('fixed', 'hourly', 'negotiable');
CREATE TYPE availability_status AS ENUM ('available', 'busy', 'unavailable');
CREATE TYPE industry_vertical AS ENUM ('real_estate', 'hotel', 'rental', 'condo', 'travel', 'hospitality', 'other');
CREATE TYPE creator_niche AS ENUM ('travel', 'real_estate', 'hospitality', 'lifestyle', 'food', 'adventure', 'luxury', 'other');

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'creator',
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- CREATOR PROFILES
-- ============================================================
CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  bio TEXT,
  niche creator_niche NOT NULL DEFAULT 'other',
  location_city TEXT,
  location_country TEXT,
  instagram_handle TEXT,
  tiktok_handle TEXT,
  youtube_handle TEXT,
  follower_count INTEGER NOT NULL DEFAULT 0,
  avg_engagement_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  portfolio_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  hourly_rate NUMERIC(10,2),
  availability_status availability_status NOT NULL DEFAULT 'available',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator profiles are viewable by everyone" ON creator_profiles
  FOR SELECT USING (true);

CREATE POLICY "Creators can update own profile" ON creator_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Creators can insert own profile" ON creator_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- BUSINESS PROFILES
-- ============================================================
CREATE TABLE business_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL DEFAULT '',
  industry_vertical industry_vertical NOT NULL DEFAULT 'other',
  website TEXT,
  logo_url TEXT,
  description TEXT,
  location_city TEXT,
  location_country TEXT,
  company_size TEXT,
  budget_range TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business profiles are viewable by everyone" ON business_profiles
  FOR SELECT USING (true);

CREATE POLICY "Businesses can update own profile" ON business_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Businesses can insert own profile" ON business_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  status lead_status NOT NULL DEFAULT 'new',
  source lead_source NOT NULL DEFAULT 'direct',
  vertical industry_vertical NOT NULL DEFAULT 'other',
  title TEXT NOT NULL DEFAULT '',
  message TEXT,
  estimated_value NUMERIC(12,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own leads" ON leads
  FOR SELECT USING (auth.uid() = creator_id OR auth.uid() = business_id);

CREATE POLICY "Businesses can create leads" ON leads
  FOR INSERT WITH CHECK (auth.uid() = business_id);

CREATE POLICY "Involved parties can update leads" ON leads
  FOR UPDATE USING (auth.uid() = creator_id OR auth.uid() = business_id);

-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Recipients can update messages (mark read)" ON messages
  FOR UPDATE USING (auth.uid() = recipient_id);

-- ============================================================
-- CONTENT PIECES
-- ============================================================
CREATE TABLE content_pieces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'instagram',
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  engagement_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  vertical industry_vertical NOT NULL DEFAULT 'other',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE content_pieces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content pieces are viewable by everyone" ON content_pieces
  FOR SELECT USING (true);

CREATE POLICY "Creators can manage own content" ON content_pieces
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own content" ON content_pieces
  FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete own content" ON content_pieces
  FOR DELETE USING (auth.uid() = creator_id);

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  vertical industry_vertical NOT NULL DEFAULT 'other',
  price_type price_type NOT NULL DEFAULT 'negotiable',
  price_amount NUMERIC(10,2),
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

CREATE POLICY "Creators can manage own services" ON services
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own services" ON services
  FOR UPDATE USING (auth.uid() = creator_id);

-- ============================================================
-- SAVED CREATORS (bookmarks by businesses)
-- ============================================================
CREATE TABLE saved_creators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id, creator_id)
);

ALTER TABLE saved_creators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can view own saved creators" ON saved_creators
  FOR SELECT USING (auth.uid() = business_id);

CREATE POLICY "Businesses can save creators" ON saved_creators
  FOR INSERT WITH CHECK (auth.uid() = business_id);

CREATE POLICY "Businesses can unsave creators" ON saved_creators
  FOR DELETE USING (auth.uid() = business_id);

-- ============================================================
-- AUTO-CREATE PROFILE TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'creator')
  );

  -- Auto-create role-specific profile
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'creator') = 'creator' THEN
    INSERT INTO public.creator_profiles (id) VALUES (NEW.id);
  ELSE
    INSERT INTO public.business_profiles (id) VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ENABLE REALTIME for messages
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
