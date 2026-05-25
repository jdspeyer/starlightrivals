/**
 * Discord join gate — confirmation modal before opening invite link.
 */
(function () {
  "use strict";

  const CTA_IDS = [
    "heroDiscordCta",
    "navDiscordCta",
    "discordCta",
    "minecraftDiscordCta",
    "finalDiscordCta",
    "mobileDiscordCta",
    "mapDiscordCta",
  ];

  let gateEl = null;
  let inviteUrl = "";
  let isOpen = false;

  function getGateCopy() {
    const gate = SITE_CONFIG.discord?.gate || {};
    return {
      badge: gate.badge || "Space Cadet Check",
      title: gate.title || "Confirm before launch",
      body:
        gate.body ||
        "As a space cadet boarding the Starlight spacecraft, do you identify as a woman? This is a women-only Discord — if that's not you, you'll be ejected from the craft after joining.",
      dismissLabel: gate.dismissLabel || "Abort Launch",
      continueLabel: gate.continueLabel || "Beam Me Up",
    };
  }

  function buildModal() {
    if (gateEl) return gateEl;

    const copy = getGateCopy();
    gateEl = document.createElement("div");
    gateEl.id = "discordGate";
    gateEl.className = "discord-gate";
    gateEl.hidden = true;
    gateEl.setAttribute("role", "dialog");
    gateEl.setAttribute("aria-modal", "true");
    gateEl.setAttribute("aria-labelledby", "discordGateTitle");
    gateEl.innerHTML = `
      <div class="discord-gate__backdrop" data-gate-dismiss></div>
      <div class="discord-gate__wrap">
        <div class="discord-gate__orbit" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="discord-gate__panel glass-card">
          <div class="discord-gate__scanline" aria-hidden="true"></div>
          <div class="discord-gate__glow" aria-hidden="true"></div>
          <p class="discord-gate__badge">${copy.badge}</p>
          <h2 class="discord-gate__title" id="discordGateTitle">${copy.title}</h2>
          <p class="discord-gate__text">${copy.body}</p>
          <div class="discord-gate__actions">
            <button type="button" class="btn btn--ghost discord-gate__btn" data-gate-dismiss>${copy.dismissLabel}</button>
            <button type="button" class="btn btn--primary discord-gate__btn discord-gate__btn--continue" data-gate-continue>
              ${copy.continueLabel}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(gateEl);

    gateEl.querySelectorAll("[data-gate-dismiss]").forEach((el) => {
      el.addEventListener("click", closeGate);
    });

    gateEl.querySelector("[data-gate-continue]").addEventListener("click", () => {
      if (inviteUrl) window.open(inviteUrl, "_blank", "noopener,noreferrer");
      closeGate();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) closeGate();
    });

    return gateEl;
  }

  function applyLinks(url) {
    inviteUrl = url;
    CTA_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    });
  }

  function bindCtAs() {
    CTA_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el || el.dataset.gateBound) return;
      el.dataset.gateBound = "1";
      el.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof window.closeMobileNav === "function") window.closeMobileNav();
        openGate();
      });
    });
  }

  function openGate() {
    if (isOpen || !inviteUrl) return;
    buildModal();
    isOpen = true;
    gateEl.hidden = false;
    document.body.classList.add("discord-gate-open");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof gsap === "undefined") {
      gateEl.classList.add("discord-gate--visible");
      gateEl.querySelector("[data-gate-continue]")?.focus();
      return;
    }

    const panel = gateEl.querySelector(".discord-gate__panel");
    const orbit = gateEl.querySelectorAll(".discord-gate__orbit span");
    const badge = gateEl.querySelector(".discord-gate__badge");
    const title = gateEl.querySelector(".discord-gate__title");
    const text = gateEl.querySelector(".discord-gate__text");
    const buttons = gateEl.querySelectorAll(".discord-gate__actions .btn");
    const backdrop = gateEl.querySelector(".discord-gate__backdrop");
    const glow = gateEl.querySelector(".discord-gate__glow");

    gsap.set(gateEl, { pointerEvents: "auto" });
    gsap.set(panel, { transformPerspective: 900, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      onComplete: () => gateEl.querySelector("[data-gate-continue]")?.focus(),
    });

    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" })
      .fromTo(
        glow,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(
        panel,
        { scale: 0.55, y: 80, rotationX: 18, opacity: 0 },
        { scale: 1, y: 0, rotationX: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.55"
      )
      .fromTo(
        orbit,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.07, duration: 0.55, ease: "back.out(2.5)" },
        "-=0.65"
      )
      .fromTo(badge, { y: 24, opacity: 0, letterSpacing: "0.3em" }, { y: 0, opacity: 1, letterSpacing: "0.12em", duration: 0.45, ease: "power3.out" }, "-=0.35")
      .fromTo(title, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .fromTo(text, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, "-=0.25")
      .fromTo(
        buttons,
        { y: 18, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.45, ease: "back.out(1.8)" },
        "-=0.2"
      );
  }

  function closeGate() {
    if (!gateEl || !isOpen) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panel = gateEl.querySelector(".discord-gate__panel");
    const backdrop = gateEl.querySelector(".discord-gate__backdrop");

    const finish = () => {
      isOpen = false;
      gateEl.hidden = true;
      gateEl.classList.remove("discord-gate--visible");
      document.body.classList.remove("discord-gate-open");
      if (typeof gsap !== "undefined") {
        gsap.set(gateEl, { pointerEvents: "none" });
        gsap.set(gateEl.querySelectorAll(".discord-gate__panel, .discord-gate__backdrop, .discord-gate__glow, .discord-gate__orbit span, .discord-gate__badge, .discord-gate__title, .discord-gate__text, .discord-gate__actions .btn"), { clearProps: "all" });
      }
    };

    if (reduced || typeof gsap === "undefined") {
      finish();
      return;
    }

    gsap.to(panel, {
      scale: 0.88,
      y: 30,
      rotationX: -8,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: finish,
    });
  }

  function resolveInviteUrl() {
    const { inviteUrl: configured, serverId } = SITE_CONFIG.discord || {};
    if (configured) {
      applyLinks(configured);
      bindCtAs();
      return;
    }
    if (!serverId || serverId === "YOUR_SERVER_ID") return;

    fetch(`https://discord.com/api/guilds/${serverId}/widget.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.instant_invite) {
          applyLinks(data.instant_invite);
          bindCtAs();
        }
      })
      .catch(() => {});
  }

  window.initDiscordGate = resolveInviteUrl;
})();
