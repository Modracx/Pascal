/**
 * <before-after-slider> Web Component
 * Interactive before/after image comparison with input range controller.
 */
{
class BeforeAfterSlider extends HTMLElement {
  connectedCallback() {
    this.range = this.querySelector('input[type="range"]');
    this.overlay = this.querySelector('.before-after__overlay');
    this.handle = this.querySelector('.before-after__handle');

    this.range?.addEventListener('input', (e) => {
      const val = e.target.value;
      this.style.setProperty('--position', `${val}%`);
    });
  }
}

if (!customElements.get('before-after-slider')) customElements.define('before-after-slider', BeforeAfterSlider);
}
