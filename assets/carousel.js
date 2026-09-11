/**
 * <scroll-carousel> — adds previous/next buttons, dot state and optional autoplay to a
 * scroll-snap track. Scrolling and swiping work without this file.
 */
{
class ScrollCarousel extends HTMLElement {
  connectedCallback() {
    this.track = this.querySelector('[data-track]');
    if (!this.track) return;
    this.querySelector('[data-prev]')?.addEventListener('click', () => this.step(-1));
    this.querySelector('[data-next]')?.addEventListener('click', () => this.step(1));
    this.dots = [...this.querySelectorAll('[data-dot]')];
    this.dots.forEach((d, i) => d.addEventListener('click', (e) => { e.preventDefault(); this.go(i); }));
    this.track.addEventListener('scroll', () => { clearTimeout(this._s); this._s = setTimeout(() => this.sync(), 80); }, { passive: true });
    this.sync();
    const delay = Number(this.dataset.autoplay || 0);
    if (delay > 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this._timer = setInterval(() => { if (!this.matches(':hover, :focus-within')) this.step(1, true); }, delay * 1000);
    }
  }
  disconnectedCallback() { clearInterval(this._timer); }
  itemWidth() { const first = this.track.firstElementChild; return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(this.track).columnGap || getComputedStyle(this.track).gap || 0) : this.track.clientWidth; }
  index() { return Math.round(this.track.scrollLeft / this.itemWidth()); }
  count() { return this.track.children.length; }
  step(dir, loop) {
    let next = this.index() + dir;
    if (loop && next >= this.count()) next = 0;
    this.go(Math.max(0, Math.min(this.count() - 1, next)));
  }
  go(i) { this.track.scrollTo({ left: i * this.itemWidth(), behavior: 'smooth' }); }
  sync() {
    const i = this.index();
    const max = this.track.scrollWidth - this.track.clientWidth - 2;
    this.querySelector('[data-prev]')?.toggleAttribute('disabled', this.track.scrollLeft <= 2);
    this.querySelector('[data-next]')?.toggleAttribute('disabled', this.track.scrollLeft >= max);
    this.dots.forEach((d, n) => n === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current'));
  }
}
if (!customElements.get('scroll-carousel')) customElements.define('scroll-carousel', ScrollCarousel);
}
