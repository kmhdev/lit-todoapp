import { LitElement, html } from 'lit';
import '../gft-checkbox/GftCheckbox.js';

export class GftNote extends LitElement {
  static get properties() {
    return {
      content: {
        Type: String,
      },
      identifier: {
        Type: Number,
      },
      checked: {
        Type: Boolean,
      },
    };
  }

  handleChange(e) {
    this.checked = e.detail.checked;
    const options = {
      detail: { checked: this.checked, id: this.identifier },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('gft-note-selection-change', options));
  }

  render() {
    return html`
      <p>
        <gft-checkbox
          .identifier=${this.identifier}
          .checked=${this.checked}
          @gft-checkbox-change=${this.handleChange}
        ></gft-checkbox>
        ${this.content}
      </p>
    `;
  }
}

customElements.define('gft-note', GftNote);
