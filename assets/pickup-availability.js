/**
 * <pickup-availability> — follows the variant picker. On `variant:change` it fetches the
 * pickup-availability section for that variant and swaps the markup in place.
 * Without JS the server-rendered availability for the initial variant stays.
 */
{
class PickupAvailability extends HTMLElement {
  connectedCallback() {
    this.scope = this.closest('[data-section]') || document;
    this.onChange = (e) => this.refresh(e.detail?.variant?.id);
    this.scope.addEventListener('variant:change', this.onChange);
  }

  disconnectedCallback() {
    this.scope?.removeEventListener('variant:change', this.onChange);
    this.controller?.abort();
  }

  async refresh(variantId) {
    if (!variantId || !this.dataset.url) return;
    this.controller?.abort();
    this.controller = new AbortController();
    const url = new URL(this.dataset.url, window.location.origin);
    url.searchParams.set('section_id', 'pickup-availability');
    url.searchParams.set('variant', variantId);
    this.setAttribute('aria-busy', 'true');
    try {
      const res = await fetch(url, { headers: { Accept: 'text/html' }, signal: this.controller.signal });
      if (!res.ok) throw new Error(res.statusText);
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      const next = doc.querySelector('[data-pickup]');
      this.replaceChildren(...(next ? [next] : []));
    } catch (err) {
      if (err.name !== 'AbortError') console.warn('[pickup-availability]', err);
    } finally {
      this.removeAttribute('aria-busy');
    }
  }
}
if (!customElements.get('pickup-availability')) customElements.define('pickup-availability', PickupAvailability);
}
