'use strict';

// Declare app level module which depends on filters, and services
angular.module('yblog', ['yblog.filters', 'yblog.services', 'yblog.directives', 'yblog.controllers']).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: 'static/tpl/list.html',
        controller: 'IndexCtrl'
      }).
      when('/art_:AID', {
        templateUrl: 'static/tpl/art.html',
        controller: 'ArtCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
