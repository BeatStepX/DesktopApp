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