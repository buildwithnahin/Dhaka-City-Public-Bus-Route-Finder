# API Documentation

## Base URL

```
http://localhost:8000
```

## Endpoints

### 1. Health Check

Check if API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "API is running"
}
```

---

### 2. Get All Bus Stops

Retrieve all available bus stops in Dhaka.

**Endpoint:** `GET /api/stops`

**Response:**
```json
{
  "stops": [
    {
      "id": 1,
      "name": "Gulshan 1",
      "area": "Gulshan",
      "landmark": "Gulshan Circle 1",
      "latitude": "23.78080000",
      "longitude": "90.41720000"
    },
    ...
  ]
}
```

---

### 3. Get Nearby Stops

Find bus stops near a specific GPS location.

**Endpoint:** `GET /api/nearby-stops`

**Query Parameters:**
- `lat` (required): Latitude
- `lng` (required): Longitude
- `radius` (optional): Search radius in km (default: 1.0)

**Example:**
```
GET /api/nearby-stops?lat=23.7808&lng=90.4172&radius=1.5
```

**Response:**
```json
{
  "stops": [
    {
      "id": 1,
      "name": "Gulshan 1",
      "area": "Gulshan",
      "landmark": "Gulshan Circle 1",
      "latitude": "23.78080000",
      "longitude": "90.41720000",
      "distance": "0.15"
    },
    ...
  ]
}
```

---

### 4. Search Routes

Find bus routes between two locations.

**Endpoint:** `POST /api/search`

**Request Body - Location Search:**
```json
{
  "from": "Gulshan",
  "to": "Motijheel",
  "preference": "balanced"
}
```

**Request Body - Natural Language (AI):**
```json
{
  "query": "I want to go from New Market to Shyamoli",
  "preference": "fastest"
}
```

**Preference Options:**
- `balanced` - Balance between time and cost (default)
- `fastest` - Prioritize shortest travel time
- `cheapest` - Prioritize lowest fare
- `least_transfer` - Minimize number of transfers

**Response - Direct Routes:**
```json
{
  "from": "Gulshan",
  "to": "Motijheel",
  "routes": [
    {
      "type": "direct",
      "bus_id": 1,
      "bus_name": "Moumita Paribahan",
      "bus_color": "#FF5733",
      "route_name": "Gulshan - Motijheel via Farmgate",
      "from_stop": "Gulshan 1",
      "to_stop": "Motijheel",
      "total_fare": 50,
      "total_time": 45,
      "stops_count": 7,
      "transfer_count": 0
    }
  ],
  "direct_count": 1,
  "transfer_count": 0,
  "total_found": 1
}
```

**Response - Transfer Routes:**
```json
{
  "from": "Ashulia",
  "to": "Motijheel",
  "routes": [
    {
      "type": "transfer",
      "legs": [
        {
          "bus_name": "Suprobhat Paribahan",
          "bus_color": "#34495E",
          "from": "Ashulia",
          "to": "Gabtoli",
          "fare": 35,
          "time": 50
        },
        {
          "bus_name": "Rupantor Services",
          "bus_color": "#9B59B6",
          "from": "Gabtoli",
          "to": "Motijheel",
          "fare": 30,
          "time": 55
        }
      ],
      "transfer_point": "Gabtoli",
      "total_fare": 65,
      "total_time": 110,
      "transfer_count": 1
    }
  ],
  "direct_count": 0,
  "transfer_count": 1,
  "total_found": 1
}
```

---

### 5. Get All Buses

Retrieve information about all active buses.

**Endpoint:** `GET /api/buses`

**Response:**
```json
{
  "buses": [
    {
      "id": 1,
      "name": "Moumita Paribahan",
      "company": "Moumita Transport Ltd",
      "bus_number": "MOU-101",
      "color": "#FF5733",
      "status": "active"
    },
    ...
  ]
}
```

---

### 6. Get All Routes

Retrieve all active bus routes.

**Endpoint:** `GET /api/routes`

**Response:**
```json
{
  "routes": [
    {
      "id": 1,
      "bus_id": 1,
      "route_name": "Gulshan - Motijheel via Farmgate",
      "start_point": "Gulshan",
      "end_point": "Motijheel",
      "base_fare": "25.00",
      "total_distance": "12.50",
      "avg_duration": 45,
      "operating_hours": "6:00 AM - 11:00 PM",
      "frequency": 15,
      "is_active": 1,
      "bus_name": "Moumita Paribahan",
      "color": "#FF5733"
    },
    ...
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "error": "From and to locations are required"
}
```

**404 Not Found:**
```json
{
  "error": "Endpoint not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Database connection failed"
}
```

---

## Rate Limiting

Currently, there is no rate limiting on the API. For production deployment, consider implementing rate limiting to prevent abuse.

---

## CORS

CORS is enabled for all origins (`Access-Control-Allow-Origin: *`). For production, configure specific allowed origins.

---

## Authentication

Currently, no authentication is required. For production with admin features, implement JWT or OAuth authentication.

---

## Examples with cURL

### Search for routes:
```bash
curl -X POST http://localhost:8000/api/search \
  -H "Content-Type: application/json" \
  -d '{"from": "Gulshan", "to": "Motijheel", "preference": "balanced"}'
```

### Get nearby stops:
```bash
curl "http://localhost:8000/api/nearby-stops?lat=23.7808&lng=90.4172&radius=1"
```

### Get all buses:
```bash
curl http://localhost:8000/api/buses
```

---

## WebSocket Support

Currently not supported. Future versions may include real-time bus tracking via WebSocket.
