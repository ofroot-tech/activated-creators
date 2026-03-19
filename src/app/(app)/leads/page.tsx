"use client";

import { useState } from "react";
import {
  getLeadsForCurrentUser,
  getCurrentUser,
  getMessagesForLead,
} from "@/lib/mock-data";
import { LEAD_STATUSES, VERTICALS } from "@/lib/constants";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DollarSign,
  Clock,
  MessageSquare,
  Building2,
  UserCircle,
  ArrowUpRight,
} from "lucide-react";
import type { Lead } from "@/types";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LeadsPage() {
  const user = getCurrentUser();
  const leads = getLeadsForCurrentUser();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = leads.filter(
    (l) => !statusFilter || l.status === statusFilter
  );

  const statusCounts = LEAD_STATUSES.map((s) => ({
    ...s,
    count: leads.filter((l) => l.status === s.value).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your campaign opportunities
        </p>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={statusFilter === null ? "default" : "outline"}
          size="xs"
          onClick={() => setStatusFilter(null)}
        >
          All ({leads.length})
        </Button>
        {statusCounts.map((s) => (
          <Button
            key={s.value}
            variant={statusFilter === s.value ? "default" : "outline"}
            size="xs"
            onClick={() =>
              setStatusFilter(statusFilter === s.value ? null : s.value)
            }
          >
            {s.label} ({s.count})
          </Button>
        ))}
      </div>

      {/* Mobile: Card list */}
      <div className="space-y-3 sm:hidden">
        {filtered.map((lead) => {
          const statusInfo = LEAD_STATUSES.find(
            (s) => s.value === lead.status
          );
          const verticalInfo = VERTICALS.find(
            (v) => v.value === lead.vertical
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
            <Card
              key={lead.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setSelectedLead(lead)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {lead.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[10px]">
                          {(otherName || "?")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate text-xs text-muted-foreground">
                        {otherName}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`shrink-0 text-[10px] ${statusInfo?.color.replace("bg-", "text-")}`}
                  >
                    {statusInfo?.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[10px]">
                    {verticalInfo?.icon} {verticalInfo?.label}
                  </Badge>
                  {lead.estimated_value && (
                    <span className="font-medium text-foreground">
                      {formatCurrency(lead.estimated_value)}
                    </span>
                  )}
                  <span className="ml-auto">{formatDate(lead.updated_at)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop: Table */}
      <Card className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>{user.role === "creator" ? "Brand" : "Creator"}</TableHead>
              <TableHead className="hidden lg:table-cell">Vertical</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Updated</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((lead) => {
              const statusInfo = LEAD_STATUSES.find(
                (s) => s.value === lead.status
              );
              const verticalInfo = VERTICALS.find(
                (v) => v.value === lead.vertical
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
                <TableRow
                  key={lead.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell className="font-medium">{lead.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback>
                          {(otherName || "?")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{otherName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline" className="text-[10px]">
                      {verticalInfo?.icon} {verticalInfo?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {lead.estimated_value
                      ? formatCurrency(lead.estimated_value)
                      : "\u2014"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${statusInfo?.color.replace("bg-", "text-")}`}
                    >
                      {statusInfo?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {formatDate(lead.updated_at)}
                  </TableCell>
                  <TableCell>
                    <ArrowUpRight className="size-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No leads match the selected filter.
        </div>
      )}

      {/* Lead Detail Dialog */}
      <Dialog
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      >
        {selectedLead && (
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedLead.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {(() => {
                  const statusInfo = LEAD_STATUSES.find(
                    (s) => s.value === selectedLead.status
                  );
                  return (
                    <Badge
                      variant="secondary"
                      className={`${statusInfo?.color.replace("bg-", "text-")}`}
                    >
                      {statusInfo?.label}
                    </Badge>
                  );
                })()}
                <span>•</span>
                <span>Created {formatDate(selectedLead.created_at)}</span>
              </DialogDescription>
            </DialogHeader>

            {/* Parties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Building2 className="size-3" />
                  Brand
                </div>
                <div className="text-sm font-medium">
                  {selectedLead.business_profile?.company_name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedLead.business_profile?.profile?.full_name}
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <UserCircle className="size-3" />
                  Creator
                </div>
                <div className="text-sm font-medium">
                  {selectedLead.creator_profile?.profile?.full_name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedLead.creator_profile?.niche}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {selectedLead.message && (
                <div>
                  <h4 className="mb-1 text-xs font-medium text-muted-foreground">
                    Brief
                  </h4>
                  <p className="text-sm">{selectedLead.message}</p>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {selectedLead.estimated_value && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="size-3.5 text-muted-foreground" />
                    <span className="font-medium">
                      {formatCurrency(selectedLead.estimated_value)}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="size-3.5 text-muted-foreground" />
                  <span>
                    Updated {formatDate(selectedLead.updated_at)}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Messages preview */}
            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                <MessageSquare className="size-3.5" />
                Messages
              </h4>
              {getMessagesForLead(selectedLead.id).length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {getMessagesForLead(selectedLead.id).map((msg) => (
                    <div
                      key={msg.id}
                      className="rounded-lg bg-muted/50 p-2"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-medium">
                          {msg.sender?.full_name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {formatDate(msg.created_at)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {msg.body}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No messages yet.
                </p>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
