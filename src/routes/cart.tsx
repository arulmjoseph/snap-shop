import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";

import { MOCK_PRODUCTS, Product } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart | Ambly Trading Dubai" },
      { name: "description", content: "Review your shopping cart items, apply discount coupons, and proceed to secure checkout." },
    ],
  }),
  component: CartPage,
});

type CartItem = {
  product: Product;
  quantity: number;
};

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1 },
    { product: MOCK_PRODUCTS[4], quantity: 2 },
  ]);

  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (couponCode.trim().toUpperCase() === "AMBLY10" || couponCode.trim().toUpperCase() === "DISCOUNT10") {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      setCouponError("Invalid promo code. Try 'AMBLY10' for 10% off!");
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const vatAmount = (subtotal - discountAmount) * 0.05; // 5% UAE VAT
  const freeDeliveryThreshold = 250;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const total = subtotal - discountAmount + vatAmount;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "Shopping Cart" }]} />

        <div className="mt-2 flex items-center justify-between border-b border-border pb-4">
          <h1 className="font-display text-2xl font-bold sm:text-3xl text-foreground flex items-center gap-3">
            <ShoppingBag className="size-7 text-primary" /> Shopping Cart ({cart.length} items)
          </h1>
          <Link to="/shop" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            <ChevronLeft className="size-4" /> Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="my-16 text-center rounded-lg border border-dashed border-border p-12">
            <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
            <h2 className="mt-4 font-display text-xl font-bold">Your cart is currently empty</h2>
            <p className="mt-2 text-xs text-muted-foreground">Looks like you haven't added any gear to your cart yet.</p>
            <Button size="lg" className="mt-6 font-bold gap-2" asChild>
              <Link to="/shop">Explore Shop Catalog <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column: Cart Items List */}
            <div className="space-y-6">
              {/* Free UAE Shipping Progress Bar */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="flex items-center gap-2 text-foreground">
                    <Truck className="size-4 text-primary" /> Free UAE Express Delivery Status
                  </span>
                  <span className="text-primary font-bold">
                    {isFreeDelivery ? "Qualified for FREE Delivery!" : `Add AED ${formatPrice(freeDeliveryThreshold - subtotal)} more`}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="hidden sm:grid grid-cols-[1fr_120px_140px_100px_40px] gap-4 bg-muted/50 p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                  <span>Product Details</span>
                  <span className="text-center">Price</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                  <span></span>
                </div>

                <div className="divide-y divide-border">
                  {cart.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-1 sm:grid-cols-[1fr_120px_140px_100px_40px] items-center gap-4 p-4">
                      {/* Product details */}
                      <div className="flex items-center gap-4">
                        <Link to="/product/$slug" params={{ slug: item.product.slug }} className="size-20 shrink-0 overflow-hidden rounded-md border border-border bg-product">
                          <img src={item.product.image} alt={item.product.name} className="size-full object-cover" />
                        </Link>
                        <div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.product.brand}</span>
                          <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-2">
                            <Link to="/product/$slug" params={{ slug: item.product.slug }} className="hover:text-primary">
                              {item.product.name}
                            </Link>
                          </h3>
                          <span className="text-[11px] text-muted-foreground">SKU: {item.product.sku}</span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="text-left sm:text-center text-xs font-semibold">
                        <span className="sm:hidden text-muted-foreground">Price: </span>
                        AED {formatPrice(item.product.price)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-start sm:justify-center">
                        <div className="flex items-center rounded border border-input bg-background">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-left sm:text-right font-display text-sm font-bold text-foreground">
                        <span className="sm:hidden text-muted-foreground font-sans font-normal text-xs">Total: </span>
                        AED {formatPrice(item.product.price * item.quantity)}
                      </div>

                      {/* Remove Button */}
                      <div className="flex justify-end">
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive p-1" title="Remove item">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="rounded-lg border border-border bg-card p-4">
                <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter promo coupon code (e.g. AMBLY10)"
                      className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs outline-none focus:border-foreground"
                    />
                  </div>
                  <Button type="submit" size="sm" variant="outline" className="font-bold text-xs h-10 px-5">
                    Apply Coupon
                  </Button>
                </form>
                {couponApplied && (
                  <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="size-3" /> Coupon AMBLY10 applied! (10% Discount)
                  </p>
                )}
                {couponError && <p className="mt-2 text-xs font-bold text-destructive">{couponError}</p>}
              </div>
            </div>

            {/* Right Column: Order Summary Box */}
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6 space-y-4 shadow-sm">
                <h2 className="font-display text-lg font-bold text-foreground border-b border-border pb-3">Order Summary</h2>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <strong className="text-foreground">AED {formatPrice(subtotal)}</strong>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount (10%)</span>
                      <span>- AED {formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated UAE VAT (5%)</span>
                    <strong className="text-foreground">AED {formatPrice(vatAmount)}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>UAE Express Shipping</span>
                    <strong className="text-emerald-600 font-bold">{isFreeDelivery ? "FREE" : "AED 25"}</strong>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex items-baseline justify-between">
                  <span className="font-display text-base font-bold text-foreground">Grand Total</span>
                  <strong className="font-display text-2xl font-bold text-primary">AED {formatPrice(total)}</strong>
                </div>

                <Button size="lg" className="w-full font-bold gap-2 text-sm h-12" onClick={() => navigate({ to: "/checkout" })}>
                  Proceed to Checkout <ArrowRight className="size-4" />
                </Button>

                <div className="pt-2 text-center text-[11px] text-muted-foreground flex items-center justify-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600" /> SSL Encrypted 256-Bit Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
