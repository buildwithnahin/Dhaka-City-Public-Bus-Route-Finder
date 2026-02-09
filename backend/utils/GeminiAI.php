<?php
/**
 * Gemini AI Integration
 * Handles natural language processing for route search
 */

class GeminiAI {
    private $api_key;
    private $api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

    public function __construct() {
        $this->api_key = $_ENV['GEMINI_API_KEY'] ?? '';
    }

    /**
     * Process natural language query to extract locations
     * @param string $query User's natural language query
     * @return array|null Array with 'from' and 'to' locations
     */
    public function extractLocations($query) {
        if (empty($this->api_key)) {
            return null;
        }

        $prompt = "Extract the starting location and destination from this query about bus routes in Dhaka, Bangladesh. Return ONLY a JSON object with 'from' and 'to' keys. If locations are unclear, use your best judgment based on Dhaka landmarks.\n\nQuery: {$query}\n\nReturn format: {\"from\": \"location name\", \"to\": \"location name\"}";

        $data = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.2,
                'maxOutputTokens' => 100
            ]
        ];

        try {
            $ch = curl_init($this->api_url . '?key=' . $this->api_key);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200) {
                $result = json_decode($response, true);
                if (isset($result['candidates'][0]['content']['parts'][0]['text'])) {
                    $text = $result['candidates'][0]['content']['parts'][0]['text'];
                    
                    // Extract JSON from response
                    preg_match('/\{[^}]+\}/', $text, $matches);
                    if (isset($matches[0])) {
                        $locations = json_decode($matches[0], true);
                        if (isset($locations['from']) && isset($locations['to'])) {
                            return $locations;
                        }
                    }
                }
            }
        } catch (Exception $e) {
            error_log("Gemini AI Error: " . $e->getMessage());
        }

        return null;
    }

    /**
     * Get smart route recommendation
     * @param array $routes Available routes
     * @param string $userPreference User preference (fastest, cheapest, etc.)
     * @return array Sorted routes based on preference
     */
    public function rankRoutes($routes, $userPreference = 'balanced') {
        if (empty($routes)) {
            return $routes;
        }

        usort($routes, function($a, $b) use ($userPreference) {
            switch ($userPreference) {
                case 'fastest':
                    return $a['total_time'] <=> $b['total_time'];
                case 'cheapest':
                    return $a['total_fare'] <=> $b['total_fare'];
                case 'least_transfer':
                    $aTransfers = $a['transfer_count'] ?? 0;
                    $bTransfers = $b['transfer_count'] ?? 0;
                    return $aTransfers <=> $bTransfers;
                default: // balanced
                    $aScore = ($a['total_time'] / 60) + ($a['total_fare'] / 10);
                    $bScore = ($b['total_time'] / 60) + ($b['total_fare'] / 10);
                    return $aScore <=> $bScore;
            }
        });

        return $routes;
    }
}
