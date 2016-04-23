angular.module('OGTicketsApp.controllers')
.controller('eventProfileController', ['$scope', 'eventService', 'transactionService', '$routeParams', 'siteService', '$locale', 'seatsService', '$location','userService',
    function ($scope, eventService, transactionService, $routeParams, siteService,  $locale, seatsService,$location,userService) {

        /*var globales: $scope.currentEvent: objeto eveto completo, $scope.eventSiteName: lugar del evento, */

        var eventId= $routeParams.eventId;
        $scope.currentUser= userService.getLoggedUser();

        /*display event*/
        $scope.currentEvent = {}; 
        $scope.eventSiteId =null;
        $scope.eventSiteName= null;
        //haveMap indica si el evento tiene un sitio con mapa o no
        $scope.haveMap=null;
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

        var sectionId = '',
        purchaseCode = '',
        reservationCode = '';
        $scope.objTransaction = {};

        eventService.getEventById(eventId)
        .then(function(data) {
            var event= data.data[0];
            $scope.currentEvent= event;
            $scope.eventSiteId = event.siteId;
            $scope.eventSiteName= event.siteName;

            //varifica el id del sitios para establacer si el sitio posee mapa de asientos o no.
            if( $scope.eventSiteId!=='si01' &&  $scope.eventSiteId!=='si02' &&  $scope.eventSiteId!=='si03' &&  $scope.eventSiteId!=='si04'){
                $scope.haveMap= true;
            };
        })
        .catch(function(error) {
            console.error(error);
        })



        //segun lo que corresponda abre las opciones para que el usuario haga la escogencia de los asientos.
        //params: haveMap: indica si el sitio posee un mapa o no
        //usr: verifica que sea un usuario loggeado y que no se un cajero.
        $scope.displayPanel= function () {
            var usr= userService.getLoggedUser(); 
            $scope.alertMsg="";
            
            if(usr!==false && usr.userType== "ut02" ){
                
                if($scope.haveMap){
                    $scope.inputPanel= true;
                    $scope.buttons= true;
                    $scope.resume= true;
                    $scope.hidePurchaseButton= true;
                }else{
                    $scope.showMap= true;
                    $scope.hidePurchaseButton= true;
                }
            }else{
                if(usr.userType== "ut04" || usr.userType== "ut01" || usr.userType== "ut03"){
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

            sectionId = zoneId;

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
            var ticketAmount, total, seats;
            purchaseCode= transactionService.generatePurchaseCode($scope.currentUser.userId, $scope.currentEvent.id);

            if(selected.length){
                ticketAmount = selected.length;
                total = $scope.total
                seats = selected.join(', ')+".";
            }else{
                ticketAmount = $scope.seatsAmount;
                total = $scope.currentEvent.ticketsPrice * ticketAmount;
                seats = 'No hay asientos numerados.';
            }

            $scope.purchaseInfo={
                code:purchaseCode,
                ticketAmount: ticketAmount,
                eventName:  $scope.currentEvent.name,
                place: $scope.eventSiteName,
                total: total,
                datetime: $scope.currentEvent.startHour,
                seats:selected.join(', ')+".",
                transactionType: "tt01"
            };

            $scope.isPurchase= true;
            $scope.successfulPurchase= true;

            setFinalTransaction();
        };

        $scope.getReservation = function(){
            var ticketAmount, total, seats;
            reservationCode = transactionService.generateReservationCode($scope.currentUser.userId, $scope.currentEvent.id);

            if(selected.length){
                ticketAmount = selected.length;
                total = $scope.total;
                seats = selected.join(', ')+".";
            }else{
                ticketAmount = $scope.seatsAmount;
                total = $scope.currentEvent.ticketsPrice * ticketAmount;
                seats = 'No hay asientos numerados.';
            };

            $scope.reservationInfo={
                code:reservationCode,
                ticketAmount: ticketAmount,
                eventName:  $scope.currentEvent.name,
                place: $scope.eventSiteName,
                total: total,
                datetime: $scope.currentEvent.startHour,
                seats:seats,
                transactionType: "tt02"

            };

            setFinalTransaction();
        }


        var setFinalTransaction = function (){
            if ($scope.isPurchase) {
                var transactionType = 1, transactionCode = purchaseCode;
            }else{
                var transactionType = 2, transactionCode = reservationCode;
            };

            if(selected.length){
                var siteType = 1,
                seatsAmount = selected.length;
            }else{
                var siteType = 2,
                seatsAmount = $scope.seatsAmount;
            }

            $scope.objTransaction = {
                transactionType: transactionType,
                siteType: siteType,
                eventId: eventId,
                siteId: $scope.eventSiteId,
                userId: $scope.currentUser.userId,
                sectionId: sectionId,
                seatsList: selected,
                seatsAmount: seatsAmount,
                transactionCode: transactionCode

            };

            transactionService.setTransaction($scope.objTransaction);
        };



}]); //end -controller-