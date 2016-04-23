<?php

namespace App\Controllers;

use App\Services\LoggingService;
use App\Services\PromoterService;
use Slim\Http\Request;


class PromoterController{
	
	function __construct(){
		$this->promoterService= new PromoterService();
	}

	/**
	 * @param  
	 *  $request
	 */
	public function registerRequest($request){
		$result=[];
		$formData= $request->getParsedBody();

        LoggingService::logVariable($formData, __FILE__, __LINE__);

		$typePerson= null;
        $name= null;
        $legalId= null;
       
        $firstname= null;
        $secondname= null;
        $firstlastname= null;
        $secondlastname= null;
        $personalId= null;
        $email= null;
        $specializationArea= null;
        $password= null;
        $repeatPass= null;
        $phone= null;
        $address= null;
        $dateBirth= null;



        if(array_key_exists("typePerson", $formData)){
            $typePerson= $formData["typePerson"];
        }

        if(array_key_exists("name", $formData)){
            $name= $formData["name"];
        }

        if(array_key_exists("legalId", $formData)){
            $legalId= $formData["legalId"];
        }

        if (array_key_exists("firstname", $formData)) {
            $firstname = $formData["firstname"];
        }

        if (array_key_exists("secondname", $formData)) {
            $secondname = $formData["secondname"];
        }

        if (array_key_exists("firstlastname", $formData)) {
            $firstlastname = $formData["firstlastname"];
        }

        if (array_key_exists("secondlastname", $formData)) {
            $secondlastname = $formData["secondlastname"];
        }

        if (array_key_exists("personalId", $formData)) {
            $personalId = $formData["personalId"];
        }

        if (array_key_exists("email", $formData)) {
            $email = $formData["email"];
        }

        if (array_key_exists("specializationArea", $formData)) {
            $specializationArea = $formData["specializationArea"];
        }

        if (array_key_exists("password", $formData)) {
            $password = $formData["password"];
        }

        if (array_key_exists("repeatPass", $formData)) {
            $repeatPass = $formData["repeatPass"];
        }

        if(array_key_exists("phone", $formData)){
            $phone = $formData["phone"];
        }

        if(array_key_exists("address", $formData)){
            $address = $formData["address"];
        }

        if(array_key_exists("dateBirth", $formData)){
            $dateBirth= $formData["dateBirth"];
        }

        $registerResult= $this->promoterService->registerRequest($typePerson, $name, $legalId, $firstname, $secondname, $firstlastname, $secondlastname, $personalId, $email, $specializationArea, $password, $repeatPass, $phone, $address, $dateBirth);

        if(array_key_exists("error", $registerResult)) {
            $result["error"] = true;
            $result["message"] = $registerResult["message"];
            $result["valid"] = false;
        }else{
            $result["message"] = $registerResult["message"];
            $result["valid"] = true;
        }

        return $result;
	}//end -registerRequest-


    /**
     * trae todas las peticiones de registro como promotor
     * @param  request
     * @return array
     */
    public function getAllRequest($request){
        return $this->promoterService->getAllRequest();
    }

    
    /**
     *Buscar una solicitud de registro como promotor por id
     */
    public function getRegisterRequestById($request) {
        /** @var Request $request */
        $id = $request->getAttribute("id", null);
        return $this->promoterService->getRegisterRequestById($id);
    }

    //getPromoterById
    public function getPromoterById($request) {
        /** @var Request $request */
        $id = $request->getAttribute("id", null);
        return $this->promoterService->getPromoterById($id);
    }





}//end -class-