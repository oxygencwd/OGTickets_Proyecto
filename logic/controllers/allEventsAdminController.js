angular.module('OGTicketsApp.controllers')
.controller('allEventsAdminController', ['$scope', '$location', function ($scope, $location) {

$scope.url = $location.url();
$scope.allEventsAdmin = '/all-events-admin';


}]); //end -controller-