import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Heart,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import cameraImage from "@/assets/camera-products.jpg";
import creatorImage from "@/assets/creator-kit.jpg";
import heroImage from "@/assets/camera-hero.jpg";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MOCK_PRODUCTS, Product } from "@/data/products";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Mirrorless", slug: "mirrorless", note: "92 products", image: cameraImage, position: "center" },
  { label: "Camera lenses", slug: "lenses", note: "186 products", image: cameraImage, position: "72% center" },
  { label: "Creator kits", slug: "creator-kits", note: "48 products", image: creatorImage, position: "center" },
  { label: "Audio gear", slug: "audio", note: "76 products", image: creatorImage, position: "30% center" },
  { label: "Lighting & studio", slug: "lighting", note: "63 products", image: creatorImage, position: "58% center" },
];

const heroSlides = [
  {
    eyebrow: "For those who see differently",
    title: "Create without limits.",
    copy: "Professional cameras, lenses and creator gear—selected for the stories only you can tell.",
    image: heroImage,
    action: "Shop Cameras",
    categorySlug: "mirrorless",
  },
  {
    eyebrow: "Creator essentials",
    title: "A studio that travels.",
    copy: "Build your complete video kit with compact audio, stabilisation and lighting made for the move.",
    image: creatorImage,
    action: "Explore Creator Gear",
    categorySlug: "creator-kits",
  },
];

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);
  const slide = heroSlides[active];
  if (!slide) return null;
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-footer sm:min-h-[620px] lg:min-h-[650px]">
      <img
        src={slide.image}
        alt="Professional camera equipment"
        width={1600}
        height={900}
        className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", active === 1 && "object-[65%_center] opacity-70")}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[560px] max-w-[1440px] items-end px-5 py-16 sm:min-h-[620px] sm:px-8 sm:py-20 lg:min-h-[650px] lg:items-center">
        <div className="max-w-2xl text-brand-contrast">
          <p className="mb-5 text-xs font-bold uppercase tracking-wide text-brand-contrast/70">{slide.eyebrow}</p>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-normal sm:text-7xl lg:text-8xl">{slide.title}</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-brand-contrast/75 sm:text-lg">{slide.copy}</p>
          <Button asChild size="lg" className="mt-8 h-12 rounded-md px-6 font-bold">
            <Link to="/shop" search={{ category: slide.categorySlug }}>
              {slide.action} <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-8 sm:right-8">
        <Button variant="hero" size="icon" onClick={() => setActive((active - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide">
          <ChevronLeft />
        </Button>
        <span className="min-w-12 text-center text-xs font-bold text-brand-contrast">
          0{active + 1} / 0{heroSlides.length}
        </span>
        <Button variant="hero" size="icon" onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="Next slide">
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p>
        <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
      </div>
      {link && (
        <Link to="/shop" className="hidden items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition sm:flex">
          {link} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-product">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1200}
            height={900}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            style={{ objectPosition: product.imagePosition ?? "center" }}
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-sm bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase text-background">
            {product.badge}
          </span>
        )}
        <Button
          variant="floating"
          size="icon"
          className="absolute right-3 top-3"
          onClick={() => setFavorite(!favorite)}
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn(favorite && "fill-primary text-primary")} />
        </Button>
        <Button
          className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 font-bold text-xs"
          onClick={() => setAdded(true)}
        >
          {added ? "Added to bag" : "Add to bag"}
        </Button>
      </div>
      <div className="pt-4">
        <p className="text-[10px] font-bold text-muted-foreground uppercase">{product.brand}</p>
        <h3 className="mt-1 min-h-12 text-sm font-semibold leading-6 sm:text-base text-foreground hover:text-primary transition">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <div className="mt-1 flex items-center gap-1 text-rating">
          <Star className="size-3 fill-current" />
          <span className="text-xs font-semibold text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <strong className="font-display text-lg">AED {formatPrice(product.price)}</strong>
          {product.oldPrice && <span className="text-xs text-muted-foreground line-through">AED {formatPrice(product.oldPrice)}</span>}
        </div>
      </div>
    </article>
  );
}

export function Storefront() {
  const [filter, setFilter] = useState("Best sellers");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-border px-4 sm:grid-cols-4 sm:px-8">
            {[
              [Truck, "Fast UAE delivery"],
              [ShieldCheck, "Genuine products"],
              [PackageCheck, "Easy returns"],
              [Headphones, "Expert support"],
            ].map(([Icon, label]) => {
              const TrustIcon = Icon as typeof Truck;
              return (
                <div key={label as string} className="flex items-center justify-center gap-2.5 border-b border-border px-2 py-4 text-xs font-semibold sm:border-b-0 sm:py-5">
                  <TrustIcon className="size-4 text-primary" />
                  {label as string}
                </div>
              );
            })}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20">
          <SectionTitle eyebrow="Shop by category" title="Find your next tool" link="Browse Catalog" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link key={category.label} to="/shop" search={{ category: category.slug }} className="group">
                <div className="aspect-square overflow-hidden rounded-md bg-product">
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: category.position }}
                  />
                </div>
                <h3 className="mt-3 font-display text-base font-bold sm:text-lg group-hover:text-primary transition">{category.label}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{category.note}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Carousel */}
        <section id="products" className="bg-muted/50 py-14 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <SectionTitle eyebrow="Curated for creators" title="Trending right now" link="View all products" />
            <Carousel opts={{ align: "start", loop: false }}>
              <CarouselContent>
                {MOCK_PRODUCTS.slice(0, 6).map((product) => (
                  <CarouselItem key={product.name} className="basis-[82%] sm:basis-1/2 lg:basis-1/4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-auto right-12 -top-14 hidden sm:inline-flex" />
              <CarouselNext className="right-0 -top-14 hidden sm:inline-flex" />
            </Carousel>
          </div>
        </section>

        {/* Promo Banners */}
        <section id="offers" className="mx-auto grid max-w-[1440px] gap-4 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
          <Link to="/shop" search={{ category: "mirrorless" }} className="group relative min-h-[420px] overflow-hidden rounded-md bg-footer sm:min-h-[500px]">
            <img src={cameraImage} alt="Mirrorless camera" loading="lazy" width={1200} height={900} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-card-overlay" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-brand-contrast sm:p-10">
              <p className="text-xs font-bold uppercase">Full-frame freedom</p>
              <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Upgrade your perspective.</h2>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold">
                Shop Mirrorless Cameras <ArrowRight className="size-4" />
              </p>
            </div>
          </Link>

          <Link to="/shop" search={{ category: "creator-kits" }} className="group relative min-h-[420px] overflow-hidden rounded-md bg-product sm:min-h-[500px]">
            <img src={creatorImage} alt="Creator kit" loading="lazy" width={1200} height={900} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-card-overlay" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-brand-contrast sm:p-10">
              <p className="text-xs font-bold uppercase">Creator collection</p>
              <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Sound. Light. Motion.</h2>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold">
                Build your Creator Kit <ArrowRight className="size-4" />
              </p>
            </div>
          </Link>
        </section>

        {/* Filtered Grid Section */}
        <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-8 sm:pb-24">
          <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle eyebrow="The Ambly edit" title="Gear worth knowing" />
            <div className="flex gap-1 overflow-x-auto">
              {["Best sellers", "New arrivals", "Cameras", "Lenses"].map((item) => (
                <Button key={item} variant={filter === item ? "default" : "ghost"} className="shrink-0 font-semibold" onClick={() => setFilter(item)}>
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
            {MOCK_PRODUCTS.slice(
              filter === "Lenses" ? 3 : filter === "Cameras" ? 0 : filter === "New arrivals" ? 2 : 0,
              filter === "Lenses" ? 7 : filter === "New arrivals" ? 6 : 4
            ).map((product) => (
              <ProductCard key={filter + product.name} product={product} />
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section id="brands" className="border-y border-border py-10">
          <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-8">
            <p className="mb-7 text-xs font-bold uppercase text-muted-foreground">Leading brands, one destination</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 font-display text-xl font-black text-foreground/60 sm:gap-x-16 sm:text-2xl">
              {["Canon", "SONY", "Nikon", "SIGMA", "DJI", "SmallRig", "HOLLYLAND"].map((brand) => (
                <Link key={brand} to="/shop" search={{ brand }} className="hover:text-foreground transition">
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}