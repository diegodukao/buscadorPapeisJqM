//function GoogleMap() {
    //this.initialize = function(){
        //var map = showMap();
        //console.log("############# INITIALIZE MAP");
    //}
     
    //var showMap = function(){
        //var mapOptions = {
            //zoom: 4,
            //center: new google.maps.LatLng(-33, 151),
            //mapTypeId: google.maps.MapTypeId.ROADMAP
        //}
         
        //var map = new google.maps.Map(document.getElementById("mapa_canvas"), mapOptions);
         
        //return map;
    //}
//}

//function callMap() {
    //console.log("#######CHAMARA O MAPA!");
    
    //var map = new GoogleMap();
    //map.initialize();
    
    ////navigator.geolocation.getCurrentPosition(onGeoSuccess, onError, {enableHighAccuracy:true});
//}

var map1, latlng1, options1;
function initialize() {

    latlng1 = new google.maps.LatLng(40.716948, -74.003563);
    options1 = { zoom: 14, center: latlng1, mapTypeId: google.maps.MapTypeId.ROADMAP };
    map1 = new google.maps.Map(document.getElementById("mapa_canvas"), options1);

}
$('#mapa').live("pagecreate", function() {

    initialize();

});

$('#mapa').live('pageshow',function(){

    //console.log("test");
    google.maps.event.trigger(map1, 'resize');
    map1.setOptions(options1); 

});

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
//var onGeoSuccess = function(position) {
    //alert('Latitude: '          + position.coords.latitude          + '\n' +
          //'Longitude: '         + position.coords.longitude         + '\n' +
          //'Altitude: '          + position.coords.altitude          + '\n' +
          //'Accuracy: '          + position.coords.accuracy          + '\n' +
          //'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          //'Heading: '           + position.coords.heading           + '\n' +
          //'Speed: '             + position.coords.speed             + '\n' +
          //'Timestamp: '         + position.timestamp                + '\n');
//};

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

