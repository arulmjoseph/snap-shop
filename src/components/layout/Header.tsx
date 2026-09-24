import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  CircleUserRound,
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navGroups = [
  { title: "Cameras", items: [
    { name: "Mirrorless cameras", category: "mirrorless" },
    { name: "DSLR cameras", category: "mirrorless" },
    { name: "Cinema cameras", category: "mirrorless" },
  ]},
  { title: "Lenses", items: [
    { name: "Prime lenses", category: "lenses" },
    { name: "Zoom lenses", category: "lenses" },
    { name: "Macro lenses", category: "lenses" },
  ]},
  { title: "Creator Gear", items: [
    { name: "Gimbals & Stabilizers", category: "creator-kits" },
    { name: "Wireless Microphones", category: "audio" },
    { name: "Backpacks & Accessories", category: "creator-kits" },
  ]},
];

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={cn("flex shrink-0 items-center gap-2.5", inverse ? "text-brand-contrast" : "text-foreground")}>
      <span className={cn("grid size-9 place-items-center rounded-md text-base font-black", inverse ? "bg-brand-contrast text-footer" : "bg-primary text-primary-foreground")}>
        A
      </span>
      <span className="font-display text-xl font-bold tracking-normal">AMBLY</span>
    </Link>
  );
}

function MegaMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <Button
        variant="ghost"
        className="h-12 gap-1.5 rounded-none px-0 text-sm font-semibold hover:bg-transparent"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        Shop Categories <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </Button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-[720px] border border-border bg-background shadow-menu rounded-b-md" onMouseEnter={() => setOpen(true)}>
          <div className="grid grid-cols-3 gap-6 p-7">
            {navGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-display text-sm font-bold text-foreground">{group.title}</h4>
                <div className="mt-3 grid gap-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      to="/shop"
                      search={{ category: item.category }}
                      className="text-sm text-muted-foreground transition hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header({ cartCount = 2, wishlistCount = 1 }: { cartCount?: number; wishlistCount?: number }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/shop", search: { q: searchQuery.trim() } });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-footer text-brand-contrast">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-4 text-center text-[11px] font-medium sm:px-8">
          <p className="w-full sm:w-auto">Free UAE Express Delivery on orders over AED 250</p>
          <div className="hidden items-center gap-6 sm:flex">
            <span className="flex items-center gap-1.5"><MapPin className="size-3 text-primary" /> Naif St, Dubai</span>
            <a href="tel:+97145842163" className="flex items-center gap-1.5 hover:underline"><Phone className="size-3 text-primary" /> +971 4 584 2163</a>
            <Link to="/faq" className="hover:underline">Need Help?</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-8 lg:h-20 lg:py-0 lg:gap-8">
        {/* Mobile Drawer */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90%] overflow-y-auto p-0 sm:max-w-md">
              <SheetHeader className="border-b p-5 text-left">
                <SheetTitle><BrandMark /></SheetTitle>
                <SheetDescription>Professional camera gear & creator store Dubai.</SheetDescription>
              </SheetHeader>
              <div className="p-5 space-y-6">
                <nav className="grid gap-2 text-base font-semibold">
                  <Link to="/" className="py-2 hover:text-primary">Home</Link>
                  <Link to="/shop" className="py-2 hover:text-primary">All Shop Products</Link>
                  <Accordion type="single" collapsible className="w-full">
                    {navGroups.map((group) => (
                      <AccordionItem key={group.title} value={group.title}>
                        <AccordionTrigger className="py-2 text-base font-bold">{group.title}</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-2 pl-3">
                            {group.items.map((item) => (
                              <Link key={item.name} to="/shop" search={{ category: item.category }} className="py-1 text-sm text-muted-foreground hover:text-foreground">
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Link to="/about" className="py-2 hover:text-primary">About Ambly</Link>
                  <Link to="/contact" className="py-2 hover:text-primary">Showroom & Contact</Link>
                  <Link to="/faq" className="py-2 hover:text-primary">Shipping & FAQs</Link>
                  <Link to="/my-account" className="py-2 hover:text-primary">My Account / Orders</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand Logo */}
        <BrandMark />

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative col-span-3 row-start-2 mb-2 lg:col-span-1 lg:row-auto lg:mb-0">
          <span className="sr-only">Search products</span>
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-md border border-input bg-muted/60 pl-11 pr-9 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring/20"
            placeholder="Search Sony, Canon, Lenses, Creator Kits..."
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </form>

        {/* User Action Icons */}
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" asChild title="My Account">
            <Link to="/my-account" aria-label="Account">
              <CircleUserRound className="size-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative" title="Wishlist">
            <Link to="/wishlist" aria-label="Wishlist">
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-foreground text-[9px] font-bold text-background">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="default" size="sm" asChild className="relative gap-2 px-3 font-semibold">
            <Link to="/cart" aria-label="Shopping bag">
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="grid size-5 place-items-center rounded-full bg-primary-foreground text-xs font-bold text-primary">
                {cartCount}
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Primary Navigation Desktop Bar */}
      <div className="relative hidden border-t border-border/60 lg:block bg-background">
        <nav className="mx-auto flex h-12 max-w-[1440px] items-center gap-7 px-8 text-sm font-semibold" aria-label="Primary navigation">
          <MegaMenu />
          <Link to="/shop" className="hover:text-primary transition [&.active]:text-primary">
            All Shop
          </Link>
          <Link to="/shop" search={{ category: "mirrorless" }} className="hover:text-primary transition">
            Cameras
          </Link>
          <Link to="/shop" search={{ category: "lenses" }} className="hover:text-primary transition">
            Lenses
          </Link>
          <Link to="/shop" search={{ category: "creator-kits" }} className="hover:text-primary transition">
            Creator Gear
          </Link>
          <Link to="/about" className="hover:text-primary transition [&.active]:text-primary">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-primary transition [&.active]:text-primary">
            Dubai Showroom
          </Link>
          <Link to="/faq" className="hover:text-primary transition [&.active]:text-primary">
            FAQs & Delivery
          </Link>
          <Link to="/my-account" className="ml-auto text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground">
            WooCommerce Customer Portal →
          </Link>
        </nav>
      </div>
    </header>
  );
}
