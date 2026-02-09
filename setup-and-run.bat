@echo off
echo ========================================
echo Dhaka Bus App - Setup and Run Script
echo ========================================
echo.

cd /d "%~dp0"

echo [1/6] Creating environment file...
if not exist .env (
    copy .env.example .env
    echo .env file created from template
) else (
    echo .env already exists
)
echo.

echo [2/6] Installing backend dependencies...
cd backend
if exist composer.json (
    call composer install
    echo Backend dependencies installed
) else (
    echo Warning: composer.json not found
)
cd ..
echo.

echo [3/6] Creating frontend environment file...
cd frontend
if not exist .env (
    copy .env.example .env
    echo Frontend .env created
) else (
    echo Frontend .env already exists
)
echo.

echo [4/6] Installing frontend dependencies...
if exist package.json (
    call npm install
    echo Frontend dependencies installed
) else (
    echo Warning: package.json not found
)
cd ..
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo IMPORTANT: Before running the app:
echo 1. Setup MySQL database (see docs/SETUP.md)
echo 2. Edit .env file with your database credentials
echo 3. Get free Gemini API key from: https://makersuite.google.com/app/apikey
echo.
echo To start the application:
echo 1. Backend:  cd backend  then  php -S localhost:8000
echo 2. Frontend: cd frontend then  npm start
echo.
echo Ready to run? (Press any key to start servers or Ctrl+C to exit)
pause
