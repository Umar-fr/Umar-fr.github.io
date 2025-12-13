# Deployment Guide - GitHub Pages

## Prerequisites

- A GitHub account
- Git installed locally
- Node.js 18+ installed

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
cd portfolio-app
git init
git add .
git commit -m "Initial portfolio commit"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name options:**
   - **If using GitHub Pages with custom domain:** `portfolio` (any name)
   - **If using GitHub Pages with free domain:** `YOUR_USERNAME.github.io` (must match exactly)

3. Keep it public
4. Don't initialize with README (you already have one)
5. Click "Create repository"

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Configure GitHub Pages Settings

### 2.1 Repository Settings

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Source:**
   - Select: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**
4. Click **Save**

> Note: The GitHub Actions workflow will automatically create the `gh-pages` branch

### 2.2 If Using Project Repo (not username.github.io)

If your repo name is `portfolio` (not `YOUR_USERNAME.github.io`), you need to set a basePath:

**Edit `next.config.js`:**
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/portfolio', // Change to your repo name
  images: {
    unoptimized: true,
    // ... rest of config
  },
};
```

Then commit and push:
```bash
git add next.config.js
git commit -m "Configure basePath for GitHub Pages"
git push
```

## Step 3: Deploy with GitHub Actions

The workflow is automatic! Here's what happens:

1. **Every push to `main` branch** triggers the deployment
2. **GitHub Actions:**
   - Installs dependencies
   - Builds your Next.js app (static export)
   - Uploads to `gh-pages` branch
3. **Your portfolio goes live** automatically

### Monitor Deployment

1. Go to your repository
2. Click **Actions** tab
3. Watch the workflow run
4. Once complete, your site is live!

## Step 4: Access Your Portfolio

### Option A: GitHub Pages URL
- **For `username.github.io`:** https://YOUR_USERNAME.github.io
- **For project repo:** https://YOUR_USERNAME.github.io/portfolio

### Option B: Custom Domain (Optional)

1. Go to Settings → Pages
2. Under **Custom domain**, enter your domain (e.g., `yourname.com`)
3. Click **Save**
4. Update your domain DNS:
   - A records: Point to GitHub's IP addresses
   - Or use CNAME: `YOUR_USERNAME.github.io`

See [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for detailed DNS setup.

## Making Updates

After initial setup, updates are simple:

```bash
# Edit your portfolio files
# ...

# Commit and push
git add .
git commit -m "Update portfolio content"
git push
```

Your site automatically redeploys within minutes! ✨

## Deployment Workflow Overview

```
You push to main
    ↓
GitHub Actions triggered
    ↓
npm install
    ↓
npm run build (static export)
    ↓
Upload to gh-pages branch
    ↓
GitHub Pages serves it
    ↓
Your portfolio is live! 🚀
```

## Troubleshooting

### Site not updating?
- Check **Actions** tab for build failures
- Wait a few minutes for deployment to complete
- Hard refresh your browser (Ctrl+Shift+R)

### 404 errors after deploy?
- Check if you set `basePath` correctly
- Make sure GitHub Pages is set to deploy from `gh-pages` branch
- Verify Settings → Pages configuration

### Build fails?
- Check the Actions log for error details
- Ensure all dependencies are in `package.json`
- Test locally with `npm run build`

### Import errors?
- All imports should work with `@/` paths
- For images, use relative paths in `public/`

## Testing Locally Before Deploy

Want to see how it looks before pushing?

```bash
# Build for production
npm run build

# Serve the static files locally
npx serve@latest out
```

Then visit http://localhost:3000

## Key Differences from Vercel

| Feature | GitHub Pages | Vercel |
|---------|--------------|--------|
| Cost | Free | Free tier available |
| Deployment | Auto via Actions | Auto on push |
| Server-side code | ❌ Not supported | ✅ Supported |
| Environment variables | Limited | Full support |
| Analytics | Manual setup | Built-in |
| Custom domain | ✅ Supported | ✅ Supported |
| Setup complexity | Medium | Easy |

## What's Different About Your App

Your Next.js app is configured for **static export**, which means:

✅ **Works great for:**
- Static content (portfolio, blog, docs)
- No server needed
- Fast, lightweight deployment
- SEO friendly

⚠️ **Won't work for:**
- API routes (use external services instead)
- Server-side rendering
- Form submission to backend (use Formspree, EmailJS, etc.)

Your contact form can still work! Just integrate:
- **Formspree** (https://formspree.io) - No coding needed
- **EmailJS** (https://www.emailjs.com) - Client-side emails
- **Netlify Forms** (if you later switch hosts)

## Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Your portfolio is now ready for GitHub Pages deployment! 🎉**
