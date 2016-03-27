angular.module("OGTicketsApp", ['ngRoute', 'ngAnimate', 'ngResource', 'ngCookies', 'OGTicketsApp.controllers'])
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
                //registro de Cajeros y Promotores. Permisos: Admin
            })
            .when('/redeem-tickets/:cashierId', {
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
            .otherwise({redirectTo: '/home'});
}]);

angular.module('OGTicketsApp.controllers', []);




        






