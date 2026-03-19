"use client";

import { useState } from "react";
import { MOCK_CREATORS, getContentForCreator, getServicesForCreator } from "@/lib/mock-data";
import { NICHES } from "@/lib/constants";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  Instagram,
  Youtube,
  CheckCircle,
  DollarSign,
  Eye,
  TrendingUp,
  ExternalLink,
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

export default function CreatorsPage() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<
    (typeof MOCK_CREATORS)[0] | null
  >(null);

  const filtered = MOCK_CREATORS.filter((c) => {
    const matchesSearch =
      !search ||
      c.profile.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.bio?.toLowerCase().includes(search.toLowerCase());
    const matchesNiche = !nicheFilter || c.niche === nicheFilter;
    return matchesSearch && matchesNiche;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Browse Creators</h1>
        <p className="text-sm text-muted-foreground">
          Find the perfect creator for your next campaign
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Button
            variant={nicheFilter === null ? "default" : "outline"}
            size="xs"
            onClick={() => setNicheFilter(null)}
          >
            All
          </Button>
          {NICHES.map((n) => (
            <Button
              key={n.value}
              variant={nicheFilter === n.value ? "default" : "outline"}
              size="xs"
              onClick={() =>
                setNicheFilter(nicheFilter === n.value ? null : n.value)
              }
            >
              {n.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((creator) => (
          <Card
            key={creator.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => setSelectedCreator(creator)}
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar size="lg">
                  <AvatarFallback>
                    {creator.profile.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                  {creator.is_verified && (
                    <AvatarBadge className="bg-blue-500" />
                  )}
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-1.5">
                    {creator.profile.full_name}
                    {creator.is_verified && (
                      <CheckCircle className="size-3.5 text-blue-500" />
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {creator.location_city}, {creator.location_country}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {creator.bio}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-[10px]">
                  {NICHES.find((n) => n.value === creator.niche)?.label}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    creator.availability_status === "available"
                      ? "text-green-600"
                      : creator.availability_status === "busy"
                        ? "text-amber-600"
                        : "text-red-600"
                  }`}
                >
                  {creator.availability_status}
                </Badge>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-semibold">
                    {formatFollowers(creator.follower_count)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Followers
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {creator.avg_engagement_rate}%
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Engagement
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {creator.hourly_rate
                      ? `$${creator.hourly_rate}`
                      : "—"}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    /hour
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          No creators found matching your search.
        </div>
      )}

      {/* Creator Detail Dialog */}
      <Dialog
        open={!!selectedCreator}
        onOpenChange={(open) => !open && setSelectedCreator(null)}
      >
        {selectedCreator && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback>
                    {selectedCreator.profile.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="flex items-center gap-1.5">
                    {selectedCreator.profile.full_name}
                    {selectedCreator.is_verified && (
                      <CheckCircle className="size-3.5 text-blue-500" />
                    )}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {selectedCreator.location_city},{" "}
                    {selectedCreator.location_country}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              {selectedCreator.bio}
            </p>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-lg font-bold">
                  {formatFollowers(selectedCreator.follower_count)}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Followers
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-lg font-bold">
                  {selectedCreator.avg_engagement_rate}%
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Engagement
                </div>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-lg font-bold">
                  {selectedCreator.hourly_rate
                    ? formatCurrency(selectedCreator.hourly_rate)
                    : "—"}
                </div>
                <div className="text-[10px] text-muted-foreground">/hour</div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-2">
              {selectedCreator.instagram_handle && (
                <Badge variant="outline" className="gap-1">
                  <Instagram className="size-3" />@
                  {selectedCreator.instagram_handle}
                </Badge>
              )}
              {selectedCreator.tiktok_handle && (
                <Badge variant="outline" className="gap-1">
                  <ExternalLink className="size-3" />@
                  {selectedCreator.tiktok_handle}
                </Badge>
              )}
              {selectedCreator.youtube_handle && (
                <Badge variant="outline" className="gap-1">
                  <Youtube className="size-3" />
                  {selectedCreator.youtube_handle}
                </Badge>
              )}
            </div>

            {/* Content pieces */}
            {getContentForCreator(selectedCreator.id).length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 text-sm font-medium">Portfolio</h4>
                  <div className="space-y-2">
                    {getContentForCreator(selectedCreator.id).map((content) => (
                      <div
                        key={content.id}
                        className="flex items-center gap-3 rounded-lg bg-muted/50 p-2"
                      >
                        <div className="flex size-8 items-center justify-center rounded bg-muted text-xs font-medium uppercase">
                          {content.platform.slice(0, 2)}
                        </div>
                        <div className="flex-1 truncate">
                          <div className="truncate text-xs font-medium">
                            {content.title}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <Eye className="size-3" />
                            {formatFollowers(content.views)} views
                            <TrendingUp className="size-3" />
                            {content.engagement_rate}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Services */}
            {getServicesForCreator(selectedCreator.id).length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 text-sm font-medium">Services</h4>
                  <div className="space-y-2">
                    {getServicesForCreator(selectedCreator.id).map((svc) => (
                      <div
                        key={svc.id}
                        className="flex items-center justify-between rounded-lg bg-muted/50 p-2"
                      >
                        <div>
                          <div className="text-xs font-medium">{svc.title}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {svc.deliverables.length} deliverables
                          </div>
                        </div>
                        <Badge variant="secondary" className="gap-1 text-[10px]">
                          <DollarSign className="size-3" />
                          {svc.price_amount
                            ? formatCurrency(svc.price_amount)
                            : "Negotiable"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
