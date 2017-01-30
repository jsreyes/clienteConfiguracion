'use strict';

angular.module('javierApp')
  .controller('menuCtrl', function($location, $http, $scope, token_service) {
    var ctrl = this;
    var paths = [];
    $scope.actual = $location.path();
    $scope.token_service = token_service;
    $scope.breadcrumb = [];

    //Variable que contiene el arreglo de los JSON, con los menus respectivos
    $scope.menu_service = [];

    $http.get('http://127.0.0.1:8081/v1/perfil_x_menu_opcion/arbolMenus/Administrador configuración')
       .then(function(response) {      
          $scope.menu_service = response.data;
          recorrerArbol($scope.menu_service, "");
          update_url();
    });
    
    var recorrerArbol = function(item, padre) {
      var padres = "";
      for (var i = 0; i < item.length; i++) {
        if (item[i].Opciones === null) {
          padres = padre + " , " + item[i].Nombre;
          paths.push({
            'path': item[i].Url,
            'padre': padres.split(",")
          });
        } else {
          recorrerArbol(item[i].Opciones, padre + "," + item[i].Nombre);
        }
      }
      return padres;
    };
    
    var update_url = function() {
      $scope.breadcrumb = [''];
      for (var i = 0; i < paths.length; i++) {
        if ($scope.actual === "/" + paths[i].path) {
          $scope.breadcrumb = paths[i].padre;
        } else if ('/' === $scope.actual) {
          $scope.breadcrumb = [''];
        }
      }
    }    

    $scope.$on('$routeChangeStart', function(next, current) {
      $scope.actual = $location.path();
      update_url();
    });


    //Pendiente por definir json del menu
    (function($) {
      $(document).ready(function() {
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).parent().siblings().removeClass('open');
          $(this).parent().toggleClass('open');
        });
      });
    })(jQuery);
  });
