import { LitElement } from 'lit';

export class GftNotesDataManager extends LitElement {
  static get properties() {
    return {
      maxItems: {
        type: Number,
      },
    };
  }

  async getData() {
    await fetch(
      `https://jsonplaceholder.typicode.com/todos?_delay=1000&_=${Date.now()}&_start=0&_end=${
        this.maxItems
      }`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return true; // obligado por linter, falta try-catch por si fallase
      })
      .then(jsonResponse => {
        this.sendData(jsonResponse);
      });
    /*
        JSONPlaceholder ofrece un método propio para delimitar desde/hasta dónde devuelve los resultados:
        https://github.com/typicode/json-server#paginate

        Alternativamente, puedes alterar la response sin limitar con //jsonResponse = jsonResponse.slice(0, this.maxItems) y tendrás el mismo resultado
        */
  }

  async sendData(res) {
    const data = res.map(i => {
      i.checked = false; // eslint-disable-line
      return i;
    });

    const options = {
      detail: { data },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(
      new CustomEvent('gft-notes-data-manager-success', options)
    );
  }
}

customElements.define('gft-notes-data-manager', GftNotesDataManager);
