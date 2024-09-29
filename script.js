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

// Existing locations (predefined)
const locations = [
    { "Building": "MSC", "Longitude": 30.6122578, "Latitude": -96.3415445 },
    { "Building": "ZACH", "Longitude": 30.6210864, "Latitude": -96.3403882 },
    // Add more locations as needed
];

// Add existing locations as markers
locations.forEach(function(location) {
    L.marker([location.Longitude, location.Latitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${location.Building}</b><br>Coordinates: ${location.Longitude}, ${location.Latitude}`);
});

// Retrieve submitted coordinates from localStorage
const longitude = localStorage.getItem('longitude');
const latitude = localStorage.getItem('latitude');
const date = localStorage.getItem('date');
const time = localStorage.getItem('time');

console.log("Checking localStorage for new pin:", { longitude, latitude, date, time }); // Debugging

// Add a new marker if coordinates are available
if (longitude && latitude && date && time) {
    console.log("Adding new pin to the map"); // Debugging
    L.marker([longitude, latitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>New Location</b><br>Coordinates: ${longitude}, ${latitude}<br>Date: ${date}<br>Time: ${time}`);
    
    // Clear localStorage after adding the pin
    // localStorage.removeItem('longitude');
    // localStorage.removeItem('latitude');
    // localStorage.removeItem('date');
    // localStorage.removeItem('time');
}
