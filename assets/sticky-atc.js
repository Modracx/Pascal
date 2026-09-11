/** <sticky-atc> — shows a compact bar once the main add-to-cart button leaves the viewport. */
{
class StickyAtc extends HTMLElement {
  connectedCallback() {
    const target = document.querySelector(this.dataset.watch);
    if (!target || !('IntersectionObserver' in window)) return;
    new IntersectionObserver((entries) => { this.hidden = entries[0].isIntersecting; }, { threshold: 0 }).observe(target);
  }
}
if (!customElements.get('sticky-atc')) customElements.define('sticky-atc', StickyAtc);
}
