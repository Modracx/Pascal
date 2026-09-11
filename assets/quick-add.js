/**
 * <quick-add-modal> — opens a product's purchase form in a <dialog> without leaving the page.
 * Markup comes from the quick-add section (or quick-view, for [data-quick-view] triggers)
 * through the Section Rendering API. Without JS the trigger is a plain link to the product page.
 */
{
class QuickAddModal extends HTMLElement {
  connectedCallback() {
    this.dialog = this.querySelector('dialog');
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-quick-add], [data-quick-view]');
      if (!trigger) return;
      e.preventDefault();
      this.open(trigger.getAttribute('href'), trigger.hasAttribute('data-quick-view') ? 'quick-view' : 'quick-add');
    });
    this.addEventListener('click', (e) => {
      if (e.target.closest('[data-quick-add-close]') || e.target === this.dialog) this.close();
    });
    document.addEventListener('cart:added', (e) => { if (this.dialog.open && this.contains(e.target)) setTimeout(() => this.close(), 250); });
  }

  async open(href, sectionId = 'quick-add') {
    const url = new URL(href, window.location.origin);
    url.searchParams.set('section_id', sectionId);
    this.dialog.innerHTML = '<div class="quick-add__spinner" aria-hidden="true"></div>';
    this.dialog.setAttribute('aria-busy', 'true');
    if (!this.dialog.open) this.dialog.showModal();
    try {
      const res = await fetch(url, { headers: { Accept: 'text/html' } });
      if (!res.ok) throw new Error(res.statusText);
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      await this.loadAssets(doc);
      const content = doc.querySelector('.quick-add__content');
      if (!content) throw new Error('No content');
      this.dialog.innerHTML = '';
      this.dialog.appendChild(content);
      this.dialog.removeAttribute('aria-busy');
      this.dialog.querySelector('[data-add-to-cart]')?.focus({ preventScroll: true });
    } catch (err) {
      console.error('[quick-add]', err);
      this.dialog.removeAttribute('aria-busy');
      this.dialog.innerHTML = `<div class="quick-add__content quick-add__content--error"><button type="button" class="ctrl quick-add__close" data-quick-add-close aria-label="Close">&times;</button><p>${this.dataset.errorText || 'Something went wrong.'} <a class="link" href="${href}">${this.dataset.errorLink || 'Open the product page'}</a></p></div>`;
    }
  }

  /* Bring in the section's stylesheets and scripts once; custom elements upgrade on their own. */
  loadAssets(doc) {
    const pending = [];
    doc.querySelectorAll('link[rel="stylesheet"][href]').forEach((link) => {
      if (document.querySelector(`link[href="${link.getAttribute('href')}"]`)) return;
      const el = document.createElement('link');
      el.rel = 'stylesheet'; el.href = link.getAttribute('href');
      pending.push(new Promise((r) => { el.onload = el.onerror = r; }));
      document.head.appendChild(el);
    });
    doc.querySelectorAll('script[src]').forEach((script) => {
      if (document.querySelector(`script[src="${script.getAttribute('src')}"]`)) return;
      const el = document.createElement('script');
      el.src = script.getAttribute('src');
      pending.push(new Promise((r) => { el.onload = el.onerror = r; }));
      document.head.appendChild(el);
    });
    return Promise.all(pending);
  }

  close() { if (this.dialog.open) this.dialog.close(); }
}
if (!customElements.get('quick-add-modal')) customElements.define('quick-add-modal', QuickAddModal);
}
