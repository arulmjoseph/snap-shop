import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, Package, PhoneCall, ShoppingBag, Truck } from "lucide-react";

import { MOCK_PRODUCTS } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed | Ambly Trading Dubai" },
      { name: "description", content: "Thank you for your purchase from Ambly Trading Dubai. Your order details and tracking status." },
    ],
  }),
  component: OrderConfirmationPage,
});

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function OrderConfirmationPage() {
  const orderNumber = "AMB-948201";
  const orderDate = new Date().toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" });

  const orderItems = [
    { product: MOCK_PRODUCTS[0], quantity: 1 },
    { product: MOCK_PRODUCTS[4], quantity: 2 },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header cartCount={0} />

      <main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "Checkout", href: "/checkout" }, { label: "Order Received" }]} />

        {/* Thank You Header Card */}
        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-10 text-center space-y-4">
          <CheckCircle2 className="mx-auto size-16 text-emerald-600" />
          <h1 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            Thank you for your order!
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your order <strong className="text-foreground">#{orderNumber}</strong> has been received and is now being processed at our Naif Street showroom in Dubai.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="sm" variant="outline" className="gap-2 font-bold text-xs" onClick={() => alert("Simulating Invoice Download...")}>
              <Download className="size-4" /> Download PDF Receipt
            </Button>
            <Button size="sm" className="gap-2 font-bold text-xs" asChild>
              <Link to="/my-account">Track Order in My Account</Link>
            </Button>
          </div>
        </div>

        {/* WooCommerce Order Tracker */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-base font-bold text-foreground mb-6">Live Order Fulfillment Progress</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="mx-auto grid size-10 place-items-center rounded-full bg-emerald-600 text-white font-bold text-sm">✓</div>
              <p className="text-xs font-bold text-foreground">Order Placed</p>
              <span className="text-[10px] text-muted-foreground block">{orderDate}</span>
            </div>
            <div className="space-y-2">
              <div className="mx-auto grid size-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">2</div>
              <p className="text-xs font-bold text-foreground">Processing Gear</p>
              <span className="text-[10px] text-primary font-bold block">In Progress</span>
            </div>
            <div className="space-y-2 opacity-50">
              <div className="mx-auto grid size-10 place-items-center rounded-full bg-muted text-muted-foreground font-bold text-sm">3</div>
              <p className="text-xs font-bold text-foreground">Dispatched UAE</p>
              <span className="text-[10px] text-muted-foreground block">Pending Courier</span>
            </div>
            <div className="space-y-2 opacity-50">
              <div className="mx-auto grid size-10 place-items-center rounded-full bg-muted text-muted-foreground font-bold text-sm">4</div>
              <p className="text-xs font-bold text-foreground">Delivered</p>
              <span className="text-[10px] text-muted-foreground block">Est. Tomorrow</span>
            </div>
          </div>
        </div>

        {/* Order Details Summary */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Items Purchased */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-base font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
              <Package className="size-4 text-primary" /> Order Items ({orderItems.length})
            </h3>
            <div className="divide-y divide-border">
              {orderItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-3 text-xs">
                  <img src={item.product.image} alt="" className="size-14 rounded border border-border object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{item.product.name}</h4>
                    <p className="text-muted-foreground">Qty: {item.quantity} × AED {formatPrice(item.product.price)}</p>
                  </div>
                  <strong className="font-bold text-foreground">AED {formatPrice(item.product.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Subtotal:</span><strong className="text-foreground">AED {formatPrice(subtotal)}</strong></div>
              <div className="flex justify-between"><span>Shipping:</span><strong className="text-emerald-600 font-bold">FREE</strong></div>
              <div className="flex justify-between"><span>VAT (5%):</span><strong className="text-foreground">AED {formatPrice(vat)}</strong></div>
              <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                <span>Total Paid:</span><strong className="text-primary text-base">AED {formatPrice(total)}</strong>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-base font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Delivery & Customer Summary
            </h3>
            <div className="space-y-3 text-xs text-muted-foreground">
              <div>
                <strong className="text-foreground block font-bold">Delivery Address</strong>
                <p>Arul Joseph</p>
                <p>Shop No. 6, Naif Street, Deira</p>
                <p>Dubai, United Arab Emirates</p>
                <p>Phone: +971 50 123 4567</p>
              </div>
              <div className="border-t border-border pt-3">
                <strong className="text-foreground block font-bold">Payment Method</strong>
                <p>Credit Card (Visa ending in 8921)</p>
              </div>
              <div className="border-t border-border pt-3 flex items-center gap-2">
                <PhoneCall className="size-4 text-primary" />
                <span>Questions about your order? Call <strong className="text-foreground">+971 4 584 2163</strong></span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
