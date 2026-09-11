/**
 * <cart-items> — the line item list, shared by the drawer and the cart page.
 * Quantity changes and removals post to the cart, then the section is refetched and the list is
 * morphed rather than replaced: removed lines collapse, new lines slide in, changed totals pulse.
 * Summary blocks marked [data-cart-summary] inside the nearest [data-cart-root] are swapped with a fade.
 * Without JS the cart page form and the remove links still work.
 */
{
class CartItems extends HTMLElement {
  connectedCallback() {
    this.root = window.Shopify?.routes?.root || '/';
    // Lines are addressed by their key, never by position: positions shift after a morph.
    this.addEventListener('change', (e) => {
      const qty = e.target.closest('[data-line-qty]');
      if (qty) this.change(qty.closest('.cart-item'), qty.value);
    });
    this.addEventListener('click', (e) => {
      const remove = e.target.closest('[data-line-remove]');
      if (!remove) return;
      e.preventDefault();
      this.change(remove.closest('.cart-item'), 0);
    });
  }

  static motionMs(el) {
    const v = getComputedStyle(el).getPropertyValue('--motion-normal').trim();
    return v.endsWith('ms') ? parseFloat(v) : v.endsWith('s') ? parseFloat(v) * 1000 : 280;
  }

  /* Collapse a line item in place; resolves when the transition ends. */
  static collapse(item) {
    const ms = CartItems.motionMs(item);
    if (!ms) { item.remove(); return Promise.resolve(); }
    item.style.height = `${item.offsetHeight}px`;
    item.getBoundingClientRect();
    item.classList.add('is-removing');
    return new Promise((r) => setTimeout(() => { item.remove(); r(); }, ms + 40));
  }

  /* Bring `list` in line with `fresh`: same order, keyed by line item key. */
  static async morph(list, fresh) {
    const old = new Map([...list.querySelectorAll('.cart-item')].map((el) => [el.dataset.key, el]));
    const next = [...fresh.querySelectorAll('.cart-item')];
    const nextKeys = new Set(next.map((el) => el.dataset.key));
    await Promise.all([...old].filter(([k]) => !nextKeys.has(k)).map(([, el]) => CartItems.collapse(el)));
    let cursor = list.firstElementChild;
    next.forEach((el) => {
      const existing = old.get(el.dataset.key);
      if (!existing) {
        el.classList.add('is-entering');
        list.insertBefore(el, cursor);
        return;
      }
      if (existing !== cursor) list.insertBefore(existing, cursor); else cursor = cursor.nextElementSibling;
      if (existing.dataset.quantity !== el.dataset.quantity) {
        existing.replaceWith(el);
        el.querySelector('.cart-item__total')?.classList.add('is-bumped');
        el.querySelector('.quantity__input')?.focus({ preventScroll: true });
      }
    });
    // anything left over that the fresh list no longer has (defensive)
    list.querySelectorAll('.cart-item').forEach((el) => { if (!nextKeys.has(el.dataset.key)) el.remove(); });
  }

  static swapSummary(root, freshRoot) {
    root.querySelectorAll('[data-cart-summary]').forEach((el) => {
      const fresh = freshRoot.querySelector(`[data-cart-summary="${el.dataset.cartSummary}"]`);
      if (!fresh) return;
      el.replaceWith(fresh);
      fresh.querySelector('.cart__subtotal > :last-child')?.classList.add('is-bumped');
    });
  }

  static updateCount(count) {
    if (count === undefined) return;
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      const changed = el.dataset.cartCount !== String(count);
      (el.querySelector('.header__count-text') || el).textContent = count;
      el.dataset.cartCount = count;
      if (changed) { el.classList.remove('is-bumped'); el.getBoundingClientRect(); el.classList.add('is-bumped'); }
    });
  }

  async change(item, quantity) {
    if (!item?.dataset.key) return;
    this.setAttribute('aria-busy', 'true');
    const request = fetch(`${this.root}cart/change.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: item.dataset.key, quantity: Number(quantity) }),
    });
    const leaving = Number(quantity) === 0 && item ? CartItems.collapse(item) : Promise.resolve();
    try {
      await request;
      await this.refresh();
    } finally {
      await leaving;
      this.removeAttribute('aria-busy');
    }
  }

  /* Refetch this section and morph the list; the drawer or page swaps its own summary. */
  async refresh() {
    const res = await fetch(`${this.root}?sections=${this.dataset.sectionId}`, { headers: { Accept: 'application/json' } });
    const json = await res.json();
    const doc = new DOMParser().parseFromString(json[this.dataset.sectionId], 'text/html');
    const freshList = doc.querySelector('cart-items');
    const root = this.closest('[data-cart-root]');
    const freshRoot = doc.querySelector('[data-cart-root]');
    if (freshList) {
      await CartItems.morph(this, freshList);
      this.dataset.itemCount = freshList.dataset.itemCount;
    }
    if (root && freshRoot) CartItems.swapSummary(root, freshRoot);
    CartItems.updateCount(freshList ? freshList.dataset.itemCount : '0');
    this.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: { count: Number(freshList?.dataset.itemCount || 0), doc } }));
  }
}
if (!customElements.get('cart-items')) customElements.define('cart-items', CartItems);
}
