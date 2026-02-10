# Setup Guide - Dhaka Bus Service App

## Complete Installation Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PHP** (v7.4 or higher) - [Download](https://www.php.net/downloads)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Composer** - PHP package manager - [Download](https://getcomposer.org/)
- **Git** - [Download](https://git-scm.com/)

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/buildwithnahin/dhaka-bus-app.git
cd dhaka-bus-app
```

#### 2. Database Setup

**Start MySQL Server:**
```bash
# Windows
net start MySQL80

# Linux/Mac
sudo mysql.server start
```

**Create Database:**
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE dhaka_bus_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**Import Schema and Data:**
```bash
mysql -u root -p dhaka_bus_db < database/schema.sql
mysql -u root -p dhaka_bus_db < database/sample_data.sql
```

**Verify Data:**
```bash
mysql -u root -p dhaka_bus_db

# In MySQL:
SELECT COUNT(*) FROM buses;
SELECT COUNT(*) FROM stops;
SELECT COUNT(*) FROM routes;
EXIT;
```

#### 3. Backend Setup

**Navigate to backend folder:**
```bash
cd backend
```

**Install PHP dependencies:**
```bash
composer install
```

**Create environment file:**
```bash
# Copy example file
cp ../.env.example ../.env

# Edit .env with your credentials
```

**Configure `.env` file:**
```env
DB_HOST=localhost
DB_NAME=dhaka_bus_db
DB_USER=root
DB_PASSWORD=your_mysql_password

GEMINI_API_KEY=your_gemini_api_key_here

API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
APP_ENV=development
DEBUG=true
```

**Get Free Gemini API Key:**
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Paste in `.env` under `GEMINI_API_KEY`

**Start PHP Development Server:**
```bash
php -S localhost:8000
```

**Test Backend:**
Open browser and visit: http://localhost:8000/api/health

You should see: `{"status":"ok","message":"API is running"}`

#### 4. Frontend Setup

**Open new terminal** (keep backend running)

**Navigate to frontend folder:**
```bash
cd frontend
```

**Install Node.js dependencies:**
```bash
npm install
```

**Create environment file:**
```bash
cp .env.example .env
```

**Configure frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

**Start React Development Server:**
```bash
npm start
```

The app will automatically open in your browser at: http://localhost:3000

### 5. Verify Everything Works

1. **Check Backend:**
   - Visit: http://localhost:8000/api/buses
   - Should return JSON with bus data

2. **Check Frontend:**
   - Visit: http://localhost:3000
   - You should see the Dhaka Bus Service interface

3. **Test Search:**
   - Enter "Gulshan" in "From" field
   - Enter "Motijheel" in "To" field
   - Click "Find Route"
   - Should see available routes

4. **Test AI Search:**
   - Click "AI Search" tab
   - Enter: "I want to go from New Market to Shyamoli"
   - Click "Find Route"
   - AI should extract locations and show routes

5. **Test Location:**
   - Click "📍 Find Nearby Bus Stops"
   - Allow location access
   - Should see nearby stops on map

## Troubleshooting

### "Database connection failed"
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `.env`
- Ensure database exists: `SHOW DATABASES;`

### "composer: command not found"
- Install Composer from: https://getcomposer.org/
- Restart terminal after installation

### "npm: command not found"
- Install Node.js from: https://nodejs.org/
- Restart terminal after installation

### CORS Errors
- Ensure backend is running on port 8000
- Check frontend `.env` has correct API_URL
- Clear browser cache

### Leaflet Map Not Showing
- Check browser console for errors
- Verify internet connection (map tiles load from internet)
- Wait a few seconds for tiles to load

### "No routes found"
- Verify database has data: `SELECT * FROM routes;`
- Check location names (use: Gulshan, Motijheel, Mirpur, etc.)
- Try different locations

### Gemini AI Not Working
- Verify API key in `.env`
- Check internet connection
- Try regular location search instead

## Next Steps

1. **Customize Data:**
   - Edit `database/sample_data.sql`
   - Add more routes and stops
   - Re-import: `mysql -u root -p dhaka_bus_db < database/sample_data.sql`

2. **Deploy:**
   - See `docs/DEPLOYMENT.md` for hosting instructions

3. **Contribute:**
   - See `docs/CONTRIBUTING.md` for development guidelines

## Getting Help

If you encounter any issues:
1. Check this guide carefully
2. Search existing GitHub issues
3. Create new issue with error details
4. Email: nahin.codebug@gmail.com
