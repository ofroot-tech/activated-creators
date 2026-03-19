import type {
  Profile,
  CreatorProfile,
  BusinessProfile,
  Lead,
  Message,
  ContentPiece,
  Service,
} from "@/types";

// ============================================================
// PROFILES
// ============================================================
export const MOCK_PROFILES: Profile[] = [
  {
    id: "creator-1",
    email: "maya@example.com",
    full_name: "Maya Chen",
    avatar_url: null,
    role: "creator",
    onboarding_completed: true,
    created_at: "2025-11-01T10:00:00Z",
  },
  {
    id: "creator-2",
    email: "james@example.com",
    full_name: "James Okafor",
    avatar_url: null,
    role: "creator",
    onboarding_completed: true,
    created_at: "2025-10-15T08:30:00Z",
  },
  {
    id: "creator-3",
    email: "sofia@example.com",
    full_name: "Sofia Rivera",
    avatar_url: null,
    role: "creator",
    onboarding_completed: true,
    created_at: "2025-12-01T14:00:00Z",
  },
  {
    id: "creator-4",
    email: "alex@example.com",
    full_name: "Alex Thompson",
    avatar_url: null,
    role: "creator",
    onboarding_completed: true,
    created_at: "2026-01-10T09:00:00Z",
  },
  {
    id: "creator-5",
    email: "priya@example.com",
    full_name: "Priya Sharma",
    avatar_url: null,
    role: "creator",
    onboarding_completed: true,
    created_at: "2026-01-20T11:00:00Z",
  },
  {
    id: "creator-6",
    email: "marcus@example.com",
    full_name: "Marcus Johnson",
    avatar_url: null,
    role: "creator",
    onboarding_completed: true,
    created_at: "2026-02-05T13:00:00Z",
  },
  {
    id: "biz-1",
    email: "hello@luxstay.com",
    full_name: "Sarah Mitchell",
    avatar_url: null,
    role: "business",
    onboarding_completed: true,
    created_at: "2025-09-01T12:00:00Z",
  },
  {
    id: "biz-2",
    email: "team@modernliving.com",
    full_name: "David Park",
    avatar_url: null,
    role: "business",
    onboarding_completed: true,
    created_at: "2025-10-01T09:00:00Z",
  },
  {
    id: "biz-3",
    email: "marketing@coastalresorts.com",
    full_name: "Emma Collins",
    avatar_url: null,
    role: "business",
    onboarding_completed: true,
    created_at: "2026-01-15T10:00:00Z",
  },
];

// ============================================================
// CREATOR PROFILES
// ============================================================
export const MOCK_CREATORS: (CreatorProfile & { profile: Profile })[] = [
  {
    id: "creator-1",
    bio: "Luxury travel and hotel content creator with a focus on cinematic storytelling. I help brands showcase their properties through immersive video content.",
    niche: "travel",
    location_city: "Los Angeles",
    location_country: "US",
    instagram_handle: "mayachentravel",
    tiktok_handle: "mayachen",
    youtube_handle: "MayaChenExplores",
    follower_count: 245000,
    avg_engagement_rate: 4.8,
    portfolio_urls: ["https://mayachen.com/portfolio"],
    hourly_rate: 250,
    availability_status: "available",
    is_verified: true,
    created_at: "2025-11-01T10:00:00Z",
    profile: MOCK_PROFILES[0],
  },
  {
    id: "creator-2",
    bio: "Real estate photographer and drone videographer. Specializing in aerial property showcases and virtual tours for luxury listings.",
    niche: "real_estate",
    location_city: "Miami",
    location_country: "US",
    instagram_handle: "jamesokafor",
    tiktok_handle: "jamesdroneshots",
    youtube_handle: null,
    follower_count: 89000,
    avg_engagement_rate: 3.2,
    portfolio_urls: ["https://jamesokafor.com"],
    hourly_rate: 175,
    availability_status: "available",
    is_verified: true,
    created_at: "2025-10-15T08:30:00Z",
    profile: MOCK_PROFILES[1],
  },
  {
    id: "creator-3",
    bio: "Food and hospitality content creator. I create mouthwatering content that drives bookings and reservations for restaurants and hotels.",
    niche: "food",
    location_city: "New York",
    location_country: "US",
    instagram_handle: "sofiarivera.eats",
    tiktok_handle: "sofiarivera",
    youtube_handle: "SofiaRiveraFoodie",
    follower_count: 520000,
    avg_engagement_rate: 5.6,
    portfolio_urls: ["https://sofiarivera.co"],
    hourly_rate: 350,
    availability_status: "busy",
    is_verified: true,
    created_at: "2025-12-01T14:00:00Z",
    profile: MOCK_PROFILES[2],
  },
  {
    id: "creator-4",
    bio: "Adventure and outdoor lifestyle creator. Capturing breathtaking landscapes and unique stays in remote destinations.",
    niche: "adventure",
    location_city: "Denver",
    location_country: "US",
    instagram_handle: "alexthompsonwild",
    tiktok_handle: "alexwild",
    youtube_handle: "AlexThompsonAdventures",
    follower_count: 178000,
    avg_engagement_rate: 6.1,
    portfolio_urls: [],
    hourly_rate: 200,
    availability_status: "available",
    is_verified: false,
    created_at: "2026-01-10T09:00:00Z",
    profile: MOCK_PROFILES[3],
  },
  {
    id: "creator-5",
    bio: "Luxury lifestyle and boutique hotel reviewer. Helping premium brands connect with affluent audiences through authentic storytelling.",
    niche: "luxury",
    location_city: "London",
    location_country: "UK",
    instagram_handle: "priyaluxury",
    tiktok_handle: "priyasharma",
    youtube_handle: "PriyaLuxuryLiving",
    follower_count: 312000,
    avg_engagement_rate: 4.3,
    portfolio_urls: ["https://priyasharma.co.uk"],
    hourly_rate: 300,
    availability_status: "available",
    is_verified: true,
    created_at: "2026-01-20T11:00:00Z",
    profile: MOCK_PROFILES[4],
  },
  {
    id: "creator-6",
    bio: "Short-term rental and Airbnb content specialist. I help property managers showcase their spaces and boost occupancy rates.",
    niche: "hospitality",
    location_city: "Austin",
    location_country: "US",
    instagram_handle: "marcusjrentals",
    tiktok_handle: "marcusjohnson",
    youtube_handle: null,
    follower_count: 67000,
    avg_engagement_rate: 7.2,
    portfolio_urls: [],
    hourly_rate: 125,
    availability_status: "available",
    is_verified: false,
    created_at: "2026-02-05T13:00:00Z",
    profile: MOCK_PROFILES[5],
  },
];

// ============================================================
// BUSINESS PROFILES
// ============================================================
export const MOCK_BUSINESSES: (BusinessProfile & { profile: Profile })[] = [
  {
    id: "biz-1",
    company_name: "LuxStay Hotels",
    industry_vertical: "hotel",
    website: "https://luxstay.com",
    logo_url: null,
    description:
      "Boutique luxury hotel chain with 12 properties across the US and Caribbean.",
    location_city: "San Francisco",
    location_country: "US",
    company_size: "51-200",
    budget_range: "$10,000 - $25,000",
    created_at: "2025-09-01T12:00:00Z",
    profile: MOCK_PROFILES[6],
  },
  {
    id: "biz-2",
    company_name: "Modern Living Realty",
    industry_vertical: "real_estate",
    website: "https://modernliving.com",
    logo_url: null,
    description:
      "Premium real estate agency specializing in luxury condominiums and waterfront properties.",
    location_city: "Miami",
    location_country: "US",
    company_size: "11-50",
    budget_range: "$5,000 - $10,000",
    created_at: "2025-10-01T09:00:00Z",
    profile: MOCK_PROFILES[7],
  },
  {
    id: "biz-3",
    company_name: "Coastal Resorts Group",
    industry_vertical: "hospitality",
    website: "https://coastalresorts.com",
    logo_url: null,
    description:
      "Beachfront resort operator with properties in California, Hawaii, and Mexico.",
    location_city: "San Diego",
    location_country: "US",
    company_size: "201-500",
    budget_range: "$25,000 - $50,000",
    created_at: "2026-01-15T10:00:00Z",
    profile: MOCK_PROFILES[8],
  },
];

// ============================================================
// LEADS
// ============================================================
export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-1",
    creator_id: "creator-1",
    business_id: "biz-1",
    status: "in_progress",
    source: "search",
    vertical: "hotel",
    title: "Summer Campaign — Rooftop Suite Showcase",
    message:
      "We'd love to collaborate on a cinematic video series featuring our new rooftop suites in LA. Looking for 3 short-form videos and 1 long-form piece.",
    estimated_value: 12000,
    created_at: "2026-02-15T10:00:00Z",
    updated_at: "2026-03-10T14:30:00Z",
    creator_profile: MOCK_CREATORS[0],
    business_profile: MOCK_BUSINESSES[0],
  },
  {
    id: "lead-2",
    creator_id: "creator-2",
    business_id: "biz-2",
    status: "new",
    source: "content",
    vertical: "real_estate",
    title: "Luxury Condo Drone Tour Package",
    message:
      "We have 5 new waterfront condos launching next month. Need drone footage and virtual tour content for each unit.",
    estimated_value: 8500,
    created_at: "2026-03-12T09:00:00Z",
    updated_at: "2026-03-12T09:00:00Z",
    creator_profile: MOCK_CREATORS[1],
    business_profile: MOCK_BUSINESSES[1],
  },
  {
    id: "lead-3",
    creator_id: "creator-3",
    business_id: "biz-1",
    status: "converted",
    source: "referral",
    vertical: "hospitality",
    title: "Restaurant Week Social Media Takeover",
    message:
      "Interested in having you take over our social accounts during LA restaurant week. Full creative freedom.",
    estimated_value: 15000,
    created_at: "2026-01-20T11:00:00Z",
    updated_at: "2026-02-28T16:00:00Z",
    creator_profile: MOCK_CREATORS[2],
    business_profile: MOCK_BUSINESSES[0],
  },
  {
    id: "lead-4",
    creator_id: "creator-5",
    business_id: "biz-3",
    status: "contacted",
    source: "search",
    vertical: "hotel",
    title: "Luxury Resort Review Series",
    message:
      "We want to invite you for a 5-night stay at our Maui property. Looking for an honest luxury review across your channels.",
    estimated_value: 20000,
    created_at: "2026-03-05T08:00:00Z",
    updated_at: "2026-03-14T10:00:00Z",
    creator_profile: MOCK_CREATORS[4],
    business_profile: MOCK_BUSINESSES[2],
  },
  {
    id: "lead-5",
    creator_id: "creator-4",
    business_id: "biz-3",
    status: "new",
    source: "direct",
    vertical: "travel",
    title: "Adventure Experience Content",
    message:
      "We're launching adventure packages at our resort. Would love outdoor/adventure content showing activities like surfing, hiking, and kayaking.",
    estimated_value: 7500,
    created_at: "2026-03-16T15:00:00Z",
    updated_at: "2026-03-16T15:00:00Z",
    creator_profile: MOCK_CREATORS[3],
    business_profile: MOCK_BUSINESSES[2],
  },
  {
    id: "lead-6",
    creator_id: "creator-6",
    business_id: "biz-2",
    status: "closed",
    source: "search",
    vertical: "rental",
    title: "Airbnb Listing Content Refresh",
    message: "Need updated photos and video walkthroughs for 3 rental properties in Austin.",
    estimated_value: 3500,
    created_at: "2025-12-10T10:00:00Z",
    updated_at: "2026-01-15T12:00:00Z",
    creator_profile: MOCK_CREATORS[5],
    business_profile: MOCK_BUSINESSES[1],
  },
  {
    id: "lead-7",
    creator_id: "creator-1",
    business_id: "biz-3",
    status: "contacted",
    source: "content",
    vertical: "hotel",
    title: "Hawaii Property Launch Video",
    message: "We saw your Maldives hotel video and loved it. Interested in a similar cinematic piece for our new Hawaii property.",
    estimated_value: 18000,
    created_at: "2026-03-10T12:00:00Z",
    updated_at: "2026-03-15T09:00:00Z",
    creator_profile: MOCK_CREATORS[0],
    business_profile: MOCK_BUSINESSES[2],
  },
];

// ============================================================
// MESSAGES
// ============================================================
export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    lead_id: "lead-1",
    sender_id: "biz-1",
    recipient_id: "creator-1",
    body: "Hi Maya! We loved your recent Bali hotel series. Would you be available to discuss a potential collaboration for our LA rooftop suites?",
    read_at: "2026-02-15T11:00:00Z",
    created_at: "2026-02-15T10:00:00Z",
    sender: MOCK_PROFILES[6],
  },
  {
    id: "msg-2",
    lead_id: "lead-1",
    sender_id: "creator-1",
    recipient_id: "biz-1",
    body: "Hi Sarah! Thank you so much — I'd love to learn more about LuxStay's rooftop suites. What kind of content are you envisioning?",
    read_at: "2026-02-15T14:00:00Z",
    created_at: "2026-02-15T12:30:00Z",
    sender: MOCK_PROFILES[0],
  },
  {
    id: "msg-3",
    lead_id: "lead-1",
    sender_id: "biz-1",
    recipient_id: "creator-1",
    body: "We're thinking 3 short-form Reels/TikToks plus a longer 3-5 min YouTube piece. Budget is around $12K. We'd provide a complimentary 3-night stay for the shoot.",
    read_at: "2026-02-16T09:00:00Z",
    created_at: "2026-02-15T15:00:00Z",
    sender: MOCK_PROFILES[6],
  },
  {
    id: "msg-4",
    lead_id: "lead-1",
    sender_id: "creator-1",
    recipient_id: "biz-1",
    body: "That sounds amazing! I can definitely work with that. Let me put together a creative brief and we can finalize the details.",
    read_at: "2026-02-16T10:00:00Z",
    created_at: "2026-02-16T09:30:00Z",
    sender: MOCK_PROFILES[0],
  },
  {
    id: "msg-5",
    lead_id: "lead-4",
    sender_id: "biz-3",
    recipient_id: "creator-5",
    body: "Hi Priya! We've been following your luxury hotel reviews and think you'd be a perfect fit for our Maui resort. Would you be open to a hosted stay and review?",
    read_at: "2026-03-05T10:00:00Z",
    created_at: "2026-03-05T08:00:00Z",
    sender: MOCK_PROFILES[8],
  },
  {
    id: "msg-6",
    lead_id: "lead-4",
    sender_id: "creator-5",
    recipient_id: "biz-3",
    body: "Hi Emma! I'm very interested — Maui has been on my list. Could you share more details about the property and what deliverables you're looking for?",
    read_at: null,
    created_at: "2026-03-05T14:00:00Z",
    sender: MOCK_PROFILES[4],
  },
  {
    id: "msg-7",
    lead_id: "lead-7",
    sender_id: "biz-3",
    recipient_id: "creator-1",
    body: "Maya, your Maldives content was breathtaking! We're opening a new property in Maui and would love a similar cinematic approach. Are you available in April?",
    read_at: "2026-03-10T14:00:00Z",
    created_at: "2026-03-10T12:00:00Z",
    sender: MOCK_PROFILES[8],
  },
  {
    id: "msg-8",
    lead_id: "lead-7",
    sender_id: "creator-1",
    recipient_id: "biz-3",
    body: "Thank you Emma! I'm available mid-April onwards. Hawaii would be incredible to shoot. What's the timeline for launch?",
    read_at: null,
    created_at: "2026-03-10T16:00:00Z",
    sender: MOCK_PROFILES[0],
  },
];

// ============================================================
// CONTENT PIECES
// ============================================================
export const MOCK_CONTENT: ContentPiece[] = [
  {
    id: "content-1",
    creator_id: "creator-1",
    title: "Sunset at the Maldives — Luxury Villa Tour",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example1",
    thumbnail_url: null,
    views: 1200000,
    engagement_rate: 6.2,
    vertical: "hotel",
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "content-2",
    creator_id: "creator-1",
    title: "48 Hours in Bali's Most Exclusive Resort",
    platform: "instagram",
    url: "https://instagram.com/p/example2",
    thumbnail_url: null,
    views: 450000,
    engagement_rate: 5.8,
    vertical: "hotel",
    created_at: "2026-02-01T12:00:00Z",
  },
  {
    id: "content-3",
    creator_id: "creator-2",
    title: "$15M Waterfront Penthouse — Full Drone Tour",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example3",
    thumbnail_url: null,
    views: 890000,
    engagement_rate: 4.5,
    vertical: "real_estate",
    created_at: "2026-01-20T08:00:00Z",
  },
  {
    id: "content-4",
    creator_id: "creator-3",
    title: "Michelin Star Tasting Menu Experience",
    platform: "tiktok",
    url: "https://tiktok.com/@example/video4",
    thumbnail_url: null,
    views: 2800000,
    engagement_rate: 8.1,
    vertical: "hospitality",
    created_at: "2026-02-10T18:00:00Z",
  },
  {
    id: "content-5",
    creator_id: "creator-4",
    title: "Glamping in the Colorado Rockies",
    platform: "instagram",
    url: "https://instagram.com/p/example5",
    thumbnail_url: null,
    views: 320000,
    engagement_rate: 7.3,
    vertical: "travel",
    created_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "content-6",
    creator_id: "creator-5",
    title: "The Ritz-Carlton London — Is It Worth £2,000/Night?",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example6",
    thumbnail_url: null,
    views: 950000,
    engagement_rate: 5.1,
    vertical: "hotel",
    created_at: "2026-03-01T09:00:00Z",
  },
];

// ============================================================
// SERVICES
// ============================================================
export const MOCK_SERVICES: Service[] = [
  {
    id: "svc-1",
    creator_id: "creator-1",
    title: "Cinematic Hotel Tour Video",
    description: "Full cinematic property tour (3-5 min) with drone footage, interior walkthroughs, and lifestyle shots. Includes color grading and licensed music.",
    vertical: "hotel",
    price_type: "fixed",
    price_amount: 5000,
    deliverables: ["1x long-form video (3-5 min)", "3x short-form clips (15-60s)", "Raw footage delivery", "2 rounds of revisions"],
    is_active: true,
    created_at: "2025-11-15T10:00:00Z",
  },
  {
    id: "svc-2",
    creator_id: "creator-1",
    title: "Social Media Content Package",
    description: "Instagram Reels and TikTok content for hotels and resorts. Shot on location over 1-2 days.",
    vertical: "hotel",
    price_type: "fixed",
    price_amount: 3000,
    deliverables: ["5x Reels/TikToks", "10x static photos", "Story highlights content", "Caption copy"],
    is_active: true,
    created_at: "2025-12-01T10:00:00Z",
  },
  {
    id: "svc-3",
    creator_id: "creator-2",
    title: "Aerial Property Photography",
    description: "Professional drone photography and videography for real estate listings. FAA Part 107 certified.",
    vertical: "real_estate",
    price_type: "fixed",
    price_amount: 1500,
    deliverables: ["25+ edited aerial photos", "1x drone video (60-90s)", "MLS-ready formatting", "24h turnaround"],
    is_active: true,
    created_at: "2025-10-20T08:00:00Z",
  },
  {
    id: "svc-4",
    creator_id: "creator-3",
    title: "Restaurant Social Media Takeover",
    description: "Full day social media takeover covering your restaurant experience from prep to plating.",
    vertical: "hospitality",
    price_type: "fixed",
    price_amount: 4000,
    deliverables: ["Full day of content creation", "8x Stories", "3x Reels", "2x Feed posts", "Real-time engagement"],
    is_active: true,
    created_at: "2025-12-15T14:00:00Z",
  },
  {
    id: "svc-5",
    creator_id: "creator-6",
    title: "Airbnb Listing Optimization",
    description: "Complete photo and video package to boost your Airbnb listing's visibility and booking rate.",
    vertical: "rental",
    price_type: "fixed",
    price_amount: 800,
    deliverables: ["20+ professional photos", "1x walkthrough video", "Listing copy optimization", "SEO title suggestions"],
    is_active: true,
    created_at: "2026-02-10T13:00:00Z",
  },
];

// ============================================================
// HELPER — current logged-in user (for demo purposes)
// Switch between "creator-1" and "biz-1" to see different views
// ============================================================
export const CURRENT_USER_ID = "creator-1";

export function getCurrentUser(): Profile {
  return MOCK_PROFILES.find((p) => p.id === CURRENT_USER_ID)!;
}

export function getCurrentUserRole() {
  return getCurrentUser().role;
}

export function getLeadsForCurrentUser(): Lead[] {
  const role = getCurrentUserRole();
  return MOCK_LEADS.filter((l) =>
    role === "creator"
      ? l.creator_id === CURRENT_USER_ID
      : l.business_id === CURRENT_USER_ID
  );
}

export function getMessagesForLead(leadId: string): Message[] {
  return MOCK_MESSAGES.filter((m) => m.lead_id === leadId);
}

export function getCreatorById(id: string) {
  return MOCK_CREATORS.find((c) => c.id === id);
}

export function getBusinessById(id: string) {
  return MOCK_BUSINESSES.find((b) => b.id === id);
}

export function getContentForCreator(creatorId: string) {
  return MOCK_CONTENT.filter((c) => c.creator_id === creatorId);
}

export function getServicesForCreator(creatorId: string) {
  return MOCK_SERVICES.filter((s) => s.creator_id === creatorId);
}

// Stats helpers
export function getDashboardStats() {
  const leads = getLeadsForCurrentUser();
  const totalValue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);
  const activeLeads = leads.filter((l) => l.status !== "closed" && l.status !== "converted");
  const convertedLeads = leads.filter((l) => l.status === "converted");

  return {
    totalLeads: leads.length,
    activeLeads: activeLeads.length,
    convertedLeads: convertedLeads.length,
    totalValue,
    conversionRate: leads.length > 0 ? Math.round((convertedLeads.length / leads.length) * 100) : 0,
  };
}
