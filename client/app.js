angular.module('mvp')

.controller('appCtrl', function($scope, $http, leagueData) {

  $scope.onClickGetTier = () => {
    // $scope.state = !$scope.state;
    leagueData.getTierData($scope.displayTierData);
  };

  $scope.displayTierData = (entries) => {
    $scope.entries = entries;
  };

  $scope.onClickGetChamps = (player) => {
    leagueData.getChampData(player, $scope.saveChampData);
  };
  $scope.saveChampData = (champs) => {
    $scope.champs = champs;
    leagueData.getSavedPlayers($scope.displaySavedPlayers);
  };

  $scope.onClickGetSavedPlayers = () => {
    leagueData.getSavedPlayers($scope.displaySavedPlayers);
  };
  $scope.displaySavedPlayers = (players) => {
    console.log('display saved players' , players);
    $scope.players = players;
  };

  $scope.deletePlayer = (element) => {
    player = element.player.username;
    leagueData.deletePlayer(player);
    leagueData.getSavedPlayers($scope.displaySavedPlayers);
  };

  $scope.displayPlayer = (player) => {
    leagueData.displayPlayer(player, (data) => {
      console.log('displaying ', data);
    });
  };
})

.directive('app', function() {
  return {
    templateUrl: './app.html'
  }
})