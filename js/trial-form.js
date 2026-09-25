(function () {
  "use strict";

  var form = document.querySelector(".trial-form");
  if (!form || !window.fetch) return;

  var button = form.querySelector("button[type=submit]");
  var status = document.createElement("p");
  status.className = "trial-form__status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.hidden = true;
  form.appendChild(status);

  function show(kind, message) {
    status.className = "trial-form__status trial-form__status--" + kind;
    status.textContent = message;
    status.hidden = false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (button.disabled) return;

    var label = button.textContent;
    button.disabled = true;
    button.textContent = "Sending…";
    status.hidden = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (res.ok) {
            form.reset();
            show("success", "Thanks, your request is in. We'll email your free contacts within 1 to 2 business days.");
          } else {
            var detail = data && data.errors && data.errors.length ? data.errors[0].message : "";
            show("error", "We couldn't send your request" + (detail ? " (" + detail + ")" : "") + ". Please try again, or email us at harisshah478@gmail.com.");
          }
        });
      })
      .catch(function () {
        show("error", "We couldn't reach the server. Check your connection and try again, or email us at harisshah478@gmail.com.");
      })
      .then(function () {
        button.disabled = false;
        button.textContent = label;
      });
  });
})();
