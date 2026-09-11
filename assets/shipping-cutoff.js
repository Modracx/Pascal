/**
 * <shipping-cutoff> Web Component
 * Dynamic countdown for same-day dispatch based on store cutoff hour (e.g. 14 for 2:00 PM).
 */
{
class ShippingCutoff extends HTMLElement {
  connectedCallback() {
    this.cutoffHour = parseInt(this.getAttribute('cutoff-hour') || '14', 10);
    this.timeEl = this.querySelector('[data-cutoff-time]');
    this.update();
    this.timer = setInterval(() => this.update(), 60000);
  }

  disconnectedCallback() {
    if (this.timer) clearInterval(this.timer);
  }

  update() {
    const now = new Date();
    const day = now.getDay();
    // If weekend (0 = Sunday, 6 = Saturday)
    const isWeekend = day === 0 || day === 6;

    const cutoff = new Date(now);
    cutoff.setHours(this.cutoffHour, 0, 0, 0);

    const diff = cutoff.getTime() - now.getTime();

    if (diff <= 0 || isWeekend) {
      this.style.display = 'none';
      return;
    }

    this.style.display = 'flex';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (this.timeEl) {
      this.timeEl.textContent = `${hours}h ${minutes}m`;
    }
  }
}

if (!customElements.get('shipping-cutoff')) customElements.define('shipping-cutoff', ShippingCutoff);
}
