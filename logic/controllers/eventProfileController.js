angular.module('OGTicketsApp.controllers')
.controller('eventProfileController', ['$scope', 'eventService', 'transactionService', '$routeParams', 'siteService', '$locale', 'seatsService', '$location','userService',
    function ($scope, eventService, transactionService, $routeParams, siteService,  $locale, seatsService,$location,userService) {

        /*var globales: $scope.currentEvent: objeto eveto completo, $scope.eventSiteName: lugar del evento, */

        var eventId= $routeParams.eventId;
        $scope.currentUser= userService.getLoggedUser();

        /*display event*/
        // Sets on "currentEvent" the whole event by the id
        $scope.currentEvent = eventService.retrieveEvent(eventId);
        var eventSite= siteService.getEventSite(eventId);
        $scope.eventSiteName= eventSite.name;
        $scope.eventSiteId= eventSite.id;
        //noMap indica si el evento tiene un sitio con mapa o no
        $scope.noMap=false;
        //ocultar los paneles de compra hasta que el cliente vaya avanzando hacia esa seccion.
        $scope.inputPanel= false;
        $scope.showMap= false;
        $scope.buttons= false;
        $scope.resume= false;
        $scope.seatsDisplay= false;
        $scope.backSeats= false;
        $scope.seatsButtons= true;
        $scope.isPurchase= false;
        $scope.isReservation= false;
        $scope.hidePurchaseButton= false;

        //varifica el id del sitios para establacer si el sitio posee mapa de asientos o no.
        if( $scope.eventSiteId!=='si01' &&  $scope.eventSiteId!=='si02' &&  $scope.eventSiteId!=='si03' &&  $scope.eventSiteId!=='si04'){
            $scope.noMap= true;
        };

        //segun lo que corresponda abre las opciones para que el usuario haga la escogencia de los asientos.
        //params: noMap: indica si el sitio posee un mapa o no
        //usr: verifica que sea un usuario loggeado y que no se un cajero.
        $scope.displayPanel= function () {
            var usr= userService.getLoggedUser(); 
            $scope.alertMsg="";
            
            if(usr!==false && usr.userType!== "ut04" ){
                if($scope.noMap){
                    $scope.inputPanel= true;
                    $scope.buttons= true;
                    $scope.resume= true;
                    $scope.hidePurchaseButton= true;
                }else{
                    $scope.showMap= true;
                    $scope.hidePurchaseButton= true;
                }
            }else{
                if(usr.userType== "ut04"){
                    $scope.alertMsg= "Debe estar registrado como cliente para poder comprar boletos";
                    $scope.openModal('#alertModal');
                }else{
                    $scope.alertMsg= "Debe registrarse para poder comprar boletos";
                    $scope.openModal('#alertModal');
                }
            }
        };
         //abrir los modales.
        $scope.openModal= function (modalId) { 
            $(modalId).modal('show');
        };

        //inicializas las variables necesarias para el mapa de butacas.
        var reserved=[];
        var selected = [];

        //funcion que lleva haciel el servicio la localidad elegida por el usuario.
        /*params: zoneName, zoneId, rows, cols, site(teatro, auditorio, estadio, palacio), location(diteccion en la qie estan orientadas las butcas)*/
        $scope.ShowSiteSeats= function (zoneName, zoneId, rows, cols, site, location) {
            $scope.seatsDisplay= true;
            $scope.rows= seatsService.getRows(rows);
            $scope.cols= seatsService.getCols(cols);
            reserved= seatsService.getReserved(zoneId, site, eventId);
            $scope.showMap= false;

        };

        // seat onClick
        $scope.seatClicked = function(seatPos) {
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
            $scope.msg="No ha seleccionado ningún asiento";
            $scope.total="";
            $scope.clientSelectedSeats="";
            $scope.buttons= false;
            $scope.showPrice= false;
        };

        // resumen de la compra
        $scope.showSelected = function() {
            if(selected.length > 0) {
                $scope.resume= true;
                $scope.msg= "Usted tiene " + selected.length + " boletos seleccionados para el evento " + $scope.currentEvent.name + " en el " + $scope.eventSiteName+ ".";
                $scope.clientSelectedSeats= "Asientos seleccionados " + selected.join(', ')+".";
                $scope.total=(($scope.currentEvent.ticketsPrice) * selected.length) +".";
                $scope.showPrice= true;
                $scope.buttons= true;
                $scope.seatsButtons= false;
                $scope.backSeats= true;
                $scope.seatsDisplay= false;
               
            } else {
                $scope.msg="No ha seleccionado ningún asiento";
                $scope.total="";
                $scope.showPrice= false;
                $scope.buttons= false;
            }
        };

        $scope.backToSeats= function () {
            $scope.seatsButtons= true;
            $scope.backSeats= false;
            $scope.msg="No ha seleccionado ningún asiento";
            $scope.total="";
            $scope.clientSelectedSeats="";
            $scope.buttons= false;
            $scope.showPrice= false;
            $scope.seatsDisplay= true;
            $scope.resume= false;
        }

        $scope.back= function () {
            $scope.clearSelected();
            $scope.showMap= true;
            $scope.seatsDisplay= false;
            $scope.buttons= false;
        };

         //end of seats

        $scope.seatAmount="";

    
        $scope.showResume= function() {
            alert("si funiona");
            $scope.resume= true;



        };
        
        $scope.prueba= function () {
            eventService.prueba("natymata@gmail.com", "123").success(function(response){
                console.debug(response.user);
            }).error(function(data){
                console.debug("error");
            });
        };

        //Redirect to the event form to edit the event
        $scope.editEvent= function(){
            var eventId = $routeParams.eventId;
            $location.path('/event-profile-edit/'+eventId);
        };

        
        $scope.isOwner=false;
        if($scope.currentEvent.promoterId==$scope.currentUser.id){
            $scope.isOwner=true;
        };


        //purchase section

        // Credit Card Part
        // Obtains current date in order to validate credit card expiration date
        $scope.currentYear = new Date().getFullYear();
        $scope.currentMonth = new Date().getMonth() + 1;
        $scope.months = $locale.DATETIME_FORMATS.MONTH;
        $scope.ccinfo = {type:undefined};

        $scope.successfulPurchase= false;


        $scope.getTickets = function (){
            var purchaseCode= transactionService.generatePurchaseCode($scope.currentUser.id, $scope.currentEvent.id);

            $scope.purchaseInfo={
                code:purchaseCode,
                ticketAmount: selected.length,
                eventName:  $scope.currentEvent.name,
                place: $scope.eventSiteName,
                total: $scope.total,
                datetime: $scope.currentEvent.startHour,
                seats:selected.join(', ')+".",
                transactionType: "tt01"
            };

            /*{"id": "tr01", "cancelled": true, "transactionType": "tt01", "eventId": "ev02", "ticketsAmount" : 2, "idClient": "cl02", "active": true, "trCode":"pu-cl02-ev02-0329-tr01" }*/

            $scope.isPurchase= true;
            $scope.successfulPurchase= true;

  
           

            //dejar todo esto de ultimo
            // Saves credit card to database
            //transactionService.setCreditCard($scope.ccinfo);
        };

        $scope.ticketsNumber=null;
        //        4278567198765432


        


}]); //end -controller-