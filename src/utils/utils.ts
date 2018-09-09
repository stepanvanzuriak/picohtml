export const htmlEscape = str =>
  str
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");

export const loopDOMAttributes = (dom, callback) => {
  const attrs = dom.attributes;

  if (attrs && attrs.length) {
    for (const attr of attrs) {
      const name = attr.name;

      dom.removeAttribute(name);

      callback(name.slice(2), dom);
    }
  }

  if (dom.childNodes.length) {
    loopDOMAttributes(dom.firstChild, callback);
  }
};

export const htmlToElements = (html, events) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;

  const node = template.content.firstChild;

  loopDOMAttributes(node, (name, element) => {
    let event = events.shift();

    if (typeof event !== "function") {
      event = () => {};
    }

    element.addEventListener(name, event);
  });

  return node;
};
