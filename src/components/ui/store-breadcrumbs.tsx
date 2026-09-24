import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function StoreBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground py-3" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 hover:text-foreground transition">
        <Home className="size-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <ChevronRight className="size-3 text-muted-foreground/60 shrink-0" />
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground transition">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
