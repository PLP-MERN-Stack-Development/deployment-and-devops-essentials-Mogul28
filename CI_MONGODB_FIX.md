# 🔧 GitHub Actions MongoDB Connection Fix

## Problem
Tests were failing in CI/CD workflows because MongoDB wasn't ready when tests tried to connect, resulting in connection refused errors (ECONNREFUSED).

## Solutions Applied

### 1. Improved MongoDB Service Configuration
**Files**: 
- `.github/workflows/backend-ci.yml` (CI workflow)
- `.github/workflows/backend-cd.yml` (CD workflow)

- ✅ Increased health check retries from 10 to 20
- ✅ Reduced health check interval from 10s to 5s for faster detection
- ✅ Reduced health start period from 40s to 30s
- ✅ Added `MONGO_INITDB_DATABASE` environment variable

### 2. Enhanced Wait Step
**Files**: 
- `.github/workflows/backend-ci.yml`
- `.github/workflows/backend-cd.yml`

- ✅ Replaced complex bash redirection with reliable `nc` (netcat) command
- ✅ Installs netcat if not available
- ✅ Waits up to 60 seconds for MongoDB to be ready
- ✅ Provides clear status messages
- ✅ Adds 2-second buffer after port is open for MongoDB initialization
- ✅ Better error messages with container status

### 3. Improved Test Connection Logic
**File**: `backend/tests/auth.test.js`

- ✅ Increased retries from 5 to 10 attempts
- ✅ Increased `serverSelectionTimeoutMS` from 10s to 15s
- ✅ Increased retry delay from 1s to 2s between attempts
- ✅ Added `retryWrites: true` option
- ✅ Better error logging with connection URI
- ✅ More descriptive success/error messages

## How It Works

1. **MongoDB Service Starts**: GitHub Actions starts MongoDB 7.0 container with health checks
2. **Health Checks**: Docker monitors MongoDB health every 5 seconds
3. **Wait Step**: After health checks pass, the wait step verifies port 27017 is open using `nc`
4. **Initialization Buffer**: 2-second wait ensures MongoDB is fully ready
5. **Tests Run**: Tests connect with retry logic (10 attempts, 15s timeout each)

## Connection String

The tests use:
```
mongodb://127.0.0.1:27017/mern-test
```

This is set via the `MONGODB_URI` environment variable in the workflow.

## Testing Locally

To test the same setup locally:

```bash
# Start MongoDB
docker run -d -p 27017:27017 --name mongo-test mongo:7.0

# Wait for it to be ready
until nc -z 127.0.0.1 27017; do sleep 1; done

# Run tests
cd backend
MONGODB_URI=mongodb://127.0.0.1:27017/mern-test npm test
```

## Verification

After these changes, both CI and CD workflows should:
- ✅ Successfully start MongoDB service
- ✅ Wait for MongoDB to be fully ready
- ✅ Connect to MongoDB in tests
- ✅ Run all tests successfully

## Important Note

The `backend-cd.yml` workflow now uses a **local MongoDB service container** for tests instead of the production MongoDB Atlas URI from secrets. This ensures:
- Tests run against a clean, isolated database
- No risk of affecting production data
- Faster test execution
- Consistent test environment

The production MongoDB URI from secrets is only used when deploying to Render, not during tests.

## Next Steps

1. Commit and push these changes
2. Check GitHub Actions workflow run
3. Verify tests pass in CI
4. Monitor for any remaining connection issues

---

**Note**: If you still see connection issues, check:
- MongoDB service logs in GitHub Actions
- Test output for specific error messages
- Network connectivity between test runner and MongoDB container
