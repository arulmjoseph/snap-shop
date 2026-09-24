import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  Clock,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import { MOCK_PRODUCTS, Product } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug) || MOCK_PRODUCTS[0];
    return {
      meta: [
        { title: `${product.name} | Ambly Trading Dubai` },
        { name: "description", content: product.shortDescription },
      ],
    };
  },
  component: ProductDetailPage,
});

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  const product: Product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.options?.forEach((opt) => {
      initial[opt.name] = opt.values[0];
    });
    return initial;
  });

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    navigate({ to: "/checkout" });
  };

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs
          items={[
            { label: "WooCommerce Shop", href: "/shop" },
            { label: product.category, href: `/shop?category=${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        {/* Top Product Hero Layout */}
        <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Column: Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-product">
              <img
                src={selectedImage}
                alt={product.name}
                className="size-full object-cover transition-transform duration-300 hover:scale-105"
                style={{ objectPosition: product.imagePosition ?? "center" }}
              />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded bg-foreground px-3 py-1 text-xs font-bold uppercase text-background">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel Selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={cn(
                    "relative aspect-square size-20 shrink-0 overflow-hidden rounded-md border-2 bg-product transition",
                    selectedImage === imgUrl ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="size-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Buy Box */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{product.brand}</span>
                <span className="text-xs text-muted-foreground">SKU: <strong className="text-foreground">{product.sku}</strong></span>
              </div>

              <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl lg:text-4xl text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews Bar */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center text-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("size-4", i < Math.floor(product.rating) ? "fill-current" : "text-muted")} />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviewsCount} customer reviews)</span>
                <span className="text-xs text-muted-foreground">|</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="size-3" /> In Stock ({product.stockCount} available in Dubai)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="mt-5 flex items-baseline gap-3 border-y border-border py-4">
                <strong className="font-display text-3xl font-bold text-foreground">AED {formatPrice(product.price * quantity)}</strong>
                {product.oldPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    AED {formatPrice(product.oldPrice * quantity)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Save AED {formatPrice((product.oldPrice - product.price) * quantity)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.shortDescription}</p>

              {/* Variation Selectors */}
              {product.options?.map((opt) => (
                <div key={opt.name} className="mt-5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                    {opt.name}: <span className="text-primary font-bold">{selectedOptions[opt.name]}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val) => (
                      <button
                        key={val}
                        onClick={() => setSelectedOptions({ ...selectedOptions, [opt.name]: val })}
                        className={cn(
                          "rounded-md border px-3 py-1.5 text-xs font-semibold transition",
                          selectedOptions[opt.name] === val
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background hover:bg-muted"
                        )}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity Counter & Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-md border border-input bg-background">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-muted-foreground hover:text-foreground"
                    title="Decrease"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-10 text-center font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-muted-foreground hover:text-foreground"
                    title="Increase"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                <Button size="lg" className="flex-1 font-bold gap-2 text-sm h-12" onClick={handleAddToCart}>
                  <ShoppingBag className="size-4" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </Button>

                <Button size="lg" variant="secondary" className="font-bold text-sm h-12 px-6" onClick={handleBuyNow}>
                  Buy Now
                </Button>

                <Button variant="outline" size="icon" className="h-12 size-12" onClick={() => setFavorite(!favorite)}>
                  <Heart className={cn("size-5", favorite && "fill-primary text-primary")} />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-muted/40 p-4 sm:grid-cols-4">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Truck className="size-4 text-primary shrink-0" /> Express UAE Delivery
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <ShieldCheck className="size-4 text-primary shrink-0" /> Official Warranty
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <PackageCheck className="size-4 text-primary shrink-0" /> 14-Day Returns
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <RefreshCw className="size-4 text-primary shrink-0" /> 100% Genuine
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Specifications, Reviews */}
        <div className="mt-14">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 gap-6">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent py-3 font-bold text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Product Description
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent py-3 font-bold text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Technical Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent py-3 font-bold text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Customer Reviews ({product.reviewsCount})
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Full Description */}
            <TabsContent value="description" className="py-6 space-y-4">
              <h3 className="font-display text-lg font-bold">Comprehensive Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">{product.fullDescription}</p>
            </TabsContent>

            {/* Tab 2: Specs Table */}
            <TabsContent value="specs" className="py-6">
              <div className="max-w-2xl rounded-md border border-border overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <tr key={key} className={cn("border-b border-border/60", i % 2 === 0 ? "bg-muted/30" : "bg-background")}>
                        <th className="p-3 font-bold text-foreground w-1/3">{key}</th>
                        <td className="p-3 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Tab 3: Customer Reviews */}
            <TabsContent value="reviews" className="py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center rounded-lg border border-border bg-card p-6">
                <div className="text-center md:border-r md:border-border pr-4">
                  <span className="font-display text-5xl font-bold text-foreground">{product.rating}</span>
                  <div className="flex justify-center text-rating mt-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Based on {product.reviewsCount} verified purchases</p>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <h4 className="font-bold text-sm">Verified Customer Feedback</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded border border-border bg-muted/20 text-xs">
                      <div className="flex justify-between font-bold text-foreground">
                        <span>Excellent camera build & sharp auto focus</span>
                        <span className="text-muted-foreground font-normal">2 days ago</span>
                      </div>
                      <p className="text-muted-foreground mt-1">Bought from Ambly Deira showroom. Genuine seal, super fast shipping across UAE. Highly recommended!</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products Carousel */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Frequently Bought Together</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <article key={rel.id} className="group rounded-lg border border-border bg-card p-3 transition hover:border-foreground/30">
                <Link to="/product/$slug" params={{ slug: rel.slug }} className="block aspect-[4/3] overflow-hidden rounded bg-product">
                  <img src={rel.image} alt={rel.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{rel.brand}</span>
                  <h3 className="text-xs font-bold leading-snug line-clamp-2 mt-1">
                    <Link to="/product/$slug" params={{ slug: rel.slug }} className="hover:text-primary">{rel.name}</Link>
                  </h3>
                  <strong className="mt-2 block font-display text-sm font-bold">AED {formatPrice(rel.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
