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



    //getEventsByCategory($id)
    /**
     * devulve una lista de evento por categoria
     */
    public function getEventsByCategory($id){
        $result=[];
        $id= trim($id);

        if($this->validation->isValidInt($id)){//1
            $query=" SELECT idEvento, Nombre, FechaEvento, HoraInicio, Foto, TbTipoEvento_idTipoEvento as idtipoEvento
                FROM tbevento
                WHERE Activo=1
                AND TbTipoEvento_idTipoEvento= :id
                AND FechaEvento > NOW()";

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



        }else{//1
            $result["error"] = true;
            $result["message"] = "Id is invalid";
        }
 

        return $result;
    }//end -getEventsByCategory-



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
    public function registerEvent($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice, $image, $userId){

        $eventType= trim($eventType);
        $siteId= trim($siteId);
        $name= trim($name);
        $description= trim($description);
        $date= trim($date);
        $startHour= trim($startHour);
        $endHour= trim($endHour);
        $ticketsPrice= trim($ticketsPrice);
        $image= trim($image);
        $userId= trim($userId);

        //verificar que todos los campos requeridos esten presentes.
        if(isset($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice, $userId)){ //1
            //verificar id de tipo de evento sea un numero
            if($this->validation->isValidInt($eventType)){//2
                //verificar que el id de sitio sea un numero
                if($this->validation->isValidInt($siteId)){//3
                    //verificar que el nomnre del evento sea un string valido
                    if($this->validation->isValidString($name)){//4
                        //verificar que la descripcion sea un string valido
                        if($this->validation->isValidString($description)){//5
                            //verificar que l fecha del evento sea una fecha valida
                            if($this->validation->isValidDateTime($date) || $this->validation->isValidDate($date)){//6
                                //vefiricar que la hora de inicio sea valida
                                if($this->validation->isValidDateTime($startHour) || $this->validation->isValidDate($startHour)){//7
                                    //vefiricar que la hora de finalizacion sea valida
                                    if($this->validation->isValidDateTime($endHour) || $this->validation->isValidDate($endHour)){//8
                                        //verificar que el  precio de los tiquetes se un numero valido
                                        if($this->validation->isValidInt($ticketsPrice)){//9
                                            //verificar que la fecha de evento se marque con al menos 15 dias de anticipacion
                                            if($this->validation->isValidEventDate($date)){//10
                                                //verificar que la hora de inicio sea menor que la hora de finalizacion
                                                if($this->validation->validateEventTimes($startHour, $endHour)){//11
                                                    //verifcar que el id de usuario sea un nuemro
                                                    if($this->validation->isValidInt($userId)){//12
                                                        //si todas las validaciones estan se procede a almacenar el evento
                                                        $querySitio= "SELECT Capacidad
                                                                    FROM tbsitio
                                                                    WHERE idsitio= :idSitio";
                                                        // Query params
                                                        $paramsSite = [":idSitio" => $siteId];

                                                        $capacityResult= $this->storage->query($query, $$paramsSite);

                                                        LoggingService::logVariable($capacityResult, __FILE__, __LINE__);


                                                    }else{//12
                                                        $result["error"] = true;
                                                        $result["message"] = "user Id is invalid";
                                                    }
                                                }else{//11
                                                    $result["error"] = true;
                                                    $result["message"] = "event hours invalids, startHour set after endHour";
                                                }
                                            }else{//10
                                                $result["error"] = true;
                                                $result["message"] = "event date invalid, date is less than 15 days in advance";
                                            }
                                        }else{//9
                                            $result["error"] = true;
                                            $result["message"] = "event tickets Price is invalid";
                                        }
                                    }else{//8
                                        $result["error"] = true;
                                        $result["message"] = "event end Hour is invalid";
                                    }
                                }else{//7
                                    $result["error"] = true;
                                    $result["message"] = "event start Hour is invalid";
                                }
                            }else{//6
                                $result["error"] = true;
                                $result["message"] = "event date is invalid";
                            }
                        }else{//5
                            $result["error"] = true;
                            $result["message"] = "event description is invalid";
                        }
                    }else{//4
                        $result["error"] = true;
                        $result["message"] = "event name is invalid";
                    }
                }else{//3
                    $result["error"] = true;
                    $result["message"] = "site id is invalid";
                }
            }else{//2
                $result["error"] = true;
                $result["message"] = "event type id is invalid";
            }
        }else{//1
            $result["error"] = true;
            $result["message"] = "Empty required fields";
        }


    }//end -registerEvent-








}//end-class-










