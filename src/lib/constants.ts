import { type IndustryVertical, type CreatorNiche, type LeadStatus } from "@/types";

export const APP_NAME = "Activated Creators";
export const APP_DESCRIPTION =
  "Connect with top content creators for your hospitality, real estate, and travel brand.";

export const VERTICALS: { value: IndustryVertical; label: string; icon: string }[] = [
  { value: "real_estate", label: "Real Estate", icon: "🏠" },
  { value: "hotel", label: "Hotels", icon: "🏨" },
  { value: "rental", label: "Rentals", icon: "🏡" },
  { value: "condo", label: "Condos", icon: "🏢" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "hospitality", label: "Hospitality", icon: "🍽️" },
  { value: "other", label: "Other", icon: "📋" },
];

export const NICHES: { value: CreatorNiche; label: string }[] = [
  { value: "travel", label: "Travel" },
  { value: "real_estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "food", label: "Food & Dining" },
  { value: "adventure", label: "Adventure" },
  { value: "luxury", label: "Luxury" },
  { value: "other", label: "Other" },
];

export const LEAD_STATUSES: { value: LeadStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { value: "in_progress", label: "In Progress", color: "bg-purple-500" },
  { value: "converted", label: "Converted", color: "bg-green-500" },
  { value: "closed", label: "Closed", color: "bg-gray-500" },
];

export const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
];
