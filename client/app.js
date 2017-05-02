angular.module('mvp')

.controller('appCtrl', function($scope, $http, leagueData) {

  $scope.onClickGetTier = () => {
    $scope.state = !$scope.state;
    leagueData.getTierData($scope.displayTierData);
  };

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
  };

  $scope.deletePlayer = (element) => {
    player = element.player.username;
    leagueData.deletePlayer(player);
  }
})

.directive('app', function() {
  return {
    templateUrl: './app.html'
  }
})