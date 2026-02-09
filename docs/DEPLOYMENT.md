# Deployment Guide

## Free Hosting Options

This guide covers deploying your Dhaka Bus Service app with **zero budget**.

---

## Option 1: InfinityFree (PHP + MySQL) + Vercel (React)

### Backend (PHP + MySQL) on InfinityFree

#### 1. Sign Up
- Visit: https://www.infinityfree.net/
- Create free account (no credit card needed)
- Create new hosting account

#### 2. Setup Database
1. Go to MySQL Databases in control panel
2. Create new database: `dhaka_bus_db`
3. Note the database credentials

#### 3. Upload Files
1. Use File Manager or FTP (FileZilla)
2. Upload entire `backend` folder to `htdocs`
3. Upload `database/schema.sql` and `database/sample_data.sql`

#### 4. Import Database
1. Go to phpMyAdmin
2. Select your database
3. Click "Import"
4. Upload `schema.sql` first, then `sample_data.sql`

#### 5. Configure Environment
1. Create `.env` file in backend folder:
```env
DB_HOST=your_db_host_from_infinityfree
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
GEMINI_API_KEY=your_gemini_key
```

#### 6. Update Frontend API URL
Note your backend URL (e.g., `https://yoursite.infinityfreeapp.com/backend`)

### Frontend (React) on Vercel

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Prepare for Deployment
```bash
cd frontend

# Update .env for production
echo "REACT_APP_API_URL=https://yoursite.infinityfreeapp.com/backend" > .env.production
```

#### 3. Deploy
```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Project name: dhaka-bus-app
# - Framework: Create React App
# - Deploy: Yes
```

#### 4. Configure Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add: `REACT_APP_API_URL` = your backend URL

---

## Option 2: Render (Full Stack)

### Using Node.js Instead of PHP

This option requires converting PHP backend to Node.js (Express). Here's a simplified approach:

#### 1. Sign Up
- Visit: https://render.com/
- Sign up with GitHub

#### 2. Deploy Database
1. Create PostgreSQL database (free tier)
2. Convert MySQL schema to PostgreSQL
3. Import data

#### 3. Deploy Backend
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repo
4. Set environment variables
5. Deploy

#### 4. Deploy Frontend
1. Create new Static Site on Render
2. Connect GitHub repo (frontend folder)
3. Build command: `npm run build`
4. Publish directory: `build`
5. Deploy

---

## Option 3: Local Network (Testing Only)

For local testing or demonstration:

### 1. Find Your Local IP
**Windows:**
```bash
ipconfig
# Look for IPv4 Address (e.g., 192.168.1.5)
```

**Linux/Mac:**
```bash
ifconfig
# or
ip addr show
```

### 2. Update Configuration
```bash
# Backend .env
API_URL=http://YOUR_LOCAL_IP:8000

# Frontend .env
REACT_APP_API_URL=http://YOUR_LOCAL_IP:8000
```

### 3. Start Servers
```bash
# Backend
cd backend
php -S 0.0.0.0:8000

# Frontend (new terminal)
cd frontend
npm start
```

### 4. Access from Other Devices
Visit: `http://YOUR_LOCAL_IP:3000` from any device on same network

---

## Production Checklist

Before deploying to production:

### Security
- [ ] Remove DEBUG mode
- [ ] Add proper CORS restrictions
- [ ] Implement rate limiting
- [ ] Sanitize all inputs
- [ ] Use prepared statements (already done)
- [ ] Enable HTTPS only

### Performance
- [ ] Enable gzip compression
- [ ] Implement caching
- [ ] Optimize database queries
- [ ] Minify frontend assets
- [ ] Use CDN for assets

### Monitoring
- [ ] Set up error logging
- [ ] Monitor API usage
- [ ] Track database performance
- [ ] Set up uptime monitoring

### Database
- [ ] Regular backups
- [ ] Optimize indexes
- [ ] Clean old logs
- [ ] Monitor  disk usage

---

## Environment Variables Reference

### Backend `.env`
```env
DB_HOST=localhost
DB_NAME=dhaka_bus_db
DB_USER=root
DB_PASSWORD=password
GEMINI_API_KEY=your_key
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
APP_ENV=production
DEBUG=false
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GEMINI_API_KEY=your_key
```

---

## Domain Setup (Optional)

### Free Domain Options
1. **Freenom** - Free .tk, .ml, .ga domains
2. **No-IP** - Free subdomain (yourapp.no-ip.org)
3. **DuckDNS** - Free dynamic DNS

### Connect Domain
1. Get domain from provider
2. Point A record to server IP
3. Update CORS settings
4. Update environment variables

---

## Troubleshooting Deployment

### "502 Bad Gateway"
- Check backend is running
- Verify database connection
- Check error logs

### "CORS Policy" Error
- Update backend CORS settings
- Verify frontend API URL
- Check HTTPS/HTTP mismatch

### Database Connection Failed
- Verify credentials
- Check database server is running
- Ensure database exists

### Slow Performance
- Enable caching
- Optimize images
- Use CDN
- Check server resources

---

## Continuous Deployment (GitHub Actions)

### Create `.github/workflows/deploy.yml`
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Getting Help

For deployment issues:
- Check hosting provider documentation
- Search Stack Overflow
- GitHub Issues
- Email: nahin.codebug@gmail.com
