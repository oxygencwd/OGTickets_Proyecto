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


    //getTodayEvents
    public function getTodayEvents(){
        $result=[];
        $query= "SELECT idEvento, Nombre, FechaEvento, HoraInicio, Foto, TbTipoEvento_idTipoEvento as idtipoEvento
                FROM tbevento
                WHERE Activo=1 AND FechaEvento = Current_date()";

        // Query params
        $params = [];

        $getTodayEventsResult = $this->storage->query($query, $params);

        $foundRecords = array_key_exists("meta", $getTodayEventsResult) &&
            $getTodayEventsResult["meta"]["count"] > 0;

        if ($foundRecords) {
            $result["message"] = "Today events found";
            $todayEvents = $getTodayEventsResult["data"];

            foreach ($todayEvents as $event) {
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
            $result["message"] = "Today Events not found";
            $result["error"] = true;
        }

        return $result;
    }//end -getTodayEvents-


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
                        "siteId" => "si0" . $event["idsitio"],
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
    }//getEventById -end-



    /**
     * realiza ls validaciones de los datos del registro de evento y realiza el registro en la base de datos en caso de que todos los datos sean validos
     */
    public function registerEvent($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice, $image, $userId){

        $result=[];

        $eventType= trim($eventType);
        $siteId= trim($siteId);
        $name= trim($name);
        $description= trim($description);
        $date= trim($date);
        $startHour= trim($startHour);
        $startHour= $this->validation->getTime($startHour);
        $endHour= trim($endHour);
        $endHour= $this->validation->getTime($endHour);
        $ticketsPrice= trim($ticketsPrice);
        $image= trim($image);
        $userId= trim($userId);

        LoggingService::logVariable($startHour, __FILE__, __LINE__);
        LoggingService::logVariable($endHour, __FILE__, __LINE__);

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
                                if($this->validation->isValidTime($startHour) || $this->validation->isValidDate($startHour)){//7
                                    //vefiricar que la hora de finalizacion sea valida
                                    if($this->validation->isValidTime($endHour) || $this->validation->isValidDate($endHour)){//8
                                        //verificar que el  precio de los tiquetes se un numero valido
                                        if($this->validation->isValidInt($ticketsPrice)){//9
                                            //verificar que la fecha de evento se marque con al menos 15 dias de anticipacion
                                            if($this->validation->isValidEventDate($date)){//10
                                                //verificar que la hora de inicio sea menor que la hora de finalizacion
                                                if($this->validation->validateEventTimes($startHour, $endHour)){//11
                                                    //verifcar que el id de usuario sea un nuemro
                                                    if($this->validation->isValidInt($userId)){//12
                                                        //si todas las validaciones estan se procede a almacenar el evento
                                                        
                                                        $siteCapacity= $this->getSiteCapacity($siteId);
                                                        $result= $this->createEvent($name, $description, $date, $siteCapacity, $startHour, $endHour, $ticketsPrice, $image, $eventType);

                                                        $idEvent = $result["meta"];
                                                        $idEvent= $idEvent["id"];

                                                        $resultIndexEventSite= $this->createEventSiteIndex($idEvent, $siteId);

                                                        $result["createEventSiteIndex"]= $resultIndexEventSite;

                                                        $resultIndexPromoterEvent= $this->createIndexPromoterEvent($idEvent,$userId);
                                                    

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

        return $result; 


    }//end -registerEvent- 

    /**createIndexPromoterEvent($idEvent,$userId)**/
    private function createIndexPromoterEvent($idEvent, $userId){
        $result=[];

        $query= "INSERT INTO tbeventoporsitio
        (TbSitio_idSitio, TbEvento_idEvento)
        VALUES
        (:siteId, :idEvent)";

        $params = [
            ":siteId" => $siteId, 
            ":idEvent" => $idEvent
        ];

        $createIndex= $this->storage->query($query, $params);
        LoggingService::logVariable($createIndex, __FILE__, __LINE__);

        $isIndexCreated= array_key_exists("meta", $createIndex) && $createIndex["meta"]["count"]==1;

        if($isIndexCreated){//13
            $result["message"]= "Index created";
            $result["meta"]["id"]= $createIndex["meta"]["id"];
        }else{
            $result["error"] = true;
            $result["message"]= "Error, can't create index";
        }

        return $result;
    }


    private function createEventSiteIndex($idEvent, $siteId){
        $result=[];

        $query= "INSERT INTO tbeventoporsitio
        (TbSitio_idSitio, TbEvento_idEvento)
        VALUES
        (:siteId, :idEvent)";

        $params = [
            ":siteId" => $siteId, 
            ":idEvent" => $idEvent
        ];

        $createIndex= $this->storage->query($query, $params);
        LoggingService::logVariable($createIndex, __FILE__, __LINE__);

        $isIndexCreated= array_key_exists("meta", $createIndex) && $createIndex["meta"]["count"]==1;

        if($isIndexCreated){//13
            $result["message"]= "Index created";
            $result["meta"]["id"]= $createIndex["meta"]["id"];
        }else{
            $result["error"] = true;
            $result["message"]= "Error, can't create index";
        }

        return $result;
    }


    private function createEvent($name, $description, $date, $siteCapacity, $startHour, $endHour, $ticketsPrice, $image, $eventType){
        $result=[];
        // El query a ejecutar en la BD
        $query = "INSERT INTO tbevento
        (Nombre, Descripcion, FechaEvento, CapacidadPersonas, HoraInicio, HoraFinalizacion, CostoEntrada, Foto, TbTipoEvento_idTipoEvento)
        VALUES
        (:name, :description, :date, :siteCapacity, :startHour, :endHour, :ticketsPrice, :image, :eventType)";

        // Los parámetros de ese query
        $params = [
            ":name" => $name,
            ":description" => $description,
            ":date" => $date,
            ":siteCapacity" => $siteCapacity,
            ":startHour" => $startHour, 
            ":endHour" => $endHour,
            ":ticketsPrice" => $ticketsPrice,
            ":image" => $image,
            ":eventType" =>$eventType
        ];

        $createEventResult= $this->storage->query($query, $params);
        LoggingService::logVariable($createEventResult, __FILE__, __LINE__);

        $isEventCreated= array_key_exists("meta", $createEventResult) && $createEventResult["meta"]["count"]==1;

        if($isEventCreated){//17
            $result["message"]= "Event created";
            $result["meta"]["id"]= $createEventResult["meta"]["id"];


        }else{
            $result["error"] = true;
            $result["message"]= "Error, can't event";
        }

         LoggingService::logVariable($result, __FILE__, __LINE__);

        return $result;
            
    }//end -createEvent-


    



    private function getSiteCapacity($siteId){
        $result=[];
        // El query a ejecutar en la BD
        $query = "SELECT Capacidad
                FROM tbsitio
                WHERE idsitio= :idSitio";

        // Los parámetros de ese query
        $params = [":idSitio" => $siteId];

        $queryResult = $this->storage->query($query, $params);

        LoggingService::logVariable($queryResult);

        $siteCapacity = $queryResult["data"][0];
        $siteCapacity= $siteCapacity["Capacidad"];

        return $siteCapacity;

    }









}//end-class-










