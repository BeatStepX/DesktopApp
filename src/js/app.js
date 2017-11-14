var app = angular.module('app', ['ngRoute']);

app.controller('ChatController', function($http, $scope, $rootScope, $element) {
    $scope.messages = [
        {type:'user-message', name: 'RogerMostequivi', text:'hauhsuahs nevermind I will try to find another server... cya'},
        {type:'user-message', name: 'DavisAlquir', text:'well ok'},
        {type:'user-message', name: 'DavisAlquir', text:'bye'},
        {type:'system-message', name: 'RogerMostequivi exit', text:''},
        {type:'user-message', name: 'Ahalala', text:'humm... what you did?'},
        {type:'user-message', name: 'DavisAlquir', text:'I don\'t know lol'}                        
    ]
});
var gamepads = {};

function gamepadHandler(event, connecting) {
  var gamepad = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
  }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

app.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/', {
        templateUrl: 'views/main-menu.html'
      }).
      when('/music-selection/', {
        templateUrl: 'views/music-selection.html'
      }).
      when('/game/', {
        templateUrl: 'views/game.html'
      }).
      otherwise('/');
  }
]);

var canvas = $('#c');

$('body').mousemove(function(event) {
    let x = (event.screenX / 1366) * 10;
    let y = (event.screenY / 768) * 10;
    x -= 5;
    y -= 5;
    canvas
    canvas
      .css('top', -y + 'px')
      .css('left', -x + 'px')
      
})