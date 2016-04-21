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



    //getAllEvents
     /**
     * Devuelve la lista de todos los evetos con: id, nombre, fecha, hora de inicio e imagen.
     * @return array
     */
    public function getAllActiveEvents(){
        $result=[];
        $query= "SELECT idEvento, Nombre, FechaEvento, HoraInicio, Foto, TbTipoEvento_idTipoEvento as idtipoEvento
                FROM tbevento
                WHERE Activo=1 AND FechaEvento > NOW()";
        // Query params
        $params = [];

        $getAllResult = $this->storage->query($query, $params);

        $foundRecords = array_key_exists("meta", $getAllResult) &&
            $getAllResult["meta"]["count"] > 0;

        if ($foundRecords) {
            $result["message"] = "Events found";
            $events = $getAllResult["data"];

            foreach ($events as $event) {
                $result["data"][] = [
                    "id" => $event["idEvento"],
                    "name" => $event["Nombre"],
                    "date" => $event["FechaEvento"],
                    "startHour" => $event["HoraInicio"],
                    "image" => $event["Foto"],
                    "eventType" => $event["idtipoEvento"]
                ];
            } 
        } else {
            $result["message"] = "Events not found";
            $result["error"] = true;
        }

        return $result;
    }//end -getAllEvents-



    /**
     * getEventById
     */
    public function getEventById($id){
        $result=[];
        $id= trim($id);

        if($this->validation->isValidInt($id)){
            $id= intval($id);

            $query= "SELECT tbevento.idEvento, tbevento.Nombre, tbevento.Descripcion, tbevento.FechaEvento, tbevento.CapacidadPersonas, tbevento.HoraInicio, tbevento.HoraFinalizacion, tbevento.CostoEntrada, tbevento.Foto, TbTipoEvento_idTipoEvento as idTipoEvento, 
                tbtipoevento.Nombre as nombreTipoEvento,
                tbsitio.idsitio as idsitio, tbsitio.Nombre as nombreSitio
                from tbtipoevento
                inner join tbevento
                inner join tbeventoporsitio
                inner join tbsitio
                on tbtipoevento.idTipoEvento = tbevento.TbTipoEvento_idTipoEvento
                and tbevento.idEvento = tbeventoporsitio.TbEvento_idEvento
                and tbeventoporsitio.TbSitio_idSitio = tbsitio.idSitio
                WHERE tbevento.Activo=1 AND tbevento.idEvento=:id AND tbevento.FechaEvento > NOW()";
        
            // Query params
            $params = [":id" => $id];

            $getEventResult = $this->storage->query($query, $params);

            $foundRecord = array_key_exists("meta", $getEventResult) &&
                $getEventResult["meta"]["count"] > 0;

                LoggingService::logVariable($getEventResult, __FILE__, __LINE__);

            if ($foundRecord) {
                $result["message"] = "Event found";
                $eventList = $getEventResult["data"];

                foreach ($eventList as $event) {
                    $result["data"][] = [
                        "id" => $event["idEvento"],
                        "name" => $event["Nombre"],
                        "description" => $event["Descripcion"],
                        "date" => $event["FechaEvento"],
                        "capacity" => $event["CapacidadPersonas"],
                        "startHour" => $event["HoraInicio"],
                        "endHour" => $event["HoraFinalizacion"],
                        "ticketsPrice" => $event["CostoEntrada"],
                        "image" => $event["Foto"],
                        "eventTypeId" => $event["idTipoEvento"],
                        "eventTypeName" => $event["nombreTipoEvento"],
                        "siteId" => $event["idsitio"],
                        "siteName" => $event["nombreSitio"]
                    ];
                } 

            } else {
                $result["message"] = "Event not found";
                $result["error"] = true;
            }


        }else{
            $result["error"] = true;
            $result["message"] = "Id is invalid";
        }

        return $result;
    }//











    /**
     * realiza ls validaciones de los datos del registro de evento y realiza el registro en la base de datos en caso de que todos los datos sean validos
     */
  /*  public function registerEvent($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice, $image){

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


*/






}//end-class-










