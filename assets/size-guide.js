/**
 * <size-guide-modal> Web Component
 * Manages size guide dialog and unit toggle (cm vs inches)
 */
{
class SizeGuideModal extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector('dialog');
    this.openBtn = this.querySelector('[data-size-guide-trigger]');
    this.closeBtn = this.querySelector('[data-size-guide-close]');
    this.unitRadios = this.querySelectorAll('input[name="size-guide-unit"]');

    this.openBtn?.addEventListener('click', () => this.dialog?.showModal());
    this.closeBtn?.addEventListener('click', () => this.dialog?.close());
    this.dialog?.addEventListener('click', (e) => {
      if (e.target === this.dialog) this.dialog.close();
    });

    this.unitRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.dataset.unit = e.target.value;
      });
    });
  }
}

if (!customElements.get('size-guide-modal')) customElements.define('size-guide-modal', SizeGuideModal);
}
