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









}//end-class-










