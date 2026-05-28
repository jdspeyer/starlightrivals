# Starlight Rivals — Ship Handoff

Marketing site for **Starlight Rivals** (women-only gaming Discord, founded by **Oli**). Static HTML/CSS/JS — no build step. Includes a **Minecraft connection guide + map** subpage and Awwwards-style motion.

**Audience for this doc:** The next agent or developer preparing the site for production launch.

---

## Quick start (local)

```bash
cd /path/to/StarlightRivals
python3 -m http.server 8080
```

Open `http://localhost:8080`

> **Note:** Use a local HTTP server — do not open `index.html` via `file://`. If port 8765 is stuck, try 8080 or run `kill $(lsof -t -i:8765)`.

---

## Recent changes (May 2026 — final polish session)

Everything below was implemented in the last major pass before ship.

### Landing page (`index.html`)

| Change | Details |
|--------|---------|
| **Preloader** | Loading animation **always** plays. **Enter** button only on first visit. Return visitors (`localStorage` `sr-audio-consented`) see full animation then auto-dismiss + music starts. |
| **Footer** | Footer bar content centered (not `space-between`). |
| **Member count** | `about.stats` → **50+ members**. |
| **Navbar** | Links: **about**, **founder** (`#oli`), **discord**, **minecraft**. |
| **Discord invite** | Hardcoded: `https://discord.gg/Z8bnQyh5` on all join CTAs via `js/discord-gate.js`. |
| **Discord join gate** | All Discord buttons open a **Space Cadet Check** modal before redirect. Copy in `discord.gate`. Buttons: **abort launch** / **beam me up**. GSAP animated; cursor z-index fixed above modal. |
| **Feature cards** | Custom PNG art: `card-game-together.png`, `card-women-only.png`, `card-always-something.png`. CSS bottom-left fade mask on images. Subtle hover: image peeks out **top only** (clip-path, no horizontal bleed). Card 1 (women only) offset right/down tuned for transparent padding in PNG. Card 3 (always something) scaled ~75% to match visual weight. |
| **Copy tone** | Lowercase casual voice throughout config. |

### Minecraft page (`minecraft.html`)

Full rework — no longer map-only.

| Section | Details |
|---------|---------|
| **Hero** | Cobblemon background YouTube video (`pack.headerVideoId`: `2tsCcWbiYgA`, starts at **20s** like homepage). Pack logo + name + description in glass card. **No scroll indicator** in hero. |
| **Setup guide** | 6-step Awwwards-style timeline (`minecraft.connectionGuide.steps`). Intro subtext only — no "connection guide" headline. Steps: download pack → get modrinth → import → RAM (4–6 GB) → launch → copy server IP. Magnetic `btn` components on CTAs. |
| **World map** | Bluemap iframe when `minecraft.bluemapUrl` set; else placeholder. Fixed viewport height so toolbar/layout isn't broken. |
| **Site chrome** | Same as landing: custom cursor, grain, audio toggle, mobile Discord CTA, Discord gate, magnetic buttons. Shared via `js/site-chrome.js`. |
| **Music** | **Separate track** on MC page: `minecraft.musicVideoId` = `YMEblRM4pGc`. Homepage uses `musicVideoId` = `uc1f-Msff8Q`. Set via `window.__pageMusicVideoId` before player init; `audio.js` supports `loadVideoById` swap. |
| **Removed** | Nuggie Kingdom status card (discord / back to home / collab block) from MC page middle. |

### Modpack config (current)

```js
pack: {
  name: "cobbleverse x starlight",
  logo: "assets/cobbleverse-starlight.png",
  downloadUrl: "https://storage.googleapis.com/nuggiekingdompack/COBBLEVERSE%20x%20Starlight%201.7.0.mrpack",
  modrinthUrl: "https://modrinth.com/app",
  serverIp: "mc.starlightrivals.com",
  ramMinGb: 4,
  ramMaxGb: 6,
}
```

### GitHub Pages / deploy

| File | Purpose |
|------|---------|
| `.gitignore` | OS/editor/venv ignores |
| `.nojekyll` | Disable Jekyll on GitHub Pages |
| `.github/workflows/deploy-pages.yml` | Auto-deploy on push to `main` |
| `README.md` | Local preview + deploy instructions |
| `CNAME` | `starlightrivals.com` (custom domain) |

Initial git commit on `main` with all site assets.

### New JS files

| File | Role |
|------|------|
| `js/discord-gate.js` | Join confirmation modal + wires all Discord CTA IDs |
| `js/site-chrome.js` | Shared cursor, magnetic buttons, YouTube background embed helper |

---

## Ship checklist (do before launch)

### Required config (`js/config.js`)

| Key | Status | Notes |
|-----|--------|-------|
| `discord.inviteUrl` | **Set** | `https://discord.gg/Z8bnQyh5` |
| `discord.serverId` | Set | `1481186540918018104` — live widget iframe |
| `discord.gate` | Set | Space cadet modal copy |
| `minecraft.pack.downloadUrl` | **Set** | `.mrpack` on GCS — update when pack version bumps |
| `minecraft.pack.serverIp` | Set | `mc.starlightrivals.com` |
| `minecraft.bluemapUrl` | Empty | Set when live map available |
| `minecraft.musicVideoId` | Set | `YMEblRM4pGc` (MC page only) |
| `musicVideoId` | Set | `uc1f-Msff8Q` (homepage) |
| `about.stats[0]` | Set | 50+ members — verify real count |
| `oli.tiktok` | Set | `@olipoppii` |

### Discord widget + join links

1. Widget still used for live preview iframe on homepage
2. Join URLs come from `discord.inviteUrl` via `discord-gate.js` (not widget fetch)
3. All joins intercepted by gate modal unless user confirms

### Assets to verify

| File | Used for |
|------|----------|
| `assets/logo.png` | Favicon, nav, preloader, footer |
| `assets/oli.webp` | Founder section |
| `assets/nuggie-kingdom.png` | Homepage Minecraft card collab footer |
| `assets/cobbleverse-starlight.png` | MC page pack logo |
| `assets/card-game-together.png` | About feature card 1 |
| `assets/card-women-only.png` | About feature card 2 |
| `assets/card-always-something.png` | About feature card 3 |

### Pre-launch QA

- [ ] First visit: preloader animation → **Enter** → music starts
- [ ] Return visit: preloader animation plays → auto-dismiss (no Enter) → music starts
- [ ] Discord gate on every join button (homepage + MC page + mobile CTA)
- [ ] Custom cursor works on Discord gate modal buttons
- [ ] Mute button (desktop bottom-right / mobile above sticky CTA)
- [ ] Mobile hamburger nav
- [ ] Hero video skip at 20s (homepage + MC page)
- [ ] MC page: download pack → `.mrpack` file
- [ ] MC page: copy IP button → `mc.starlightrivals.com`
- [ ] MC page: plays `YMEblRM4pGc` not homepage soundtrack
- [ ] Feature card hover: top-only peek, fade on PNGs
- [ ] `minecraft.html` map embed / placeholder
- [ ] Test iPhone Safari

### Deploy (GitHub Pages)

1. Push to `main`
2. Repo **Settings → Pages → Source → GitHub Actions**
3. Site URL: `https://<user>.github.io/StarlightRivals/` or custom domain via `CNAME`

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Markup | Vanilla HTML (`index.html`, `minecraft.html`) |
| Styles | `css/styles.css`, `css/minecraft-page.css` |
| Scripts | Vanilla JS IIFEs |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth scroll | Lenis (homepage only) |
| Background | Three.js starfield canvas (homepage only) |
| Hero video | YouTube embed via `setupEmbedVideo()` |
| Background music | YouTube IFrame API — page-specific IDs |
| Fonts | Syne + DM Sans (Google Fonts) |

---

## File structure

```
StarlightRivals/
├── index.html
├── minecraft.html
├── HANDOFF.md
├── README.md
├── CNAME                         # starlightrivals.com
├── .nojekyll
├── .gitignore
├── .github/workflows/deploy-pages.yml
├── css/
│   ├── styles.css                # Landing + shared components
│   └── minecraft-page.css        # MC page layout
├── js/
│   ├── config.js                 # ★ Primary content/config surface
│   ├── main.js                   # Preloader, animations, content injection
│   ├── utils.js                  # Rank cards, feature cards
│   ├── nav.js                    # Shared mobile menu
│   ├── site-chrome.js            # Cursor, magnetic, video embed
│   ├── discord-gate.js           # Join confirmation modal
│   ├── audio.js                  # YouTube music (page-aware)
│   ├── text-fit.js               # Hero/manifesto text scaling
│   └── minecraft-page.js         # MC page populate + guide + map
└── assets/
    ├── logo.png
    ├── oli.webp
    ├── nuggie-kingdom.png
    ├── cobbleverse-starlight.png
    ├── card-game-together.png
    ├── card-women-only.png
    └── card-always-something.png
```

---

## Page map (`index.html`)

| Section | ID | Notes |
|---------|-----|-------|
| Preloader | `#preloader` | Always animates; Enter only first visit |
| Hero | `#hero` | YouTube bg, title animation |
| Marquee | — | Scroll-direction ticker |
| About | `#about` | Stats (50+), slanted feature cards w/ PNG art |
| Oli | `#oli` | Founder section (nav label: **founder**) |
| Discord | `#discord` | Pitch + widget; rank cards below |
| Final CTA | `#join` | Secondary join block |
| Minecraft | `#minecraft` | Modded MC card → links to `minecraft.html` |
| Manifesto | `#manifesto` | Parallax typography in footer |
| Footer bar | — | Centered: copyright + Nuggie Kingdom credit |

Sticky mobile **join discord** bar: `#mobileCta`

---

## Page map (`minecraft.html`)

| Section | ID | Notes |
|---------|-----|-------|
| Hero | — | Video bg, pack card (logo, name, description) |
| Setup guide | `#setupGuide` | 6-step timeline, no section title |
| World map | `#worldMap` | Bluemap iframe or placeholder |

Shared chrome: nav, cursor, grain, audio toggle, mobile CTA, Discord gate.

---

## Key config reference (`js/config.js`)

### Media (homepage)

```js
heroVideoId: "yaH9qnvdvkA",
heroVideoStart: 20,
musicVideoId: "uc1f-Msff8Q",
musicVolume: 45,
```

### Discord

```js
discord: {
  inviteUrl: "https://discord.gg/Z8bnQyh5",
  serverId: "1481186540918018104",
  gate: {
    badge: "space cadet check",
    title: "confirm before launch",
    dismissLabel: "abort launch",
    continueLabel: "beam me up",
    // body: ...
  },
}
```

Discord CTA IDs wired in `discord-gate.js`:
`heroDiscordCta`, `navDiscordCta`, `discordCta`, `minecraftDiscordCta`, `finalDiscordCta`, `mobileDiscordCta`, `mapDiscordCta`

### Minecraft

```js
minecraft: {
  musicVideoId: "YMEblRM4pGc",   // MC page background music only
  bluemapUrl: "",                 // Live map embed URL
  pack: {
    name: "cobbleverse x starlight",
    logo: "assets/cobbleverse-starlight.png",
    downloadUrl: "https://storage.googleapis.com/nuggiekingdompack/COBBLEVERSE%20x%20Starlight%201.7.0.mrpack",
    modrinthUrl: "https://modrinth.com/app",
    serverIp: "mc.starlightrivals.com",
    headerVideoId: "2tsCcWbiYgA",
    headerVideoStart: 20,
  },
  connectionGuide: { subtext, steps: [...] },
}
```

Guide step `action` values: `"download"` | `"modrinth"` | `"copyIp"` | `null`

### Preloader + audio consent

```js
preloader: {
  minDurationMs: 2500,
  enterLabel: "enter",
  loadingText: "loading the stars…",
  readyText: "tap enter. we're waiting.",
}
```

- First visit: must click **Enter** (stores `sr-audio-consented` in localStorage)
- Return visits: animation plays, then auto-dismisses; music autoplays if consented

---

## Notable UI behaviors

### Navigation
- Desktop: fixed nav, links top-right
- Mobile: hamburger → full-screen overlay (`js/nav.js`)
- Labels lowercase on homepage nav

### Custom cursor (`js/site-chrome.js`)
- Desktop only; hidden native cursor via `body.no-cursor`
- Hover ring expands on interactive elements (delegated `mousemove` — works on dynamic modal buttons)
- On Discord gate open: cursor z-index 10001, normal blend mode (not `difference`)

### Magnetic buttons
- `[data-magnetic]` on CTAs; init via `initSiteMagnetic()`
- Duplicate-bind guarded with `data-magnetic-bound`

### Feature cards (About)
- PNG character art, right-bound in card
- CSS `mask-image` fade bottom-left → top
- Hover: top-only uncrop via `clip-path` + vertical translate (~6–12px)

### Discord join gate
- Injected modal DOM on first open
- Escape / backdrop dismiss
- Continue opens invite in new tab

### Text tone
- Lowercase casual voice in config copy
- `{curly brace}` highlight syntax in `utils.js` still supported

---

## Z-index reference

| Element | z-index |
|---------|---------|
| Discord gate | 10000 |
| Discord gate open cursor | 10001 |
| Preloader | 9999 |
| Toast (MC copy IP) | 9999 |
| Custom cursor | 300 |
| Nav brand/toggle | 270 |
| Nav overlay | 250 |
| Nav links (mobile) | 260 |
| Nav bar | 200 |
| Audio toggle | 95 |
| Mobile CTA | 90 |

---

## Known issues / tuning notes

1. **Hero video start** — Both pages use 20s skip; bump `heroVideoStart` / `pack.headerVideoStart` if intros still show
2. **MC music swap** — Requires hard refresh or new tab if coming from homepage; `audio.js` uses `__pageMusicVideoId` + `loadVideoById`
3. **YouTube embeds** — Some videos block embedding; test both music IDs
4. **Modpack URL** — Update `pack.downloadUrl` when releasing new pack versions
5. **Member stats** — Currently 50+; verify against real Discord count
6. **Cache busting** — Styles/scripts use `?v=` query params on some files; bump when deploying CSS/JS changes
7. **OG/meta** — Basic HTML meta only; no dynamic OG image

---

## Suggested next steps (post-handoff)

- [ ] Set `minecraft.bluemapUrl` when map is live
- [ ] Verify modpack download works end-to-end in Modrinth
- [ ] Confirm `starlightrivals.com` DNS → GitHub Pages
- [ ] Test Discord gate + invite on mobile Safari
- [ ] Optional: analytics (Plausible/GA), OG/Twitter cards

---

## Contacts

| Role | Notes |
|------|-------|
| **Oli** | Founder, Starlight Rivals Discord — [@olipoppii](https://www.tiktok.com/@olipoppii) |
| **Nuggie Kingdom** | Site dev credit + MC collab — [discord.nuggiekingdom.com](https://discord.nuggiekingdom.com/) |

---

*Last updated: May 2026 — final polish: Discord gate, MC connection guide, feature card art, GitHub Pages deploy, page-specific music.*
