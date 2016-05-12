app.factory('daysService', ['$cordovaCamera', function($cordovaCamera) {


  // Some fake testing data
  var days = [{
    id: 0,
    name: 'Ma 26',
    salary: 259.21,
    monthId: 0,
    year: 2016
  }, {
    id: 1,
    name: 'Ma 26',
    salary: 212.60,
    monthId: 0,
    year: 2016
  }, {
    id: 2,
    name: 'Ma 26',
    salary: 276.23,
    monthId: 0,
    year: 2016
  }];


  return {
    all: function() {
      return days;
    },
    getDaysOfMonth: function(monthId) {
      var newDays = new Array();
      var x = 0;
      for (var i = 0; i < days.length; i++) {
        if (days[i].monthId === parseInt(monthId)) {
          newDays[x] = days[i];
          x++;
        }
      }
      return newDays;
    },
    addDay: function(data){
      //POST WITH DATA
    },
    getDaysInMonth: function() {
      var d = new Date();
      var m = d.getMonth();
      var y = d.getFullYear();
      var daysInMonth = new Date(y, m, 0).getDate();

      var input = [];

      for (var i = 1; i <= daysInMonth; i++) {
          input.push(i);
      }

      return input;
    },
    getTotalSalary: function(monthId){
      var totalSalary = 0.00;
      var x = 0;
      for (var i = 0; i < days.length; i++) {
        if (days[i].monthId === parseInt(monthId)) {
          totalSalary += days[i].salary;
        }
      }
      return totalSalary;
    },
    takePicture: function() {
    
    },
    getCurrentDay: function(){
      var d = new Date();
      return d.getDate();
    }
  };

}])