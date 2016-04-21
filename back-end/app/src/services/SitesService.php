<?php

/**
 * SitesService.php
 */

namespace App\Services;

class SitesService {

    private $storage;
    private $validation;

    /**
     * SitesService constructor.
     */
    public function __construct() {
        $this->storage = new StorageService();
        $this->validation = new ValidationService();
    }


    public function getSiteList(){
     	$result=[];
     	$query= "SELECT idSitio, Nombre 
                FROM tbsitio 
                WHERE Activo=1";

		// Query params
	    $params = [];

	    $getAllResult = $this->storage->query($query, $params);

	    $foundRecords = array_key_exists("meta", $getAllResult) &&
            $getAllResult["meta"]["count"] > 0;

        if ($foundRecords) {
            $result["message"] = "Sites found";
            $sites = $getAllResult["data"];

            foreach ($sites as $site) {
                $result["data"][] = [
                	"id" => $site["idSitio"],
                	"name" => $site["Nombre"]
                ];
            } 
        } else {
            $result["message"] = "Sites not found";
            $result["error"] = true;
        }

	    return $result;


    }//end -getAllsites-









}//end-class-










