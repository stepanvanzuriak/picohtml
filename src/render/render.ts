import Template from "../template/template";
import { cleanNode, toDOM } from "../utils/utils";

export const Parts = new WeakMap<Node, Template>();

export const render = (template: Template, node: Node) => {
  const part = Parts.get(node);

  if (part) {
    if (!part.checkValues(template.values)) {
      cleanNode(node);
      node.appendChild(toDOM(part.result, part.events));
    }
  } else {
    const { result, events } = template.getResult();
    Parts.set(node, template);

    cleanNode(node);

    node.appendChild(toDOM(result, events));
  }
};
