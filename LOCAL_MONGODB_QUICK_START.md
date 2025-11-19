# ⚡ Quick Start: Local MongoDB Configuration

## ✅ Status Check

Your system has:
- ✅ MongoDB service running on Windows
- ✅ MongoDB listening on port 27017
- ✅ Ready to use locally!

## 🔧 Configuration

### Current Setup

Your `backend/.env` has been updated to use local MongoDB:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/mern-db
```

### Verify Connection

Test the connection:
```powershell
cd backend
node test-connection.js
```

You should see:
```
✅ Successfully connected to MongoDB!
   Host: 127.0.0.1
   Database: mern-db
```

## 🚀 Start Your Application

### Backend Server

```powershell
cd backend
npm run dev
```

You should see:
```
MongoDB Connected: 127.0.0.1
Server running in development mode on port 5000
```

## 📊 MongoDB Management

### Connect with MongoDB Shell

```powershell
mongosh
```

Or connect to your database:
```powershell
mongosh mern-db
```

### Useful Commands

```javascript
// List databases
show dbs

// Use your database
use mern-db

// List collections
show collections

// View users
db.users.find()

// View posts
db.posts.find()

// Count documents
db.users.countDocuments()
db.posts.countDocuments()
```

### MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Browse your `mern-db` database visually

## 🔄 Switch Between Local and Atlas

### Use Local MongoDB (Current)
```env
MONGODB_URI=mongodb://127.0.0.1:27017/mern-db
```

### Use MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://mernuser:password@cluster0.xxxxx.mongodb.net/mern-db?retryWrites=true&w=majority
```

## 🛠️ MongoDB Service Management

### Check Status
```powershell
Get-Service MongoDB
```

### Start MongoDB
```powershell
Start-Service MongoDB
```

### Stop MongoDB
```powershell
Stop-Service MongoDB
```

### Restart MongoDB
```powershell
Restart-Service MongoDB
```

## 📝 Environment Variables

Your `backend/.env` should have:

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

## ✅ Verification Checklist

- [ ] MongoDB service is running
- [ ] Port 27017 is listening
- [ ] `.env` file updated with local MongoDB URI
- [ ] Connection test passes
- [ ] Server starts successfully
- [ ] Can create users and posts

## 🎯 Next Steps

1. ✅ Local MongoDB configured
2. ✅ Backend can connect
3. ⏭️ Test your API endpoints
4. ⏭️ Start frontend
5. ⏭️ Test complete application

---

**Your local MongoDB is configured and ready to use!** 🎉

