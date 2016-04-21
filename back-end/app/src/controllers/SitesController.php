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

    /**
     * retorna todos los toos de evento registrados
     * @return array
     */
	public function getSiteList(){
		return $this->sitesService->getSiteList();
	}










}//end -class-