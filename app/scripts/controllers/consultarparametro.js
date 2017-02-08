'use strict';

/**
 * @ngdoc function
 * @name javierApp.controller:ConsultarparametroCtrl
 * @description
 * # ConsultarparametroCtrl
 * Controller of the javierApp
 */
angular.module('javierApp')
  .controller('ConsultarparametroCtrl', function ($scope, $http) {

    //Variable de template que permite la edición de las filas de acuerdo a la condición ng-if
    var tmpl = '<div ng-if="!row.entity.editable">{{COL_FIELD}}</div><div ng-if="row.entity.editable"><input ng-model="MODEL_COL_FIELD"</div>';

    //Campos que tendra la tabla UI-GRID
  	$scope.gridOptions1 = {
        enableSorting: true,
        enableFiltering: true,
        resizable: true,
        columnDefs: [
          { field: 'Nombre',  cellTemplate: tmpl },
          { field: 'Valor',  cellTemplate: tmpl},
          { field: 'Aplicacion.Nombre', enableCellEdit: false, displayName: 'Aplicación',  cellTemplate: tmpl},
          {field: 'Acciones', 
          cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.deleteRow(row)"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.actualizar(row)"><i class="glyphicon glyphicon-pencil"></i></button>'}
        ],

      };

    //Se obtienen los datos por medio del metodo Get
        $http.get('http://127.0.0.1:8081/v1/parametro/?limit=0')
        .then(function(response) {
          $scope.gridOptions1.data = response.data;
        });


      //Función para borrar un registro de la tabla  
        $scope.deleteRow = function(row) { 
               var index = $scope.gridOptions1.data.indexOf(row.entity);
               
               //Borra la aplicación de la BD
               $http.delete('http://127.0.0.1:8081/v1/parametro/' + row.entity.Id)
                  .then(function(response) {

                     //Condicional
                    if (response.data === "OK"){
                          //$scope.gridOptions1.data.splice(index, 1); Sirve para hacer el borrado desde la vista
                          alert("El parámetro se ha borrado exitosamente");
                          //Función que obtiene todas las aplicaciones
                          $http.get('http://127.0.0.1:8081/v1/parametro/?limit=0')
                            .then(function(response) {
                                $scope.gridOptions1.data = response.data;
                             });
                    }else{
                          alert("No se puede eliminar el parámetro");
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

          $http.put('http://127.0.0.1:8081/v1/parametro/'+ $scope.gridOptions1.Id, jsonActualizado)
          .then(function (response) {
              $scope.ServerResponse = response.data;
          })
      };

      /*Función para limpiar todos los campos del formulario con el botón "Cancelar"*/
      $scope.reset = function(form) {
          $scope.perfil = {};
          if (form) {
            form.$setPristine();          
            form.$setUntouched();

          }
        };

       
  });
