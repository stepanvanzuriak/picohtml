import { html } from "./html/html";
import { render } from "./render/render";
import { raw } from "./raw/raw";

window.html = html;
window.render = render;
window.raw = raw;

export { html, render, raw };
