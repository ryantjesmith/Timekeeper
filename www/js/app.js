// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $templateCache) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // EIGEN CODE
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  $stateProvider

  .state('months', {
    url: '/months',
    templateUrl: './templates/months.html',
    controller: 'monthsCtrl'
  })
  .state('days', {
    url: '/months/:monthId',
    templateUrl:'./templates/days.html',
    controller: 'daysCtrl'
  })
  .state('details', {
    url: '/days/:dayId',
    templateUrl:'./templates/details.html',
    controller: 'detailsCtrl'
  })
  .state('settings', {
    url: '/settings',
    templateUrl:'./templates/settings.html',
    controller: 'settingsCtrl'
  })

  //edit states
  .state('selectYear', {
    url: '/year',
    templateUrl:'./templates/selectYear.html',
    controller: 'yearCtrl'
  })
  .state('addDay', {
    url: '/day',
    templateUrl:'./templates/addDay.html',
    controller: 'daysCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/months');

});
