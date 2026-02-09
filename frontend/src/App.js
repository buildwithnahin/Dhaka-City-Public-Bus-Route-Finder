import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RouteResults from './components/RouteResults';
import Map from './components/Map';
import NearbyStops from './components/NearbyStops';

function App() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStops, setNearbyStops] = useState([]);

  const handleSearch = async (searchData) => {
    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      const data = await response.json();
      setRoutes(data.routes || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search routes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          // Fetch nearby stops
          try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            const response = await fetch(
              `${API_URL}/api/nearby-stops?lat=${latitude}&lng=${longitude}&radius=1`
            );
            const data = await response.json();
            setNearbyStops(data.stops || []);
          } catch (error) {
            console.error('Nearby stops error:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Failed to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🚌 Dhaka Bus Service</h1>
          <p>Find your bus route easily</p>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            <div className="search-section">
              <SearchBar onSearch={handleSearch} loading={loading} />
              
              <button className="location-btn" onClick={handleGetLocation}>
                📍 Find Nearby Bus Stops
              </button>

              {nearbyStops.length > 0 && (
                <NearbyStops stops={nearbyStops} />
              )}

              {routes.length > 0 && (
                <RouteResults 
                  routes={routes} 
                  onSelectRoute={setSelectedRoute}
                  selectedRoute={selectedRoute}
                />
              )}

              {!loading && routes.length === 0 && (
                <div className="info-card">
                  <h3>How to use:</h3>
                  <ul>
                    <li>Enter your starting point and destination</li>
                    <li>Or use natural language: "I want to go from Gulshan to Motijheel"</li>
                    <li>Click "Find Route" to see available buses</li>
                    <li>View direct routes or transfer options</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="map-section">
              <Map 
                userLocation={userLocation}
                nearbyStops={nearbyStops}
                selectedRoute={selectedRoute}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Made with ❤️ for Dhaka commuters | Data is sample for demonstration</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
