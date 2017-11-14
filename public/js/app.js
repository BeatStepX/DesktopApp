var hello = 'a';
console.log('test' + hello)
function test(name) {
  console.log('Hello ' + name);
}

test('World');
/*
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
// From: http://codepen.io/towc/pen/mJzOWJ
// Author: Matei Copot

//http://codepen.io/thebabydino/pen/zGmdep/

var c = document.getElementById('background-canvas');
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' );
    console.log(w, h);
  var opts = {
      
      len: 100,
      count: 50,
      baseTime: 10,
      addedTime: 10,
      dieChance: .05,
      spawnChance: 1,
      sparkChance: .1,
      sparkDist: 10,
      sparkSize: 2,
      
      color: 'hsl(hue,100%,light%)',
      baseLight: 50,
      addedLight: 10, // [50-10,50+10]
      shadowToTimePropMult: 6,
      baseLightInputMultiplier: .01,
      addedLightInputMultiplier: .02,
      
      cx: w / 2,
      cy: h / 2,
      repaintAlpha: .04,
      // repaintAlpha: 1,      
      hueChange: .1
    },
    
    tick = 0,
    lines = [],
    dieX = w / 2 / opts.len,
    dieY = h / 2 / opts.len,
    
    baseRad = Math.PI * 2 / 6;
    
ctx.fillStyle = 'black';
ctx.fillRect( 0, 0, w, h );

function loop() {
  
  window.requestAnimationFrame( loop );
  
  ++tick;

  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
  ctx.fillRect( 0, 0, w, h );
  ctx.globalCompositeOperation = 'lighter';
 
  if( lines.length < opts.count && Math.random() < opts.spawnChance )
    lines.push( new Line );
  
  lines.map( function( line ){ line.step(); } );
}
function Line(){
  
  this.reset();
}
Line.prototype.reset = function(){
  
  this.x = 0;
  this.y = 0;
  this.addedX = 0;
  this.addedY = 0;
  
  this.rad = 0;
  
  this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
  
  this.color = opts.color.replace( 'hue', tick * opts.hueChange );
  this.cumulativeTime = 0;
  
  this.beginPhase();
}
Line.prototype.beginPhase = function(){
  
  this.x += this.addedX;
  this.y += this.addedY;
  
  this.time = 0;
  this.targetTime = ( opts.baseTime + opts.addedTime * Math.random() ) |0;
  
  this.rad += baseRad * ( Math.random() < .5 ? 1 : -1 );
  this.addedX = Math.cos( this.rad );
  this.addedY = Math.sin( this.rad );
  
  if( Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY )
    this.reset();
}
Line.prototype.step = function(){
  
  ++this.time;
  ++this.cumulativeTime;
  
  if( this.time >= this.targetTime )
    this.beginPhase();
  
  var prop = this.time / this.targetTime,
      wave = Math.sin( prop * Math.PI / 2  ),
      x = this.addedX * wave,
      y = this.addedY * wave;
  
  ctx.shadowBlur = prop * opts.shadowToTimePropMult;
  ctx.fillStyle = ctx.shadowColor = this.color.replace( 'light', opts.baseLight + opts.addedLight * Math.sin( this.cumulativeTime * this.lightInputMultiplier ) );
  ctx.fillRect( opts.cx + ( this.x + x ) * opts.len, opts.cy + ( this.y + y ) * opts.len, 2, 2 );
  
  if( Math.random() < opts.sparkChance )
    ctx.fillRect( opts.cx + ( this.x + x ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.cy + ( this.y + y ) * opts.len + Math.random() * opts.sparkDist * ( Math.random() < .5 ? 1 : -1 ) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize )
}
loop();

window.addEventListener('resize', function() {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  ctx.fillStyle = 'black';
  ctx.fillRect( 0, 0, w, h );
  
  opts.cx = w / 2;
  opts.cy = h / 2;
  
  dieX = w / 2 / opts.len;
  dieY = h / 2 / opts.len;
});
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
app.controller('MainController', function($scope, navigator, $rootScope, $timeout, $location) {
  // $scope.process = process;

  navigator.init();
  $scope.$on('$routeChangeSuccess', function() {
    console.log('changed');
    console.log(navigator);
    $timeout(function() {
      navigator.setKeys();
    }, 500);
  })
  
});

app.controller('MusicSelectionController', function($scope, navigator, $rootScope, $location) {
  $scope.musics = [
    {name:'Lorem01'},
    {name:'Lorem02'},
    {name:'Lorem03'},
    {name:'Lorem04'},
    {name:'Lorem05'},
    {name:'Lorem06'},
    {name:'Lorem07'},
    {name:'Lorem08'},
    {name:'Lorem09'},
    {name:'Lorem10'},
    {name:'Lorem11'},
    {name:'Lorem12'},
    {name:'Lorem13'}
  ];
  $scope.currentMusic = $scope.musics[0];
  console.log($scope.musics);
});
app.controller('NavbarController', function($element, $rootScope) {
  // $element.hide();
  $rootScope.$on('hideNavbar', function() {
    $element.hide();
  });
  $rootScope.$on('showNavbar', function() {
    $element.show();
  });
});
app.service('navigator', ['$window', function(window) {
  var msgs = [];
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  // factory.keys = 'test';
  // var factory = {};
  function navigator() {
    this.navigations = [];
    this.navigation = null;
    this.index = 0;
    this.keys = {37: 1, 38: 1, 39: 1, 40: 1};
  }

  navigator.prototype.init = function() {
    this.disableScroll();
    console.log(this.keys);
  }

  navigator.prototype.setKeys = function() {
    // console.log(this,)
    this.navigations = [];
    var that = this;
    $( "*[tabindex]" ).each(function( index ) {
      // console.log(index, factory );
      console.log(this, that);
      that.navigations.push(this);
      // console.log(index);
    });

    this.index = 0;
    this.navigation = this.navigations[0];
    // console.log('seetingFocus', this.bindKeys);
    $(this.navigation).focus();
    $('body')
      .off('keydown', this.bindKeys)
      .on('keydown', this, this.bindKeys);

    // document.onkeydown =  this.bindKeys;  
    console.log('bindKeys');
  }

  navigator.prototype.bindKeys = function(event) {
    var that = event.data;
    switch (event.keyCode) {
      // TAB
      case 9:
        event.preventDefault();
        break;
      // UP
      case 38:
        // factory.index -= 1;
        if (that.index > 0) {
          that.index -= 1;
        } else {
          that.index = that.navigations.length - 1;
        }
        console.log(that.index);
        $(that.navigations[that.index]).focus();
        break;

      // DOWN
      case 40:
        if (that.index < that.navigations.length - 1) {
          that.index += 1;
        } else {
          that.index = 0;          
        }
        console.log(that.index);
        $(that.navigations[that.index]).focus();
        break;

      // LEFT
      case 37:
        break;
        
      // RIGHT
      case 39:
        break;
    }
    // console.log(navigator.index ,navigator.navigations.length);
  };


  navigator.prototype.preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  navigator.prototype.preventDefaultForScrollKeys = function(e) {
      if (navigator.keys[e.keyCode]) {
          navigator.preventDefault(e);
          return false;
      }
  }

  navigator.prototype.disableScroll = function() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', navigator.preventDefault, false);
    window.onwheel = navigator.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = navigator.preventDefault; // older browsers, IE
    window.ontouchmove  = navigator.preventDefault; // mobile
    document.onkeydown  = navigator.preventDefaultForScrollKeys;
    console.log('disableScroll');
    window.addEventListener("focus", function(event) {
      console.log(event);
      if (event.preventDefault)
          event.preventDefault();
      event.returnValue = false;  
    }, false);
    window.onfocus = navigator.preventDefault;
  }

  navigator.prototype.enableScroll = function() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }

  return new navigator;
  // return function(keys) {
  //   console.log(disableScroll);
  //   disableScroll();
  // }

 }]); 
app.factory('notify', ['$window', function(win) {
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length == 3) {
       win.alert(msgs.join("\n"));
       msgs = [];
     }
   };
 }]);
 */