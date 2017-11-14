document.addEventListener('drag', disableDrag, false);
document.addEventListener('dragend', disableDrag, false);
document.addEventListener('dragenter', disableDrag, false);
document.addEventListener('dragexit', disableDrag, false);
document.addEventListener('dragleave', disableDrag, false);
document.addEventListener('dragover', disableDrag, false);
document.addEventListener('dragstart', disableDrag, false);
document.addEventListener('drop', disableDrag, false);
function disableDrag(event) {
  // console.log(event.type);
  event.preventDefault();
  event.returnValue = false
  return false;
}

document.addEventListener('focus', function(event) {
  console.log(event);
  event.preventDefault();
  event.returnValue = false
  return false;
}, false);

app.controller('GameController', function($scope, $rootScope, $location) {
  var beatStep = null;
  //console.log = function () { };
  beatStep = new BeatStep.Game(window.innerWidth, window.innerHeight, 'game-container');
  // beatStep.isDebug = true;
  beatStep.start(4, 4);
  window.onload = function() {
      //var socket: SocketIOClient.Socket = io.connect('http://localhost:3000/');
      //setTimeout(function () {
      //    beatStep.destroy();
      //}, 6000);

      //setTimeout(function () {
      //    beatStep = new BeatStep.Game();
      //}, 7000);
  };
  document.onselectstart = function () { return false; }
  $rootScope.$broadcast('hideNavbar')
  console.log('beatStep', beatStep);
  $('#game-container').on('game-close', function(event) {
    beatStep.destroy();
    $location.url('/music-selection/');
    $rootScope.$broadcast('showNavbar');
    $scope.$apply();
  });
});