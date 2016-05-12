app.factory('yearService', [function() {

  // Some fake testing data
  var jaren = [{
    id: 1,
    name: 2016
  }, {
    id: 0,
    name: 2015
  }];

  return {
    all: function() {
      return jaren;
    }
  };

}])