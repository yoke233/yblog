'use strict';


/* Controllers */

angular.module('yblog.controllers', []).
  controller('IndexCtrl', ['$scope', 'Article', '$routeParams',
    function ($scope, Article, $routeParams) {
      var param = {
        p: $routeParams.p || 1,
        s: $routeParams.s || 10
      };
      $scope.Articles = Article.query(param);
    }
  ]);

/* Directives */


angular.module('yblog.directives', []).
  directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  }]);


/* Filters */

angular.module('yblog.filters', []).
  filter('interpolate', ['version', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);


/* Services */

angular.module('yblog.services', ['ngResource']).
  factory('Article', ['$resource', function ($resource) {
    return $resource('/api/art/:AID', {}, {
    });
  }]);



// Declare app level module which depends on filters, and services
angular.module('yblog', ['yblog.filters', 'yblog.services', 'yblog.directives', 'yblog.controllers']).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $routeProvider.
      when('/', {
        templateUrl: 'static/tpl/list.html',
        controller: 'IndexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);