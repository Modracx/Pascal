/**
 * <gift-card-recipient> — keeps the recipient fields out of the request until the customer
 * chooses to send the card as a gift, and records the browser's timezone offset for "Send on".
 * Without JS the fields still submit; Shopify ignores them when the checkbox is unchecked.
 */
{
class GiftCardRecipient extends HTMLElement {
  connectedCallback() {
    this.toggle = this.querySelector('[data-recipient-toggle]');
    this.fields = this.querySelectorAll('[data-recipient-field]');
    const offset = this.querySelector('[data-recipient-offset]');
    if (offset) offset.value = new Date().getTimezoneOffset().toString();
    const date = this.querySelector('[data-recipient-date]');
    if (date) {
      const today = new Date(); const max = new Date(); max.setDate(max.getDate() + 90);
      const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      date.min = iso(today); date.max = iso(max);
    }
    this.toggle?.addEventListener('change', () => this.sync());
    this.sync();
  }
  sync() {
    const on = this.toggle?.checked;
    this.fields.forEach((f) => { f.disabled = !on; });
    const email = this.querySelector('[type="email"]'); if (email) email.required = !!on;
    this.toggleAttribute('data-open', !!on);
  }
}
if (!customElements.get('gift-card-recipient')) customElements.define('gift-card-recipient', GiftCardRecipient);
}
