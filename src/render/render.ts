import Template from "../template/template";
import { cleanNode, toDOM } from "../utils/utils";

const Parts = new WeakMap<Node, Template>();

export const render = (template: Template, node: Node) => {
  const part = Parts.get(node);

  const addToPart = () => {
    const { result, events } = template.getResult();
    Parts.set(node, template);

    cleanNode(node);

    node.appendChild(toDOM(result, events));
  };

  if (part) {
    if (!part.checkLiteral(template.lit)) {
      addToPart();
    } else if (!part.checkValues(template.values)) {
      cleanNode(node);
      node.appendChild(toDOM(part.result, part.events));
    }
  } else {
    addToPart();
  }
};
