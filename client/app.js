angular.module('mvp')

.controller('appCtrl', function($scope, leagueData) {
  console.log('inside appCtrl ', $scope);
  $scope.onClick = leagueData.getTierData;
})

.directive('app', function() {
  return {
    templateUrl: './get.html'
  }
})