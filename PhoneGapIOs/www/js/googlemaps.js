function callMap() {
    //console.log("#######CHAMARA O MAPA!");
    
    //var map = new GoogleMap();
    //console.log(map);
    //map.initialize();
    
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onError, {enableHighAccuracy:true});
}

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onGeoSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

//function GoogleMap() {
    //this.initialize = function() {
        //console.log("#######MAPA INITIALIZE!");
        //var map = showMap();
        //addMarkersToMap(map);
    //}
     
    //var showMap = function() {
        //var mapOptions = {
            //zoom: 4,
            //center: new google.maps.LatLng(-33, 151),
            //mapTypeId: google.maps.MapTypeId.ROADMAP
        //}
        
        //console.log(document.getElementById("map_canvas"));
        //var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        
        //console.log("#######show map!!!");
        //return map;
    //}
    
    //var addMarkersToMap = function(map) {
        //var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
         
        //var markerOne = new google.maps.Marker({
            //position: latitudeAndLongitudeOne,
            //map: map
        //});
         
        //var latitudeAndLongitudeTwo = new google.maps.LatLng('57.77828', '14.17200');
         
        //var markerOne = new google.maps.Marker({
            //position: latitudeAndLongitudeTwo,
            //map: map
        //});
    //}
//};

