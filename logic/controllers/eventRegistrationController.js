angular.module('OGTicketsApp.controllers')
.controller('eventRegistrationController', ['$scope', function ($scope) {

	$scope.eventTypes=[
		{
			value: 'music',
			name: 'Música'
		},
		{
			value: 'drama',
			name: 'Teatro'
		},
		{
			value: 'culture',
			name: 'Cultura'
		},
		{
			value: 'sports',
			name: 'Deportes'
		},
		{
			value: 'art',
			name: 'Arte'
		},
	]

	$scope.singleEvent = {
		name: '',
		eventType: 'music',

	}


}]); //end -controller-