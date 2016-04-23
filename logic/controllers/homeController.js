angular.module('OGTicketsApp.controllers')
.controller('homeController', ['$scope', 'eventService', '$location', function ($scope, eventService, $location) {
	//obtener la lista de categorias: array que contiene el id y el nombre de la categoria.
	$scope.categories= eventService.getEventTypeList();

	$scope.viewCategory= function (categoryId) {
		$location.path('/category/' + categoryId);
	};

	$scope.eventsList= [];
	$scope.eventTypesList= [];



	eventService.activeEvents()
		.then(function(data) {
			$scope.eventsList= data.data;		
		})
		.catch(function(error) {
			console.error(error);
		});


	eventService.todayEvents()
		.then(function(data) {
			$scope.todayEvents= data.data;		
		})
		.catch(function(error) {
			console.error(error);
		});

	eventService.getEventTypeList()
		.then(function(data) {
			$scope.eventTypesList= data.data;		
		})
		.catch(function(error) {
			console.error(error);
		});




	





 
}]); //end -controller-