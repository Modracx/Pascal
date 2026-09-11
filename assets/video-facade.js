/** <video-facade> — swaps a poster button for the real embed on click, so nothing loads until asked. */
{
class VideoFacade extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector('button');
    const tpl = this.querySelector('template');
    if (!btn || !tpl) return;
    btn.addEventListener('click', () => {
      this.replaceChildren(tpl.content.cloneNode(true));
      const media = this.querySelector('video, iframe');
      if (media?.tagName === 'VIDEO') media.play();
    });
  }
}
if (!customElements.get('video-facade')) customElements.define('video-facade', VideoFacade);
}
