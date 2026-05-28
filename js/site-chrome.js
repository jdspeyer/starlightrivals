/**
 * Shared UI chrome — cursor, magnetic buttons, background video embed.
 */
(function () {
  "use strict";

  window.setupEmbedVideo = function (wrapId, videoId, startSeconds) {
    const wrap = document.getElementById(wrapId);
    if (!wrap || !videoId) return;

    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      controls: "0",
      showinfo: "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      enablejsapi: "1",
      playlist: videoId,
      start: String(startSeconds || 0),
    });

    wrap.innerHTML = `<iframe
      src="https://www.youtube-nocookie.com/embed/${videoId}?${params}"
      title="Background video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      tabindex="-1"
    ></iframe>`;
  };

  window.initSiteCursor = function () {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const dot = cursor.querySelector(".cursor__dot");
    const ring = cursor.querySelector(".cursor__ring");
    document.body.classList.add("no-cursor");

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      if (typeof gsap !== "undefined") gsap.set(dot, { x, y });

      const overInteractive = e.target.closest(
        "a, button, .magnetic, .feature-card, .discord-gate__btn, [data-gate-dismiss], [data-gate-continue]"
      );
      cursor.classList.toggle("hover", !!overInteractive);
    });

    if (typeof gsap === "undefined") return;

    gsap.ticker.add(() => {
      ringX += (x - ringX) * 0.15;
      ringY += (y - ringY) * 0.15;
      gsap.set(ring, { x: ringX, y: ringY });
    });
  };

  window.initSiteMagnetic = function () {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (typeof gsap === "undefined") return;

    document.querySelectorAll("[data-magnetic]:not([data-magnetic-bound])").forEach((el) => {
      el.dataset.magneticBound = "1";
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - rect.left - rect.width / 2) * 0.25,
          y: (e.clientY - rect.top - rect.height / 2) * 0.25,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      });
    });
  };
})();
