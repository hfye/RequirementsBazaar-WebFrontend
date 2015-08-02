'use strict';

/**
 * @ngdoc function
 * @name requirementsBazaarWebFrontendApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the requirementsBazaarWebFrontendApp
 */
angular.module('requirementsBazaarWebFrontendApp')
  .controller('IndexCtrl', function ($scope, $location, $sce, UtilityService, reqBazService, HttpErrorHandlingService) {

    $scope.activeUser = null;

    $scope.go = function(id){
      console.log(id);
      $location.path('/project/'+id, true);
    };

    $scope.exploreProjects = function(){
      $location.path('/explore/', true);
    };

    /*
     * Register a listener for the oauth login and if an existing token is still valid
     * */
    $scope.$on('oauth:login', function() {
      UtilityService.showFeedback('WELCOME_BACK');
    });
    $scope.$on('oauth:authorized', function() {});
    $scope.$on('oauth:logout', function() {
      UtilityService.showFeedback('LOGOUT');
      $scope.activeUser = null;
      $location.path($location.$$path, true);
    });


    $scope.$on('oauth:profile', function() {
      reqBazService.getCurrentUser()
        .success(function (user) {
          console.log(user);
          $scope.activeUser = user;
        })
        .error(function (error,httpStatus) {
          HttpErrorHandlingService.handleError(error,httpStatus);
        });
    });

    /*
     * Making sure that the URL passing works on custom elements
     * */
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

  });


