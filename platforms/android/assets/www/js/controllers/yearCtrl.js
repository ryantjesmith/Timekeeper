app.controller('yearCtrl', ['$scope', 'recordsService', function($scope, recordsService) {

  self.getMonthsInYear = function(){
		recordsService.getAllRecords({
			onSuccess: function(result){
				var records = result.data.data.records;

			    //Array of months
			    $scope.years = [];


			    //iterate through records
			    for (var i = 0; i < records.length; i++) {

			      var currentStartDate = new Date(records[i].startDateTime);

			      var inArray = false;
			      //if the year is the year that has been selected
			      for(var x = 0; x < $scope.years.length; x++){
			      	 if(currentStartDate.getFullYear() == $scope.years[x])
			      	 	inArray = true;
			      }
			      if(!inArray)
			      	$scope.years.push(currentStartDate.getFullYear());
			  	}
			  	$scope.yearlist = $scope.years[0];

			},
			onError: function (err){
				console.log(err);
			}
		})
	}
  self.getMonthsInYear();

  
  $scope.saveYear = function(){
  	window.localStorage.setItem("year", $scope.yearlist);
  	window.location.href = '#/months';
  	window.location.reload();
  }

}])