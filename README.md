# TEDxEmiratesHills Event Hub

Official single-page archive for TEDxEmiratesHills events across all past editions (2026, 2025, 2024), built for **[event.tedxemirateshills.com](https://event.tedxemirateshills.com)**.

## Features
- **Reverse Chronological**: 2026 (top), 2025 (middle), 2024 (bottom).
- **2027 Ready**: Easily add the 2027 edition at the top next year.
- **Fast & Lightweight**: Zero external frameworks, pure semantic HTML5, CSS3, and vanilla JS.
- **Self-Contained**: All 57 speaker portraits, chief guest assets, performer images, and partner logos are locally bundled.
- **Interactive**: Sticky year navigation with scroll spy, live search filter, and image error handling.

## Deployment on GitHub Pages

1. Create a repository on GitHub (e.g. `tedxemirateshills-event`).
2. Push this repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of TEDxEmiratesHills Event Hub"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In GitHub repo settings, go to **Pages** > **Build and deployment** > Source: `Deploy from a branch` (`main` / `root`).
4. Under **Custom domain**, enter `event.tedxemirateshills.com` (already preconfigured in `CNAME`).
5. In your DNS (Hostinger / Cloudflare), add a `CNAME` record:
   - **Host / Name**: `event`
   - **Target**: `<your-username>.github.io`
