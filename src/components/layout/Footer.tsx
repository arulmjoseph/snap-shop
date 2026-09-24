import { Link } from "@tanstack/react-router";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandMark } from "./Header";

export function Footer() {
  return (
    <footer id="footer" className="bg-footer text-brand-contrast">
      {/* Newsletter Signup */}
      <div className="border-b border-brand-contrast/15">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-contrast/60">A sharper inbox</p>
            <h2 className="mt-2 font-display text-3xl font-bold">New gear. Better offers. No noise.</h2>
          </div>
          <form className="flex gap-2" onSubmit={(event) => event.preventDefault()}>
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Email address</span>
              <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-contrast/50" />
              <input
                type="email"
                required
                placeholder="Your email address"
                className="h-12 w-full rounded-md border border-brand-contrast/20 bg-brand-contrast/5 pl-11 pr-3 text-sm text-brand-contrast outline-none placeholder:text-brand-contrast/40 focus:border-brand-contrast/60"
              />
            </label>
            <Button type="submit" size="lg" className="h-12 font-bold">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:py-16">
        <div>
          <BrandMark inverse />
          <p className="mt-5 max-w-sm text-sm leading-6 text-brand-contrast/60">
            Professional cameras, lenses, and creator equipment, selected with expertise in the heart of Dubai.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-brand-contrast/70">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              Shop No. 6, Mexico City Building,<br />
              Naif Street, Deira, Dubai, UAE
            </p>
            <a href="tel:+97145842163" className="flex items-center gap-3 hover:text-brand-contrast">
              <Phone className="size-4 text-primary" />
              +971 4 584 2163
            </a>
            <p className="flex items-center gap-3">
              <Clock3 className="size-4 text-primary" />
              Mon–Sat, 10:00 AM–10:00 PM
            </p>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="mb-4 text-sm font-bold text-brand-contrast uppercase tracking-wider">WooCommerce Shop</h3>
          <div className="grid gap-3 text-sm text-brand-contrast/60">
            <Link to="/shop" search={{ category: "mirrorless" }} className="hover:text-brand-contrast transition">Mirrorless Cameras</Link>
            <Link to="/shop" search={{ category: "lenses" }} className="hover:text-brand-contrast transition">Camera Lenses</Link>
            <Link to="/shop" search={{ category: "audio" }} className="hover:text-brand-contrast transition">Audio & Microphones</Link>
            <Link to="/shop" search={{ category: "creator-kits" }} className="hover:text-brand-contrast transition">Creator Kits & Gimbals</Link>
            <Link to="/shop" className="hover:text-brand-contrast transition font-medium text-primary">Browse Full Catalog →</Link>
          </div>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="mb-4 text-sm font-bold text-brand-contrast uppercase tracking-wider">Customer Care</h3>
          <div className="grid gap-3 text-sm text-brand-contrast/60">
            <Link to="/my-account" className="hover:text-brand-contrast transition">My Account & Orders</Link>
            <Link to="/cart" className="hover:text-brand-contrast transition">View Shopping Cart</Link>
            <Link to="/checkout" className="hover:text-brand-contrast transition">Checkout</Link>
            <Link to="/wishlist" className="hover:text-brand-contrast transition">My Wishlist</Link>
            <Link to="/faq" className="hover:text-brand-contrast transition">Shipping & Returns FAQ</Link>
          </div>
        </div>

        {/* Store Info */}
        <div>
          <h3 className="mb-4 text-sm font-bold text-brand-contrast uppercase tracking-wider">Ambly Trading</h3>
          <div className="grid gap-3 text-sm text-brand-contrast/60">
            <Link to="/about" className="hover:text-brand-contrast transition">Our Brand Story</Link>
            <Link to="/contact" className="hover:text-brand-contrast transition">Visit Dubai Showroom</Link>
            <Link to="/faq" className="hover:text-brand-contrast transition">Warranty Policy</Link>
            <Link to="/faq" className="hover:text-brand-contrast transition">Terms & Privacy</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-contrast/15">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-5 text-xs text-brand-contrast/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Ambly Trading L.L.C. All rights reserved. Built for WooCommerce theme conversion.</p>
          <div className="flex items-center gap-4 text-xs font-semibold text-brand-contrast/70">
            <span>SSL Secured Checkout</span>
            <span>·</span>
            <span>Visa / Mastercard</span>
            <span>·</span>
            <span>Tabby 4 Installments</span>
            <span>·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
