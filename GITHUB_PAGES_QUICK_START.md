# Quick Start: GitHub Pages Deployment

## TL;DR - 5 Minute Setup

### 1. Create Repository
```bash
# On GitHub, create a NEW REPO (don't initialize)
# Pick a name: 
#   - YOUR_USERNAME.github.io (for free *.github.io domain)
#   - portfolio (or any name - you'll use a basePath)
```

### 2. Push Code
```bash
cd c:\Users\imdop\Documents\portfolio-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Set **Source** to: Deploy from a branch
3. Select **gh-pages** branch + **root** folder
4. Save ✅

### 4. Done! 🎉
- **If repo is `username.github.io`:** Visit https://YOUR_USERNAME.github.io
- **If repo is `portfolio`:** Edit `next.config.js` and set `basePath: '/portfolio'`, then visit https://YOUR_USERNAME.github.io/portfolio

---

## Important: basePath Configuration

**Check your GitHub repository name:**

- ✅ **If named `YOUR_USERNAME.github.io`** → No changes needed
- ⚠️ **If named anything else** → Uncomment basePath in `next.config.js`:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/portfolio', // ← Change 'portfolio' to your repo name
  // ...
};
```

Then push the change:
```bash
git add next.config.js
git commit -m "Add basePath for GitHub Pages"
git push
```

---

## Watch Your Deployment

1. Go to your repo
2. Click **Actions** tab
3. Watch the workflow build and deploy automatically
4. Once green ✓, your site is live!

---

## Test Locally (Optional)

```bash
# Build static files
npm run build

# Serve locally
npx serve@latest out

# Visit http://localhost:3000
```

---

## What Changed?

| File | Change |
|------|--------|
| `next.config.js` | Added `output: 'export'` and `unoptimized: true` |
| `package.json` | Added `"export"` script |
| `.github/workflows/deploy.yml` | Automatic GitHub Actions deployment |
| `GITHUB_PAGES_DEPLOYMENT.md` | Full deployment documentation |
| `public/.nojekyll` | Ensures GitHub Pages serves correctly |

---

## Next Steps

1. ✅ Push your code to GitHub
2. ✅ GitHub Actions automatically builds & deploys
3. ✅ Visit your live portfolio!
4. (Optional) Set up custom domain in Settings → Pages

---

**For full details, see: `GITHUB_PAGES_DEPLOYMENT.md`**
