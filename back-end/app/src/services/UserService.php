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

        // Verificamos que el email sea válido
        if ($this->validation->isValidEmail($email)) {
            // Verificamos que el password, sin espacios, tenga por lo menos 1 caracter
            if ($this->validation->isValidString($password)) {
                // Si lo anterior tuvo éxito, se inicia el query.
                $query = "SELECT idUsuario, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,TbTipoUsuario_idTipoUsuario, password FROM tbusuario WHERE email = :email AND activo=1 LIMIT 1";
                    //Parámetros del query
                    $params = [":email" => $email];

                $loginResult = $this->storage->query($query, $params);

                LoggingService::logVariable($loginResult, __FILE__, __LINE__);

                // Si la sentencia tiene por lo menos una fila, el usuario si existe.
                if (count($loginResult["data"]) > 0) {
                    // Almacenar el usuario en una variable
                    $user = $loginResult["data"][0];

                    // Verifcar el password del usuario.
                    LoggingService::logVariable($password, __FILE__, __LINE__);
                    if (password_verify($password, $user["password"])) {

                        // Definimos el mensaje de éxito
                        $result["message"] = "User found.";

                        // Enviar de regreso los datos solicitados del usuario.
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
    } 

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param string $firstname
     * @param string $secondname
     * @param string $firstlastname
     * @param string $secondlastname
     * @param int $personalId
     * @param string $email
     * @param string $password
     * @param string $repeatPass
     * @param int $userType

     * @return array
     */
    public function registerUser($firstname, $secondname, $firstlastname, $secondlastname, $personalId, $email, $password, $repeatPass, $userType){
        $result=[];

        $firstname = trim($firstname);
        $secondname = trim($secondname);
        $firstlastname = trim($firstlastname);
        $secondlastname = trim($secondlastname);
        $personalId = trim($personalId);
        $email = trim($email);
        $password = trim($password);
        $repeatPass = trim($repeatPass);
        $userType = trim($userType);

        // Verificar que efectivamente vengan todos los datos requeridos.
        if(isset($firstname, $firstlastname, $personalId, $email, $password, $repeatPass, $userType)){ //1
            //Verificar que el email sea uno disponible
            if($this->isEmailAvailable($email)){//2
                //Verificar que el password y la confirmacion coincidan.
                if($password == $repeatPass){//3
                    //vefificar que el correo se uno válido.
                    if($this->validation->isValidEmail($email)){//4
                        //verificar que el numero de identificacion contenga al menos 9 caracteres
                        if($this->validation->isValidString($personalId) && strlen(trim($personalId))>=9){//5
                           //Verificar que el password se string válido.
                            if($this->validation->isValidString($password)){//6
                                //Vefificar que la confirmacion de contraseña sea string válido.
                                if($this->validation->isValidString($repeatPass)){//7
                                    //Verificar que el tipo de usuario este y sea un numero entre 1 y 4
                                    if($this->validation->isValidInt($userType) && strlen(trim($userType))==1 && ($userType>=1 && $userType <=4)){//8
                                        //Verifwcar que el primer apellido sea valido
                                        if($this->validation->isValidString($firstlastname)){//9
                                            //verificar que el nombre sea un string válido
                                            if($this->validation->isValidString($firstname)){//10
                                                $query = "INSERT INTO tbusuario (PrimerNombre, segundoNombre, PrimerApellido, segundoapellido, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) VALUES (:firstname, :secondname, :firstlastname, :secondlastname, :personalId, :email, :password, :userType)";

                                                    // Enmascaramos la contraseña
                                                $encryptedPassword = $this->getProtectedPassword($password);

                                                // Los parámetros de ese query
                                                $params = [
                                                    ":firstname" => $firstname,
                                                    ":secondname" => $secondname,
                                                    ":firstlastname" => $firstlastname,
                                                    ":secondlastname" => $secondlastname,
                                                    ":personalId" => $personalId,
                                                    ":email" => $email,
                                                    ":password" => $encryptedPassword, 
                                                    ":userType" => $userType
                                                ];

                                                    // Lo ejecutamos
                                                $createAccountResult = $this->storage->query($query, $params);

                                                LoggingService::logVariable($createAccountResult, __FILE__, __LINE__);
                                                   
                                                $isUserCreated= array_key_exists("meta", $createAccountResult) && $createAccountResult["meta"]["count"]==1;

                                                if($isUserCreated){
                                                    $result["message"]= "User created";
                                                    $result["meta"]["id"]= $createAccountResult["meta"]["id"];
                                                }else{
                                                    $result["error"] = true;
                                                    $result["message"]= "Error, can't create user";
                                                }

                                            }else{//10
                                                $result["error"] = true;
                                                $result["message"] = "First name is invalid";
                                            }
                                        }else{//9
                                            $result["error"] = true;
                                            $result["message"] = "First last name is invalid";
                                        }
                                    }else{//8
                                        $result["error"] = true;
                                        $result["message"] = "User type is invalid";
                                    }
                                }else{//7
                                    $result["error"] = true;
                                    $result["message"] = "Password confirm is invalid";
                                }
                            }else{//6
                                $result["error"] = true;
                                $result["message"] = "Password is invalid";
                            }
                        }else{//5
                            $result["error"] = true;
                            $result["message"] = "Personal id is invalid";
                        }
                    }else{//4
                        $result["error"] = true;
                        $result["message"] = "Email is invalid";
                    }
                }else{//3
                    $result["error"] = true;
                    $result["message"] = "Passwords don't match";
                }
            }else{//2
                $result["error"] = true;
                $result["message"] = "Email is unavailable";
            }
        }else{//1
            $result["error"] = true;
            $result["message"] = "All fields are required";
        }

        LoggingService::logVariable($result, __FILE__, __LINE__);
        return $result;

    } //end -registerUser

    /**
     * Enmascara la contraseña brindada para evitar almacenar las contraseñas en texto plano en la base de datos.
     *
     * @param $password
     * @return string
     */
    private function getProtectedPassword($password) {
        $finalPassword = password_hash($password, PASSWORD_BCRYPT);
        return $finalPassword;
    } //end -getProtectedPassword-


    /**
     * Verifica si un email está disponible para ser utilizado en el sistema.
     *
     * @param string $email
     * @return bool
     */
    private function isEmailAvailable($email) {
        // El query a ejecutar en la BD
        $query = "SELECT COUNT(*) AS count FROM tbusuario WHERE email = :email";

        // Los parámetros de ese query
        $params = [":email" => $email];

        $result = $this->storage->query($query, $params);

        LoggingService::logVariable($result);

        // El resultado esperado de la cuenta es cero
        return $result["data"][0]["count"] == 0;

    }//end -isEmailAvailable-



}//end -class-


