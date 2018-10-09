import Template from "../template/template";

export const html = (lit: any, ...values) => new Template(lit.raw, values);
