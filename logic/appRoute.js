 angular.module("OGTicketsApp", ['ngRoute', 'ngAnimate', 'ngResource', 'ngCookies', 'OGTicketsApp.controllers', 'OGTicketsApp.services', 'OGTicketsApp.directives', 'OGTicketsApp.filters'])

    //definir las constante de los tipos de usuarios.
    .constant('ROLES', {
        ADMIN: {
            ROL:1,
        },
        CLIENT: {
            ROL:2
        },
        PROMOTER: {
            ROL:3
        },
        CASHIER: {
            ROL:4
        },
        GUEST:{
            ROL:5
        }
    })
    //definir las rutas
    .config(['$routeProvider', 'ROLES', function($routeProvider, ROLES) {
        $routeProvider
            .when('/home', {
                templateUrl: 'html/home.html',
                controller: 'homeController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.CLIENT.ROL, ROLES.PROMOTER.ROL, ROLES.CASHIER.ROL, ROLES.GUEST.ROL]
                }
                //home page, permisos: cualquier usuario
            }) 
            .when('/category/:categoryId', {
                templateUrl: 'html/allEvents.html',
                controller: 'allEventsController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.CLIENT.ROL, ROLES.PROMOTER.ROL, ROLES.CASHIER.ROL, ROLES.GUEST.ROL]
                }
                //eventos por categoria seleccionada, cualquier usuario.
            })
            .when('/all-events', {
                templateUrl: 'html/allEvents.html',
                controller: 'allEventsController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.CLIENT.ROL, ROLES.PROMOTER.ROL, ROLES.CASHIER.ROL, ROLES.GUEST.ROL]
                }
                //lista cliente de todos los eventos activos, cualquier usuario
            })
            .when('/event-profile/:eventId', {
                templateUrl: 'html/eventProfile.html',
                controller: 'eventProfileController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.CLIENT.ROL, ROLES.PROMOTER.ROL, ROLES.CASHIER.ROL, ROLES.GUEST.ROL]
                }
                //Perfil de un evento. Cualquier usuario puede ver los perfiles pero solo usuarios registrado pueden acceder al paso de compra y solo los promotores propietarios del evento y el admin podrán editarlo.
            })
            .when('/event-profile-edit/:eventId', {
                templateUrl: 'html/eventRegistrationForm.html',
                controller: 'eventRegistrationController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.PROMOTER.ROL]
                } 
                //Edición de un evento. Permisos: admin, promotor propietario del evento
            })
            .when('/event-registration', {
                templateUrl: 'html/eventRegistrationForm.html',
                controller: 'eventRegistrationController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.PROMOTER.ROL]
                }
                //Registro de un evento. Permisos: promotor, admin
            })
            .when('/all-events-admin', {
                templateUrl: 'html/genList.html',
                controller: 'allEventsAdminController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Listado de todos los evento, tanto activos como inactivos. Permisos: Admin.
            })
            .when('/all-users', {
                templateUrl: 'html/usersList.html',
                controller: 'allUsersController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Lista con todos los usuario por tipos y la posibilidad de inactivarlos. Permisos: admin
            })
            .when('/client-profile/:clientId', {
                templateUrl: 'html/clientProfile.html',
                controller: 'clientProfileController',
                data: {
                    authorized: [ROLES.CLIENT.ROL]
                }
                //perfil del cliente loggeado. Permisos: Cliente propietario de la cuenta.
            })
            .when('/client-profile-edit/:clientId', {
                templateUrl: 'html/clientSignupForm.html',
                controller: 'clientSignupController',
                data: {
                    authorized: [ROLES.CLIENT.ROL]
                }
                //editar la cuenta de un cliente. /Permisos: cliente propietario de la cuenta.
            })
            .when('/user-signup', {
                templateUrl: 'html/clientSignupForm.html',
                controller: 'clientSignupController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.GUEST.ROL]
                }
                //registro de un usuario nuevo se cae siempre al formulario de registro de cliente y de ahi se escigen las opciones, segun la opcion que se seleccione se redirira a los formularios de promotor o de cajero
            })
            .when('/promoter-profile/:promoterId', {
                templateUrl: 'html/promoterProfile.html',
                controller: 'promoterProfileController',
                data: {
                    authorized: [ROLES.PROMOTER.ROL]
                }
                //perfil del promotor. Permisos: promotor propietario de la cuenta.
            })
            .when('/promoter-profile-edit/:promotorId', {
                templateUrl: 'html/promotorSignupForm.html',
                controller: 'promotorSignupController',
                data: {
                    authorized: [ROLES.PROMOTER.ROL]
                }
                //editar perfil de un promotor. Permisos: promotor propietario de la cuenta.
            })
            .when('/promotor-signup/:requestId', {
                templateUrl: 'html/promotorSignupForm.html',
                controller: 'promotorSignupController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Revisar/(aceptar-denegar) solicitud de registro de promotr. Admin
            })
            .when('/promotor-signup-request', {
                templateUrl: 'html/promotorSignupForm.html',
                controller: 'promotorSignupController',
                data: {
                    authorized: [ROLES.GUEST.ROL]
                }
                //solicitar registro como promotor.
            })
            .when('/cashier-signup', {
                templateUrl: 'html/cashierSignupForm.html',
                controller: 'cashierSignupController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //registro de Cajeros y Promotores. Permisos: Admin
            })
            .when('/cashier-edit/:cashierId', {
                templateUrl: 'html/cashierSignupForm.html',
                controller: 'cashierEditController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                ////Editar cajeros. Permisos: Admin
            })
            .when('/redeem-tickets', {
                templateUrl: 'html/redeemTickets.html',
                controller: 'redeemTicketsController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.CASHIER.ROL]
                }
                //Forulario para redimir tiquetes. permisos: Cajeros.
            })
            .when('/all-sites', {
                templateUrl: 'html/genList.html',
                controller: 'allSitesController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.PROMOTER.ROL]
                }
                //Ver una lista de todos los sitios disponibles. Permisos: promotores, admin
            })
            .when('/site-profile/:siteId', {
                templateUrl: 'html/siteProfile.html',
                controller: 'siteProfileController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.PROMOTER.ROL]
                }
                //Ver el perfil de un sitio. Permisos: Promotres, admin: Solo el admin tendrá disponible la opción de editar un sitio.
            })
            .when('/site-profile-edit/:siteId', {
                templateUrl: 'html/siteRegistrationForm.html',
                controller: 'siteRegistrationController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Edtar el perfil e un sitio. Permisos: Admin
            })
            .when('/site-registration', {
                templateUrl: 'html/siteRegistrationForm.html',
                controller: 'siteRegistrationController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Registrar un sitio. Permisos: Admin
            })
            .when('/all-event-types', {
                templateUrl: 'html/genList.html',
                controller: 'allEventTypesController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.PROMOTER.ROL]
                }
                //Lista con todos los tipos de evento. Permisos: Promotores, Admin.
            })
            .when('/event-type-profile/:eventTypeId', {
                templateUrl: 'html/eventTypeProfile.html',
                controller: 'eventTypeController',
                data: {
                    authorized: [ROLES.ADMIN.ROL, ROLES.PROMOTER.ROL]
                }
                //Perfil de un tipo de evento.Promotores, Admin: Solo el admin tendrá habilitada la opcion de editar un tipo de evento. 
            })
            .when('/event-type-profile-edit/:eventTypeId', {
                templateUrl: 'html/eventTypeRegistrationForm.html',
                controller: 'eventTypeRegistrationController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Editar el perfil de un tipo de evento. Permisos: admin.
            })
            .when('/event-type-registration', {
                templateUrl: 'html/eventTypeRegistrationForm.html',
                controller: 'eventTypeRegistrationController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Registro de un tipo de evento. Permisos: admin
            })
            .when('/admin', {
                templateUrl: 'html/admin.html',
                controller: 'adminController',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //Perfil del admin. Permisos: admin
            })
            .when('/promoter-request', {
                templateUrl: 'html/genList.html',
                controller: 'promoterRequest',
                data: {
                    authorized: [ROLES.ADMIN.ROL]
                }
                //lista con todas las solicitudes activas de promotro, solo admin.
            })
            .otherwise({redirectTo: '/home'});
    }])

    .run(['$rootScope', '$location', 'userService', 'ROLES', function($rootScope, $location, userService, ROLES) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
            //buscar si hay usuario loggeado, devuelve falso si no hay usuario loggedo o el objeto usuario si lo hay.
            var user= userService.getLoggedUser();
            //definir el tipo de usuario
            var userType;
            if(user==false){
                userType=5;
            }else{
                if(user.userType == "ut01"){
                    userType= 1;
                }else if(user.userType == "ut02"){
                     userType= 2;
                }else if(user.userType == "ut03"){
                    userType= 3;
                }else if(user.userType == "ut04"){
                     userType= 4;
                }else{
                    userType= 5;
                }
            };

            //definir los permisos
            var index= next.data.authorized.indexOf(userType);
            if(index==-1){
                $location.path('/home');
            }
        })
    }]);


angular.module('OGTicketsApp.controllers', []);
angular.module('OGTicketsApp.services', []);
angular.module('OGTicketsApp.filters', []);
angular.module('OGTicketsApp.directives', []);
