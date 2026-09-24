# Camera Storefront Front-End Plan

## Goal
Create a premium, mobile-first camera and accessories storefront at `/`, ready to connect to WooCommerce product data. The current project is only a blank starter, so the new storefront will replace it.

## Storefront Structure
1. **Utility and main header**
   - Delivery/support strip, brand mark, prominent search, account, wishlist, and cart
   - Mobile header with search, menu drawer, and compact shopping actions
2. **Mega menu**
   - Shop by category: Cameras, Lenses, Video, Lighting, Audio, Accessories, Used Gear
   - Featured brands, popular subcategories, and one promotional image area
   - Keyboard-friendly desktop menu and touch-friendly mobile accordion
3. **Home showcase**
   - Full-width photography-led promotional slider with concise offers and shopping actions
   - Category shortcuts immediately below for fast browsing
4. **Product merchandising**
   - Horizontally swipeable product carousel for featured or trending products
   - Product grid for best sellers/new arrivals with image, brand, title, ratings, current price, previous price, discount badge, wishlist, and add-to-cart action
   - Product data shaped to map cleanly to WooCommerce fields later
5. **Offer sections**
   - Promotional banners for bundles, trade-in or seasonal offers
   - Trust strip for delivery, warranty, secure checkout, and expert support
6. **Professional footer**
   - Newsletter signup, shopping/help/company columns, contact details, social links, payment indicators, and legal links
   - Collapsible sections on mobile to keep the footer compact

## Visual Direction
- Premium camera-retailer look: crisp editorial photography, strong black/white contrast, warm red commerce accent, and neutral gray surfaces
- Dense enough for serious shoppers, while maintaining clear hierarchy and generous product imagery
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
- Use realistic placeholder catalog content for the initial front-end; no invented business address or contact details
- Keep live WooCommerce API connection, checkout, account login, and order handling outside this front-end phase until store access is connected

## Pages in This Phase
- Build the complete home storefront at `/`
- Header category links, product actions, and footer links remain presentation-ready controls rather than separate full pages unless requested next

## Technical Notes
- Use the existing TanStack Start project, Tailwind design tokens, shadcn controls, Lucide icons, and Embla carousel already installed
- Replace the placeholder home page, define an app-specific page title and social metadata, and preserve the current routing setup
- Generate and store cohesive camera retail imagery locally for the hero, categories, products, and promotions
- Verify the finished page in desktop and mobile widths, including navigation, carousel, overflow, and current preview health
