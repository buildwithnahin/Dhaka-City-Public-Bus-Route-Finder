const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample data - all buses have same fare rate for consistency
const buses = [
    { id: 1, name: 'Moumita Paribahan', color: '#FF5733', company: 'Moumita Transport', fareRate: 2.5 },
    { id: 2, name: 'Thikana', color: '#3498DB', company: 'Thikana Bus Service', fareRate: 2.5 },
    { id: 3, name: 'Nirala', color: '#F39C12', company: 'Nirala Paribahan', fareRate: 2.5 },
    { id: 4, name: 'Bolaka', color: '#2ECC71', company: 'Bolaka Transport', fareRate: 2.5 },
    { id: 5, name: 'Shyamoli', color: '#9B59B6', company: 'Shyamoli Paribahan', fareRate: 2.5 },
];

const stops = [
    // Central Business District
    { id: 1, name: 'Motijheel', area: 'Motijheel', landmark: 'Shapla Chattar', latitude: 23.7330, longitude: 90.4172 },
    { id: 2, name: 'Farmgate', area: 'Farmgate', landmark: 'Farmgate Footbridge', latitude: 23.7575, longitude: 90.3889 },
    { id: 3, name: 'Karwan Bazar', area: 'Kawran Bazar', landmark: 'Wholesale Market', latitude: 23.7513, longitude: 90.3944 },
    { id: 4, name: 'Shahbag', area: 'Shahbag', landmark: 'Shahbag Square', latitude: 23.7387, longitude: 90.3950 },
    { id: 5, name: 'Bangla Motor', area: 'Bangla Motor', landmark: 'Bangla Motor Crossing', latitude: 23.7504, longitude: 90.3878 },
    { id: 6, name: 'Paltan', area: 'Paltan', landmark: 'Paltan Maidan', latitude: 23.7349, longitude: 90.4106 },
    { id: 7, name: 'Mogbazar', area: 'Moghbazar', landmark: 'Wireless Gate', latitude: 23.7515, longitude: 90.4040 },
    { id: 8, name: 'Tejgaon', area: 'Tejgaon', landmark: 'Industrial Area', latitude: 23.7644, longitude: 90.3937 },
    { id: 9, name: 'Dilkusha', area: 'Dilkusha', landmark: 'Business District', latitude: 23.7298, longitude: 90.4145 },
    { id: 10, name: 'Bangladesh Secretariat', area: 'Secretariat', landmark: 'Admin Heart', latitude: 23.7367, longitude: 90.3969 },
    
    // Uttara - North Dhaka
    { id: 11, name: 'Uttara Sector 1', area: 'Uttara', landmark: 'Uttara 1', latitude: 23.8985, longitude: 90.4003 },
    { id: 12, name: 'Uttara Sector 3', area: 'Uttara', landmark: 'Jasimuddin', latitude: 23.8759, longitude: 90.3964 },
    { id: 13, name: 'Uttara Sector 7', area: 'Uttara', landmark: 'Uttara 7', latitude: 23.8607, longitude: 90.3977 },
    { id: 14, name: 'Uttara Sector 10', area: 'Uttara', landmark: 'Uttara 10', latitude: 23.8707, longitude: 90.3895 },
    { id: 15, name: 'Uttara Sector 11', area: 'Uttara', landmark: 'Uttara 11', latitude: 23.8678, longitude: 90.3828 },
    { id: 16, name: 'Azampur', area: 'Uttara', landmark: 'Azampur Bus Stand', latitude: 23.8857, longitude: 90.3921 },
    { id: 17, name: 'House Building', area: 'Uttara', landmark: 'House Building', latitude: 23.8825, longitude: 90.3972 },
    { id: 18, name: 'Rajlakshmi', area: 'Uttara', landmark: 'Rajlakshmi', latitude: 23.8650, longitude: 90.4012 },
    
    // Mirpur
    { id: 19, name: 'Mirpur 1', area: 'Mirpur', landmark: 'Mirpur 1', latitude: 23.7955, longitude: 90.3537 },
    { id: 20, name: 'Mirpur 2', area: 'Mirpur', landmark: 'Mirpur 2', latitude: 23.8042, longitude: 90.3654 },
    { id: 21, name: 'Mirpur 6', area: 'Mirpur', landmark: 'Mirpur 6', latitude: 23.8085, longitude: 90.3688 },
    { id: 22, name: 'Mirpur 7', area: 'Mirpur', landmark: 'Mirpur 7', latitude: 23.8089, longitude: 90.3654 },
    { id: 23, name: 'Mirpur 10', area: 'Mirpur', landmark: 'Mirpur 10 Roundabout', latitude: 23.8069, longitude: 90.3683 },
    { id: 24, name: 'Mirpur 11', area: 'Mirpur', landmark: 'Mirpur 11', latitude: 23.8088, longitude: 90.3708 },
    { id: 25, name: 'Mirpur 14', area: 'Mirpur', landmark: 'Mirpur 14', latitude: 23.8280, longitude: 90.3687 },
    
    // Dhanmondi
    { id: 26, name: 'Dhanmondi 15', area: 'Dhanmondi', landmark: 'Dhanmondi 15', latitude: 23.7505, longitude: 90.3712 },
    { id: 27, name: 'Dhanmondi 27', area: 'Dhanmondi', landmark: 'Rabindra Sarobar', latitude: 23.7465, longitude: 90.3754 },
    { id: 28, name: 'Dhanmondi 32', area: 'Dhanmondi', landmark: 'Dhanmondi Lake', latitude: 23.7440, longitude: 90.3777 },
    
    // Gulshan & Banani
    { id: 29, name: 'Gulshan 1', area: 'Gulshan', landmark: 'Gulshan Circle 1', latitude: 23.7808, longitude: 90.4172 },
    { id: 30, name: 'Gulshan 2', area: 'Gulshan', landmark: 'Gulshan Circle 2', latitude: 23.7925, longitude: 90.4078 },
    { id: 31, name: 'Banani', area: 'Banani', landmark: 'Banani 11', latitude: 23.7937, longitude: 90.4066 },
    
    // Eastern Corridor
    { id: 32, name: 'Badda', area: 'Badda', landmark: 'Badda Link Road', latitude: 23.7808, longitude: 90.4254 },
    { id: 33, name: 'Natun Bazar', area: 'Natun Bazar', landmark: 'New Market Area', latitude: 23.8135, longitude: 90.4254 },
    
    // Western Residential
    { id: 34, name: 'Mohammadpur', area: 'Mohammadpur', landmark: 'Bus Stand', latitude: 23.7654, longitude: 90.3548 },
    { id: 35, name: 'Lalmatia', area: 'Lalmatia', landmark: 'Housing', latitude: 23.7548, longitude: 90.3654 },
    
    // Bashundhara
    { id: 36, name: 'Bashundhara RA', area: 'Bashundhara', landmark: 'Main Gate', latitude: 23.8103, longitude: 90.4396 },
    { id: 37, name: 'Bashundhara City', area: 'Bashundhara', landmark: 'Shopping Mall', latitude: 23.7504, longitude: 90.3916 },
    
    // Additional Major Stops
    { id: 38, name: 'Khilkhet', area: 'Khilkhet', landmark: 'Nikunja', latitude: 23.8276, longitude: 90.4254 },
    { id: 39, name: 'Azimpur', area: 'Azimpur', landmark: 'Cemetery', latitude: 23.7289, longitude: 90.3838 },
    { id: 40, name: 'Mohakhali', area: 'Mohakhali', landmark: 'Bus Stand', latitude: 23.7808, longitude: 90.3967 },
    
    // Strategic Intersections
    { id: 41, name: 'Airport', area: 'Bimanbandar', landmark: 'Hazrat Shahjalal Airport', latitude: 23.8433, longitude: 90.3978 },
    { id: 42, name: 'Kuril Bishwa Road', area: 'Kuril', landmark: 'Flyover Junction', latitude: 23.8242, longitude: 90.4253 },
    { id: 43, name: 'Bijoy Sarani', area: 'Bijoy Sarani', landmark: 'Military Museum', latitude: 23.7655, longitude: 90.3908 },
    { id: 44, name: 'Science Lab', area: 'Science Lab', landmark: 'Science Laboratory', latitude: 23.7425, longitude: 90.3793 },
    { id: 45, name: 'Nilkhet', area: 'Nilkhet', landmark: 'Book Market', latitude: 23.7333, longitude: 90.3833 },
    { id: 46, name: 'Kakrail', area: 'Kakrail', landmark: 'Kakrail Mosque', latitude: 23.7378, longitude: 90.4033 },
    { id: 47, name: 'Shantinagar', area: 'Shantinagar', landmark: 'Crossing', latitude: 23.7382, longitude: 90.4096 },
    { id: 48, name: 'Malibagh', area: 'Malibagh', landmark: 'Chowdhury Para', latitude: 23.7477, longitude: 90.4203 },
    { id: 49, name: 'Mouchak', area: 'Mouchak', landmark: 'Market', latitude: 23.7506, longitude: 90.4126 },
    { id: 50, name: 'Rampura Bridge', area: 'Rampura', landmark: 'Rampura Bridge', latitude: 23.7634, longitude: 90.4254 },
    { id: 51, name: 'Mohakhali Railgate', area: 'Mohakhali', landmark: 'Railway Gate', latitude: 23.7764, longitude: 90.3933 },
    { id: 52, name: 'Asad Gate', area: 'Asad Gate', landmark: 'Mohammadpur Entrance', latitude: 23.7655, longitude: 90.3696 },
    { id: 53, name: 'Shyamoli', area: 'Shyamoli', landmark: 'Shyamoli Square', latitude: 23.7678, longitude: 90.3675 },
    { id: 54, name: 'Kallyanpur', area: 'Kallyanpur', landmark: 'Bus Stand', latitude: 23.7611, longitude: 90.3589 },
    { id: 55, name: 'Technical Mor', area: 'Technical', landmark: 'Technical Intersection', latitude: 23.8133, longitude: 90.3621 },
    { id: 56, name: 'Agargaon', area: 'Agargaon', landmark: 'IDB Bhaban', latitude: 23.7775, longitude: 90.3835 },
    { id: 57, name: 'Panthapath', area: 'Panthapath', landmark: 'Signal', latitude: 23.7533, longitude: 90.3826 },
    { id: 58, name: 'Matsya Bhaban', area: 'Matsya Bhaban', landmark: 'High Court Area', latitude: 23.7358, longitude: 90.3982 },
    { id: 59, name: 'Press Club', area: 'Press Club', landmark: 'National Press Club', latitude: 23.7390, longitude: 90.3987 },
    { id: 60, name: 'High Court', area: 'High Court', landmark: 'Legal District', latitude: 23.7306, longitude: 90.3982 },
    { id: 61, name: 'GPO', area: 'GPO', landmark: 'General Post Office', latitude: 23.7276, longitude: 90.4106 },
    
    // East Dhaka - 51-100
    { id: 62, name: 'Banasree', area: 'Banasree', landmark: 'Block A', latitude: 23.7627, longitude: 90.4397 },
    { id: 63, name: 'Khilgaon', area: 'Khilgaon', landmark: 'Flyover', latitude: 23.7519, longitude: 90.4254 },
    { id: 64, name: 'Bashabo', area: 'Bashabo', landmark: 'Bus Stand', latitude: 23.7470, longitude: 90.4344 },
    { id: 65, name: 'Mugda', area: 'Mugda', landmark: 'Mugda Para', latitude: 23.7364, longitude: 90.4344 },
    { id: 66, name: 'Maniknagar', area: 'Maniknagar', landmark: 'Maniknagar', latitude: 23.7402, longitude: 90.4378 },
    { id: 67, name: 'Tikatuli', area: 'Tikatuli', landmark: 'Tikatuli', latitude: 23.7256, longitude: 90.4089 },
    { id: 68, name: 'Ittefaq Mor', area: 'Ittefaq', landmark: 'Ittefaq More', latitude: 23.7263, longitude: 90.4072 },
    { id: 69, name: 'Arambagh', area: 'Arambagh', landmark: 'Arambagh', latitude: 23.7248, longitude: 90.4033 },
    { id: 70, name: 'Fakirapul', area: 'Fakirapul', landmark: 'Fakirapul', latitude: 23.7369, longitude: 90.4067 },
    { id: 71, name: 'Naya Paltan', area: 'Naya Paltan', landmark: 'New Paltan', latitude: 23.7343, longitude: 90.4122 },
    { id: 72, name: 'Bijoynagar', area: 'Bijoynagar', landmark: 'Bijoynagar', latitude: 23.7390, longitude: 90.4076 },
    { id: 73, name: 'Segunbagicha', area: 'Segunbagicha', landmark: 'Segunbagicha', latitude: 23.7344, longitude: 90.4011 },
    { id: 74, name: 'Topkhana Road', area: 'Topkhana', landmark: 'Topkhana Road', latitude: 23.7267, longitude: 90.4128 },
    { id: 75, name: 'Katabon', area: 'Katabon', landmark: 'Katabon', latitude: 23.7405, longitude: 90.3868 },
    { id: 76, name: 'Elephant Road', area: 'Elephant Road', landmark: 'Elephant Road', latitude: 23.7405, longitude: 90.3868 },
    { id: 77, name: 'Bata Signal', area: 'Bata Signal', landmark: 'Bata Showroom', latitude: 23.7476, longitude: 90.3754 },
    { id: 78, name: 'Kalabagan', area: 'Kalabagan', landmark: '1st Lane', latitude: 23.7434, longitude: 90.3846 },
    { id: 79, name: 'Jigatola', area: 'Jigatola', landmark: 'Bus Stop', latitude: 23.7407, longitude: 90.3740 },
    { id: 80, name: 'Shankar', area: 'Shankar', landmark: 'Shankar', latitude: 23.7396, longitude: 90.3693 },
    { id: 81, name: 'Beribadh', area: 'Beribadh', landmark: 'Beribadh', latitude: 23.7435, longitude: 90.3548 },
    { id: 82, name: 'Rayer Bazar', area: 'Rayer Bazar', landmark: 'Rayer Bazar', latitude: 23.7489, longitude: 90.3512 },
    { id: 83, name: 'Kamrangirchar', area: 'Kamrangirchar', landmark: 'Kamrangirchar', latitude: 23.7189, longitude: 90.3654 },
    
    // Old Dhaka
    { id: 84, name: 'Babubazar', area: 'Babubazar', landmark: 'Babubazar', latitude: 23.7198, longitude: 90.4033 },
    { id: 85, name: 'Islampur', area: 'Islampur', landmark: 'Islampur Market', latitude: 23.7212, longitude: 90.4022 },
    { id: 86, name: 'Chawkbazar', area: 'Chawkbazar', landmark: 'Chawk Bazar', latitude: 23.7256, longitude: 90.3989 },
    { id: 87, name: 'Imamganj', area: 'Imamganj', landmark: 'Imamganj', latitude: 23.7267, longitude: 90.3978 },
    { id: 88, name: 'Lalbagh', area: 'Lalbagh', landmark: 'Lalbagh Fort', latitude: 23.7189, longitude: 90.3889 },
    { id: 89, name: 'Bakshibazar', area: 'Bakshibazar', landmark: 'Bakshi Bazar', latitude: 23.7233, longitude: 90.3944 },
    { id: 90, name: 'Sadarghat', area: 'Sadarghat', landmark: 'Launch Terminal', latitude: 23.7104, longitude: 90.4067 },
    
    // University Area
    { id: 91, name: 'Dhaka Medical', area: 'Dhaka Medical', landmark: 'DMCH', latitude: 23.7261, longitude: 90.3978 },
    { id: 92, name: 'TSC', area: 'TSC', landmark: 'Teacher Student Centre', latitude: 23.7356, longitude: 90.3939 },
    { id: 93, name: 'Doel Chattar', area: 'Doel Chattar', landmark: 'Doel Square', latitude: 23.7289, longitude: 90.3922 },
    { id: 94, name: 'Curzon Hall', area: 'Curzon Hall', landmark: 'Curzon Hall DU', latitude: 23.7278, longitude: 90.3967 },
    { id: 95, name: 'Bangabazar', area: 'Bangabazar', landmark: 'Clothing Market', latitude: 23.7256, longitude: 90.4122 },
    
    // South & East Extended
    { id: 96, name: 'Wari', area: 'Wari', landmark: 'Wari', latitude: 23.7289, longitude: 90.4167 },
    { id: 97, name: 'Dayaganj', area: 'Dayaganj', landmark: 'Dayaganj', latitude: 23.7165, longitude: 90.4138 },
    { id: 98, name: 'Gandaria', area: 'Gandaria', landmark: 'Gandaria', latitude: 23.7133, longitude: 90.4011 },
    { id: 99, name: 'Jurain', area: 'Jurain', landmark: 'Jurain', latitude: 23.7056, longitude: 90.4322 },
    { id: 100, name: 'Postogola', area: 'Postogola', landmark: 'Bridge', latitude: 23.7082, longitude: 90.4254 },
    { id: 101, name: 'Jatrabari', area: 'Jatrabari', landmark: 'Intersection', latitude: 23.7100, longitude: 90.4329 },
    { id: 102, name: 'Shyampur', area: 'Shyampur', landmark: 'Shyampur', latitude: 23.7044, longitude: 90.4622 },
    { id: 103, name: 'Signboard', area: 'Signboard', landmark: 'Signboard', latitude: 23.7033, longitude: 90.4533 },
    { id: 104, name: 'Matuail', area: 'Matuail', landmark: 'Matuail', latitude: 23.6933, longitude: 90.4489 },
    { id: 105, name: 'Shanir Akhra', area: 'Shanir Akhra', landmark: 'Shanir Akhra', latitude: 23.7211, longitude: 90.4389 },
    { id: 106, name: 'Kanchpur', area: 'Kanchpur', landmark: 'Kanchpur Bridge', latitude: 23.6856, longitude: 90.5233 },
    { id: 107, name: 'Demra', area: 'Demra', landmark: 'Demra Bazar', latitude: 23.7159, longitude: 90.5014 },
    { id: 108, name: 'Staff Quarter', area: 'Staff Quarter', landmark: 'Staff Quarter', latitude: 23.7078, longitude: 90.4844 },
    { id: 109, name: 'Purbachal', area: 'Purbachal', landmark: 'Purbachal New Town', latitude: 23.8622, longitude: 90.4889 },
    
    // Additional Missing
    { id: 110, name: 'Aftabnagar', area: 'Aftabnagar', landmark: 'Main Road', latitude: 23.7590, longitude: 90.4288 },
    { id: 111, name: 'Sayedabad', area: 'Sayedabad', landmark: 'Bus Terminal', latitude: 23.7175, longitude: 90.4288 },
    { id: 112, name: 'Kamalapur', area: 'Kamalapur', landmark: 'Railway Station', latitude: 23.7317, longitude: 90.4267 },
    { id: 113, name: 'New Market', area: 'New Market', landmark: 'Chandni Chowk', latitude: 23.7340, longitude: 90.3845 },
    { id: 114, name: 'Baridhara', area: 'Baridhara', landmark: 'DOHS', latitude: 23.8103, longitude: 90.4255 },
    { id: 115, name: 'Green Road', area: 'Green Road', landmark: 'Market', latitude: 23.7474, longitude: 90.3826 },
];

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Test API is running (Node.js - No database)' });
});

// Get all stops
app.get('/api/stops', (req, res) => {
    res.json({ stops });
});

// Get all buses
app.get('/api/buses', (req, res) => {
    res.json({ buses });
});

// Get nearby stops
app.get('/api/nearby-stops', (req, res) => {
    const { lat, lng, radius = 1 } = req.query;
    
    // Simple random distance for demo
    const nearby = stops.map(stop => ({
        ...stop,
        distance: (Math.random() * 1.5).toFixed(2)
    })).sort((a, b) => a.distance - b.distance).slice(0, 5);
    
    res.json({ stops: nearby });
});

// Helper function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// Bus routes definition (comprehensive coverage of 115 stops)
const busRoutes = [
    // Route 1: Moumita - North to South via Gulshan
    { bus_id: 1, stops: [11, 16, 17, 41, 38, 42, 29, 30, 31, 40, 2, 8, 27, 28, 4, 113, 1, 6, 67, 90] },
    
    // Route 2: Thikana - West to East via Mirpur
    { bus_id: 2, stops: [25, 23, 21, 20, 19, 53, 54, 52, 55, 56, 2, 57, 8, 27, 4, 1, 101, 111, 112] },
    
    // Route 3: Nirala - University Circuit
    { bus_id: 3, stops: [113, 4, 59, 92, 44, 76, 115, 2, 40, 31, 29, 32, 62, 110, 63, 64] },
    
    // Route 4: Bolaka - Uttara to Old Dhaka
    { bus_id: 4, stops: [12, 13, 14, 15, 38, 25, 23, 53, 27, 113, 4, 45, 88, 86, 85, 84, 90] },
    
    // Route 5: Shyamoli - East West Connector
    { bus_id: 5, stops: [34, 35, 53, 27, 28, 57, 2, 5, 1, 112, 111, 101, 100, 107] },
    
    // Route 6: Airport Express
    { bus_id: 1, stops: [41, 16, 17, 13, 12, 43, 56, 2, 3, 8, 1, 6, 61, 95] },
    
    // Route 7: Eastern Corridor
    { bus_id: 2, stops: [32, 33, 42, 38, 114, 36, 62, 110, 63, 48, 7, 46, 47, 1, 71, 6] },
    
    // Route 8: Central Business Loop
    { bus_id: 3, stops: [1, 6, 71, 70, 72, 73, 58, 10, 59, 60, 9, 67, 68, 69, 74, 61, 95] },
    
    // Route 9: South Dhaka Local
    { bus_id: 4, stops: [45, 49, 39, 48, 79, 80, 81, 82, 83, 88, 97, 98, 99, 100, 101, 103, 104] },
    
    // Route 10: Extended South
    { bus_id: 5, stops: [61, 6, 1, 112, 111, 101, 105, 102, 103, 104, 106, 107, 108, 109] },
    
    // Route 11: Dhanmondi Circuit
    { bus_id: 1, stops: [26, 27, 28, 78, 75, 76, 44, 4, 59, 58, 60, 10, 2, 57, 37] },
    
    // Route 12: Mirpur Express
    { bus_id: 2, stops: [55, 25, 24, 23, 22, 21, 20, 19, 53, 54, 52, 56, 2, 1] },
    
    // Route 13: University Special
    { bus_id: 3, stops: [92, 33, 93, 94, 91, 60, 58, 59, 10, 4, 44, 45, 39, 113] },
    
    // Route 14: Old Dhaka Tour
    { bus_id: 4, stops: [84, 85, 86, 87, 88, 89, 90, 97, 96, 67, 68, 74, 61, 95, 9] },
    
    // Route 15: Purbachal Connector
    { bus_id: 5, stops: [109, 114, 36, 33, 32, 29, 30, 40, 51, 43, 56, 13, 12, 11] },
];

// Search routes
app.post('/api/search', (req, res) => {
    const { from = '', to = '', query = '' } = req.body;
    
    let searchFrom = from;
    let searchTo = to;
    
    // Simple AI simulation - extract locations from query
    if (query) {
        const lowerQuery = query.toLowerCase();
        stops.forEach(stop => {
            if (lowerQuery.includes(stop.area.toLowerCase()) || lowerQuery.includes(stop.name.toLowerCase())) {
                if (!searchFrom) searchFrom = stop.area;
                else if (!searchTo && stop.area !== searchFrom) searchTo = stop.area;
            }
        });
    }
    
    // Find matching stops
    const fromStop = stops.find(s => 
        s.area.toLowerCase() === searchFrom.toLowerCase() || 
        s.name.toLowerCase().includes(searchFrom.toLowerCase())
    );
    const toStop = stops.find(s => 
        s.area.toLowerCase() === searchTo.toLowerCase() || 
        s.name.toLowerCase().includes(searchTo.toLowerCase())
    );
    
    if (!fromStop || !toStop) {
        return res.json({
            from: searchFrom,
            to: searchTo,
            routes: [],
            direct_count: 0,
            transfer_count: 0,
            total_found: 0,
            error: 'One or both locations not found'
        });
    }
    
    const routes = [];
    const transferRoutes = [];
    
    // Find direct routes
    busRoutes.forEach(route => {
        const fromIndex = route.stops.indexOf(fromStop.id);
        const toIndex = route.stops.indexOf(toStop.id);
        
        if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
            const bus = buses.find(b => b.id === route.bus_id);
            const distance = calculateDistance(
                fromStop.latitude, fromStop.longitude,
                toStop.latitude, toStop.longitude
            );
            
            // Calculate fare: 10 taka base + (distance * bus rate)
            // Minimum fare is 10 taka, maximum capped at 50 taka
            let fare = Math.round(10 + (distance * bus.fareRate));
            fare = Math.max(10, Math.min(fare, 50));
            
            // Estimate time: 15 km/h average in Dhaka traffic + 1.5 min per stop
            const stopsCount = toIndex - fromIndex;
            const time = Math.round((distance / 15) * 60 + (stopsCount * 1.5));
            
            // Get route stops with names
            const routeStopIds = route.stops.slice(fromIndex, toIndex + 1);
            const routeStopNames = routeStopIds.map(stopId => {
                const stop = stops.find(s => s.id === stopId);
                return stop ? stop.name : 'Unknown';
            });
            
            routes.push({
                type: 'direct',
                bus_name: bus.name,
                bus_color: bus.color,
                from_stop: fromStop.name,
                to_stop: toStop.name,
                total_fare: fare,
                total_time: time,
                stops_count: stopsCount + 1,
                transfer_count: 0,
                distance: distance.toFixed(1),
                route_stops: routeStopNames
            });
        }
    });
    
    // Find transfer routes (if no direct route or want more options)
    if (routes.length < 2) {
        busRoutes.forEach(route1 => {
            const fromIndex1 = route1.stops.indexOf(fromStop.id);
            if (fromIndex1 === -1) return;
            
            // Find potential transfer stops
            route1.stops.slice(fromIndex1 + 1).forEach(transferStopId => {
                busRoutes.forEach(route2 => {
                    if (route1.bus_id === route2.bus_id) return; // Skip same bus
                    
                    const transferIndex2 = route2.stops.indexOf(transferStopId);
                    const toIndex2 = route2.stops.indexOf(toStop.id);
                    
                    if (transferIndex2 !== -1 && toIndex2 !== -1 && transferIndex2 < toIndex2) {
                        const bus1 = buses.find(b => b.id === route1.bus_id);
                        const bus2 = buses.find(b => b.id === route2.bus_id);
                        const transferStop = stops.find(s => s.id === transferStopId);
                        
                        const dist1 = calculateDistance(
                            fromStop.latitude, fromStop.longitude,
                            transferStop.latitude, transferStop.longitude
                        );
                        const dist2 = calculateDistance(
                            transferStop.latitude, transferStop.longitude,
                            toStop.latitude, toStop.longitude
                        );
                        const totalDistance = dist1 + dist2;
                        
                        // Calculate fares for each leg
                        let fare1 = Math.round(10 + (dist1 * bus1.fareRate));
                        let fare2 = Math.round(10 + (dist2 * bus2.fareRate));
                        fare1 = Math.max(10, Math.min(fare1, 50));
                        fare2 = Math.max(10, Math.min(fare2, 50));
                        const totalFare = fare1 + fare2;
                        
                        const transferIdx1 = route1.stops.indexOf(transferStopId);
                        const stops1 = transferIdx1 - fromIndex1;
                        const stops2 = toIndex2 - transferIndex2;
                        
                        const time1 = Math.round((dist1 / 15) * 60 + (stops1 * 1.5));
                        const time2 = Math.round((dist2 / 15) * 60 + (stops2 * 1.5));
                        const totalTime = time1 + time2 + 8; // +8 min for transfer wait
                        
                        // Get route stops for each leg
                        const leg1StopIds = route1.stops.slice(fromIndex1, transferIdx1 + 1);
                        const leg2StopIds = route2.stops.slice(transferIndex2, toIndex2 + 1);
                        const leg1StopNames = leg1StopIds.map(id => stops.find(s => s.id === id)?.name || 'Unknown');
                        const leg2StopNames = leg2StopIds.map(id => stops.find(s => s.id === id)?.name || 'Unknown');
                        
                        transferRoutes.push({
                            type: 'transfer',
                            buses: [
                                {
                                    name: bus1.name,
                                    color: bus1.color,
                                    from: fromStop.name,
                                    to: transferStop.name,
                                    fare: fare1,
                                    stops: stops1 + 1,
                                    route_stops: leg1StopNames
                                },
                                {
                                    name: bus2.name,
                                    color: bus2.color,
                                    from: transferStop.name,
                                    to: toStop.name,
                                    fare: fare2,
                                    stops: stops2 + 1,
                                    route_stops: leg2StopNames
                                }
                            ],
                            transfer_stop: transferStop.name,
                            total_fare: totalFare,
                            total_time: totalTime,
                            total_stops: stops1 + stops2 + 2,
                            transfer_count: 1,
                            distance: totalDistance.toFixed(1)
                        });
                    }
                });
            });
        });
    }
    
    // Sort routes by total time
    routes.sort((a, b) => a.total_time - b.total_time);
    transferRoutes.sort((a, b) => a.total_time - b.total_time);
    
    // Limit to top 3 of each type
    const topDirectRoutes = routes.slice(0, 3);
    const topTransferRoutes = transferRoutes.slice(0, 3);
    
    res.json({
        from: searchFrom,
        to: searchTo,
        routes: [...topDirectRoutes, ...topTransferRoutes],
        direct_count: topDirectRoutes.length,
        transfer_count: topTransferRoutes.length,
        total_found: topDirectRoutes.length + topTransferRoutes.length
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚌 Dhaka Bus Service Test API running on http://localhost:${PORT}`);
    console.log(`✅ No database required - using sample data`);
    console.log(`📡 Test it: http://localhost:${PORT}/api/health`);
});
