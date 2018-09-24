import Template from "../template/template";
import { cleanNode, htmlToElements } from "../utils/utils";

export const Parts = new WeakMap<Node, Template>();

export const render = (template: Template, node) => {
  const part = Parts.get(node);

  if (part === undefined) {
    Parts.set(node, template);
    const { result, events } = template.getResult();

    cleanNode(node);

    node.appendChild(htmlToElements(result, events));
  } else {
    part.checkValues(template.values);

    cleanNode(node);

    node.appendChild(htmlToElements(part.result, part.events));
  }
};
