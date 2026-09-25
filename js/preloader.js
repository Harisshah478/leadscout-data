(function () {
  "use strict";

  // Only on the first page load of a browser session, so moving between
  // pages (or reloading) never replays it.
  try {
    if (sessionStorage.getItem("ls-preloaded")) return;
    sessionStorage.setItem("ls-preloaded", "1");
  } catch (e) {
    return;
  }

  var MIN_MS = 600;   // long enough for the mark to draw, short enough not to annoy
  var MAX_MS = 5000;  // failsafe: never trap a visitor behind the loader
  var start = Date.now();
  var root = document.documentElement;

  var css =
    "#ls-preloader{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;background:#fff;color:#171717;transition:opacity 400ms ease,visibility 400ms ease}" +
    "#ls-preloader.is-done{opacity:0;visibility:hidden}" +
    "#ls-preloader svg{width:56px;height:56px;fill:none;stroke:#0074e0;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}" +
    "#ls-preloader path{stroke-dasharray:1;stroke-dashoffset:1;animation:ls-draw 900ms cubic-bezier(.65,0,.35,1) forwards}" +
    "#ls-preloader path+path{animation-delay:250ms}" +
    "#ls-preloader .ls-word{font:700 18px/1 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:-.01em;opacity:0;animation:ls-fade 500ms ease 450ms forwards}" +
    "#ls-preloader .ls-word span{color:#0074e0}" +
    "#ls-preloader .ls-bar{width:120px;height:2px;border-radius:2px;background:#e5e7eb;overflow:hidden}" +
    "#ls-preloader .ls-bar::after{content:'';display:block;width:40%;height:100%;border-radius:2px;background:#0074e0;animation:ls-slide 1.1s ease-in-out infinite}" +
    "@keyframes ls-draw{to{stroke-dashoffset:0}}" +
    "@keyframes ls-fade{to{opacity:1}}" +
    "@keyframes ls-slide{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}" +
    "@media (prefers-reduced-motion:reduce){#ls-preloader path{animation:none;stroke-dashoffset:0}#ls-preloader .ls-word{animation:none;opacity:1}#ls-preloader .ls-bar::after{animation:none;width:100%}}";

  var style = document.createElement("style");
  style.textContent = css;
  root.appendChild(style);

  var el = document.createElement("div");
  el.id = "ls-preloader";
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", "Loading LeadScout Data");
  el.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path pathLength="1" d="M6 5 V17 A4 4 0 0 0 10 21 H14"/><path pathLength="1" d="M18 5 A3.5 3.5 0 0 1 18 12 L14.5 12 L19.5 19"/></svg>' +
    '<div class="ls-word">LeadScout <span>Data</span></div>' +
    '<div class="ls-bar"></div>';
  root.appendChild(el);
  root.style.overflow = "hidden";

  var finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    el.classList.add("is-done");
    root.style.overflow = "";
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
      if (style.parentNode) style.parentNode.removeChild(style);
    }, 450);
  }

  function onLoaded() {
    setTimeout(finish, Math.max(0, MIN_MS - (Date.now() - start)));
  }

  if (document.readyState === "complete") onLoaded();
  else window.addEventListener("load", onLoaded);

  setTimeout(finish, MAX_MS);
})();
