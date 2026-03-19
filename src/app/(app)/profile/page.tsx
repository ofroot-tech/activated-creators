"use client";

import {
  getCurrentUser,
  getCreatorById,
  getBusinessById,
  getContentForCreator,
  getServicesForCreator,
  CURRENT_USER_ID,
} from "@/lib/mock-data";
import { NICHES, VERTICALS } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  MapPin,
  Instagram,
  Youtube,
  ExternalLink,
  CheckCircle,
  DollarSign,
  Eye,
  TrendingUp,
  Edit,
  Globe,
  Building2,
  Users,
  Wallet,
} from "lucide-react";

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function ProfilePage() {
  const user = getCurrentUser();
  const isCreator = user.role === "creator";
  const creatorProfile = isCreator ? getCreatorById(CURRENT_USER_ID) : null;
  const businessProfile = !isCreator ? getBusinessById(CURRENT_USER_ID) : null;

  const initials = user.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your public profile and settings
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="size-3.5" data-icon="inline-start" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:items-start">
          <Avatar size="lg" className="size-20">
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            {creatorProfile?.is_verified && (
              <AvatarBadge className="size-5 bg-blue-500" />
            )}
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h2 className="text-xl font-bold">{user.full_name}</h2>
              {creatorProfile?.is_verified && (
                <CheckCircle className="size-4 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            {creatorProfile && (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge variant="secondary">
                  {NICHES.find((n) => n.value === creatorProfile.niche)?.label}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    creatorProfile.availability_status === "available"
                      ? "text-green-600"
                      : "text-amber-600"
                  }
                >
                  {creatorProfile.availability_status}
                </Badge>
                {creatorProfile.location_city && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {creatorProfile.location_city},{" "}
                    {creatorProfile.location_country}
                  </span>
                )}
              </div>
            )}

            {businessProfile && (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge variant="secondary">
                  {VERTICALS.find(
                    (v) => v.value === businessProfile.industry_vertical
                  )?.label}
                </Badge>
                {businessProfile.location_city && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {businessProfile.location_city},{" "}
                    {businessProfile.location_country}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Creator Profile */}
      {creatorProfile && (
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {creatorProfile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Card size="sm">
                <CardContent className="text-center">
                  <Users className="mx-auto mb-1 size-4 text-muted-foreground" />
                  <div className="text-lg font-bold">
                    {formatFollowers(creatorProfile.follower_count)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Followers
                  </div>
                </CardContent>
              </Card>
              <Card size="sm">
                <CardContent className="text-center">
                  <TrendingUp className="mx-auto mb-1 size-4 text-muted-foreground" />
                  <div className="text-lg font-bold">
                    {creatorProfile.avg_engagement_rate}%
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Engagement
                  </div>
                </CardContent>
              </Card>
              <Card size="sm">
                <CardContent className="text-center">
                  <Wallet className="mx-auto mb-1 size-4 text-muted-foreground" />
                  <div className="text-lg font-bold">
                    {creatorProfile.hourly_rate
                      ? `$${creatorProfile.hourly_rate}`
                      : "—"}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    /hour
                  </div>
                </CardContent>
              </Card>
              <Card size="sm">
                <CardContent className="text-center">
                  <Eye className="mx-auto mb-1 size-4 text-muted-foreground" />
                  <div className="text-lg font-bold">
                    {getContentForCreator(creatorProfile.id).length}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Content Pieces
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Socials */}
            <Card>
              <CardHeader>
                <CardTitle>Social Accounts</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {creatorProfile.instagram_handle && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1">
                    <Instagram className="size-3.5" />@
                    {creatorProfile.instagram_handle}
                  </Badge>
                )}
                {creatorProfile.tiktok_handle && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1">
                    <ExternalLink className="size-3.5" />@
                    {creatorProfile.tiktok_handle}
                  </Badge>
                )}
                {creatorProfile.youtube_handle && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1">
                    <Youtube className="size-3.5" />
                    {creatorProfile.youtube_handle}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {getContentForCreator(creatorProfile.id).map((content) => (
                <Card key={content.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">{content.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        {content.platform}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {VERTICALS.find((v) => v.value === content.vertical)
                          ?.icon}{" "}
                        {VERTICALS.find((v) => v.value === content.vertical)
                          ?.label}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="size-3" />
                        {formatFollowers(content.views)} views
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <TrendingUp className="size-3" />
                        {content.engagement_rate}% engagement
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {getContentForCreator(creatorProfile.id).length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No portfolio pieces yet.
              </div>
            )}
          </TabsContent>

          <TabsContent value="services" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {getServicesForCreator(creatorProfile.id).map((svc) => (
                <Card key={svc.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm">{svc.title}</CardTitle>
                        <CardDescription>
                          {VERTICALS.find((v) => v.value === svc.vertical)
                            ?.icon}{" "}
                          {VERTICALS.find((v) => v.value === svc.vertical)
                            ?.label}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <DollarSign className="size-3" />
                        {svc.price_amount
                          ? formatCurrency(svc.price_amount)
                          : "Negotiable"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {svc.description && (
                      <p className="text-xs text-muted-foreground">
                        {svc.description}
                      </p>
                    )}
                    <div>
                      <h4 className="mb-1 text-xs font-medium">
                        Deliverables
                      </h4>
                      <ul className="space-y-0.5">
                        {svc.deliverables.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground"
                          >
                            <CheckCircle className="size-3 text-green-500" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {getServicesForCreator(creatorProfile.id).length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                No services listed yet.
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Business Profile */}
      {businessProfile && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-0.5 text-xs text-muted-foreground">
                    Company Name
                  </div>
                  <div className="text-sm font-medium">
                    {businessProfile.company_name}
                  </div>
                </div>
                <div>
                  <div className="mb-0.5 text-xs text-muted-foreground">
                    Industry
                  </div>
                  <div className="text-sm font-medium">
                    {VERTICALS.find(
                      (v) => v.value === businessProfile.industry_vertical
                    )?.label}
                  </div>
                </div>
                <div>
                  <div className="mb-0.5 text-xs text-muted-foreground">
                    Company Size
                  </div>
                  <div className="text-sm font-medium">
                    {businessProfile.company_size || "—"} employees
                  </div>
                </div>
                <div>
                  <div className="mb-0.5 text-xs text-muted-foreground">
                    Budget Range
                  </div>
                  <div className="text-sm font-medium">
                    {businessProfile.budget_range || "—"}
                  </div>
                </div>
              </div>
              {businessProfile.description && (
                <>
                  <Separator />
                  <div>
                    <div className="mb-0.5 text-xs text-muted-foreground">
                      About
                    </div>
                    <p className="text-sm">{businessProfile.description}</p>
                  </div>
                </>
              )}
              {businessProfile.website && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Globe className="size-3.5" />
                  <a
                    href={businessProfile.website}
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    {businessProfile.website}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
