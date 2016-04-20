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










}//end -class-