import React from 'react';
import './NearbyStops.css';

function NearbyStops({ stops }) {
  if (!stops || stops.length === 0) {
    return null;
  }

  return (
    <div className="nearby-stops">
      <h3>🚏 Nearby Bus Stops ({stops.length})</h3>
      <div className="stops-list">
        {stops.map((stop, index) => (
          <div key={index} className="stop-item">
            <div className="stop-info">
              <div className="stop-name">{stop.name}</div>
              <div className="stop-area">{stop.area}</div>
              {stop.landmark && (
                <div className="stop-landmark">{stop.landmark}</div>
              )}
            </div>
            <div className="stop-distance">
              {stop.distance ? `${parseFloat(stop.distance).toFixed(2)} km` : 'N/A'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyStops;
