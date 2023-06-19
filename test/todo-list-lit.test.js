import { html, fixture, expect, fixtureCleanup } from '@open-wc/testing';
import sinon from 'sinon';
import mocks from './mocks.js';
import '../src/todo-list-lit.js';
import { GftNotesDataManager } from '../src/components/gft-notes-data-manager/GftNotesDataManager.js';

describe('TodoListLit', () => {
  let el;
  let elShadowRoot;

  afterEach(() => {
    sinon.restore();
    fixtureCleanup();
  });

  beforeEach(async () => {
    sinon.stub(GftNotesDataManager.prototype, 'getData').callsFake(function () {
      this.dispatchEvent(
        new CustomEvent('gft-notes-data-manager-success', {
          bubbles: true,
          composed: true,
          detail: { data: mocks.notes },
        })
      );
    });
    el = await fixture(html`<todo-list-lit></todo-list-lit>`);
    elShadowRoot = el.shadowRoot;
    await el.updateComplete;
  });

  it('render checkbox+texto de la nota y check de eventos', () => {
    // no visual ha terminado de cargar notas al lanzar el evento success -- else no renderizaria lo demas
    expect(elShadowRoot.querySelector('gft-notes-data-manager')).to.not.exist;

    // notas mockeadas
    expect(elShadowRoot.querySelectorAll('gft-note').length).to.equal(
      mocks.notes.length
    );

    // input field
    expect(elShadowRoot.getElementById('addNotes')).to.exist;

    // add button
    expect(elShadowRoot.getElementById('addNotesButton')).to.exist;

    // delete button
    expect(elShadowRoot.getElementById('deleteNotesButton')).to.exist;
  });
});
