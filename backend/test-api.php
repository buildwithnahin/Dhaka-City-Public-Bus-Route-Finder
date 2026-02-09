<?php
/**
 * Simple Test API - Works without database
 * For quick testing of the Dhaka Bus Service app
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Sample data embedded in PHP
$buses = [
    ['id' => 1, 'name' => 'Moumita Paribahan', 'color' => '#FF5733'],
    ['id' => 2, 'name' => 'Thikana', 'color' => '#3498DB'],
    ['id' => 3, 'name' => 'Nirala', 'color' => '#F39C12'],
];

$stops = [
    ['id' => 1, 'name' => 'Gulshan 1', 'area' => 'Gulshan', 'latitude' => 23.7808, 'longitude' => 90.4172],
    ['id' => 2, 'name' => 'New Market', 'area' => 'New Market', 'latitude' => 23.7340, 'longitude' => 90.3845],
    ['id' => 3, 'name' => 'Shyamoli', 'area' => 'Shyamoli', 'latitude' => 23.7678, 'longitude' => 90.3675],
    ['id' => 4, 'name' => 'Motijheel', 'area' => 'Motijheel', 'latitude' => 23.7330, 'longitude' => 90.4172],
    ['id' => 5, 'name' => 'Farmgate', 'area' => 'Farmgate', 'latitude' => 23.7575, 'longitude' => 90.3889],
    ['id' => 6, 'name' => 'Mirpur 10', 'area' => 'Mirpur', 'latitude' => 23.8069, 'longitude' => 90.3683],
];

$routes = [
    [
        'bus_name' => 'Moumita Paribahan',
        'bus_color' => '#FF5733',
        'from' => 'Gulshan',
        'to' => 'Motijheel',
        'fare' => 50,
        'time' => 45,
        'stops' => 7
    ],
    [
        'bus_name' => 'Nirala',
        'bus_color' => '#F39C12',
        'from' => 'New Market',
        'to' => 'Shyamoli',
        'fare' => 30,
        'time' => 30,
        'stops' => 4
    ],
    [
        'bus_name' => 'Thikana',
        'bus_color' => '#3498DB',
        'from' => 'Mirpur',
        'to' => 'Motijheel',
        'fare' => 60,
        'time' => 60,
        'stops' => 10
    ],
];

// Get request path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/test-api.php/', '', $path);
$path = trim($path, '/');

// Route requests
switch ($path) {
    case 'api/health':
        echo json_encode(['status' => 'ok', 'message' => 'Test API is running (no database)']);
        break;

    case 'api/stops':
        echo json_encode(['stops' => $stops]);
        break;

    case 'api/buses':
        echo json_encode(['buses' => $buses]);
        break;

    case 'api/nearby-stops':
        $lat = $_GET['lat'] ?? 23.7808;
        $lng = $_GET['lng'] ?? 90.4172;
        
        // Simple distance calculation
        $nearby = $stops;
        foreach ($nearby as &$stop) {
            $stop['distance'] = round(rand(1, 15) / 10, 2); // Random distance for demo
        }
        
        echo json_encode(['stops' => array_slice($nearby, 0, 5)]);
        break;

    case 'api/search':
        $input = json_decode(file_get_contents('php://input'), true);
        $from = $input['from'] ?? '';
        $to = $input['to'] ?? '';
        
        // Find matching routes
        $results = [];
        foreach ($routes as $route) {
            if (stripos($route['from'], $from) !== false && stripos($route['to'], $to) !== false ||
                stripos($from, $route['from']) !== false && stripos($to, $route['to']) !== false) {
                $results[] = [
                    'type' => 'direct',
                    'bus_name' => $route['bus_name'],
                    'bus_color' => $route['bus_color'],
                    'from_stop' => $route['from'],
                    'to_stop' => $route['to'],
                    'total_fare' => $route['fare'],
                    'total_time' => $route['time'],
                    'stops_count' => $route['stops'],
                    'transfer_count' => 0
                ];
            }
        }
        
        // Always return some results for demo
        if (empty($results)) {
            $results[] = [
                'type' => 'direct',
                'bus_name' => 'Moumita Paribahan',
                'bus_color' => '#FF5733',
                'from_stop' => $from ?: 'Gulshan',
                'to_stop' => $to ?: 'Motijheel',
                'total_fare' => 45,
                'total_time' => 40,
                'stops_count' => 6,
                'transfer_count' => 0
            ];
        }
        
        echo json_encode([
            'from' => $from,
            'to' => $to,
            'routes' => $results,
            'direct_count' => count($results),
            'transfer_count' => 0,
            'total_found' => count($results)
        ]);
        break;

    default:
        echo json_encode(['status' => 'ok', 'message' => 'Test API - available endpoints: /api/health, /api/search, /api/stops, /api/buses, /api/nearby-stops']);
        break;
}
