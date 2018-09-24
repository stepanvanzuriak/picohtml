const loopDOMAttributes = (dom: any, callback: (name, dom) => void) => {
  const attrs = dom.attributes;

  if (attrs && attrs.length) {
    for (const attr of attrs) {
      const name = attr.name;

      if (name.startsWith("on")) {
        dom.removeAttribute(name);

        callback(name.slice(2), dom);
      }
    }
  }

  if (dom.childNodes.length) {
    loopDOMAttributes(dom.firstChild, callback);
  }
};

export const cleanNode = (node: Node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export const htmlEscape = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");

export const htmlToElements = (html: string, events: any[]) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();

  const node = template.content.firstChild;

  loopDOMAttributes(node, (name, element) => {
    const event = events.shift();

    element.addEventListener(
      name,
      // tslint:disable-next-line
      typeof event !== "function" ? () => {} : event
    );
  });

  return node;
};
