/**
 * <variant-picker> — syncs option inputs to a variant, then updates price, availability,
 * the hidden variant id and the URL. Variant data comes from an inline JSON script.
 * Fires `variant:change` (bubbles, detail.variant) so other components in the section can follow.
 */
{
class VariantPicker extends HTMLElement {
  connectedCallback() {
    const json = this.querySelector('script[type="application/json"]');
    if (!json) return;
    this.variants = JSON.parse(json.textContent);
    this.section = this.closest('[data-section]');
    this.addEventListener('change', () => this.onChange());
    this.section?.querySelector('[data-purchase-options]')?.addEventListener('change', () => this.onChange());
  }

  selectedOptions() {
    return [...this.querySelectorAll('fieldset')].map((set) => {
      const checked = set.querySelector('input:checked');
      return checked ? checked.value : set.querySelector('select')?.value;
    });
  }

  onChange() {
    const options = this.selectedOptions();
    const variant = this.variants.find((v) => v.options.every((o, i) => o === options[i]));
    this.updateAvailability(options);
    this.updateLegends(options);
    if (!variant) return this.setUnavailable();
    this.section?.querySelectorAll('input[name="id"]').forEach((el) => { el.value = variant.id; });
    this.updateButton(variant);
    this.updatePrice(variant);
    this.updateUrl(variant);
    this.updateMedia(variant);
    this.updateQuantityRule(variant);
    this.dispatchEvent(new CustomEvent('variant:change', { bubbles: true, detail: { variant } }));
  }

  /* B2B: the quantity input follows the variant's rule; the matching volume pricing table is shown. */
  updateQuantityRule(variant) {
    const input = this.section?.querySelector('[data-quantity]');
    const rule = variant.quantity_rule;
    if (input && rule) {
      input.min = rule.min || 1;
      if (rule.max) input.max = rule.max; else input.removeAttribute('max');
      input.step = rule.increment || 1;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    this.section?.querySelectorAll('[data-volume-pricing]').forEach((t) => { t.hidden = Number(t.dataset.volumePricing) !== variant.id; });
  }

  /* Swatch legends read "Color: Navy"; keep the value in step with the selection. */
  updateLegends(selected) {
    this.querySelectorAll('fieldset').forEach((set, index) => {
      const label = set.querySelector('[data-option-value]');
      if (label) label.textContent = selected[index] ?? '';
    });
  }

  /* Mark option values that lead to no available variant given the other selections. */
  updateAvailability(selected) {
    this.querySelectorAll('fieldset').forEach((set, index) => {
      set.querySelectorAll('input, option').forEach((input) => {
        const probe = [...selected];
        probe[index] = input.value;
        const match = this.variants.find((v) => v.options.every((o, i) => o === probe[i]));
        const available = !!match && match.available;
        input.classList.toggle('is-unavailable', !available);
        if (input.tagName === 'OPTION') input.textContent = available ? input.value : `${input.value} — ${this.dataset.soldOutText || 'Sold out'}`;
      });
    });
  }

  updateButton(variant) {
    const button = this.section?.querySelector('[data-add-to-cart]');
    if (!button) return;
    const label = button.querySelector('[data-add-to-cart-text]') || button;
    if (variant.available) {
      button.removeAttribute('aria-disabled');
      button.removeAttribute('disabled');
      label.textContent = this.dataset.addText || 'Add to cart';
    } else {
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('disabled', '');
      label.textContent = this.dataset.soldOutText || 'Sold out';
    }
  }

  setUnavailable() {
    const button = this.section?.querySelector('[data-add-to-cart]');
    if (!button) return;
    button.setAttribute('aria-disabled', 'true');
    button.setAttribute('disabled', '');
    (button.querySelector('[data-add-to-cart-text]') || button).textContent = this.dataset.unavailableText || 'Unavailable';
  }

  /* Price follows the variant, or the selected selling plan's allocation when one is chosen. */
  updatePrice(variant) {
    const el = this.section?.querySelector('[data-price]');
    if (!el || !window.Shopify?.formatMoney) return;
    const fmt = (cents) => window.Shopify.formatMoney(cents, this.dataset.moneyFormat || '{{amount}}');
    const planId = Number(this.section?.querySelector('[name="selling_plan"]:checked')?.value || 0);
    const allocation = planId ? variant.selling_plan_allocations?.find((a) => a.selling_plan_id === planId) : null;
    const price = allocation ? allocation.price : variant.price;
    const compareAt = allocation ? allocation.compare_at_price : variant.compare_at_price;
    const onSale = compareAt && compareAt > price;
    el.classList.toggle('price--sale', !!onSale);
    el.querySelector('.price__current').textContent = fmt(price);
    const compare = el.querySelector('.price__compare');
    if (compare) { compare.textContent = onSale ? fmt(compareAt) : ''; compare.hidden = !onSale; }
    this.updatePlanPrices(variant, fmt);
  }

  /* Each purchase option shows its own price for the current variant. */
  updatePlanPrices(variant, fmt) {
    this.section?.querySelectorAll('[data-purchase-options] input[name="selling_plan"]').forEach((input) => {
      const priceEl = input.closest('label')?.querySelector('.purchase-options__price');
      if (!priceEl) return;
      if (!input.value) { priceEl.textContent = fmt(variant.price); return; }
      const allocation = variant.selling_plan_allocations?.find((a) => a.selling_plan_id === Number(input.value));
      input.disabled = !allocation;
      if (allocation) priceEl.textContent = fmt(allocation.price);
    });
  }

  updateUrl(variant) {
    if (!window.history?.replaceState || this.closest('dialog')) return;
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);
  }

  updateMedia(variant) {
    if (!variant.featured_media) return;
    const target = this.section?.querySelector(`[data-media-id="${variant.featured_media.id}"]`);
    target?.scrollIntoView({ block: 'nearest', inline: 'start', behavior: 'instant' });
  }
}
if (!customElements.get('variant-picker')) customElements.define('variant-picker', VariantPicker);

/* Tiny money formatter so the picker has no dependency on a global theme bundle. */
window.Shopify = window.Shopify || {};
window.Shopify.formatMoney ||= function (cents, format) {
  const value = (cents / 100).toFixed(2);
  const [whole, frac] = value.split('.');
  const withSep = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const map = {
    amount: `${withSep}.${frac}`,
    amount_no_decimals: withSep,
    amount_with_comma_separator: `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${frac}`,
    amount_no_decimals_with_comma_separator: whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
  };
  return format.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => map[key] ?? map.amount);
};
}
