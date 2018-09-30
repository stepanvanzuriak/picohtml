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
    loopDOMAttributes(first(dom) as Element, callback);
  }
};

const replace = (str: string, from: string[], to: string[]) =>
  from.map((e, i) => str.replace(new RegExp(e), to[i]));

const first = (element: Node) => element.firstChild;

export const same = (a: any[], b: any[]) =>
  a.length === b.length && a.every((e, i) => e === b[i]);

export const cleanNode = (node: Node) => {
  while (first(node)) {
    node.removeChild(first(node));
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

  loopDOMAttributes(first(template.content) as Element, (name, element) => {
    const event = events.shift();

    element.addEventListener(
      name,
      // tslint:disable-next-line
      typeof event !== "function" ? () => {} : event
    );
  });

  return first(template.content);
};
