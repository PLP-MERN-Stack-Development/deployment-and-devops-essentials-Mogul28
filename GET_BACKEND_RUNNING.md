# 🚀 Get Backend Running Locally

## Current Status
- ✅ Backend code is ready
- ✅ Dependencies installed
- ❌ MongoDB connection needs to be configured

## Step 1: Choose Your MongoDB Option

You have 2 options:

### Option A: MongoDB Atlas (Cloud - Recommended)
- Free tier available
- No local installation needed
- Works immediately

### Option B: Local MongoDB
- Requires MongoDB installed on your computer
- Runs on `localhost:27017`

---

## Option A: MongoDB Atlas Setup (5 minutes)

### 1. Create MongoDB Atlas Account
- Go to: https://www.mongodb.com/cloud/atlas/register
- Sign up (free, no credit card)

### 2. Create a Free Cluster
- After login, click **"Build a Database"**
- Select **"M0 FREE"** (Free Shared)
- Choose a region close to you
- Click **"Create"** (wait 1-3 minutes)

### 3. Create Database User
- Click **"Database Access"** (left sidebar)
- Click **"Add New Database User"**
- Authentication: **Password**
- Username: `mernuser` (or your choice)
- Password: Click **"Autogenerate Secure Password"** → **COPY IT!**
- Database User Privileges: **"Read and write to any database"**
- Click **"Add User"**

### 4. Whitelist Your IP
- Click **"Network Access"** (left sidebar)
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"** (for local development)
- Click **"Confirm"**

### 5. Get Connection String
- Go to **"Database"** → Click **"Connect"** on your cluster
- Choose **"Connect your application"**
- Driver: **Node.js**, Version: **5.5 or later**
- Copy the connection string (looks like):
  ```
  mongodb+srv://mernuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

### 6. Update backend/.env
1. Open `backend/.env` in your editor
2. Find the line:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
3. Replace it with your connection string, but:
   - Replace `<password>` with the password you copied
   - Add `/mern-db` before the `?` (this is your database name)
   
   **Example:**
   ```env
   MONGODB_URI=mongodb+srv://mernuser:abc123xyz@cluster0.abc123.mongodb.net/mern-db?retryWrites=true&w=majority
   ```
4. Save the file

### 7. Test Connection
```powershell
cd backend
node test-connection.js
```

You should see:
```
✅ Successfully connected to MongoDB!
```

### 8. Start Backend Server
```powershell
cd backend
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## Option B: Local MongoDB Setup

### 1. Install MongoDB
- Download from: https://www.mongodb.com/try/download/community
- Or use Docker: `docker run -d -p 27017:27017 mongo`

### 2. Start MongoDB
- Windows: MongoDB should start as a service automatically
- Or run: `mongod` in a terminal

### 3. Update backend/.env
Open `backend/.env` and change:
```env
MONGODB_URI=mongodb://localhost:27017/mern-db
```

### 4. Start Backend Server
```powershell
cd backend
npm run dev
```

---

## ✅ Success Indicators

When your backend is running correctly, you'll see:

```
[nodemon] starting `node server.js`
Server running in development mode on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

**No errors!** 🎉

---

## 🧪 Test Your Backend

Once running, test these endpoints:

### Health Check
```powershell
curl http://localhost:5000/health
```
Or open in browser: http://localhost:5000/health

### Root Endpoint
```powershell
curl http://localhost:5000/
```
Or open in browser: http://localhost:5000/

### Register User
```powershell
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

---

## 🐛 Troubleshooting

### Error: "querySrv ENOTFOUND"
- ❌ Connection string still has placeholder values
- ✅ Solution: Update `backend/.env` with real MongoDB connection string

### Error: "Authentication failed"
- ❌ Wrong password
- ✅ Solution: Double-check password in MongoDB Atlas and `.env` file

### Error: "Connection timeout"
- ❌ IP not whitelisted
- ✅ Solution: Go to Network Access in MongoDB Atlas → Add your IP

### Server crashes immediately
- Check the error message
- Run `node test-connection.js` to diagnose MongoDB connection
- Verify `.env` file is in `backend/` directory

---

## 📝 Next Steps (After Backend is Running)

1. ✅ Backend running on http://localhost:5000
2. Test API endpoints
3. Then we'll work on frontend
4. Deployment comes later

---

**Focus: Get backend running first, deployment later!** 🎯

