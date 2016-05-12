app.controller('yearCtrl', ['$scope','yearService', 'monthsService', function($scope, yearService, monthsService) {

  $scope.years = yearService.all();
  $scope.yearlist = $scope.years[0];
  $scope.saveSettings = function(){
  	window.localStorage.setItem("year", $scope.yearlist.name);
  	window.location.href = '#/months';
  	//monthsService.all();
  }

}])