/* PKR <-> USD converter for the pricing page. The rate is user-editable
   (not fetched) and remembered in localStorage. */
(function () {
  var rateEl = document.getElementById("conv-rate");
  var pkrEl = document.getElementById("conv-pkr");
  var usdEl = document.getElementById("conv-usd");
  var out = document.getElementById("conv-result");
  if (!rateEl || !pkrEl || !usdEl || !out) return;

  var KEY = "lsd-pkr-rate";
  try {
    var saved = parseFloat(localStorage.getItem(KEY));
    if (saved > 0) rateEl.value = saved;
  } catch (e) {}

  function rate() {
    var r = parseFloat(rateEl.value);
    return r > 0 ? r : 0;
  }

  function fmt(n, max) {
    return n.toLocaleString("en-US", { maximumFractionDigits: max });
  }

  function summary() {
    var r = rate();
    out.textContent = r
      ? "Rs 1 per contact = $" + (1 / r).toLocaleString("en-US", { maximumSignificantDigits: 3 }) + " at Rs " + fmt(r, 2) + " per $1."
      : "Enter an exchange rate to convert.";
  }

  function fromPkr() {
    var r = rate(), v = parseFloat(pkrEl.value);
    usdEl.value = r && v >= 0 ? +(v / r).toFixed(4) : "";
  }

  function fromUsd() {
    var r = rate(), v = parseFloat(usdEl.value);
    pkrEl.value = r && v >= 0 ? +(v * r).toFixed(2) : "";
  }

  rateEl.addEventListener("input", function () {
    try { if (rate()) localStorage.setItem(KEY, String(rate())); } catch (e) {}
    fromPkr();
    summary();
  });
  pkrEl.addEventListener("input", fromPkr);
  usdEl.addEventListener("input", fromUsd);

  fromPkr();
  summary();
})();
