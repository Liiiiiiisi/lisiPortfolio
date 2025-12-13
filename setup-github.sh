#!/bin/bash

# GitHub Setup Script for Lisi Portfolio
# This script helps you push your code to GitHub

echo "🚀 GitHub Setup for Lisi Portfolio"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "⚠️  Git not initialized. Initializing..."
    git init
fi

# Check current git status
echo "📋 Current git status:"
git status --short

echo ""
echo "📝 Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Name it (e.g., 'lisi-portfolio')"
echo "   - DON'T initialize with README/gitignore"
echo "   - Click 'Create repository'"
echo ""
echo "2. Run these commands (replace YOUR_USERNAME and REPO_NAME):"
echo ""
echo "   git add ."
echo "   git commit -m 'Initial commit: Portfolio website'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Then deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Sign in with GitHub"
echo "   - Import your repository"
echo "   - Click Deploy"
echo ""
echo "✨ That's it! Your site will auto-deploy on every push!"
echo ""
echo "📖 For detailed instructions, see QUICK_START.md or DEPLOYMENT.md"

