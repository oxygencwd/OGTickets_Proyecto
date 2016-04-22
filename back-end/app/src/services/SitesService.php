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


    public function registerSite($name, $phoneOne, $phoneTwo, $capacity, $latitude, $longitude, $address, $image){
        $result=[];

        $name= trim($name); 
        $phoneOne= trim($phoneOne); 
        $phoneTwo= trim($phoneTwo); 
        $capacity= trim($capacity); 
        $latitude= trim($latitude);
        $longitude= trim($longitude); 
        $address= trim($address); 
        $image= trim($image);

        //verifircar que todos los campos reuqeridos esten llenos
        if(isset($name, $phoneOne, $capacity, $latitude, $longitude, $address)){ //1
            //verificar que el nombre del sitio sea  un string valido
            if($this->validation->isValidString($name)){//2
                //verificar que el primer telefono contenga solo numeros
                if($this->validation->isValidInt($phoneOne)){//3
                    //verificar que la capacidad sea un numero valido
                    if($this->validation->isValidInt($capacity)){//4
                        //verificar que la latitud sea numerico
                        if(is_numeric($latitude)){//5
                            //verifiar que la longitus sea numerico
                            if(is_numeric($longitude)){//6
                                //verificar que la direccion sea un string valido
                                if($this->validation->isValidString($address)){//7
                                    //si todas las validaciones estan correctas se procede a registrar el nuevo sitio
                                    
                                    $query= "INSERT INTO tbsitio
                                    (Nombre, PrimerTelefono, SegundoTelefono, Capacidad, UbicacionLongitud, UbicacionLatitud, Direccion, Foto)
                                    VALUES
                                    (:name, :phoneOne, :phoneTwo, :capacity, :longitude, :latitude, :address, :image)";

                                    // Los parámetros de ese query
                                    $params = [
                                        ":name" => $name,
                                        ":phoneOne" => $phoneOne,
                                        ":phoneTwo" => $phoneTwo,
                                        ":capacity" => $capacity,
                                        ":longitude" => $longitude,
                                        ":latitude" => $latitude,
                                        ":address" => $address, 
                                        ":image" => $image
                                    ];

                                    // Lo ejecutamos
                                    $createSiteResult = $this->storage->query($query, $params);

                                    LoggingService::logVariable($createSiteResult, __FILE__, __LINE__);
                                       
                                    $isSiteCreated= array_key_exists("meta", $createSiteResult) && $createSiteResult["meta"]["count"]==1;

                                    if($isSiteCreated){
                                        $result["message"]= "Site created";
                                        $result["meta"]["id"]= $createSiteResult["meta"]["id"];
                                    }else{
                                        $result["error"] = true;
                                        $result["message"]= "Error, can't create site";
                                    } 
                                }else{//7
                                    $result["error"] = true;
                                    $result["message"] = "Address is invalid";
                                }
                            }else{//6
                                $result["error"] = true;
                                $result["message"] = "longitude is invalid";
                            }
                        }else{//5
                            $result["error"] = true;
                            $result["message"] = "latitude is invalid";
                        }
                    }else{//4
                        $result["error"] = true;
                        $result["message"] = "Capacity is invalid";
                    }
                }else{//3
                    $result["error"] = true;
                    $result["message"] = "Phone is invalid";
                }
            }else{//2
                $result["error"] = true;
                $result["message"] = "Site name is invalid";
            }
        }else{//1
            $result["error"] = true;
            $result["message"] = "Required fields are empty";
        }






        return $result;
    }//end -registerSite-












}//end-class-










