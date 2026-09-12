# Pascal component catalog

Every component in the theme, what ships today and what is planned as a default. Status: **Built**, **Planned** (next release), **App** (needs an app or Shopify feature to be enabled).

## Foundation

| Component | Status | Notes |
| --- | --- | --- |
| Design tokens | Built | `assets/tokens.css`. Color, type scale, spacing, shape, motion, layout, z-index. |
| Merchant token bridge | Built | `snippets/css-vars.liquid` maps Brand / Layout / Components settings onto tokens. |
| Typography | Built | One family, two weights. Display headings track tight at -0.03em. |
| Color system | Built | Background, ink, plate, accent, sale. Muted and border are derived, not set. |
| Icon set | Built | 20+ inline SVG icons via `snippets/icon.liquid`, zero icon font dependencies. |
| Layout primitives | Built | Container, section, section header, stack, grid, split. |
| Responsive images | Built | `snippets/media.liquid`. Width and height always set, native lazy loading, eager plus high fetch priority for LCP. |
| Demo placeholder imagery | Built | `snippets/placeholder.liquid` with 24 curated palette still lifes (`assets/demo-*.jpg`). |
| Focus and reduced motion | Built | 2px accent focus ring. All motion collapses to 0ms under reduced motion. |

## Primitives

| Component | Status | Notes |
| --- | --- | --- |
| Button | Built | Primary, secondary, ghost, small, full width, busy and disabled states (`assets/component-button.css`). |
| Input, select, textarea | Built | Soft filled field, hairline border, accent focus ring. `--line` and `--pill` modifiers. |
| Form field | Built | `snippets/field.liquid`: label, control, message slot. Invalid state appears after the customer leaves a field (`:user-invalid`) or when the server names it; `aria-invalid` and `aria-describedby` wired. `snippets/form-errors.liquid` announces success and form-level errors. |
| Badge | Built | Sale, sold out, and pre-order indicators. |
| Price | Built | Current, compare-at, "from", unit price. Markup is stable so JavaScript updates it in place (`snippets/price.liquid`, `assets/component-price.css`). |
| Link | Built | Underlined by default. Hover transitions smoothly to accent tone. |
| Rating | Built | Reads the standard `reviews.rating` metafield that review apps write (`snippets/rating.liquid`). |
| Tooltip | Planned | Progressive, `<details>`-based. |

## Commerce

| Component | Status | Notes |
| --- | --- | --- |
| Product card | Built | Plate image, hover image, badges, wishlist trigger, title and price on one row, quick add (`snippets/product-card.liquid`, `assets/component-product-card.css`). |
| Quick add | Built | One button per card. `assets/quick-add.js` opens the product form in a modal via the Section Rendering API (`sections/quick-add.liquid`). Without JavaScript it links to the product. |
| Quick view | Built | Eye action on the card. Powered by `assets/quick-add.js` and `sections/quick-view.liquid`: scroll-snap gallery, excerpt, variant selector, full buy form. Toggle in Components settings. |
| Product gallery | Built | Scroll-snap track with anchor thumbnails. Zero JavaScript. Grid, stacked or carousel on desktop (`sections/main-product.liquid`). |
| Variant picker | Built | Radio pills for up to six values, select above that. `<variant-picker>` enhances with deep-link URL updating and image switching (`assets/variant-picker.js`). |
| Quantity selector | Built | Native number input. `<quantity-input>` enhances with touch-friendly increment/decrement buttons (`assets/quantity-input.js`). |
| Add to cart | Built | Progressive form. `<product-form>` keeps the customer on page, emits `cart:added` events, updates counters (`assets/product-form.js`). |
| Dynamic checkout | Built | Shop Pay, PayPal and accelerated wallets via payment button. |
| Trust signals | Built | Shipping, returns, guarantee lines as a product block. |
| Collapsible rows | Built | Description, materials, shipping, custom page content in native accordions. |
| SKU & Barcode | Built | Optional display on the price/product block. |
| Share | Built | Social share links without third-party tracking scripts. |
| Collection banner | Built | Collection image and rich description header (`sections/main-collection.liquid`). |
| Article comments | Built | List, response notice, and submission form respecting store moderation (`sections/main-article.liquid`). |
| Cart page | Built | Line items, quantity updates, removal, notes, discounts. Progressive `<form>` enhanced with `<cart-items>` for live in-place updates (`sections/main-cart.liquid`, `assets/cart-items.js`). |
| Cart drawer | Built | Native `<dialog>` sliding sheet re-rendered through Section Rendering API. Animated line item entrances/exits, morphing totals, fallback to cart page (`sections/cart-drawer.liquid`, `assets/cart-drawer.js`). |
| Shareable cart | Built | `<share-cart>` Web Component creates persistent Shopify cart permalinks with Web Share API and one-click copy feedback (`snippets/share-cart.liquid`, `assets/share-cart.js`). |
| Free shipping & rewards bar | Built | Tiered milestone progress bar supporting Free Shipping and Tier 2 gift/discount perks computed in Liquid (`snippets/shipping-bar.liquid`). |
| Gift options & note | Built | Interactive gift wrapping option and custom gift message accordion in cart drawer and cart page (`snippets/cart-gift-wrap.liquid`). |
| Sticky add to cart | Built | Viewport-aware `<sticky-atc>` bar on mobile and desktop submitting the active variant form (`assets/sticky-atc.js`). |
| Product recommendations | Built | `<product-recommendations>` utilizing Shopify Recommendations API (related/complementary intent) loaded on viewport intersection (`sections/product-recommendations.liquid`, `assets/product-recommendations.js`). |
| Recently viewed | Built | Zero-backend `<recently-viewed>` Web Component using local storage and Section Rendering API (`sections/recently-viewed.liquid`, `assets/recently-viewed.js`). |
| Color swatches | Built | Visual swatches for cards and variant pickers. Supports native Shopify swatches, variant images, and CSS color fallback (`snippets/swatch.liquid`). |
| Size guide | Built | `<size-guide-modal>` with interactive CM / INCHES unit switch and sizing measurement table in a native `<dialog>` (`snippets/size-guide-modal.liquid`, `assets/size-guide.js`). |
| Inventory status & low stock | Built | Real-time stock counters displayed at or below threshold. Scarcity is never faked. |
| Pre-order support | Built | Automatically detects `continue_selling` inventory policies and tags to switch CTA copy and render dispatch notices. |
| Shipping cutoff countdown | Built | `<shipping-cutoff>` dynamic countdown for same-day dispatch cutoffs (`snippets/shipping-cutoff.liquid`, `assets/shipping-cutoff.js`). |
| Cart upsells | Built | Curated upsell carousel in drawer and cart page with instant one-click add (`snippets/cart-upsell.liquid`). |
| Predictive search | Built | Header instant-search with products, collections, pages, and articles (`sections/predictive-search.liquid`, `assets/predictive-search.js`). |
| Breadcrumbs | Built | Structured breadcrumb hierarchy for product, collection, article, and policy pages (`snippets/breadcrumbs.liquid`). |
| Wishlist | Built | Zero-app local storage wishlist suite: `<wishlist-button>`, `<wishlist-count>`, `<wishlist-grid>` on `page.wishlist` (`snippets/wishlist-button.liquid`, `sections/main-wishlist.liquid`, `assets/wishlist.js`). |
| Complete the look (Bundle builder) | Built | Multi-product outfit bundle section with variant pickers and batch add-to-cart (`sections/complete-the-look.liquid`, `assets/bundle-builder.js`). |
| Before / After image slider | Built | Interactive touch/mouse comparison slider for transformational imagery (`assets/before-after.js`). |
| Order tracking | Built | Branded self-service lookup page template with direct carrier redirects (`sections/main-order-tracking.liquid`, `templates/page.order-tracking.json`). |
| Country switcher suggestion pill | Built | Discreet auto-detection suggestion pill for country & currency switching without intrusive popups (`snippets/country-switcher-pill.liquid`). |
| Subscriptions | Built | Selling plan selector with automated variant price updates (`snippets/purchase-options.liquid`). |
| Gift card recipient form | Built | Send-as-a-gift toggle with recipient email, personalized note, and schedule date (`snippets/gift-card-recipient.liquid`, `assets/gift-card-recipient.js`). |
| Quantity rules & Volume pricing | Built | B2B volume increments, min/max rules, and dynamic price break tables (`snippets/quantity-rules.liquid`). |
| Apps section | Built | Universal container section accepting app blocks on any template. |
| Follow on Shop | Built | Native Shop Pay follow button integration in footer. |
| Back in stock alerts | App | Merchant block slot for back-in-stock app integration. |

## Layout

| Component | Status | Notes |
| --- | --- | --- |
| Announcement bar | Built | CSS ticker with pause-on-hover and reduced-motion static fallback (`sections/announcement-bar.liquid`, `assets/section-announcement.css`). |
| Header | Built | Left or centered logo, multi-tier navigation, predictive search trigger, account, wishlist, and cart counter. Sticky blur header transitions via CSS (`sections/header.liquid`, `assets/component-header.css`). |
| Desktop dropdowns & Mega menu | Built | Progressive `<details>` dropdowns and full-width multi-column mega menus with featured imagery. |
| Mobile drawer menu | Built | Accessible slide-in menu with nested category accordions, social links, and localization selectors. |
| Search panel | Built | Header search panel featuring live predictive queries and top searches. |
| Social icons | Built | Configurable social channel links in header and footer (`snippets/social-icons.liquid`). |
| Footer | Built | Newsletter signup, multi-column navigation, payment badges, copyright, and display-size brand wordmark (`sections/footer.liquid`, `assets/component-footer.css`). |
| Localization selectors | Built | Currency and language selector dropdowns in footer and mobile drawer (`snippets/localization.liquid`), supporting 17 built-in storefront locales. |

## Sections (patterns)

| Section | Status | Notes |
| --- | --- | --- |
| Hero | Built | Five layouts in one section: editorial (headline breaks out on rounded tab), split, cover, statement (type only), collage (three images) (`sections/hero.liquid`). |
| Hero slider | Built | Scroll-snap slides with progress indicators, navigation arrows, and autoplay (`sections/hero-slider.liquid`). |
| Hero video | Built | Muted looping video background with overlaid typography and actions (`sections/hero-video.liquid`). |
| Bento grid (Image grid) | Built | Asymmetric bento grid with square, wide, tall, and large tiles (`sections/bento-grid.liquid`). |
| Shop the look | Built | Interactive hotspot markers on editorial images displaying product modals (`sections/shop-the-look.liquid`). |
| Complete the look | Built | Outfit bundle section with item checkboxes, individual variant pickers, and bundle add-to-cart (`sections/complete-the-look.liquid`). |
| Featured collection | Built | Product grid or horizontal scroll carousel with progress lines (`sections/featured-collection.liquid`). |
| Collection tabs | Built | Tabbed product showcase switching between collections without page reloads (`sections/collection-tabs.liquid`). |
| Category spotlight | Built | Featured hero collection tile paired beside stacked sub-categories (`sections/category-spotlight.liquid`). |
| Collection list | Built | Grid of category showcase cards (`sections/collection-list.liquid`). |
| Featured product | Built | Standalone full product buy-section for high-priority items (`sections/featured-product.liquid`). |
| Marquee | Built | Infinite scrolling typography banner with pause on hover (`sections/marquee.liquid`). |
| Image with text | Built | Media and copy side-by-side or overlapping card layout (`sections/image-with-text.liquid`). |
| Multicolumn | Built | Rule-separated value propositions with optional icons and images (`sections/multicolumn.liquid`). |
| Features | Built | Value proposition icons and concise benefit statements (`sections/features.liquid`). |
| Comparison table | Built | Spec and feature comparison matrix with check/cross markers (`sections/comparison-table.liquid`). |
| Duo banner | Built | Dual side-by-side promotional cards with individual buttons (`sections/duo-banner.liquid`). |
| Promo banner | Built | Contained announcement plate with custom palette overrides (`sections/promo-banner.liquid`). |
| Tabs | Built | Content tabs for FAQ, shipping info, or editorial stories (`sections/tabs.liquid`). |
| Timeline | Built | Chronological narrative layout for brand milestones (`sections/timeline.liquid`). |
| Testimonials | Built | Verified buyer quotes with star ratings in grid or carousel (`sections/testimonials.liquid`). |
| FAQ | Built | Expandable accordion items with schema.org FAQPage structured data (`sections/faq.liquid`). |
| Blog posts (Journal) | Built | Editorial article previews with tag pills and date stamps (`sections/blog-posts.liquid`). |
| Video | Built | Facade-loaded video player supporting YouTube, Vimeo, and MP4 (`sections/video.liquid`). |
| Slideshow | Built | CSS scroll-snap slide presentation (`sections/slideshow.liquid`). |
| Logo list | Built | Press mentions and stockist brand logos (`sections/logo-list.liquid`). |
| Contact form | Built | Customer contact form with error validation states (`sections/contact-form.liquid`). |
| Countdown | Built | Urgency timer banner with deadline expiration handling (`sections/countdown.liquid`). |
| Rich text | Built | Typography and brand manifesto container (`sections/rich-text.liquid`). |
| Customer account templates | Built | Complete suite for login, registration, orders, addresses, activation, and recovery. |
| Main storefront templates | Built | Core layouts for product, collection, cart, search, pages, blogs, articles, 404, password, collections list, wishlist, order tracking, and metaobjects. |

## Page templates

| Template | File | Featured Sections |
| --- | --- | --- |
| Home | `templates/index.json` | Cover hero, features, featured collection carousel, category spotlight, image with text, marquee, collection tabs, shop the look, testimonials, journal, newsletter |
| About | `templates/page.about.json` | Statement hero, image grid, image with text, timeline, multicolumn, newsletter |
| FAQ | `templates/page.faq.json` | Statement hero, FAQ with structured data, contact form |
| Lookbook | `templates/page.lookbook.json` | Collage hero, shop the look, image grid, shop the look |
| Size guide | `templates/page.size-guide.json` | Editorial introduction, comparison table, tabs |
| Contact | `templates/page.contact.json` | Page content header, contact form |
| Wishlist | `templates/page.wishlist.json` | Wishlist grid, empty state, quick add integrations |
| Order tracking | `templates/page.order-tracking.json` | Self-service order lookup and shipping carrier redirect portal |

## Theme settings

| Group | Key Options |
| --- | --- |
| **Brand** | Logo, favicon, background color, surface color, ink color, plate color, accent color, text on accent, sale badge color, heading typography, body typography |
| **Layout** | Container max width, vertical section padding, grid column rules for desktop and mobile |
| **Components** | Button corner radius (pill/rounded/square), image corner radius, card aspect ratio, image fit mode, show vendor, show secondary hover image, quick add mode |
| **Commerce** | Cart style (drawer / page), free shipping progress threshold, tier 2 reward threshold, cart upsell collection, gift wrapping product, order notes, quantity input toggle, dynamic checkout buttons, sticky add to cart, low stock urgency threshold, sale badge format, currency formatting |
| **Search** | Predictive search toggle, display price in search, display vendor in search, search result types |
| **Social media** | Instagram, TikTok, Pinterest, Facebook, X (Twitter), YouTube, LinkedIn |
| **Localization** | Country selector toggle, language selector toggle |

## Theme blocks

Theme blocks live under `blocks/` and can be composed inside supporting sections:

| Block | File | Features |
| --- | --- | --- |
| Heading | `blocks/heading.liquid` | Text, typography scale (h1-h6), custom HTML heading level tag selection. |
| Text | `blocks/text.liquid` | Rich text formatting, typography size modifiers. |
| Button | `blocks/button.liquid` | Primary, secondary, or ghost button styles with customizable link targets. |
| Group | `blocks/group.liquid` | Flexible horizontal/vertical stack container for nesting multiple blocks. |

## JavaScript enhancements

Every script is an isolated, dependency-free Web Component that loads with `defer` only when its markup is present:

| Component | File | Size | Functionality |
| --- | --- | --- | --- |
| `<product-form>` | `assets/product-form.js` | ~2.4 KB | Handles AJAX cart submissions, error announcements, and fires `cart:added`. |
| `<variant-picker>` | `assets/variant-picker.js` | ~7.0 KB | Synchronizes variant options, URL history states, media galleries, and pricing. |
| `<quantity-input>` | `assets/quantity-input.js` | ~1.5 KB | Enhances native number inputs with stepper buttons and min/max constraints. |
| `<cart-drawer>` | `assets/cart-drawer.js` | ~2.9 KB | Manages `<dialog>` drawer open/close lifecycles, focus traps, and backdrop taps. |
| `<cart-items>` | `assets/cart-items.js` | ~5.3 KB | Updates line items, debounces quantity edits, morphs pricing and free shipping progress. |
| `<quick-add-modal>` | `assets/quick-add.js` | ~3.5 KB | Fetches and renders quick add forms and quick view modals on demand. |
| `<predictive-search>` | `assets/predictive-search.js` | ~1.8 KB | Debounced live search querying Shopify Suggest API for products, articles, and pages. |
| `<product-recommendations>` | `assets/product-recommendations.js` | ~0.9 KB | IntersectionObserver-triggered fetching for recommended product cards. |
| `<recently-viewed>` | `assets/recently-viewed.js` | ~1.5 KB | Reads and records viewed product handles into `localStorage` and renders cards. |
| `<sticky-atc>` | `assets/sticky-atc.js` | ~0.5 KB | Displays floating buy bar once primary add-to-cart button scrolls out of view. |
| `<countdown-timer>` | `assets/countdown-timer.js` | ~1.4 KB | Calculates real-time countdown to deadline dates and gracefully hides on expiry. |
| `<video-facade>` | `assets/video-facade.js` | ~0.6 KB | Defers loading of YouTube, Vimeo, or HTML5 video until user interaction. |
| `<scroll-carousel>` | `assets/carousel.js` | ~2.3 KB | Enhances CSS scroll-snap containers with keyboard navigation and arrow controls. |
| `<tab-group>` | `assets/tabs.js` | ~1.3 KB | Accessible tabbed panels with arrow key navigation and ARIA state updates. |
| `<pickup-availability>` | `assets/pickup-availability.js` | ~1.7 KB | Dynamic in-store pickup availability drawer and location details. |
| `<gift-card-recipient>` | `assets/gift-card-recipient.js` | ~1.4 KB | Toggles and validates gift recipient email, message, and scheduled date fields. |
| `<wishlist-button>`, `<wishlist-count>`, `<wishlist-grid>` | `assets/wishlist.js` | ~5.4 KB | Zero-backend customer wishlist management, button toggles, header counters, and grid renderer. |
| `<bundle-builder>` | `assets/bundle-builder.js` | ~3.5 KB | Complete the look bundle selector, subtotal calculation, and multi-line batch add-to-cart. |
| `<before-after-slider>` | `assets/before-after.js` | ~0.7 KB | Interactive dual-image comparison slider with touch and mouse drag support. |
| `<share-cart>` | `assets/share-cart.js` | ~3.4 KB | Generates permanent cart URLs and triggers native Web Share API or clipboard copy. |
| `<shipping-cutoff>` | `assets/shipping-cutoff.js` | ~1.3 KB | Computes time remaining for same-day order dispatch based on merchant cutoff time. |
| `<size-guide-modal>` | `assets/size-guide.js` | ~1.0 KB | Native `<dialog>` modal with imperial/metric (in/cm) conversion switches. |
