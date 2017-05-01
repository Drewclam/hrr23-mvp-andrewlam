angular.module('mvp')

.controller('appCtrl', function($scope, leagueData) {
  console.log('inside appCtrl ', $scope);
  $scope.onClick = leagueData.getTierData;
  $scope.displayTierData = function(entries) {
    // once getTierData gets and parses:
    console.log('display data');
    $scope.entries = entries;
  }
})

.directive('app', function() {
  return {
    templateUrl: './app.html'
  }
})