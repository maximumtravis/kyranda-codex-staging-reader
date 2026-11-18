(() => {
  'use strict';
  const READER_URL = 'https://maximumtravis.github.io/kyranda-codex-staging-reader/phase2-review-799/wix-height-host.html';
  const TRUSTED_ORIGIN = 'https://maximumtravis.github.io';
  const TAG = 'kyranda-phase2-fictional-height-host';
  class FictionalHeightHost extends HTMLElement {
    constructor() { super(); this.attachShadow({mode:'open'}); this.receive = this.receive.bind(this); }
    connectedCallback() {
      if (this.frame) return;
      this.style.display = 'block';
      this.style.width = '100%';
      this.style.height = '600px';
      const frame = document.createElement('iframe');
      frame.title = 'Fictional Kyranda Codex integration reader';
      frame.referrerPolicy = 'no-referrer';
      frame.style.cssText = 'display:block;border:0;width:100%;height:600px;overflow:hidden';
      frame.setAttribute('scrolling', 'no');
      this.frame = frame;
      this.shadowRoot.appendChild(frame);
      window.addEventListener('message', this.receive);
      frame.src = READER_URL;
    }
    disconnectedCallback() {
      window.removeEventListener('message', this.receive);
      this.shadowRoot.replaceChildren();
      this.frame = null;
    }
    receive(event) {
      if (!this.frame || event.source !== this.frame.contentWindow ||
          event.origin !== TRUSTED_ORIGIN) return;
      const m = event.data;
      if (!m || m.type !== 'kyranda-phase2-height' || m.version !== 1 ||
          !Number.isSafeInteger(m.height) || m.height < 1 || m.height > 200000 ||
          !Number.isSafeInteger(m.width) || m.width < 1 ||
          Math.abs(m.width - this.frame.clientWidth) > 2) return;
      this.frame.style.height = m.height + 'px';
      this.style.height = m.height + 'px';
      this.setAttribute('data-phase2-height', String(m.height));
    }
  }
  if (!customElements.get(TAG)) customElements.define(TAG, FictionalHeightHost);
})();