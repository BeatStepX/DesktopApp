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