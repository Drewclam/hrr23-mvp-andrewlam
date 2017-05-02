angular.module('mvp')

.controller('appCtrl', function($scope, $http, leagueData) {
  $scope.onClickGetTier = leagueData.getTierData;
  $scope.displayTierData = function(entries) {
    $scope.entries = entries;
  };
  $scope.onClickGetChamps = leagueData.getChampData;
  $scope.saveChampData = function(champs) {

    $scope.champs = champs;
    console.log(champs);
  };
})

.directive('app', function() {
  return {
    templateUrl: './app.html'
  }
})