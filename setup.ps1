# Dhaka Bus App - PowerShell Setup and Run Script
Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "Dhaka Bus App - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

# Step 1: Create .env file
Write-Host "[1/6] Creating environment file..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created from template" -ForegroundColor Green
} else {
    Write-Host "✓ .env already exists" -ForegroundColor Green
}
Write-Host ""

# Step 2: Install backend dependencies
Write-Host "[2/6] Checking backend dependencies..." -ForegroundColor Yellow
Set-Location "backend"
if (Test-Path "composer.json") {
    if (Get-Command composer -ErrorAction SilentlyContinue) {
        Write-Host "Installing PHP dependencies..." -ForegroundColor Gray
        composer install --no-interaction
        Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "⚠ Composer not found. Install from: https://getcomposer.org/" -ForegroundColor Red
    }
} else {
    Write-Host "⚠ composer.json not found" -ForegroundColor Red
}
Set-Location ".."
Write-Host ""

# Step 3: Create frontend .env
Write-Host "[3/6] Creating frontend environment file..." -ForegroundColor Yellow
Set-Location "frontend"
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Frontend .env created" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend .env already exists" -ForegroundColor Green
}

# Step 4: Install frontend dependencies
Write-Host ""
Write-Host "[4/6] Installing frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    if (Get-Command npm -ErrorAction SilentlyContinue) {
        Write-Host "This may take a few minutes..." -ForegroundColor Gray
        npm install
        Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "⚠ npm not found. Install Node.js from: https://nodejs.org/" -ForegroundColor Red
    }
} else {
    Write-Host "⚠ package.json not found" -ForegroundColor Red
}
Set-Location ".."
Write-Host ""

# Step 5: Check database
Write-Host "[5/6] Checking database setup..." -ForegroundColor Yellow
if (Get-Command mysql -ErrorAction SilentlyContinue) {
    Write-Host "✓ MySQL is installed" -ForegroundColor Green
    Write-Host "  Run these commands to setup database:" -ForegroundColor Gray
    Write-Host "  mysql -u root -p" -ForegroundColor Gray
    Write-Host "  CREATE DATABASE dhaka_bus_db;" -ForegroundColor Gray
    Write-Host "  EXIT;" -ForegroundColor Gray
    Write-Host "  mysql -u root -p dhaka_bus_db < database/schema.sql" -ForegroundColor Gray
    Write-Host "  mysql -u root -p dhaka_bus_db < database/sample_data.sql" -ForegroundColor Gray
} else {
    Write-Host "⚠ MySQL not found. Install from: https://dev.mysql.com/downloads/" -ForegroundColor Red
}
Write-Host ""

# Step 6: Configuration reminder
Write-Host "[6/6] Configuration checklist..." -ForegroundColor Yellow
Write-Host "  1. Edit .env with your MySQL credentials" -ForegroundColor Gray
Write-Host "  2. Get free Gemini API key: https://makersuite.google.com/app/apikey" -ForegroundColor Gray
Write-Host "  3. Add Gemini key to .env file" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 1 (Backend):" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  php -S localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 (Frontend):" -ForegroundColor Yellow
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
