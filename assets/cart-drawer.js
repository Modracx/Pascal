/**
 * <cart-drawer> — native <dialog> that re-renders itself through the Section Rendering API.
 * Opens on cart:added and when the header cart link is clicked. Without JS the link goes to /cart.
 * Opening and closing are transitions; line items are morphed by <cart-items> so additions slide in.
 */
{
class CartDrawer extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector('dialog');
    this.root = window.Shopify?.routes?.root || '/';
    document.addEventListener('cart:added', () => this.refresh(true));
    document.querySelectorAll('[data-cart-drawer-trigger]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); this.open(); }));
    this.addEventListener('click', (e) => { if (e.target.closest('[data-cart-close]') || e.target === this.dialog) this.close(); });
    this.dialog.addEventListener('cancel', (e) => { e.preventDefault(); this.close(); });
    this.addEventListener('cart:updated', (e) => { if (e.detail.count === 0) this.render(e.detail.doc); });
  }

  open() {
    if (this.dialog.open) return;
    this.dialog.removeAttribute('data-closing');
    this.dialog.showModal();
    this.dialog.querySelector('[data-cart-close]')?.focus({ preventScroll: true });
  }

  close() {
    if (!this.dialog.open || this.dialog.hasAttribute('data-closing')) return;
    const ms = parseFloat(getComputedStyle(this.dialog).getPropertyValue('--motion-normal')) || 0;
    this.dialog.setAttribute('data-closing', '');
    setTimeout(() => { this.dialog.close(); this.dialog.removeAttribute('data-closing'); }, ms ? ms + 40 : 0);
  }

  setBusy(busy) { this.toggleAttribute('aria-busy', busy); }

  async refresh(open) {
    this.setBusy(true);
    const res = await fetch(`${this.root}?sections=${this.dataset.sectionId}`, { headers: { Accept: 'application/json' } });
    const json = await res.json();
    const doc = new DOMParser().parseFromString(json[this.dataset.sectionId], 'text/html');
    const Items = customElements.get('cart-items');
    const list = this.querySelector('cart-items');
    const freshList = doc.querySelector('cart-items');
    if (open) this.open();
    if (list && freshList && Items) {
      await Items.morph(list, freshList);
      list.dataset.itemCount = freshList.dataset.itemCount;
      Items.swapSummary(this.dialog, doc);
      Items.updateCount(freshList.dataset.itemCount);
    } else {
      this.render(doc);
    }
    this.setBusy(false);
  }

  /* Empty ↔ filled: replace the whole body and let it fade in. */
  render(doc) {
    const fresh = doc.querySelector('cart-drawer dialog');
    if (!fresh) return;
    this.dialog.innerHTML = fresh.innerHTML;
    this.dialog.querySelector('.cart-drawer__body')?.classList.add('is-entering');
    customElements.get('cart-items')?.updateCount(doc.querySelector('[data-drawer-count]')?.dataset.drawerCount);
  }
}
if (!customElements.get('cart-drawer')) customElements.define('cart-drawer', CartDrawer);
}
