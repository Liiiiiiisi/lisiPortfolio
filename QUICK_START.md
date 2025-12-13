# Quick Start: Deploy to GitHub Pages

## 🚀 Fastest Way to Deploy

### 1. Push to GitHub

```bash
# Navigate to project
cd /Users/liiiiiisi/Documents/lisiPortfolio

# Add and commit
git add .
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Done! ✅

### 3. Automatic Deployments

Every time you push:
```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub automatically:
- ✅ Builds your site
- ✅ Deploys to GitHub Pages
- ✅ Updates your live site

**Your site URL:** `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

## 📝 Future Workflow

1. Make changes
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your update"
   git push
   ```
3. Wait 1-2 minutes
4. Site is updated! 🎉

---

## 🔧 Troubleshooting

**Can't push?**
- Make sure you created the GitHub repository first
- Check your username and repo name

**Build fails?**
- Check the **Actions** tab in your repository
- Make sure `npm run build` works locally

**Site not loading?**
- Wait 1-2 minutes after first push
- Check **Actions** tab for deployment status
