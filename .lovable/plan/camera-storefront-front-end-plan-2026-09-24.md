# Camera Storefront Front-End Plan

## Goal
Redesign the existing Ambly Trading shop as a premium, mobile-first camera and accessories storefront at `/`. Preserve its real catalog and Dubai identity while upgrading the presentation to the standard of a polished international photography retailer.

## Storefront Structure
1. **Utility and main header**
   - Delivery/support strip, brand mark, prominent search, account, wishlist, and cart
   - Mobile header with search, menu drawer, and compact shopping actions
2. **Mega menu**
   - Shop by category: Cameras, Lenses, Camera & Lens Accessories, Lighting & Studio, Audio, Bags & Pouches, Projector Screens & TV Mounts
   - Featured brands, popular subcategories, and one promotional image area
   - Keyboard-friendly desktop menu and touch-friendly mobile accordion
3. **Home showcase**
   - Full-width photography-led promotional slider with concise offers and shopping actions
   - Category shortcuts immediately below for fast browsing
4. **Product merchandising**
   - Horizontally swipeable product carousel for featured or trending products
   - Product grid for best sellers/new arrivals with image, brand, title, ratings, current price, previous price, discount badge, wishlist, and add-to-cart action
   - Feature real catalog examples such as Canon, Sony, Nikon, DJI, Sigma, Hollyland, SmallRig, Viltrox, and Peak Design
   - Product data shaped to map cleanly to WooCommerce fields later
5. **Offer sections**
   - Promotional banners for bundles, trade-in or seasonal offers
   - Trust strip for delivery, warranty, secure checkout, and expert support
6. **Professional footer**
   - Newsletter signup, shopping/help/company columns, contact details, social links, payment indicators, and legal links
   - Collapsible sections on mobile to keep the footer compact

## Visual Direction
- Premium international camera-retailer look: restrained monochrome foundation, crisp editorial photography, confident typography, precise spacing, and a single warm red commerce accent
- Dense enough for serious shoppers, while maintaining clear hierarchy and generous product imagery
- Avoid the crowded marketplace appearance of the current site; use cleaner product cards, stronger category hierarchy, more consistent imagery, and fewer competing promotional messages
- Restrained motion for slider transitions, menu reveals, carousel movement, and product interactions
- Responsive from small phones upward, with no clipped headers or controls

## Interaction Details
- Working mega-menu open/close behavior
- Mobile navigation drawer with nested category groups
- Search input, slider navigation, swipe/arrow product carousel, wishlist toggles, and cart-count feedback
- Product-grid tabs or filters for common collections
- Accessible labels, focus states, reduced-motion support, and touch-sized controls

## WooCommerce Readiness
- Build reusable product/category types and display components around standard WooCommerce fields
- Use representative products and AED pricing from the existing public catalog; retain the published Deira shop location, phone number, and Monday–Saturday opening hours where contact details are shown
- Keep live WooCommerce API connection, checkout, account login, and order handling outside this front-end phase until store access is connected

## Pages in This Phase
- Build the complete home storefront at `/`
- Header category links, product actions, and footer links remain presentation-ready controls rather than separate full pages unless requested next

## Technical Notes
- Use the existing TanStack Start project, Tailwind design tokens, shadcn controls, Lucide icons, and Embla carousel already installed
- Replace the placeholder home page, define an app-specific page title and social metadata, and preserve the current routing setup
- Generate and store cohesive camera retail imagery locally for the hero, categories, products, and promotions
- Verify the finished page in desktop and mobile widths, including navigation, carousel, overflow, and current preview health
