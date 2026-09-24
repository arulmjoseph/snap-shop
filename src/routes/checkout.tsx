import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

import { MOCK_PRODUCTS } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Ambly Trading Dubai" },
      { name: "description", content: "Complete your order securely with Visa, Mastercard, Tabby 4-installments, or Cash on Delivery." },
    ],
  }),
  component: CheckoutPage,
});

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function CheckoutPage() {
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "tabby" | "cod">("card");

  const [formData, setFormData] = useState({
    firstName: "Arul",
    lastName: "Joseph",
    email: "arul@example.com",
    phone: "+971 50 123 4567",
    address: "Shop 6, Naif Street",
    emirate: "Dubai",
    city: "Deira",
    notes: "",
  });

  const cartItems = [
    { product: MOCK_PRODUCTS[0], quantity: 1 },
    { product: MOCK_PRODUCTS[4], quantity: 2 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = shippingMethod === "express" ? 25 : 0;
  const vat = subtotal * 0.05;
  const total = subtotal + shippingFee + vat;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/order-confirmation" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

        <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground flex items-center gap-3 border-b border-border pb-4">
          <Lock className="size-6 text-primary" /> Secure WooCommerce Checkout
        </h1>

        <form onSubmit={handleSubmitOrder} className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
          {/* Left Column: Billing Details & Payment */}
          <div className="space-y-8">
            {/* Step 1: Customer Info */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                Billing & Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-foreground block mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-10 w-full rounded border border-input bg-background px-3 outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground block mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-10 w-full rounded border border-input bg-background px-3 outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-10 w-full rounded border border-input bg-background px-3 outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground block mb-1">Mobile Phone (UAE +971) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-10 w-full rounded border border-input bg-background px-3 outline-none focus:border-foreground"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-foreground block mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Apartment number, Street name"
                    className="h-10 w-full rounded border border-input bg-background px-3 outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground block mb-1">Emirate *</label>
                  <select
                    value={formData.emirate}
                    onChange={(e) => setFormData({ ...formData, emirate: e.target.value })}
                    className="h-10 w-full rounded border border-input bg-background px-3 outline-none focus:border-foreground font-semibold"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-foreground block mb-1">City / Area *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-10 w-full rounded border border-input bg-background px-3 outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Options */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                Shipping & Delivery Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/30 transition">
                  <div className="flex items-center gap-3 text-xs">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="accent-primary size-4"
                    />
                    <div>
                      <strong className="block text-foreground text-sm font-bold flex items-center gap-2">
                        <Truck className="size-4 text-primary" /> Standard UAE Delivery (1–2 Days)
                      </strong>
                      <span className="text-muted-foreground">Dispatched directly from our Naif St, Dubai showroom</span>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600 text-xs">FREE</span>
                </label>

                <label className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/30 transition">
                  <div className="flex items-center gap-3 text-xs">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="accent-primary size-4"
                    />
                    <div>
                      <strong className="block text-foreground text-sm font-bold flex items-center gap-2">
                        <Truck className="size-4 text-primary" /> Express Same-Day Dubai Courier
                      </strong>
                      <span className="text-muted-foreground">Order before 2 PM for same day delivery</span>
                    </div>
                  </div>
                  <span className="font-bold text-xs">AED 25</span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                Payment Options
              </h2>

              <div className="space-y-3">
                {/* Credit Card Option */}
                <div className="rounded-lg border border-border overflow-hidden">
                  <label className="flex items-center justify-between p-4 cursor-pointer bg-muted/30">
                    <div className="flex items-center gap-3 text-xs">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="accent-primary size-4"
                      />
                      <span className="font-bold text-sm text-foreground flex items-center gap-2">
                        <CreditCard className="size-4 text-primary" /> Credit / Debit Card (Visa / Mastercard)
                      </span>
                    </div>
                  </label>
                  {paymentMethod === "card" && (
                    <div className="p-4 bg-background border-t border-border space-y-3 text-xs">
                      <div>
                        <label className="font-bold block mb-1">Card Number</label>
                        <input type="text" placeholder="4532 •••• •••• 8921" className="h-10 w-full rounded border border-input px-3 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold block mb-1">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className="h-10 w-full rounded border border-input px-3 outline-none" />
                        </div>
                        <div>
                          <label className="font-bold block mb-1">CVV Security Code</label>
                          <input type="text" placeholder="123" className="h-10 w-full rounded border border-input px-3 outline-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tabby Option */}
                <div className="rounded-lg border border-border p-4 bg-muted/30">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3 text-xs">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "tabby"}
                        onChange={() => setPaymentMethod("tabby")}
                        className="accent-primary size-4"
                      />
                      <div>
                        <span className="font-bold text-sm text-foreground flex items-center gap-2">
                          <Wallet className="size-4 text-emerald-600" /> Tabby — Pay in 4 Interest-Free Payments
                        </span>
                        <span className="text-muted-foreground text-[11px] block mt-0.5">
                          Pay AED {formatPrice(total / 4)} today and split the rest over 3 months. No interest, no fees.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* COD Option */}
                <div className="rounded-lg border border-border p-4 bg-muted/30">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3 text-xs">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-primary size-4"
                      />
                      <span className="font-bold text-sm text-foreground">Cash on Delivery (COD)</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm sticky top-24">
              <h2 className="font-display text-lg font-bold text-foreground border-b border-border pb-3">Your Order Summary</h2>

              {/* Items List */}
              <div className="divide-y divide-border/60 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 py-3 text-xs">
                    <img src={item.product.image} alt="" className="size-12 rounded border border-border object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground truncate">{item.product.name}</h4>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <strong className="font-bold text-foreground">AED {formatPrice(item.product.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="border-t border-border pt-3 space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <strong className="text-foreground">AED {formatPrice(subtotal)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <strong className="text-foreground">{shippingFee === 0 ? "FREE" : `AED ${shippingFee}`}</strong>
                </div>
                <div className="flex justify-between">
                  <span>VAT (5%)</span>
                  <strong className="text-foreground">AED {formatPrice(vat)}</strong>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex items-baseline justify-between">
                <span className="font-display text-base font-bold text-foreground">Total Payable</span>
                <strong className="font-display text-2xl font-bold text-primary">AED {formatPrice(total)}</strong>
              </div>

              <Button type="submit" size="lg" className="w-full font-bold text-sm h-12">
                Place Order Now
              </Button>

              <div className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-2 pt-2">
                <ShieldCheck className="size-4 text-emerald-600" /> 100% Genuine UAE Warranty Guarantee
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
