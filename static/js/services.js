'use strict';

/* Services */

angular.module('yblog.services', ['ngResource']).
  factory('Article', ['$resource', function ($resource) {
    return $resource('/api/art/:AID', {}, {
      list: {
        method: 'GET'
      }
    });
  }]);