app.factory('recordsService', ['$http', function($http) {



  return {
    getAllRecords: function(options) {
      $http.get('http://api-timekeeper.herokuapp.com/timekeepers').then(
        options.onSuccess, options.onError
      )
    },
    addDay: function(options, day) {
      $http.post('http://api-timekeeper.herokuapp.com/timekeepers').then(
        options.onSuccess, options.onError
      )
    }
  }

}])