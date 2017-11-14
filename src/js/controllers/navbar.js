app.controller('NavbarController', function($element, $rootScope) {
  // $element.hide();
  $rootScope.$on('hideNavbar', function() {
    $element.hide();
  });
  $rootScope.$on('showNavbar', function() {
    $element.show();
  });
});