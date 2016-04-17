<?php


namespace App\Controllers;

use App\Services\LoggingService;
use App\Services\UserService;
use Slim\Http\Request;

class UserController {

    private $userService;
    private $nombreCookie = "loggedIn";

    /**
     * UserController constructor.
     */
    public function __construct() {
        $this->userService = new UserService();
    }

    /**
     *
     * @param Request $request
     *
     * @return []
     */
    public function login($request) {
        $result = [];

        $formData = $request->getParsedBody();
        $email = null;
        $password = null;

        // Verificar que exista una entrada de email
        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        // Verificamos que exista una entrada de password
        if (array_key_exists("password", $formData)) {
            $password = $formData["password"];
        }

        $loginResult = $this->userService->login($email, $password);

        if (array_key_exists("error", $loginResult)) {
            $result["error"] = true;
            $result["message"] = $loginResult["message"];
        } else {
            /**
             *Crear un cookie en caso de que el usuario haya inicado sesión-
             */
            setcookie($this->nombreCookie, true, time()+3600);
            $result["user"] = $loginResult["user"];
            $result["message"] = $loginResult["message"];
        }

        return $result;
    } //end -login-

    /**
     * Cierra la sesión del usuario del lado del back-end.
     *
     * @param Request $request
     *
     * @return string []
     */
    public function logout($request) {
        $result = [];

        // Verificamos si el usuario tenía un cookie en primer lugar
        if (array_key_exists($this->nombreCookie, $_COOKIE)) {
            $result["message"] = "User was logged out";
            // Expirar el cookie en caso de que existiera
            setcookie($this->nombreCookie, true, time()-10);
        } else {
            // Retornar un mensaje de error en caso de que se haya accedido al logout sin tener sesión activa
            $result["error"] = true;
            $result["message"] = "User never logged in";
        }

        return $result;
    } //end -logout-

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param Request $request
     *
     * @return string []
     */

    public function registerUser($request) {
        $result = [];
        $formData = $request->getParsedBody();

        $firstname= null;
        $secondname= null;
        $firstlastname= null;
        $secondlastname= null;
        $personalId= null;
        $email= null;
        $password= null;
        $repeatPass= null;
        $userType= null;

        LoggingService::logVariable($formData, __FILE__, __LINE__);

        if (array_key_exists("firstname", $formData)) {
            $firstname = $formData["firstname"];
        }

        if (array_key_exists("secondname", $formData)) {
            $secondname = $formData["secondname"];
        }

        if (array_key_exists("firstlastname", $formData)) {
            $firstlastname = $formData["firstlastname"];
        }

        if (array_key_exists("secondlastname", $formData)) {
            $secondlastname = $formData["secondlastname"];
        }

        if (array_key_exists("personalId", $formData)) {
            $personalId = $formData["personalId"];
        }

        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        if (array_key_exists("password", $formData)) {
            $password = $formData["password"];
        }

        if (array_key_exists("repeatPass", $formData)) {
            $repeatPass = $formData["repeatPass"];
        }

        if (array_key_exists("userType", $formData)) {
            $userType = $formData["userType"];
        }

        $registerResult = $this->userService->registerUser($firstname, $secondname, $firstlastname, $secondlastname, $personalId, $email, $password, $repeatPass, $userType);

        if(array_key_exists("error", $registerResult)) {
            $result["error"] = true;
            $result["message"] = $registerResult["message"];
            $result["created"] = false;
        }else{
            $result["meta"]= $registerResult["meta"]["id"];
            $result["message"] = $registerResult["message"];
            $result["created"] = true;
        }


        return $result;
    } //end -registerUser-








} // end -class-