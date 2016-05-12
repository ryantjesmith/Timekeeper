app.controller('daysCtrl', ['$scope','$stateParams', 'monthsService', 'daysService', 'detailsService', '$cordovaCamera', '$cordovaGeolocation', function($scope, $stateParams, monthsService, daysService, detailsService, $cordovaCamera, $cordovaGeolocation) {
  	$scope.days = daysService.getDaysOfMonth($stateParams.monthId);
  	$scope.range = daysService.getDaysInMonth();
  	$scope.totalMonthSalary = daysService.getTotalSalary($stateParams.monthId);
  	$scope.months = monthsService.all();
  	$scope.monthList = $scope.months[0];
    $scope.dayList = $scope.range[daysService.getCurrentDay() - 1];
    var isChecked = window.localStorage.getItem("totaalbedrag") === 'true';
    $scope.showTotal = isChecked;

    //DAG TOEVOEGEN
    $scope.day = {};
    $scope.imgURL = window.localStorage.getItem("url");
  	

  	$scope.saveDay = function() {
       $scope.day.monthId = $scope.monthList.id;
       $scope.day.day = $scope.dayList;

       detailsService.addDay($scope.day);
  	   daysService.addDay($scope.day);
  	}

    function showMap(coords) {
      var mapOptions = {
        center: { lat: coords.latitude, lng: coords.longitude},
        zoom: 8
      };
      console.log(coords);
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    $scope.openMap = function() {
        daysService.getPosition().then(function(position) {
          $scope.coords = position.coords;
          setTimeout(function(){showMap(position.coords);}, 100);
          
        }, function(err) {
          console.log('getCurrentPosition error: ' + angular.toJson(err));
        });
    }

  	$scope.openCamera = function() {
      //$scope.imgURI = daysService.takePicture();
	    //$scope.photo.src = daysService.takePicture();

      var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 200,
          targetHeight: 200,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          window.localStorage.setItem("url", "data:image/jpeg;base64," + imageData);
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          $scope.error = "There has been an error loading the image";
      });
    };

}])