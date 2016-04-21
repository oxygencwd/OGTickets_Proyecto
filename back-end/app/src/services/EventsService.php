<?php

/**
 * EventsService.php
 */

namespace App\Services;

class EventsService {

    private $storage;
    private $validation;

    /**
     * EventsService constructor.
     */
    public function __construct() {
        $this->storage = new StorageService();
        $this->validation = new ValidationService();
    }


    /**
     * Devuelve la lista de tipos de evento con id, nombre, descripcion y foto de cada uno si la hay
     * @return array
     */
    public function getAllEventTypes(){
    	$result=[];
    	$query= "SELECT idTipoEvento, Nombre, Foto, Descripcion
				FROM tbtipoevento
				WHERE Activo= 1";
		// Query params
	    $params = [];

	    $getAllResult = $this->storage->query($query, $params);

	    $foundRecords = array_key_exists("meta", $getAllResult) &&
            $getAllResult["meta"]["count"] > 0;

        if ($foundRecords) {
            $result["message"] = "Event types found";
            $eventTypes = $getAllResult["data"];

            foreach ($eventTypes as $type) {
                $result["data"][] = [
                	"id" => $type["idTipoEvento"],
                	"name" => $type["Nombre"],
                	"description" => $type["Descripcion"],
                	"image" => $type["Foto"]
                ];
            } 
        } else {
            $result["message"] = "Event types not found";
            $result["error"] = true;
        }

	    return $result;


    }//end -getAllEventTypes-


    /**
     * realiza ls validaciones de los datos del registro de evento y realiza el registro en la base de datos en caso de que todos los datos sean validos
     */
    public function registerEvent($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice, $image){

        $eventType= trim($eventType);
        $siteId= trim($siteId);
        $name= trim($name);
        $description= trim($description);
        $date= trim($date);
        $startHour= trim($startHour);
        $endHour= trim($endHour);
        $ticketsPrice= trim($ticketsPrice);
        $image= trim($image);

        if(isset($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice)){ //1
            if(){//2
                if(){//3
                    if(){//4
                        if(){//5
                            if(){//6
                                if(){//7
                                    if(){//8
                                        if(){//9
                                            if(){//10

                                            }else{//10

                                            }
                                        }else{//9

                                        }
                                    }else{//8

                                    }
                                }else{//7

                                }
                            }else{//6

                            }
                        }else{//5

                        }
                    }else{//4

                    }
                }else{//3

                }
            }else{//2

            }
        }else{//1

        }








    }//end -registerEvent-









}//end-class-










