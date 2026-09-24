# Complete Ambly Storefront Pages

## Goal
Extend the approved homepage into a polished, mobile-first ecommerce browsing journey. This phase remains frontend-only and uses the existing representative catalog until WooCommerce access is connected.

## Pages
- **Shop** — searchable product catalog with category, brand, price, availability, sorting, desktop filters, and mobile filter drawer.
- **Category** — reusable category view for cameras, lenses, video/audio, and lighting/studio.
- **Product detail** — image gallery, brand and rating, AED price, stock status, quantity, add-to-bag, delivery assurances, specifications, overview, and related products.
- **Cart** — editable quantities, remove controls, order summary, delivery threshold, and checkout action.
- **Checkout** — contact, delivery, address, payment presentation, order summary, and mobile-friendly form flow.
- **About** — Ambly’s Dubai retail story and expertise without inventing new business facts.
- **Contact / Visit** — published Deira address, phone number, opening hours, enquiry form, and map placeholder.
- **Delivery & returns** — clear customer-care information, with non-verified policy specifics labeled for confirmation rather than invented.

## Shared Experience
- Convert homepage navigation, category cards, products, account/wishlist/cart, calls-to-action, and footer links to real TanStack routes.
- Reuse one shared header, footer, product data source, product cards, and page-title pattern across all pages.
- Preserve the current premium international visual language, local AED pricing, responsive layouts, accessible controls, and clear empty/confirmation states.
- Give every content page unique title, description, Open Graph metadata, and social card metadata.

## Technical Notes
- Product URLs use `/product/$slug` with typed TanStack Router params.
- Category URLs use `/category/$slug`; navigation passes params rather than interpolating URLs.
- Cart state is presentation-only in this phase; live products, checkout, accounts, stock, and order processing require the later WooCommerce connection.
- No backend, customer data storage, or invented business contact details will be added.

## Validation
- Check all navigation paths and interactive controls in the browser.
- Verify the main pages at desktop and mobile widths.
- Confirm there are no current build or runtime errors.
