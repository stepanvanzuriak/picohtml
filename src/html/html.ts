import Template from "../template/template";

export const html = (literal: any, ...values) =>
  new Template(literal.raw, values);
