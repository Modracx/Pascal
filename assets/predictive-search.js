/** <predictive-search> — enhances the search form with live results from the Section Rendering API. */
{
class PredictiveSearch extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input[type="search"]');
    this.results = this.querySelector('[data-predictive-results]');
    if (!this.input || !this.results) return;
    this.root = window.Shopify?.routes?.root || '/';
    this.input.addEventListener('input', () => this.debounce());
    this.input.addEventListener('focus', () => { if (this.results.innerHTML.trim()) this.results.hidden = false; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.results.hidden = true; });
    document.addEventListener('click', (e) => { if (!this.contains(e.target)) this.results.hidden = true; });
  }
  debounce() {
    clearTimeout(this._t);
    this._t = setTimeout(() => this.search(), 250);
  }
  async search() {
    const q = this.input.value.trim();
    if (q.length < 2) { this.results.hidden = true; this.results.innerHTML = ''; return; }
    const url = `${this.root}search/suggest?q=${encodeURIComponent(q)}&section_id=predictive-search&resources[type]=${this.dataset.types || 'product,collection,article,page'}&resources[limit]=${this.dataset.limit || 6}&resources[options][unavailable_products]=last`;
    const res = await fetch(url);
    if (!res.ok) return;
    const html = new DOMParser().parseFromString(await res.text(), 'text/html');
    const inner = html.querySelector('[data-predictive-inner]');
    this.results.innerHTML = inner ? inner.innerHTML : '';
    this.results.hidden = !this.results.innerHTML.trim();
  }
}
if (!customElements.get('predictive-search')) customElements.define('predictive-search', PredictiveSearch);
}
