angular.module('OGTicketsApp.controllers')
.controller('allEventsController', ['$scope', 'eventService','$routeParams', function ($scope, eventService, $routeParams) {
	/*displat events, serch bar*/

	var eventTypeId = $routeParams.categoryId;

	$scope.init = function (){
		//eventsByType();
		//getEventType();
		//getActiveEvents();
		//
		var categoryId = $routeParams.categoryId;
		isCategory(categoryId);
		eventsByType();
	}


	var isCategory= function(categoryId) {
		if(categoryId){
			eventsByType(categoryId);
		}else{
			getActiveEvents();
		}
	}


	var getActiveEvents = function (){
		var promise = eventService.activeEvents();
		promise.then(function(data) {

			if($scope.categoryId==undefined){
				$scope.eventsList= data.data
				$scope.hideCatTitle=true;
			}else{
				$scope.eventsList= eventListByType;
				$scope.hideCatTitle=false;
				$scope.categoryName= category.name;
			};

		})
		.catch(function(error) {
			console.log(error);
		})
	};

	var eventsByType = function (categoryId){
		var promise = eventService.eventsByType($scope.categoryId);
		promise.then(function(data) {
			var eventListByType = data.data
			if($scope.categoryId){
				$scope.hideCatTitle=true;
			}else{
				$scope.eventsListByType = eventListByType;
				$scope.hideCatTitle=false;
			};
		})
		.catch(function(error) {
			console.log(error);
		})
		// promise.then(function(data){
		// 	var eventListByType = data.data;
		// })
		// .catch(function(error){
		// 	console.log(error);
		// })
	};

	var getEventType = function (){
		var promise = eventService.getEventType($scope.categoryId);
		// promise.then(function (data){
		// 	var category = data.data;
		// })
		// .catch(function(error){
		// 	console.log(error);
		// })
	};

	$scope.init();

}]); //end -controller-
