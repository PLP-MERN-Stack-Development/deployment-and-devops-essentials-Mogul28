# MongoDB Atlas Setup Guide

## The Problem

Your `.env` file currently has placeholder values:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

This is not a real connection string, which is why you're getting the error:
```
MongoDB connection error: querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net
```

## Solution: Set Up MongoDB Atlas (Free Tier)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (no credit card required for free tier)
3. Verify your email

### Step 2: Create a Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** (Free Shared Cluster)
3. Select a cloud provider and region (choose closest to you)
4. Click **"Create"** (takes 1-3 minutes)

### Step 3: Create Database User

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `mernuser` (or your choice)
   - **Password**: Generate a secure password (click "Autogenerate Secure Password" or create your own)
   - **Save the password** - you'll need it!
5. Set user privileges to **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Configure Network Access

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ For production, use specific IPs only
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://mernuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File

1. Open `backend/.env` in your editor
2. Replace the `MONGODB_URI` line with your connection string
3. **Important**: Replace `<password>` with your actual database user password
4. Add a database name before the `?` - example:
   ```
   mongodb+srv://mernuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mern-db?retryWrites=true&w=majority
   ```

**Example of correct format:**
```env
MONGODB_URI=mongodb+srv://mernuser:MySecurePassword123@cluster0.abc123.mongodb.net/mern-db?retryWrites=true&w=majority
```

### Step 7: Test Connection

1. Save the `.env` file
2. Restart your backend server (nodemon should auto-restart)
3. You should see: `MongoDB Connected: cluster0.xxxxx.mongodb.net`

## Alternative: Local MongoDB (Optional)

If you prefer to use a local MongoDB instead:

1. **Install MongoDB Community Edition:**
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Or use Docker: `docker run -d -p 27017:27017 mongo`

2. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/mern-db
   ```

## Troubleshooting

### Error: "querySrv ENOTFOUND"
- ✅ Check that your connection string is correct
- ✅ Verify you replaced `<password>` with actual password
- ✅ Ensure network access allows your IP

### Error: "Authentication failed"
- ✅ Verify username and password are correct
- ✅ Check that password doesn't have special characters that need URL encoding
- ✅ Ensure database user has read/write permissions

### Error: "Connection timeout"
- ✅ Check your internet connection
- ✅ Verify network access in MongoDB Atlas includes your IP
- ✅ Try using "Allow Access from Anywhere" for testing

### Special Characters in Password

If your password has special characters, you need to URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- etc.

Or use a password without special characters for easier setup.

## Quick Test

After updating your `.env` file, your server should show:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

If you see this, you're all set! 🎉

