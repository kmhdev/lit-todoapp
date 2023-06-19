import { LitElement, html } from 'lit';
import styles from './todo-list-lit-styles.js';
import './components/gft-notes-data-manager/GftNotesDataManager.js';
import './components/gft-button/GftButton.js';
import './components/gft-input/GftInput.js';
import './components/gft-note/GftNote.js';
import './components/gft-loader/GftLoader.js';

class TodoListLit extends LitElement {
  static get properties() {
    return {
      loading: {
        Type: Boolean,
      },
      maxItems: {
        Type: Number,
      },
      inputValue: {
        Type: String,
      },
      notesData: {
        Type: Array,
      },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.loading = false;
    this.maxItems = 5;
    this.inputValue = '';
    this.notesData = [];
  }

  firstUpdated(props) {
    super.firstUpdated(props);
    if (this.shadowRoot.querySelector('gft-notes-data-manager')) {
      this.shadowRoot.querySelector('gft-notes-data-manager').getData();
    }
  }

  addNote() {
    this.notesData = [
      ...this.notesData,
      {
        id: Date.now(),
        title: this.inputValue,
        checked: false,
      },
    ];
    this.inputValue = '';
  }

  deleteSelected() {
    this.notesData = this.notesData.filter(note => !note.checked);

    /* eslint-disable */
    // Ugly hack to clear checkboxes -- looking for proper workaround
    this.shadowRoot.querySelectorAll('gft-note').forEach(element => {
      element.shadowRoot
        .querySelector('gft-checkbox')
        .shadowRoot.querySelector('input').checked = false;
    });
    /* eslint-enable */
  }

  notesAdder() {
    return html`
      <gft-input
        placeholder="Escribe tu nota"
        @gft-input-change=${e => {
          this.inputValue = e.detail;
        }}
        id="addNotes"
        .value=${this.inputValue}
      ></gft-input
      ><gft-button
        id="addNotesButton"
        .isDisabled=${this.inputValue.length < 1}
        text="Añadir nota"
        @gft-button-click=${this.addNote}
      ></gft-button>
    `;
  }

  getNotes() {
    return html`
      <gft-loader></gft-loader>
      <gft-notes-data-manager
        .maxItems=${this.maxItems}
        @gft-notes-data-manager-success=${this.handleLoad}
      ></gft-notes-data-manager>
    `;
  }

  notesContent() {
    return html`
      <div id="container">
        ${this.notesData.length < 1
          ? html` <p>No hay notas</p> `
          : html` ${this.notesData.map(
              note =>
                html` <gft-note
                  .identifier=${note.id}
                  .content="${note.title}"
                  .checked=${note.checked}
                  @gft-note-selection-change=${this.handleNoteChange}
                ></gft-note>`
            )}`}
      </div>
      <gft-button
        id="deleteNotesButton"
        text="Eliminar seleccionados"
        .isDisabled=${this.notesData.every(note => note.checked === false)}
        @gft-button-click=${this.deleteSelected}
      ></gft-button>
    `;
  }

  handleLoad(payload) {
    this.loading = true;
    this.notesData = payload.detail.data;
  }

  handleNoteChange(e) {
    const found = this.notesData.find(note => note.id === e.detail.id);
    found.checked = !found.checked;
    this.notesData = [...this.notesData];
  }

  render() {
    return html`
      <main>
        ${this.notesAdder()}
        ${!this.loading ? this.getNotes() : this.notesContent()}
      </main>
    `;
  }
}

customElements.define('todo-list-lit', TodoListLit);
