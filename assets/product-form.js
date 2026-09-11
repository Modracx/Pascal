/**
 * <product-form> — progressive enhancement for the add-to-cart form.
 * Without JS the form posts to /cart/add and Shopify redirects to the cart page.
 * With JS we submit via fetch, keep the customer on the page and update the cart count.
 */
{
class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    if (!this.form) return;
    this.button = this.form.querySelector('[type="submit"]');
    this.status = this.querySelector('[data-form-status]');
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
  }

  async onSubmit(event) {
    event.preventDefault();
    if (this.button?.getAttribute('aria-disabled') === 'true') return;
    this.setBusy(true);
    try {
      const body = new FormData(this.form);
      const res = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.description || data.message || 'Could not add to cart');
      await this.refreshCartCount();
      this.announce(this.dataset.addedText || 'Added to cart', false);
      this.dispatchEvent(new CustomEvent('cart:added', { bubbles: true, detail: data }));
    } catch (err) {
      this.announce(err.message, true);
    } finally {
      this.setBusy(false);
    }
  }

  async refreshCartCount() {
    const res = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return;
    const cart = await res.json();
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      (el.querySelector('.header__count-text') || el).textContent = cart.item_count;
      el.dataset.cartCount = cart.item_count;
    });
  }

  setBusy(busy) {
    if (!this.button) return;
    this.button.setAttribute('aria-busy', busy ? 'true' : 'false');
    this.button.toggleAttribute('disabled', busy);
  }

  announce(message, isError) {
    if (!this.status) return;
    this.status.textContent = message;
    this.status.hidden = false;
    this.status.classList.toggle('form-status--error', isError);
    clearTimeout(this._t);
    this._t = setTimeout(() => { this.status.hidden = true; }, 4000);
  }
}
if (!customElements.get('product-form')) customElements.define('product-form', ProductForm);
}
