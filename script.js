// Create a map centered at a specific location
var map = L.map('map').setView([30.614081, -96.341229], 15); // Adjust this to center your map

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Define custom icon
var customIcon = L.icon({
    iconUrl: './IMG_1306 2.png', // Path to your custom icon
    iconSize: [100, 100], // Adjust the size of the icon
    iconAnchor: [45, 10], // Point of the icon which will correspond to marker's location (bottom center)
    popupAnchor: [0, 0], // Point from which the popup should open relative to the iconAnchor
});

// CSV data converted to a JavaScript array
const locations = [
    { "Building": "MSC", "Longitude": 30.6122578, "Latitude": -96.3415445 },
    { "Building": "ZACH", "Longitude": 30.6210864, "Latitude": -96.3403882 },
    { "Building": "ILCB", "Longitude": 30.6121286, "Latitude": -96.344399 },
    { "Building": "RUDDER", "Longitude": 30.612794, "Latitude": -96.3397918 },
    { "Building": "HELD", "Longitude": 30.6151096, "Latitude": -96.3386853 },
    { "Building": "ACADEMIC BUILDING", "Longitude": 30.6157848, "Latitude": -96.3407941 },
    { "Building": "KYLE FIELD", "Longitude": 30.609879, "Latitude": -96.3409651 }
];

// Function to add markers to the map with custom icon
locations.forEach(function(location) {
    L.marker([location.Longitude, location.Latitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${location.Building}</b><br>Coordinates: ${location.Longitude}, ${location.Latitude}`)
        .openPopup();
});