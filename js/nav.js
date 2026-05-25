/**
 * Shared site navigation — mobile menu overlay
 */
(function () {
  "use strict";

  let navTl = null;

  function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const overlay = document.getElementById("navOverlay");
    if (!toggle || !links || !overlay) return;

    const items = links.querySelectorAll(".nav__link, .nav__cta");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function openNav() {
      links.classList.add("open");
      overlay.classList.add("open");
      toggle.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");

      if (reducedMotion || typeof gsap === "undefined") {
        items.forEach((el) => {
          el.style.opacity = "1";
        });
        return;
      }

      navTl = gsap.timeline();
      navTl.fromTo(items, { opacity: 0 }, { opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" });
    }

    function closeNav() {
      if (navTl) navTl.kill();

      if (reducedMotion || typeof gsap === "undefined") {
        links.classList.remove("open");
        overlay.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
        items.forEach((el) => {
          el.style.opacity = "";
        });
        return;
      }

      gsap.to(items, {
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          links.classList.remove("open");
          overlay.classList.remove("open");
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("nav-open");
          gsap.set(items, { clearProps: "opacity" });
        },
      });
    }

    toggle.addEventListener("click", () => {
      links.classList.contains("open") ? closeNav() : openNav();
    });

    overlay.addEventListener("click", closeNav);

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (links.classList.contains("open")) closeNav();
      });
    });

    window.closeMobileNav = closeNav;
  }

  window.initSiteNav = initMobileNav;
})();
