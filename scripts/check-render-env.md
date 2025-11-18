# Render Environment Variables Checklist

## Required Variables for Backend

Copy these to your Render dashboard → Environment tab:

### 1. MONGODB_URI
```
mongodb+srv://mernuser:mernuser1234@cluster0.hzkdocw.mongodb.net/mern-db?retryWrites=true&w=majority
```
**Important:** 
- NO quotes
- NO spaces
- Use your actual password

### 2. JWT_SECRET
```
59d1cf08cb3cd18828e75ac453a2beb7b756f07398960d2a58115823d5d29221
```
Or generate a new one:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. NODE_ENV
```
production
```

### 4. FRONTEND_URL
```
https://your-frontend.vercel.app
```
(Update with your actual frontend URL)

### 5. PORT
```
10000
```
(Render usually sets this automatically, but you can set it explicitly)

## How to Set in Render

1. Go to https://dashboard.render.com
2. Select your backend service
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"** for each variable
5. Enter Key and Value (NO quotes!)
6. Click **"Save Changes"**
7. Service will automatically redeploy

## Common Mistakes

❌ **WRONG:**
```
MONGODB_URI = "mongodb+srv://..."
```

✅ **CORRECT:**
```
MONGODB_URI=mongodb+srv://...
```

❌ **WRONG:**
```
MONGODB_URI = mongodb+srv://... (with spaces)
```

✅ **CORRECT:**
```
MONGODB_URI=mongodb+srv://... (no spaces)
```

