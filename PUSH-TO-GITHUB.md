# Push to GitHub Instructions

## Option 1: Push to Feature Branch (Recommended for development)

```powershell
git remote add origin https://github.com/buildwithnahin/dhaka-bus-app.git
git push -u origin feature/initial-app-setup
```

## Option 2: Push to Main Branch

```powershell
git branch -M main
git remote add origin https://github.com/buildwithnahin/dhaka-bus-app.git
git push -u origin main
```

## After First Push

For future updates, simply run:

```powershell
git add -A
git commit -m "Your commit message"
git push
```

## Repository Details
- **GitHub Username:** buildwithnahin
- **Email:** nahin.codebug@gmail.com
- **Repository:** dhaka-bus-app
- **Current Branch:** feature/initial-app-setup

## What's Included
✅ React frontend with OpenStreetMap
✅ Node.js REST API 
✅ 115 Dhaka locations
✅ Route finding algorithm
✅ Fare calculation (10 TK base + 2.5 TK/km)
✅ Direct & transfer routes
✅ Route stops display
✅ Complete documentation
