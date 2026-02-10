# Dhaka Bus Service Web Application 🚌

A web application to help users find the right bus to take in Dhaka city with fare and travel time estimates.

## Features

- 🔍 **Smart Route Search** - Find direct or multi-bus routes
- 📍 **Location-based** - Shows nearby bus stops
- 💰 **Fare Estimation** - Calculate total journey cost
- ⏱️ **Time Estimation** - Estimated travel duration
- 🗺️ **Interactive Maps** - OpenStreetMap integration (100% free)
- 🤖 **AI-Powered Search** - Natural language search with Google Gemini
- 🔄 **Multi-bus Routes** - Suggests transfer routes when no direct bus available

## Example

**User Input:** "I'm at New Market and want to go to Shyamoli"

**App Output:**
- Nearby bus stops where to wait
- Available buses: Moumita, Thikana
- Estimated fare: 40 TK
- Travel time: ~35 minutes

## Tech Stack

- **Frontend:** React.js
- **Backend:** PHP (REST API)
- **Database:** MySQL
- **Maps:** OpenStreetMap + Leaflet.js
- **AI:** Google Gemini API (Free tier)
- **Version Control:** Git

## Project Structure

```
dhaka-bus-app/
├── frontend/          # React application
├── backend/           # PHP REST API
├── database/          # SQL schema and sample data
├── docs/             # Documentation
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PHP (v7.4+)
- MySQL (v8.0+)
- Composer (PHP package manager)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/buildwithnahin/dhaka-bus-app.git
cd dhaka-bus-app
```

2. **Setup Database**
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p dhaka_bus_db < database/sample_data.sql
```

3. **Setup Backend**
```bash
cd backend
composer install
cp .env.example .env
# Edit .env with your database credentials
```

4. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Add your Gemini API key
npm start
```

5. **Access the app**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Features Roadmap

### Phase 1 - MVP (Current)
- ✅ Basic route search
- ✅ Sample Dhaka bus data
- ✅ Fare and time calculation
- ✅ OpenStreetMap integration
- ✅ AI-powered natural language search

### Phase 2 - Enhancement
- ⏳ Admin panel for route management
- ⏳ Real Dhaka bus data collection
- ⏳ User feedback system
- ⏳ Mobile responsive design improvements

### Phase 3 - Advanced
- ⏳ Real-time bus tracking (requires hardware)
- ⏳ Crowdsourced data updates
- ⏳ Mobile native app
- ⏳ Bengali language support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for any purpose.

## Author

**Nahin**
- Email: nahin.codebug@gmail.com
- GitHub: @buildwithnahin

## Acknowledgments

- Dhaka city commuters for inspiration
- OpenStreetMap contributors
- Google Gemini for AI capabilities

---

**Note:** This project currently uses sample data. Real bus route data will be added in future updates.
