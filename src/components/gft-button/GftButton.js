import { LitElement, html } from 'lit';

export class GftButton extends LitElement {
  static get properties() {
    return {
      text: {
        Type: String,
      },
      isDisabled: {
        Type: Boolean,
      },
    };
  }

  buttonClick(trg) {
    const options = {
      detail: trg,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('gft-button-click', options));
  }

  render() {
    return html`
      <button
        ?disabled=${this.isDisabled}
        @click=${e => this.buttonClick(e.target)}
      >
        ${this.text}
      </button>
    `;
  }
}

customElements.define('gft-button', GftButton);
