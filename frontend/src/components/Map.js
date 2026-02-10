import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons using URL encoding (works with all characters)
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml,' + encodeURIComponent(`
    <svg width="25" height="41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.9 12.5 28.5 12.5 28.5S25 21.4 25 12.5C25 5.6 19.4 0 12.5 0z" fill="#4285F4"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const busStopIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml,' + encodeURIComponent(`
    <svg width="25" height="41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.9 12.5 28.5 12.5 28.5S25 21.4 25 12.5C25 5.6 19.4 0 12.5 0z" fill="#10ac84"/>
      <circle cx="12.5" cy="12.5" r="7" fill="white"/>
      <rect x="10" y="8" width="5" height="10" fill="#10ac84"/>
      <circle cx="12.5" cy="7" r="2" fill="#10ac84"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

function MapUpdater({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

function Map({ userLocation, nearbyStops, selectedRoute }) {
  // Default center: Dhaka, Bangladesh
  const defaultCenter = [23.8103, 90.4125];
  const center = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : defaultCenter;

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={userLocation ? [userLocation.lat, userLocation.lng] : null} />

        {/* User location marker */}
        {userLocation && (
          <Marker 
            position={[userLocation.lat, userLocation.lng]} 
            icon={userIcon}
          >
            <Popup>
              <strong>📍 Your Location</strong>
            </Popup>
          </Marker>
        )}

        {/* Nearby bus stops */}
        {nearbyStops && nearbyStops.map((stop, index) => (
          <Marker
            key={index}
            position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}
            icon={busStopIcon}
          >
            <Popup>
              <div className="stop-popup">
                <strong>{stop.name}</strong>
                <p>{stop.area}</p>
                {stop.landmark && <p><em>{stop.landmark}</em></p>}
                {stop.distance && (
                  <p className="distance">📏 {parseFloat(stop.distance).toFixed(2)} km away</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="map-legend">
        <div className="legend-item">
          <span style={{color: '#4285F4', fontSize: '1.2rem'}}>📍</span>
          <span>Your Location</span>
        </div>
        <div className="legend-item">
          <span style={{color: '#10ac84', fontSize: '1.2rem'}}>🚏</span>
          <span>Bus Stop</span>
        </div>
      </div>
    </div>
  );
}

export default Map;
