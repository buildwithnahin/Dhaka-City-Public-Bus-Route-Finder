<?php
/**
 * Route Finder Class
 * Implements routing algorithm for finding direct and transfer routes
 */

class RouteFinder {
    private $db;

    public function __construct($database) {
        $this->db = $database;
    }

    /**
     * Find all possible routes from source to destination
     * @param string $from Starting location
     * @param string $to Destination location
     * @return array Array of routes (direct and with transfers)
     */
    public function findRoutes($from, $to) {
        $directRoutes = $this->findDirectRoutes($from, $to);
        $transferRoutes = $this->findTransferRoutes($from, $to);

        return [
            'direct' => $directRoutes,
            'transfers' => $transferRoutes,
            'total_found' => count($directRoutes) + count($transferRoutes)
        ];
    }

    /**
     * Find direct routes (single bus)
     * @param string $from Starting location
     * @param string $to Destination location
     * @return array Direct routes
     */
    private function findDirectRoutes($from, $to) {
        $query = "SELECT DISTINCT
                    b.id as bus_id,
                    b.name as bus_name,
                    b.color,
                    r.id as route_id,
                    r.route_name,
                    rs1.stop_order as from_order,
                    rs2.stop_order as to_order,
                    rs1.time_from_start as from_time,
                    rs2.time_from_start as to_time,
                    rs1.fare_from_start as from_fare,
                    rs2.fare_from_start as to_fare,
                    s1.name as from_stop_name,
                    s2.name as to_stop_name
                FROM buses b
                JOIN routes r ON b.id = r.bus_id
                JOIN route_stops rs1 ON r.id = rs1.route_id
                JOIN route_stops rs2 ON r.id = rs2.route_id
                JOIN stops s1 ON rs1.stop_id = s1.id
                JOIN stops s2 ON rs2.stop_id = s2.id
                WHERE (s1.area LIKE :from OR s1.name LIKE :from)
                AND (s2.area LIKE :to OR s2.name LIKE :to)
                AND rs1.stop_order < rs2.stop_order
                AND b.status = 'active'
                AND r.is_active = 1";

        try {
            $stmt = $this->db->prepare($query);
            $fromParam = "%{$from}%";
            $toParam = "%{$to}%";
            $stmt->bindParam(':from', $fromParam);
            $stmt->bindParam(':to', $toParam);
            $stmt->execute();

            $results = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $fare = $row['to_fare'] - $row['from_fare'];
                $time = $row['to_time'] - $row['from_time'];
                $stops = $row['to_order'] - $row['from_order'];

                $results[] = [
                    'type' => 'direct',
                    'bus_id' => $row['bus_id'],
                    'bus_name' => $row['bus_name'],
                    'bus_color' => $row['color'],
                    'route_name' => $row['route_name'],
                    'from_stop' => $row['from_stop_name'],
                    'to_stop' => $row['to_stop_name'],
                    'total_fare' => floatval($fare),
                    'total_time' => intval($time),
                    'stops_count' => intval($stops),
                    'transfer_count' => 0
                ];
            }

            return $results;
        } catch (PDOException $e) {
            error_log("Direct route error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Find transfer routes (multiple buses)
     * @param string $from Starting location
     * @param string $to Destination location
     * @return array Transfer routes
     */
    private function findTransferRoutes($from, $to) {
        // Find common transfer points
        $query = "SELECT DISTINCT
                    s.id as stop_id,
                    s.name as stop_name,
                    s.area
                FROM stops s
                JOIN route_stops rs ON s.id = rs.stop_id
                GROUP BY s.id
                HAVING COUNT(DISTINCT rs.route_id) >= 2";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $transferPoints = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $results = [];

            foreach ($transferPoints as $transfer) {
                // Find routes from start to transfer point
                $firstLeg = $this->findDirectRoutes($from, $transfer['area']);
                
                // Find routes from transfer point to destination
                $secondLeg = $this->findDirectRoutes($transfer['area'], $to);

                // Combine routes
                foreach ($firstLeg as $leg1) {
                    foreach ($secondLeg as $leg2) {
                        // Avoid same bus appearing in both legs
                        if ($leg1['bus_id'] !== $leg2['bus_id']) {
                            $results[] = [
                                'type' => 'transfer',
                                'legs' => [
                                    [
                                        'bus_name' => $leg1['bus_name'],
                                        'bus_color' => $leg1['bus_color'],
                                        'from' => $leg1['from_stop'],
                                        'to' => $leg1['to_stop'],
                                        'fare' => $leg1['total_fare'],
                                        'time' => $leg1['total_time']
                                    ],
                                    [
                                        'bus_name' => $leg2['bus_name'],
                                        'bus_color' => $leg2['bus_color'],
                                        'from' => $leg2['from_stop'],
                                        'to' => $leg2['to_stop'],
                                        'fare' => $leg2['total_fare'],
                                        'time' => $leg2['total_time']
                                    ]
                                ],
                                'transfer_point' => $transfer['stop_name'],
                                'total_fare' => $leg1['total_fare'] + $leg2['total_fare'],
                                'total_time' => $leg1['total_time'] + $leg2['total_time'] + 5, // +5 min transfer time
                                'transfer_count' => 1
                            ];
                        }
                    }
                }
            }

            // Sort by total time and limit results
            usort($results, function($a, $b) {
                return $a['total_time'] <=> $b['total_time'];
            });

            return array_slice($results, 0, 5); // Return top 5 transfer routes

        } catch (PDOException $e) {
            error_log("Transfer route error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Find nearby bus stops
     * @param float $lat Latitude
     * @param float $lng Longitude
     * @param float $radius Radius in kilometers
     * @return array Nearby stops
     */
    public function findNearbyStops($lat, $lng, $radius = 1.0) {
        // Haversine formula to calculate distance
        $query = "SELECT 
                    id,
                    name,
                    area,
                    landmark,
                    latitude,
                    longitude,
                    (6371 * acos(cos(radians(:lat)) 
                        * cos(radians(latitude)) 
                        * cos(radians(longitude) - radians(:lng)) 
                        + sin(radians(:lat)) 
                        * sin(radians(latitude)))) AS distance
                FROM stops
                HAVING distance <= :radius
                ORDER BY distance ASC
                LIMIT 10";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':lat', $lat);
            $stmt->bindParam(':lng', $lng);
            $stmt->bindParam(':radius', $radius);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Nearby stops error: " . $e->getMessage());
            return [];
        }
    }
}
