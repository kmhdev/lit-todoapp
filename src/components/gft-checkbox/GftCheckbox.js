import { LitElement, html } from 'lit';

export class GftCheckbox extends LitElement {
  static get properties() {
    return {
      identifier: {
        Type: Number,
      },
      checked: {
        Type: Boolean,
        Reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.checked = false;
  }

  checkChange(trg) {
    this.checked = trg.checked;
    const options = {
      detail: this.checked,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('gft-checkbox-change', options));
  }

  render() {
    return html`
      <input id="${this.identifier}" type="checkbox" @change=${e =>
      this.checkChange(e.target)} ?checked=${this.checked}></input>
    `;
  }
}

customElements.define('gft-checkbox', GftCheckbox);
