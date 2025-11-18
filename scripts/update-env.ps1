# PowerShell script to update environment variables
# This script helps you configure your .env files

Write-Host "🔧 Environment Variables Setup" -ForegroundColor Cyan
Write-Host ""

# Check if .env files exist
if (-not (Test-Path "backend\.env")) {
    Write-Host "Creating backend/.env from template..." -ForegroundColor Yellow
    Copy-Item "backend\env.example" "backend\.env"
}

if (-not (Test-Path "frontend\.env")) {
    Write-Host "Creating frontend/.env from template..." -ForegroundColor Yellow
    Copy-Item "frontend\env.example" "frontend\.env"
}

Write-Host ""
Write-Host "✅ .env files are ready!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Edit backend/.env and update:" -ForegroundColor White
Write-Host "   - MONGODB_URI: Your MongoDB Atlas connection string" -ForegroundColor Gray
Write-Host "   - JWT_SECRET: Use a strong random secret (generated below)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Edit frontend/.env and update:" -ForegroundColor White
Write-Host "   - VITE_API_URL: Your backend URL (http://localhost:5000 for local)" -ForegroundColor Gray
Write-Host ""

# Generate JWT secret
Write-Host "🔑 Generated JWT Secret (copy this to backend/.env):" -ForegroundColor Cyan
$jwtSecret = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host $jwtSecret -ForegroundColor Yellow
Write-Host ""

Write-Host "Tip: Open backend/.env and frontend/.env in your editor to update the values." -ForegroundColor Cyan
Write-Host ""

