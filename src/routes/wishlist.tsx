import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

import { MOCK_PRODUCTS, Product } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist | Ambly Trading Dubai" },
      { name: "description", content: "Your saved camera equipment, lenses, and creator gear." },
    ],
  }),
  component: WishlistPage,
});

const formatPrice = (price: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(price);

function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([
    MOCK_PRODUCTS[0],
    MOCK_PRODUCTS[2],
    MOCK_PRODUCTS[5],
  ]);

  const removeItem = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header wishlistCount={wishlist.length} />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "Wishlist" }]} />

        <div className="mt-2 flex items-center justify-between border-b border-border pb-4">
          <h1 className="font-display text-2xl font-bold sm:text-3xl text-foreground flex items-center gap-3">
            <Heart className="size-7 text-primary fill-primary" /> My Saved Wishlist ({wishlist.length} items)
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="my-16 text-center rounded-lg border border-dashed border-border p-12">
            <Heart className="mx-auto size-12 text-muted-foreground" />
            <h2 className="mt-4 font-display text-xl font-bold">Your wishlist is empty</h2>
            <p className="mt-2 text-xs text-muted-foreground">Save items you like to view them later or buy anytime.</p>
            <Button size="lg" className="mt-6 font-bold" asChild>
              <Link to="/shop">Browse Camera Catalog</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <article key={product.id} className="group relative rounded-lg border border-border bg-card p-4 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-product">
                    <img src={product.image} alt={product.name} className="size-full object-cover" />
                    <button
                      onClick={() => removeItem(product.id)}
                      className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/80 text-muted-foreground hover:text-destructive backdrop-blur"
                      title="Remove"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{product.brand}</span>
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 mt-1">
                      <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-primary">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">In Stock Dubai</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <strong className="font-display text-base font-bold text-foreground">AED {formatPrice(product.price)}</strong>
                  <Button size="sm" className="font-bold text-xs gap-1.5" asChild>
                    <Link to="/cart"><ShoppingBag className="size-3.5" /> Move to Bag</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
