import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, Phone, Search, ShieldCheck, Truck } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQs & Shipping Policy | Ambly Trading Dubai" },
      { name: "description", content: "Frequently asked questions regarding UAE delivery, warranties, returns, and payment options." },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How fast is delivery within Dubai and across the UAE?",
        a: "Orders placed before 2:00 PM are processed same-day for Dubai express courier delivery. Standard delivery across Abu Dhabi, Sharjah, and other Emirates takes 1 to 2 business days.",
      },
      {
        q: "Is shipping free?",
        a: "Yes! All orders over AED 250 qualify for FREE standard UAE delivery. Orders below AED 250 incur a flat shipping charge of AED 25.",
      },
      {
        q: "Can I pick up my order from your physical showroom?",
        a: "Absolutely! You can choose Store Pickup at checkout and collect your camera gear directly from our Naif Street showroom in Deira, Dubai.",
      },
    ],
  },
  {
    category: "Warranty & Product Authenticity",
    items: [
      {
        q: "Are all products 100% genuine with official manufacturer warranty?",
        a: "Yes, 100%. Ambly Trading L.L.C only sells brand-new, factory-sealed products sourced directly from authorized regional distributors. All products come with official warranty cards.",
      },
      {
        q: "How do I claim warranty for my camera or lens?",
        a: "You can bring the product to our Dubai showroom with your original invoice, or contact customer care at +971 4 584 2163 for pick-up arrangements.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 14-day return window for items that are unopened, factory-sealed, and in original condition with box accessories. Defective items are eligible for immediate replacement.",
      },
    ],
  },
  {
    category: "Payments & Installments",
    items: [
      {
        q: "How does Tabby 4 interest-free payments work?",
        a: "Select Tabby at checkout to split your purchase into 4 equal monthly payments. Pay 25% today with your debit or credit card, and the remaining 75% over 3 months. No interest, no fees.",
      },
      {
        q: "Do you accept Cash on Delivery (COD)?",
        a: "Yes! Cash on Delivery is available across all UAE Emirates up to AED 5,000 per order.",
      },
    ],
  },
];

function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1000px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "Shipping Policy & FAQs" }]} />

        {/* Hero Banner */}
        <div className="mt-2 rounded-xl bg-footer p-8 text-center text-brand-contrast space-y-4">
          <HelpCircle className="mx-auto size-12 text-primary" />
          <h1 className="font-display text-3xl font-bold sm:text-4xl">How Can We Help You?</h1>
          <p className="text-xs sm:text-sm text-brand-contrast/70 max-w-md mx-auto">
            Search our frequently asked questions or browse topics below regarding UAE shipping, warranty, and returns.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. Tabby, Warranty, Delivery)..."
              className="h-11 w-full rounded-md border border-brand-contrast/20 bg-brand-contrast/10 pl-11 pr-4 text-xs text-brand-contrast outline-none placeholder:text-brand-contrast/40 focus:border-primary"
            />
          </div>
        </div>

        {/* FAQ Categories Accordion */}
        <div className="mt-10 space-y-8">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No questions found matching "{searchQuery}".</p>
          ) : (
            filteredFaqs.map((cat) => (
              <div key={cat.category} className="space-y-3">
                <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <span className="size-2 rounded-full bg-primary" /> {cat.category}
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {cat.items.map((item, idx) => (
                    <AccordionItem key={idx} value={`${cat.category}-${idx}`} className="rounded-lg border border-border px-4 bg-card">
                      <AccordionTrigger className="font-bold text-sm text-foreground hover:no-underline text-left py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          )}
        </div>

        {/* Need Assistance Card */}
        <div className="mt-14 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-3">
          <Phone className="mx-auto size-8 text-primary" />
          <h3 className="font-display text-lg font-bold">Still have questions?</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Our camera specialists in Dubai are ready to assist you by phone or in person.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button size="sm" className="font-bold text-xs gap-2" asChild>
              <Link to="/contact">Contact Dubai Support</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
