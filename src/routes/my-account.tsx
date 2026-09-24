import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  Heart,
  KeyRound,
  LogOut,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  User,
} from "lucide-react";

import { MOCK_PRODUCTS } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-account")({
  head: () => ({
    meta: [
      { title: "My Account | Ambly Trading Dubai" },
      { name: "description", content: "Manage your camera orders, shipping addresses, wishlist, and account credentials." },
    ],
  }),
  component: MyAccountPage,
});

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

type TabType = "dashboard" | "orders" | "addresses" | "account";

function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const orders = [
    {
      id: "AMB-948201",
      date: "24 Sep 2026",
      status: "Processing",
      statusColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      total: 6603,
      itemsCount: 3,
    },
    {
      id: "AMB-882104",
      date: "12 Aug 2026",
      status: "Completed",
      statusColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      total: 12499,
      itemsCount: 1,
    },
    {
      id: "AMB-761290",
      date: "04 May 2026",
      status: "Completed",
      statusColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      total: 1099,
      itemsCount: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "My Account" }]} />

        <div className="mt-2 flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl text-foreground flex items-center gap-3">
              <User className="size-7 text-primary" /> WooCommerce Customer Portal
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Logged in as <strong className="text-foreground">arul@example.com</strong>
            </p>
          </div>
          <Button variant="outline" size="sm" className="font-bold text-xs gap-2" onClick={() => alert("Logged out!")}>
            <LogOut className="size-4" /> Logout
          </Button>
        </div>

        {/* Account Dashboard Layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Menu */}
          <aside className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard Overview", icon: User },
              { id: "orders", label: "My Orders (3)", icon: Package },
              { id: "addresses", label: "Saved Addresses", icon: MapPin },
              { id: "account", label: "Account Details", icon: KeyRound },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-4 py-3 text-xs font-bold transition text-left",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <Link
              to="/wishlist"
              className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition"
            >
              <Heart className="size-4 text-primary" />
              <span>My Wishlist</span>
            </Link>
          </aside>

          {/* Main Tab Content */}
          <div>
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="font-display text-xl font-bold">Hello, Arul Joseph 👋</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    From your WooCommerce account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                  </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-card p-5">
                    <span className="text-xs font-bold uppercase text-muted-foreground">Total Orders</span>
                    <strong className="block font-display text-3xl font-bold mt-1 text-foreground">3 Orders</strong>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-5">
                    <span className="text-xs font-bold uppercase text-muted-foreground">In Progress</span>
                    <strong className="block font-display text-3xl font-bold mt-1 text-primary">1 Package</strong>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-5">
                    <span className="text-xs font-bold uppercase text-muted-foreground">Default Address</span>
                    <strong className="block text-sm font-bold mt-1 text-foreground">Deira, Dubai, UAE</strong>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-base font-bold">Recent Order Activity</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-primary hover:underline">
                      View All Orders →
                    </button>
                  </div>

                  <div className="rounded border border-border overflow-hidden">
                    <div className="grid grid-cols-4 bg-muted/50 p-3 text-xs font-bold text-muted-foreground">
                      <span>Order #</span>
                      <span>Date</span>
                      <span>Status</span>
                      <span className="text-right">Total</span>
                    </div>
                    <div className="grid grid-cols-4 p-3 text-xs border-t border-border items-center">
                      <strong className="text-foreground">#{orders[0].id}</strong>
                      <span className="text-muted-foreground">{orders[0].date}</span>
                      <span className={cn("inline-block w-fit px-2 py-0.5 rounded-full text-[10px] font-bold border", orders[0].statusColor)}>
                        {orders[0].status}
                      </span>
                      <strong className="text-right text-foreground">AED {formatPrice(orders[0].total)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground">My Order History</h2>
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="hidden sm:grid grid-cols-5 bg-muted/50 p-4 text-xs font-bold text-muted-foreground border-b border-border">
                    <span>Order Number</span>
                    <span>Date</span>
                    <span>Fulfillment Status</span>
                    <span className="text-right">Total Amount</span>
                    <span className="text-right">Actions</span>
                  </div>

                  <div className="divide-y divide-border">
                    {orders.map((ord) => (
                      <div key={ord.id} className="grid grid-cols-1 sm:grid-cols-5 items-center gap-2 p-4 text-xs">
                        <div>
                          <span className="sm:hidden font-bold text-muted-foreground">Order: </span>
                          <strong className="text-foreground">#{ord.id}</strong>
                        </div>
                        <div className="text-muted-foreground">{ord.date}</div>
                        <div>
                          <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border", ord.statusColor)}>
                            {ord.status}
                          </span>
                        </div>
                        <div className="sm:text-right font-bold text-foreground">
                          AED {formatPrice(ord.total)} ({ord.itemsCount} item)
                        </div>
                        <div className="sm:text-right">
                          <Button size="sm" variant="outline" className="text-xs h-8 px-3 font-bold" asChild>
                            <Link to="/order-confirmation">View Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-foreground">My Addresses</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                    <span className="text-xs font-bold uppercase text-primary">Default Billing Address</span>
                    <h3 className="font-bold text-sm">Arul Joseph</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Shop No. 6, Naif Street<br />
                      Deira, Dubai, United Arab Emirates<br />
                      Phone: +971 50 123 4567
                    </p>
                    <Button variant="outline" size="sm" className="font-bold text-xs">Edit Address</Button>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-6 space-y-3">
                    <span className="text-xs font-bold uppercase text-primary">Default Shipping Address</span>
                    <h3 className="font-bold text-sm">Arul Joseph</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Shop No. 6, Naif Street<br />
                      Deira, Dubai, United Arab Emirates<br />
                      Phone: +971 50 123 4567
                    </p>
                    <Button variant="outline" size="sm" className="font-bold text-xs">Edit Address</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <h2 className="font-display text-xl font-bold text-foreground">Account Profile Details</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert("Profile updated!"); }} className="rounded-lg border border-border bg-card p-6 space-y-4 max-w-xl text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold block mb-1">First Name</label>
                      <input type="text" defaultValue="Arul" className="h-10 w-full rounded border border-input px-3 outline-none" />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Last Name</label>
                      <input type="text" defaultValue="Joseph" className="h-10 w-full rounded border border-input px-3 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Email Address</label>
                    <input type="email" defaultValue="arul@example.com" className="h-10 w-full rounded border border-input px-3 outline-none" />
                  </div>
                  <div className="border-t border-border pt-4">
                    <h3 className="font-bold text-sm mb-3">Password Change</h3>
                    <div className="space-y-3">
                      <input type="password" placeholder="Current password (leave blank to leave unchanged)" className="h-10 w-full rounded border border-input px-3 outline-none" />
                      <input type="password" placeholder="New password" className="h-10 w-full rounded border border-input px-3 outline-none" />
                    </div>
                  </div>
                  <Button type="submit" className="font-bold text-xs h-10 px-6">Save Changes</Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
