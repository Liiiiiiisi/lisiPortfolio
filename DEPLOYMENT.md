# Deployment Guide - GitHub Pages

This guide will help you deploy your portfolio to GitHub Pages with automatic deployments.

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then "New repository"
3. Name your repository (e.g., `lisi-portfolio`)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

Open your terminal in the project directory and run:

```bash
# Make sure you're in the project directory
cd /Users/liiiiiisi/Documents/lisiPortfolio

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Portfolio website with Next.js"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. The page will automatically deploy when you push to `main` branch

## Step 4: Automatic Deployments ✅

That's it! The GitHub Action workflow will:
- ✅ Automatically build your site when you push to `main`
- ✅ Deploy to GitHub Pages
- ✅ Your site will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

**Note:** It may take 1-2 minutes for the first deployment to complete.

## Future Workflow

After initial setup, your workflow is simple:

```bash
# Make changes to your code
# ... edit files ...

# Commit and push
git add .
git commit -m "Update portfolio content"
git push

# GitHub Actions automatically builds and deploys! 🚀
```

## Viewing Your Site

Your portfolio will be available at:
- `https://YOUR_USERNAME.github.io/REPO_NAME/`

**Note:** Replace `YOUR_USERNAME` and `REPO_NAME` with your actual values.

## Custom Domain (Optional)

1. In your repository → Settings → Pages
2. Under **Custom domain**, enter your domain
3. Follow the DNS configuration instructions
4. GitHub will automatically provision SSL certificates

## Troubleshooting

### Build Fails
- Check the **Actions** tab in your GitHub repository
- Look at the workflow run logs
- Make sure all dependencies are in `package.json`
- Verify `npm run build` works locally

### Site Not Loading
- Wait 1-2 minutes after pushing (first deployment takes longer)
- Check the **Actions** tab to see if deployment succeeded
- Verify GitHub Pages is enabled in Settings → Pages

### Images Not Loading
- Make sure images are in the `public/` directory
- Use paths starting with `/` (e.g., `/projects/signie/images/cover.png`)
- After deployment, paths should work with the base path

### 404 Errors on Project Pages
- Ensure projects exist in `public/projects/` directory
- Check that `public/projects/index.json` is valid JSON
- Verify project directories have `texts/data.json` and `texts/page.md`

## Important Notes

- **Static Export**: This setup uses Next.js static export, which means:
  - No server-side features (API routes won't work)
  - All pages are pre-rendered at build time
  - Perfect for portfolio sites!
  
- **Build Time**: Each deployment takes 1-3 minutes
- **Free**: GitHub Pages is completely free
- **HTTPS**: Automatically included

## Checking Deployment Status

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see all deployment workflows
4. Click on a workflow to see detailed logs
