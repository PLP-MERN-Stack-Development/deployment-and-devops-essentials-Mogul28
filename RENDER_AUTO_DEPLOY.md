# 🚀 Render Auto-Deploy Setup

## The Problem

The GitHub Action `johnbeynon/render-deploy` doesn't exist, causing the workflow to fail.

## ✅ Solution: Use Render's Built-in Auto-Deploy

Render has a built-in auto-deploy feature that's simpler and more reliable than GitHub Actions.

## Setup Steps

### Step 1: Connect GitHub Repository in Render

1. Go to https://dashboard.render.com
2. Select your backend service
3. Click **"Settings"** tab
4. Scroll to **"Build & Deploy"** section
5. Under **"Source"**, click **"Connect account"** or **"Connect repository"**
6. Authorize Render to access your GitHub account
7. Select your repository: `deployment-and-devops-essentials-Mogul28`
8. Select branch: `main`
9. Click **"Connect"**

### Step 2: Configure Auto-Deploy

1. In the same **"Build & Deploy"** section
2. Set **"Auto-Deploy"** to **"Yes"**
3. This means Render will automatically deploy when you push to `main`

### Step 3: Configure Build Settings

Make sure these are set correctly:

- **Root Directory**: `backend` (or leave empty if root)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: `Node`

### Step 4: Set Environment Variables

In Render dashboard → Your service → **"Environment"** tab, set:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret
- `NODE_ENV` - `production`
- `FRONTEND_URL` - Your frontend URL
- `PORT` - Usually auto-set by Render (10000)

### Step 5: Test Auto-Deploy

1. Make a small change to your code
2. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. Go to Render dashboard → Your service → **"Events"** tab
4. You should see a new deployment starting automatically

## How It Works

1. You push code to GitHub `main` branch
2. Render detects the push (via webhook)
3. Render automatically starts a new deployment
4. Render builds and deploys your service
5. Your service is updated with the latest code

## Benefits

- ✅ No GitHub Actions needed
- ✅ Simpler setup
- ✅ More reliable
- ✅ Automatic deployments
- ✅ Built into Render

## Manual Deployment (If Needed)

If you need to manually trigger a deployment:

1. Go to Render dashboard → Your service
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

Or use the API:
```bash
curl -X POST https://api.render.com/v1/services/YOUR_SERVICE_ID/deploys \
  -H 'Authorization: Bearer YOUR_RENDER_API_KEY'
```

## GitHub Actions Workflow

The updated workflow will:
- ✅ Run tests
- ✅ Build the application
- ✅ Skip the broken Render action
- ✅ Let Render handle deployment automatically

## Alternative: Use Render API in GitHub Actions

If you want to keep deployment in GitHub Actions, you can use Render's API directly:

```yaml
- name: Deploy to Render
  if: success()
  run: |
    curl -X POST https://api.render.com/v1/services/${{ secrets.RENDER_SERVICE_ID }}/deploys \
      -H 'Authorization: Bearer ${{ secrets.RENDER_API_KEY }}' \
      -H 'Content-Type: application/json'
```

But **Render's auto-deploy is recommended** - it's simpler and more reliable!

---

**🎉 That's it! Render will now automatically deploy on every push to main.**

