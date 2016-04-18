<?php

/**
 * ClientService.php
 */

namespace App\Services;

class ClientService{

	private $storage;
	private $validation;

	/**
	 * ClientService constructor
	 */
	public function __construct(){
		$this->storage= new StorageService();
        $this->validation = new ValidationService();
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
				//Verificar que el cliente sea mayor de 15 años.
				if($this->validation->validateAge($dateBirth, 15)){//3
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
                	$result["message"] = "Minimum age allowed is 15";
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





}//end -class-