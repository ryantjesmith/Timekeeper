app.controller('daysCtrl', ['$scope','$stateParams', 'recordsService', '$cordovaCamera', '$cordovaGeolocation', function($scope, $stateParams, recordsService, $cordovaCamera, $cordovaGeolocation) {
  	
    var self = this;

    self.days = [];

    window.localStorage.setItem("month", $stateParams.monthId);
    self.month = window.localStorage.getItem("month");

    self.currentYear = window.localStorage.getItem("year");

    self.getRecordsOfMonth = function(){
        recordsService.getAllRecords({
          onSuccess: function(result){
            var records = result.data.data.records;
            console.log(records);

              //Array of months
              var daysOfMonth = [];

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

                  if (currentStartDate.getMonth() == self.month){
                    var one_minute=1000;
                    var timeDifference = currentEndDate.getTime() - currentStartDate.getTime();
                    var timeWorked = Math.round(timeDifference/one_minute); 
                    var totalSalary = Math.round(timeWorked * (records[i].wage / 60));
                    var dayNames = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

                    var temp = {
                      dayName: dayNames[currentStartDate.getDay()], 
                      dayNumber: currentStartDate.getDay(),
                      monthNumber: currentStartDate.getMonth(),
                      totalDaySalary: totalSalary
                    };

                    daysOfMonth.push(temp);
                  }      
                }
              }
              $scope.days = daysOfMonth;
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
                  if (currentStartDate.getMonth() == self.month){

                    var one_minute=1000;
                    var timeDifference = currentEndDate.getTime() - currentStartDate.getTime();
                    var timeWorked = Math.round(timeDifference/one_minute); 
                    var totalSalary = Math.round(timeWorked * (records[i].wage / 60));
                    salary += totalSalary;
                  }
                }

              }
              $scope.totalMonthSalary = salary;
          },
          onError : function(err){
            console.log(err);
          }
      })

    }

    self.getDaysOfMonth = function(){
      var d = new Date();
      var m = d.getMonth();
      var y = d.getFullYear();
      var daysInMonth = new Date(y, m, 0).getDate();

      var input = [];

      for (var i = 1; i <= daysInMonth; i++) {
          input.push(i);
      }

      $scope.range = input;
   }

   self.getCurrentDay = function(){
      var d = new Date();
      return d.getDate();
   }

    self.getRecordsOfMonth();
    self.getTotalSalary();

   //  //ADD DAY
    self.getDaysOfMonth();
    $scope.dayList = $scope.range[self. getCurrentDay() - 1];

  	$scope.months = [{id: 1, name: "Januari"}, {id: 2, name: "Februari"}, {id: 3, name: "Maart"}, {id: 4, name: "April"}, {id: 5, name: "Mei"}, {id: 6, name: "Juni"}, {id: 7, name: "Juli"}, {id: 8, name: "Augustus"}, {id: 9, name: "September"}, {id: 10, name: "Oktober"}, {id: 11, name: "November"}, {id: 12, name: "December"}];
  	$scope.monthList = $scope.months[4];

    var isChecked = window.localStorage.getItem("totaalbedrag") === 'true';
    $scope.showTotal = isChecked;
    $scope.hidden = true;
    $scope.imgHidden = true;

   //  //DAG TOEVOEGEN
    $scope.errorHidden = true;
    $scope.day = {};
    $scope.imgURL = window.localStorage.getItem("url");


   
  	

  	$scope.saveDay = function(day) {

      //CALL ADD DAY FUNCTION IF VALIDATED

      var newTkr = angular.copy(day);

       newTkr.startDateTime.setFullYear(self.currentYear);
       newTkr.startDateTime.setMonth($scope.monthList.id -1);

       newTkr.endDateTime.setFullYear(self.currentYear);
       newTkr.endDateTime.setMonth($scope.monthList.id -1);


       newTkr.startDateTime = newTkr.startDateTime.toISOString();
       newTkr.endDateTime = newTkr.endDateTime.toISOString();

       newTkr.wage = parseInt(window.localStorage.getItem("uurloon"));
       newTkr.breakDuration = parseInt(newTkr.breakDuration);

       if($scope.hidden == false){
            newTkr.location = { lat: $scope.coords.latitude, lng: $scope.coords.longitude };
       }
       if($scope.imgHidden == false){
          recordsService.postImage($scope.imgURI, { 
            onSuccess: function (result){
              console.log(result);
              newTkr.ImgURL = result.data.data.link;

              console.log(newTkr);

               //POST RECORD
              recordsService.addDay(newTkr, { 
                onSuccess: function (result){
                  console.log(result.data);
                  window.location.href = '#/days';
                  window.location.reload();
                },
                onError: function(err){
                  console.log(err);
                }
              })
            },
            onError: function(err){
              console.log(err);
            }
          })
       }
       else{
          console.log(newTkr);

           //POST RECORD
          recordsService.addDay(newTkr, { 
            onSuccess: function (result){
              console.log(result.data);
              window.location.href = '#/days';
              window.location.reload();
            },
            onError: function(err){
              console.log(err);
            }
          })
       }
       

       
       
  	}

    function showMap(coords) {
      var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
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
            draggable:true,
            position: latLng
        });  
        google.maps.event.addListener(marker, 'dragend', function(evt) 
        {
            $scope.coords.latitude = evt.latLng.lat().toFixed(3);
            $scope.coords.longitude = evt.latLng.lng().toFixed(3);
        });

        // function geocodePosition(pos) 
        // {
        //   console.log(pos);
        //    geocoder = new google.maps.Geocoder();
        //    geocoder.geocode
        //     ({
        //         latLng: pos
        //     }, 
        //         function(results, status) 
        //         {
        //             if (status == google.maps.GeocoderStatus.OK) 
        //             {
        //                 console.log(results[0].formatted_address);
        //             } 
        //             else 
        //             {
        //                 console.console.log(status);
        //             }
        //         }
        //     );
        // }    
       
      });
    }

    $scope.openMap = function() {
        $scope.hidden = false;
        $cordovaGeolocation.getCurrentPosition().then(function(position) {
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
          $scope.imgHidden = false;
      }, function (err) {
          $scope.error = "There has been an error loading the image";
      });
    };

}])