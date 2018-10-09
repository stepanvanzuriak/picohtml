import Template from "../template/template";
import { addToRawEvents } from "../utils/utils";

export const raw = (template: Template) => {
  template.isRaw = true;
  template.__forceUpdate();

  const { result, events } = template.getResult();

  addToRawEvents(events);

  return result;
};
