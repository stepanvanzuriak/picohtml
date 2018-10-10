const first = (element: Node) => element.firstChild;

let rawEvents = [];

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

  dom.childNodes.forEach(child => {
    if (child.nodeType === 1 || child.nodeType === 8) {
      if (child.nodeType === 8) {
        if (child.data.trim() === "RAW_START") {
          raw = true;
        }

        if (child.data.trim() === "RAW_END") {
          raw = false;
        }
      }
      loopDOMAttributes(child as Element, callback, raw);
    }
  });
};

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
        // tslint:disable-next-line:no-empty
        typeof event !== "function" ? () => {} : event
      );
    }
  );

  return first(template.content);
};
