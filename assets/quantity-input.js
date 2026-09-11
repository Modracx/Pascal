/** <quantity-input> — plus/minus buttons around a native number input. Input works without JS.
 *  Honours the input's min, max and step, which the product form sets from the variant's quantity rule. */
{
class QuantityInput extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input');
    this.querySelectorAll('button').forEach((b) => b.addEventListener('click', (e) => {
      e.preventDefault();
      const dir = b.dataset.step === 'down' ? -1 : 1;
      const min = this.input.min === '' ? 1 : Number(this.input.min);
      const max = this.input.max === '' ? Infinity : Number(this.input.max);
      const step = Number(this.input.step) || 1;
      const current = Number(this.input.value || min);
      const next = Math.min(max, Math.max(min, current + dir * step));
      this.input.value = next;
      this.input.dispatchEvent(new Event('change', { bubbles: true }));
    }));
    this.input.addEventListener('change', () => this.clamp());
  }
  clamp() {
    const min = this.input.min === '' ? 1 : Number(this.input.min);
    const max = this.input.max === '' ? Infinity : Number(this.input.max);
    const step = Number(this.input.step) || 1;
    let v = Number(this.input.value);
    if (!Number.isFinite(v)) v = min;
    v = Math.min(max, Math.max(min, v));
    v = min + Math.round((v - min) / step) * step;
    if (String(v) !== this.input.value) this.input.value = v;
  }
}
if (!customElements.get('quantity-input')) customElements.define('quantity-input', QuantityInput);
}
