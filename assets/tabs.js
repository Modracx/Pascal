/** <tab-group> — upgrades stacked panels into keyboard-accessible tabs. */
{
class TabGroup extends HTMLElement {
  connectedCallback() {
    this.tabs = [...this.querySelectorAll('[role="tab"]')];
    this.panels = [...this.querySelectorAll('[role="tabpanel"]')];
    if (!this.tabs.length) return;
    this.tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => this.select(i));
      tab.addEventListener('keydown', (e) => {
        const map = { ArrowRight: 1, ArrowLeft: -1, Home: -Infinity, End: Infinity };
        if (!(e.key in map)) return;
        e.preventDefault();
        let n = map[e.key] === -Infinity ? 0 : map[e.key] === Infinity ? this.tabs.length - 1 : (i + map[e.key] + this.tabs.length) % this.tabs.length;
        this.select(n); this.tabs[n].focus();
      });
    });
    const fromHash = this.panels.findIndex((p) => p.id && location.hash === `#${p.id}`);
    this.select(fromHash >= 0 ? fromHash : 0);
    this.dataset.ready = 'true';
  }
  select(i) {
    this.tabs.forEach((t, n) => { t.setAttribute('aria-selected', n === i); t.tabIndex = n === i ? 0 : -1; });
    this.panels.forEach((p, n) => { p.hidden = n !== i; });
  }
}
if (!customElements.get('tab-group')) customElements.define('tab-group', TabGroup);
}
