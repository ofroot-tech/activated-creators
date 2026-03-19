"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Camera, Building2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"creator" | "business">("creator");

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Choose your role to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Role selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setRole("creator")}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all",
              role === "creator"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:bg-muted"
            )}
          >
            <Camera
              className={cn(
                "size-5",
                role === "creator"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
            <span className="text-sm font-medium">Creator</span>
            <span className="text-[10px] text-muted-foreground">
              I create content
            </span>
          </button>
          <button
            onClick={() => setRole("business")}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all",
              role === "business"
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border hover:bg-muted"
            )}
          >
            <Building2
              className={cn(
                "size-5",
                role === "business"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
            <span className="text-sm font-medium">Business</span>
            <span className="text-[10px] text-muted-foreground">
              I hire creators
            </span>
          </button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button
          className="w-full"
          onClick={() => router.push("/dashboard")}
        >
          Create Account
        </Button>
        <Separator />
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
