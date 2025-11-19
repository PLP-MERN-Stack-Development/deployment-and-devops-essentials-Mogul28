# 🚀 MERN Stack Application - Deployment and DevOps

A full-stack MERN (MongoDB, Express, React, Node.js) application with complete CI/CD pipelines, production-ready configurations, and monitoring setup.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
  - [Backend Deployment](#backend-deployment)
  - [Frontend Deployment](#frontend-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring](#monitoring)
- [API Documentation](#api-documentation)
- [Maintenance](#maintenance)

## ✨ Features

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB with Mongoose ODM
- ✅ JWT Authentication
- ✅ User registration and login
- ✅ CRUD operations for posts
- ✅ Error handling middleware
- ✅ Security headers (Helmet)
- ✅ Rate limiting
- ✅ Request compression
- ✅ Production logging
- ✅ Health check endpoint
- ✅ Database connection pooling

### Frontend
- ✅ React 18 with Vite
- ✅ React Router for navigation
- ✅ Code splitting and lazy loading
- ✅ Responsive design
- ✅ Authentication context
- ✅ Protected routes
- ✅ Post management (Create, Read, Update, Delete)
- ✅ Modern UI/UX

### DevOps
- ✅ GitHub Actions CI/CD pipelines
- ✅ Automated testing
- ✅ Linting and code quality checks
- ✅ Automated deployment
- ✅ Environment-specific configurations
- ✅ Monitoring setup guides

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── errorHandler.js      # Error handling middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Post.js              # Post model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── users.js             # User routes
│   │   └── posts.js             # Post routes
│   ├── tests/
│   │   └── auth.test.js         # Authentication tests
│   ├── server.js                # Express server entry point
│   ├── package.json
│   ├── env.example              # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── context/             # React context providers
│   │   ├── pages/               # Page components
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.js           # Vite configuration
│   ├── package.json
│   ├── env.example              # Environment variables template
│   └── .gitignore
├── .github/
│   └── workflows/
│       ├── backend-ci.yml       # Backend CI pipeline
│       ├── frontend-ci.yml      # Frontend CI pipeline
│       ├── backend-cd.yml       # Backend CD pipeline
│       └── frontend-cd.yml      # Frontend CD pipeline
├── deployment/
│   ├── render.yaml              # Render deployment config
│   ├── netlify.toml             # Netlify deployment config
│   └── railway.json             # Railway deployment config
├── monitoring/
│   ├── sentry.config.js         # Sentry error tracking config
│   └── health-check.md          # Health check documentation
├── scripts/
│   ├── setup.sh                 # Setup script
│   └── deploy.sh                # Deployment script
├── README.md
└── Week7-Assignment.md
```

## 🔧 Prerequisites

- **Node.js** 18+ and npm 9+
- **MongoDB Atlas** account (or local MongoDB)
- **Git** for version control
- **GitHub** account
- Accounts for deployment platforms:
  - Backend: Render, Railway, or Heroku
  - Frontend: Netlify or GitHub Pages

## 🚀 Local Development Setup

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd deployment-and-devops-essentials-Mogul28
   ```

2. **Run setup script** (Linux/Mac)
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

   Or manually:

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔐 Environment Variables

### Backend (.env)

Create `backend/.env` from `backend/env.example`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SENTRY_DSN=your-sentry-dsn-here
```

### Frontend (.env)

Create `frontend/.env` from `frontend/env.example`:

```env
VITE_API_URL=http://localhost:5000
VITE_NODE_ENV=development
```

## 🌐 Deployment

### Backend Deployment

#### Option 1: Render

1. Create a new account at [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
5. Add environment variables from your `.env` file
6. Deploy!

**Deployed Backend URL**: [https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com](https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com)

#### Option 2: Railway

1. Create account at [Railway](https://railway.app)
2. Create new project from GitHub
3. Add service and select your repository
4. Railway will auto-detect Node.js
5. Set root directory to `backend`
6. Add environment variables
7. Deploy!

#### Option 3: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set buildpack: `heroku buildpacks:set heroku/nodejs`
5. Set environment variables: `heroku config:set KEY=value`
6. Deploy: `git push heroku main`

### Frontend Deployment

#### Option 1: Netlify (Recommended)

1. Create account at [Netlify](https://netlify.com)
2. Import from Git
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
4. Add environment variables (especially `VITE_API_URL`)
5. Deploy!

**Deployed Frontend URL**: [https://deployapp1.netlify.app](https://deployapp1.netlify.app)

See `NETLIFY_DEPLOYMENT.md` for detailed instructions.

#### Option 2: GitHub Pages

1. Update `vite.config.js` with base path
2. Install gh-pages: `npm install -D gh-pages`
3. Add deploy script to `package.json`
4. Run: `npm run deploy`

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows for continuous integration and deployment.

### CI Workflows

- **Backend CI** (`.github/workflows/backend-ci.yml`):
  - Runs on push/PR to main/develop
  - Installs dependencies
  - Runs linter
  - Runs tests with MongoDB service
  - Uploads coverage reports

- **Frontend CI** (`.github/workflows/frontend-ci.yml`):
  - Runs on push/PR to main/develop
  - Installs dependencies
  - Runs linter
  - Builds application
  - Uploads build artifacts

### CD Workflows

- **Backend CD** (`.github/workflows/backend-cd.yml`):
  - Runs on push to main
  - Runs tests
  - Deploys to Render/Railway/Heroku

- **Frontend CD** (`.github/workflows/frontend-cd.yml`):
  - Runs on push to main
  - Builds application
  - Deploys to Netlify

### Setting Up GitHub Secrets

Add these secrets in your GitHub repository settings:

**Backend Secrets:**
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `RENDER_SERVICE_ID`: Render service ID (if using Render)
- `RENDER_API_KEY`: Render API key
- `RAILWAY_TOKEN`: Railway token (if using Railway)
- `HEROKU_API_KEY`: Heroku API key (if using Heroku)

**Frontend Secrets:**
- `VITE_API_URL`: Your deployed backend URL (e.g., `https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com`)
- `NETLIFY_AUTH_TOKEN`: Netlify auth token (optional - for GitHub Actions deployment)
- `NETLIFY_SITE_ID`: Netlify site ID (optional - for GitHub Actions deployment)

## 📊 Monitoring

### Health Check Endpoint

The backend includes a health check at `/health`:

```bash
curl https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67,
  "environment": "production",
  "database": "connected"
}
```

### Error Tracking with Sentry

1. Create account at [Sentry](https://sentry.io)
2. Create a new project
3. Get your DSN
4. Add to environment variables:
   - Backend: `SENTRY_DSN`
   - Frontend: `VITE_SENTRY_DSN`
5. See `monitoring/sentry.config.js` for integration code

### Uptime Monitoring

Set up uptime monitoring with:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

Monitor: `https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/health`

See `monitoring/health-check.md` for detailed setup instructions.

## 📚 API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Posts

#### Get All Posts
```http
GET /api/posts
Authorization: Bearer <token>
```

#### Get Single Post
```http
GET /api/posts/:id
Authorization: Bearer <token>
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Post",
  "content": "Post content here",
  "tags": ["react", "nodejs"]
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

## 🔧 Maintenance

### Regular Tasks

1. **Database Backups**
   - MongoDB Atlas provides automatic backups
   - Configure backup schedule in MongoDB Atlas dashboard

2. **Dependency Updates**
   - Run `npm audit` regularly
   - Update dependencies: `npm update`
   - Test after updates

3. **Security Updates**
   - Monitor security advisories
   - Update packages with vulnerabilities
   - Review and rotate secrets regularly

4. **Performance Monitoring**
   - Monitor API response times
   - Check database query performance
   - Review error logs

### Rollback Procedures

1. **Backend Rollback**
   - Render: Use rollback feature in dashboard
   - Railway: Revert to previous deployment
   - Heroku: `heroku rollback`

2. **Frontend Rollback**
   - Netlify: Revert to previous deployment
   - GitHub Pages: Revert commit

## 📝 Deployment URLs

### 🚀 Live Application

- **Frontend URL**: [https://deployapp1.netlify.app](https://deployapp1.netlify.app)
- **Backend URL**: [https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com](https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com)
- **API Health Check**: [https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/health](https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/health)
- **API Root**: [https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/](https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/)

## 🚀 Quick Deployment Guide

See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions for deploying to:
- **Frontend**: Netlify
- **Backend**: Render

## 📸 CI/CD Screenshots

Add screenshots of your CI/CD pipeline in action:
1. GitHub Actions workflow runs
2. Successful deployments
3. Test results
4. Build artifacts

## 🛠️ Scripts

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run linter

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## 📄 License

This project is part of a course assignment.

## 👥 Contributors

- Your Name

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render/Railway/Heroku for backend hosting
- Netlify for frontend hosting
- GitHub Actions for CI/CD

---

## 🎉 Deployment Complete!

**Live Application:**
- **Frontend**: [https://deployapp1.netlify.app](https://deployapp1.netlify.app)
- **Backend API**: [https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com](https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com)
- **Health Check**: [https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/health](https://deployment-and-devops-essentials-mogul28-mm0n.onrender.com/health)

**Note**: Remember to add screenshots of your CI/CD pipeline before submission!
