angular.module('OGTicketsApp.controllers')
.controller('eventProfileController', ['$scope', 'eventService', 'transactionService', '$routeParams', 'siteService', '$locale', 'seatsService',
    function ($scope, eventService, transactionService, $routeParams, siteService,  $locale, seatsService) {

        var eventId= $routeParams.eventId;

        // Sets on "currentEvent" the whole event by the id
        $scope.currentEvent = eventService.retrieveEvent(eventId);
        var eventSite= siteService.getEventSite(eventId);
        $scope.eventSiteName= eventSite.name;
        $scope.eventSiteId= eventSite.id;
        //noMap indica si el evento tiene un sitio con mapa o no
        $scope.noMap=false;

        $scope.inputPanel= false;
        $scope.showMap= false;
        $scope.buttons= false;
        $scope.resume= false;
        $scope.seatsDisplay= true; //esto cambiarlo a false y ponerlo en true en la vara de 

        if( $scope.eventSiteId!=='si01' &&  $scope.eventSiteId!=='si02' &&  $scope.eventSiteId!=='si03' &&  $scope.eventSiteId!=='si04'){
            $scope.noMap= true;
        };

        //segun lo que corresponda abre las opciones para que el usuario haga la escogencia de los asientos.
        //params: noMap: indica si el sitio posee un mapa o no
        $scope.displayPanel= function () {
            if($scope.noMap){
                $scope.inputPanel= true;
                $scope.buttons= true;
                $scope.resume= true;
            }else{
                $scope.showMap= true;
            }
        };

        var reserved=[];
        var selected = [];

        //funcion que lleva haciel el servicio la localidad elegida por el usuario.
        /*params: zoneName, zoneId, rows, cols, site(teatro, auditorio, estadio, palacio), location(diteccion en la qie estan orientadas las butcas)*/
        $scope.ShowSiteSeats= function (zoneName, zoneId, rows, cols, site, location) {
            console.log("zoneName:" + zoneName + " zoneId " + zoneId +  " rows: " + rows + " cols: " + cols + " location: " + location);
            //$scope.seatsDisplay= true
            $scope.rows= seatsService.getRows(rows);
            $scope.cols= seatsService.getCols(cols);
            reserved= seatsService.getReserved(zoneId, site, eventId);
            console.log(reserved);
            
        };

       

       


        

        // seat onClick
        $scope.seatClicked = function(seatPos) {
            console.log("Selected Seat: " + seatPos);
            var index = selected.indexOf(seatPos);
            if(index != -1) {
                // seat already selected, remove
                selected.splice(index, 1)
            } else {
                // new seat, push
                selected.push(seatPos);
            }
        };

        // get seat status
        $scope.getStatus = function(seatPos) {
            if(reserved.indexOf(seatPos) > -1) {
                return 'reserved';
            } else if(selected.indexOf(seatPos) > -1) {
                return 'selected';
            }
        };

        // clear selected
        $scope.clearSelected = function() {
            selected = [];
        };

        // show selected, esto hay que cambiarlo
        $scope.showSelected = function() {
            if(selected.length > 0) {
                alert("Selected Seats: \n" + selected);
            } else {
                alert("No seats selected!");
            }
        };
        //end of seats




        // Credit Card Part

        // Obtains current date in order to validate credit card expiration date
        $scope.currentYear = new Date().getFullYear()
        $scope.currentMonth = new Date().getMonth() + 1
        $scope.months = $locale.DATETIME_FORMATS.MONTH
        $scope.ccinfo = {type:undefined}
        
        $scope.paymentFormRegister = function (){
            // Saves credit card to database
            transactionService.setCreditCard($scope.ccinfo);
        };



}]); //end -controller-