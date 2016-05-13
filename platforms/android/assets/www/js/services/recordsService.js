app.factory('recordsService', ['$http', 'API', function($http, API) {

  //https://api-timekeeper.herokuapp.com/timekeepers

  return {
    getAllRecords: function(options) {
      $http.get(API.timekeeper).then(
        options.onSuccess, options.onError
      )
    },
    addDay: function(day, options) {
      $http.post(API.timekeeper, day).then(
        options.onSuccess, options.onError
      )
    },
    postImage: function(img, options){
      $http.post(API.imgur, img).then(
          options.onSuccess, options.onError
      )
    }
  }

}])