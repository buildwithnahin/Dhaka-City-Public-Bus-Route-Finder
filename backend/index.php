<?php
/**
 * Main API Entry Point
 * Handles all API requests and routes them to appropriate handlers
 */

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load environment variables
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

if (file_exists(__DIR__ . '/../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
}

// Include required files
require_once __DIR__ . '/config/Database.php';
require_once __DIR__ . '/utils/RouteFinder.php';
require_once __DIR__ . '/utils/GeminiAI.php';

// Get request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

// Remove query string and get path
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/backend/', '', $path);
$path = trim($path, '/');

// Route the request
try {
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception("Database connection failed");
    }

    $routeFinder = new RouteFinder($db);
    $geminiAI = new GeminiAI();

    switch ($path) {
        case 'api/search':
            handleSearch($db, $routeFinder, $geminiAI);
            break;

        case 'api/stops':
            handleGetStops($db);
            break;

        case 'api/nearby-stops':
            handleNearbyStops($routeFinder);
            break;

        case 'api/buses':
            handleGetBuses($db);
            break;

        case 'api/routes':
            handleGetRoutes($db);
            break;

        case 'api/health':
            echo json_encode(['status' => 'ok', 'message' => 'API is running']);
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

/**
 * Handle route search
 */
function handleSearch($db, $routeFinder, $geminiAI) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    
    $from = $input['from'] ?? '';
    $to = $input['to'] ?? '';
    $query = $input['query'] ?? '';
    $preference = $input['preference'] ?? 'balanced';

    // If natural language query provided, use Gemini AI
    if (!empty($query) && (empty($from) || empty($to))) {
        $locations = $geminiAI->extractLocations($query);
        if ($locations) {
            $from = $locations['from'];
            $to = $locations['to'];
        }
    }

    if (empty($from) || empty($to)) {
        http_response_code(400);
        echo json_encode(['error' => 'From and to locations are required']);
        return;
    }

    $routes = $routeFinder->findRoutes($from, $to);
    
    // Combine and rank routes
    $allRoutes = array_merge($routes['direct'], $routes['transfers']);
    $rankedRoutes = $geminiAI->rankRoutes($allRoutes, $preference);

    echo json_encode([
        'from' => $from,
        'to' => $to,
        'routes' => $rankedRoutes,
        'direct_count' => count($routes['direct']),
        'transfer_count' => count($routes['transfers']),
        'total_found' => count($rankedRoutes)
    ]);
}

/**
 * Get all bus stops
 */
function handleGetStops($db) {
    $query = "SELECT id, name, area, landmark, latitude, longitude FROM stops ORDER BY area, name";
    
    try {
        $stmt = $db->prepare($query);
        $stmt->execute();
        $stops = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['stops' => $stops]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

/**
 * Get nearby bus stops
 */
function handleNearbyStops($routeFinder) {
    $lat = $_GET['lat'] ?? null;
    $lng = $_GET['lng'] ?? null;
    $radius = $_GET['radius'] ?? 1.0;

    if (!$lat || !$lng) {
        http_response_code(400);
        echo json_encode(['error' => 'Latitude and longitude are required']);
        return;
    }

    $stops = $routeFinder->findNearbyStops(floatval($lat), floatval($lng), floatval($radius));
    echo json_encode(['stops' => $stops]);
}

/**
 * Get all buses
 */
function handleGetBuses($db) {
    $query = "SELECT id, name, company, bus_number, color, status FROM buses WHERE status = 'active' ORDER BY name";
    
    try {
        $stmt = $db->prepare($query);
        $stmt->execute();
        $buses = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['buses' => $buses]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

/**
 * Get all routes
 */
function handleGetRoutes($db) {
    $query = "SELECT r.*, b.name as bus_name, b.color 
              FROM routes r 
              JOIN buses b ON r.bus_id = b.id 
              WHERE r.is_active = 1 
              ORDER BY b.name";
    
    try {
        $stmt = $db->prepare($query);
        $stmt->execute();
        $routes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['routes' => $routes]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
