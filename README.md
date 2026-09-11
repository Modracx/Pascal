# Pascal

A performance-first, design-system-first, conversion-first Shopify theme.

**⚡ Fast by default.** Every byte has to justify itself.
**🎨 System, not a template.** Every component follows the same design language.
**🛒 Conversion without compromise.** Every interaction makes shopping easier, not merely prettier.

## Design

Pascal is set in the register of a fashion house rather than a marketplace.

- Ivory ground, warm charcoal ink, one bronze accent that appears only on hover, sale tags and small details.
- Fraunces at a light weight for headings, set large with tight leading. Jost for everything else.
- Soft corners on a single scale (8, 12, 18, 28px), hairline dividers derived from the ink colour, images with rounded edges and a quiet inner ring. Pill buttons and chips by default; both radii are merchant settings.
- Depth comes from layered low-contrast shadows and frosted-glass surfaces (sticky header, quick add, sticky bar), never from hard borders.
- The one device: headlines that overlap imagery. The editorial hero breaks its headline out of the photo on a rounded tab, the split hero lets it cross the seam, image-with-text floats the copy on a soft card.
- Soft filled form fields with an accent focus ring, drawn-underline links, a header that is transparent over the home hero and turns to frosted glass on scroll without JavaScript.
- One orchestrated reveal on the hero at first paint. Nothing else moves unless the customer acts.

See `COMPONENTS.md` for the full catalog, including the five hero layouts, sliders, tabs and page templates.

## Philosophy

HTML first. CSS second. JavaScript only when necessary.

| Feature | Approach |
| --- | --- |
| Mobile menu, dropdowns | `<details>` — no JS |
| Accordions, filters | `<details>` — no JS |
| Product gallery | CSS scroll-snap + anchor thumbnails — no JS |
| Cart page | Plain `<form>`; `<cart-items>` enhances it with in-place updates and motion |
| Free-shipping bar | Liquid math + CSS — no JS |
| Sorting and filtering | One GET form — no JS |
| Form validation | `:user-invalid` CSS plus Shopify's server errors, rendered per field by `snippets/field.liquid` — no JS |
| Add to cart | `<product-form>` Web Component (enhances a working form) |
| Quick add, quick view | `<quick-add-modal>` fetches the product form (or the full quick view) into a `<dialog>`; links to the product without JS |
| Swatches | Liquid + CSS. Native swatch, variant image or the value name as a colour — no JS |
| Pickup availability | Server-rendered; `<pickup-availability>` refetches it when the variant changes |
| Variant picker | `<variant-picker>` Web Component (enhances real radio/select inputs) |
| Quantity | `<quantity-input>` Web Component (enhances a native number input) |

If JavaScript fails, the store still works.

## Performance budget

| Asset | Budget | Current |
| --- | --- | --- |
| Global CSS (tokens + base) | < 15 KB | ~6 KB uncompressed |
| Global JS | 0 | 0 |
| JS on product page | < 15 KB | ~8 KB uncompressed |
| Third-party JS | 0 by default | 0 |

Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1. These are budgets, not marketing. Apps you install are outside this budget.

## Architecture

```
assets/
  tokens.css              design tokens (the only place raw values live)
  base.css                reset, layout primitives, forms — global
  component-*.css         loaded only by the sections that use them
  section-*.css           section-specific styles
  product-form.js         <product-form>
  variant-picker.js       <variant-picker>
  quantity-input.js       <quantity-input>
  quick-add.js            <quick-add-modal> (quick add and quick view)
  cart-items.js           <cart-items> (line item list shared by drawer and cart page)
  pickup-availability.js  <pickup-availability>
blocks/                   theme blocks: heading, text, button, group
snippets/
  css-vars.liquid         merchant settings → CSS custom properties
  product-card.liquid     the hero component
  price.liquid, media.liquid, icon.liquid, product-form.liquid, pagination.liquid,
  swatch.liquid, pickup-availability.liquid, placeholder.liquid (demo imagery),
  field.liquid, form-errors.liquid (every form field and its messages)
sections/                 announcement-bar, header, footer, hero, featured-collection, collection-list,
                          image-with-text, multicolumn, rich-text, main-*
templates/                JSON templates
config/settings_schema.json   Brand / Layout / Components / Commerce
```

### Design system layers

```
tokens.css  →  base.css  →  component CSS  →  snippets  →  blocks/sections  →  templates
```

Components never invent values. If a value is not a token, it does not belong in a component.

### Merchant settings map to tokens

Theme settings are grouped as **Brand**, **Layout**, **Components** and **Commerce**. `snippets/css-vars.liquid` turns them into custom properties, so changing a button radius or accent color updates the whole store consistently.

### CSS loading

Only `tokens.css` and `base.css` are global. Each section calls `stylesheet_tag` for the component CSS it needs. The browser dedupes repeated tags, so a page loads exactly the CSS its sections use.

### JavaScript loading

There is no `theme.js`. Each Web Component is its own file with `defer`, and is emitted only by the snippet that renders the matching markup. Components communicate through DOM events (`cart:added`) and `data-*` attributes, never globals.

## Demo content

A fresh install looks composed before anything is uploaded. The home, about, lookbook, FAQ and size-guide templates ship with real copy, and every empty image slot renders one of 24 still lifes generated in the theme palette (`assets/demo-*.jpg`, 730 KB in total, served through the CDN at the size each slot needs). Product and collection slots show demo cards until the store has products. Replace the imagery by uploading your own in the editor; nothing else needs changing.

## Development

```bash
shopify theme dev --store your-store.myshopify.com
shopify theme check
shopify theme push --unpublished
```

## Roadmap

- [x] Phase 1 — Foundation: tokens, typography, color, spacing, buttons, forms, icons
- [x] Phase 2 — Commerce primitives: product card, price, media, variant picker, quantity, add to cart
- [x] Phase 3 — Performance: asset and image strategy, per-section CSS, isolated JS
- [x] Phase 4 — Core storefront: home, collection, product, search, cart, header, footer
- [x] Phase 5 — Conversion: cart drawer, sticky ATC, recommendations, recently viewed, cart upsells, predictive search, inventory status, FAQ, testimonials, countdown
- [x] Customer account templates (login, register, account, order, addresses, activate, reset)
- [ ] Phase 6 — Open source: docs site, CI with Theme Check + Lighthouse budgets, contribution guide, changelog
- [x] Premium section library: five hero layouts, hero slider, hero video, tabs, collection tabs, carousels, marquee, image grid, shop the look, spotlight, timeline, table, two banners, mega menu
- [x] Swatches, quick view, pickup availability

## Shopify compatibility

Platform features beyond the roadmap, tracked as they land.

- [x] Editor translations (`locales/en.default.schema.json`, `t:` keys in every schema)
- [x] Apps section for app blocks on any page
- [x] Gift card recipient form
- [x] Quantity rules and volume pricing (B2B)
- [x] Subscriptions: selling plan selector
- [x] Follow on Shop button
- [x] Customer privacy and consent (Shopify's built-in cookie banner; the theme loads no third-party scripts, so nothing needs gating)
- [x] Release notes and changelog
- [x] Additional storefront locales (French, German)
- [x] Metaobject page section (`main-metaobject`; create `templates/metaobject/<definition>.json` per definition)
- [x] `robots.txt.liquid`
