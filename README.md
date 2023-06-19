## Ejercicio

Crear una aplicación con Lit, basada en webcomponents, con las siguientes funcionalidades:

- **Listar notas:** Nada más cargar, la aplicación debe recuperar las notas del endpoint `https://jsonplaceholder.typicode.com/todos?_delay=1000&_=${Date.now()}` y listar las 5 primeras. Para cada una de ellas se pintará el texto y un checkbox que permita seleccionarla.
- **Añadir notas:** Debe existir un input donde el usuario pueda escribir el texto de una nueva nota y, tras pulsar un botón, añadirse al listado. Tras añadirse, el input se limpiará. Si el input está vacío, el botón de añadir debe estar deshabilitado.
- **Borrar notas:** El usuario podrá seleccionar tantas notas como quiera para posteriormente pulsar un botón que las elimine. Si no hay ninguna nota seleccionada, el botón de eliminar estará deshabilitado.
- **Control carga de la aplicación:** Mientras las notas iniciales están cargando, se mostrará en pantalla un mensaje o indicador de carga.
- **Control de notas vacías:** Si en algún momento nos quedásemos sin notas (la carga inicial no devuelve notas o el usuario ha borrado todas), se debe mostrar un mensaje que indique que no hay notas.

Ejemplo orientativo:

<img src="/assets/example.gif" width="200px">

## Componentes

Los componentes se crearán en la carpeta components, creando una carpeta para cada uno de ellos. Dicha carpeta contendrá 2 ficheros, uno para el js y otro para el css. Por ejemplo:
```
src/components
  gft-note
    GftNote.js
    GftNote-styles.js
```

Se deben crear al menos los siguientes componentes:

- **gft-button:** Para el botón de añadir y de eliminar. Cuando se pulsa debe emitir el evento gft-button-click
- **gft-checkbox:** Para el checkbox que permite seleccionar cada nota. Cuando se pulsa debe emitir el evento gft-checkbox-change con un true o false en el detalle del evento.
- **gft-input:** Para el input que permite añadir notas. Debe emitir el evento gft-input-change cuando cambia, conteniendo el valor del input en el detalle de dicho evento.
- **gft-note:** Contiene un gft-checkbox y el texto de la nota. Debe emitir el evento gft-note-selection-change cuando se selecciona la nota. Dicho evento contendrá al menos el id de la nota y el true/false de si está seleccionada.
- **gft-notes-data-manager:** Componente no visual que permite realizar la llamada al endpoint que carga las notas y lanza el evento gft-notes-data-manager-get-success cuando las tiene. Como el endpoint devuelve muchas notas, este componente recibirá una property maxItems que se le pasará desde la app y se utilizará para cortar los datos recibidos.

## Tests

Desarrollar al menos los siguientes tests:

- Un test del componente gft-note que valide que al renderizar se pinta un gft-checkbox y un texto con el texto correcto.
- Un test que valide que al pintar un gft-note y simular el evento gft-checkbox-change del gft-checkbox, se lanza correctamente el evento gft-note-selection-change. Para validar que salta el evento puede ser útil sinon.spy().
```js
const spy = sinon.spy();
el.addEventListener('gft-note-selection-change', spy, { once: true});
// Resto del test simulando el evento gft-checkbox-change del gft-checkbox...
assert.isTrue(spy.called);
assert.deepEqual(spy.getCall(0).args[0].detail, /* detalle del evento esperado */);
```
- Un test que valide que al renderizar el componente principal de la app se pintan todos los elementos que se tienen que pintar, un gft-notes-data-manager, un gft-input, un gft-button para añadir y otro para eliminar y tantos gft-note como corresponda. Para que la carga de datos no llame al endpoint real, se puede usar un stub de sinon junto con un fichero de mocks:
```js
sinon
  .stub(GftNotesDataManager.prototype, 'getNotes')
  .callsFake(function() {
    this.dispatchEvent(
      new CustomEvent('gft-notes-data-manager-get-success', {
        bubbles: true,
        composed: true,
        detail: mocks.notes
      })
    );
  });
```

## Instalación del proyecto

Crea una rama, partiendo de master, con tu nombre de usuario de gft

```bash
git clone https://git.gft.com/jntn/todo-list-lit.git
cd todo-list-lit
git checkout -b feat/abcd # ejemplo para un usuario de gft llamado abcd
npm i
```

Al terminar el ejercicio, realizar una PR a master

## Scripts

- `npm run start` inicia la aplicación y recarga el navegador ante cualquier cambio
- `npm run test` ejecuta los tests unitarios
- `npm run lint` ejecuta el linter
