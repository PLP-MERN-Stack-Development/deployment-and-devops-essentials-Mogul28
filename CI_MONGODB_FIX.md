# 🔧 Fix MongoDB Connection in GitHub Actions

## Problem

Tests fail in CI with:
```
MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

## ✅ Solutions Applied

### Solution 1: Improved Service Container (Current)

**Updated `.github/workflows/backend-ci.yml`:**

1. **MongoDB Service:**
   - Specific version: `mongo:7.0`
   - Increased health retries: `10`
   - Added health start period: `40s`
   - Better health check configuration

2. **Wait Step:**
   - Checks if MongoDB port is open
   - Retries up to 30 times (60 seconds)
   - Uses TCP connection check

3. **Test Retry Logic:**
   - Tests retry connection 5 times
   - Increased timeouts
   - Better error handling

### Solution 2: Alternative Workflow (If Solution 1 Fails)

**File:** `.github/workflows/backend-ci-alternative.yml`

Uses `supercharge/mongodb-github-action` which is more reliable:

```yaml
- name: Start MongoDB
  uses: supercharge/mongodb-github-action@1.12.0
  with:
    mongodb-version: '7.0'
```

**To use:**
1. Backup current: `mv .github/workflows/backend-ci.yml .github/workflows/backend-ci-backup.yml`
2. Use alternative: `mv .github/workflows/backend-ci-alternative.yml .github/workflows/backend-ci.yml`
3. Commit and push

### Solution 3: Use MongoDB Atlas for Tests

If service containers are unreliable:

1. Create test MongoDB Atlas cluster
2. Add GitHub Secret: `TEST_MONGODB_URI`
3. Update workflow:
   ```yaml
   env:
     MONGODB_URI: ${{ secrets.TEST_MONGODB_URI }}
   ```

## Current Configuration

**MongoDB Service:**
- Image: `mongo:7.0`
- Port: `27017`
- Health checks: 10 retries, 40s start period

**Test Configuration:**
- Database: `mern-test`
- Connection: `mongodb://127.0.0.1:27017/mern-test`
- Retries: 5 attempts
- Timeout: 60 seconds

## Verification

The workflow should now:
1. ✅ Start MongoDB service container
2. ✅ Wait for MongoDB to be ready (up to 60 seconds)
3. ✅ Connect successfully in tests
4. ✅ Run all tests

## If Still Failing

1. **Check workflow logs** for MongoDB service status
2. **Try the alternative workflow** (uses MongoDB GitHub Action)
3. **Use MongoDB Atlas** for more reliable CI testing
4. **Increase timeouts** further if needed

---

**The workflow is now configured to handle MongoDB startup delays!** ✅

