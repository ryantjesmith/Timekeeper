app.controller('detailsCtrl', ['$scope', '$stateParams', 'recordsService', function($scope, $stateParams, recordsService) {
  	var self = this;

    self.details = [];

    window.localStorage.setItem("day", $stateParams.dayId);
    self.day = window.localStorage.getItem("day");

    self.getDetails = function(){
        recordsService.getAllRecords({
          onSuccess: function(result){
            var records = result.data.data.records;

            var detailsRecord = [];

              var year = window.localStorage.getItem("year");
              if(year == null){
                year = new Date().getFullYear();
              }

              var month = window.localStorage.getItem("month");


              //iterate through records
              for (var i = 0; i < records.length; i++) {

                var currentStartDate = new Date(records[i].startDateTime);
                var currentEndDate = new Date(records[i].endDateTime);

                //if the year is the year that has been selected
                if (currentStartDate.getFullYear() == year) {

                  if (currentStartDate.getMonth() == month){

                  	if(currentStartDate.getDay() == self.day){

	                   var startTime = currentStartDate.getHours() + ":" + currentStartDate.getMinutes();
	                   var endTime = currentEndDate.getHours() + ":" + currentEndDate.getMinutes();


	                    var temp = {
	                      startTime: startTime, 
	                      endTime: endTime,
	                      break: records[i].breakDuration,
	                      addition: records[i].addition,
                        imgUrl: records[i].ImgURL,
                        location: records[i].location
	                    };

	                    detailsRecord.push(temp);
                  	}
                  }      
                }
              }
              $scope.details = detailsRecord[0];
              self.loadMapAndImage();
              console.log($scope.details);
          },
          onError: function (err){
            console.log(err);
          }
      })
    }
    self.getDetails();

    function showMap(coords) {
      var latLng = new google.maps.LatLng(coords.lat, coords.lng);
      var mapOptions = {
        center: latLng,
        zoom: 15
      };
      
      $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){
       
        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            draggable:false,
            position: latLng
        });  
      });
    }

    $scope.hidden = true;
    $scope.hiddenImage = true;

    self.loadMapAndImage = function(){
      if(typeof $scope.details.location !== 'undefined'){
        $scope.hidden = false;
        $scope.coords = $scope.details.location;
        setTimeout(function(){showMap($scope.details.location);}, 100);
      }
      
      if(typeof $scope.details.imgUrl !== 'undefined'){
        $scope.hiddenImage = false;
      } 
    }
    


}])