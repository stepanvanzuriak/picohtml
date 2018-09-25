const loopDOMAttributes = (dom: Element, callback: (name, dom) => void) => {
  const attrs = dom.attributes;

  if (attrs && attrs.length) {
    for (let i = 0; i < attrs.length; i++) {
      const name = attrs.item(i).name;

      if (name.startsWith("on")) {
        dom.removeAttribute(name);

        callback(name.slice(2), dom);
      }
    }
  }

  if (dom.childNodes.length) {
    loopDOMAttributes(dom.firstChild as Element, callback);
  }
};

const replace = (str: string, from: string[], to: string[]) =>
  from.map((e, i) => str.replace(new RegExp(e), to[i]));

export const cleanNode = (node: Node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export const htmlEscape = (str: string) =>
  replace(
    str,
    ["&", ">", "<", '"', "'", "`"],
    ["&amp;", "&gt;", "&quot;", "&#39;", "&#39;", "&#96;"]
  );

export const toDOM = (html: string, events: Events) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();

  loopDOMAttributes(template.content.firstChild as Element, (name, element) => {
    const event = events.shift();

    element.addEventListener(
      name,
      // tslint:disable-next-line
      typeof event !== "function" ? () => {} : event
    );
  });

  return template.content.firstChild;
};
