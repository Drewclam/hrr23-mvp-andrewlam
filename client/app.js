angular.module('mvp')

.controller('appCtrl', function($scope, $http, leagueData) {

  $scope.onClickGetTier = leagueData.getTierData;
  $scope.displayTierData = (entries) => {
    $scope.entries = entries;
  };

  $scope.onClickGetChamps = leagueData.getChampData;
  $scope.saveChampData = (champs) => {
    $scope.champs = champs;
  };

  $scope.onClickGetSavedPlayers = leagueData.getSavedPlayers;
  $scope.displaySavedPlayers = (players) => {
    console.log('display saved players' , players);
    $scope.players = players;
  }

})

.directive('app', function() {
  return {
    templateUrl: './app.html'
  }
})