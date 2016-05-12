app.controller('settingsCtrl', ['$scope','settingsService', function($scope, settingsService) {
  $scope.uurloon = window.localStorage.getItem("uurloon");

  if(window.localStorage.getItem("totaalbedrag") == 'true'){
  	$scope.totaalbedrag = true;
  }
  else{
	$scope.totaalbedrag = false;
  }

  $scope.saveSettings = function(){
  	window.localStorage.setItem("uurloon", settingsForm.uurloon.value);

  	if($scope.totaalbedrag)
  		window.localStorage.setItem("totaalbedrag", 'true');
  	else
  		window.localStorage.setItem("totaalbedrag", 'false');
  }
}])