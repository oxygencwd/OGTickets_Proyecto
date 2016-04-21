angular.module('OGTicketsApp.services')
.service('dateService', [function() {


	var setDoubleDigit= function(value) {
		if(value<10){
			return ("0" + value);
		}else{
			return value;
		}
	};

	/**
	 * Devuelve formateado como datetime un string. Formato aa-mm-dd hh:mm:ss
	 */
	var setDateTimeFormat= function(_date) {
		var date= new Date(_date);
		var day= setDoubleDigit(date.getDate());
		var month= date.getMonth();
		var year= date.getFullYear();

		month++;
		month= setDoubleDigit(month);

		finalDate= year + '-' + month + '-' + day;

		var hours= setDoubleDigit(date.getHours());
		var min= setDoubleDigit(date.getMinutes());
		var sec= setDoubleDigit(date.getSeconds());

		finalTime= hours + ':' + min + ':' + sec;

		var dateTime= finalDate + ' ' + finalTime;

		return dateTime;

	};

	/**
	 * @devuelve formateado como hora un string. formato hh:mm:ss
	 */
	var setTimeFormat= function(_date) {
		var date= new Date(_date);

		var hours= setDoubleDigit(date.getHours());
		var min= setDoubleDigit(date.getMinutes());
		var sec= setDoubleDigit(date.getSeconds());

		finalTime= hours + ':' + min + ':' + sec;

		return finalTime;
	};




//puntos de acceso de los metodos del servicio:
	return{
		setDateTimeFormat:setDateTimeFormat,
		setTimeFormat:setTimeFormat
	};
}]);//end -service-




