/**
 * <bundle-builder> Web Component
 * Multi-product bundle selector that adds selected variants to cart in one batch.
 */
{
class BundleBuilder extends HTMLElement {
  connectedCallback() {
    this.root = window.Shopify?.routes?.root || '/';
    this.items = this.querySelectorAll('.bundle-item');
    this.button = this.querySelector('[data-bundle-submit]');
    this.totalPriceEl = this.querySelector('[data-bundle-total]');

    this.addEventListener('change', () => this.updateTotal());
    this.button?.addEventListener('click', this.handleSubmit.bind(this));
    this.updateTotal();
  }

  getSelectedItems() {
    const selected = [];
    this.items.forEach(item => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        const variantSelect = item.querySelector('select[name="id"]');
        const variantId = variantSelect ? variantSelect.value : item.dataset.variantId;
        const price = parseFloat(variantSelect?.selectedOptions[0]?.dataset.price || item.dataset.price || 0);
        if (variantId) {
          selected.push({ id: parseInt(variantId, 10), quantity: 1, price });
        }
      }
    });
    return selected;
  }

  updateTotal() {
    const selected = this.getSelectedItems();
    const sum = selected.reduce((acc, curr) => acc + curr.price, 0);
    if (this.totalPriceEl) {
      this.totalPriceEl.textContent = `${(sum / 100).toFixed(2)}`;
    }
    if (this.button) {
      this.button.disabled = selected.length === 0;
      const countEl = this.button.querySelector('[data-bundle-count]');
      if (countEl) countEl.textContent = selected.length;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const selected = this.getSelectedItems();
    if (!selected.length) return;

    this.button.setAttribute('aria-busy', 'true');
    this.button.disabled = true;

    try {
      const res = await fetch(`${this.root}cart/add.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: selected.map(s => ({ id: s.id, quantity: s.quantity })) })
      });

      if (res.ok) {
        const cartRes = await fetch(`${this.root}cart.js`);
        const cart = await cartRes.json();
        document.querySelectorAll('[data-cart-count]').forEach(el => {
          (el.querySelector('.header__count-text') || el).textContent = cart.item_count;
          el.dataset.cartCount = cart.item_count;
        });

        // Trigger cart drawer if available
        const drawer = document.querySelector('cart-drawer');
        if (drawer) {
          const res = await fetch(`${this.root}?sections=${drawer.dataset.sectionId}`);
          const json = await res.json();
          const doc = new DOMParser().parseFromString(json[drawer.dataset.sectionId], 'text/html');
          const root = drawer.querySelector('[data-cart-root]');
          const fresh = doc.querySelector('[data-cart-root]');
          if (root && fresh) root.replaceWith(fresh);
          drawer.querySelector('dialog')?.showModal();
        } else {
          window.location.href = `${this.root}cart`;
        }
      }
    } catch (err) {
      console.error('Failed to add bundle to cart:', err);
    } finally {
      this.button.removeAttribute('aria-busy');
      this.button.disabled = false;
    }
  }
}

if (!customElements.get('bundle-builder')) customElements.define('bundle-builder', BundleBuilder);
}
