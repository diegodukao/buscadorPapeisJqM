// Wait for Cordova to connect with the device
//
//app.initialize();

var cameraOptions;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var pictureURI;
var userName;
var db;

//google.maps.event.addDomListener(window, 'load', setup);

//function setup() {
    document.addEventListener("deviceready",onDeviceReady,false);
    
    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        cameraOptions = { quality : 75,
          destinationType : Camera.DestinationType.FILE_URI,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          //targetWidth: 100,
          //targetHeight: 100,
          //popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true 
        };
        
        
        
        
        db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }
//}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  pictureURI = imageData;
  console.log(pictureURI);
}

// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}

function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, cameraOptions);
}

//SHOW PICTURE
//#######################################
function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
}

function showPicture() {
    if (pictureURI) {
        var largeImage = document.getElementById('largeImage');
        largeImage.style.display = 'block';
        largeImage.src = pictureURI;
    }
    else {
        alert("Nenhuma foto foi tirada.");
    }
}

function choosePicture() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.PHOTOLIBRARY
    });
}
//#######################################

// MP3 PLAYER
//#######################################
function getPhoneGapPath() {
    var path = window.location.pathname;
    path = path.substr( 0, path.length - 10 );
    return 'file://' + path;
};

function playAudio(song_path) {
    // Create Media object from src
    //my_media = new Media(src, onSuccess, onError);
    src = getPhoneGapPath() + song_path;
    var my_media = new Media(src, onSuccess, onError);

    // Play audio
    my_media.play();

    // Update my_media position every second
    //if (mediaTimer == null) {
        //mediaTimer = setInterval(function() {
        var mediaTimer = setInterval(function() {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    //}
};

function onSuccess() {
    console.log("playAudio():Audio Success");
};

// onError Callback 
//
function onError(error) {
    alert('code: '    + error.code    + '\n' + 
          'message: ' + error.message + '\n');
};
//#############################################

//NOTIFICATION BAR
//#############################################
function showNotification() {
    window.plugins.statusBarNotification.notify("Teste de notificação", "Funcionou!");
    navigator.notification.vibrate(1000);
}
//#############################################

//DB
//#############################################
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (id unique, nome)');
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
    db.transaction(queryDB, errorCB);
}

function queryDB(tx) {
    tx.executeSql('SELECT * FROM USUARIO', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    console.log("Returned rows = " + results.rows.length);
    if (results.rows.length == 0) {
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO USUARIO (id, nome) VALUES (1, "Desconhecido")')
        });
        userName = "Desconhecido";
    }
    else {
        console.log("Nome!!! " + results.rows.item(0).nome);
        userName = results.rows.item(0).nome;
    }
    $("#userName")[0].textContent = userName;
}

function changeName() {
    userName = $('#name').val();
    console.log("Novo nome: " + userName);
    
    db.transaction(function(tx) {
        tx.executeSql(
            'UPDATE USUARIO SET nome = "' + userName + '" WHERE id = 1',
            [],
            function(tx, result) {
                $("#userName")[0].textContent = userName;
            },
            errorCB
        )
    });
    
    $("#popupName").popup('close');
};
//#############################################
