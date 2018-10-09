const loopDOMAttributes = (
  dom: Element,
  callback: (name, dom, raw?) => void,
  raw = false
) => {
  const attrs = dom.attributes;

  if (attrs && attrs.length) {
    for (let i = 0; i < attrs.length; i++) {
      const name = attrs.item(i).name;

      if (name.startsWith("on")) {
        dom.removeAttribute(name);

        callback(name.slice(2), dom, raw);
      }
    }
  }

  if (dom.childNodes.length) {
    // tslint:disable-next-line
    for (let element = 0; element < dom.childNodes.length; element++) {
      const next = dom.childNodes[element];
      if (next.nodeType === 1 || next.nodeType === 8) {
        if (next.nodeType === 8) {
          if (next.data.trim() === "RAW_START") {
            raw = true;
          }

          if (next.data.trim() === "RAW_END") {
            raw = false;
          }
        }
        loopDOMAttributes(dom.childNodes[element] as Element, callback, raw);
      }
    }
  }
};

const first = (element: Node) => element.firstChild;

let rawEvents = [];

// tslint:disable-next-line:arrow-parens
export const addToRawEvents = events => {
  rawEvents = [...rawEvents, ...events];
};

export const getRawEvents = () => rawEvents;

export const replace = (str: string, from: string[], to: string[]) => {
  let newString = str;
  from.map((e, i) => {
    newString = newString.replace(new RegExp(e, "g"), to[i]);
  });

  return newString;
};

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

  loopDOMAttributes(
    first(template.content) as Element,
    (name, element, raw) => {
      const event = raw ? getRawEvents().shift() : events.shift();

      element.addEventListener(
        name,
        // tslint:disable-next-line
        typeof event !== "function" ? () => {} : event
      );
    }
  );

  return first(template.content);
};
