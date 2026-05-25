function parseHighlights(text) {
  return text.replace(/\{([^}]+)\}/g, '<span class="text-highlight">$1</span>');
}

function renderStats(stats) {
  return stats
    .map((s, i) => {
      if (s.symbol) {
        return `<div class="stat" data-stat-index="${i}">
          <span class="stat__value stat__value--symbol" data-symbol="${s.symbol}">${s.symbol}</span>
          <span class="stat__label">${s.label}</span>
        </div>`;
      }
      return `<div class="stat" data-stat-index="${i}">
        <span class="stat__value" data-count="${s.numeric}" data-suffix="${s.suffix || ""}">0${s.suffix || ""}</span>
        <span class="stat__label">${s.label}</span>
      </div>`;
    })
    .join("");
}

const RANK_FX = {
  starling: `<span class="rank-card__star"></span><span class="rank-card__star"></span><span class="rank-card__star"></span><span class="rank-card__star"></span><span class="rank-card__star"></span>`,
  moonling: `<span class="rank-card__moon"></span><span class="rank-card__orbit"><span class="rank-card__orbit-dot"></span></span>`,
  dreamling: `<span class="rank-card__nebula"></span><span class="rank-card__aurora"></span><span class="rank-card__spark"></span><span class="rank-card__spark"></span><span class="rank-card__spark"></span>`,
};

function renderDiscordRanks(ranks) {
  return ranks
    .map(
      (r) => `
    <div class="rank-card rank-card--${r.theme || "starling"}">
      <div class="rank-card__fx" aria-hidden="true">${RANK_FX[r.theme] || RANK_FX.starling}</div>
      <span class="rank-card__tier">${r.tier}</span>
      <h4 class="rank-card__name">${r.name}</h4>
      ${r.tagline ? `<p class="rank-card__tagline">${r.tagline}</p>` : ""}
      <p class="rank-card__blurb">${r.blurb}</p>
    </div>`
    )
    .join("");
}

function renderFeatureCards(features) {
  return features
    .map((f, i) => {
      const character = f.character
        ? `<div class="feature-card__character"><img src="${f.character}" alt="" loading="lazy"></div>`
        : "";
      return `
    <article class="feature-card feature-card--${i}" data-feature="${i}">
      <div class="feature-card__glow" aria-hidden="true"></div>
      <div class="feature-card__shape">
        <div class="feature-card__bg">
          <span class="feature-card__accent" aria-hidden="true"></span>
          <span class="feature-card__index">0${i + 1}</span>
          ${character}
          <div class="feature-card__content">
            <h3>${f.title}</h3>
            <p>${f.text}</p>
          </div>
        </div>
      </div>
    </article>`;
    })
    .join("");
}

function splitHeroTitle() {
  document.querySelectorAll(".hero__title .line").forEach((line) => {
    const word = line.querySelector(".reveal-word");
    if (!word) return;
    word.innerHTML = word.textContent
      .split("")
      .map((ch) => `<span class="hero-char">${ch === " " ? "&nbsp;" : ch}</span>`)
      .join("");
    word.classList.remove("reveal-word");
  });
}
