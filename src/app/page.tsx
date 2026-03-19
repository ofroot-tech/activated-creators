import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  TrendingUp,
  Camera,
  Globe,
  Star,
} from "lucide-react";

const STATS = [
  { label: "Active Creators", value: "2,400+", icon: Users },
  { label: "Brands Connected", value: "580+", icon: Building2 },
  { label: "Campaigns Delivered", value: "12,000+", icon: Camera },
  { label: "Countries Covered", value: "45+", icon: Globe },
];

const VERTICALS = [
  { name: "Hotels & Resorts", icon: "🏨", count: 340 },
  { name: "Real Estate", icon: "🏠", count: 280 },
  { name: "Vacation Rentals", icon: "🏡", count: 195 },
  { name: "Restaurants", icon: "🍽️", count: 420 },
  { name: "Travel & Tourism", icon: "✈️", count: 310 },
  { name: "Luxury Lifestyle", icon: "💎", count: 155 },
];

const TESTIMONIALS = [
  {
    quote:
      "Activated Creators helped us find the perfect content creator for our resort launch. The cinematic videos drove a 40% increase in direct bookings.",
    author: "Sarah Mitchell",
    role: "Marketing Director, LuxStay Hotels",
  },
  {
    quote:
      "As a creator, this platform connects me with brands that actually align with my content. The lead quality is unmatched.",
    author: "Maya Chen",
    role: "Travel Content Creator, 245K followers",
  },
  {
    quote:
      "We've worked with 8 creators through the platform and every collaboration exceeded our expectations. The ROI speaks for itself.",
    author: "David Park",
    role: "CEO, Modern Living Realty",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <span className="text-base font-semibold">Activated Creators</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
                <ArrowRight className="size-3.5" data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:py-32">
          <Badge variant="secondary" className="mb-4">
            <Star className="size-3" data-icon="inline-start" />
            Trusted by 580+ hospitality brands
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Connect with creators who
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}
              move the needle
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The marketplace for hospitality, real estate, and travel brands to
            find and hire top content creators. Turn stunning content into
            bookings, listings, and revenue.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start for Free
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 size-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-2 text-muted-foreground">
            Three steps to amazing content
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Browse Creators",
              description:
                "Search our curated network of verified creators by niche, location, and budget. View portfolios, engagement rates, and reviews.",
            },
            {
              step: "02",
              title: "Send a Brief",
              description:
                "Submit your project details and budget. Creators review and respond with proposals tailored to your brand.",
            },
            {
              step: "03",
              title: "Launch & Track",
              description:
                "Manage your campaigns from a single dashboard. Track deliverables, messages, and ROI all in one place.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verticals */}
      <section className="border-y bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Built for Your Industry</h2>
            <p className="mt-2 text-muted-foreground">
              Specialized creators for every vertical
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {VERTICALS.map((v) => (
              <div
                key={v.name}
                className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{v.icon}</span>
                <span className="text-sm font-medium">{v.name}</span>
                <span className="text-xs text-muted-foreground">
                  {v.count} creators
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">What People Say</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="flex flex-col justify-between rounded-xl border bg-card p-6"
            >
              <p className="mb-4 text-sm text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="text-sm font-medium">{t.author}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary/5 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to create something amazing?</h2>
          <p className="mt-3 text-muted-foreground">
            Join hundreds of brands and creators already building partnerships on Activated Creators.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="size-4" />
            <span>Activated Creators</span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <TrendingUp className="size-3.5" />
            <span>&copy; 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
