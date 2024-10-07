const map = L.map('map', {
    minZoom: -3
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


fetch("https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326")
    .then(response => response.json())
    .then(data => {
       
        const geojsonLayer = L.geoJSON(data, {
            weight: 2,
            onEachFeature: function (feature, layer) {
                
                if (feature.properties && feature.properties.nimi) {
                    layer.bindTooltip(feature.properties.nimi, {
                        sticky: true
                    });
                }
            }
        }).addTo(map);

        
        map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(err => console.error('Error loading GeoJSON data:', err));
