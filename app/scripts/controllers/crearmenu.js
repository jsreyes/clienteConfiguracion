'use strict';

/**
 * @ngdoc function
 * @name javierApp.controller:CrearmenuCtrl
 * @description
 * # CrearmenuCtrl
 * Controller of the javierApp
 */
angular.module('javierApp')
  .controller('CrearmenuCtrl', function ($http, $scope) {

  	//Estructuras vacias que son llenadas al realizar el GET
  	//$scope.menu_padre={};  
  	$scope.aplicacion={};
  	$scope.menus = {};
  	$scope.menu_x_perfil = [];
  	$scope.treeOptions = {
  				multiSelection: false,
			    nodeChildren: "Opciones",
			    dirSelectable: true,
			    injectClasses: {
			        ul: "a1",
			        li: "a2",
			        liSelected: "a7",
			        iExpanded: "a3",
			        iCollapsed: "a4",
			        iLeaf: "a5",
			        label: "a6",
			        labelSelected: "a8"
			    }
			};

  	//Función para obtener las aplicaciones
	$http.get('http://127.0.0.1:8081/v1/aplicacion/?limit=0').then(function(response) {
		$scope.aplicaciones = response.data;
    });

    /*Función para incluir los menus de acuerdo a la app seleccionada*/
    $scope.visualizar = function(){
    	console.log("Entro a visuazliar")
    	$scope.dataForTheTree = [];
    	//Condicional
    	if (typeof $scope.aplicacion.Id === 'undefined' || !$scope.aplicacion.Id || $scope.aplicacion.Id === null || $scope.nodeChildren === null){
    		//Borra los seleccionados anteriormente
    		$scope.menus = {};
    		$scope.dataForTheTree = [];

    	}else{
    		//Carga los menus por aplicación
    		
    		$http.get('http://127.0.0.1:8081/v1/menu_opcion/?query=Aplicacion.Id:' + $scope.aplicacion.Id +'').then(function(response) {
				$scope.menus = response.data;
				console.log($scope.menus)
		    });

			
			
			$scope.dataForTheTree = [];

			//Carga los menus por aplicación
			$http.get('http://127.0.0.1:8081/v1/menu_opcion_padre/MenusPorAplicacion/' + $scope.aplicacion.Id +'').then(function(response) {
				if (response.data ==null) {
					$scope.dataForTheTree = [];
				}else{
					$scope.dataForTheTree = response.data;	
				}				
		    });
    	}
   	};

    /*Función para insertar aplicaciones*/
	  $scope.confirmar = function(){
	  	//console.log(padre);
	    var json = {"Nombre":$scope.menu.nombre,
	    			"Variable":$scope.menu.variable,
	    			"Url": $scope.menu.url,
	    			"Orden": parseInt($scope.menu.orden),
	    			"Layout":$scope.menu.layout,
	                "Dominio": $scope.menu.dominio,
	                "Aplicacion": {"Id":$scope.aplicacion.Id}};


	                console.log(json);

	            if($scope.dataForTheTree === null){
	            	console.log("Entro aca 1");
	            	//Función para hacer las inserciones en la tabla menu_opcion
				      $http.post('http://127.0.0.1:8081/v1/menu_opcion/',json)
				      .then(function(response){

	      		          alert ("Guardo exitosamente");
	      		          //Limpia los campos despues de hacer una inserción
	      		          $scope.menu = {};
	      		          $scope.aplicacion = {};
	      		          $scope.dataForTheTree = [];
	      			      });
	            }else{

	            	console.log("Entro aca 2");
					//Función para hacer las inserciones en la tabla menu_opcion
				      $http.post('http://127.0.0.1:8081/v1/menu_opcion/',json)
				      .then(function(response){

				      		$scope.menu_hijo = response.data;			      		

				      		console.log($scope.menu_padre);

				      		//Condicional por si no se selecciona un menú padre
				      		if($scope.menu_padre!== undefined  ){

				      				console.log("Entro a insertar padre");
				      				console.log($scope.menu_padre.Id);
				      				console.log(response.data.Id);

				      		
						      		//Creación JSON para POST en menu_opcion_padre
						      		var json_padre = {"Padre":{"Id": $scope.menu_padre.Id},
						      						  "Hijo": {"Id": $scope.menu_hijo.Id}};

							      	//Se realiza la petición POST, para guardar los menús asociados al perfil
							    	$http.post('http://127.0.0.1:8081/v1/menu_opcion_padre/', json_padre)
							    		.then(function(response){
							    			console.log(response.data);
							    			//alert("");
							    	});
							}

			          alert ("Guardo exitosamente");
			          //Limpia los campos despues de hacer una inserción
			          $scope.menu = {};
			          $scope.aplicacion = {};
			          $scope.dataForTheTree = [];
				      });
			    }
			};

	  /*Función para limpiar todos los campos del formulario con el botón "Cancelar"*/
   		$scope.reset = function(form) {
          $scope.menu = {};
          if (form) {
            form.$setPristine();          
            form.$setUntouched();
          }
  		};

  		console.log($scope.menu_padre);

  		

  });
