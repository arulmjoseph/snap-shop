import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Heart,
  Headphones,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import heroImage from "@/assets/camera-hero.jpg";
import cameraImage from "@/assets/camera-products.jpg";
import creatorImage from "@/assets/creator-kit.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Product = {
  brand: string;
  name: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  imagePosition?: string;
};

const navGroups = [
  { title: "Cameras", items: ["Mirrorless cameras", "DSLR cameras", "Cinema cameras", "Action cameras", "Compact cameras"] },
  { title: "Lenses", items: ["Prime lenses", "Zoom lenses", "Macro lenses", "Cinema lenses", "Lens adapters"] },
  { title: "Video & audio", items: ["Gimbals & stabilizers", "Wireless microphones", "Video transmission", "Monitors", "Cages & rigs"] },
  { title: "Lighting & studio", items: ["LED lights", "Monolights", "Softboxes", "Light stands", "Backgrounds"] },
];

const categories = [
  { label: "Mirrorless", note: "92 products", image: cameraImage, position: "center" },
  { label: "Camera lenses", note: "186 products", image: cameraImage, position: "72% center" },
  { label: "Creator kits", note: "48 products", image: creatorImage, position: "center" },
  { label: "Audio", note: "76 products", image: creatorImage, position: "30% center" },
  { label: "Lighting", note: "63 products", image: creatorImage, position: "58% center" },
];

const products: Product[] = [
  { brand: "CANON", name: "EOS R6 Mark II Mirrorless Camera", price: 5925, badge: "Best seller", image: cameraImage },
  { brand: "SONY", name: "Alpha a7 IV Mirrorless Camera Body", price: 6319, image: cameraImage, imagePosition: "30% center" },
  { brand: "DJI", name: "Osmo Pocket 3 Creator Combo", price: 2035, oldPrice: 3149, badge: "-35%", image: creatorImage, imagePosition: "12% center" },
  { brand: "SIGMA", name: "24–70mm f/2.8 DG DN II Art Lens", price: 4749, image: cameraImage, imagePosition: "90% center" },
  { brand: "HOLLYLAND", name: "LARK M2 Duo Wireless Microphone", price: 339, badge: "Popular", image: creatorImage, imagePosition: "42% center" },
  { brand: "NIKON", name: "Z8 Mirrorless Camera Body", price: 12499, oldPrice: 13299, badge: "Save 800", image: cameraImage },
  { brand: "CANON", name: "RF 70–200mm f/2.8 L IS USM Lens", price: 8270, oldPrice: 9450, image: cameraImage, imagePosition: "85% center" },
  { brand: "PEAK DESIGN", name: "Everyday Camera Backpack 20L", price: 1099, image: creatorImage, imagePosition: "85% center" },
];

const heroSlides = [
  { eyebrow: "For those who see differently", title: "Create without limits.", copy: "Professional cameras, lenses and creator gear—selected for the stories only you can tell.", image: heroImage, action: "Shop cameras" },
  { eyebrow: "Creator essentials", title: "A studio that travels.", copy: "Build your complete video kit with compact audio, stabilisation and lighting made for the move.", image: creatorImage, action: "Explore creator gear" },
];

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className={cn("flex shrink-0 items-center gap-2.5", inverse ? "text-brand-contrast" : "text-foreground")} aria-label="Ambly home">
      <span className={cn("grid size-9 place-items-center rounded-md text-base font-black", inverse ? "bg-brand-contrast text-footer" : "bg-primary text-primary-foreground")}>A</span>
      <span className="font-display text-xl font-bold tracking-normal">AMBLY</span>
    </a>
  );
}

function MegaMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div onMouseLeave={() => setOpen(false)}>
      <Button variant="ghost" className="h-12 gap-1.5 rounded-none px-0 text-sm font-semibold hover:bg-transparent" onMouseEnter={() => setOpen(true)} onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        Shop <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </Button>
      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-y border-border bg-background shadow-menu" onMouseEnter={() => setOpen(true)}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-[repeat(4,minmax(0,1fr))_1.35fr] gap-8 px-8 py-9">
            {navGroups.map((group) => (
              <div key={group.title}>
                <a href="#products" className="font-display text-base font-bold text-foreground hover:text-primary">{group.title}</a>
                <div className="mt-4 grid gap-2.5">
                  {group.items.map((item) => <a key={item} href="#products" className="text-sm text-muted-foreground hover:text-foreground">{item}</a>)}
                </div>
              </div>
            ))}
            <a href="#offers" className="group relative min-h-52 overflow-hidden rounded-md bg-footer">
              <img src={creatorImage} alt="Creator camera and audio kit" className="absolute inset-0 size-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-hero-overlay" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-brand-contrast">
                <p className="text-xs font-bold uppercase">Creator spotlight</p>
                <p className="mt-1 font-display text-xl font-bold">Build your mobile studio</p>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header id="top" className="relative z-30 bg-background">
      <div className="bg-footer text-brand-contrast">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-center px-4 text-center text-[11px] font-medium sm:justify-between sm:px-8">
          <p>Free UAE delivery on orders over AED 250</p>
          <div className="hidden items-center gap-5 sm:flex"><span>Dubai showroom</span><span>Expert support</span></div>
        </div>
      </div>
      <div className="mx-auto grid h-18 max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:h-20 sm:px-8 lg:gap-10">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="left" className="w-[92%] overflow-y-auto p-0 sm:max-w-md">
              <SheetHeader className="border-b p-5 text-left"><SheetTitle><BrandMark /></SheetTitle><SheetDescription>Photography, video and creator gear.</SheetDescription></SheetHeader>
              <div className="p-5">
                <Accordion type="single" collapsible>
                  {navGroups.map((group) => <AccordionItem key={group.title} value={group.title}><AccordionTrigger className="font-display text-base font-bold hover:no-underline">{group.title}</AccordionTrigger><AccordionContent><div className="grid gap-3">{group.items.map((item) => <a key={item} href="#products" className="text-muted-foreground">{item}</a>)}</div></AccordionContent></AccordionItem>)}
                </Accordion>
                <div className="mt-6 grid gap-4 text-sm font-semibold"><a href="#brands">Brands</a><a href="#offers">Offers</a><a href="#footer">Visit our store</a></div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <BrandMark />
        <label className="relative col-span-3 row-start-2 mb-3 lg:col-span-1 lg:row-auto lg:mb-0">
          <span className="sr-only">Search products</span><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className="h-11 w-full rounded-md border border-input bg-muted/60 pl-11 pr-4 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring/20" placeholder="Search cameras, lenses and more" />
        </label>
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Account"><CircleUserRound /></Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Wishlist"><Heart /></Button>
          <Button variant="ghost" size="icon" className="relative" aria-label="Shopping bag"><ShoppingBag /><span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">2</span></Button>
        </div>
      </div>
      <div className="relative hidden border-t border-border lg:block">
        <nav className="mx-auto flex h-12 max-w-[1440px] items-center gap-8 px-8" aria-label="Primary navigation">
          <MegaMenu />
          {navGroups.slice(0, 2).map((group) => <a key={group.title} href="#products" className="text-sm font-semibold hover:text-primary">{group.title}</a>)}
          <a href="#products" className="text-sm font-semibold hover:text-primary">Video & audio</a><a href="#products" className="text-sm font-semibold hover:text-primary">Lighting & studio</a><a href="#brands" className="text-sm font-semibold hover:text-primary">Brands</a><a href="#offers" className="text-sm font-semibold text-primary">Offers</a>
          <a href="#footer" className="ml-auto flex items-center gap-2 text-sm font-medium"><MapPin className="size-4" /> Deira, Dubai</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);
  const slide = heroSlides[active];
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-footer sm:min-h-[620px] lg:min-h-[650px]">
      <img src={slide.image} alt="Professional camera equipment" width={1600} height={900} className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", active === 1 && "object-[65%_center] opacity-70")} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[560px] max-w-[1440px] items-end px-5 py-16 sm:min-h-[620px] sm:px-8 sm:py-20 lg:min-h-[650px] lg:items-center">
        <div className="max-w-2xl text-brand-contrast">
          <p className="mb-5 text-xs font-bold uppercase tracking-wide text-brand-contrast/70">{slide.eyebrow}</p>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-normal sm:text-7xl lg:text-8xl">{slide.title}</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-brand-contrast/75 sm:text-lg">{slide.copy}</p>
          <Button asChild size="lg" className="mt-8 h-12 rounded-md px-6"><a href="#products">{slide.action}<ArrowRight /></a></Button>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-8 sm:right-8">
        <Button variant="hero" size="icon" onClick={() => setActive((active - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous promotion"><ChevronLeft /></Button>
        <span className="min-w-12 text-center text-xs font-bold text-brand-contrast">0{active + 1} / 0{heroSlides.length}</span>
        <Button variant="hero" size="icon" onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="Next promotion"><ChevronRight /></Button>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p><h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2></div>{link && <a href="#products" className="hidden items-center gap-2 text-sm font-bold sm:flex">{link}<ArrowRight className="size-4" /></a>}</div>;
}

function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-product">
        <img src={product.image} alt={product.name} loading="lazy" width={1200} height={900} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" style={{ objectPosition: product.imagePosition ?? "center" }} />
        {product.badge && <span className="absolute left-3 top-3 rounded-sm bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase text-background">{product.badge}</span>}
        <Button variant="floating" size="icon" className="absolute right-3 top-3" onClick={() => setFavorite(!favorite)} aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}><Heart className={cn(favorite && "fill-primary text-primary")} /></Button>
        <Button className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100" onClick={() => setAdded(true)}>{added ? "Added to bag" : "Add to bag"}</Button>
      </div>
      <div className="pt-4"><p className="text-[10px] font-bold text-muted-foreground">{product.brand}</p><h3 className="mt-1 min-h-12 text-sm font-semibold leading-6 sm:text-base">{product.name}</h3><div className="mt-1 flex items-center gap-1 text-rating"><Star className="size-3 fill-current" /><span className="text-xs font-semibold text-foreground">4.8</span><span className="text-xs text-muted-foreground">(24)</span></div><div className="mt-3 flex items-baseline gap-2"><strong className="font-display text-lg">AED {formatPrice(product.price)}</strong>{product.oldPrice && <span className="text-xs text-muted-foreground line-through">AED {formatPrice(product.oldPrice)}</span>}</div></div>
    </article>
  );
}

function FooterGroup({ title, items }: { title: string; items: string[] }) {
  return <div><h3 className="mb-4 text-sm font-bold text-brand-contrast">{title}</h3><div className="grid gap-3">{items.map((item) => <a key={item} href="#top" className="text-sm text-brand-contrast/60 transition hover:text-brand-contrast">{item}</a>)}</div></div>;
}

export function Storefront() {
  const [filter, setFilter] = useState("Best sellers");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header /><main><Hero />
        <section className="border-b border-border"><div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-border px-4 sm:grid-cols-4 sm:px-8">{[[Truck,"Fast UAE delivery"],[ShieldCheck,"Genuine products"],[PackageCheck,"Easy returns"],[Headphones,"Expert support"]].map(([Icon,label]) => { const TrustIcon = Icon as typeof Truck; return <div key={label as string} className="flex items-center justify-center gap-2.5 border-b border-border px-2 py-4 text-xs font-semibold sm:border-b-0 sm:py-5"><TrustIcon className="size-4 text-primary" />{label as string}</div>; })}</div></section>

        <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20"><SectionTitle eyebrow="Shop by category" title="Find your next tool" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{categories.map((category) => <a key={category.label} href="#products" className="group"><div className="aspect-square overflow-hidden rounded-md bg-product"><img src={category.image} alt="" loading="lazy" width={1200} height={900} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: category.position }} /></div><h3 className="mt-3 font-display text-base font-bold sm:text-lg">{category.label}</h3><p className="mt-0.5 text-xs text-muted-foreground">{category.note}</p></a>)}</div>
        </section>

        <section id="products" className="bg-muted/50 py-14 sm:py-20"><div className="mx-auto max-w-[1440px] px-4 sm:px-8"><SectionTitle eyebrow="Curated for creators" title="Trending right now" link="View all products" />
          <Carousel opts={{ align: "start", loop: false }}><CarouselContent>{products.slice(0,6).map((product) => <CarouselItem key={product.name} className="basis-[82%] sm:basis-1/2 lg:basis-1/4"><ProductCard product={product} /></CarouselItem>)}</CarouselContent><CarouselPrevious className="left-auto right-12 -top-14 hidden sm:inline-flex" /><CarouselNext className="right-0 -top-14 hidden sm:inline-flex" /></Carousel>
        </div></section>

        <section id="offers" className="mx-auto grid max-w-[1440px] gap-4 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <a href="#products" className="group relative min-h-[420px] overflow-hidden rounded-md bg-footer sm:min-h-[500px]"><img src={cameraImage} alt="Professional mirrorless camera" loading="lazy" width={1200} height={900} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-card-overlay" /><div className="absolute inset-x-0 bottom-0 p-7 text-brand-contrast sm:p-10"><p className="text-xs font-bold uppercase">Full-frame freedom</p><h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Upgrade your perspective.</h2><p className="mt-4 flex items-center gap-2 text-sm font-bold">Shop mirrorless <ArrowRight className="size-4" /></p></div></a>
          <a href="#products" className="group relative min-h-[420px] overflow-hidden rounded-md bg-product sm:min-h-[500px]"><img src={creatorImage} alt="Compact creator gear kit" loading="lazy" width={1200} height={900} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-card-overlay" /><div className="absolute inset-x-0 bottom-0 p-7 text-brand-contrast sm:p-10"><p className="text-xs font-bold uppercase">Creator collection</p><h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Sound. Light. Motion.</h2><p className="mt-4 flex items-center gap-2 text-sm font-bold">Build your kit <ArrowRight className="size-4" /></p></div></a>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-8 sm:pb-24"><div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><SectionTitle eyebrow="The Ambly edit" title="Gear worth knowing" /><div className="flex gap-1 overflow-x-auto">{["Best sellers","New arrivals","Cameras","Lenses"].map((item) => <Button key={item} variant={filter === item ? "default" : "ghost"} className="shrink-0" onClick={() => setFilter(item)}>{item}</Button>)}</div></div><div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">{products.slice(filter === "Lenses" ? 3 : filter === "Cameras" ? 0 : filter === "New arrivals" ? 2 : 0, filter === "Lenses" ? 7 : filter === "New arrivals" ? 6 : 4).map((product) => <ProductCard key={filter + product.name} product={product} />)}</div></section>

        <section id="brands" className="border-y border-border py-10"><div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8"><p className="mb-7 text-xs font-bold uppercase text-muted-foreground">Leading brands, one destination</p><div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 font-display text-xl font-black text-foreground/60 sm:gap-x-16 sm:text-2xl">{["Canon","SONY","Nikon","SIGMA","DJI","SmallRig"].map((brand) => <span key={brand}>{brand}</span>)}</div></div></section>
      </main>

      <footer id="footer" className="bg-footer text-brand-contrast"><div className="border-b border-brand-contrast/15"><div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase text-brand-contrast/60">A sharper inbox</p><h2 className="mt-2 font-display text-3xl font-bold">New gear. Better offers. No noise.</h2></div><form className="flex gap-2" onSubmit={(event) => event.preventDefault()}><label className="relative min-w-0 flex-1"><span className="sr-only">Email address</span><Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-contrast/50" /><input type="email" required placeholder="Your email address" className="h-12 w-full rounded-md border border-brand-contrast/20 bg-brand-contrast/5 pl-11 pr-3 text-sm text-brand-contrast outline-none placeholder:text-brand-contrast/40 focus:border-brand-contrast/60" /></label><Button type="submit" className="h-12">Subscribe</Button></form></div></div>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:py-16"><div><BrandMark inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-brand-contrast/60">Cameras, lenses and creator equipment, selected with expertise in the heart of Dubai.</p><div className="mt-6 grid gap-3 text-sm text-brand-contrast/70"><p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0" />Shop No. 6, Mexico City Building,<br />Naif Street, Deira, Dubai</p><a href="tel:+97145842163" className="flex items-center gap-3"><Phone className="size-4" />+971 4 584 2163</a><p className="flex items-center gap-3"><Clock3 className="size-4" />Mon–Sat, 10:00 AM–10:00 PM</p></div></div><FooterGroup title="Shop" items={["Cameras","Lenses","Audio","Lighting & studio","Accessories"]} /><FooterGroup title="Customer care" items={["Contact us","Delivery & returns","Warranty","FAQs","Track your order"]} /><FooterGroup title="About Ambly" items={["Our story","Visit our store","Brands","Privacy policy","Terms & conditions"]} /></div>
        <div className="border-t border-brand-contrast/15"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-5 text-xs text-brand-contrast/45 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p>© 2026 Ambly Trading L.L.C. All rights reserved.</p><p>Secure checkout · Visa · Mastercard · Tabby</p></div></div>
      </footer>
    </div>
  );
}