import html from '../index.js!../assets/asset.html';

const template = document.createElement('template');

template.innerHTML = html;

class TopBanner extends HTMLElement {
    constructor () {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('top-banner', TopBanner);