app.factory('detailsService', [function() {

  // Some fake testing data
  var details = [{
    id: 0,
    begintijd: '09:00',
    eindtijd: '15:00',
    pauze: '0:30',
    bijzonderheden: "pijnstillers gekocht onder werktijd",
    imgURI: null,
    dayId: 0
  }];

  return {
    all: function() {
      return details;
    },
    getDetails: function(dayId) {
      for (var i = 0; i < details.length; i++) {
        if (details[i].dayId === parseInt(dayId)) {
          return details[i];
        }
      }
      return null;
    },
    addDay: function(data){
      //POST WITH DATA
    }
  };

}])