var socket = io();
var receivedMsg = [];

socket.on('connect', function () {
   console.log('Connected to server at'+  new Date().toLocaleTimeString());
});

socket.on('disconnect', function() {
    console.log('Disconnected from server at'+ new Date().toLocaleTimeString());
});

// listening for welcome msg to only current user when a new user joins
socket.on('welcomeMsg', function (msg) {
    receivedMsg.push(msg.from + " : " + msg.msg);
    console.log(msg);
});

// notifying others when a new user joins 
socket.on('newUser', function (msg) {
    console.log(msg);
    receivedMsg.push(msg);
});

socket.on('newMessage', function (message) {
   console.log('Message Received => ', message);
   receivedMsg.push(message.from + " : " + message.msg);
});

function createMessage(msg) {
    socket.emit('createMessage', {
        from:'User',
        message: msg
    }, function (status) {
        // optional ( callback ) : adding acknowledgement to get response from client that he has received the message
        console.log(`Status => `, status);
    });
}

function locationManager() {
    if(!navigator.geolocation){
       return alert('Geolocation not supported by your browser !');
    }

    navigator.geolocation.getCurrentPosition( function (position) {
        //when permission ok
        socket.emit('locationMessage',{
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
    }, function (err) {
        alert('Unable to fetch location !')
    });
}

socket.on('createLocationMessage', function (message) {
    var link = '<a href=" ' +  message.url  + ' " target="_blank">view location</a>' ;
    receivedMsg.push(message.from + " : " + link);
});

  // DOM MANIPULATION USING ANGULAR.JS

var app = angular.module('ChatApp', ['ngSanitize']);
app.controller('HomeController', function ($scope, $interval) {
    $scope.msg = "";
    $scope.receivedMsg = receivedMsg;
    $scope.locationHandler = locationManager;

    $scope.submitForm = function (msg) {
        createMessage(msg);
        $scope.msg="";
    };

    $interval(function () {
            $scope.receivedMsg = receivedMsg;
        }
        , 200);
});