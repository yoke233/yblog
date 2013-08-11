'use strict';

/* Controllers */

angular.module('yblog.controllers', []).
  controller('IndexCtrl', ['$scope', 'Article', '$routeParams',
    function ($scope, Article, $routeParams) {
      var param = {
        p: $routeParams.p,
        s: $routeParams.s
      };
      $scope.Articles = Article.query(param);
    }
  ]).
  controller('ArtCtrl', ['$scope', 'Article', '$routeParams',
    function ($scope, Article, $routeParams) {
      $scope.art = Article.get({AID: $routeParams.AID});
    }
  ]);