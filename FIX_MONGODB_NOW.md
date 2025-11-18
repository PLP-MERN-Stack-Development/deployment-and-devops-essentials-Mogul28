# 🚨 Fix MongoDB Connection - Quick Guide

## The Problem
Your `backend/.env` file has placeholder values that need to be replaced with a real MongoDB connection string.

## ⚡ Quick Fix (Choose One)

### Option 1: Use MongoDB Atlas (Recommended - Free)

**Step 1: Get MongoDB Connection String (5 minutes)**

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free, no credit card needed)
3. After login, click **"Build a Database"**
4. Choose **"M0 FREE"** → Click **"Create"** (wait 1-3 minutes)
5. Click **"Database Access"** (left sidebar)
   - Click **"Add New Database User"**
   - Username: `mernuser`
   - Password: Click **"Autogenerate Secure Password"** → **COPY IT!**
   - Click **"Add User"**
6. Click **"Network Access"** (left sidebar)
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (for testing)
   - Click **"Confirm"**
7. Go back to **"Database"** → Click **"Connect"** on your cluster
8. Choose **"Connect your application"**
9. Copy the connection string (looks like):
   ```
   mongodb+srv://mernuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

**Step 2: Update Your .env File**

1. Open `backend/.env` in your editor
2. Find this line:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
3. Replace it with your connection string, but:
   - Replace `<password>` with the password you copied
   - Add `/mern-db` before the `?` (database name)
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://mernuser:MyPassword123@cluster0.abc123.mongodb.net/mern-db?retryWrites=true&w=majority
   ```
4. Save the file

**Step 3: Test**

Nodemon will automatically restart. You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

If you still see an error, run:
```powershell
cd backend
node test-connection.js
```

---

### Option 2: Use Local MongoDB (If you have MongoDB installed)

1. Open `backend/.env`
2. Change this line:
   ```
   MONGODB_URI=mongodb://localhost:27017/mern-db
   ```
3. Make sure MongoDB is running locally
4. Save and restart

---

## 🔍 Verify Your Connection String Format

Your connection string should look like this:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

**Important:**
- ✅ Replace `USERNAME` with your database username
- ✅ Replace `PASSWORD` with your actual password (no `<password>` placeholder)
- ✅ Replace `CLUSTER` with your actual cluster name (e.g., `cluster0.abc123`)
- ✅ Replace `DATABASE_NAME` with your database name (e.g., `mern-db`)

---

## 🐛 Common Issues

### Issue: "querySrv ENOTFOUND"
- ❌ Connection string still has placeholder values
- ✅ Solution: Replace with real MongoDB Atlas connection string

### Issue: "Authentication failed"
- ❌ Wrong password or username
- ✅ Solution: Double-check username/password in MongoDB Atlas

### Issue: "Connection timeout"
- ❌ IP not whitelisted
- ✅ Solution: Go to Network Access in MongoDB Atlas → Add your IP

### Issue: Password has special characters
If your password has `@`, `#`, `$`, etc., you need to URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- Or use a password without special characters

---

## ✅ Success Looks Like This

When it works, you'll see:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

No more errors! 🎉

