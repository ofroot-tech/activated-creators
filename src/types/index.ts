export type UserRole = "creator" | "business";

export type LeadStatus = "new" | "contacted" | "in_progress" | "converted" | "closed";
export type LeadSource = "content" | "search" | "referral" | "direct";
export type PriceType = "fixed" | "hourly" | "negotiable";
export type AvailabilityStatus = "available" | "busy" | "unavailable";

export type IndustryVertical =
  | "real_estate"
  | "hotel"
  | "rental"
  | "condo"
  | "travel"
  | "hospitality"
  | "other";

export type CreatorNiche =
  | "travel"
  | "real_estate"
  | "hospitality"
  | "lifestyle"
  | "food"
  | "adventure"
  | "luxury"
  | "other";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  onboarding_completed: boolean;
  created_at: string;
}

export interface CreatorProfile {
  id: string;
  bio: string | null;
  niche: CreatorNiche;
  location_city: string | null;
  location_country: string | null;
  instagram_handle: string | null;
  tiktok_handle: string | null;
  youtube_handle: string | null;
  follower_count: number;
  avg_engagement_rate: number;
  portfolio_urls: string[];
  hourly_rate: number | null;
  availability_status: AvailabilityStatus;
  is_verified: boolean;
  created_at: string;
  // Joined fields
  profile?: Profile;
}

export interface BusinessProfile {
  id: string;
  company_name: string;
  industry_vertical: IndustryVertical;
  website: string | null;
  logo_url: string | null;
  description: string | null;
  location_city: string | null;
  location_country: string | null;
  company_size: string | null;
  budget_range: string | null;
  created_at: string;
  // Joined fields
  profile?: Profile;
}

export interface Lead {
  id: string;
  creator_id: string;
  business_id: string;
  status: LeadStatus;
  source: LeadSource;
  vertical: IndustryVertical;
  title: string;
  message: string | null;
  estimated_value: number | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  creator_profile?: CreatorProfile & { profile?: Profile };
  business_profile?: BusinessProfile & { profile?: Profile };
}

export interface Message {
  id: string;
  lead_id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  read_at: string | null;
  created_at: string;
  // Joined fields
  sender?: Profile;
}

export interface ContentPiece {
  id: string;
  creator_id: string;
  title: string;
  platform: string;
  url: string;
  thumbnail_url: string | null;
  views: number;
  engagement_rate: number;
  vertical: IndustryVertical;
  created_at: string;
}

export interface Service {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  vertical: IndustryVertical;
  price_type: PriceType;
  price_amount: number | null;
  deliverables: string[];
  is_active: boolean;
  created_at: string;
}
