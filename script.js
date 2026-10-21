/* ==========================================================================
   Automation Portfolio — script.js
   Minimal vanilla JS: mobile navigation, active section highlighting,
   scroll-state on the header, reveal-on-scroll, and the footer year.
   No dependencies, no network calls, no storage.
   ========================================================================== */

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var desktopQuery = window.matchMedia("(min-width: 861px)");

  /* ---- Mobile navigation ------------------------------------------------ */

  function setNavOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open && !desktopQuery.matches);
  }

  function isNavOpen() {
    return toggle && toggle.getAttribute("aria-expanded") === "true";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!isNavOpen());
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isNavOpen()) {
        setNavOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!isNavOpen()) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setNavOpen(false);
    });

    var onViewportChange = function () {
      if (desktopQuery.matches) setNavOpen(false);
    };
    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", onViewportChange);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(onViewportChange);
    }
  }

  /* ---- Header scroll state ---------------------------------------------- */

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Footer year ------------------------------------------------------- */

  var yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  /* ---- Reveal on scroll -------------------------------------------------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  /* ---- Active section in navigation -------------------------------------- */

  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return null;
      var section = document.querySelector(id);
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var visible = Object.create(null);

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        var bestId = null;
        var bestRatio = 0;
        Object.keys(visible).forEach(function (id) {
          if (visible[id] > bestRatio) {
            bestRatio = visible[id];
            bestId = id;
          }
        });

        navLinks.forEach(function (link) {
          var isCurrent = bestId !== null && link.getAttribute("href") === "#" + bestId;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach(function (item) {
      sectionObserver.observe(item.section);
    });
  }
})();
