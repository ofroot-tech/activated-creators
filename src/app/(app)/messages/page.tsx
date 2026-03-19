"use client";

import { useState } from "react";
import {
  getLeadsForCurrentUser,
  getMessagesForLead,
  getCurrentUser,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, Clock, ArrowLeft } from "lucide-react";

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  const user = getCurrentUser();
  const leads = getLeadsForCurrentUser();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(
    leads[0]?.id || null
  );
  const [mobileShowThread, setMobileShowThread] = useState(false);

  // Build conversation list
  const conversations = leads
    .map((lead) => {
      const messages = getMessagesForLead(lead.id);
      const lastMessage = messages[messages.length - 1];
      const other =
        user.role === "creator"
          ? lead.business_profile
          : lead.creator_profile;
      const otherName =
        user.role === "creator"
          ? (other as typeof lead.business_profile)?.company_name
          : other?.profile?.full_name;

      const unreadCount = messages.filter(
        (m) => m.recipient_id === user.id && !m.read_at
      ).length;

      return {
        leadId: lead.id,
        title: lead.title,
        otherName: otherName || "Unknown",
        lastMessage,
        unreadCount,
        messages,
      };
    })
    .filter((c) => c.messages.length > 0)
    .sort((a, b) => {
      const aTime = a.lastMessage
        ? new Date(a.lastMessage.created_at).getTime()
        : 0;
      const bTime = b.lastMessage
        ? new Date(b.lastMessage.created_at).getTime()
        : 0;
      return bTime - aTime;
    });

  const selectedConvo = conversations.find((c) => c.leadId === selectedLeadId);

  function handleSelectConvo(leadId: string) {
    setSelectedLeadId(leadId);
    setMobileShowThread(true);
  }

  function handleBack() {
    setMobileShowThread(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Communicate with your campaign partners
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex h-[calc(100vh-12rem)] sm:h-[520px]">
          {/* Conversation list */}
          <div
            className={cn(
              "w-full shrink-0 border-r sm:w-64",
              mobileShowThread && "hidden sm:block"
            )}
          >
            <div className="border-b p-3">
              <h3 className="text-sm font-medium">Conversations</h3>
            </div>
            <div className="overflow-y-auto">
              {conversations.map((convo) => (
                <button
                  key={convo.leadId}
                  onClick={() => handleSelectConvo(convo.leadId)}
                  className={cn(
                    "flex w-full flex-col gap-0.5 border-b p-3 text-left transition-colors hover:bg-muted/50",
                    selectedLeadId === convo.leadId && "bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm font-medium">
                      {convo.otherName}
                    </span>
                    {convo.unreadCount > 0 && (
                      <Badge className="h-4 min-w-4 px-1 text-[9px]">
                        {convo.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <span className="truncate text-xs text-muted-foreground">
                    {convo.title}
                  </span>
                  {convo.lastMessage && (
                    <div className="flex items-center justify-between">
                      <span className="truncate text-[11px] text-muted-foreground">
                        {convo.lastMessage.body.slice(0, 40)}...
                      </span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {formatTime(convo.lastMessage.created_at)}
                      </span>
                    </div>
                  )}
                </button>
              ))}
              {conversations.length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="mb-2 size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No messages yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Message thread */}
          <div
            className={cn(
              "flex flex-1 flex-col",
              !mobileShowThread && "hidden sm:flex"
            )}
          >
            {selectedConvo ? (
              <>
                {/* Thread header */}
                <div className="flex items-center gap-3 border-b p-3">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="sm:hidden"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="size-4" />
                  </Button>
                  <Avatar size="sm">
                    <AvatarFallback>
                      {selectedConvo.otherName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {selectedConvo.otherName}
                    </div>
                    <div className="truncate text-[10px] text-muted-foreground">
                      {selectedConvo.title}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {selectedConvo.messages.map((msg) => {
                    const isMe = msg.sender_id === user.id;
                    return (
                      <div
                        key={msg.id}
                        className={cn("flex", isMe && "justify-end")}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] sm:max-w-[75%] rounded-lg p-3",
                            isMe
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm">{msg.body}</p>
                          <div
                            className={cn(
                              "mt-1 flex items-center gap-1 text-[10px]",
                              isMe
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            <Clock className="size-2.5" />
                            {formatTime(msg.created_at)}
                            {msg.read_at && isMe && (
                              <span className="ml-1">• Read</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input */}
                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button size="icon">
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <MessageSquare className="mb-3 size-10 text-muted-foreground" />
                <p className="text-sm font-medium">Select a conversation</p>
                <p className="text-xs text-muted-foreground">
                  Choose a conversation to view messages
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
