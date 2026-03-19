"use client";

import {
  getDashboardStats,
  getLeadsForCurrentUser,
  getCurrentUser,
  MOCK_CREATORS,
} from "@/lib/mock-data";
import { LEAD_STATUSES } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  Users,
  Briefcase,
  ArrowRight,
  Clock,
} from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function DashboardPage() {
  const user = getCurrentUser();
  const stats = getDashboardStats();
  const leads = getLeadsForCurrentUser();
  const recentLeads = leads
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 5);

  const statCards = [
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Active",
      value: stats.activeLeads,
      icon: Briefcase,
      color: "text-purple-600",
    },
    {
      label: "Converted",
      value: stats.convertedLeads,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Total Value",
      value: formatCurrency(stats.totalValue),
      icon: DollarSign,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user.full_name.split(" ")[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your campaigns
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="flex items-center gap-3">
              <div
                className={`flex size-9 items-center justify-center rounded-lg bg-muted ${s.color}`}
              >
                <s.icon className="size-4" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-lg font-bold">{s.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent leads */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Your latest campaign opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLeads.map((lead) => {
              const statusInfo = LEAD_STATUSES.find(
                (s) => s.value === lead.status
              );
              const other =
                user.role === "creator"
                  ? lead.business_profile
                  : lead.creator_profile;
              const otherName =
                user.role === "creator"
                  ? (other as typeof lead.business_profile)?.company_name
                  : other?.profile?.full_name;
              return (
                <Link href="/leads" key={lead.id}>
                  <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
                    <Avatar size="sm">
                      <AvatarFallback>
                        {(otherName || "?")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                      <div className="truncate text-sm font-medium">
                        {lead.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{otherName}</span>
                        <span className="text-[10px]">•</span>
                        <Clock className="size-3" />
                        <span>{timeAgo(lead.updated_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lead.estimated_value && (
                        <span className="text-xs font-medium text-muted-foreground">
                          {formatCurrency(lead.estimated_value)}
                        </span>
                      )}
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${statusInfo?.color.replace("bg-", "text-")}`}
                      >
                        {statusInfo?.label}
                      </Badge>
                    </div>
                  </div>
                </Link>
              );
            })}
            <Link href="/leads">
              <Button variant="ghost" size="sm" className="w-full mt-2">
                View all leads
                <ArrowRight className="size-3" data-icon="inline-end" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Top creators */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Creators</CardTitle>
            <CardDescription>Highest engagement this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_CREATORS.sort(
              (a, b) => b.avg_engagement_rate - a.avg_engagement_rate
            )
              .slice(0, 5)
              .map((creator, i) => (
                <div key={creator.id} className="flex items-center gap-3">
                  <span className="w-4 text-xs font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  <Avatar size="sm">
                    <AvatarFallback>
                      {creator.profile.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <div className="truncate text-sm font-medium">
                      {creator.profile.full_name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {creator.niche} •{" "}
                      {(creator.follower_count / 1000).toFixed(0)}K followers
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {creator.avg_engagement_rate}%
                  </Badge>
                </div>
              ))}
            <Link href="/creators">
              <Button variant="ghost" size="sm" className="w-full mt-2">
                Browse all creators
                <ArrowRight className="size-3" data-icon="inline-end" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
