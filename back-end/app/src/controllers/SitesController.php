<?php


namespace App\Controllers;

use App\Services\LoggingService;
use App\Services\SitesService;
use Slim\Http\Request;


class SitesController{

	private $sitesService;
	
	public function __construct() {
        $this->sitesService = new SitesService();
    }


    public function getSiteById($request) {
        /** @var Request $request */
        $id = $request->getAttribute("id", null);
        return $this->sitesService->getSiteById($id);
    }

    /**
     * retorna todos los toos de evento registrados
     * @return array
     */
	public function getSiteList(){
		return $this->sitesService->getSiteList();
	}

	public function registerSite($request){
		$result=[];
		$formData= $request->getParsedBody();

		$name= null;
		$phoneOne= null;
		$phoneTwo= null;
		$capacity= null;
		$latitude= null;
		$longitude= null;
		$address= null;
		$image= null;

		LoggingService::logVariable($formData, __FILE__, __LINE__);

		if(array_key_exists("name", $formData)){
            $name= $formData["name"];
        }

        if(array_key_exists("phoneOne", $formData)){
            $phoneOne= $formData["phoneOne"];
        }

        if(array_key_exists("phoneTwo", $formData)){
            $phoneTwo= $formData["phoneTwo"];
        }

        if(array_key_exists("capacity", $formData)){
            $capacity= $formData["capacity"];
        }

        if(array_key_exists("latitude", $formData)){
            $latitude= $formData["latitude"];
        }

        if(array_key_exists("longitude", $formData)){
            $longitude= $formData["longitude"];
        }

        if(array_key_exists("address", $formData)){
            $address= $formData["address"];
        }

        if(array_key_exists("image", $formData)){
            $image= $formData["image"];
        }

        $registerResult= $this->sitesService->registerSite($name, $phoneOne, $phoneTwo, $capacity, $latitude, $longitude, $address, $image);

        if(array_key_exists("error", $registerResult)) {
            $result["error"] = true;
            $result["message"] = $registerResult["message"];
            $result["valid"] = false;
        }else{
            $result["message"] = $registerResult["message"];
            $result["valid"] = true;
        }
        
		return $result;
	}//end -registerSite-













}//end -class-