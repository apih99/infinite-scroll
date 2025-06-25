# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your **Infinite Scroll of Increasing Weirdness** to GitHub Pages using GitHub Actions.

## 📋 Prerequisites

- GitHub account
- Repository created on GitHub
- Local repository connected to GitHub remote

## 🔧 Setup Instructions

### 1. Repository Setup

1. **Create a new repository on GitHub:**
   ```bash
   # If you haven't already, initialize git and connect to GitHub
   git init
   git add .
   git commit -m "Initial commit: Infinite Scroll of Increasing Weirdness"
   git branch -M main
   git remote add origin https://github.com/apih99/infinite-scroll.git
   git push -u origin main
   ```

2. **Important:** Make sure your repository is named `infinite-scroll` or update the `base` path in `vite.config.js`:
   ```javascript
   base: mode === 'production' ? '/YOUR_REPO_NAME/' : '/',
   ```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 3. Deploy

The deployment is automatic! Simply push to the `main` branch:

```bash
git add .
git commit -m "Deploy infinite scroll to GitHub Pages"
git push origin main
```

### 4. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. Watch the deployment workflow run
3. Once complete, your site will be available at:
   ```
   https://YOUR_USERNAME.github.io/infinite-scroll/
   ```

## 📁 Files Created

The following files have been set up for deployment:

- **`.github/workflows/deploy.yml`** - GitHub Actions workflow
- **`vite.config.js`** - Updated with GitHub Pages configuration
- **`DEPLOYMENT.md`** - This deployment guide

## 🧪 Testing Before Deployment

Test the production build locally:

```bash
# Build for production
npm run build:github

# Preview the production build
npm run preview:github
```

Then visit `http://localhost:4173` to test the production version.

## 🔍 Workflow Details

The GitHub Actions workflow:

1. **Triggers on:**
   - Push to `main` branch
   - Manual dispatch from Actions tab

2. **Build Process:**
   - Installs Node.js 18
   - Installs dependencies with `npm ci`
   - Builds the project with `npm run build`
   - Uploads build artifacts

3. **Deploy Process:**
   - Deploys to GitHub Pages
   - Makes site available at your GitHub Pages URL

## 🐛 Troubleshooting

### Common Issues:

1. **404 Error after deployment:**
   - Check that the `base` path in `vite.config.js` matches your repository name
   - Ensure GitHub Pages is enabled and set to "GitHub Actions"

2. **Build fails:**
   - Check the Actions tab for error messages
   - Ensure all dependencies are listed in `package.json`

3. **Assets not loading:**
   - Verify the `base` path configuration
   - Check browser developer tools for 404 errors

### Manual Fixes:

If you need to change the repository name, update `vite.config.js`:
```javascript
base: mode === 'production' ? '/NEW_REPO_NAME/' : '/',
```

## 🎉 Success!

Once deployed, your Infinite Scroll of Increasing Weirdness will be live and ready to create viral TikTok content!

**Share your deployed site:**
- Perfect for social media demonstrations
- No local setup required for viewers
- Always accessible for content creation

## 📱 Mobile Testing

Your deployed site will work perfectly on mobile devices, making it ideal for:
- Screen recording for TikTok
- Sharing with friends
- Testing the weirdness progression on different devices

---

**Note:** It may take a few minutes for the first deployment to complete. Subsequent deployments are much faster! 