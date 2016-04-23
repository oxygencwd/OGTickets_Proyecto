<?php

/**
 * TransactionsService.php
 */

namespace App\Services;

class TransactionsService {

    private $storage;
    private $validation;

    /**
     * TransactionsService constructor.
     */
    public function __construct() {
        $this->storage = new StorageService();
        $this->validation = new ValidationService();
    }

    public function getReservedSeats($zoneId, $siteId, $eventId){
    	$result=[];
    	$zoneId= trim($zoneId);
    	$siteId= trim($siteId); 
    	$eventId= trim($eventId);

    	//vefiricar que los tres capmpos esten
		if(isset($zoneId, $siteId, $eventId)){ //1
			//vefiricar que el id sitio sea numerico
			if($this->validation->isValidInt($siteId)){//2
				//verificar que el id del evento se numerico
				if($this->validation->isValidInt($eventId)){//3
					//vefiricar que el id de zona sea string valido
					if($this->validation->isValidString($zoneId)){//4
						//si todas las validaciones pasan hacemos la consulta
						
						$query= "SELECT idAsiento
							FROM tbbutacasporsitioporevento
							WHERE idEvento= :eventId
							AND idSitio= :siteId
							AND idSeccion= :zoneId";

						$params = [
				            ":eventId" => $promoterId, 
				            ":siteId" => $idEvent,
				            ":zoneId" => $zoneId
				        ];

				        $reservedSeatsResult = $this->storage->query($query, $params);

			            $foundRecord = array_key_exists("meta", $reservedSeatsResult) &&
			                $reservedSeatsResult["meta"]["count"] > 0;

			            if ($foundRecord) {

			                $result["message"] = "Records found";
			                $seatsList = $reservedSeatsResult["data"];

			                foreach ($seatsList as $seat) {
			                    $result["data"][] = [
			                        "seatId" => $seat["idAsiento"]
			                    ];
			                } 
			            } else {
			                $result["message"] = "Records not found";
			                $result["error"] = true;
			            }
					}else{//4
						$result["error"] = true;
            			$result["message"] = "Invalid zona id";
					}
				}else{//3
					$result["error"] = true;
            		$result["message"] = "Invalid event id";
				}
			}else{//2
				$result["error"] = true;
            	$result["message"] = "Invalid site id";
			}
		}else{//1
			$result["error"] = true;
            $result["message"] = "Empty required fields";
		}


    	return $result;
    }//getReservedSeats















}//end -class-