"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  UserCircle,
  Sparkles,
  LogOut,
  Search,
  Menu,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/creators", label: "Creators", icon: Search },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const user = getCurrentUser();
  const initials = user.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="flex h-14 items-center gap-2 px-4">
        <Sparkles className="size-5 text-primary" />
        <span className="text-sm font-semibold">Activated Creators</span>
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 p-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate}>
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
        <Link href="/" onClick={onNavigate}>
          <Button variant="ghost" size="icon-xs">
            <LogOut className="size-3" />
          </Button>
        </Link>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-56 flex-col border-r bg-sidebar md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sheet sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-56 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-full flex-col">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background/80 backdrop-blur-md px-4 md:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-semibold">Activated Creators</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
