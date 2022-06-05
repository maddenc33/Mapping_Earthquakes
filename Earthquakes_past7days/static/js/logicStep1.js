// Add console.log to check to see if our code is working.
console.log("working");

   // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: API_KEY
  });
  // We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });
  // Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};
// Create the map object with center and zoom level and default layer.
let map = L.map('mapid', {center: [39.5, -98.5], zoom: 3,layers:[streets]}) ;
//Earthquakes past 7 days
let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/maddenc33/Mapping_Earthquakes/main/torontoNeighborhoods.json";
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/maddenc33/Mapping_Earthquakes/main/torontoRoutes.json";
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
  // Accessing the airport GeoJSON URL
  let airportData = "https://raw.githubusercontent.com/maddenc33/Mapping_Earthquakes/main/majorAirports.json";
// Grabbing our GeoJSON data.
d3.json(earthquakes).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  color: "#05B4FF",weight: 1, opacity: 2.0,fillcolor:"#F7FF08",
  // Wet turn each feature into a marker on the map
  onEachFeature: function(feature,layer) {
    layer.bindPopup("<h3>" + "Magnitude:" + feature.properties.mag + "</h3>");
  }
}).addTo(map);
})
