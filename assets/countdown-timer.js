/** <countdown-timer> — counts down to data-end (ISO date). Hides its section when the date passes. */
{
class CountdownTimer extends HTMLElement {
  connectedCallback() {
    this.end = new Date(this.dataset.end).getTime();
    if (Number.isNaN(this.end)) return;
    this.cells = { d: this.querySelector('[data-d]'), h: this.querySelector('[data-h]'), m: this.querySelector('[data-m]'), s: this.querySelector('[data-s]') };
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }
  disconnectedCallback() { clearInterval(this.timer); }
  tick() {
    let diff = Math.max(0, Math.floor((this.end - Date.now()) / 1000));
    if (diff === 0) { clearInterval(this.timer); if (this.dataset.hideWhenDone === 'true') this.closest('.section')?.remove(); }
    const d = Math.floor(diff / 86400); diff -= d * 86400;
    const h = Math.floor(diff / 3600); diff -= h * 3600;
    const m = Math.floor(diff / 60); const s = diff - m * 60;
    const pad = (n) => String(n).padStart(2, '0');
    if (this.cells.d) this.cells.d.textContent = d;
    if (this.cells.h) this.cells.h.textContent = pad(h);
    if (this.cells.m) this.cells.m.textContent = pad(m);
    if (this.cells.s) this.cells.s.textContent = pad(s);
  }
}
if (!customElements.get('countdown-timer')) customElements.define('countdown-timer', CountdownTimer);
}
