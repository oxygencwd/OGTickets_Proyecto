<?php

/**
 * UserService.php
 */

namespace App\Services;

class UserService {

    private $storage;
    private $validation;
    private $isDBReady = true;
    /**
     * UserService constructor.
     */
    public function __construct() {
        $this->storage = new StorageService();
        $this->validation = new ValidationService();
    }



    //aqui empieza la funcion que estoy apagando temporalmente
   public function login($email, $password) {
        $result = [];

        // Verificamos que el email sea válido
        if ($this->validation->isValidEmail($email)) {
            // Verificamos que el password, sin espacios, tenga por lo menos 1 caracter
            if ($this->validation->isValidString($password)) {
                // Si lo anterior tuvo éxito, iniciamos el query

                // El query que vamos a ejecutar en la BD
                //$query = "SELECT idUsuario, PrimerNombre, PrimerNombre, TbTipoUsuario_idTipoUsuario FROM tbusuario WHERE email = :email LIMIT 1";

                $query = "SELECT idUsuario, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,TbTipoUsuario_idTipoUsuario, password FROM tbusuario WHERE email = :email AND activo=1 LIMIT 1";
                    // Los parámetros de ese query
                    $params = [":email" => $email];

                // Los parámetros de ese query
                //$params = [":email" => $email];

                // El resultado de de ejecutar la sentencia se almacena en la variable `$loginResult`
                $loginResult = $this->storage->query($query, $params);

                LoggingService::logVariable($loginResult, __FILE__, __LINE__);
//                LoggingService::logVariable($loginResult, __FILE__);
//                LoggingService::logVariable($loginResult);

                // Si la sentencia tiene por lo menos una fila, quiere decir que encontramos a nuestro usuario
                if (count($loginResult["data"]) > 0) {
                    // Almacenamos el usuario en la variable `user`
                    $user = $loginResult["data"][0];

                    // Al usar el mecanismo de hasheo nunca dos hashes serán iguales, por lo que la verificación del
                    // usuario tiene que darse usando esta función.
                    LoggingService::logVariable($password, __FILE__, __LINE__);
                    if (password_verify($password, $user["password"])) {

                        // Definimos nuestro mensaje de éxito
                        $result["message"] = "User found.";

                        // Enviamos de vuelta a quien consumió el servicio datos sobre el usuario solicitado
                        $result["user"] = [
                            "userId" => $user["idUsuario"],
                            "firstName" => $user["PrimerNombre"],
                            "secondName" => $user["SegundoNombre"],
                            "lastName" => $user["PrimerApellido"],
                            "secondLastName" => $user["SegundoApellido"],
                            "userType"=>"ut0".$user["TbTipoUsuario_idTipoUsuario"]
                        ];
                    } else {
                        $result["message"] = "Invanlid password.";
                        $result["error"] = true;
                    }
                } else {
                    // No encontramos un usuario con ese email y password
                    $result["message"] = "Invalid credentials.";
                    $result["error"] = true;
                }
            } else {
                // El password está en blanco
                $result["message"] = "Password is required.";
                $result["error"] = true;
            }
        } else {
            // El email está en blanco
            $result["message"] = "Email is invalid.";
            $result["error"] = true;
        }

        return $result;
    } //aquitermina la funcion que estoy apagando tempoalmente

   

}
