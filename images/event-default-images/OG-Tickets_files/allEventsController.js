angular.module('OGTicketsApp.controllers')
.controller('allEventsController', ['$scope', 'eventService','$routeParams', function ($scope, eventService, $routeParams) {
	/*displat events, serch bar*/
	$scope.eventsList;
	$scope.categoryId= $routeParams.categoryId;
	$scope.hideCatTitle==null;
	
	if($scope.categoryId==undefined){
		$scope.eventsList= eventService.activeEvents();
		$scope.hideCatTitle=true;
	}else{
		$scope.eventsList= eventService.eventsByType($scope.categoryId);
		$scope.hideCatTitle=false;
		var category= eventService.getEventType($scope.categoryId);
		$scope.categoryName= category.name;
	};

}]); //end -controller-
