import React from 'react';
import './RouteResults.css';

function RouteResults({ routes, onSelectRoute, selectedRoute }) {
  if (!routes || routes.length === 0) {
    return (
      <div className="no-results">
        <p>No routes found. Try different locations.</p>
      </div>
    );
  }

  const directRoutes = routes.filter((r) => r.type === 'direct');
  const transferRoutes = routes.filter((r) => r.type === 'transfer');

  return (
    <div className="route-results">
      <h2>Found {routes.length} Route{routes.length > 1 ? 's' : ''}</h2>

      {directRoutes.length > 0 && (
        <div className="route-section">
          <h3 className="section-title">🎯 Direct Routes</h3>
          {directRoutes.map((route, index) => (
            <RouteCard
              key={`direct-${index}`}
              route={route}
              onClick={() => onSelectRoute(route)}
              isSelected={selectedRoute === route}
            />
          ))}
        </div>
      )}

      {transferRoutes.length > 0 && (
        <div className="route-section">
          <h3 className="section-title">🔄 Routes with Transfer</h3>
          {transferRoutes.map((route, index) => (
            <TransferRouteCard
              key={`transfer-${index}`}
              route={route}
              onClick={() => onSelectRoute(route)}
              isSelected={selectedRoute === route}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RouteCard({ route, onClick, isSelected }) {
  const [showStops, setShowStops] = React.useState(false);

  return (
    <div
      className={`route-card ${isSelected ? 'selected' : ''}`}
    >
      <div onClick={onClick}>
        <div className="route-header">
          <div
            className="bus-badge"
            style={{ backgroundColor: route.bus_color || '#667eea' }}
          >
            {route.bus_name}
          </div>
          <div className="route-type-badge">Direct</div>
        </div>

        <div className="route-info">
          <div className="route-path">
            <span className="stop">{route.from_stop}</span>
            <span className="arrow">→</span>
            <span className="stop">{route.to_stop}</span>
          </div>

          <div className="route-details">
            <div className="detail">
              <span className="label">Fare:</span>
              <span className="value">৳ {route.total_fare || 'N/A'}</span>
            </div>
            <div className="detail">
              <span className="label">Time:</span>
              <span className="value">~{route.total_time || 'N/A'} min</span>
            </div>
            <div className="detail">
              <span className="label">Stops:</span>
              <span className="value">{route.stops_count || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {route.route_stops && route.route_stops.length > 0 && (
        <div className="route-stops-section">
          <button
            className="show-stops-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowStops(!showStops);
            }}
          >
            {showStops ? '▼' : '▶'} {showStops ? 'Hide' : 'Show'} Route Stops
          </button>
          {showStops && (
            <div className="route-stops-list">
              <div className="stops-header">📍 Route Path:</div>
              {route.route_stops.map((stop, idx) => (
                <div key={idx} className="stop-item">
                  <span className="stop-number">{idx + 1}</span>
                  <span className="stop-name">{stop}</span>
                  {idx === 0 && <span className="stop-badge start">Start</span>}
                  {idx === route.route_stops.length - 1 && <span className="stop-badge end">End</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TransferRouteCard({ route, onClick, isSelected }) {
  const [showStops, setShowStops] = React.useState(false);
  const buses = route.buses || [];

  return (
    <div
      className={`route-card transfer ${isSelected ? 'selected' : ''}`}
    >
      <div onClick={onClick}>
        <div className="route-header">
          <div className="route-type-badge transfer-badge">1 Transfer</div>
        </div>

        {buses.map((bus, index) => (
          <div key={index} className="leg">
            <div className="leg-number">Leg {index + 1}</div>
            <div
              className="bus-badge small"
              style={{ backgroundColor: bus.color || '#667eea' }}
            >
              {bus.name}
            </div>
            <div className="route-path">
              <span className="stop">{bus.from}</span>
              <span className="arrow">→</span>
              <span className="stop">{bus.to}</span>
            </div>
            <div className="leg-details">
              <span>৳{bus.fare}</span>
              <span>{bus.stops} stops</span>
            </div>
            
            {index < buses.length - 1 && (
              <div className="transfer-info">
                🔄 Transfer at: {route.transfer_stop}
              </div>
            )}
          </div>
        ))}

        <div className="route-summary">
          <div className="summary-item">
            <strong>Total Fare:</strong> ৳{route.total_fare}
          </div>
          <div className="summary-item">
            <strong>Total Time:</strong> ~{route.total_time} min
          </div>
        </div>
      </div>

      {buses.length > 0 && buses.every(bus => bus.route_stops) && (
        <div className="route-stops-section">
          <button
            className="show-stops-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowStops(!showStops);
            }}
          >
            {showStops ? '▼' : '▶'} {showStops ? 'Hide' : 'Show'} Route Stops
          </button>
          {showStops && (
            <div className="route-stops-list">
              {buses.map((bus, busIdx) => (
                <div key={busIdx} className="leg-stops">
                  <div className="stops-header">
                    📍 {bus.name} - Leg {busIdx + 1}:
                  </div>
                  {bus.route_stops.map((stop, idx) => (
                    <div key={idx} className="stop-item">
                      <span className="stop-number">{idx + 1}</span>
                      <span className="stop-name">{stop}</span>
                      {idx === 0 && <span className="stop-badge start">{busIdx === 0 ? 'Start' : 'Transfer'}</span>}
                      {idx === bus.route_stops.length - 1 && busIdx < buses.length - 1 && <span className="stop-badge transfer">Transfer</span>}
                      {idx === bus.route_stops.length - 1 && busIdx === buses.length - 1 && <span className="stop-badge end">End</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RouteResults;
