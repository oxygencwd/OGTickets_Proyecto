<?php

namespace App\Controllers;

use App\Services\LoggingService;
use App\Services\ClientService;
use Slim\Http\Request;


class ClientController{

	private $clientService;

	public function __construct() {
        $this->clientService = new ClientService();
    }

    /**
     * @param request $request
     * @return []
     */
    public function validateClientInfo($request){
        $result = [];
        $formData= $request->getParsedBody();

        $dateBirth= null;
        $phone= null;
        $genre= null;

        LoggingService::logVariable($formData, __FILE__, __LINE__);

        if(array_key_exists("dateBirth", $formData)){
            $dateBirth= $formData["dateBirth"];
        }

        if(array_key_exists("phone", $formData)){
            $phone = $formData["phone"];
        }

        if(array_key_exists("genre", $formData)){
            $genre = $formData["genre"];
        }

        $validationResult= $this->clientService->validateClientInfo($dateBirth, $phone, $genre);

        if(array_key_exists("error", $validationResult)) {
            $result["error"] = true;
            $result["message"] = $validationResult["message"];
            $result["valid"] = false;
        }else{
            $result["message"] = $validationResult["message"];
            $result["valid"] = true;
        }

        return $result;

    }// end -validateClientInfo-

    public function registerClient($request){
        $result = [];
        $formData= $request->getParsedBody();

        $dateBirth= null;
        $phone= null;
        $genre= null;
        $picture= null;
        $id= null;

        LoggingService::logVariable($formData, __FILE__, __LINE__);

        if(array_key_exists("dateBirth", $formData)){
            $dateBirth= $formData["dateBirth"];
        }

        if(array_key_exists("phone", $formData)){
            $phone = $formData["phone"];
        }

        if(array_key_exists("genre", $formData)){
            $genre = $formData["genre"];
        }

        if(array_key_exists("picture", $formData)){
            $picture = $formData["picture"];
        }

        $id= $request->getAttribute("id", null);
        LoggingService::logVariable($id, __FILE__, __LINE__);

        $registerResult= $this->clientService->registerClient($dateBirth, $phone, $genre, $picture, $id);

        if(array_key_exists("error", $registerResult)) {
            $result["error"] = true;
            $result["message"] = $registerResult["message"];
            $result["valid"] = false;
        }else{
            $result["message"] = $registerResult["message"];
            $result["valid"] = true;
        }

        return $result;

    }







}//end -class-