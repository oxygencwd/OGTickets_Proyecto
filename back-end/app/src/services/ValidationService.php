<?php
/**
 * ValidationService.php
 * Distintas validaciones independendientes de la lógica de negocios.
 */

namespace App\Services;

use DateTime;


class ValidationService{
    /**
     * Verifica si una cadena de texto puede ser considerada texto válido.
     * @param string $stringToCheck
     * @return bool
     */
    function isValidString($stringToCheck) {
        if (isset($stringToCheck)) {
            $trimmed = trim($stringToCheck);

            if (strlen($trimmed) > 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Verifica si un stringToCheck es un email válido.
     *
     * @param string $email
     * @return bool
     */
    function isValidEmail($email) {
        return $this->isValidString($email) ? filter_var($email, FILTER_VALIDATE_EMAIL) : false;
    }


    /**
    * Verifica si un valor es considerado un entero válido.
    * @param $intToCheck
    * @return bool
    */
    function isValidInt($intToCheck) {
        if (isset($intToCheck)) {
            if(is_numeric($intToCheck)){
                return true;
            }
        }

        return false;
    }

    /**
     * Verifica si un string dado esta en formato de fechas aceptado por a aplicacion: "Y-m-d H:i:s"
     * @param  string $date
     * @param  string $format
     * @return boolean
     */
    function isValidDateTime($date, $format = 'Y-m-d H:i:s'){
        //$d = date_create_from_format($format, $date);
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }

    function isValidDate($date, $format = 'Y-m-d'){
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }


    /**
    * Check minimum age.
    * @param    string $dob The date of birth
    * @param    int $minAge  Minimum age allowed 
    * @return    bool
    */
    function validateAge( $dob, $minAge){
        $dob     = new DateTime( $dob );
        $minAge = new DateTime( 'now - ' . $minAge . 'years' );

        return $dob <= $minAge;

    }

    function isValidGenre($genre){
        if($genre=="f" || $genre=="m"){
            return true;
        }else{
            return false;
        }
    }


    
}//end -class-
