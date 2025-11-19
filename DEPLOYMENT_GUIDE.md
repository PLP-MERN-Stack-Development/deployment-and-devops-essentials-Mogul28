# 🚀 Complete Deployment Guide: Netlify + Render

## Overview

This guide covers deploying your MERN stack application:
- **Frontend**: Netlify
- **Backend**: Render

## Architecture

```
GitHub Repository
    ├── Frontend (React) → Netlify
    └── Backend (Express) → Render
         └── MongoDB Atlas
```

## Prerequisites

- ✅ MongoDB Atlas cluster set up
- ✅ GitHub repository with your code
- ✅ Local application tested and working

## Part 1: Backend Deployment (Render)

### Step 1: Create Render Account

1. Go to [Render](https://render.com)
2. Sign up (free tier available)
3. Connect your GitHub account

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select repository: `deployment-and-devops-essentials-Mogul28`
4. Configure:
   - **Name**: `mern-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **"Create Web Service"**

### Step 3: Set Environment Variables

In Render dashboard → Your service → **"Environment"** tab:

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/mern-db?retryWrites=true&w=majority` |
| `JWT_SECRET` | Your JWT secret | `your-secret-key-here` |
| `FRONTEND_URL` | Your Netlify URL (set after frontend deploy) | `https://your-app.netlify.app` |
| `PORT` | Auto-set by Render | `10000` |

**Important:**
- NO quotes around values
- NO spaces
- Use actual values, not placeholders

### Step 4: Enable Auto-Deploy

1. In **"Settings"** → **"Build & Deploy"**
2. Set **"Auto-Deploy"** to **"Yes"**
3. Render will now deploy on every push to `main`

### Step 5: Verify Backend

1. Wait for deployment to complete
2. Check logs for: `MongoDB Connected: cluster0.xxxxx.mongodb.net`
3. Test health endpoint: `https://your-backend.onrender.com/health`
4. Save your backend URL: `https://your-backend.onrender.com`

## Part 2: Frontend Deployment (Netlify)

### Step 1: Create Netlify Account

1. Go to [Netlify](https://www.netlify.com)
2. Sign up (free tier available)
3. Connect your GitHub account

### Step 2: Deploy from GitHub

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
5. Click **"Deploy site"**

### Step 3: Set Environment Variables

In Netlify dashboard → Your site → **"Site settings"** → **"Environment variables"**:

| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Your Render backend URL | `https://your-backend.onrender.com` |

**Important:**
- Variables must start with `VITE_` to be available in build
- Set scope to "All scopes" or "Production, Deploy previews, Branch deploys"

### Step 4: Enable Auto-Deploy

1. In **"Build & deploy"** → **"Continuous Deployment"**
2. Ensure **"Deploy automatically"** is enabled
3. Select branch: `main`
4. Netlify will now deploy on every push to `main`

### Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-app.netlify.app
   ```
3. Render will auto-redeploy

### Step 6: Verify Frontend

1. Wait for deployment to complete
2. Open your Netlify URL: `https://your-app.netlify.app`
3. Test the application:
   - Register a user
   - Login
   - Create posts
   - Verify API calls work

## Part 3: CI/CD Pipeline

### GitHub Actions Workflows

The repository includes CI/CD workflows:

1. **Backend CI** (`.github/workflows/backend-ci.yml`):
   - Runs on push/PR
   - Tests backend code
   - Lints code

2. **Frontend CI** (`.github/workflows/frontend-ci.yml`):
   - Runs on push/PR
   - Builds frontend
   - Lints code

3. **Backend CD** (`.github/workflows/backend-cd.yml`):
   - Runs on push to `main`
   - Tests backend
   - Render auto-deploys (no action needed)

4. **Frontend CD** (`.github/workflows/frontend-cd.yml`):
   - Runs on push to `main`
   - Builds frontend
   - Netlify auto-deploys (no action needed)

### GitHub Secrets (Optional)

If you want to trigger deployments via GitHub Actions:

**Backend:**
- `MONGODB_URI`
- `JWT_SECRET`
- `RENDER_SERVICE_ID` (optional)
- `RENDER_API_KEY` (optional)

**Frontend:**
- `VITE_API_URL`
- `NETLIFY_AUTH_TOKEN` (optional)
- `NETLIFY_SITE_ID` (optional)

**Note:** Auto-deploy is recommended - no GitHub Actions needed!

## Part 4: Testing

### Test Backend

```bash
# Health check
curl https://your-backend.onrender.com/health

# Register user
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

### Test Frontend

1. Open: `https://your-app.netlify.app`
2. Register a new user
3. Login
4. Create a post
5. Verify everything works

## Part 5: Monitoring

### Health Checks

- **Backend**: `https://your-backend.onrender.com/health`
- **Frontend**: Check Netlify dashboard for build status

### Uptime Monitoring

Set up with:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

Monitor: `https://your-backend.onrender.com/health`

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Check `MONGODB_URI` in Render (no quotes, no spaces)
- Verify MongoDB Atlas Network Access allows Render IPs

**CORS Errors:**
- Update `FRONTEND_URL` in Render to your Netlify URL
- Redeploy backend

### Frontend Issues

**Build Fails:**
- Check Node version (should be 18+)
- Verify build command: `npm install && npm run build`
- Check base directory: `frontend`

**API Calls Fail:**
- Verify `VITE_API_URL` is set in Netlify
- Check backend CORS settings
- Verify backend is running

**404 on Routes:**
- Ensure `netlify.toml` has redirect rule
- Or add `_redirects` file in `frontend/public/`

## Deployment URLs

After deployment, update these in your README:

- **Frontend URL**: `https://your-app.netlify.app`
- **Backend URL**: `https://your-backend.onrender.com`
- **Health Check**: `https://your-backend.onrender.com/health`

## Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify
- [ ] Environment variables configured
- [ ] Auto-deploy enabled for both
- [ ] CORS configured correctly
- [ ] Application tested end-to-end
- [ ] Health checks working
- [ ] CI/CD pipelines running
- [ ] Documentation updated

## Next Steps

1. ✅ Both frontend and backend deployed
2. ✅ Application working end-to-end
3. ⏭️ Set up custom domains (optional)
4. ⏭️ Configure monitoring
5. ⏭️ Set up error tracking (Sentry)

---

**🎉 Your MERN stack application is now deployed!**

Frontend: Netlify | Backend: Render

