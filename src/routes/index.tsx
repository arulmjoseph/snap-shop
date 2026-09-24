import { createFileRoute } from "@tanstack/react-router";
import { Storefront } from "@/components/storefront";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ambly Trading — Cameras, Lenses & Creator Gear in Dubai" },
      { name: "description", content: "Shop professional cameras, lenses, lighting, audio and creator gear from leading brands at Ambly Trading Dubai." },
      { property: "og:title", content: "Ambly Trading — Professional Camera Gear" },
      { property: "og:description", content: "Premium cameras, lenses and creator equipment with expert support in Dubai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <Storefront />;
}
