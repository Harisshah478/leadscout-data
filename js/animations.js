(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;

  var staggerGroups = document.querySelectorAll(
    ".fields-grid, .value-props, .steps, .formats, .contact-grid, .checklist, .field-rows, .stat-row, .logo-strip"
  );

  staggerGroups.forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add("reveal");
      child.style.transitionDelay = Math.min(i * 60, 360) + "ms";
    });
  });

  var singles = document.querySelectorAll(
    ".section__head, .table-card, .prose p, .cta, .dashboard-card"
  );

  singles.forEach(function (el) {
    el.classList.add("reveal");
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    var match = /^(\d+(?:\.\d+)?)(.*)$/.exec(el.textContent.trim());
    if (!match) return;
    if (reduceMotion) return;
    var target = parseFloat(match[1]);
    var suffix = match[2];
    var duration = 1000;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = match[1] + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

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

  var countIo = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIo.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".stat__num").forEach(function (el) {
    countIo.observe(el);
  });

  var hasFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (hasFinePointer && !reduceMotion) {
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    var glowRaf = null;

    document.addEventListener("mousemove", function (e) {
      if (glowRaf) return;
      glowRaf = window.requestAnimationFrame(function () {
        glow.style.setProperty("--mx", e.clientX + "px");
        glow.style.setProperty("--my", e.clientY + "px");
        glow.classList.add("is-active");
        glowRaf = null;
      });
    });

    document.addEventListener("mouseleave", function () {
      glow.classList.remove("is-active");
    });

    document.querySelectorAll(".tier-card").forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        glow.classList.add("is-suppressed");
      });
      card.addEventListener("mouseleave", function () {
        glow.classList.remove("is-suppressed");
      });
    });
  }
})();
