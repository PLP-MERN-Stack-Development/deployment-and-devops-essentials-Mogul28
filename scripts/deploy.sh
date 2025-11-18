#!/bin/bash

# Deployment script for MERN Stack Application
# This script helps automate the deployment process

set -e

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}Warning: backend/.env not found. Please create it from backend/env.example${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}Warning: frontend/.env not found. Please create it from frontend/env.example${NC}"
fi

# Build backend
echo -e "${GREEN}Building backend...${NC}"
cd backend
npm install
npm test || echo -e "${YELLOW}Tests failed, but continuing...${NC}"
cd ..

# Build frontend
echo -e "${GREEN}Building frontend...${NC}"
cd frontend
npm install
npm run build
cd ..

echo -e "${GREEN}✅ Build complete!${NC}"
echo -e "${GREEN}Ready for deployment!${NC}"

