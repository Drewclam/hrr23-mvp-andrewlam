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
    console.log('hello', player);
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
      $scope.info = data;
      $scope.info.topPlayed = 'Most Played: ' + data.topPlayed;
      $scope.info.winsLosses = 'Wins: ' + data.wins + '| Losses: ' + data.losses;
      $scope.info.ratio = 'Win Ratio: ' + Math.round(data.wins / (data.wins + data.losses) * 100) / 100;
    });
  };
})

.directive('app', function() {
  return {
    templateUrl: './app.html'
  }
})