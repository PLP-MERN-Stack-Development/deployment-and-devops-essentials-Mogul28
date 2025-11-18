# Environment Variables Setup Guide

This guide will help you configure your environment variables for local development and production deployment.

## Backend Environment Variables

Create or edit `backend/.env` with the following variables:

### Required Variables

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
# Replace with your MongoDB Atlas connection string
# Format: mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/mern-db?retryWrites=true&w=majority

# JWT Configuration
# Generate a strong random secret (at least 32 characters)
# You can use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-chars
JWT_EXPIRE=7d

# CORS Configuration
# For local development, use: http://localhost:3000
# For production, use your frontend URL: https://your-frontend.vercel.app
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring (Optional - for Sentry error tracking)
SENTRY_DSN=your-sentry-dsn-here
```

### How to Get MongoDB URI:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with your database name (e.g., `mern-db`)

### How to Generate JWT Secret:

Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

## Frontend Environment Variables

Create or edit `frontend/.env` with the following variables:

### Required Variables

```env
# API Configuration
# For local development, use: http://localhost:5000
# For production, use your deployed backend URL: https://your-backend.onrender.com
VITE_API_URL=http://localhost:5000

# Environment
VITE_NODE_ENV=development
```

### Production Frontend .env

When deploying to production, update `VITE_API_URL` to your deployed backend URL:
```env
VITE_API_URL=https://your-backend.onrender.com
```

## Quick Setup Commands

### Windows PowerShell:

```powershell
# Backend - Copy template and edit manually
Copy-Item backend\env.example backend\.env
# Then edit backend\.env with your values

# Frontend - Copy template and edit manually
Copy-Item frontend\env.example frontend\.env
# Then edit frontend\.env with your values
```

### Linux/Mac:

```bash
# Backend
cp backend/env.example backend/.env
# Then edit backend/.env with your values

# Frontend
cp frontend/env.example frontend/.env
# Then edit frontend/.env with your values
```

## Verification

After setting up your environment variables:

1. **Backend**: Start the server and check for connection errors
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend**: Start the dev server and check API calls
   ```bash
   cd frontend
   npm run dev
   ```

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env` files to Git (they're already in `.gitignore`)
- Use different JWT secrets for development and production
- Keep your MongoDB password secure
- Rotate secrets regularly in production
- Use environment variables in your deployment platform, not hardcoded values

## Deployment Environment Variables

When deploying, set these environment variables in your hosting platform:

### Backend (Render/Railway/Heroku):
- `NODE_ENV=production`
- `MONGODB_URI` (your production MongoDB URI)
- `JWT_SECRET` (strong production secret)
- `FRONTEND_URL` (your deployed frontend URL)
- `PORT` (usually auto-set by platform)

### Frontend (Vercel/Netlify):
- `VITE_API_URL` (your deployed backend URL)
- `VITE_NODE_ENV=production`

