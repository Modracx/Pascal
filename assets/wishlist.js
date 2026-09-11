/**
 * Wishlist Web Components (Zero-app, localStorage-backed)
 * <wishlist-button data-product-handle="...">
 * <wishlist-count>
 * <wishlist-grid>
 */
{
const STORAGE_KEY = 'pascal_wishlist';

function getWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function setWishlist(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { items } }));
  } catch (e) {}
}

class WishlistButton extends HTMLElement {
  connectedCallback() {
    this.handle = this.dataset.productHandle;
    this.button = this.querySelector('button');
    if (!this.handle || !this.button) return;

    this.updateState();
    this.button.addEventListener('click', this.toggle.bind(this));
    window.addEventListener('wishlist:updated', () => this.updateState());
  }

  updateState() {
    const items = getWishlist();
    const isSaved = items.includes(this.handle);
    this.classList.toggle('is-saved', isSaved);
    this.button.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
    const label = this.button.querySelector('.wishlist-btn__label');
    if (label) {
      label.textContent = isSaved 
        ? (this.dataset.savedText || 'Saved') 
        : (this.dataset.addText || 'Save for later');
    }
  }

  toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    let items = getWishlist();
    if (items.includes(this.handle)) {
      items = items.filter(h => h !== this.handle);
    } else {
      items.push(this.handle);
    }
    setWishlist(items);
  }
}

class WishlistCount extends HTMLElement {
  connectedCallback() {
    this.updateCount();
    window.addEventListener('wishlist:updated', () => this.updateCount());
  }

  updateCount() {
    const items = getWishlist();
    const count = items.length;
    this.textContent = count;
    this.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

class WishlistGrid extends HTMLElement {
  async connectedCallback() {
    const root = window.Shopify?.routes?.root || '/';
    const items = getWishlist();
    const container = this.querySelector('.wishlist-grid__items');
    const empty = this.querySelector('.wishlist-grid__empty');

    if (!items.length) {
      if (empty) empty.style.display = 'block';
      if (container) container.style.display = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';
    if (container) container.style.display = 'grid';

    // Fetch product cards concurrently using the Section Rendering API
    const promises = items.map(async (handle) => {
      try {
        const res = await fetch(`${root}products/${handle}?sections=quick-view`);
        if (!res.ok) return null;
        const data = await res.json();
        const html = data['quick-view'];
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // If quick-view is fetched, we construct or use product card snippet
        const cardRes = await fetch(`${root}products/${handle}?view=card`);
        if (cardRes.ok) {
          const cardHtml = await cardRes.text();
          return cardHtml;
        }
        return null;
      } catch (e) {
        return null;
      }
    });

    const results = await Promise.all(promises);
    const validCards = results.filter(Boolean);

    if (validCards.length && container) {
      container.innerHTML = validCards.join('');
    } else if (container) {
      // Direct fallback fetch per product handle
      const fetches = items.map(handle => 
        fetch(`${root}products/${handle}`)
          .then(r => r.text())
          .then(t => {
            const doc = new DOMParser().parseFromString(t, 'text/html');
            const title = doc.querySelector('h1')?.textContent || handle;
            const img = doc.querySelector('.product-gallery img')?.getAttribute('src') || '';
            const price = doc.querySelector('.price')?.outerHTML || '';
            return `
              <div class="product-card">
                <a href="${root}products/${handle}" class="product-card__media-wrap">
                  ${img ? `<img src="${img}" alt="${title}" loading="lazy">` : ''}
                </a>
                <div class="product-card__info" style="margin-top: var(--space-3)">
                  <h3 class="text-base" style="font-weight: 500;"><a href="${root}products/${handle}">${title}</a></h3>
                  ${price}
                  <button type="button" class="btn btn--secondary btn--small" style="margin-top: var(--space-3); width: 100%;" onclick="localStorage.setItem('${STORAGE_KEY}', JSON.stringify(JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'[]').filter(x=>x!=='${handle}'))); window.location.reload();">Remove</button>
                </div>
              </div>
            `;
          })
          .catch(() => '')
      );
      const htmls = (await Promise.all(fetches)).filter(Boolean);
      if (htmls.length) {
        container.innerHTML = htmls.join('');
      } else if (empty) {
        empty.style.display = 'block';
        container.style.display = 'none';
      }
    }
  }
}

if (!customElements.get('wishlist-button')) customElements.define('wishlist-button', WishlistButton);
if (!customElements.get('wishlist-count')) customElements.define('wishlist-count', WishlistCount);
if (!customElements.get('wishlist-grid')) customElements.define('wishlist-grid', WishlistGrid);
}
