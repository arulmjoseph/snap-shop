import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Camera, CheckCircle2, ShieldCheck, Sparkles, Users } from "lucide-react";

import creatorImage from "@/assets/creator-kit.jpg";
import heroImage from "@/assets/camera-hero.jpg";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Ambly Trading Dubai" },
      { name: "description", content: "Learn about Ambly Trading, Dubai's premier store for professional cameras, cinema lenses, and creator equipment." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "About Ambly Trading" }]} />

        {/* Hero Section */}
        <div className="mt-2 relative rounded-xl bg-footer overflow-hidden min-h-[400px] flex items-center p-8 sm:p-14 text-brand-contrast">
          <img src={heroImage} alt="Camera showroom" className="absolute inset-0 size-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Dubai's Creator Destination</span>
            <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl leading-tight">
              For those who see differently.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-brand-contrast/80 leading-relaxed">
              Ambly Trading L.L.C has been providing professional photographers, filmmakers, and content creators across the UAE with authentic camera equipment, cinema lenses, and studio tools.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <strong className="font-display text-3xl font-bold text-primary block">10,000+</strong>
            <span className="text-xs font-semibold text-muted-foreground mt-1 block">Creators Served</span>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <strong className="font-display text-3xl font-bold text-primary block">100%</strong>
            <span className="text-xs font-semibold text-muted-foreground mt-1 block">Genuine UAE Stock</span>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <strong className="font-display text-3xl font-bold text-primary block">50+</strong>
            <span className="text-xs font-semibold text-muted-foreground mt-1 block">Global Gear Brands</span>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <strong className="font-display text-3xl font-bold text-primary block">24 Hours</strong>
            <span className="text-xs font-semibold text-muted-foreground mt-1 block">Express UAE Dispatch</span>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Story</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Built in the heart of Dubai's camera district</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Located on Naif Street in Deira, Ambly Trading started with a single promise: to provide filmmakers and photographers with verified authentic equipment and honest expert advice.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you are gearing up for a commercial shoot in Downtown Dubai, vlogging on the move, or setting up a full podcast studio, our team tests every kit to ensure it meets professional standards.
            </p>
            <div className="pt-2">
              <Button size="lg" className="font-bold gap-2 text-xs" asChild>
                <Link to="/contact">Visit Dubai Showroom <ArrowRight className="size-4" /></Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-product">
            <img src={creatorImage} alt="Camera gear" className="size-full object-cover" />
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Why Choose Us</span>
            <h2 className="font-display text-3xl font-bold mt-1">The Ambly Guarantee</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <ShieldCheck className="size-8 text-primary" />
              <h3 className="font-display text-lg font-bold">100% Genuine UAE Warranty</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All cameras and lenses sold at Ambly Trading are sourced from official brand distributors with valid manufacturer warranties.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <Camera className="size-8 text-primary" />
              <h3 className="font-display text-lg font-bold">Expert Creator Support</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our team consists of practicing photographers and video pros who can guide you on the exact kit needed for your budget and goals.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <Award className="size-8 text-primary" />
              <h3 className="font-display text-lg font-bold">Showroom & Online Convenience</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Test products live in our Dubai showroom or order online with free express shipping across all 7 Emirates.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
