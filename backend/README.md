# Backend Setup Instructions

## Prerequisites
- PHP 7.4 or higher
- MySQL 8.0 or higher
- Composer (PHP package manager)

## Installation Steps

1. **Install Composer dependencies:**
   ```bash
   cd backend
   composer install
   ```

2. **Create environment file:**
   ```bash
   cp ../.env.example ../.env
   ```

3. **Configure database:**
   Edit `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_NAME=dhaka_bus_db
   DB_USER=root
   DB_PASSWORD=your_password
   ```

4. **Setup database:**
   ```bash
   mysql -u root -p < ../database/schema.sql
   mysql -u root -p dhaka_bus_db < ../database/sample_data.sql
   ```

5. **Get Gemini API Key (Free):**
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Add to `.env`: `GEMINI_API_KEY=your_key_here`

6. **Run the PHP development server:**
   ```bash
   php -S localhost:8000
   ```

7. **Test the API:**
   Visit: http://localhost:8000/api/health

## API Endpoints

### GET /api/health
Health check endpoint

### GET /api/stops
Get all bus stops

### GET /api/nearby-stops?lat=23.7808&lng=90.4172&radius=1
Get nearby stops within radius (km)

### GET /api/buses
Get all active buses

### GET /api/routes
Get all routes

### POST /api/search
Search for routes

**Request body:**
```json
{
  "from": "Gulshan",
  "to": "Motijheel",
  "preference": "balanced"
}
```

**Or with natural language:**
```json
{
  "query": "I want to go from New Market to Shyamoli",
  "preference": "fastest"
}
```

**Preferences**: `balanced`, `fastest`, `cheapest`, `least_transfer`

## Troubleshooting

### "Database connection failed"
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

### "Call to undefined function Dotenv\..."
- Run `composer install` in backend folder

### CORS errors
- CORS is already configured in index.php
- If issues persist, check your frontend URL matches the allowed origin
