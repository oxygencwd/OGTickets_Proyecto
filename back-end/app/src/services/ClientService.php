<?php

/**
 * ClientService.php
 */

namespace App\Services;

class ClientService{

	private $storage;
	private $validation;
	private $dateFormat;

	/**
	 * ClientService constructor
	 */
	public function __construct(){
		$this->storage= new StorageService();
        $this->validation = new ValidationService();
        $this->dateFormat= new DateTimeService();
	}

	/*validateClientInfo($dateBirth, $phone, $genre);*/
	public function validateClientInfo($dateBirth, $phone, $genre){
		$result=[];

		$dateBirth= trim($dateBirth);
		$phone= trim($phone);
		$genre= trim($genre);
		$genre= strtolower($genre);

		//verifcar que los campos obligatorios esten presentes.
		if(isset($dateBirth, $phone, $genre)){ //1
			//verificar que la fecha este en formato correcto de dateTime
			if($this->validation->isValidDateTime($dateBirth) || $this->validation->isValidDate($dateBirth)){//2
				//Verificar que el cliente sea mayor de 15 años y menor de 100
				if($this->validation->isValidMinAge($dateBirth, 15) && $this->validation->isValidMaxAge($dateBirth)){//3
					//Verificar que el numero de teléfono tenga el formato correcto
					if($this->validation->isValidInt($phone) && strlen(trim($phone))==8){//4
						//Verificar que el género sea un string válido y que sea sólo f o m
						if($this->validation->isValidString($genre) && $this->validation->isValidGenre($genre)){//5
							$result["message"]= "Client info is valid";
                            $result["valid"]= true;
						}else{//5
							$result["error"] = true;
                			$result["message"] = "Genre is invalid";
						}
					}else{//4
						$result["error"] = true;
                		$result["message"] = "Phone number is invalid";
					}
				}else{//3
					$result["error"] = true;
                	$result["message"] = "Age is invalid";
				}
			}else{//2
				$result["error"] = true;
                $result["message"] = "Date of birth is invalid";
			}
		}else{//1
			$result["error"] = true;
            $result["message"] = "Empty required fields";
		}

		return $result;

	}// end -validateClientInfo-

	public function registerClient($dateBirth, $phone, $genre, $picture, $id){
		$result=[];

		$dateBirth= trim($dateBirth);
		$dateBirth= $this->dateFormat->getDateTime($dateBirth);
		$phone= trim($phone);
		$genre= trim($genre);
		$genre= strtolower($genre);
		$picture= trim($picture);
		$id= trim($id);

		if($this->validation->isValidInt($id)){
			$id= intval($id);

			$query = "INSERT INTO tbcliente
			(FechaNacimiento, Telefono, Genero, Foto, TbUsuario_idUsuario)
			VALUES
			(:dateBirth, :phone, :genre, :picture, :id)";

			$params = [
                ":dateBirth" => $dateBirth,
                ":phone" => $phone,
                ":genre" => $genre,
                ":picture" => $picture,
                ":id" => $id
            ];

            $insertClientResult = $this->storage->query($query, $params);

            LoggingService::logVariable($insertClientResult, __FILE__, __LINE__);

            $isClientCreated= array_key_exists("meta", $insertClientResult) && $insertClientResult["meta"]["count"]==1;

            if($isClientCreated){
                $result["message"]= "Client created";
                $result["meta"]["id"]= $insertClientResult["meta"]["id"];
            }else{
                $result["error"] = true;
                $result["message"]= "Error, can't create client";
            }
		}else{
			$result["error"] = true;
            $result["message"] = "Id is invalid";
		}

		LoggingService::logVariable($result, __FILE__, __LINE__);
		return $result;

		
	


	}





}//end -class-