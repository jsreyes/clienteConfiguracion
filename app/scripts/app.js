'use strict';

/**
 * @ngdoc overview
 * @name javierApp
 * @description
 * # javierApp
 *
 * Main module of the application.
 */
angular
  .module('javierApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'afOAuth2',
    'treeControl',
    'ngMaterial',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ngStorage'
  ])
    .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("");
      $routeProvider
       .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })      
      .when('/crearApp', {
        templateUrl: 'views/crearapp.html',
        controller: 'CrearappCtrl',
        controllerAs: 'crearApp'
      })
      .when('/consultarApp', {
        templateUrl: 'views/consultarapp.html',
        controller: 'ConsultarappCtrl',
        controllerAs: 'consultarApp'
      })
      .when('/crearPerfil', {
        templateUrl: 'views/crearperfil.html',
        controller: 'CrearperfilCtrl',
        controllerAs: 'crearPerfil'
      })
      .when('/consultarPerfil', {
        templateUrl: 'views/consultarperfil.html',
        controller: 'ConsultarperfilCtrl',
        controllerAs: 'consultarPerfil'
      })
      .when('/crearMenu', {
        templateUrl: 'views/crearmenu.html',
        controller: 'CrearmenuCtrl',
        controllerAs: 'crearMenu'
      })
      .when('/consultarMenu', {
        templateUrl: 'views/consultarmenu.html',
        controller: 'ConsultarmenuCtrl',
        controllerAs: 'consultarMenu'
      })
      .when('/crearParametro', {
        templateUrl: 'views/crearparametro.html',
        controller: 'CrearparametroCtrl',
        controllerAs: 'crearParametro'
      })
      .when('/consultarParametro', {
        templateUrl: 'views/consultarparametro.html',
        controller: 'ConsultarparametroCtrl',
        controllerAs: 'consultarParametro'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
