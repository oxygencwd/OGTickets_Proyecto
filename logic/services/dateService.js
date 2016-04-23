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

	var today = new Date();
	var minAge15 = 15;
	var minAge18 = 18;
	var maxAge = 100;
	var minDate = 15;

	var minimunAge15 = new Date(today.getFullYear() - minAge15, today.getMonth(), today.getDate());
	var minimunAge18 = new Date(today.getFullYear() - minAge18, today.getMonth(), today.getDate());
	var maximunAge = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
	var minimunDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+ minDate);

//puntos de acceso de los metodos del servicio:
	return{
		setDateTimeFormat:setDateTimeFormat,
		setTimeFormat:setTimeFormat,
		minimunAge15:minimunAge15,
		minimunAge18:minimunAge18,
		maximunAge:maximunAge,
		minimunDate:minimunDate
	};
}]);//end -service-




