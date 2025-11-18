# ⚡ QUICK FIX - MongoDB Connection Error

## ❌ Current Error
```
MongoDB connection error: querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net
```

This means your `backend/.env` file still has **placeholder values**, not a real MongoDB connection string.

## ✅ Solution (5 Minutes)

### Step 1: Get MongoDB Atlas Connection String

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
   - Sign up (free) if you don't have an account
   - Login

2. **Create/Select a Cluster**:
   - Click "Build a Database" or select existing cluster
   - Choose "M0 FREE" (free tier)
   - Wait for cluster to be created (1-3 minutes)

3. **Create Database User**:
   - Click "Database Access" (left menu)
   - Click "Add New Database User"
   - Username: `mernuser` (or any name)
   - Password: Click "Autogenerate Secure Password" → **COPY THE PASSWORD!**
   - Click "Add User"

4. **Whitelist Your IP**:
   - Click "Network Access" (left menu)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for testing)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### Step 2: Update backend/.env

1. **Open** `backend/.env` in your code editor

2. **Find this line**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

3. **Replace it** with your connection string, but:
   - Replace `<password>` with the password you copied
   - Add `/mern-db` before the `?` (this is your database name)
   
   **Example:**
   ```env
   MONGODB_URI=mongodb+srv://mernuser:abc123xyz@cluster0.xxxxx.mongodb.net/mern-db?retryWrites=true&w=majority
   ```

4. **Save the file**

### Step 3: Verify

Nodemon will automatically restart. You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

If you still see an error, run:
```powershell
cd backend
node test-connection.js
```

## 🔍 Connection String Format

Your connection string should look like:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

**Important:**
- ✅ `USERNAME` = your database username (e.g., `mernuser`)
- ✅ `PASSWORD` = your actual password (no `<password>` placeholder!)
- ✅ `CLUSTER` = your actual cluster (e.g., `cluster0.abc123`)
- ✅ `DATABASE` = your database name (e.g., `mern-db`)

## 🐛 Still Not Working?

### Check 1: Password Special Characters
If your password has `@`, `#`, `$`, etc., URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`

Or use a password without special characters.

### Check 2: IP Whitelist
Make sure your IP is whitelisted in MongoDB Atlas:
- Go to "Network Access"
- Your IP should be listed (or "Allow Access from Anywhere")

### Check 3: Test Connection
Run the test script:
```powershell
cd backend
node test-connection.js
```

This will tell you exactly what's wrong.

## 📝 Example .env File

After updating, your `backend/.env` should have:
```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb+srv://mernuser:YourActualPassword@cluster0.abc123.mongodb.net/mern-db?retryWrites=true&w=majority

JWT_SECRET=59d1cf08cb3cd18828e75ac453a2beb7b756f07398960d2a58115823d5d29221
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3000
```

**Remember:** Never commit `.env` files to Git!

