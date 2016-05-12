app.factory('monthsService', ['$http', function($http) {

  var monthsNew;
  // $http.get('http://rest-service.guides.spring.io/greeting').
  //       success(function(data) {
  //           months = data;
  //       });

  // Some fake testing data
  var months = [{
    id: 0,
    name: 'Maart',
    salary: 259.21,
    year: 2016
  }, {
    id: 1,
    name: 'April',
    salary: 259.75,
    year: 2016
  }, {
    id: 2,
    name: 'Mei',
    salary: 259.32,
    year: 2016
  }];

  return {
    all: function() {
      var yearMonths = new Array();
      var year = window.localStorage.getItem("year");
      if(year == null){
        year = new Date().getFullYear();
      }
      var x = 0;

      for (var i = 0; i < months.length; i++) {

        if (months[i].year === parseInt(year)) {
          yearMonths[x] = months[i];
          x++;
        }
      }
      return yearMonths;
    },
    get: function(monthId) {
      for (var i = 0; i < months.length; i++) {
        if (months[i].id === parseInt(monthId)) {
          return months[i];
        }
      }
      return null;
    },
    getTotalSalary: function(){
      var salary = 0.00;

      var year = window.localStorage.getItem("year");
      if(year == null){
        year = new Date().getFullYear();
      }

      for (var i = 0; i < months.length; i++) {
        if (months[i].year === parseInt(year)) {
          salary += months[i].salary;
        }
      }
      return salary;
    }
  };

}])