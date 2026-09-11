/**
 * <recently-viewed> — remembers product handles in localStorage and renders them through
 * the search endpoint with the Section Rendering API. Nothing is sent anywhere else.
 */
{
const RV_KEY = 'pascal:recently-viewed';
const readRV = () => { try { return JSON.parse(localStorage.getItem(RV_KEY) || '[]'); } catch { return []; } };
class RecentlyViewed extends HTMLElement {
  connectedCallback() {
    const current = this.dataset.currentHandle;
    let handles = readRV();
    if (current) {
      handles = [current, ...handles.filter((h) => h !== current)].slice(0, 12);
      try { localStorage.setItem(RV_KEY, JSON.stringify(handles)); } catch {}
      handles = handles.filter((h) => h !== current);
    }
    handles = handles.slice(0, Number(this.dataset.limit || 4));
    if (!handles.length) { this.closest('.section')?.remove(); return; }
    const q = handles.map((h) => `handle:${h}`).join(' OR ');
    const root = window.Shopify?.routes?.root || '/';
    fetch(`${root}search?section_id=${this.dataset.sectionId}&type=product&q=${encodeURIComponent(q)}`)
      .then((r) => r.text())
      .then((text) => {
        const html = new DOMParser().parseFromString(text, 'text/html');
        const fresh = html.querySelector('recently-viewed');
        if (fresh && fresh.innerHTML.trim()) this.innerHTML = fresh.innerHTML;
        else this.closest('.section')?.remove();
      });
  }
}
if (!customElements.get('recently-viewed')) customElements.define('recently-viewed', RecentlyViewed);
}
