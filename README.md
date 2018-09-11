# PICOHTML

HTML template strings

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

# See Also

- [nanohtml](https://github.com/choojs/nanohtml)
- [lit-html](https://github.com/Polymer/lit-html)
