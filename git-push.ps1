# Git commit and push script
Write-Host "🔧 Configuring git..." -ForegroundColor Cyan
git config user.name "buildwithnahin"
git config user.email "nahin.codebug@gmail.com"

Write-Host "📦 Staging all files..." -ForegroundColor Cyan
git add -A

Write-Host "💾 Creating commit..." -ForegroundColor Cyan
git commit -m "feat: Complete Dhaka Bus Service Application

- React frontend with OpenStreetMap integration
- Node.js REST API with route finding algorithm
- 115 major Dhaka locations covering all zones
- Direct and transfer route calculations
- Route stops display in text format
- Google Gemini AI for natural language search
- Haversine distance calculation for accurate fares
- Base fare 10 TK + 2.5 TK/km pricing model
- 15 comprehensive bus routes across Dhaka
- Real-time fare and time estimation
- Responsive UI with map markers and route visualization"

Write-Host ""
Write-Host "✅ Commit created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📤 Next steps to push to GitHub:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub: https://github.com/new" -ForegroundColor White
Write-Host "   Repository name: dhaka-bus-app" -ForegroundColor White
Write-Host "   Description: Dhaka Bus Service Route Finder Application" -ForegroundColor White
Write-Host "   Make it Public or Private (your choice)" -ForegroundColor White
Write-Host ""
Write-Host "2. After creating the repo, run these commands:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/buildwithnahin/dhaka-bus-app.git" -ForegroundColor White
Write-Host "   git push -u origin feature/initial-app-setup" -ForegroundColor White
Write-Host ""
Write-Host "Or if you want to push to main branch:" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/buildwithnahin/dhaka-bus-app.git" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
