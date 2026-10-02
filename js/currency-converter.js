/* Pricing calculator: contacts -> total in PKR and USD.
   Price is a flat Rs 1 per contact; USD uses a fixed estimated rate. */
(function () {
  var PKR_PER_CONTACT = 1;
  var PKR_PER_USD = 280;

  var input = document.getElementById("conv-contacts");
  var pkrEl = document.getElementById("conv-pkr");
  var usdEl = document.getElementById("conv-usd");
  if (!input || !pkrEl || !usdEl) return;

  function update() {
    var n = parseFloat(input.value);
    if (!(n >= 0)) {
      pkrEl.textContent = "Rs 0";
      usdEl.textContent = "$0.00";
      return;
    }
    var pkr = n * PKR_PER_CONTACT;
    var usd = pkr / PKR_PER_USD;
    pkrEl.textContent = "Rs " + pkr.toLocaleString("en-US", { maximumFractionDigits: 2 });
    usdEl.textContent = "$" + usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  input.addEventListener("input", update);
  update();
})();
