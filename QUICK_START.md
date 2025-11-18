# 🚀 Quick Start Guide

## Environment Variables Setup

Your `.env` files have been created! Here's what you need to update:

### ✅ Files Created
- ✅ `backend/.env` - Created from template
- ✅ `frontend/.env` - Created from template

### 📝 Required Updates

#### 1. Backend `.env` File

Edit `backend/.env` and update these values:

**MongoDB URI:**
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/mern-db?retryWrites=true&w=majority
```

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `mern-db` (or your preferred name)

**JWT Secret:**
```env
JWT_SECRET=59d1cf08cb3cd18828e75ac453a2beb7b756f07398960d2a58115823d5d29221
```
*(A secure JWT secret has been generated for you - you can use this one or generate a new one)*

**To generate a new JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 2. Frontend `.env` File

Edit `frontend/.env` and verify:

```env
VITE_API_URL=http://localhost:5000
```

This is already set correctly for local development. When deploying, update it to your backend URL.

### 🎯 Quick Setup Steps

1. **Get MongoDB Atlas URI:**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster (free tier is fine)
   - Get connection string
   - Update `backend/.env` with your MongoDB URI

2. **Update JWT Secret:**
   - Use the generated secret above, or generate a new one
   - Update `JWT_SECRET` in `backend/.env`

3. **Verify Frontend URL:**
   - `frontend/.env` is already configured for local development
   - No changes needed unless you want to test with a different backend

### ✅ Verification

After updating your `.env` files:

1. **Test Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   You should see: "MongoDB Connected" and "Server running..."

2. **Test Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Open http://localhost:3000 in your browser

### 🔒 Security Reminder

- ✅ `.env` files are already in `.gitignore` (won't be committed)
- ✅ Never share your `.env` files
- ✅ Use different secrets for production
- ✅ Keep your MongoDB password secure

### 📚 More Information

See `ENV_SETUP.md` for detailed documentation on all environment variables.

