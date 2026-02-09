# Git setup and commit script
cd c:\Users\HP\OneDrive\Documents\dhaka-bus-app

# Check if we're on the right branch
git branch

# Add all files
git add -A

# Commit with message
git commit -m "feat: initial Dhaka Bus Service application

- Add MySQL database schema with buses, stops, routes, and route_stops tables
- Implement PHP REST API backend with route finding algorithm
- Create React frontend with modern UI
- Integrate OpenStreetMap with Leaflet.js for free maps
- Add Google Gemini AI for natural language search
- Support direct and multi-bus transfer route planning
- Include comprehensive documentation

Features:
* Search routes between any two locations in Dhaka
* AI-powered natural language search
* Interactive map showing bus stops and user location
* Calculate fares and travel times
* Find nearby bus stops using GPS
* Route preferences (fastest, cheapest, balanced)"

# Show log
git log --oneline

# Show current status
git status
