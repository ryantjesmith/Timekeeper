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

   self.validateForm = function(data){
      var amountOfInputs = 0;
      var timeFormat = /^([0-9]{2})\:([0-9]{2})$/;
      self.passed = true;

      angular.forEach(data, function(value, key) {
        
        if(key == "startTime" || key == "endTime"){
          amountOfInputs++;
        }
        if(key == "startTime" || key == "endTime"){
          if(!timeFormat.test(value)){
            self.passed = false;
          }
          
        }
      });
      if(amountOfInputs < 2){
        self.passed = false;
      }
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


   
  	

  	$scope.saveDay = function() {
       $scope.day.day = $scope.dayList;
       $scope.day.month = $scope.monthList.id;
       
       //CALL ADD DAY FUNCTION IF VALIDATED
       self.validateForm($scope.day);
       if(self.passed == true){

          var start_hours = $scope.day.startTime.substr(0, $scope.day.startTime.indexOf(':'));
          var start_minutes = $scope.day.startTime.substr($scope.day.startTime.indexOf(":") + 1);

          var end_hours = $scope.day.endTime.substr(0, $scope.day.endTime.indexOf(':'));
          var end_minutes = $scope.day.endTime.substr($scope.day.endTime.indexOf(":") + 1);

          var startDate = new Date(self.currentYear, $scope.day.month -1, $scope.day.day, start_hours, start_minutes).toISOString();
          var endDate = new Date(self.currentYear, $scope.day.month -1, $scope.day.day, end_hours, end_minutes).toISOString();

          var dbDay = {
            startDateTime: startDate,
            endDateTime: endDate,
            breakDuration: parseInt($scope.day.break),
            wage: parseInt(window.localStorage.getItem("uurloon")),
            addition: $scope.day.addition, 
          };

          if($scope.imgHidden == false){
              dbDay.ImgURL = $scope.imgURI;
          }
          if($scope.hidden == false){
              dbDay.location = { lat: $scope.coords.latitude, lng: $scope.coords.longitude };
          }

          console.log(dbDay);
          
          //POST RECORD
          recordsService.addDay(dbDay), {
            onSuccess: function (result){
              console.log(result.data);
              window.location.href = '#/days';
              window.location.reload();
            },
            onError: function(err){
              console.log(err);
            }
          }
          recordsService.addDay($scope.day);
       }
       else{
          //trow error
          $scope.errorHidden = false;
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