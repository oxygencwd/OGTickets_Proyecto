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

    /**
     * Encargado de iniciar la sesión del usuario.
     *
     * @param string $email
     * @param string $password
     *
     * @return array
     */

    
        public function login($email, $password) {
        $result = [];

        // Verificamos que el email, sin espacios, tenga por lo menos 1 caracter
        if (strlen(trim($email)) > 0) {
            // Verificamos que el email tenga formato de email
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                // Verificamos que el password, sin espacios, tenga por lo menos 1 caracter
                if (strlen(trim($password)) > 0) {
                    // Si todo lo anterior tuvo éxito, iniciamos el query
                    // El query que vamos a ejecutar en la BD
                    $query = "SELECT idUsuario, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,TbTipoUsuario_idTipoUsuario FROM tbusuario WHERE email = :email AND password = :password AND activo=1 LIMIT 1";
                    // Los parámetros de ese query
                    $params = [":email" => $email, ":password" => $password];

                    // Una vez que se cree la base de datos esté lista ésto se puede remover
                    if ($this->isDBReady) {
                        // El resultado de de ejecutar la sentencia se almacena en la variable `result`
                        $result = $this->storage->query($query, $params);

                        // Si la setencia tiene por lo menos una fila, quiere decir que encontramos a nuestro usuario
                        if (count($result['data']) > 0) {
                            // Almacenamos el usuario en la variable `user`
                            $user = $result['data'][0];

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
                            // No encontramos un usuario con ese email y password
                            $result["message"] = "Invalid credentials.";
                            $result["error"] = true;
                        }
                    } else {
                        // La base de datos no está lista todavía
                        $result["message"] = "Database has not been setup yet.";
                        $result["error"] = true;
                    }
                } else {
                    // El password está en blanco
                    $result["message"] = "Password is required.";
                    $result["error"] = true;
                }
            } else {
                // El email no tiene formato de tal
                $result["message"] = "Email is invalid.";
                $result["error"] = true;
            }
        } else {
            // El email está en blanco
            $result["message"] = "Email is required.";
            $result["error"] = true;
        }

        return $result;
    }



/******************************************************************************************/

    //aqui empieza la funcion que estoy apagando temporalmente
   /* public function login($email, $password) {
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
                        $result["message"] = "Invalid password.";
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
    }*/ //aquitermina la funcion que estoy apagando tempoalmente

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param string $email
     * @param string $password
     * @param string $passwordConfirm
     * @param string $fullName
     *
     * @return array
     */
    public function register($email, $password, $passwordConfirm, $fullName) {
        $result = [];

        // Verificamos que efectivamente vengan todos los datos
        if (isset($email, $password, $passwordConfirm, $fullName)) {
            $email = trim($email);
            $password = trim($password);
            $passwordConfirm = trim($passwordConfirm);
            $fullName = trim($fullName);

            // Si nuestro correo es válido
            if ($this->validation->isValidEmail($email)) {
                // Si `password` es un string válido
                if ($this->validation->isValidString($password)) {
                    // Si `$passwordConfirm` es un string válido
                    if ($this->validation->isValidString($passwordConfirm)) {
                        // Si `$fullName` es un string válido
                        if ($this->validation->isValidString($fullName)) {
                            // Si tanto `$password` como `$passwordConfirm` coinciden
                            if ($password == $passwordConfirm) {

                                // Si el email no ha sido usado
                                if ($this->isEmailAvailable($email)) {

                                    $query = "INSERT INTO usuarios (email, password, full_name) VALUES (:email, :password, :nombre)";

                                    // Enmascaramos la contraseña
                                    $encryptedPassword = $this->getProtectedPassword($password);

                                    // Los parámetros de ese query
                                    $params = [":email" => $email, ":password" => $encryptedPassword, ":nombre" => $fullName];

                                    // Lo ejecutamos
                                    $createAccountResult = $this->storage->query($query, $params);

                                    LoggingService::logVariable($createAccountResult);

                                    if ($createAccountResult["data"]["count"] == 1) {
                                        $result["message"] = "yay!";
                                    } else {
                                        $result["error"] = true;
                                        $result["message"] = "Something is up";
                                    }
                                } else {
                                    $result["error"] = true;
                                    $result["message"] = "Email is unavailable";
                                }
                            } else {
                                $result["error"] = true;
                                $result["message"] = "Passwords don't match";
                            }
                        } else {
                            $result["error"] = true;
                            $result["message"] = "Full name is invalid";
                        }
                    } else {
                        $result["error"] = true;
                        $result["message"] = "Password confirm is invalid";
                    }
                } else {
                    $result["error"] = true;
                    $result["message"] = "Password is invalid";
                }
            } else {
                $result["error"] = true;
                $result["message"] = "Email is invalid";
            }
        } else {
            $result["error"] = true;
            $result["message"] = "All fields are required";
        }

        return $result;
    }

    /**
     * Verifica si un email está disponible para ser utilizado en el sistema.
     *
     * @param string $email
     * @return bool
     */
    private function isEmailAvailable($email) {
        // El query que vamos a ejecutar en la BD
        $query = "SELECT COUNT(*) AS count FROM usuarios WHERE email = :email";

        // Los parámetros de ese query
        $params = [":email" => $email];

        // Lo ejecutamos
        $result = $this->storage->query($query, $params);

        LoggingService::logVariable($result);

        // El resultado esperado de la cuenta es cero
        return $result["data"][0]["count"] == 0;
    }

    /**
     * Enmascara la contraseña brindada para evitar almacenar las contraseñas en texto plano en la base de datos.
     *
     * @param $password
     * @return string
     */
    private function getProtectedPassword($password) {
        /**
         * Cuarto intento: usando funciones nativas de PHP para `hashear` contraseñas.
         * Entrada: password
         * Salida usando bcrypt: $2y$10$2vCcgaflnKMeUc3D4wo1l.efzpviKiqUKZXSv0esbWdcHXyriyici
         * Salida usando bcrypt: $2y$10$mI.DvksSYz46dsqC28Ju2.FXD00dhqCtFsgVMCrnRfFprEurg.m2q
         * https://jonsuh.com/blog/securely-hash-passwords-with-php/
         * http://stackoverflow.com/questions/18084595/how-to-decrypt-hash-stored-by-bcrypt
         * Al bcrypt ser un algoritmo de hasheo, no tiene contraparte para revertirlo, además se le agrega una sal
         * aleatoriamente y finalmente es computacionalmente costoso.
         */
        $finalPassword = password_hash($password, PASSWORD_BCRYPT);

        return $finalPassword;
    }

}
