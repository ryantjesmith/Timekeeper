app.controller('detailsCtrl', ['$scope','$stateParams', 'detailsService', function($scope, $stateParams, detailsService) {
  	$scope.details = detailsService.getDetails($stateParams.dayId);
}])