# PowerShell script to switch to local MongoDB
# This updates backend/.env to use local MongoDB instead of MongoDB Atlas

Write-Host "🔧 Switching to Local MongoDB..." -ForegroundColor Cyan
Write-Host ""

$envFile = "backend\.env"

if (-not (Test-Path $envFile)) {
    Write-Host "❌ Error: backend/.env not found" -ForegroundColor Red
    Write-Host "Creating from template..."
    Copy-Item "backend\env.example" $envFile
}

# Read current .env
$content = Get-Content $envFile -Raw

# Update MONGODB_URI to local
$localMongoUri = "MONGODB_URI=mongodb://127.0.0.1:27017/mern-db"

if ($content -match "MONGODB_URI=.*") {
    $content = $content -replace "MONGODB_URI=.*", $localMongoUri
    Write-Host "✅ Updated MONGODB_URI to local MongoDB" -ForegroundColor Green
} else {
    # Add if not present
    $content += "`n$localMongoUri`n"
    Write-Host "✅ Added MONGODB_URI for local MongoDB" -ForegroundColor Green
}

# Save updated .env
Set-Content -Path $envFile -Value $content

Write-Host ""
Write-Host "✅ Configuration updated!" -ForegroundColor Green
Write-Host ""
Write-Host "Current MongoDB URI: mongodb://127.0.0.1:27017/mern-db" -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Test connection: cd backend && node test-connection.js"
Write-Host "2. Start server: cd backend && npm run dev"
Write-Host ""

