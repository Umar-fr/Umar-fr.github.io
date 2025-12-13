# 🚀 Portfolio - GitHub Pages Edition

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS, deployed on GitHub Pages.

## ✨ Features

- 🌙 **Dark/Light Mode Toggle** - Theme support with next-themes
- 📱 **Fully Responsive** - Mobile, tablet, desktop optimized
- ✨ **Smooth Animations** - Powered by Framer Motion
- 🎨 **Beautiful UI** - Tailwind CSS styling
- ⚡ **Lightning Fast** - Static site hosted on GitHub Pages
- 📧 **Contact Ready** - Prepared for email service integration
- 🎯 **SEO Optimized** - Great search engine visibility

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with Static Export
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git
- GitHub account

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create static build
npm run build

# Test locally
npx serve@latest out
```

## 🌐 Deployment to GitHub Pages

### Setup (One Time)

1. **Create GitHub Repository**
   ```
   https://github.com/new
   - Name: username.github.io (recommended)
   - OR: portfolio (then set basePath)
   - Make it PUBLIC
   ```

2. **Push Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)
   - Save

4. **Configure basePath (if needed)**
   
   If your repo is NOT `username.github.io`:
   ```javascript
   // next.config.js - uncomment and update:
   basePath: '/portfolio' // change to your repo name
   ```

5. **Visit Your Site**
   - `https://username.github.io` (for username.github.io repo)
   - `https://username.github.io/portfolio` (for project repo)

### Auto-Deployment

Every push to `main` automatically:
1. Triggers GitHub Actions workflow
2. Builds your static site
3. Deploys to `gh-pages` branch
4. Updates your live site (1-2 minutes)

## 📁 Project Structure

```
portfolio-app/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── hero.tsx          # Hero section
│   ├── about.tsx         # About me
│   ├── skills.tsx        # Skills showcase
│   ├── projects.tsx      # Portfolio projects
│   ├── contact.tsx       # Contact form
│   ├── navigation.tsx    # Navigation
│   ├── footer.tsx        # Footer
│   ├── theme-toggle.tsx  # Dark mode button
│   └── providers.tsx     # Theme provider
├── public/               # Static files
├── .github/workflows/    # GitHub Actions
│   └── deploy.yml       # Auto-deploy config
└── package.json         # Dependencies
```

## ✏️ Customization

### Update Your Info
Edit the component files in `components/`:
- `hero.tsx` - Main headline
- `about.tsx` - About section
- `skills.tsx` - Your skills
- `projects.tsx` - Your projects
- `contact.tsx` - Contact info

### Change Colors
Edit `tailwind.config.ts` to customize theme.

### Update Content
Modify text, images, and links in component files.

## 📧 Contact Form

To make contact form functional:

### Option 1: Formspree (Easiest)
```
1. Go to https://formspree.io
2. Create account
3. Add form endpoint to components/contact.tsx
```

### Option 2: EmailJS
```
1. Go to https://www.emailjs.com
2. Set up email service
3. npm install @emailjs/browser
4. Configure in components/contact.tsx
```

### Option 3: Custom Backend
Create your own API endpoint for form submissions.

## 📝 Making Updates

```bash
# Edit your files
# ...

# Commit and push to deploy
git add .
git commit -m "Update content"
git push

# Site automatically updates in 1-2 minutes!
```

## 🔧 Available Scripts

```bash
npm run dev      # Development server on localhost:3000
npm run build    # Build static site to out/
npm run start    # Start production server
npm run lint     # Run ESLint
npm run export   # Build + export (same as build)
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Site not showing | Check Actions tab for build errors |
| 404 errors | Set basePath correctly in next.config.js |
| Images missing | Ensure they're in public/ folder |
| Theme not working | Hard refresh (Ctrl+Shift+R) |
| Build fails | Run npm run build locally to test |

## 📚 Documentation

- **Full Guide:** `GITHUB_PAGES_DEPLOYMENT.md`
- **Quick Setup:** `GITHUB_PAGES_QUICK_START.md`
- **Checklist:** `GITHUB_PAGES_CHECKLIST.md`
- **Migration Details:** `GITHUB_PAGES_MIGRATION.md`
- **Comparison:** `GITHUB_PAGES_VS_VERCEL.md`

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Framer Motion](https://www.framer.com/motion)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📄 License

MIT License - Feel free to use this template for your portfolio!

## 🤝 Support

Having issues? Check the troubleshooting section above or review the documentation files.

---

**Built with ❤️ using Next.js and deployed on GitHub Pages**

Ready to deploy? See `GITHUB_PAGES_QUICK_START.md`!
