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

    /**
     * retorna todos los eventos registrados
     * @return array
     */
    public function getAllActiveEvents(){
        return $this->eventsService->getAllActiveEvents();
    }

    public function getTodayEvents(){
        return $this->eventsService->getTodayEvents();
    }

    public function getEventById($request) {
        /** @var Request $request */
        $id = $request->getAttribute("id", null);
        return $this->eventsService->getEventById($id);
    }

    public function getEventsByCategory($request){
        /** @var Request $request */
        $id = $request->getAttribute("id", null);
        return $this->eventsService->getEventsByCategory($id);
    }


    public function pruebas($request){
        $id = $request->getAttribute("id", null);
        return $this->eventsService->pruebas($id);
    }
    
	public function registerEvent($request){
		$result=[];
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
        $userId= null;
        $userType= null;

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

        if(array_key_exists("userId", $formData)){
            $userId= $formData["userId"];
        }

        if(array_key_exists("userType", $formData)){
            $userType= $formData["userType"];
        }

      

        $registerResult= $this->eventsService->registerEvent($eventType, $siteId, $name, $description, $date, $startHour, $endHour, $ticketsPrice, $image, $userId, $userType);

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