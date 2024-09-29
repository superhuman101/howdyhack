// Initialize the map and set its view to a default location and zoom level
var map = L.map('map', {zoomControl: false}).setView([30.6120, -96.343], 16); // Coordinates for College Station, TX

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create a custom icon for the marker
var companyIcon = L.icon({
    iconUrl: './IMG_1306 2.png', // Replace with your image URL
    iconSize: [200, 200], // size of the icon
    iconAnchor: [95, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0]  // point from which the popup should open relative to the iconAnchor
});

// Add the marker with the custom icon
L.marker([30.6120, -96.343], {icon: companyIcon}).addTo(map)
    .bindPopup('<b>I Spy Rev!</b><br>Spotted Rev at Gene Stallings right next to the MSC!').openPopup();

// Additional features like circles or polygons can be added here
