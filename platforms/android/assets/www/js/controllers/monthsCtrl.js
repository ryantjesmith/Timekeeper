app.controller('monthsCtrl', ['$scope', 'recordsService', function($scope, recordsService) {

	var self = this;

	self.months = [];

	self.getMonthsInYear = function(){
		recordsService.getAllRecords({
			onSuccess: function(result){
				console.log(result.data);
				var records = result.data.data.records;

			    //Array of months
			    var yearMonths = [];

			    var year = window.localStorage.getItem("year");
			    if(year == null){
			      year = new Date().getFullYear();
			    }

			    //iterate through records
			    for (var i = 0; i < records.length; i++) {

			      var currentStartDate = new Date(records[i].startDateTime);
			      var currentEndDate = new Date(records[i].endDateTime);

			      //if the year is the year that has been selected
			      if (currentStartDate.getFullYear() == year) {

			        //checker if the month is already added to the array
			        var added = false;

			        //iterate though months of the year 
			        for(var x = 0; x < yearMonths.lenght; x++){

			          //if the current month is already in the array
			          if(yearMonths[x].month == currentStartDate.getMonth()){

			              var timeWorked = currentEndDate.getTime() - currentStartDate.getTime();
			              var totalSalary = timeWorked * records[i].wage;
			              yearMonths[x].totalMonthSalary += totalSalary;

			              added = true;
			          }
			        }
			        if(added == false){
			          var one_minute=1000;
			          var timeDifference = currentEndDate.getTime() - currentStartDate.getTime();
			          var timeWorked = Math.round(timeDifference/one_minute); 
			          var totalSalary = Math.round(timeWorked * (records[i].wage / 60));
			          var monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];

			          var temp = {
			            monthName: monthNames[currentStartDate.getMonth()], 
			            monthNumber: currentStartDate.getMonth(),
			            totalMonthSalary: totalSalary
			          };

			          yearMonths.push(temp);
			        }
			        
			      }
			    }
			    $scope.months = yearMonths;
			},
			onError: function (err){
				console.log(err);
			}
		})
	}

	self.getTotalSalary = function(){
		var salary = 0.00;

        var year = window.localStorage.getItem("year");
        if(year == null){
          year = new Date().getFullYear();
        }

        recordsService.getAllRecords({
			onSuccess: function(result){

				var records = result.data.data.records;


		        for (var i = 0; i < records.length; i++) {

		          var currentStartDate = new Date(records[i].startDateTime);
		          var currentEndDate = new Date(records[i].endDateTime);

		          //if the year is the year that has been selected
		          if (currentStartDate.getFullYear() == year) {
		            var one_minute=1000;
			        var timeDifference = currentEndDate.getTime() - currentStartDate.getTime();
			        var timeWorked = Math.round(timeDifference/one_minute); 
			        var totalSalary = Math.round(timeWorked * (records[i].wage / 60));
		            salary += totalSalary;
		          }

		        }
		        $scope.totalYearSalary = salary;
		    },
		    onError : function(err){
		    	console.log(err);
		    }
		})

	}

	self.getMonthsInYear();
	self.getTotalSalary();



	//$scope.months = recordsService.getMonthsInYear();
	//$scope.months = monthsService.all();
	//$scope.totalYearSalary = recordsService.getTotalSalary();
	$scope.year = window.localStorage.getItem("year");

	var isChecked;
	if(window.localStorage.getItem("totaalbedrag") == null)
		window.localStorage.setItem("totaalbedrag", 'true');
	else{
		isChecked = window.localStorage.getItem("totaalbedrag") === 'true';
	}
	$scope.showTotal = isChecked;
  
}])

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });