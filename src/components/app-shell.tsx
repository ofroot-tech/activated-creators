"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  UserCircle,
  Sparkles,
  LogOut,
  Search,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/creators", label: "Creators", icon: Search },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = getCurrentUser();
  const initials = user.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-56 flex-col border-r bg-sidebar">
        <div className="flex h-14 items-center gap-2 px-4">
          <Sparkles className="size-5 text-primary" />
          <span className="text-sm font-semibold">Activated Creators</span>
        </div>
        <Separator />
        <nav className="flex-1 space-y-1 p-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn("w-full justify-start gap-2", {
                    "font-semibold": isActive,
                  })}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <Separator />
        <div className="flex items-center gap-2 p-3">
          <Avatar size="sm">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <div className="truncate text-xs font-medium">{user.full_name}</div>
            <div className="truncate text-[10px] text-muted-foreground">
              {user.role === "creator" ? "Creator" : "Business"}
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon-xs">
              <LogOut className="size-3" />
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
