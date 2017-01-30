'use strict';

/**
 * @ngdoc function
 * @name javierApp.controller:ConsultarperfilCtrl
 * @description
 * # ConsultarperfilCtrl
 * Controller of the javierApp
 */
angular.module('javierApp')
  .controller('ConsultarperfilCtrl', function ($scope, $http, $mdDialog) {

    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';


    //Variable para mostar info en el modal
  $scope.prueba = {};
  //$menus_por_app = {};
  $scope.on_off = false;

   $scope.treeOptions = {
          multiSelection: true,
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

  //Función que arma la tabla  
	$scope.gridOptions1 = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
          { field: 'Nombre',  cellTemplate: tmpl },
          { field: 'Dominio',  cellTemplate: tmpl},
          { field: 'Aplicacion.Nombre',  displayName: 'Aplicación',  cellTemplate: tmpl},
          { field: 'Acciones', 
          cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.deleteRow(row)" type="submit"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.actualizar(row); change_state()" ng-show="on_off"><i class="glyphicon glyphicon-pencil"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.actualizar(row);change_state()" ng-hide="on_off"><i class="glyphicon glyphicon-ok"></i></button>&nbsp;<button type="button" class="btn btn-primary btn-circle" ng-click="grid.appScope.visualizar(row);grid.appScope.showAdvanced($event, row)" data-toggle="modal" data-target="#exampleModalLong"><i class="glyphicon glyphicon-cog"></i></button>'}
        ],

      };

    $scope.menus_x_perfil = {};
      
      $http.get('http://127.0.0.1:8081/v1/perfil/?limit=0')
        .then(function(response) {
          $scope.gridOptions1.data = response.data;
        });

      //Función para borrar un registro de la tabla  
      $scope.deleteRow = function(row) { 
             var index = $scope.gridOptions1.data.indexOf(row.entity);
             
             //Borra la aplicación de la BD
             $http.delete('http://127.0.0.1:8081/v1/perfil/' + row.entity.Id)
                .then(function(response) {

                   //Condicional
                  if (response === "OK"){
                        //$scope.gridOptions1.data.splice(index, 1); Sirve para hacer el borrado desde la vista
                        alert("La perfil se ha borrado exitosamente");
                        //Función que obtiene todas las aplicaciones
                        $http.get('http://127.0.0.1:8081/v1/perfil/?limit=0')
                          .then(function(response) {
                              $scope.gridOptions1.data = response.data;
                           });
                  }else{
                        alert("No se puede borrar el perfil");
                  }                      
                });
      };

      //Función para actualizar
      $scope.actualizar = function(row) {
          //El index indica la posición en la grilla
          var index = $scope.gridOptions1.data.indexOf(row.entity);
          //Permite que la fila del index, sea editable
          $scope.gridOptions1.data[index].editable = !$scope.gridOptions1.data[index].editable;

          console.log("Entro a editar");

          var jsonActualizado = row.entity;

           $http.put('http://127.0.0.1:8081/v1/perfil/'+ $scope.gridOptions1.Id, jsonActualizado)
          .then(function (response) {
              $scope.ServerResponse = response.data;
          })       
    };

    //Función para visualizar los menús asociados
      $scope.visualizar = function(row) {
          //El index indica la posición en la grilla
          var index = $scope.gridOptions1.data.indexOf(row.entity);

          console.log(row.entity.Id);
          $scope.prueba = row.entity;
          console.log(row.entity.Aplicacion.Id);

          //Obtiene los menús asociados a ese perfil
         $http.get('http://127.0.0.1:8081/v1/perfil_x_menu_opcion/arbolMenus/'+row.entity.Nombre+'')
            .then(function(response) {
                $scope.opciones = response.data;
                console.log($scope.opciones);
                //$scope.showComplex();
              })

          //Variable que contiene los menus de la app  
          $scope.dataForTheTree = {};

          //Carga los menus por aplicación
          $http.get('http://127.0.0.1:8081/v1/menu_opcion_padre/MenusPorAplicacion/' + row.entity.Aplicacion.Id +'').then(function(response) {
            $scope.dataForTheTree = response.data;
            });
      };


      //Función para guardar nuevos menus al perfil
       $scope.guardar_nuevos = function(){
              //For para realizar el post a la tabla perfil_x_menu_opcion
              for(var i = 0; i < $scope.nuevo_menu_x_perfil.length; i++){

                //Se realiza la petición POST, para guardar los menús asociados al perfil
                $http.post('http://127.0.0.1:8081/v1/perfil_x_menu_opcion/', {"Perfil": $scope.prueba, "Opcion" :  $scope.nuevo_menu_x_perfil[i]})
                  .then(function(response){
                    console.log(response.data);
                    alert("Los nuevos menús asociados al perfil, se han guardado satisfactoriamente");
                });

              }   
      };



                 


              
    
    $scope.change_state = function(){
      if ($scope.on_off){
        $scope.on_off = false;
      }else{
        $scope.on_off = true;
      }
    }

});
