(function() {
  var a = {},
    g = !0;
  a.__esModule = g;
  var i = function e(t, r) {
      var o = t.attributes;
      if (o && o.length)
        for (var $ = 0, l = o; $ < l.length; $++) {
          var n = l[$].name;
          n.startsWith("on") && (t.removeAttribute(n), r(n.slice(2), t));
        }
      t.childNodes.length && e(t.firstChild, r);
    },
    h = function(e) {
      return e
        .replace(/&/g, "&amp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/`/g, "&#96;");
    };
  a.htmlEscape = h;
  var f = function(e, t) {
    var r = document.createElement("template");
    r.innerHTML = e.trim();
    var o = r.content.firstChild;
    return (
      i(o, function(e, r) {
        var o = t.shift();
        r.addEventListener(e, "function" != typeof o ? function() {} : o);
      }),
      o
    );
  };
  a.htmlToElements = f;
  var e = function(r) {
    for (var e = [], $ = 1; $ < arguments.length; $++) e[$ - 1] = arguments[$];
    var t = r.raw,
      h = [],
      l = "";
    return (
      e.forEach(function(r, e) {
        var $ = t[e];
        Array.isArray(r) && (r = r.join("")),
          $.endsWith("$") && ((r = a.htmlEscape(r)), ($ = $.slice(0, -1))),
          (l += $),
          $.endsWith("=") ? (h.push(r), (l += '"' + r + '"')) : (l += r);
      }),
      (l += t[t.length - 1]),
      { literal: t, values: e, result: l, events: h }
    );
  };
  var c = new WeakMap();
  var d = function(e, $) {
    console.log(e, $);
    var r = c.get($);
    void 0 === r
      ? (c.set($, e),
        $.appendChild(a.htmlToElements(e.result, e.events)),
        console.log("empty"))
      : ($.appendChild(a.htmlToElements(r.result, r.events)), console.log(r));
  };
  var b = {},
    j = !0;
  b.__esModule = j;
  var k = e;
  b.html = k;
  var l = d;
  (b.render = l), (window.html = e), (window.render = d);
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = b;
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return b;
    });
  }
})();
