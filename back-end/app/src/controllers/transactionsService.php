<?php


namespace App\Controllers;

use App\Services\LoggingService;
use App\Services\TransactionsService;
use Slim\Http\Request;


class TransactionsController{

	private $transactionsService;
	
	public function __construct() {
        $this->transactionsService = new TransactionsService();
    }

    public function getReservedSeats($request){
    	$result = [];
        $formData = $request->getParsedBody();

        $zoneId= null; 
        $siteId= null; 
        $eventId= null;

        if(array_key_exists("zoneId", $formData)){
            $zoneId= $formData["zoneId"];
        }

        if(array_key_exists("siteId", $formData)){
            $siteId= $formData["siteId"];
        }

        if(array_key_exists("name", $formData)){
            $name= $formData["name"];
        }

        $getReservedResult= $this->transactionsService->getReservedSeats($zoneId, $siteId, $eventId);

        if(array_key_exists("error", $getReservedResult)) {
            $result["error"] = true;
            $result["message"] = $getReservedResult["message"];
            $result["valid"] = false;
        }else{
            $result["message"] = $getReservedResult["message"];
            $result["valid"] = true;
            $result["data"]= $getReservedResult["data"];
        }


        return $result;
    }


}//end -class-