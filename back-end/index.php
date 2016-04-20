<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

/**
 * index.php
 * Inicia la aplicación y sirve como enrutador para el back-end.
 */

require "bootstrap.php";

use Slim\Http\Request;
use Slim\Http\Response;

// Muestra todos los errores
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];

$contenedor = new \Slim\Container($configuration);

// Crea una nueva instancia de SLIM 
$app = new \Slim\App($contenedor);

// Definimos nuestras rutas

/*RUTAS DE USUARIO*/
/*user/login->logear el usuario*/
$app->post(
    '/user/login',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */

        // Pedimos una instancia del controlador del usuario
        $userController = new App\Controllers\UserController();

        // Almacenamos el resultado de la operación en la siguiente variable
        $result = $userController->login($request);

        // Retornamos un JSON con el resultado al Front-End
        return $response->withJson($result);
    }
);
/*user/logout->deslogear el usuario*/
$app->get(
    '/user/logout',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */
        $userController = new App\Controllers\UserController();
        $result = $userController->logout($request);
        return $response->withJson($result);
    }
);

/*user/registerUser->registar una cuent usuario*/
$app->post(
    '/user/registerUser',
    function ($request, $response) {
        /** @var Request $request */
        /** @var Response $response */
        $userController = new App\Controllers\UserController();
        $result = $userController->registerUser($request);
        return $response->withJson($result);
    }
);

/*RUTAS DE CLIENTE*/
///client/validateClientInfo-> validar los datos del cliente
$app->post(
    '/client/validateClientInfo',
    function ($request, $response){
        /** @var Request $request */
        /** @var Response $response */
        $clientController = new App\Controllers\ClientController();
        $result = $clientController->validateClientInfo($request);
        return $response->withJson($result);
    }
);

///client/registerClient->registrar los datos del cliente en la tabla cliente.
$app->post(
    '/client/registerClient/{id}',
    function($request, $response){
        /** @var Request $request */
        /** @var Response $response */
        $clientController= new App\Controllers\ClientController();
        $result= $clientController->registerClient($request);
        return $response->withJson($result);
    }
);

/*RUTAS DE CAJERO*/
//cashier/validateCahierInfo
$app->post(
    '/cashier/validateCahierInfo',
    function ($request, $response){
        /** @var Request $request */
        /** @var Response $response */
        $cashierController = new App\Controllers\CashierController();
        $result = $cashierController->validateCahierInfo($request);
        return $response->withJson($result);
    }
);

$app->post(
    '/cashier/registerCashier/{id}',
    function($request, $response){
        /** @var Request $request */
        /** @var Response $response */
        $cashierController= new App\Controllers\CashierController();
        $result= $cashierController->registerCashier($request);
        return $response->withJson($result);
    }
);



/*RUTAS DE PROMOTOR*/
//promoter/registerRequest
$app->post(
    '/promoter/registerRequest',
    function($request, $response){
        /** @var Request $request */
        /** @var Response $response */
        $promoterController= new App\Controllers\PromoterController();
        $result= $promoterController->registerRequest($request);
        return $response->withJson($result);
    }
);

$app->get(
    '/promoter/getAllRequest',
    function($request, $response){
        /** @var Request $request */
        /** @var Response $response */
        $promoterController= new App\Controllers\PromoterController();
        $result= $promoterController->getAllRequest($request);
        return $response->withJson($result);
    }
);



// Corremos la aplicación.
$app->run();











/* Machote para crear las rutas INDEX.
$app->METODO(
    '/MODULO/FUNCION',
    function ($request, $response) {
        //@var Request $request
        //@var Response $response
        $CONTROLLERNAME = new App\Controllers\CONTROLLERNAME();
        $result = $CONTROLLERNAME->FUNCION($request);
        return $response->withJson($result);
    }
);
*/