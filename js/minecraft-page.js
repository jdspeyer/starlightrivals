(function () {
  "use strict";

  const cfg = SITE_CONFIG;
  const mc = cfg.minecraft;
  const pack = mc.pack || {};
  const guide = mc.connectionGuide || {};

  function hasAudioConsent() {
    try {
      return localStorage.getItem("sr-audio-consented") === "1";
    } catch (e) {
      return false;
    }
  }

  function renderGuideAction(step) {
    if (step.action === "download" && pack.downloadUrl) {
      return `<a href="${pack.downloadUrl}" class="btn btn--primary magnetic" download data-magnetic>download pack</a>`;
    }
    if (step.action === "modrinth" && pack.modrinthUrl) {
      return `<a href="${pack.modrinthUrl}" class="btn btn--primary magnetic" target="_blank" rel="noopener noreferrer" data-magnetic>get modrinth</a>`;
    }
    if (step.action === "copyIp" && pack.serverIp) {
      return `
        <button type="button" class="btn btn--primary magnetic" data-magnetic data-copy-ip="${pack.serverIp}">copy ip</button>
        <span class="mc-guide__ip"><span class="mc-guide__ip-dot" aria-hidden="true"></span>${pack.serverIp}</span>`;
    }
    return "";
  }

  function renderGuideSteps() {
    const container = document.getElementById("mcGuideSteps");
    if (!container || !guide.steps) return;

    container.innerHTML = guide.steps
      .map((step, i) => {
        const actions = renderGuideAction(step);
        const actionsHtml = actions
          ? `<div class="mc-guide__actions">${actions}</div>`
          : "";

        let text = step.text || "";
        if (i === 3 && pack.ramMinGb && pack.ramMaxGb) {
          text = text.replace(/4–6gb|4-6gb/i, `${pack.ramMinGb}–${pack.ramMaxGb}gb`);
        }

        return `
          <li class="mc-guide__step" data-step="${i + 1}">
            <div class="mc-guide__card">
              <h3 class="mc-guide__step-title">${step.title}</h3>
              <p class="mc-guide__step-text">${text}</p>
              ${actionsHtml}
            </div>
          </li>`;
      })
      .join("");
  }

  function setupCopyIp() {
    const toast = document.getElementById("mcToast");
    let toastTimer;

    document.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copy-ip]");
      if (!btn) return;

      const ip = btn.getAttribute("data-copy-ip");
      if (!ip) return;

      try {
        await navigator.clipboard.writeText(ip);
      } catch (err) {
        const ta = document.createElement("textarea");
        ta.value = ip;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      if (toast) {
        toast.hidden = false;
        toast.classList.add("visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove("visible");
          setTimeout(() => {
            toast.hidden = true;
          }, 450);
        }, 2200);
      }

      btn.textContent = "copied!";
      setTimeout(() => {
        btn.textContent = "copy ip";
      }, 2000);
    });
  }

  function initScrollAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".mc-guide__step", { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".mc-hero__pack", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      delay: 0.15,
    });

    gsap.utils.toArray(".mc-guide__step").forEach((step, i) => {
      gsap.fromTo(
        step,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: i * 0.04,
        }
      );
    });
  }

  function populateContent() {
    document.title = `minecraft — ${cfg.name}`;

    const packLogo = document.getElementById("mcPackLogo");
    if (packLogo && pack.logo) packLogo.src = pack.logo;

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el && value) el.textContent = value;
    };

    setText("mcPackLabel", pack.label);
    setText("mcPackName", pack.name);
    setText("mcPackDesc", pack.description);
    setText("mcGuideSub", guide.subtext);

    const placeholderText = document.getElementById("mapPlaceholderText");
    if (placeholderText) placeholderText.textContent = mc.mapPlaceholderText || "map coming soon…";

    document.querySelectorAll(".logo-img").forEach((img) => {
      img.src = cfg.assets.logo;
    });
  }

  function setupMap() {
    const url = mc.bluemapUrl;
    const viewport = document.getElementById("mapViewport");
    const placeholder = document.getElementById("mapPlaceholder");
    const status = document.getElementById("mapStatus");

    if (url && viewport && placeholder) {
      placeholder.remove();
      if (status) status.textContent = "live map connected";
      viewport.innerHTML = `<iframe src="${url}" title="Minecraft world map" allow="fullscreen" loading="lazy"></iframe>`;
    }
  }

  function bootSiteChrome() {
    if (typeof window.setupEmbedVideo === "function") {
      window.setupEmbedVideo("mcHeroVideo", pack.headerVideoId, pack.headerVideoStart);
    }
    if (typeof window.initSiteCursor === "function") window.initSiteCursor();
    const musicId = mc.musicVideoId || cfg.musicVideoId;
    window.__pageMusicVideoId = musicId;
    if (typeof window.initSiteAudio === "function") window.initSiteAudio(musicId);
    if (hasAudioConsent() && typeof window.startSiteMusic === "function") {
      window.startSiteMusic();
    }
  }

  populateContent();
  renderGuideSteps();
  setupCopyIp();
  setupMap();
  bootSiteChrome();
  if (typeof window.initSiteMagnetic === "function") window.initSiteMagnetic();

  if (typeof window.initDiscordGate === "function") window.initDiscordGate();
  if (typeof window.initSiteNav === "function") window.initSiteNav();

  initScrollAnimations();
})();
