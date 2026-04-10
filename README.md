# Rootz Dashboard V6 — Deploy Artifact

Built from the private `rootz-v6` monorepo. This repo contains only the Vite build output (static files) served by nginx on `dashboard.rootz.global` and `addin.rootz.global`.

## Deploy

From the `rootz-v6` directory:

```bash
bash scripts/deploy-dashboard.sh
```

Or manually:

```bash
# 1. Build
cd rootz-v6/dashboard && npm run build

# 2. Copy to this repo
cp -r dist/* ../dashboard-deploy/
cp config.json ../dashboard-deploy/
cp ../dashboard-deploy/index.html ../dashboard-deploy/taskpane.html

# 3. Commit + push
cd ../dashboard-deploy
git add -A && git commit -m "Deploy dashboard $(date +%Y-%m-%d)" && git push

# 4. Pull on server
ssh discover "cd /var/www/dashboard && sudo git pull origin main"
```

## Server

- **dashboard.rootz.global** — served from `/var/www/dashboard/`
- **addin.rootz.global** — symlink to same directory (Word Add-in)
- **Server**: 141.148.25.214 (Oracle VPS)

## Files

- `index.html` — Dashboard entry point
- `taskpane.html` — Copy of index.html for Office Add-in
- `assets/` — Bundled JS + CSS (Vite output)
- `config.json` — Network configuration (contract addresses, RPC URLs)
