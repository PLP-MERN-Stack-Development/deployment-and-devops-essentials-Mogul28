# 🗄️ Local MongoDB Setup Guide

## Option 1: Install MongoDB Community Edition (Recommended)

### Windows Installation

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and run the installer

2. **Installation Steps:**
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - optional but helpful)

3. **Verify Installation:**
   ```powershell
   # Check if MongoDB service is running
   Get-Service MongoDB
   
   # Or check if MongoDB is listening on port 27017
   netstat -ano | findstr :27017
   ```

4. **Start MongoDB (if not running as service):**
   ```powershell
   # Start MongoDB service
   Start-Service MongoDB
   
   # Or run manually
   mongod --dbpath "C:\data\db"
   ```

### Linux/Mac Installation

**Ubuntu/Debian:**
```bash
# Import MongoDB public GPG key
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

## Option 2: Use Docker (Easier)

### Install Docker Desktop

1. Download Docker Desktop: https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop

### Run MongoDB Container

```bash
# Run MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb-data:/data/db \
  mongo:7.0

# Check if running
docker ps

# View logs
docker logs mongodb
```

**Windows PowerShell:**
```powershell
docker run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo:7.0
docker ps
```

### Stop/Start MongoDB Container

```bash
# Stop
docker stop mongodb

# Start
docker start mongodb

# Remove (if needed)
docker rm mongodb
```

## Configure Your Application

### Update backend/.env

1. Open `backend/.env`
2. Update `MONGODB_URI`:

**For local MongoDB:**
```env
MONGODB_URI=mongodb://127.0.0.1:27017/mern-db
```

**Or if using Docker with different host:**
```env
MONGODB_URI=mongodb://localhost:27017/mern-db
```

### Test Connection

```bash
cd backend
node test-connection.js
```

You should see:
```
✅ Successfully connected to MongoDB!
   Host: 127.0.0.1
   Database: mern-db
```

## Verify MongoDB is Running

### Check if MongoDB is Running

**Windows:**
```powershell
# Check service
Get-Service MongoDB

# Check port
netstat -ano | findstr :27017

# Test connection
mongosh
```

**Linux/Mac:**
```bash
# Check service
sudo systemctl status mongod

# Check port
netstat -an | grep 27017

# Test connection
mongosh
```

### Connect with MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Or specify database
mongosh mern-db

# List databases
show dbs

# Use database
use mern-db

# List collections
show collections
```

## Common Issues

### Issue: "Connection refused"

**Solution:**
- Make sure MongoDB is running
- Check if port 27017 is available
- Verify firewall isn't blocking the port

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Use `127.0.0.1` instead of `localhost` (more reliable)
- Check MongoDB logs for errors
- Verify MongoDB is listening on the correct port

### Issue: "Permission denied"

**Solution:**
- Make sure MongoDB data directory has correct permissions
- On Linux/Mac: `sudo chown -R mongodb:mongodb /var/lib/mongodb`

## MongoDB Compass (GUI Tool)

MongoDB Compass provides a visual interface:

1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Browse databases and collections visually

## Quick Start Script

Create a script to start MongoDB easily:

**Windows (`start-mongodb.ps1`):**
```powershell
# Check if Docker is available
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "Starting MongoDB with Docker..."
    docker start mongodb 2>$null
    if ($LASTEXITCODE -ne 0) {
        docker run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo:7.0
    }
    Write-Host "MongoDB started on port 27017"
} else {
    Write-Host "Starting MongoDB service..."
    Start-Service MongoDB
}
```

**Linux/Mac (`start-mongodb.sh`):**
```bash
#!/bin/bash
if command -v docker &> /dev/null; then
    echo "Starting MongoDB with Docker..."
    docker start mongodb || docker run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo:7.0
    echo "MongoDB started on port 27017"
else
    echo "Starting MongoDB service..."
    sudo systemctl start mongod
fi
```

## Environment Variables

After setting up local MongoDB, your `backend/.env` should have:

```env
NODE_ENV=development
PORT=5000

# Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/mern-db

# JWT Configuration
JWT_SECRET=your-secure-secret-here
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

## Testing

1. **Start MongoDB** (using one of the methods above)
2. **Update backend/.env** with local MongoDB URI
3. **Test connection:**
   ```bash
   cd backend
   node test-connection.js
   ```
4. **Start your server:**
   ```bash
   npm run dev
   ```

You should see:
```
MongoDB Connected: 127.0.0.1
Server running in development mode on port 5000
```

---

**Your local MongoDB is now configured!** ✅

