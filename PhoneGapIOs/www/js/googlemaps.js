var map, latlng, options, watchId;

function initialize() {
    latlng = new google.maps.LatLng('-33.890542','151.274856');
    options = { zoom: 14, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    map = new google.maps.Map(document.getElementById("mapa_canvas"), options);
}

var onGeoSuccess = function(position) {
    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(currentLocation);
    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        title:"You are here!"
    });
};

$('#mapa').live("pagecreate", function() {
    initialize();
    watchId = navigator.geolocation.watchPosition(onGeoSuccess, onError, {enableHighAccuracy:true});
});

//$('#mapa').live('pageshow',function(){
    //google.maps.event.trigger(map, 'resize');
    //map.setOptions(options); 
//});

