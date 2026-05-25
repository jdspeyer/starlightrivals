# Starlight Rivals

Static marketing site for **Starlight Rivals** — a women-only gaming Discord community.

No build step. Plain HTML, CSS, and JavaScript.

## Local preview

```bash
python3 -m http.server 8765
```

Open [http://localhost:8765](http://localhost:8765)

## Deploy to GitHub Pages

### 1. Create the repo & push

```bash
git init
git add .
git commit -m "Initial commit — Starlight Rivals site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/StarlightRivals.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` — the included workflow deploys automatically

Your site will be live at:

```
https://YOUR_USERNAME.github.io/StarlightRivals/
```

### Custom domain (optional)

Add a `CNAME` file to the repo root with your domain, then configure DNS in your registrar. See [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Configuration

Edit `js/config.js` for Discord invite, copy, stats, Minecraft map URL, and social links.

See `HANDOFF.md` for a full launch checklist.

## Structure

```
index.html          Landing page
minecraft.html      Minecraft server + map page
css/                Stylesheets
js/                 Scripts (config.js is the source of truth)
assets/             Images and logos
```
