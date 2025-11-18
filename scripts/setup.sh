#!/bin/bash

# Setup script for MERN Stack Application
# This script helps set up the development environment

set -e

echo "🔧 Setting up MERN Stack Application..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${YELLOW}Warning: Node.js 18+ is recommended${NC}"
fi

# Setup backend
echo -e "${GREEN}Setting up backend...${NC}"
cd backend
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env from env.example...${NC}"
    cp env.example .env
    echo -e "${YELLOW}Please update backend/.env with your configuration${NC}"
fi
npm install
cd ..

# Setup frontend
echo -e "${GREEN}Setting up frontend...${NC}"
cd frontend
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env from env.example...${NC}"
    cp env.example .env
    echo -e "${YELLOW}Please update frontend/.env with your configuration${NC}"
fi
npm install
cd ..

echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e "${GREEN}Next steps:${NC}"
echo "1. Update backend/.env with your MongoDB URI and JWT secret"
echo "2. Update frontend/.env with your API URL"
echo "3. Run 'npm run dev' in backend directory"
echo "4. Run 'npm run dev' in frontend directory"

