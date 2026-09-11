/** <product-recommendations> — loads Shopify's recommendations and swaps in the rendered section. */
{
class ProductRecommendations extends HTMLElement {
  connectedCallback() {
    const load = async () => {
      const res = await fetch(this.dataset.url);
      if (!res.ok) return;
      const html = new DOMParser().parseFromString(await res.text(), 'text/html');
      const fresh = html.querySelector('product-recommendations');
      if (fresh && fresh.innerHTML.trim()) this.innerHTML = fresh.innerHTML;
      else this.closest('.section')?.remove();
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: '400px' });
      io.observe(this);
    } else load();
  }
}
if (!customElements.get('product-recommendations')) customElements.define('product-recommendations', ProductRecommendations);
}
