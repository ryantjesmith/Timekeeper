app.factory('settingsService', [function() {

  // Some fake testing data
  var settings = [{
    uurloon: 35.60,
    totaalbedrag: true
  }];

  return {
    all: function() {
      return settings;
    }
  };

}])