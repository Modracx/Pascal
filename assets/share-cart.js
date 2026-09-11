/**
 * <share-cart> — Web Component for generating and sharing cart permalinks.
 * Creates a Shopify permalink and copies it to clipboard with an orchestrated
 * pop and toast animation or launches native Web Share API on mobile devices.
 */
{
class ShareCart extends HTMLElement {
  connectedCallback() {
    this.button = this.querySelector('.share-cart__button');
    this.label = this.querySelector('.share-cart__label');
    this.originalText = this.label?.textContent || 'Share cart';
    this.button?.addEventListener('click', this.handleShare.bind(this));
    this.timeoutId = null;
  }

  async getCartItems() {
    try {
      const res = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`, {
        headers: { Accept: 'application/json' }
      });
      return await res.json();
    } catch (e) {
      console.error('Error fetching cart data for sharing:', e);
      return null;
    }
  }

  async handleShare(e) {
    e.preventDefault();
    if (this.getAttribute('aria-busy') === 'true') return;
    this.setAttribute('aria-busy', 'true');

    const cart = await this.getCartItems();
    this.removeAttribute('aria-busy');

    if (!cart || !cart.items || cart.items.length === 0) return;

    const permalinkItems = cart.items
      .map(item => `${item.variant_id}:${item.quantity}`)
      .join(',');

    let shareUrl = `${window.location.origin}${window.Shopify?.routes?.root || '/'}cart/${permalinkItems}`;
    const params = new URLSearchParams();
    if (cart.note) params.set('note', cart.note);
    if (cart.cart_level_discount_applications?.length > 0) {
      const discount = cart.cart_level_discount_applications[0].title;
      if (discount) params.set('discount', discount);
    }
    const queryString = params.toString();
    if (queryString) shareUrl += `?${queryString}`;

    const shareData = {
      title: `${document.title} - Cart`,
      text: this.dataset.shareMessage || 'Check out my shopping cart:',
      url: shareUrl
    };

    if (navigator.share && /mobile|iphone|android|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
        this.triggerAnimation(this.dataset.copiedText || 'Shared!');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') this.fallbackCopy(shareUrl);
      }
    } else {
      this.fallbackCopy(shareUrl);
    }
  }

  async fallbackCopy(url) {
    try {
      await navigator.clipboard.writeText(url);
      this.triggerAnimation(this.dataset.copiedText || 'Link copied!');
    } catch (err) {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      this.triggerAnimation(this.dataset.copiedText || 'Link copied!');
    }
  }

  triggerAnimation(message) {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    if (this.label) this.label.textContent = message;

    // Reset animation state cleanly if triggered repeatedly
    this.classList.remove('is-copied');
    void this.offsetWidth; // Force DOM reflow
    this.classList.add('is-copied');

    this.timeoutId = setTimeout(() => {
      this.classList.remove('is-copied');
      if (this.label) this.label.textContent = this.originalText;
    }, 2600);
  }
}

if (!customElements.get('share-cart')) customElements.define('share-cart', ShareCart);
}
