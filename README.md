# Pascal

A performance-first, design-system-first, conversion-first Shopify theme.

Pascal is set in the register of an editorial fashion house rather than a crowded marketplace. Built with strict performance budgets, a tokenized design system, and progressive enhancement, Pascal proves that uncompromising aesthetics and top-tier storefront speed can coexist effortlessly.

---

## Key Highlights

- **Zero Global JavaScript:** The entire baseline store runs on HTML and CSS. JavaScript is isolated into lightweight, modular Web Components that only load when rendered on screen.
- **Design System, Not a Template:** Every layout, spacing rule, typography scale, and color value stems from a central token engine (`assets/tokens.css`).
- **Conversion Without Bloat:** Includes an animated cart drawer, wishlist, bundle builder, shareable cart permalinks, tiered free shipping progress, size guide modals, and predictive search—with zero third-party app dependencies.
- **Responsive & Resilient:** Fully functional if JavaScript is disabled or fails to load. Gracefully collapses motion under `prefers-reduced-motion`.

---

## Design Language

Pascal is defined by disciplined restraint, warmth, and layered tactile depth:

- **Color Palette:** Warm ivory ground (`#f3f0e9`), rich charcoal ink (`#1c1b19`), plate surface tones (`#e8e2d6`), and a distinct bronze accent (`#c49a45`) reserved for active states, sale indicators, focus rings, and hover details.
- **Typography:** *Fraunces* at light weights with tight tracking (`-0.03em`) for editorial display headings; *Jost* for clean, legible body text and UI controls.
- **Elevation & Geometry:** Unified corner radii (`8px`, `12px`, `18px`, `28px`), hairline dividers derived directly from the ink color, and soft pill-shaped action buttons with merchant radius controls.
- **Depth & Surfaces:** Layered low-contrast shadows and frosted-glass backdrops (sticky blur header, cart drawer, quick add) rather than heavy solid borders.
- **Editorial Overlaps:** Distinctive headline tabs breaking out across imagery, split-screen seam transitions, and floating text cards.

---

## Performance Budget

Every asset must justify its weight against real-world Core Web Vitals targets:

| Metric / Asset Group | Target / Budget | Pascal Actual |
| --- | --- | --- |
| **Global CSS** (`tokens.css` + `base.css`) | < 15 KB | ~11.8 KB uncompressed |
| **Global JavaScript** | 0 KB | 0 KB |
| **Product Page Total JS** | < 20 KB | ~14.5 KB uncompressed |
| **Third-Party Script Overhead** | 0 KB | 0 KB |
| **Largest Contentful Paint (LCP)** | < 2.5s | Passing |
| **Interaction to Next Paint (INP)** | < 200ms | Passing |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Passing |

---

## Philosophy & Progressive Enhancement

**HTML first. CSS second. JavaScript only as an enhancement.**

| Feature | Baseline (Zero JS) | Enhanced Experience |
| --- | --- | --- |
| **Mobile Navigation & Dropdowns** | Native `<details>` disclosures | Smooth transition states |
| **Product Gallery** | CSS scroll-snap track with anchor links | Interactive thumbnail selection |
| **Free Shipping Bar** | Server-calculated Liquid mathematics + CSS | Dynamic milestone progress & tier rewards |
| **Sorting & Filtering** | Accessible standard GET forms | Instant URL state updates |
| **Form Validation** | CSS `:user-invalid` + server error rendering | Inline accessible error announcements |
| **Cart Page** | Standard form submission | In-place line-item morphing via `<cart-items>` |
| **Cart Drawer** | Falls back to cart page | Native `<dialog>` sliding sheet via `<cart-drawer>` |
| **Add to Cart** | Direct form POST | AJAX submission + drawer opening via `<product-form>` |
| **Variant Selection** | Real radio inputs / dropdowns | Instant URL & media gallery sync via `<variant-picker>` |
| **Quantity Stepper** | Native number input | Accessible stepper buttons via `<quantity-input>` |
| **Quick Add & Quick View** | Direct links to product pages | On-demand modal rendering via `<quick-add-modal>` |
| **Customer Wishlist** | Hidden when offline | Local storage suite (`<wishlist-button>`, `<wishlist-grid>`) |
| **Shareable Cart** | Direct link generation | Native Web Share API + one-click copy via `<share-cart>` |
| **Complete the Look** | Standard related product links | Interactive bundle builder & batch ATC via `<bundle-builder>` |
| **Predictive Search** | Standard search query results | Real-time debounced query suggestions via `<predictive-search>` |
| **Recently Viewed** | Fallback recommendations | Private browser-cached product history via `<recently-viewed>` |
| **Size Guide** | Standard page link | Interactive CM/INCH unit conversion modal via `<size-guide-modal>` |
| **Shipping Cutoff** | Static dispatch policy copy | Live dynamic countdown timer via `<shipping-cutoff>` |
| **Before / After Slider** | Side-by-side static comparison | Interactive drag comparison slider via `<before-after-slider>` |

---

## Architecture

Pascal organizes code into strict modular layers. Components never invent arbitrary values—everything connects to the design token pipeline:

```
tokens.css → base.css → component CSS → snippets → blocks / sections → templates
```

### Directory Structure

```
assets/
  tokens.css                  Design tokens (the single source of truth for all styles)
  base.css                    Reset, layout primitives, forms, responsive containers
  component-*.css             Loaded only by sections that require them
  section-*.css               Section-specific styles and layouts
  product-form.js             <product-form> AJAX submission & cart dispatch
  variant-picker.js           <variant-picker> Option, media, and URL state synchronizer
  quantity-input.js           <quantity-input> Stepper enhancement
  cart-drawer.js              <cart-drawer> Modal dialog sheet management
  cart-items.js               <cart-items> Line item list morphing and updates
  quick-add.js                <quick-add-modal> Dynamic Section Rendering API modals
  predictive-search.js        <predictive-search> Live search suggestions
  wishlist.js                 <wishlist-button>, <wishlist-count>, <wishlist-grid>
  bundle-builder.js           <bundle-builder> Complete the look bundle selector
  share-cart.js               <share-cart> Permanent Shopify cart permalinks
  shipping-cutoff.js          <shipping-cutoff> Real-time order dispatch countdown
  size-guide.js               <size-guide-modal> Size conversion modal
  before-after.js             <before-after-slider> Image comparison slider
  carousel.js                 <scroll-carousel> Keyboard/arrow accessible carousels
  tabs.js                     <tab-group> ARIA-compliant tabbed interfaces
  countdown-timer.js          <countdown-timer> Urgency countdowns with expiry handling
  pickup-availability.js      <pickup-availability> Store pickup availability drawer
  gift-card-recipient.js      <gift-card-recipient> Gift card recipient validation
  video-facade.js             <video-facade> Click-to-load video embed wrapper

blocks/                       Reusable theme blocks (heading, text, button, group)
snippets/                     Liquid primitives (field, icon, price, media, swatch, etc.)
sections/                     Full section library (hero variants, featured, bento, footer, etc.)
templates/                    JSON page templates & customer account templates
config/settings_schema.json   Theme settings schema (Brand, Layout, Components, Commerce)
```

---

## Out-of-the-Box Demo Setup

Pascal looks composed and editorial immediately upon installation:

- **Pre-configured JSON Templates:** Rich configurations for `index`, `page.about`, `page.lookbook`, `page.faq`, `page.size-guide`, `page.wishlist`, `page.contact`, and `page.order-tracking`.
- **Curated Fallback Imagery:** Empty image slots automatically render one of 24 curated palette still lifes (`assets/demo-*.jpg`, ~730 KB total across the library) delivered at optimal sizes via `snippets/placeholder.liquid`.
- **Sample Store States:** Product and collection sections render structured demo cards until real inventory is added.

---

## Development & Tooling

```bash
# Start local development server with hot-reload
shopify theme dev --store your-store.myshopify.com

# Run Shopify Theme Check linter
shopify theme check

# Deploy to an unpublished theme slot
shopify theme push --unpublished
```

---

## Shopify Compatibility & Ecosystem

Pascal provides native support for the modern Shopify platform ecosystem:

- [x] **Internationalization & Global Locales:** Comprehensive editor schema translations (`locales/en.default.schema.json`) and 17 complete storefront locales built-in (English, German, French, Spanish, Italian, Portuguese [Brazil & Portugal], Dutch, Japanese, Simplified Chinese, Traditional Chinese, Korean, Swedish, Danish, Norwegian, Finnish, Polish).
- [x] **App Blocks:** Dedicated universal `apps.liquid` section for app integration anywhere.
- [x] **B2B & Wholesale:** Native quantity rules, volume pricing tables, and increment steppers.
- [x] **Subscriptions:** Seamless selling plan and purchase option selectors (`snippets/purchase-options.liquid`).
- [x] **Customer Privacy:** Fully compatible with Shopify's native cookie consent system (loads zero unvetted third-party tracking scripts).
- [x] **Gift Cards:** Native gift card recipient form with custom recipient notes and delivery dates.
- [x] **Metaobjects:** Dedicated `main-metaobject.liquid` section for dynamic metaobject landing pages.
- [x] **SEO & Crawlers:** Dynamic `robots.txt.liquid` and JSON-LD structured data.

---

## Documentation

For the complete catalog of all 30+ sections, theme blocks, settings, and Web Components, see **[`COMPONENTS.md`](file:///var/www/git/Pascal/COMPONENTS.md)**.
