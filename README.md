# PICOHTML

<h2 align="center">Powerfully <b>~2kB (gzip)</b> HTML template strings</h2>

# Installation

```bash
$ npm install picohtml
```

# Usage

```js
import { html, render } from "picohtml";

const el = html`<h1>Hello planet</h1>`;

render(el, document.body);
```

## Attaching event listeners

```js
import { html, render } from "picohtml";

const click = () => alert("Hello planet!");
const el = html`<button onclick=${click}>Click</button>`;

render(el, document.body);
```

## Insert template literal and picohtml literal

```js
import { html, render, raw } from "picohtml";

const text = `<p>Text</p>`;
const htmlText = () => html`<p>HTML Text</p>`;
const el = html`<div>${text} ${raw(htmlText())}</div>`;

render(el, document.body);
```

## License

[MIT](./LICENSE)

## See Also

- [nanohtml](https://github.com/choojs/nanohtml)
- [lit-html](https://github.com/Polymer/lit-html)
