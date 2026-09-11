# Pascal component catalog

Every component in the theme, what ships today and what is planned as a default. Status: **Built**, **Planned** (next release), **App** (needs an app or Shopify feature to be enabled).

## Foundation

| Component | Status | Notes |
| --- | --- | --- |
| Design tokens | Built | `assets/tokens.css`. Color, type scale, spacing, shape, motion, layout, z-index. |
| Merchant token bridge | Built | `snippets/css-vars.liquid` maps Brand / Layout / Components settings onto tokens. |
| Typography | Built | One family, two weights. Display headings track tight at -0.03em. |
| Color system | Built | Background, ink, plate, accent, sale. Muted and border are derived, not set. |
| Icon set | Built | 15 inline SVG icons via `snippets/icon.liquid`, no icon font. |
| Layout primitives | Built | Container, section, section header, stack, grid, split. |
| Responsive images | Built | `snippets/media.liquid`. Width and height always set, native lazy loading, eager plus high fetch priority for LCP. |
| Focus and reduced motion | Built | 2px accent focus ring. All motion collapses to 0ms under reduced motion. |

## Primitives

| Component | Status | Notes |
| --- | --- | --- |
| Button | Built | Primary, secondary, ghost, small, full width, busy and disabled states. |
| Input, select, textarea | Built | Soft filled field, hairline border, accent focus ring. `--line` and `--pill` modifiers. |
| Form field | Built | `snippets/field.liquid`: label, control, message slot. Invalid state appears after the customer leaves a field (`:user-invalid`) or when the server names it; `aria-invalid` and `aria-describedby` wired. `snippets/form-errors.liquid` announces success and form-level errors. |
| Badge | Built | Sale and sold out. |
| Price | Built | Current, compare-at, "from", unit price. Markup is stable so JavaScript updates it in place. |
| Link | Built | Underlined by default. Hover moves to accent. |
| Rating | Built | Reads the standard `reviews.rating` metafield that review apps write. |
| Tooltip | Planned | Progressive, `<details>`-based. |

## Commerce

| Component | Status | Notes |
| --- | --- | --- |
| Product card | Built | Plate image, hover image, badges, title and price on one row, quick add. |
| Quick add | Built | One button per card. `quick-add.js` opens the product form in a modal via the Section Rendering API (`sections/quick-add.liquid`). Without JavaScript it links to the product. |
| Product gallery | Built | Scroll-snap track with anchor thumbnails. Zero JavaScript. Grid, stacked or carousel on desktop. |
| Variant picker | Built | Radio pills for up to six values, select above that. `<variant-picker>` enhances. |
| Quantity selector | Built | Native number input. `<quantity-input>` adds the buttons. |
| Add to cart | Built | Working form. `<product-form>` keeps the customer on the page and updates the cart count. |
| Dynamic checkout | Built | Shop Pay, PayPal and others via the payment button. |
| Trust signals | Built | Shipping, returns, guarantee lines as a product block. |
| Collapsible rows | Built | Description, shipping, any page content. Accordion or tabs. |
| SKU | Built | Option on the price block. |
| Share | Built | Facebook, Pinterest, X links. No third-party scripts. |
| Collection banner | Built | Collection image and description above the grid. |
| Article comments | Built | List and form, respects moderation. |
| Cart page | Built | Line items, quantity updates, removal, notes, discounts. Works with zero JavaScript; `<cart-items>` updates in place with motion when it is available. |
| Free shipping progress | Built | Threshold in Commerce settings. Computed in Liquid. |
| Filters | Built | Search and Discovery filters in one GET form. Boolean, list, price range. Active filter chips. |
| Sort | Built | Same GET form. |
| Pagination | Built | Numbered, previous and next. |
| Search results | Built | Products, pages and articles. |
| Cart drawer | Built | Native `<dialog>` that slides in and out, re-rendered through the Section Rendering API. Lines are morphed: additions slide in, removals collapse, totals pulse. Falls back to the cart page. Toggle in Commerce settings. |
| Shareable cart | Built | `<share-cart>` Web Component creates Shopify cart permalinks and triggers native Web Share API or clipboard copy with live feedback. |
| Free shipping & rewards bar | Built | Tiered milestone progress bar supporting Free Shipping and Tier 2 gift/discount rewards computed in Liquid. |
| Gift options & note | Built | Interactive gift wrapping and custom gift message accordion in cart drawer and cart page. |
| Sticky add to cart | Built | Mobile and desktop. Appears once the main button scrolls out. Submits the real form. |
| Product recommendations | Built | Shopify recommendations API, related or complementary intent, loads when near the viewport. |
| Recently viewed | Built | Local storage plus Section Rendering API. Nothing leaves the browser. |
| Color swatches | Built | Variant picker and cards. Option names from the Swatches setting (default Color, Colour). Native swatch, then variant image, then the value name as a CSS colour. `snippets/swatch.liquid`. |
| Size guide | Built | `<size-guide-modal>` with interactive CM / INCHES unit switch and sizing table in a native `<dialog>`. |
| Inventory status | Built | Shows real inventory at or below the Commerce threshold. Never fakes scarcity. |
| Pre-order support | Built | Automatically detects continue-selling inventory policies or pre-order tags to update buy button and render dispatch notice. |
| Shipping cutoff | Built | `<shipping-cutoff>` dynamic countdown ("Order within 2h 14m for same-day dispatch"). |
| Cart upsell | Built | Products from a merchant-chosen collection, shown in the drawer and cart page with one-click add. |
| Predictive search | Built | Enhances the header search form. Products, collections, pages, articles. Toggle in Search settings. |
| Quick view | Built | Eye control on the card. Same modal as quick add, fed by `sections/quick-view.liquid`: scroll-snap gallery, excerpt, form. Toggle in Components settings. |
| Breadcrumbs | Built | Product, collection and article pages. |
| Wishlist | Built | Zero-app local storage wishlist (`<wishlist-button>`, `<wishlist-count>`, `<wishlist-grid>` on `page.wishlist`). |
| Complete the look | Built | Outfit bundle section (`<bundle-builder>`) with multi-item selection and single-click batch add-to-cart. |
| Before / After slider | Built | Interactive image comparison slider (`<before-after-slider>`). |
| Order tracking | Built | Branded self-service lookup page template (`page.order-tracking`). |
| Country switcher pill | Built | Discreet auto-detection suggestion pill for country & currency switching without intrusive popups. |
| Back in stock | App | Block slot for an app form. |
| Subscriptions | Built | Purchase options selector renders every selling plan with the variant's allocated price. Needs a subscriptions app to create plans. `snippets/purchase-options.liquid`. |
| Gift card recipient | Built | Send-as-a-gift toggle with recipient, message and send date on gift card products. |
| Quantity rules, volume pricing | Built | B2B minimum, maximum and increment on the stepper and in the cart; price breaks in a hairline table per variant. |
| Apps section | Built | Empty section that accepts app blocks on any page. |
| Follow on Shop | Built | Footer button when Shop Pay is enabled. |

## Layout

| Component | Status | Notes |
| --- | --- | --- |
| Announcement bar | Built | CSS ticker. Pauses on hover, static under reduced motion. |
| Search panel | Built | `<details>` panel in the header with the predictive search form. |
| Social icons | Built | From Social media settings, shown in the footer. |
| Header | Built | Logo left or centered, menu, search, account, cart count. Sticky. Transparent over the home hero, turning solid on scroll with CSS only. |
| Desktop dropdowns | Built | `<details>`. |
| Mobile menu | Built | `<details>` panel with nested menus. |
| Footer | Built | Newsletter, menus, text, payment icons, display-size wordmark. |
| Mega menu | Built | Full-width columns from child and grandchild links, with an image. One block per top-level item. |
| Localization selector | Built | Country and language selects in the footer. Toggle in Localization settings. |

## Sections (patterns)

| Section | Status | Notes |
| --- | --- | --- |
| Hero | Built | Five layouts in one section: editorial (headline breaks out below the image), split, cover, statement (type only), collage (three images). Theme blocks inside. |
| Hero slider | Built | Scroll-snap slides with progress lines, arrows and optional autoplay. |
| Hero video | Built | Muted looping Shopify video with copy over it. |
| Tabs | Built | Content tabs from rich text or pages. Keyboard accessible, stacked without JavaScript. |
| Collection tabs | Built | Tabbed product grids, one collection per tab. |
| Marquee | Built | Slow line of large serif phrases. Pauses on hover, static under reduced motion. |
| Image grid | Built | Asymmetric bento grid with square, wide, tall and large tiles, captions and links. |
| Shop the look | Built | Numbered hotspots on a photo that open product cards. `<details>`, no JavaScript. |
| Features | Built | Icon and short statement row. |
| Category spotlight | Built | One large collection tile beside two stacked. |
| Timeline | Built | Dated story entries. |
| Table | Built | Size guide or spec table from pipe-separated rows. |
| Two banners | Built | Half-width promos with image and button. |
| Featured collection | Built | Product grid or carousel with arrows, subheading, count link. |
| Collection list | Built | Category tiles. |
| Image with text | Built | Image beside copy, or copy overlapping the image. Theme blocks inside. |
| Multicolumn | Built | Rule-separated statements, optional images. |
| Rich text | Built | Theme blocks. |
| Product, collection, cart, search, page, blog, article, 404, password, collections list, gift card | Built | Main templates. |
| Testimonials | Built | Stars, quote, name, detail. Grid or carousel. |
| FAQ | Built | `<details>` list with optional FAQPage structured data. |
| Newsletter | Built | Accent-colour signup band. |
| Promo banner | Built | Rounded plate with theme blocks inside. Custom colours. |
| Video | Built | Shopify-hosted video or YouTube/Vimeo. Nothing loads until play is pressed. |
| Slideshow | Built | Scroll-snap with anchor dots. Zero JavaScript. |
| Lookbook | Planned | Image with product hotspots. |
| Featured product | Built | One product with its full buy form on any page. |
| Logo list | Built | Press or stockists. |
| Contact form | Built | Shopify contact form. Also used by the `page.contact` template. |
| Countdown | Built | Real end date from the merchant. Hides itself when it passes. |
| Customer account pages | Built | Login with recovery, register, account with orders, order detail, addresses, activate, reset. |

## Page templates

| Template | Sections |
| --- | --- |
| Home | Cover hero, features, featured collection carousel, category spotlight, image with text, marquee, collection tabs, shop the look, testimonials, journal, newsletter |
| About (`page.about`) | Statement hero, image grid, image with text, timeline, multicolumn, newsletter |
| FAQ (`page.faq`) | Statement hero, FAQ with structured data, contact form |
| Lookbook (`page.lookbook`) | Collage hero, shop the look, image grid, shop the look |
| Size guide (`page.size-guide`) | Page content, table, tabs |
| Contact (`page.contact`) | Page content, contact form |

## Theme settings

| Group | Settings |
| --- | --- |
| Brand | Logo, favicon, background, surface, ink, plate, accent, text on accent, sale colour, heading font, body font |
| Layout | Container width, section spacing, grid columns desktop and mobile |
| Components | Button radius, image radius, image ratio, image fit, vendor on cards, hover image, quick add |
| Commerce | Cart type (drawer or page), free shipping threshold, cart upsell collection, order notes, quantity selector, dynamic checkout, sticky add to cart, low stock threshold, sale badge style, currency codes |
| Search | Predictive search on/off, vendor and price in results |
| Social media | Instagram, Facebook, TikTok, X, YouTube, Pinterest |
| Localization | Country selector, language selector |

## Theme blocks

| Block | Status | Notes |
| --- | --- | --- |
| Heading | Built | Size and HTML tag. |
| Text | Built | Rich text, size. |
| Button | Built | Primary or secondary. |
| Group | Built | Horizontal row of any blocks. |
| Image | Planned | |
| Spacer | Planned | |
| Icon with text | Planned | |
| Product | Planned | Product card as a block. |

## JavaScript enhancements

| Component | File | Size |
| --- | --- | --- |
| `<product-form>` | `product-form.js` | ~2.6 KB |
| `<variant-picker>` | `variant-picker.js` | ~4.4 KB |
| `<quantity-input>` | `quantity-input.js` | ~0.7 KB |
| `<cart-drawer>` | `cart-drawer.js` | ~2.4 KB |
| `<predictive-search>` | `predictive-search.js` | ~1.7 KB |
| `<product-recommendations>` | `product-recommendations.js` | ~0.8 KB |
| `<recently-viewed>` | `recently-viewed.js` | ~1.4 KB |
| `<sticky-atc>` | `sticky-atc.js` | ~0.4 KB |
| `<countdown-timer>` | `countdown-timer.js` | ~1.1 KB |
| `<video-facade>` | `video-facade.js` | ~0.5 KB |
| `<scroll-carousel>` | `carousel.js` | ~1.9 KB |
| `<tab-group>` | `tabs.js` | ~1.2 KB |

Nothing else ships JavaScript. Each file loads only where its markup renders.
