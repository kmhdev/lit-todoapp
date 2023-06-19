import { LitElement, html } from 'lit';

export class GftInput extends LitElement {
  static get properties() {
    return {
      placeholder: {
        Type: String,
      },
      value: {
        Type: String,
      },
    };
  }

  constructor() {
    super();
    this.value = '';
  }

  handleChange(text) {
    const options = {
      detail: text.target.value,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('gft-input-change', options));
  }

  render() {
    return html`
            <input @input=${this.handleChange} placeholder="${this.placeholder}" .value=${this.value}></input>
        `;
  }
}

customElements.define('gft-input', GftInput);
