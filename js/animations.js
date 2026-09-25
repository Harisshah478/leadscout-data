(function () {
  "use strict";

  // Scroll progress bar (thin accent line at the top of the viewport).
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var barTicking = false;
    var updateBar = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = "scaleX(" + p + ")";
      barTicking = false;
    };
    window.addEventListener("scroll", function () {
      if (!barTicking) {
        barTicking = true;
        window.requestAnimationFrame(updateBar);
      }
    }, { passive: true });
    updateBar();
  }

  // Mobile menu: lock background scroll while open, close on link tap or Escape.
  var navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("change", function () {
      document.body.style.overflow = navToggle.checked ? "hidden" : "";
    });
    var closeNav = function () {
      navToggle.checked = false;
      document.body.style.overflow = "";
    };
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.checked) closeNav();
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", closeNav);
  }

  // Back-to-top buttons in the footer.
  document.querySelectorAll(".footer__top").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
    });
  });

  // Scroll-linked motion: hero parallax and the footer's slide-up reveal.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var heroInner = document.querySelector(".hero__inner");
    var footer = document.querySelector(".footer");
    var footerInner = footer && footer.querySelector(".container");
    var motionTicking = false;

    var updateMotion = function () {
      var y = window.scrollY;
      if (heroInner && y < 1200) {
        // Content moves up slower than the page: 0 to 400px over 1000px of scroll.
        var shift = Math.min(y, 1000) * 0.4;
        heroInner.style.transform = "translate3d(0," + shift + "px,0)";
        heroInner.style.opacity = String(Math.max(0, 1 - y / 800));
      }
      if (footerInner) {
        var rect = footer.getBoundingClientRect();
        var vh = window.innerHeight;
        // 0 when the footer's top enters the viewport, 1 when its bottom reaches it.
        var p = Math.min(Math.max((vh - rect.top) / Math.max(rect.height, 1), 0), 1);
        footerInner.style.transform = "translate3d(0," + (-30 * (1 - p)) + "%,0)";
      }
      motionTicking = false;
    };

    if (heroInner || footerInner) {
      window.addEventListener("scroll", function () {
        if (!motionTicking) {
          motionTicking = true;
          window.requestAnimationFrame(updateMotion);
        }
      }, { passive: true });
      window.addEventListener("resize", updateMotion);
      updateMotion();
    }
  }

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
