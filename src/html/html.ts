import { htmlEscape, htmlToElements } from "../utils/utils";

export const html = (literal, ...values) => {
  const raw = literal.raw;
  const events = [];
  let result = "";

  values.forEach((val, i) => {
    let lit = raw[i];

    if (Array.isArray(val)) {
      val = val.join("");
    }

    if (lit.endsWith("$")) {
      val = htmlEscape(val);
      lit = lit.slice(0, -1);
    }

    result += lit;

    if (lit.endsWith("=")) {
      events.push(val);
      result += `"${val}"`;
    } else {
      result += val;
    }
  });

  result += raw[raw.length - 1];

  return htmlToElements(result, events);
};
