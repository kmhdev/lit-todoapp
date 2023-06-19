import { LitElement, html } from 'lit';
import styles from './GftLoader-styles.js';

export class Loader extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define('gft-loader', Loader);
