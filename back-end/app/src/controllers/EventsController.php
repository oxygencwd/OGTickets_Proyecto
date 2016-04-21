<?php


namespace App\Controllers;

use App\Services\LoggingService;
use App\Services\EventsService;
use Slim\Http\Request;


class EventsController{

	private $eventsService;
	
	public function __construct() {
        $this->eventsService = new EventsService();
    }

    /**
     * retorna todos los toos de evento registrados
     * @return array
     */
	public function getAllEventTypes(){
		return $this->eventsService->getAllEventTypes();
	}


	public function registerEvent($request){
		$result = [];
		$formData= $request->getParsedBody();

		$eventType= null;
        $siteId= null;
        $name= null;
        $description= null;
        $date= null;
        $startHour= null;
        $endHour= null;
        $ticketsPrice= null;
        $image= null;

        LoggingService::logVariable($formData, __FILE__, __LINE__);

        if(array_key_exists("eventType", $formData)){
            $eventType= $formData["eventType"];
        }

        if(array_key_exists("siteId", $formData)){
            $siteId= $formData["siteId"];
        }

        if(array_key_exists("name", $formData)){
            $name= $formData["name"];
        }

        if(array_key_exists("description", $formData)){
            $description= $formData["description"];
        }

        if(array_key_exists("date", $formData)){
            $date= $formData["date"];
        }

        if(array_key_exists("startHour", $formData)){
            $startHour= $formData["startHour"];
        }

        if(array_key_exists("endHour", $formData)){
            $endHour= $formData["endHour"];
        }

        if(array_key_exists("ticketsPrice", $formData)){
            $ticketsPrice= $formData["ticketsPrice"];
        }

        if(array_key_exists("image", $formData)){
            $image= $formData["image"];
        }

        $registerResult= $this->eventsService->registerEvent($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice, $image);

        if(array_key_exists("error", $registerResult)) {
            $result["error"] = true;
            $result["message"] = $registerResult["message"];
            $result["valid"] = false;
        }else{
            $result["message"] = $registerResult["message"];
            $result["valid"] = true;
        }

		 return $result;
	}//-end- registerEvent











}//end -class-