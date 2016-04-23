angular.module('OGTicketsApp.controllers')
.controller('eventTypeController', ['$scope','$routeParams', 'eventTypeService','$location', function ($scope, $routeParams, eventTypeService,$location) {
	
	var eventTypeId = $routeParams.eventTypeId;

	var promise=eventTypeService.getEventTypeById(eventTypeId);
	promise.then(function(data) {
		$scope.currentEventType= data.data[0];
	})
	.catch(function(error) {
		console.error(error);
	});

	// Sets on "currentEventType" the whole event by the id
    $scope.currentEventType = eventTypeService.retrieveEventType(eventTypeId);

    //Envia al administrador al formulario de editar tipo de evento
	$scope.editTypeEvent= function(){
        var eventTypeId = $routeParams.eventTypeId;
        $location.path('/event-type-profile-edit/'+eventTypeId);
    };

}]); //end -controller-