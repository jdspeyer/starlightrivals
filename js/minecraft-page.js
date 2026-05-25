(function () {
  const cfg = SITE_CONFIG;
  const mc = cfg.minecraft;

  document.getElementById("mapHeadline").textContent = mc.mapHeadline || mc.headline || "Modded Minecraft";
  document.getElementById("mapSub").textContent = mc.mapSubtext || mc.subtext;

  const statusText = document.getElementById("mapStatusText");
  if (statusText) statusText.textContent = mc.status;

  const steps = document.getElementById("mapSteps");
  if (steps) steps.innerHTML = mc.steps.map((s) => `<li>${s}</li>`).join("");

  const nkLogo = document.getElementById("mapNkLogo");
  if (nkLogo) nkLogo.src = cfg.assets.nuggieKingdom;

  const nkLink = document.getElementById("mapNkLink");
  if (nkLink) nkLink.href = mc.nuggieUrl || cfg.assets.nuggieDiscordUrl || "#";

  const placeholderText = document.getElementById("mapPlaceholderText");
  if (placeholderText) {
    placeholderText.textContent = mc.mapPlaceholderText || "Map coming soon…";
  }

  document.querySelectorAll(".logo-img").forEach((img) => {
    img.src = cfg.assets.logo;
  });

  if (typeof window.initDiscordGate === "function") window.initDiscordGate();

  const url = mc.bluemapUrl;
  const viewport = document.getElementById("mapViewport");
  const placeholder = document.getElementById("mapPlaceholder");
  const status = document.getElementById("mapStatus");

  if (url) {
    placeholder.remove();
    status.textContent = "Live map connected";
    viewport.innerHTML = `<iframe src="${url}" title="Minecraft world map" allow="fullscreen" loading="lazy"></iframe>`;
  }

  if (typeof window.initSiteNav === "function") {
    window.initSiteNav();
  }
})();
