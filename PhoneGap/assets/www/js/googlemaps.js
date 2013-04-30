function callMap() {
    console.log("#######CHAMARA O MAPA!");
    
    var map = new GoogleMap();
    console.log(map);
    map.initialize();
}

function GoogleMap() {
    this.initialize = function() {
        console.log("#######MAPA INITIALIZE!");
        var map = showMap();
        addMarkersToMap(map);
    }
     
    var showMap = function() {
        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(-33, 151),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        console.log(document.getElementById("map_canvas"));
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        
        console.log("#######show map!!!");
        return map;
    }
    
    var addMarkersToMap = function(map) {
        var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
         
        var markerOne = new google.maps.Marker({
            position: latitudeAndLongitudeOne,
            map: map
        });
         
        var latitudeAndLongitudeTwo = new google.maps.LatLng('57.77828', '14.17200');
         
        var markerOne = new google.maps.Marker({
            position: latitudeAndLongitudeTwo,
            map: map
        });
    }
};

