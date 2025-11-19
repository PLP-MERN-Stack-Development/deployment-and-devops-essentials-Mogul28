# 🚀 Netlify Frontend Deployment Guide

## Overview

This guide will help you deploy your React frontend to Netlify, configured to work with your Render backend.

## Prerequisites

- ✅ Backend deployed on Render (see `RENDER_AUTO_DEPLOY.md`)
- ✅ Backend URL from Render: [https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com](https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com)
- ✅ GitHub repository with frontend code

## Step 1: Create Netlify Account

1. Go to [Netlify](https://www.netlify.com)
2. Sign up (free tier available)
3. Choose "Sign up with GitHub" to connect your account

## Step 2: Deploy from GitHub

### Option A: Quick Deploy (Recommended)

1. In Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub account
4. Select your repository: `deployment-and-devops-essentials-Mogul28`
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
6. Click **"Deploy site"**

### Option B: Manual Deploy

1. Build your frontend locally:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. In Netlify dashboard, click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `frontend/dist` folder

## Step 3: Configure Environment Variables

1. In Netlify dashboard → Your site → **"Site settings"**
2. Go to **"Environment variables"**
3. Click **"Add variable"**
4. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com`
   - **Scopes**: Select "All scopes" or "Production, Deploy previews, Branch deploys"
5. Click **"Save"**

## Step 4: Configure Build Settings

1. In Netlify dashboard → Your site → **"Site settings"**
2. Go to **"Build & deploy"** → **"Build settings"**
3. Verify:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
4. Click **"Save"**

## Step 5: Enable Auto-Deploy

1. In **"Build & deploy"** → **"Continuous Deployment"**
2. Make sure **"Deploy automatically"** is enabled
3. Select branch: `main` (or your production branch)
4. Netlify will now automatically deploy on every push to `main`

## Step 6: Configure SPA Routing

The `netlify.toml` file already includes SPA routing configuration. This ensures all routes redirect to `index.html` for React Router to work.

If you need to add it manually:
1. Go to **"Site settings"** → **"Build & deploy"** → **"Post processing"**
2. Enable **"Asset optimization"**
3. Or add a `_redirects` file in `frontend/public/`:
   ```
   /*    /index.html   200
   ```

## Step 7: Test Your Deployment

1. After deployment, your Netlify URL: [https://deployapp1.netlify.app/](https://deployapp1.netlify.app/)
2. Open the URL in your browser
3. Test the application:
   - Register a new user
   - Login
   - Create posts
   - Verify API calls are going to your Render backend

## Step 8: Update Backend CORS

Make sure your Render backend allows requests from your Netlify frontend:

1. In Render dashboard → Your backend service → **"Environment"**
2. Update `FRONTEND_URL` to your Netlify URL:
   ```
   FRONTEND_URL=https://deployapp1.netlify.app
   ```
3. Redeploy the backend

## Custom Domain (Optional)

1. In Netlify dashboard → Your site → **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Netlify will automatically provision SSL certificate

## Environment Variables Reference

| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Your Render backend URL | `https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com` |

## Build Settings Reference

- **Base directory**: `frontend`
- **Build command**: `npm install && npm run build`
- **Publish directory**: `frontend/dist`
- **Node version**: 18 (set in `netlify.toml`)

## Troubleshooting

### Issue: Build fails

**Check:**
- Node version is 18+
- All dependencies are in `package.json`
- Build command is correct
- Base directory is set to `frontend`

### Issue: 404 errors on routes

**Solution:**
- Ensure `netlify.toml` has the redirect rule
- Or add `_redirects` file in `frontend/public/`

### Issue: API calls failing

**Check:**
- `VITE_API_URL` is set correctly in Netlify
- Backend CORS allows your Netlify domain
- Backend is running and accessible

### Issue: Environment variables not working

**Solution:**
- Variables must start with `VITE_` to be available in the build
- Redeploy after adding/changing variables
- Check variable scopes (production, preview, etc.)

## GitHub Actions Integration

The frontend CD workflow can optionally deploy via Netlify API, but **Netlify's auto-deploy is recommended** as it's simpler and more reliable.

If you want to use GitHub Actions:
1. Get Netlify auth token: Netlify dashboard → User settings → Applications → Personal access tokens
2. Get Site ID: Site settings → General → Site details
3. Add as GitHub Secrets:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

## Success Checklist

- [ ] Frontend deployed to Netlify
- [ ] Environment variables configured
- [ ] Auto-deploy enabled
- [ ] SPA routing working
- [ ] Backend CORS updated
- [ ] Application tested end-to-end
- [ ] Custom domain configured (optional)

## Next Steps

1. ✅ Frontend deployed on Netlify
2. ✅ Backend deployed on Render
3. ✅ Both connected and working
4. ⏭️ Set up monitoring
5. ⏭️ Configure custom domains (optional)

---

**🎉 Your frontend is now deployed on Netlify!**

