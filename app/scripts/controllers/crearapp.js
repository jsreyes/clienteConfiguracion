'use strict';

/**
 * @ngdoc function
 * @name javierApp.controller:CrearappCtrl
 * @description
 * # CrearappCtrl
 * Controller of the javierApp
 */
angular.module('javierApp')
  .controller('CrearappCtrl', function ($http, $scope) {


  /*Función para insertar aplicaciones*/
  $scope.confirmar = function(){
    var json = {"Nombre":$scope.aplicacion.nombre,
                "Descripcion": $scope.aplicacion.descripcion,
                "Dominio": $scope.aplicacion.dominio,
                "Ip": $scope.aplicacion.ip};
	
      $http.post('http://127.0.0.1:8081/v1/aplicacion/',json)
      .then(function(){
          alert ("Guardo exitosamente");
          //Limpia los campos despues de hacer una inserción
          //$scope.reset(crearParametro);
          $scope.aplicacion = {};
      });
    }

  /*Función para limpiar todos los campos del formulario con el botón "Cancelar"*/
   $scope.reset = function(form) {
          $scope.aplicacion = {};
          if (form) {
            form.$setPristine();          
            form.$setUntouched();
          }
  };
});
