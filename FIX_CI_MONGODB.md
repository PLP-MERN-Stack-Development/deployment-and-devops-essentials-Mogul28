# 🔧 Fix MongoDB Connection in GitHub Actions CI

## The Problem

Tests are failing in GitHub Actions because they can't connect to MongoDB:
```
MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

## ✅ Solution Applied

### 1. Updated MongoDB Service Configuration

**Changes made:**
- ✅ Changed MongoDB image to specific version: `mongo:7.0`
- ✅ Increased health check retries: `10` (from 5)
- ✅ Added health start period: `40s` (gives MongoDB time to start)
- ✅ Improved health check configuration

### 2. Added MongoDB Wait Step

Added a step to wait for MongoDB to be ready before running tests:
- Uses `nc` (netcat) to check if port 27017 is open
- Retries up to 30 times (60 seconds total)
- Only proceeds when MongoDB is confirmed ready

### 3. Improved Test Connection Logic

Updated `backend/tests/auth.test.js`:
- ✅ Added retry logic (5 attempts)
- ✅ Increased connection timeout to 15 seconds
- ✅ Better error messages
- ✅ Increased beforeAll timeout to 60 seconds

## Current Workflow Configuration

```yaml
services:
  mongodb:
    image: mongo:7.0
    ports:
      - 27017:27017
    options: >-
      --health-cmd "mongosh --eval 'db.runCommand({ ping: 1 })'"
      --health-interval 10s
      --health-timeout 5s
      --health-retries 10
      --health-start-period 40s
```

## Alternative Solution

If the service container approach still doesn't work, I've created an alternative workflow file:
- `.github/workflows/backend-ci-alternative.yml`

This uses the `supercharge/mongodb-github-action` which is more reliable:
- Starts MongoDB as a GitHub Action
- Handles setup automatically
- More reliable in CI environments

To use it:
1. Rename `backend-ci.yml` to `backend-ci-backup.yml`
2. Rename `backend-ci-alternative.yml` to `backend-ci.yml`
3. Commit and push

## Verification

After these changes, your CI should:
1. ✅ Start MongoDB service container
2. ✅ Wait for MongoDB to be ready
3. ✅ Connect successfully in tests
4. ✅ Run all tests successfully

## If Still Failing

### Option 1: Use Alternative Workflow

Switch to the alternative workflow that uses the MongoDB GitHub Action.

### Option 2: Use MongoDB Atlas for Tests

Instead of local MongoDB, use a test MongoDB Atlas cluster:

1. Create a test cluster in MongoDB Atlas
2. Add GitHub Actions IP to network access (or allow all)
3. Update workflow:
   ```yaml
   env:
     MONGODB_URI: ${{ secrets.TEST_MONGODB_URI }}
   ```
4. Add `TEST_MONGODB_URI` as GitHub Secret

### Option 3: Skip Tests in CI (Not Recommended)

Only if absolutely necessary:
```yaml
- name: Run tests
  run: npm test || echo "Tests skipped"
  continue-on-error: true
```

## Testing Locally

To test the same setup locally:

1. Start MongoDB:
   ```bash
   docker run -d -p 27017:27017 mongo:7.0
   ```

2. Run tests:
   ```bash
   cd backend
   MONGODB_URI=mongodb://127.0.0.1:27017/mern-test npm test
   ```

---

**The workflow should now work correctly in GitHub Actions!** ✅

