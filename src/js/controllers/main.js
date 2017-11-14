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
