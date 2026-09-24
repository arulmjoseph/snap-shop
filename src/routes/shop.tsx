import { useState, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  Filter,
  Grid3X3,
  Heart,
  List,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

import { MOCK_BRANDS, MOCK_CATEGORIES, MOCK_PRODUCTS, Product } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type ShopSearchParams = {
  category?: string;
  brand?: string;
  q?: string;
  sort?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearchParams => ({
    category: (search.category as string) || undefined,
    brand: (search.brand as string) || undefined,
    q: (search.q as string) || undefined,
    sort: (search.sort as string) || "featured",
  }),
  head: () => ({
    meta: [
      { title: "Shop Cameras, Lenses & Creator Gear | Ambly Trading Dubai" },
      { name: "description", content: "Explore our full catalog of professional mirrorless cameras, lenses, microphones, and studio gear in Dubai." },
    ],
  }),
  component: ShopPage,
});

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function ShopProductCard({ product, viewMode }: { product: Product; viewMode: "grid" | "list" }) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  if (viewMode === "list") {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 rounded-lg border border-border bg-card p-4 transition hover:border-foreground/30 hover:shadow-sm">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="relative aspect-[4/3] w-full sm:w-56 shrink-0 overflow-hidden rounded-md bg-product">
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: product.imagePosition ?? "center" }}
          />
          {product.badge && (
            <span className="absolute left-2.5 top-2.5 rounded bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase text-background">
              {product.badge}
            </span>
          )}
        </Link>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-muted-foreground">{product.brand}</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {product.inStock ? `In Stock (${product.stockCount} left)` : "Out of Stock"}
              </span>
            </div>
            <h3 className="mt-1 font-display text-base font-bold text-foreground group-hover:text-primary transition">
              <Link to="/product/$slug" params={{ slug: product.slug }}>{product.name}</Link>
            </h3>
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{product.shortDescription}</p>
            <div className="mt-2 flex items-center gap-1.5 text-rating">
              <Star className="size-3.5 fill-current" />
              <span className="text-xs font-bold text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewsCount} reviews)</span>
              <span className="text-xs text-muted-foreground ml-2">SKU: {product.sku}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
            <div className="flex items-baseline gap-2">
              <strong className="font-display text-xl">AED {formatPrice(product.price)}</strong>
              {product.oldPrice && <span className="text-xs text-muted-foreground line-through">AED {formatPrice(product.oldPrice)}</span>}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setFavorite(!favorite)}>
                <Heart className={cn("size-4", favorite && "fill-primary text-primary")} />
              </Button>
              <Button size="sm" className="font-bold gap-2" onClick={() => setAdded(true)}>
                {added ? <><Check className="size-4" /> Added</> : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col rounded-lg border border-border bg-card p-3 transition hover:border-foreground/30 hover:shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-product">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: product.imagePosition ?? "center" }}
          />
        </Link>
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase text-background">
            {product.badge}
          </span>
        )}
        <Button
          variant="floating"
          size="icon"
          className="absolute right-2.5 top-2.5 size-8 bg-background/80 backdrop-blur"
          onClick={() => setFavorite(!favorite)}
        >
          <Heart className={cn("size-4", favorite && "fill-primary text-primary")} />
        </Button>
      </div>

      <div className="mt-3 flex flex-1 flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{product.brand}</span>
          <h3 className="mt-1 font-semibold text-sm leading-snug text-foreground min-h-[2.5rem] line-clamp-2">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-primary transition">
              {product.name}
            </Link>
          </h3>
          <div className="mt-1 flex items-center gap-1 text-rating">
            <Star className="size-3 fill-current" />
            <span className="text-xs font-semibold text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between">
          <div>
            <strong className="font-display text-base font-bold text-foreground">AED {formatPrice(product.price)}</strong>
            {product.oldPrice && (
              <span className="ml-1.5 text-[11px] text-muted-foreground line-through">AED {formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <Button size="sm" className="h-8 px-3 text-xs font-bold" onClick={() => setAdded(true)}>
            {added ? "Added" : "+ Add"}
          </Button>
        </div>
      </div>
    </article>
  );
}

function ShopPage() {
  const { category, brand, q, sort } = Route.useSearch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>(category || "all");
  const [selectedBrand, setSelectedBrand] = useState<string>(brand || "All Brands");
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>(sort || "featured");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((prod) => {
      if (selectedCategory !== "all" && prod.categorySlug !== selectedCategory) return false;
      if (selectedBrand !== "All Brands" && prod.brand !== selectedBrand) return false;
      if (prod.price > maxPrice) return false;
      if (inStockOnly && !prod.inStock) return false;
      if (q && !prod.name.toLowerCase().includes(q.toLowerCase()) && !prod.brand.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedBrand, maxPrice, inStockOnly, q, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("All Brands");
    setMaxPrice(15000);
    setInStockOnly(false);
    navigate({ to: "/shop", search: {} });
  };

  const FilterSidebar = () => (
    <aside className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-3">Product Categories</h4>
        <div className="space-y-1">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelectedCategory(cat.slug);
                navigate({ to: "/shop", search: { category: cat.slug === "all" ? undefined : cat.slug, brand, q, sort: sortBy } });
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold transition text-left",
                selectedCategory === cat.slug
                  ? "bg-primary text-primary-foreground font-bold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{cat.name}</span>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded", selectedCategory === cat.slug ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground")}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-3">Filter by Brand</h4>
        <div className="space-y-1">
          {MOCK_BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs font-medium transition text-left",
                selectedBrand === b ? "font-bold text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{b}</span>
              {selectedBrand === b && <Check className="size-3 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Max Price</h4>
          <span className="text-xs font-bold text-primary">AED {formatPrice(maxPrice)}</span>
        </div>
        <input
          type="range"
          min="500"
          max="15000"
          step="250"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>AED 500</span>
          <span>AED 15,000</span>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="flex items-center space-x-2 pt-2 border-t border-border">
        <Checkbox id="instock" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(!!checked)} />
        <label htmlFor="instock" className="text-xs font-semibold cursor-pointer select-none text-foreground">
          In Stock Items Only
        </label>
      </div>

      {/* Reset CTA */}
      <Button variant="outline" size="sm" className="w-full text-xs font-bold gap-2" onClick={resetFilters}>
        <RotateCcw className="size-3" /> Reset All Filters
      </Button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs
          items={[
            { label: "WooCommerce Shop", href: "/shop" },
            ...(selectedCategory !== "all" ? [{ label: MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory }] : []),
          ]}
        />

        {/* Banner Header */}
        <div className="mt-2 rounded-lg bg-footer p-6 text-brand-contrast sm:p-10 relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Official UAE Warranty</span>
            <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Camera & Creator Gear Store</h1>
            <p className="mt-2 text-xs sm:text-sm text-brand-contrast/75">
              Browse genuine cameras, lenses, microphones, and cinema equipment with fast delivery in Dubai & across UAE.
            </p>
          </div>
        </div>

        {/* Toolbar & Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Sheet */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 text-xs font-bold">
                    <SlidersHorizontal className="size-3.5" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85%] overflow-y-auto p-6">
                  <SheetHeader className="text-left mb-4">
                    <SheetTitle className="font-display">Product Filters</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar />
                </SheetContent>
              </Sheet>
            </div>

            <p className="text-xs text-muted-foreground">
              Showing <strong className="text-foreground font-bold">{filteredProducts.length}</strong> of {MOCK_PRODUCTS.length} products
            </p>
          </div>

          {/* Sort & Grid Switcher */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Sort By:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-xs font-semibold outline-none focus:border-foreground"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="flex items-center border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-2 transition", viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
                title="Grid view"
              >
                <Grid3X3 className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-2 transition", viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
                title="List view"
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {(selectedCategory !== "all" || selectedBrand !== "All Brands" || inStockOnly || q) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                Category: {selectedCategory}
                <X className="size-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
              </span>
            )}
            {selectedBrand !== "All Brands" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                Brand: {selectedBrand}
                <X className="size-3 cursor-pointer" onClick={() => setSelectedBrand("All Brands")} />
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                In Stock Only
                <X className="size-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            {q && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                Query: "{q}"
                <X className="size-3 cursor-pointer" onClick={() => navigate({ to: "/shop", search: { ...Route.useSearch(), q: undefined } })} />
              </span>
            )}
            <button onClick={resetFilters} className="text-xs font-bold text-primary hover:underline ml-2">
              Clear All
            </button>
          </div>
        )}

        {/* Main Grid & Sidebar Layout */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div>
            {filteredProducts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-12 text-center">
                <Filter className="mx-auto size-8 text-muted-foreground" />
                <h3 className="mt-3 font-display text-lg font-bold">No products match your search criteria</h3>
                <p className="mt-1 text-xs text-muted-foreground">Try adjusting or clearing your filters to see more results.</p>
                <Button variant="default" size="sm" className="mt-4 font-bold" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className={cn(viewMode === "grid" ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4")}>
                {filteredProducts.map((product) => (
                  <ShopProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
