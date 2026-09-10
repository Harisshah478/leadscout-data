(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;

  var staggerGroups = document.querySelectorAll(
    ".fields-grid, .value-props, .steps, .formats, .contact-grid, .checklist, .field-rows"
  );

  staggerGroups.forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add("reveal");
      child.style.transitionDelay = Math.min(i * 60, 360) + "ms";
    });
  });

  var singles = document.querySelectorAll(
    ".section__head, .table-card, .prose p, .cta"
  );

  singles.forEach(function (el) {
    el.classList.add("reveal");
  });

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });
})();
