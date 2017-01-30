'use strict';

/**
 * @ngdoc function
 * @name javierApp.controller:CrearparametroCtrl
 * @description
 * # CrearparametroCtrl
 * Controller of the javierApp
 */
angular.module('javierApp')
  .controller('CrearparametroCtrl', function ($http, $scope) {

  	//Se obtienen todas las aplicaciones
	$http.get('http://127.0.0.1:8081/v1/aplicacion/?limit=0').then(function(response) {
			$scope.aplicaciones = response.data;
	    });

    /*Función para insertar parametros*/
	  $scope.confirmar = function(){
	    var json = {"Nombre":$scope.parametro.nombre,
	                "Valor": $scope.parametro.valor,
	                "Aplicacion": {"Id":$scope.aplicacion.Id}};

	                console.log(json);

		//Función para hacer la inserción
		$http.post('http://127.0.0.1:8081/v1/parametro/',json)
		    .then(function(){
		          alert ("Guardo exitosamente");
		          //Limpia los campos despues de hacer una inserción
		          $scope.parametro = {};
		          $scope.aplicacion = {};
		    });
	  }

	   /*Función para limpiar todos los campos del formulario con el botón "Cancelar"*/
   		$scope.reset = function(form) {
          $scope.parametro = {};
          if (form) {
            form.$setPristine();          
            form.$setUntouched();
          }
  		};


  });


