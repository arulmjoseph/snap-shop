import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StoreBreadcrumbs } from "@/components/ui/store-breadcrumbs";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Dubai Showroom & Contact | Ambly Trading" },
      { name: "description", content: "Visit our physical camera showroom on Naif Street, Deira, Dubai. Contact our expert team for camera support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8">
        <StoreBreadcrumbs items={[{ label: "Dubai Showroom & Contact" }]} />

        {/* Hero Section */}
        <div className="mt-2 rounded-xl bg-footer p-8 sm:p-12 text-brand-contrast">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Visit Our Store</span>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">Dubai Showroom & Support</h1>
            <p className="mt-3 text-sm text-brand-contrast/75 leading-relaxed">
              Experience the latest cameras, cinema lenses, and audio gear in person. Touch, test, and consult with our photo gear specialists.
            </p>
          </div>
        </div>

        {/* Info Grid & Form */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-foreground">Ambly Trading L.L.C Store Location</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-5 space-y-2">
                  <MapPin className="size-5 text-primary" />
                  <h3 className="font-bold text-sm">Physical Showroom</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Shop No. 6, Mexico City Building,<br />
                    Naif Street, Deira, Dubai, UAE
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-5 space-y-2">
                  <Phone className="size-5 text-primary" />
                  <h3 className="font-bold text-sm">Phone & WhatsApp</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Store: +971 4 584 2163<br />
                    WhatsApp Support: +971 50 123 4567
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-5 space-y-2">
                  <Clock className="size-5 text-primary" />
                  <h3 className="font-bold text-sm">Working Hours</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Monday – Saturday: 10:00 AM – 10:00 PM<br />
                    Sunday: 4:00 PM – 9:00 PM
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-5 space-y-2">
                  <Mail className="size-5 text-primary" />
                  <h3 className="font-bold text-sm">Email Inquiries</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sales: sales@amblytrading.com<br />
                    Support: info@amblytrading.com
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Visual Box */}
            <div className="rounded-xl border border-border overflow-hidden bg-product aspect-video relative flex flex-col justify-end p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-footer/90 via-footer/40 to-transparent" />
              <div className="relative z-10 text-brand-contrast">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Google Maps Location</span>
                <h3 className="font-display text-lg font-bold">Naif Street Camera District, Dubai</h3>
                <p className="text-xs text-brand-contrast/70 mt-1">Convenient parking & metro access (Baniyas Square Station)</p>
                <Button variant="secondary" size="sm" className="mt-3 font-bold text-xs" asChild>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer">Open in Google Maps App →</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Send Us a Direct Message</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Have a question about product availability, bulk ordering, or trade-in offers? Fill out the form below.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-6 text-center space-y-3">
                <MessageSquare className="mx-auto size-10 text-emerald-600" />
                <h3 className="font-display text-lg font-bold text-foreground">Message Sent Successfully!</h3>
                <p className="text-xs text-muted-foreground">Our Dubai sales team will get back to you within 2 business hours.</p>
                <Button size="sm" variant="outline" className="font-bold text-xs mt-2" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Your Full Name *</label>
                    <input type="text" required placeholder="John Doe" className="h-10 w-full rounded border border-input px-3 outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Email Address *</label>
                    <input type="email" required placeholder="john@example.com" className="h-10 w-full rounded border border-input px-3 outline-none focus:border-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Phone Number (Optional)</label>
                    <input type="tel" placeholder="+971 50 000 0000" className="h-10 w-full rounded border border-input px-3 outline-none focus:border-foreground" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Inquiry Topic</label>
                    <select className="h-10 w-full rounded border border-input px-3 outline-none focus:border-foreground font-semibold">
                      <option>Product Stock Availability</option>
                      <option>Showroom Visit / Appointment</option>
                      <option>Warranty & Technical Service</option>
                      <option>Bulk / Corporate Purchase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Your Message *</label>
                  <textarea required rows={5} placeholder="Tell us what camera or lens equipment you are interested in..." className="w-full rounded border border-input p-3 outline-none focus:border-foreground resize-none" />
                </div>

                <Button type="submit" size="lg" className="w-full font-bold text-xs gap-2 h-11">
                  <Send className="size-4" /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
