 angular.module("OGTicketsApp", ['ngRoute', 'ngAnimate', 'ngResource', 'ngCookies', 'OGTicketsApp.controllers', 'OGTicketsApp.services', 'OGTicketsApp.directives', 'OGTicketsApp.filters'])

    .run(function($rootScope, $location, $cookieStore) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
          
        //evaluamos en el primer if si hay usuario conectado o no, y segun la ruta a la que se diriga le damos permiso o no.
        if ($cookieStore.get('isConnected') == false || $cookieStore.get('isConnected') == null) {

            //sitio de editar los eventos solo admin y promotor dueño del evento
            if(next.controller== 'eventProfileController' && next.templateUrl== 'html/eventRegistrationForm.html'){
                $location.path('/home');
            };
            //Registro de un evento, solo admin y promotores
            if(next.controller== 'eventRegistrationController' && next.templateUrl== 'html/eventRegistrationForm.html'){
                $location.path('/home');
            };
            //Listado de todos los evento, tanto activos como inactivos, solo admin.
            if(next.controller== 'allEventsAdminController'){
                $location.path('/home');
            };
            //Lista con todos los usuarios y la posibilidad de inactivarlos. Solo admin
            if(next.controller=='allUsersController'){
                $location.path('/home');
            };
            //perfil del cliente loggeado. Permisos: Cliente propietario de la cuenta.
            if(next.controller== 'clientProfileController' && next.templateUrl== 'html/clientProfile.html'){
                $location.path('/home');
            };
            //editar la cuenta de un cliente. /Permisos: cliente propietario de la cuenta.
            if(next.controller== 'clientProfileController' && next.templateUrl== 'html/clientSignupForm.html'){
                $location.path('/home');
            };
            //perfil del promotor. Permisos: promotor propietario de la cuenta.
            if(next.controller== 'promoterProfileController' && next.templateUrl== 'html/promoterProfile.html'){
                $location.path('/home');
            };
            //editar perfil de un promotor. Permisos: promotor propietario de la cuenta.
            if(next.controller== 'promoterProfileController' && next.templateUrl== 'html/promotorSignupForm.html'){
                $location.path('/home');
            };
            //registro de Cajeros. Permisos: Admin
            if(next.controller== 'cashierSignupController' && next.templateUrl== 'html/cashierSignupForm.html'){
                $location.path('/home');
            };
            //Editar Cajeros. Permisos: Admin
            if(next.controller== 'cashierEditController' && next.templateUrl== 'html/cashierSignupForm.html'){
                $location.path('/home');
            };
            //Formulario para redimir tiquetes. permisos: Cajeros y admin
            if(next.controller== 'redeemTicketsController'){
                $location.path('/home');
            };
            //Ver una lista de todos los sitios disponibles. Permisos: promotores, admin
            if(next.controller== 'allSitesController'){
                $location.path('/home');
            };
            //Ver el perfil de un sitio. Permisos: Promotres, admin
            if(next.controller== 'siteProfileController' && next.templateUrl== 'html/siteProfile.html'){
                $location.path('/home');
            };
            //Edtar el perfil e un sitio. Permisos: Admin
            if(next.controller== 'siteProfileController' && next.templateUrl== 'html/siteRegistrationForm.html'){
                $location.path('/home');
            };
            //Registrar un sitio. Permisos: Admin
            if(next.controller== 'siteRegistrationController' && next.templateUrl== 'html/siteRegistrationForm.html'){
                $location.path('/home');
            };
            //Lista con todos los tipos de evento. Permisos: Promotores, Admin.
            if(next.controller== 'allEventTypesController' ){
                $location.path('/home');
            };
            //Perfil de un tipo de evento.Promotores, Admin
            if(next.controller== 'eventTypeController' && next.templateUrl== 'html/eventTypeProfile.html'){
                $location.path('/home');
            };
            //Editar el perfil de un tipo de evento. Permisos: admin.
            if(next.controller== 'eventTypeController' && next.templateUrl== 'html/eventTypeRegistrationForm.html'){
                $location.path('/home');
            };
            //Registro de un tipo de evento. Permisos: admin
            if(next.controller== 'eventTypeRegistrationController' && next.templateUrl== 'html/eventTypeRegistrationForm.html'){
                $location.path('/home');
            };
            //pefil del admin solo admin
            if(next.controller== 'adminController' ){
                $location.path('/home');
            };
            //lista con todas las solicitudes activas de promotro, solo admin.
            if(next.controller== 'promoterRequest' && next.templateUrl== 'html/genList.html'){
                $location.path('/home');
            };



            // //
            // if(next.controller==  ){
            //     $location.path('/home');
            // };

            // //
            // if(next.controller==  && next.templateUrl==){
            //     $location.path('/home');
            // };


            // ejemplo
            // if(next.controller == 'allUsersController' || next.controller == 'allEventsAdminController' ) {
            //   $location.path('/home');
            // }
        }
        else {
            var loggedUser = $cookieStore.get('loggedUser');

            // if(next.templateUrl == 'html/inicio.html' || usuario.puesto != 1) {
            //   $location.path('/tareas');
            // }
        };//aqui termina el else


        })
      })

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'html/home.html',
                controller: 'homeController'
                //home page, permisos: cualquier usuario
            }) 
            .when('/category/:categoryId', {
                templateUrl: 'html/allEvents.html',
                controller: 'allEventsController'
                //eventos por categoria seleccionada, cualquier usuario.
            })
            .when('/all-events', {
                templateUrl: 'html/allEvents.html',
                controller: 'allEventsController'
                //lista cliente de todos los eventos activos, cualquier usuario
            })
            .when('/event-profile/:eventId', {
                templateUrl: 'html/eventProfile.html',
                controller: 'eventProfileController'
                //Perfil de un evento. Cualquier usuario puede ver los perfiles pero solo usuarios registrado pueden acceder al paso de compra y solo los promotores propietarios del evento y el admin podrán editarlo.
            })
            .when('/event-profile-edit/:eventId', {
                templateUrl: 'html/eventRegistrationForm.html',
                controller: 'eventProfileController'
                //Edición de un evento. Permisos: admin, promotor propietario del evento
            })
            .when('/event-registration', {
                templateUrl: 'html/eventRegistrationForm.html',
                controller: 'eventRegistrationController'
                //Registro de un evento. Permisos: promotor, admin
            })
            .when('/all-events-admin', {
                templateUrl: 'html/genList.html',
                controller: 'allEventsAdminController'
                //Listado de todos los evento, tanto activos como inactivos. Permisos: Admin.
            })
            .when('/all-users', {
                templateUrl: 'html/usersList.html',
                controller: 'allUsersController'
                //Lista con todos los usuario por tipos y la posibilidad de inactivarlos. Permisos: admin
            })
            .when('/client-profile/:clientId', {
                templateUrl: 'html/clientProfile.html',
                controller: 'clientProfileController'
                //perfil del cliente loggeado. Permisos: Cliente propietario de la cuenta.
            })
            .when('/client-profile-edit/:clientId', {
                templateUrl: 'html/clientSignupForm.html',
                controller: 'clientProfileController'
                //editar la cuenta de un cliente. /Permisos: cliente propietario de la cuenta.
            })
            .when('/user-signup', {
                templateUrl: 'html/clientSignupForm.html',
                controller: 'clientSignupController'
                //registro de un usuario nuevo se cae siempre al formulario de registro de cliente y de ahi se escigen las opciones, segun la opcion que se seleccione se redirira a los formularios de promotor o de cajero
            })
            .when('/promoter-profile/:promoterId', {
                templateUrl: 'html/promoterProfile.html',
                controller: 'promoterProfileController'
                //perfil del promotor. Permisos: promotor propietario de la cuenta.
            })
            .when('/promoter-profile-edit/:promoterId', {
                templateUrl: 'html/promotorSignupForm.html',
                controller: 'promoterProfileController'
                //editar perfil de un promotor. Permisos: promotor propietario de la cuenta.
            })
            .when('/promotor-signup', {
                templateUrl: 'html/promotorSignupForm.html',
                controller: 'promotorSignupController'
                //registro de Cajeros y Promotores. Permisos: Admin
            })
            .when('/cashier-signup', {
                templateUrl: 'html/cashierSignupForm.html',
                controller: 'cashierSignupController'
                //registro de Cajeros y Promotores. Permisos: Admin
            })
            .when('/cashier-edit/:cashierId', {
                templateUrl: 'html/cashierSignupForm.html',
                controller: 'cashierEditController'
                ////Editar cajeros. Permisos: Admin
            })
            .when('/redeem-tickets', {
                templateUrl: 'html/redeemTickets.html',
                controller: 'redeemTicketsController'
                //Forulario para redimir tiquetes. permisos: Cajeros.
            })
            .when('/all-sites', {
                templateUrl: 'html/genList.html',
                controller: 'allSitesController'
                //Ver una lista de todos los sitios disponibles. Permisos: promotores, admin
            })
            .when('/site-profile/:siteId', {
                templateUrl: 'html/siteProfile.html',
                controller: 'siteProfileController'
                //Ver el perfil de un sitio. Permisos: Promotres, admin: Solo el admin tendrá disponible la opción de editar un sitio.
            })
            .when('/site-profile-edit/:siteId', {
                templateUrl: 'html/siteRegistrationForm.html',
                controller: 'siteProfileController'
                //Edtar el perfil e un sitio. Permisos: Admin
            })
            .when('/site-registration', {
                templateUrl: 'html/siteRegistrationForm.html',
                controller: 'siteRegistrationController'
                //Registrar un sitio. Permisos: Admin
            })
            .when('/all-event-types', {
                templateUrl: 'html/genList.html',
                controller: 'allEventTypesController'
                //Lista con todos los tipos de evento. Permisos: Promotores, Admin.
            })
            .when('/event-type-profile/:eventTypeId', {
                templateUrl: 'html/eventTypeProfile.html',
                controller: 'eventTypeController'
                //Perfil de un tipo de evento.Promotores, Admin: Solo el admin tendrá habilitada la opcion de editar un tipo de evento. 
            })
            .when('/event-type-profile-edit/:eventTypeId', {
                templateUrl: 'html/eventTypeRegistrationForm.html',
                controller: 'eventTypeController'
                //Editar el perfil de un tipo de evento. Permisos: admin.
            })
            .when('/event-type-registration', {
                templateUrl: 'html/eventTypeRegistrationForm.html',
                controller: 'eventTypeRegistrationController'
                //Registro de un tipo de evento. Permisos: admin
            })
            .when('/admin', {
                templateUrl: 'html/admin.html',
                controller: 'adminController'
                //Perfil del admin. Permisos: admin
            })
            .when('/promoter-request', {
                templateUrl: 'html/genList.html',
                controller: 'promoterRequest'
                //lista con todas las solicitudes activas de promotro, solo admin.
            })
            .otherwise({redirectTo: '/home'});
}]);

angular.module('OGTicketsApp.controllers', []);
angular.module('OGTicketsApp.services', []);
angular.module('OGTicketsApp.filters', []);
angular.module('OGTicketsApp.directives', []);




        






