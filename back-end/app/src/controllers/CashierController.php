<?php

namespace App\Controllers;

use App\Services\LoggingService;
use App\Services\CashierService;
use Slim\Http\Request;


class CashierController{

	private $cashierService;

	public function __construct() {
        $this->cashierService = new CashierService();
    }

    /**
     * @param request $request
     * @return []
     */
    public function validateCahierInfo($request){
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

        $validationResult= $this->cashierService->validateCahierInfo($dateBirth, $phone, $genre);

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

    public function registerCashier($request){
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

        $id= $request->getAttribute("id", null);
        LoggingService::logVariable($id, __FILE__, __LINE__);

        $registerResult= $this->cashierService->registerCashier($dateBirth, $phone, $genre, $id);

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