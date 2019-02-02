// Call the geo.json


var quakeAPI = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";


var myMap = L.map("map-id", {
  center: [34.0522, -118.2437],
  zoom: 5
  });


// Define streetmap and darkmap layers
var streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(myMap);


  

  d3.json(quakeAPI, function(d){
  
  d.features.forEach(function(data){

     console.log(data.properties.mag)
  
// Set color scheme in relation to magnitude
    function quakeColor(d){
        return data.properties.mag > 5 ? "red":
        data.properties.mag  > 4 ? "purple":
        data.properties.mag > 3 ? "yellow":
        data.properties.mag > 2.5 ? "green":
                  "pink";
      }


// Define cirlces based on magnitude with popup values
    L.circle([data.geometry.coordinates[1],data.geometry.coordinates[0]],{
      radius: ((data.properties.mag)*25000),
      stroke:'black',
      color: quakeColor(data.properties.mag),
           
      }).addTo(myMap).bindPopup(`Place: ${data.properties.place}<br>Mag of this earthquake:  ${data.properties.mag}<br>Location(Lat,Lng): ${data.geometry.coordinates[1]},${data.geometry.coordinates[0]}`);
    

  })


})
var baseMaps = {
    "Street Map": streetMap,
    "Dark Map": darkMap,
  };

  L.control.layers(baseMaps, createFeatures,  {
    collapsed: false
  }).addTo(myMap)
