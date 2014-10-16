// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'highcharts-ng', 'ngAnimate','ui.router', 'dbcontroller','dbService', 'emailConfig', 'signinService', 'loading'])

.run(function($ionicPlatform, DB, USER_PREF, $state, $window, SIGNIN) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      
    navigator.splashscreen.hide();
      
    DB.init();
    
    //$state.go('app.login');
    //$window.location.href = ('#/templates/login');
      
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
          url: '/sign-in',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        })
   .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
 /*  .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })*/
    .state('app.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "templates/logout.html",
          controller: 'LogoutCtrl'
        }
      }
    })
    .state('app.projMetrics', {
      url: "/projMetrics",
      views: {
        'menuContent' :{
          templateUrl: "templates/projMetrics.html"
        }
      }
    })

    .state('app.engMetrics', {
      url: "/engMetrics",
      views: {
        'menuContent' :{
          templateUrl: "templates/engMetrics.html",
          controller: 'EnggCtrl'
        }
      }
    })
/*   .state('app.themes', {
      url: "/themes",
      views: {
        'menuContent' :{
          templateUrl: "templates/themes.html"
        }
      }
    })*/
     .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
          
        }
      }
    })
    .state('app.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent' :{
          templateUrl: "templates/dashboard.html"
          
        }
      }
    })
/*    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })*/;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sign-in');
    //$urlRouterProvider.otherwise('/dashboard');
});

