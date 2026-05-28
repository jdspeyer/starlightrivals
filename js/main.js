/**
 * STARLIGHT RIVALS — Main Script
 */

(function () {
  "use strict";

  const cfg = SITE_CONFIG;
  let lenisInstance = null;
  let marqueeX = 0;
  let marqueeDirection = 1;

  function populateContent() {
    document.title = cfg.meta.title;
    document.querySelector('meta[name="description"]').content = cfg.meta.description;
    document.querySelector('meta[name="theme-color"]').content = cfg.meta.themeColor;

    document.querySelectorAll(".logo-img").forEach((img) => {
      img.src = cfg.assets.logo;
    });

    document.getElementById("heroTagline").textContent = cfg.tagline;
    document.getElementById("aboutHeadline").textContent = cfg.about.headline;
    document.getElementById("aboutP1").textContent = cfg.about.paragraphs[0];
    document.getElementById("aboutP2").textContent = cfg.about.paragraphs[1];
    document.getElementById("aboutStats").innerHTML = renderStats(cfg.about.stats);
    document.getElementById("aboutCards").innerHTML = renderFeatureCards(cfg.about.features);

    document.getElementById("oliName").textContent = cfg.oli.name;
    document.getElementById("oliRole").textContent = cfg.oli.role;
    document.getElementById("oliQuote").textContent = cfg.oli.quote;
    document.getElementById("oliBio").textContent = cfg.oli.bio;
    document.getElementById("oliAvatar").src = cfg.oli.avatar;
    document.getElementById("oliAvatar").alt = `${cfg.oli.name}, founder of ${cfg.name}`;

    const tiktok = document.getElementById("oliTiktok");
    if (cfg.oli.tiktok) tiktok.href = cfg.oli.tiktok;
    else tiktok.style.display = "none";

    document.getElementById("discordHeadline").textContent = cfg.discord.headline;
    document.getElementById("discordSub").textContent = cfg.discord.subtext;
    document.getElementById("discordFeatures").innerHTML = cfg.discord.features.map((f) => `<li>${f}</li>`).join("");
    document.getElementById("discordRanksHeadline").textContent = cfg.discord.ranksHeadline || "Our ranks";
    document.getElementById("discordRanksIntro").textContent = cfg.discord.ranksIntro || "";
    document.getElementById("discordRanks").innerHTML = renderDiscordRanks(cfg.discord.ranks);

    document.getElementById("minecraftHeadline").textContent = cfg.minecraft.headline;
    document.getElementById("minecraftSub").textContent = cfg.minecraft.subtext;
    document.getElementById("minecraftStatusText").textContent = cfg.minecraft.status;
    document.getElementById("minecraftSteps").innerHTML = cfg.minecraft.steps.map((s) => `<li>${s}</li>`).join("");
    document.getElementById("minecraftMapCta").href = cfg.minecraft.mapPageUrl || "minecraft.html";

    const nkLogo = document.getElementById("nkLogo");
    if (nkLogo) nkLogo.src = cfg.assets.nuggieKingdom;

    const nkLink = document.getElementById("nkLink");
    if (nkLink) {
      nkLink.href = cfg.minecraft.nuggieUrl || cfg.assets.nuggieDiscordUrl || "#";
    }

    const ctaFinal = document.getElementById("ctaFinalText");
    if (ctaFinal && cfg.ctaFinalText) ctaFinal.textContent = cfg.ctaFinalText;

    const preloaderText = document.getElementById("preloaderText");
    if (preloaderText && cfg.preloader?.loadingText) {
      preloaderText.textContent = cfg.preloader.loadingText;
    }

    const enterBtn = document.getElementById("preloaderEnter");
    if (enterBtn && cfg.preloader?.enterLabel) {
      const label = enterBtn.querySelector(".preloader__enter-label");
      if (label) label.textContent = cfg.preloader.enterLabel;
    }

    const heroBadge = document.querySelector(".hero__badge");
    if (heroBadge && cfg.heroBadge) heroBadge.textContent = cfg.heroBadge;

    document.getElementById("footerName").textContent = cfg.name;
    document.getElementById("footerYear").textContent = new Date().getFullYear();

    const footerNk = document.getElementById("footerNkCredit");
    if (footerNk && cfg.footer) {
      footerNk.textContent = cfg.footer.developedBy || "Nuggie Kingdom";
      footerNk.href = cfg.footer.developedByUrl || cfg.minecraft.nuggieUrl || cfg.assets.nuggieDiscordUrl || "#";
    }

    splitHeroTitle();
    if (typeof window.initDiscordGate === "function") window.initDiscordGate();
    setupDiscordWidget();
    setupSocialLinks();
    setupHeroVideo();
  }

  function setupDiscordWidget() {
    const container = document.getElementById("discordWidget");
    if (!container) return;
    const serverId = cfg.discord.serverId;
    if (serverId && serverId !== "YOUR_SERVER_ID") {
      container.innerHTML = `<iframe
        src="https://discord.com/widget?id=${serverId}&theme=dark"
        allowtransparency="true"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        title="Discord Server Widget"
      ></iframe>`;
    }
  }

  function setupSocialLinks() {
    const social = cfg.links;
    const container = document.getElementById("footerSocial");
    const entries = [
      { key: "twitter", label: "Twitter" },
      { key: "instagram", label: "Instagram" },
      { key: "tiktok", label: "TikTok" },
    ].filter((e) => social[e.key]);
    if (!entries.length) return;
    container.innerHTML = entries
      .map((e) => `<a href="${social[e.key]}" target="_blank" rel="noopener noreferrer">${e.label}</a>`)
      .join("");
  }

  function setupHeroVideo() {
    if (typeof window.setupEmbedVideo === "function") {
      window.setupEmbedVideo("heroVideo", cfg.heroVideoId, cfg.heroVideoStart);
    }
  }

  const AUDIO_CONSENT_KEY = "sr-audio-consented";

  function grantAudioConsent() {
    try {
      localStorage.setItem(AUDIO_CONSENT_KEY, "1");
    } catch (e) {}
  }

  function hasAudioConsent() {
    try {
      return localStorage.getItem(AUDIO_CONSENT_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function initPreloader(onComplete) {
    const returning = hasAudioConsent();
    const preloader = document.getElementById("preloader");
    const percentEl = document.getElementById("preloaderPercent");
    const barEl = document.getElementById("preloaderBar");
    const enterBtn = document.getElementById("preloaderEnter");
    const preloaderText = document.getElementById("preloaderText");
    const minDuration = cfg.preloader?.minDurationMs || 2500;
    const startTime = Date.now();
    let ready = false;

    let displayProgress = 0;
    let assetProgress = 0;

    function setProgress(value) {
      displayProgress = Math.min(Math.round(value), 100);
      percentEl.textContent = displayProgress;
      barEl.style.width = `${displayProgress}%`;
    }

    function trackAssets() {
      const urls = [cfg.assets.logo, cfg.oli.avatar, cfg.assets.nuggieKingdom];
      let loaded = 0;
      const total = urls.length;

      if (total === 0) {
        assetProgress = 100;
        return;
      }

      urls.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          assetProgress = (loaded / total) * 100;
        };
        img.src = src;
      });
    }

    trackAssets();
    setProgress(0);

    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = (elapsed / minDuration) * 100;
      setProgress(Math.min(assetProgress, timeProgress) * 0.92);
    }, 40);

    function finishLoading() {
      if (ready) return;
      ready = true;
      clearInterval(tick);
      setProgress(100);

      if (returning) {
        if (typeof window.startSiteMusic === "function") window.startSiteMusic();
        dismiss();
        return;
      }

      if (preloaderText && cfg.preloader?.readyText) {
        preloaderText.textContent = cfg.preloader.readyText;
      }
      if (enterBtn) {
        enterBtn.hidden = false;
        gsap.fromTo(enterBtn, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
      }
    }

    function dismiss() {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          preloader.classList.add("hidden");
          document.body.classList.remove("loading");
          document.body.classList.add("loaded");
          onComplete();
        },
      });
    }

    window.addEventListener("load", () => {
      const elapsed = Date.now() - startTime;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(finishLoading, wait);
    });

    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
        if (!ready) return;
        grantAudioConsent();
        if (typeof window.startSiteMusic === "function") window.startSiteMusic();
        dismiss();
      });
    }
  }

  function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const starCount = window.innerWidth < 768 ? 800 : 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const palette = [new THREE.Color("#a78bfa"), new THREE.Color("#f472b6"), new THREE.Color("#22d3ee"), new THREE.Color("#ffffff")];

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({
      size: 0.025, vertexColors: true, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    let mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    });

    const stars = scene.children[0];
    (function animate() {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0003 + mouseX * 0.001;
      stars.rotation.x += 0.0001 + mouseY * 0.001;
      renderer.render(scene, camera);
    })();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  function initLenis() {
    if (typeof Lenis === "undefined") return null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      marqueeDirection = e.direction >= 0 ? 1 : -1;
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  function initMarquee() {
    const track = document.getElementById("marqueeTrack");
    if (!track) return;
    const trackWidth = track.scrollWidth / 2;
    const speed = 0.6;
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y !== lastScrollY) {
        marqueeDirection = y > lastScrollY ? 1 : -1;
        lastScrollY = y;
      }
    }, { passive: true });

    gsap.ticker.add(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      marqueeX -= speed * marqueeDirection;
      if (marqueeX <= -trackWidth) marqueeX += trackWidth;
      if (marqueeX >= 0) marqueeX -= trackWidth;
      gsap.set(track, { x: marqueeX });
    });
  }

  function initStatCounters() {
    document.querySelectorAll(".stat__value[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      ScrollTrigger.create({
        trigger: el.closest(".about__stats"), start: "top 85%", once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target, duration: 2, ease: "power2.out",
            onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix; },
          });
        },
      });
    });
    document.querySelectorAll(".stat__value--symbol").forEach((el) => {
      ScrollTrigger.create({
        trigger: el.closest(".about__stats"), start: "top 85%", once: true,
        onEnter: () => gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(2)" }),
      });
    });
  }

  function initTextHighlights() {
    document.querySelectorAll(".text-highlight").forEach((el) => {
      gsap.fromTo(el, { opacity: 0.25, filter: "blur(4px)" }, {
        opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
      });
    });
  }

  function initHeroEffects(reducedMotion) {
    if (reducedMotion) return;
    const title = document.getElementById("heroTitle");
    gsap.from(title.querySelectorAll(".hero-char"), {
      yPercent: 120, rotateX: -80, opacity: 0, duration: 1.1,
      stagger: { each: 0.035, from: "random" }, ease: "power4.out", delay: 0.2,
    });
    gsap.to(".line--accent .hero-char", {
      y: "+=6", duration: 2, stagger: { each: 0.08, repeat: -1, yoyo: true }, ease: "sine.inOut", delay: 1.2,
    });
    gsap.to(".hero__shimmer", { xPercent: 200, duration: 3, repeat: -1, ease: "none" });
    gsap.to(".hero__orbit span", { rotation: 360, duration: 18, repeat: -1, ease: "none", stagger: 0.4 });
    document.addEventListener("mousemove", (e) => {
      gsap.to(title, {
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
        duration: 0.8, ease: "power2.out",
      });
    });
  }

  function initManifesto() {
    document.querySelectorAll(".manifesto__line").forEach((line, i) => {
      gsap.fromTo(line, { xPercent: i % 2 === 0 ? -40 : 40, opacity: 0.1 }, {
        xPercent: i % 2 === 0 ? 8 : -8, opacity: 1, ease: "none",
        scrollTrigger: { trigger: ".manifesto--footer", start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
    });
  }

  function initFeatureCards() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.querySelectorAll(".feature-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }

  function initTextFit() {
    if (typeof window.fitAllText !== "function") return;
    window.fitAllText();
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(window.fitAllText, 120);
    });
  }

  function initAnimations(lenis) {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set(".reveal-up, .reveal-text, .hero-char, .text-highlight", { opacity: 1, clearProps: "all" });
    } else {
      gsap.to(".hero .reveal-text", {
        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15,
      });
      gsap.to(".hero__video-wrap", {
        scale: 1.15, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }

    initHeroEffects(reducedMotion);
    initMarquee();
    initStatCounters();
    initTextHighlights();
    initManifesto();
    initFeatureCards();
    initTextFit();

    gsap.utils.toArray(".reveal-up").forEach((el) => {
      if (reducedMotion) return;
      gsap.fromTo(el, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    if (!reducedMotion) {
      gsap.from(".cta-final__inner", {
        scale: 0.92, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-final__inner", start: "top 85%" },
      });
    }

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => document.getElementById("nav").classList.toggle("scrolled", self.scroll() > 50),
    });

    const mobileCta = document.getElementById("mobileCta");
    ScrollTrigger.create({
      trigger: "#hero", start: "bottom top",
      onEnter: () => mobileCta.classList.add("visible"),
      onLeaveBack: () => mobileCta.classList.remove("visible"),
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -72 });
        else target.scrollIntoView({ behavior: "smooth" });
        if (typeof window.closeMobileNav === "function") window.closeMobileNav();
      });
    });
  }

  function initCursor() {
    if (typeof window.initSiteCursor === "function") window.initSiteCursor();
  }

  function initMagnetic() {
    if (typeof window.initSiteMagnetic === "function") window.initSiteMagnetic();
  }

  function boot() {
    initStarfield();
    lenisInstance = initLenis();
    initAnimations(lenisInstance);
    initCursor();
    initMagnetic();
    if (typeof window.initSiteNav === "function") window.initSiteNav();
    if (typeof window.initSiteAudio === "function") window.initSiteAudio();
    ScrollTrigger.refresh();
    requestAnimationFrame(() => {
      if (typeof window.fitAllText === "function") window.fitAllText();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    populateContent();
    initPreloader(boot);
  });
})();
