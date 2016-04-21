<?php

/**
 * PromoterService.php
 */

namespace App\Services;

class PromoterService{

	private $storage;
	private $validation;
	private $dateFormat;

	/**
	 * PromoterService constructor
	 */
	public function __construct(){
		$this->storage= new StorageService();
        $this->validation = new ValidationService();
        $this->dateFormat= new DateTimeService();
	}

	/**
	 * Buscar una solicitud de registro como promotor por id
	 */
	public function getRegisterRequestById($id){
		$result=[];
		$id= trim($id);

		if($this->validation->isValidInt($id)){
			$id= intval($id);

			$query= "SELECT idSolicitudRegistroPromotor, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, nombreJuridico, Cedula, Email, password, AreaEspecializacion, PrimerTelefono, Ubicacion
			FROM tbsolicitudregistropromotor 
			WHERE Approved= 0 AND PeddingCheck=1 AND idSolicitudRegistroPromotor= :id";
		
			// Query params
		    $params = [":id" => $id];

		    $getRequestResult = $this->storage->query($query, $params);

		    $foundRecord = array_key_exists("meta", $getRequestResult) &&
	            $getRequestResult["meta"]["count"] > 0;

	        if ($foundRecord) {
	            $result["message"] = "Promoter register request found";
	            $registerRequest = $getRequestResult["data"];

	            $nombreJuridico= $registerRequest[0]["nombreJuridico"];

	            if(isset($nombreJuridico)){
	            	$typePerson= "personaJuridica";
	            }else{
	            	$typePerson= "personaFisica";
	            }

	            foreach ($registerRequest as $request) {
	            	$result["data"][] = [
	            		"typePerson" => $typePerson,
	                	"requestId" => $request["idSolicitudRegistroPromotor"],
	                	"name" => $request["nombreJuridico"],
	                	"legalId" => $request["Cedula"],
	                	"firstname" => $request["PrimerNombre"],
	                	"secondname" => $request["SegundoNombre"],
	                	"firstlastname" => $request["PrimerApellido"],
	                	"secondlastname" => $request["SegundoApellido"],
	                	"personalId" => $request["Cedula"],
	                	"email" => $request["Email"],
	                	"specializationArea" => $request["AreaEspecializacion"],
	                	"password" => $request["password"],
	                	"repeatPass" => $request["password"],
	                	"phone" => $request["PrimerTelefono"],
	                	"address" => $request["Ubicacion"]
                	];
	            } 

	        } else {
	            $result["message"] = "Promoter register request not found";
	            $result["error"] = true;
	        }
		}else{
			$result["error"] = true;
            $result["message"] = "Id is invalid";
		}
		return $result;
	}



	public function registerRequest($typePerson, $name, $legalId, $firstname, $secondname, $firstlastname, $secondlastname, $personalId, $email, $specializationArea, $password, $repeatPass, $phone, $address, $dateBirth){

		$typePerson= trim($typePerson);
        $name= trim($name);//
        $legalId= trim($legalId);//

        $firstname= trim($firstname);//
        $secondname= trim($secondname);
        $firstlastname= trim($firstlastname);//
        $secondlastname= trim($secondlastname);
        $personalId= trim($personalId);//
        $email= trim($email);//
        $specializationArea= trim($specializationArea);//
        $password= trim($password);//
        $repeatPass= trim($repeatPass);//
        $phone= trim($phone);//
        $address= trim($address);//
        $dateBirth= trim($dateBirth);

        //Vefiricar que los datos obligatorios esten
		if(isset($email, $specializationArea, $password, $repeatPass, $phone, $address)){ //1
			//verificar que el email sea valido
			if($this->validation->isValidEmail($email)){//2
				//Verificar que el area de especializacion sea string valido
				if($this->validation->isValidString($specializationArea)){//3
					//verifiar que el password se string valido
					if($this->validation->isValidString($password)){//4
						//verficar que la confirmacion de contraseña sea valida
						if($this->validation->isValidString($repeatPass)){//5
							//vefiricar que el numero de telefoo sea valido
							if($this->validation->isValidInt($phone) && strlen(trim($phone))==8){//6
								//verifecar que la direccion sea valida
								if($this->validation->isValidString($address)){//7
									//varificar que el email este disponible en el sistema
									if($this->isEmailAvailable($email)){//8
										//verificar que el email este dosponibl dentro de la tabla de registros de promotor
										if($this->isEmailAvailableTbRequest($email)){//8.1
											//vefiricar que el password y la confirmacion sean iguales
											if($password == $repeatPass){//9
												if($this->validation->isValidString($legalId) || $this->validation->isValidString($personalId)){ //10
													//dividir las validaciones segun el tipo de promotor.
													if($typePerson=="personaJuridica"){//11
														//persona juridica
														//verificar que el nombre sea string valido
														if($this->validation->isValidString($name)){//12
															//si pasa toda la validacion se manda a guardar el request
															$query= "INSERT INTO tbsolicitudregistropromotor(nombreJuridico, Cedula, Email, password, AreaEspecializacion, PrimerTelefono, Ubicacion) VALUES (:name, :legalId, :email, :password, :specializationArea, :phone, :address)";

															$params = [
																":name" => $name, 
																":legalId" => $legalId, 
																":email" => $email,
																":password" => $password,
																":specializationArea" => $specializationArea,
																":phone" =>$phone,
																":address" => $address
															];

															$createPromoterRequest= $this->storage->query($query, $params);
															LoggingService::logVariable($createPromoterRequest, __FILE__, __LINE__);

															$isRequestCreated= array_key_exists("meta", $createPromoterRequest) && $createPromoterRequest["meta"]["count"]==1;

															if($isRequestCreated){//13
			                                                    $result["message"]= "Promoter Request created";
			                                                    $result["meta"]["id"]= $createPromoterRequest["meta"]["id"];
			                                                }else{
			                                                    $result["error"] = true;
			                                                    $result["message"]= "Error, can't create promoter request";
			                                                }
														}else{
															$result["error"] = true;
		                    								$result["message"] = "Name is invalid";
														}
													}elseif($typePerson=="personaFisica"){//14
														//verifecar que el nombre sea valido
														if($this->validation->isValidString($firstname)){//15
															//verificar que ela prellido sea alido
															if($this->validation->isValidString($firstlastname)){//16
																//si pasa toda la validacion se manda a guardr el request
																$query= "INSERT INTO tbsolicitudregistropromotor (PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Cedula, Email, password, AreaEspecializacion, PrimerTelefono, Ubicacion) VALUES (:firstname, :secondname, :firstlastname, :secondlastname, :personalId, :email, :password, :specializationArea, :phone, :address)";

																LoggingService::logVariable($query, __FILE__, __LINE__);

																$params = [
																	":firstname" => $firstname,
																	":secondname" => $secondname,
																	":firstlastname" => $firstlastname,
																	":secondlastname" => $secondlastname,
																	":personalId" => $personalId, 
																	":email" => $email,
																	":password" => $password,
																	":specializationArea" => $specializationArea,
																	":phone" =>$phone,
																	":address" => $address
																];

																LoggingService::logVariable($params, __FILE__, __LINE__);

																$createPromoterRequest= $this->storage->query($query, $params);
																LoggingService::logVariable($createPromoterRequest, __FILE__, __LINE__);

																$isRequestCreated= array_key_exists("meta", $createPromoterRequest) && $createPromoterRequest["meta"]["count"]==1;

																if($isRequestCreated){//17
				                                                    $result["message"]= "Promoter Request created";
				                                                    $result["meta"]["id"]= $createPromoterRequest["meta"]["id"];
				                                                }else{
				                                                    $result["error"] = true;
				                                                    $result["message"]= "Error, can't create promoter request";
				                                                }
															}else{
																$result["error"] = true;
	                    										$result["message"] = "first last name is invalid";
															}
														}else{
															$result["error"] = true;
	                    									$result["message"] = "first name is invalid";
														}
													}
												}else{//10
													$result["error"] = true;
	                    							$result["message"] = "id is invalid";
												}
											}else{//9
												$result["error"] = true;
	                    						$result["message"] = "Passwords don't match";
											}
										}else{//8.1
											$result["error"] = true;
                    						$result["message"] = "Email is unavailable -promoter request table-";
										}
									}else{//8
										$result["error"] = true;
                    					$result["message"] = "Email is unavailable";
									}
								}else{//7
									$result["error"] = true;
                    				$result["message"] = "address is invalid";
								}
							}else{//6
								$result["error"] = true;
                    			$result["message"] = "Phone number is invalid";
							}
						}else{//5
							$result["error"] = true;
                    		$result["message"] = "Password confirm is invalid";
						}
					}else{//4
						$result["error"] = true;
                    	$result["message"] = "Password is invalid";
					}
				}else{//3
					$result["error"] = true;
                    $result["message"] = "specializationArea is invalid";
				}
			}else{//2
				$result["error"] = true;
                $result["message"] = "Email is invalid";
			}
		}else{//1
			$result["error"] = true;
            $result["message"] = "Required fields empty";
		}
		return $result;

	}


	private function isEmailAvailable($email) {
        // El query a ejecutar en la BD
        $query = "SELECT COUNT(*) AS count FROM tbusuario WHERE email = :email";

        // Los parámetros de ese query
        $params = [":email" => $email];

        $result = $this->storage->query($query, $params);

        LoggingService::logVariable($result, __FILE__, __LINE__);

        // El resultado esperado de la cuenta es cero
        return $result["data"][0]["count"] == 0;

    }//end -isEmailAvailable-


    private function isEmailAvailableTbRequest($email) {
        // El query a ejecutar en la BD
        $query = "SELECT COUNT(*) AS count FROM tbsolicitudregistropromotor WHERE email = :email AND Approved= 0 AND PeddingCheck=1";

        // Los parámetros de ese query
        $params = [":email" => $email];

        $result = $this->storage->query($query, $params);

        LoggingService::logVariable($result, __FILE__, __LINE__);

        // El resultado esperado de la cuenta es cero
        return $result["data"][0]["count"] == 0;

    }//end -isEmailAvailable-


    /**
     * promoterService->getAllRequest();
     * @param string
     */
    public function getAllRequest(){
    	$result=[];

    	$query= "SELECT idSolicitudRegistroPromotor, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, nombreJuridico, Cedula, Email, password, AreaEspecializacion, PrimerTelefono, Ubicacion
			FROM tbsolicitudregistropromotor 
			WHERE Approved= 0 AND PeddingCheck=1";
		// Query params
	    $params = [];

	    $getAllResult = $this->storage->query($query, $params);

	    $foundRecords = array_key_exists("meta", $getAllResult) &&
            $getAllResult["meta"]["count"] > 0;

	    if ($foundRecords) {
            $result["message"] = "Promoter register request found";
            $requests = $getAllResult["data"];

            foreach ($requests as $request) {
                $result["data"][] = [
                	"requestId" => $request["idSolicitudRegistroPromotor"],
                	"name" => $request["nombreJuridico"],
                	"legalId" => $request["Cedula"],
                	"firstname" => $request["PrimerNombre"],
                	"secondname" => $request["SegundoNombre"],
                	"firstlastname" => $request["PrimerApellido"],
                	"secondlastname" => $request["SegundoApellido"],
                	"personalId" => $request["Cedula"],
                	"email" => $request["Email"],
                	"specializationArea" => $request["AreaEspecializacion"],
                	"password" => $request["password"],
                	"repeatPass" => $request["password"],
                	"phone" => $request["PrimerTelefono"],
                	"address" => $request["Ubicacion"]
                ];
            } 
        } else {
            $result["message"] = "Promoter register requests not found";
            $result["error"] = true;
        }

	    return $result;

    }//end -getAllRequest-



   /* public function registerPromoter($typePerson, $name, $legalId, $firstname, $secondname, $firstlastname, $secondlastname, $personalId, $email, $specializationArea, $password, $repeatPass, $phone, $address, $dateBirth){

		$typePerson= trim($typePerson);
        $name= trim($name);//
        $legalId= trim($legalId);//

        $firstname= trim($firstname);//
        $secondname= trim($secondname);
        $firstlastname= trim($firstlastname);//
        $secondlastname= trim($secondlastname);
        $personalId= trim($personalId);//
        $email= trim($email);//
        $specializationArea= trim($specializationArea);//
        $password= trim($password);//
        $repeatPass= trim($repeatPass);//
        $phone= trim($phone);//
        $address= trim($address);//
        $dateBirth= trim($dateBirth);
        $userType=3;

        //Vefiricar que los datos obligatorios esten
		if(isset($email, $specializationArea, $password, $repeatPass, $phone, $address)){ //1
			//verificar que el email sea valido
			if($this->validation->isValidEmail($email)){//2
				//Verificar que el area de especializacion sea string valido
				if($this->validation->isValidString($specializationArea)){//3
					//verifiar que el password se string valido
					if($this->validation->isValidString($password)){//4
						//verficar que la confirmacion de contraseña sea valida
						if($this->validation->isValidString($repeatPass)){//5
							//vefiricar que el numero de telefoo sea valido
							if($this->validation->isValidInt($phone) && strlen(trim($phone))==8){//6
								//verifecar que la direccion sea valida
								if($this->validation->isValidString($address)){//7
									//varificar que el email este disponible en el sistema
									if($this->isEmailAvailable($email)){//8
										//vefiricar que el password y la confirmacion sean iguales
										if($password == $repeatPass){//9
											//verificar que el id sea un string valido
											if($this->validation->isValidString($legalId) || $this->validation->isValidString($personalId)){ //10
												//dividir las validaciones segun el tipo de promotor.
												if($typePerson=="personaJuridica"){//11
													//persona juridica
													//verificar que el nombre sea string valido
													if($this->validation->isValidString($name)){//12
														//si pasa toda la validacion se manda a guardar el promotor
														$query = "INSERT INTO tbusuario (PrimerNombre, Cedula, Email, password, TbTipoUsuario_idTipoUsuario) VALUES (:name, :legalId, :email, :password, :userType)";

			                                                    // Enmascaramos la contraseña
			                                                $encryptedPassword = $this->getProtectedPassword($password);

			                                                // Los parámetros de ese query
			                                                $params = [
			                                                    ":name" => $name,
			                                                    ":legalId" => $legalId,
			                                                    ":email" => $email,
			                                                    ":password" => $encryptedPassword, 
			                                                    ":userType" => $userType
			                                                ];

			                                                    // Lo ejecutamos
			                                                $createUserResult = $this->storage->query($query, $params);

			                                                LoggingService::logVariable($createUserResult, __FILE__, __LINE__);
			                                                   
			                                                $isUserCreated= array_key_exists("meta", $createUserResult) && $createUserResult["meta"]["count"]==1;

			                                                if($isUserCreated){
			                                                    $userId= $createUserResult["meta"]["id"];
			                                                    $query= "INSERT INTO tbpromotor(nombreJuridico, AreaEspecializacion, PrimerTelefono, Ubicacion, TbUsuario_idUsuario) VALUES (:name, :specializationArea, :phone, :address, :userId)";

																$params = [
																	":name" => $name, 
																	":specializationArea" => $specializationArea,
																	":phone" =>$phone,
																	":address" => $address,
																	"userId" => $userId
																];

																$createPromoterResult = $this->storage->query($query, $params);

				                                                LoggingService::logVariable($createPromoterResult, __FILE__, __LINE__);
				                                                   
				                                                $isPromoterCreated= array_key_exists("meta", $createPromoterResult) && $createPromoterResult["meta"]["count"]==1;

				                                                if($isPromoterCreated){
				                                                    $result["message"]= "Promoter created";
				                                                    $result["meta"]["id"]= $createPromoterResult["meta"]["id"];
				                                                }else{
				                                                    $result["error"] = true;
				                                                    $result["message"]= "Error, can't create legal promoter";
				                                                }

			                                                }else{
			                                                    $result["error"] = true;
			                                                    $result["message"]= "Error, can't create user -promoter";
			                                                }
		                                                }
													}else{
														$result["error"] = true;
	                    								$result["message"] = "Name is invalid";
													}
												}elseif($typePerson=="personaFisica"){//14
													//verifecar que el nombre sea valido
													if($this->validation->isValidString($firstname)){//15
														//verificar que ela prellido sea alido
														if($this->validation->isValidString($firstlastname)){//16
															//si pasa toda la validacion se manda a guardar el promotor
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
																	":password" => $password,
																	":userType" => $userType
																];

			                                                    // Lo ejecutamos
			                                                $createUserResult = $this->storage->query($query, $params);

			                                                LoggingService::logVariable($createUserResult, __FILE__, __LINE__);
			                                                   
			                                                $isUserCreated= array_key_exists("meta", $createUserResult) && $createUserResult["meta"]["count"]==1;

			                                                if($isUserCreated){
			                                                    $userId= $createUserResult["meta"]["id"];
			                                                    $query= "INSERT INTO tbpromotor(AreaEspecializacion, PrimerTelefono, Ubicacion, TbUsuario_idUsuario) VALUES (:specializationArea, :phone, :address, :userId)";

																$params = [
																	":specializationArea" => $specializationArea,
																	":phone" =>$phone,
																	":address" => $address,
																	"userId" => $userId
																];

																$createPromoterResult = $this->storage->query($query, $params);

				                                                LoggingService::logVariable($createPromoterResult, __FILE__, __LINE__);
				                                                   
				                                                $isPromoterCreated= array_key_exists("meta", $createPromoterResult) && $createPromoterResult["meta"]["count"]==1;

				                                                if($isPromoterCreated){
				                                                    $result["message"]= "Promoter created";
				                                                    $result["meta"]["id"]= $createPromoterResult["meta"]["id"];
				                                                }else{
				                                                    $result["error"] = true;
				                                                    $result["message"]= "Error, can't create promoter";
				                                                }

			                                                }else{
			                                                    $result["error"] = true;
			                                                    $result["message"]= "Error, can't create user -promoter";
			                                                }
														}else{
															$result["error"] = true;
                    										$result["message"] = "first last name is invalid";
														}
													}else{
														$result["error"] = true;
                    									$result["message"] = "first name is invalid";
													}
												}
											}else{//10
												$result["error"] = true;
                    							$result["message"] = "user id is invalid";
											}
										}else{//9
											$result["error"] = true;
                    						$result["message"] = "Passwords don't match";
										}
									}else{//8
										$result["error"] = true;
                    					$result["message"] = "Email is unavailable";
									}
								}else{//7
									$result["error"] = true;
                    				$result["message"] = "address is invalid";
								}
							}else{//6
								$result["error"] = true;
                    			$result["message"] = "Phone number is invalid";
							}
						}else{//5
							$result["error"] = true;
                    		$result["message"] = "Password confirm is invalid";
						}
					}else{//4
						$result["error"] = true;
                    	$result["message"] = "Password is invalid";
					}
				}else{//3
					$result["error"] = true;
                    $result["message"] = "specializationArea is invalid";
				}
			}else{//2
				$result["error"] = true;
                $result["message"] = "Email is invalid";
			}
		}else{//1
			$result["error"] = true;
            $result["message"] = "Required fields empty";
		}
		return $result;

	}*/





}//end -class-