angular.module('OGTicketsApp.controllers')
.controller('homeController', ['$scope', 'eventService', '$location', function ($scope, eventService, $location) {
	//obtener la lista de categorias: array que contiene el id y el nombre de la categoria.
	$scope.categories= eventService.getEventTypeList();

	$scope.viewCategory= function (categoryId) {
		$location.path('/category/' + categoryId);
	};

	$scope.eventsList= eventService.activeEvents();

	$scope.todayEvents= eventService.todayEvents();
 
}]); //end -controller-