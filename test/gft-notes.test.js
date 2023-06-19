import {
  html,
  fixture,
  expect,
  fixtureCleanup,
  assert,
} from '@open-wc/testing';
import sinon from 'sinon';
import mocks from './mocks.js';
import '../src/components/gft-note/GftNote.js';

describe('Note', () => {
  let el;
  let elShadowRoot;

  afterEach(() => {
    sinon.restore();
    fixtureCleanup();
  });

  beforeEach(async () => {
    el = await fixture(
      html`<gft-note
        .identifier=${mocks.single.id}
        .content=${mocks.single.title}
      ></gft-note>`
    );
    elShadowRoot = el.shadowRoot;
    await el.updateComplete;
  });

  it('render del componente checkbox y texto de la nota', () => {
    // checkbox existe
    expect(elShadowRoot.querySelector('gft-checkbox')).to.exist;

    // el contenido de la nota llega correctamente
    const text = elShadowRoot.querySelector('p').textContent.trim();
    expect(text).to.equal(mocks.single.title);
  });

  it('Comprobación de que los eventos funcionan correctamente', () => {
    // simulacion evento checkbox change<>note selection change
    const spy = sinon.spy();
    el.addEventListener('gft-note-selection-change', spy, { once: true });
    elShadowRoot.querySelector('gft-checkbox').dispatchEvent(
      new CustomEvent('gft-checkbox-change', {
        detail: { id: 1, checked: true },
        composed: true,
        bubbles: true,
      })
    );
    assert.isTrue(spy.called);
    assert.deepEqual(spy.getCall(0).args[0].detail, {
      id: 1,
      checked: true,
    });
  });
});
