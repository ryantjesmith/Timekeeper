app.factory('settingsService', [function() {

  var settings = [{
    uurloon: 8.00,
    totaalbedrag: true
  }];

  return {
    all: function() {
      return settings;
    }
  };

}])