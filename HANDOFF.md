# Starlight Rivals — Ship Handoff

Marketing site for **Starlight Rivals** (women-only gaming Discord, founded by **Oli**). Static HTML/CSS/JS — no build step. Includes a **Minecraft map** subpage and Awwwards-style motion.

**Audience for this doc:** The next agent or developer preparing the site for production launch.

---

## Quick start (local)

```bash
cd /Users/jake/Desktop/StarlightRivals
python3 -m http.server 8765
```

Open `http://localhost:8765`

---

## Ship checklist (do before launch)

### Required config (`js/config.js`)

| Key | Status | Notes |
|-----|--------|-------|
| `discord.serverId` | Set | `1481186540918018104` — used for live widget iframe |
| `discord.inviteUrl` | **Needs invite** | Auto-fetched from widget API when [Server Widget is enabled](https://support.discord.com/hc/en-us/articles/228383668-Enabling-Community-for-Your-Server). If widget is disabled, set a manual `https://discord.gg/...` URL |
| `minecraft.nuggieUrl` | Set | `https://discord.nuggiekingdom.com/` |
| `assets.nuggieDiscordUrl` | Set | Same as above |
| `footer.developedByUrl` | Set | Nuggie Kingdom credit link |
| `oli.tiktok` | **Placeholder** | Replace `YOUR_TIKTOK_HANDLE` |
| `minecraft.bluemapUrl` | Empty | Set when a MC season is live; until then map page shows "Map coming soon…" |
| `about.stats` | Placeholder | Update member count etc. to real numbers |

### Discord widget + join links

1. In Discord: **Server Settings → Widget → Enable Server Widget**
2. On load, `main.js` calls `resolveDiscordInvite()` which hits `https://discord.com/api/guilds/{serverId}/widget.json` and sets all Discord CTAs to `instant_invite`
3. If widget stays disabled, join buttons will not work until `discord.inviteUrl` is set manually

### Assets to verify

| File | Used for |
|------|----------|
| `assets/logo.png` | Favicon, nav, preloader, footer, feature cards |
| `assets/oli.webp` | Oli section + feature card art |
| `assets/nuggie-kingdom.png` | Minecraft card + optional footer link styling |

### Pre-launch QA

- [ ] First visit: preloader → **Enter** → music starts, site loads
- [ ] Return visit: preloader skipped, music auto-plays (localStorage `sr-audio-consented`)
- [ ] Mute button (bottom-right desktop / above mobile CTA on phone)
- [ ] Mobile hamburger nav: black overlay, centered links
- [ ] Hero video starts at **20s** (`heroVideoStart`) — adjust if trailers still show
- [ ] Discord section: copy + widget side-by-side; rank cards full width below
- [ ] Minecraft card vertically centered in its section
- [ ] `minecraft.html` map placeholder / live embed
- [ ] All Discord CTAs open correct invite
- [ ] Test iPhone Safari (primary audience)

### Deploy

Upload the **entire folder** to any static host:

- Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.
- No build command — publish root as-is
- Ensure `index.html` is the default document

Suggested custom domain setup + HTTPS via host dashboard.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Markup | Vanilla HTML (`index.html`, `minecraft.html`) |
| Styles | `css/styles.css`, `css/minecraft-page.css` |
| Scripts | Vanilla JS IIFEs |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth scroll | Lenis |
| Background | Three.js starfield canvas |
| Hero video | YouTube embed (`heroVideoId`) |
| Background music | YouTube IFrame API (`musicVideoId`) |
| Fonts | Syne + DM Sans (Google Fonts) |

All CDN scripts are loaded from `index.html`.

---

## File structure

```
StarlightRivals/
├── index.html              # Landing page
├── minecraft.html          # World map page
├── HANDOFF.md              # This document
├── css/
│   ├── styles.css          # Landing styles (~2000 lines)
│   └── minecraft-page.css  # Map page
├── js/
│   ├── config.js           # ★ Primary content/config surface
│   ├── main.js             # Preloader, animations, cursor, content injection
│   ├── utils.js            # Rank cards, feature cards, highlight parser
│   ├── nav.js              # Shared mobile menu
│   ├── audio.js            # YouTube background music + mute toggle
│   ├── text-fit.js         # Hero/manifesto text scaling
│   └── minecraft-page.js   # Map page config
└── assets/
    ├── logo.png
    ├── oli.webp
    └── nuggie-kingdom.png
```

---

## Page map (`index.html`)

| Section | ID | Notes |
|---------|-----|-------|
| Preloader | `#preloader` | Progress bar → **Enter** button → starts music |
| Hero | `#hero` | YouTube bg video, title animation |
| Marquee | — | Scroll-direction ticker |
| About | `#about` | Copy, stats, Valorant-style feature cards |
| Oli | `#oli` | Founder quote (Oli's voice), plain portrait |
| Discord | `#discord` | Top row: pitch + live widget; below: ranks header + cards |
| Final CTA | `#join` | Secondary join block |
| Minecraft | `#minecraft` | Modded MC card, NK collab footer |
| Manifesto | `#manifesto` | Large parallax typography (in site footer) |
| Footer bar | — | Copyright + **Developed by Nuggie Kingdom** |

Sticky mobile **Join Discord** bar: `#mobileCta`

---

## Key config reference (`js/config.js`)

### Media

```js
heroVideoId: "yaH9qnvdvkA",
heroVideoStart: 20,        // Skip intro logos/trailers — tune if needed
musicVideoId: "uc1f-Msff8Q",
musicVolume: 45,
```

### Discord

```js
discord: {
  serverId: "1481186540918018104",
  inviteUrl: "",             // Auto-filled when widget enabled
  ranksHeadline: "...",
  ranksIntro: "...",
  ranks: [ Starling, Moonling, Dreamling ],
}
```

### Minecraft

```js
minecraft: {
  bluemapUrl: "",            // Set to embed live map
  mapPlaceholderText: "Map coming soon…",
  nuggieUrl: "https://discord.nuggiekingdom.com/",
}
```

### Preloader + audio consent

```js
preloader: {
  minDurationMs: 2500,
  enterLabel: "Enter",
  loadingText: "Loading the stars…",
  readyText: "Tap enter. We're waiting.",
}
```

- First visit: user must click **Enter** (unlocks audio via user gesture)
- Consent stored in `localStorage` key `sr-audio-consented`
- Return visits: skip preloader, auto-play music

### Footer credit

```js
footer: {
  developedBy: "Nuggie Kingdom",
  developedByUrl: "https://discord.nuggiekingdom.com/",
}
```

---

## Notable UI behaviors

### Navigation
- Desktop: fixed nav bar, links top-right
- Mobile: hamburger → full-screen black overlay (`js/nav.js`)
- Overlay/links moved **outside** `<header>` to avoid `backdrop-filter` breaking `position: fixed`

### Custom cursor
- Desktop only (`z-index: 300`, above nav at 200)
- Magnetic buttons via `[data-magnetic]`

### Feature cards (About)
- Valorant-style slanted cards with character art upper-right
- Staggered on desktop, stacked on mobile

### Rank cards (Discord)
- Space-themed idle animations (starling / moonling / dreamling)
- Full-width row below Discord pitch + widget

### Text tone
- Written in Oli's casual/unhinged voice
- No em-dash "AI" phrasing — plain sentences
- `{curly brace}` highlight syntax still works in `utils.js` but most copy no longer uses it

---

## Minecraft map page (`minecraft.html`)

- Same mobile nav as landing page
- Embeds iframe when `minecraft.bluemapUrl` is set
- Otherwise shows **Map coming soon…** placeholder
- Config injected via `minecraft-page.js`

---

## Z-index reference

| Element | z-index |
|---------|---------|
| Preloader | 9999 |
| Custom cursor | 300 |
| Nav brand/toggle | 270 |
| Nav overlay | 250 |
| Nav links (mobile) | 260 |
| Nav bar | 200 |
| Audio toggle | 95 |
| Mobile CTA | 90 |

---

## Known issues / tuning notes

1. **Hero video start time** — `heroVideoStart: 20` may still show trailers on some loops; increase in config if needed
2. **Discord invite** — Requires widget enabled OR manual `inviteUrl`
3. **YouTube music** — Depends on YouTube embed availability; some videos block embedding
4. **Member stats** — Hardcoded placeholders in `about.stats`; update before launch
5. **OG/meta tags** — Basic HTML meta only; no dynamic OG image generation yet

---

## Suggested next steps (post-handoff)

- [ ] Final Discord invite URL confirmed and tested
- [ ] Replace Oli TikTok URL
- [ ] Real member stats
- [ ] `bluemapUrl` when MC season live
- [ ] Custom domain + deploy
- [ ] Optional: OG/Twitter meta, analytics (Plausible/GA), favicon refresh
- [ ] Optional: swap feature card character art for game-specific PNGs

---

## Contacts

| Role | Notes |
|------|-------|
| **Oli** | Founder, Starlight Rivals Discord |
| **Nuggie Kingdom** | Site development credit; Minecraft collab — [discord.nuggiekingdom.com](https://discord.nuggiekingdom.com/) |

---

*Last updated: May 2026 — ship handoff after UI polish, audio, Discord layout, and content pass.*
