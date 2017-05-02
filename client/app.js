angular.module('mvp')

.controller('appCtrl', function($scope, leagueData) {
  console.log('inside appCtrl ', $scope);
  $scope.onClickGetTier = leagueData.getTierData;
  $scope.displayTierData = function(entries) {
    $scope.entries = entries;
  }
  $scope.onClickGetChamps = leagueData.getChampData;
  $scope.displayChampData = function(champs) {
    $scope.champs = champs;
    console.log(champs);
  }
})

.directive('app', function() {
  return {
    templateUrl: './app.html'
  }
})