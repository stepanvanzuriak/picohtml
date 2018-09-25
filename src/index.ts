import { html } from "./html/html";
import { raw } from "./raw/raw";
import { render } from "./render/render";

window.html = html;
window.render = render;
window.raw = raw;

export { html, render, raw };
